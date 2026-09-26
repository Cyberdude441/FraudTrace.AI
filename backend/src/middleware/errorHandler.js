export function errorHandler(err, req, res, next) {
  console.error(`[FraudTrace Error] ${err.message}`, err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'An unexpected internal error occurred. Please retry.';

  // Never expose raw internal stack traces in production
  return res.status(statusCode).json({
    success: false,
    message,
    code: err.code || 'INTERNAL_ERROR',
    timestamp: new Date().toISOString()
  });
}
