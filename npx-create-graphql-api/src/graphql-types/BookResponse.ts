import { ObjectType, Field } from "type-graphql";
import { FieldError } from "./FieldError";
import { Book } from "../entity/Book";

@ObjectType()
export class BookResponse {
  @Field(() => Book, { nullable: true })
  book?: Book;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
