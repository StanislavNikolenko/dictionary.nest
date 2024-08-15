import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from "@nestjs/common";
import { WordsService } from "./words.service";
import { Word } from "./word.schema";
import { CreateWordDto, UpdateWordDto } from "./word.dto";
import { ApiTags } from "@nestjs/swagger";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Public } from "src/decorators";

@ApiTags("words")
@Controller("words")
export class WordsController {
  constructor(private wordsService: WordsService) {}

  @Public()
  @ApiOperation({ summary: "Get all user words" })
  @ApiResponse({
    status: 200,
    description: "Get all user words",
    type: [Word],
  })
  @Get("users/:id")
  async getAllWords(@Param("id") id: string): Promise<Word[]> {
    return await this.wordsService.getAllWords(id);
  }

  @ApiOperation({ summary: "Get word by id" })
  @ApiResponse({
    status: 200,
    description: "Get word by id",
    type: Word,
  })
  @Get(":id")
  async getOneWord(@Param("id") id: string): Promise<Word> {
    return await this.wordsService.getOneWord(id);
  }

  @ApiOperation({ summary: "Create a new word" })
  @ApiResponse({
    status: 201,
    description: "Create a new word",
    type: Word,
  })
  @Post()
  async create(@Body() createWordDto: CreateWordDto): Promise<Word> {
    return await this.wordsService.create(createWordDto);
  }

  @ApiOperation({ summary: "Update a word" })
  @ApiResponse({
    status: 200,
    description: "Update a word",
    type: Word,
  })
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateWordDto: UpdateWordDto,
  ): Promise<Word> {
    return await this.wordsService.update(id, updateWordDto);
  }

  @ApiOperation({ summary: "Delete a word" })
  @ApiResponse({
    status: 200,
    description: "Delete a word",
    type: Word,
  })
  @Delete(":id")
  async remove(@Param("id") id: string): Promise<Word> {
    return await this.wordsService.remove(id);
  }
}
