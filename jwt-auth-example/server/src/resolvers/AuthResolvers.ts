import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware,
  Int
} from "type-graphql";
import { hash, compare } from "bcryptjs";
import { User } from "../entity/User";
import { MyContext } from "../interfaces/MyContext";
import {
  createRefreshToken,
  createAccessToken,
  sendRefreshTokenCookie
} from "../auth/auth";
import { isAuth } from "../middleware/isAuth";
import { getConnection } from "typeorm";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class AuthResolvers {
  @Query(() => [User])
  @UseMiddleware(isAuth)
  async users(@Ctx() { payload }: MyContext) {
    if (payload?.userId !== 3) {
      throw new Error("wrong user");
    }
    return await User.find();
  }

  @Mutation(() => Boolean)
  async revoke(@Arg("userId", () => Int) userId: number): Promise<Boolean> {
    try {
      await getConnection()
        .getRepository(User)
        .increment({ id: userId }, "tokenVersion", 1);
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("could not find user");
    }

    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error("bad password");
    }

    // login succesful
    sendRefreshTokenCookie(createRefreshToken(user), res);

    return {
      accessToken: createAccessToken(user)
    };
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const hashedPassword = await hash(password, 12);

    try {
      await User.insert({
        email,
        password: hashedPassword
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
