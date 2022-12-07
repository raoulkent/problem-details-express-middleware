const ModernError = require('modern-errors');
const modernErrorsHttp = require('modern-errors-http');

const BaseError = ModernError.subclass('BaseError', {
  plugins: [modernErrorsHttp],
});

const AuthError = BaseError.subclass('AuthError', {
  http: {
    type: 'https://example.com/probs/auth',
    status: 401,
  },
});

module.exports = {
  BaseError,
  AuthError,
};
