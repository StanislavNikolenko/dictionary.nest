import { Controller, Get, Post, Param, Body, Put, Delete } from "@nestjs/common";
import { WordsService } from "./words.service";
import { Word } from "./word.schema";
import { CreateWordDto, UpdateWordDto } from "./word.dto";

@Controller("words")
export class WordsController {
  constructor(private wordsService: WordsService) {}
  @Get("users/:id")
  async getAllWords(@Param("id") id: string): Promise<Word[]> {
    return await this.wordsService.getAllWords(id);
  }

  @Get(":id")
  async getOneWord(@Param("id") id: string): Promise<Word> {
    return await this.wordsService.getOneWord(id);
  }

  @Post()
  async create(@Body() createWordDto: CreateWordDto): Promise<Word> {
    return await this.wordsService.create(createWordDto);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateWordDto: UpdateWordDto,
  ): Promise<Word> {
    return await this.wordsService.update(id, updateWordDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<Word> {
    return await this.wordsService.remove(id);
  }
}
