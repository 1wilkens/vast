#ifndef VAST_IDENTIFIERER_H
#define VAST_IDENTIFIERER_H

#include "vast/actor.h"
#include "vast/aliases.h"
#include "vast/file_system.h"

namespace vast {

/// Keeps track of the event ID space.
class identifier : public actor_mixin<identifier, sentinel>
{
public:
  /// Constructs the ID tracker.
  /// @param dir The directory where to save the ID to.
  identifier(path dir);

  void at_exit(caf::exit_msg const& msg);
  caf::message_handler make_handler();
  std::string name() const;

private:
  bool save();

  path dir_;
  event_id id_ = 0;
};

} // namespace vast

#endif
