#ifndef VAST_SOURCE_SYNCHRONOUS_H
#define VAST_SOURCE_SYNCHRONOUS_H

#include <caf/all.hpp>
#include "vast/actor.h"
#include "vast/event.h"
#include "vast/util/result.h"

namespace vast {
namespace source {

/// A synchronous source that extracts events one by one.
template <typename Derived>
struct synchronous : public actor_mixin<synchronous<Derived>, sentinel>
{
public:
  caf::message_handler make_handler()
  {
    using namespace caf;
    this->trap_exit(true);
    this->attach_functor([=](uint32_t) { sink_ = invalid_actor; });

    return
    {
      [=](exit_msg const& e)
      {
        send_events();
        this->quit(e.reason);
      },
      on(atom("batch size"), arg_match) >> [=](uint64_t batch_size)
      {
        VAST_LOG_ACTOR_DEBUG("sets batch size to " << batch_size);
        batch_size_ = batch_size;
      },
      on(atom("sink"), arg_match) >> [=](actor sink)
      {
        VAST_LOG_ACTOR_DEBUG("sets sink to " << sink);
        sink_ = sink;
      },
      on(atom("start")) >> [=]
      {
        running_ = true;
        this->send(this, atom("run"));
      },
      on(atom("stop")) >> [=]
      {
        running_ = false;
      },
      on(atom("run")) >> [=]
      {
        if (! sink_)
        {
          this->quit(exit::error);
          return;
        }

        bool done = false;
        while (events_.size() < batch_size_ && ! done)
        {
          result<event> r = static_cast<Derived*>(this)->extract();
          if (r)
          {
            events_.push_back(std::move(*r));
          }
          else if (r.failed())
          {
            VAST_LOG_ACTOR_ERROR(r.error());
            done = true;
            break;
          }

          done = static_cast<Derived const*>(this)->done();
        }

        send_events();

        if (done)
          this->quit(exit::done);
        else if (running_)
          this->send_tuple(this, this->last_dequeued());
      }
    };
  }

private:
  void send_events()
  {
    if (! events_.empty())
    {
      this->send(sink_, std::move(events_));
      events_.clear();
    }
  }

  bool running_ = true;
  caf::actor sink_;
  uint64_t batch_size_ = 100000;
  std::vector<event> events_;
};

} // namespace source
} // namespace vast

#endif
