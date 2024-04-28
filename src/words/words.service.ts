import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { NotFoundException } from "@nestjs/common";
import { CreateWordDto, UpdateWordDto } from "./word.dto";
import { Word } from "./word.schema";

@Injectable()
export class WordsService {
  constructor(@InjectModel(Word.name) private wordModel: Model<Word>) {}

  async create(createWordDto: CreateWordDto): Promise<Word> {
    const word = new this.wordModel(createWordDto);
    return word.save();
  }

  async getOneWord(id: string): Promise<Word> {
    return this.wordModel.findById(id).exec();
  }

  async getAllWords(userId: string): Promise<Word[]> {
    const words = await this.wordModel.find({ user: userId });
    if (!words || words.length == 0) {
      throw new NotFoundException("Words data not found!");
    }
    return words;
  }

  async update(wordId: string, updateWordDto: UpdateWordDto): Promise<Word> {
    return this.wordModel.findOneAndUpdate({ _id: wordId }, updateWordDto);
  }

  async remove(wordId: string): Promise<Word> {
    return this.wordModel.findOneAndDelete({ _id: wordId });
  }
}
