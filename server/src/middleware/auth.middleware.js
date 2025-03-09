import jwt from "jsonwebtoken";

const JWT_PUBLIC_KEY = process.env.JWT_PUBLIC_KEY;

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization; // Bearer token
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const decoded = jwt.verify(token, JWT_PUBLIC_KEY, {
    algorithms: ["RS256"],
  });

  if (!decoded) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const userId = decoded.sub;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  req.userId = userId;
  next();
}
