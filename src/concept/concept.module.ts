import { Module } from "@nestjs/common";
import { Concept, ConceptSchema } from "./concept.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { ConceptController } from "./concept.controller";
import { ConceptService } from "./concept.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Concept.name, schema: ConceptSchema }]),
  ],
  controllers: [ConceptController],
  providers: [ConceptService],
})
export class ConceptModule {}
