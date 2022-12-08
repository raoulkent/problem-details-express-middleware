import { FooError } from "../errors/errors.js";

export default function getSomething(_req, _logger) {
  const error = new FooError("Could not FOO.", {
    http: {
      instance: "/users/62",
      extra: { userId: 62 },
    },
  });
  throw error;
}

export { getSomething };
