import { User } from "src/entity/User";
import { sign } from "jsonwebtoken";
import { Response } from "express";

export const createRefreshToken = (user: User) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "7d"
    }
  );
};

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m"
  });
};

export const sendRefreshTokenCookie = (token: string, res: Response) => {
  return res.cookie("jid", token, {
    httpOnly: true
  });
};
