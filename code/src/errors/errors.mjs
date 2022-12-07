import ModernError from 'modern-errors';
import modernErrorsHttp from 'modern-errors-http';

export const BaseError = ModernError.subclass('BaseError', {
  plugins: [modernErrorsHttp],
});

export const AuthError = BaseError.subclass('AuthError', {
  http: {
    type: 'https://example.com/probs/auth',
    status: 401,
  },
});
