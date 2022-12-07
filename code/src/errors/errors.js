import ModernError from 'modern-errors';
import modernErrorsHttp from 'modern-errors-http';

const BaseError = ModernError.subclass('BaseError', {
  plugins: [modernErrorsHttp],
});

const AuthError = BaseError.subclass('AuthError', {
  http: {
    type: 'https://example.com/probs/auth',
    status: 401,
  },
});

export { BaseError, AuthError };
