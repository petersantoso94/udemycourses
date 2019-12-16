import {
  Query,
  Resolver,
  UseMiddleware,
  Arg,
  Mutation,
  Ctx
} from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { BookResponse } from "../graphql-types/BookResponse";
import { Book } from "../entity/Book";
import { MyContext } from "../graphql-types/MyContext";
import { BookInput } from "../graphql-types/BookInput";

@Resolver()
export class BookResolver {
  @Mutation(() => BookResponse)
  async newBook(
    @Arg("options", () => BookInput) options: BookInput
  ): Promise<BookResponse> {
    const existingBook = await Book.findOne({ name: options.name });

    if (existingBook) {
      return {
        errors: [
          {
            path: "name",
            message: "already in use"
          }
        ]
      };
    }
    const book = await Book.create(options).save();

    return { book };
  }

  @Query(() => [Book], { nullable: true })
  @UseMiddleware(isAuth)
  async books(
    @Ctx() ctx: MyContext
    // @Arg("name", () => String, { nullable: true }) name: string,
    // @Arg("author", () => String, { nullable: true }) author: string
  ): Promise<Book[] | undefined> {
    if (!ctx.req.session!.userId) {
      return undefined;
    }

    return Book.find();
  }
}
