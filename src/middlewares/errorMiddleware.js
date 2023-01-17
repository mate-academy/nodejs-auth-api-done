export function errorMiddleware(error, req, res, next) {
  res.status(500).send({
    message: 'custom error middleware',
  })
}
