import { jwtService } from "../services/jwtService.js";

export function authMiddleware(req, res, next) {
  // request.headers['Authorization'] = `Bearer ${accessToken}`
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    res.sendStatus(401);
    return;
  }

  const [, accessToken] = authHeader.split(' ');

  if (!accessToken) {
    res.sendStatus(401);
    return;
  }

  const userData = jwtService.verifyAccessToken(accessToken);

  if (!userData) {
    res.sendStatus(401);
    return;
  }

  next();
}
