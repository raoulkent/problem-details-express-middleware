import ModernError from "modern-errors";
import modernErrorsHttp from "modern-errors-http";

export const BaseError = ModernError.subclass("BaseError", {
  plugins: [modernErrorsHttp],
});

export const FooError = BaseError.subclass("FooError", {
  http: {
    type: "https://example.com/probs/auth",
    status: 418,
  },
});

const errors = { BaseError, FooError };

export default errors;
