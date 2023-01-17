import { ApiError } from "../exceptions/ApiError.js";
import { jwtService } from "../services/jwtService.js";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    throw ApiError.Unahtorized();
  }

  const [, accessToken] = authHeader.split(' ');

  if (!accessToken) {
    throw ApiError.Unahtorized();
  }

  const userData = jwtService.verifyAccessToken(accessToken);

  if (!userData) {
    throw ApiError.Unahtorized();
  }

  next();
}
