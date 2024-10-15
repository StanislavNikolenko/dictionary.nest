import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { NotFoundException } from "@nestjs/common";
import { CreateWordDto, UpdateWordDto } from "./word.dto";
import { Word } from "./word.schema";
import { Concept } from "src/concept/concept.schema";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class WordsService {
  constructor(
    @InjectModel(Word.name) private wordModel: Model<Word>,
    @InjectModel(Concept.name) private conceptModel: Model<Concept>,
    private jwtService: JwtService
  ) {}

  async create(createWordDto: CreateWordDto, token: string): Promise<Word> {
    const userId: any = this.jwtService.decode(token).sub;
    const concept = await this.conceptModel
      .findOne({ name: createWordDto.concept })
      .exec();
    const { language, value } = createWordDto;
    if (concept) {
      console.log("Concept exists!");
      const { language, value } = createWordDto;
      const word = new this.wordModel({
        user: userId,
        concept: concept._id,
        language: language,
        value: value,
      });
      concept.words.push(word);
      await concept.save();
      return word.save();
    }
    console.log("Concept does not exist!");
    const newConcept = new this.conceptModel({
      name: createWordDto.concept,
      user: userId,
    });
    await newConcept.save();
    const word = new this.wordModel({
      user: userId,
      concept: newConcept._id,
      language: language,
      value: value,
    });
    await word.save();
    newConcept.words.push(word);
    await newConcept.save();
    return word;
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
