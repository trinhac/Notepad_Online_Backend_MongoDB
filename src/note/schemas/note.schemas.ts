import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoteDocument = Note & Document;

@Schema()
export class Note {
  @Prop({
    validators: [],
    required: true,
  })
  content: string;

  @Prop({
    validators: [],
    required: true,
  })
  description: string;

  @Prop ()
  user: string;

  @Prop({
    validators: [],
    required: true,
  })
  createAt: number;
}

export const NoteSchema = SchemaFactory.createForClass(Note);