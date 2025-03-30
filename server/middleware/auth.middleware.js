import jwt from "jsonwebtoken";

const JWT_PUBLIC_KEY = process.env.JWT_PUBLIC_KEY;

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization; // Bearer token

  // Enhanced debugging
  console.log("Auth header:", authHeader);

  // Check if Authorization header exists
  if (!authHeader) {
    console.error("No authorization header present");
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }

  // Extract token - more flexible parsing
  let token;
  if (authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1].trim();
  } else {
    // Some clients might just send the token without 'Bearer' prefix
    token = authHeader.trim();
  }

  if (!token) {
    console.error("Token is missing after extraction");
    return res.status(401).json({ message: "Unauthorized - Empty token" });
  }

  // Simple logging to diagnose token format
  console.log("Token length:", token.length);
  console.log("Token parts:", token.split(".").length);
  console.log("First few characters:", token.substring(0, 10) + "...");

  // Verify JWT_PUBLIC_KEY is available
  if (!JWT_PUBLIC_KEY) {
    console.error("JWT_PUBLIC_KEY is not configured in environment variables");
    return res
      .status(500)
      .json({ message: "Server configuration error - Missing JWT key" });
  }

  try {
    // More flexible verification options
    const decoded = jwt.verify(token, JWT_PUBLIC_KEY, {
      algorithms: ["RS256"],
    });

    console.log("Token successfully verified:", decoded);

    // Check where user ID is stored in your token (sub, userId, or id field)
    const userId = decoded.sub || decoded.userId || decoded.id;

    if (!userId) {
      console.error("No user identifier found in token payload");
      return res
        .status(401)
        .json({ message: "Invalid token - No user identifier" });
    }

    req.userId = userId;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.name, "-", error.message);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid token: " + error.message,
        details: "Please ensure you're sending a valid JWT token",
      });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired",
        details: "Please obtain a new token",
      });
    } else {
      return res.status(401).json({
        message: "Authentication failed",
        details: error.message,
      });
    }
  }
}
