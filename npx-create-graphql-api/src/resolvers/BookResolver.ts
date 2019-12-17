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
import { BookInput, SearchBookInput } from "../graphql-types/BookInput";

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
    @Ctx() ctx: MyContext,
    @Arg("options", () => SearchBookInput, { nullable: true })
    options: SearchBookInput
  ): Promise<Book[] | undefined> {
    if (!ctx.req.session!.userId) {
      return undefined;
    }

    let bookOptions = <Book>{};

    if (options && options.author) {
      bookOptions.author = options.author;
    }
    if (options && options.name) {
      bookOptions.name = options.name;
    }

    return Book.find(bookOptions);
  }
}
