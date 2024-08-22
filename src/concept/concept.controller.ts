import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Public } from "src/decorators";
import { ConceptService } from "./concept.service";
import { Concept } from "./concept.schema";

@ApiTags("concepts")
@Controller("concepts")
export class ConceptController {
  constructor(private conceptService: ConceptService) {}

  @Public()
  @ApiOperation({ summary: "Get all user concepts" })
  @ApiResponse({
    status: 200,
    description: "Get all user concepts",
    type: [Concept],
  })
  @Get("users/:id")
  async getAllConcepts(@Param("id") id: string): Promise<Concept[]> {
    return await this.conceptService.getAllConcepts(id);
  }

  @Public()
  @Get(":name")
  async getConceptWords(@Param("name") name: string): Promise<any> {
    return await this.conceptService.getConceptWords(name);
  }
}
