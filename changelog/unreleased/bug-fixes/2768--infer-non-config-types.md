The `replace` and `extend` pipeline operators wrongly inferred address, subnet,
pattern, and map values as strings. They are now inferred correctly. To force a
value to be inferred as a string, wrap it inside double quotes.
