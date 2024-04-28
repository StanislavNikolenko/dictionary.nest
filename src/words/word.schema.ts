import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { User } from "src/users/user.schema";
import mongoose from "mongoose";

export type WordDocument = HydratedDocument<Word>;

@Schema()
export class Word {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  user: User;

  @Prop()
  language: string;

  @Prop()
  value: string;
}

export const WordSchema = SchemaFactory.createForClass(Word);
