#include "vast/bitmap.hpp"

namespace vast {

bitmap::bitmap() : bitmap_{default_bitmap{}} {
}

bool bitmap::empty() const {
  return visit([](auto& bm) { return bm.empty(); }, bitmap_);
}

bitmap::size_type bitmap::size() const {
  return visit([](auto& bm) { return bm.size(); }, bitmap_);
}

bool bitmap::append_bit(bool bit) {
  return visit([=](auto& bm) { return bm.append_bit(bit); }, bitmap_);
}

bool bitmap::append_bits(bool bit, size_type n) {
  return visit([=](auto& bm) { return bm.append_bits(bit, n); }, bitmap_);
}

bool bitmap::append_block(block_type value, size_type n) {
  return visit([=](auto& bm) { return bm.append_block(value, n); }, bitmap_);
}

bool operator==(bitmap const& x, bitmap const& y) {
  return x.bitmap_ == y.bitmap_;
}

bitmap_bit_range::bitmap_bit_range(bitmap const& bm) {
  auto visitor = [&](auto& b) {
    auto r = bit_range(b);
    if (!r.done())
      bits_ = r.get();
    range_ = std::move(r);
  };
  visit(visitor, bm);
}

void bitmap_bit_range::next() {
  auto visitor = [&](auto& rng) {
    rng.next();
    bits_ = rng.get();
  };
  visit(visitor, range_);
}

bool bitmap_bit_range::done() const {
  return visit([](auto& rng) { return rng.done(); }, range_);
}

bitmap_bit_range bit_range(bitmap const& bm) {
  return bitmap_bit_range{bm};
}

} // namespace vast
