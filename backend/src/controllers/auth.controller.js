import { OAuth2Client } from "google-auth-library";
import { generateToken } from "../lib/utils.js";
import { prisma } from "../lib/prisma.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        username: true,
        password: true,
        provider: true,
      },
    });

    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    if (user.provider !== "local") return res.status(400).json({ message: "Invalid Credentials" });

    if (user.password !== password) return res.status(400).json({ message: "Invalid Credentials" });

    generateToken(user, res);

    return res.status(200).json({ data: user });
  } catch (error) {
    console.error("Error on Auth Controller: Login: ", error);
    res.status(500).json({ message: "Server Internal Error" });
  }
};

export const signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (user) return res.status(400).json({ message: "Email Already Exists!" });

    const newUser = await prisma.user.create({
      data: { email, password, username },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    generateToken(newUser, res);

    res.status(201).json({ data: newUser, message: "Signup Successful" });
  } catch (error) {
    console.error("Error on Auth Controller: signup: ", error);
    res.status(500).json({ message: "Server Internal Error" });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    let user = await prisma.user.findUnique({
      where: { email: payload.email },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: payload.email,
          username: payload.name,
          provider: "google",
          providerId: payload.sub,
        },
        select: {
          id: true,
          email: true,
          username: true,
        },
      });
    }

    //Temporary
    generateToken({ ...user, picture: payload?.picture }, res);

    res.status(200).json({ data: { ...user, picture: payload?.picture }, message: "Google Route" });
  } catch (error) {
    console.error("Error on Auth Controller: googleLogin: ", error.message);
    res.status(500).json({ message: "Server Internal Error" });
  }
};

export const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logout" });
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.authUser);
  } catch (error) {
    console.error("Error in Auth Route: check:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
