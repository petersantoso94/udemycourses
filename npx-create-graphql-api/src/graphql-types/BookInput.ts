import { InputType, Field } from "type-graphql";

@InputType()
export class BookInput {
  @Field()
  name: string;

  @Field()
  author: string;
}

@InputType()
export class SearchBookInput {
  @Field(() => String, { nullable: true })
  name: string | null;

  @Field(() => String, { nullable: true })
  author: string | null;
}
