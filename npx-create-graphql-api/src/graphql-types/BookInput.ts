import { InputType, Field } from "type-graphql";

@InputType()
export class BookInput {
  @Field()
  name: string;

  @Field()
  author: string;
}
