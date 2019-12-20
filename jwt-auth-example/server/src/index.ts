import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { AuthResolvers } from "./resolvers/AuthResolvers";
import { createConnection } from "typeorm";
import cookieParser from "cookie-parser";
var cors = require("cors");
import { verify } from "jsonwebtoken";
import { User } from "./entity/User";
import {
  createAccessToken,
  sendRefreshTokenCookie,
  createRefreshToken
} from "./auth/auth";

(async () => {
  const app = express();
  const corsOptions = {
    origin: ["http://localhost:3002"],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true
  };
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.get("/", (_req, res) => res.send("hello"));

  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.jid;
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }
    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (error) {
      console.log(error);
      return res.send({ ok: false, accessToken: "" });
    }

    //token is valid and check if we can get the correct userid (user exist)
    const user = await User.findOne({ id: payload.userId });

    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    if (payload.tokenVersion !== user?.tokenVersion) {
      return res.send({ ok: false, message: "mismatch token version" });
    }

    //refresh the refresh_token as well
    sendRefreshTokenCookie(createRefreshToken(user!), res);

    return res.send({ ok: true, accessToken: createAccessToken(user!) });
  });

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AuthResolvers],
      validate: false
    }),
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4400, () => {
    console.log("express server started at 4400");
  });
})();

// createConnection().then(async connection => {

//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));
