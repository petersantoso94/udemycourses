import { MiddlewareFn } from "type-graphql";
import { ApolloError } from "apollo-server-core";
import { MyContext } from "../interfaces/MyContext";
import { verify } from "jsonwebtoken";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const auth = context.req.headers["authorization"];
  if (!auth) {
    throw new ApolloError("not authenticated");
  }
  try {
    const token = auth.split(" ")[1];
    const isAuth = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = isAuth as any;
  } catch (error) {
    console.log(error);
    throw new ApolloError("not authenticated");
  }

  return next();
};
