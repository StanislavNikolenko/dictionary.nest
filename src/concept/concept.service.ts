import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { NotFoundException } from "@nestjs/common";
import { Concept } from "src/concept/concept.schema";

@Injectable()
export class ConceptService {
  constructor(
    @InjectModel(Concept.name) private conceptModel: Model<Concept>,
  ) {}

  async getAllConcepts(userId: string): Promise<Concept[]> {
    console.log("get all user concepts");
    const concepts = await this.conceptModel.find({ user: userId });
    if (!concepts || concepts.length == 0) {
      throw new NotFoundException("Words data not found!");
    }
    return concepts;
  }
}