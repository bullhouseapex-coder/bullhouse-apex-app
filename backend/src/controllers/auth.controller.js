import { OAuth2Client } from "google-auth-library";
import { generateToken } from "../lib/utils.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const userData = {
      userId: payload?.sub,
      email: payload?.email,
      name: payload?.name,
      picture: payload?.picture,
    };

    const jwtToken = generateToken(userData, res);

    res.status(200).json({ data: userData, message: "Google Route" });
  } catch (error) {
    console.error("Error on Auth Controller: googleLogin: ", error.message);
    res.status(500).json({ message: "Server Internal Error" });
  }
};
