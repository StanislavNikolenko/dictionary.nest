import { Module } from "@nestjs/common";
import { Word, WordSchema } from "./word.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { WordsController } from "./words.controller";
import { WordsService } from "./words.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Word.name, schema: WordSchema }]),
  ],
  controllers: [WordsController],
  providers: [WordsService],
  exports: [WordsService],
})
export class WordsModule {}
