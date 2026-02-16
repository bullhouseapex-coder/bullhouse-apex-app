import jwt from "jsonwebtoken";

//(payload, response)
export const generateToken = (payload, res) => {
  const JWT_SECRET = process.env.JWT_SECRET_KEY;

  //create token
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d", //expiry 7days
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, //MS
    httpOnly: true, // prevent XSS attacks cross-site  scripting attacks
    sameSite: "strict", //CSRF Attacks cross-site forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
