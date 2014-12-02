#include "vast/identifier.h"

#include <cassert>
#include <fstream>
#include <caf/all.hpp>
#include "vast/print.h"

using namespace caf;

namespace vast {

identifier::identifier(path dir)
  : dir_{std::move(dir)}
{
}

void identifier::at_exit(exit_msg const& msg)
{
  if (save())
  {
    quit(msg.reason);
  }
  else
  {
    VAST_LOG_ACTOR_ERROR("could not save current event ID " << id_);
    quit(exit::error);
  }
}

message_handler identifier::make_handler()
{
  trap_exit(true);

  if (exists(dir_ / "id"))
  {
    std::ifstream file{to_string(dir_ / "id")};
    if (! file)
    {
      VAST_LOG_ACTOR_ERROR("failed to open file: " << (dir_ / "id"));
      quit(exit::error);
      return {};
    }

    file >> id_;
    VAST_LOG_ACTOR_INFO("found existing next event ID " << id_);
  }

  return
  {
    on(atom("request"), arg_match) >> [=](uint64_t n)
    {
      if (n == 0)
      {
        VAST_LOG_ACTOR_ERROR("cannot hand out 0 ids");
        return make_message(atom("id"), atom("failure"));
      }
      else if (std::numeric_limits<event_id>::max() - id_ < n)
      {
        VAST_LOG_ACTOR_ERROR("not enough ids available for " << n);
        return make_message(atom("id"), atom("failure"));
      }

      id_ += n;
      if (! save())
      {
        VAST_LOG_ACTOR_ERROR("failed to save incremented ID: " << id_);
        quit(exit::error);
        return make_message(atom("id"), atom("failure"));
      }

      VAST_LOG_ACTOR_DEBUG("hands out [" << (id_ - n) << ',' << id_ << ')');
      return make_message(atom("id"), id_ - n, id_);
    }
  };
}

std::string identifier::name() const
{
  return "identifier";
}

bool identifier::save()
{
  if (id_ == 0)
    return true;

  if (! exists(dir_) && ! mkdir(dir_))
    return false;

  std::ofstream file{to_string(dir_ / "id")};
  if (! file)
    return false;

  file << id_ << std::endl;

  return true;
}

} // namespace vast
