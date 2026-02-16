import jwt from "jsonwebtoken";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) return res.status(401).json({ message: "Unauthorized: No Token Provided" });

    const authUser = jwt.decode(token, process.env.JWT_SECRET_KEY);

    if (!authUser) return res.status(401).json({ message: "Unauthorized: Invalid Token" });

    req.authUser = authUser;

    next();
  } catch (error) {
    console.error("Error on Auth Middleware: protectedRoute:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
