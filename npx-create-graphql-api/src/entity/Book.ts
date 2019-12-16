import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Book extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text", { unique: true })
  name: string;

  @Field()
  @Column("text")
  author: string;
}
