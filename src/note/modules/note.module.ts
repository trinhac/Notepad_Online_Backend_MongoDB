import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Note ,NoteSchema } from '../schemas/note.schemas';
import { NoteController } from '../controllers/note.controller';
import { NoteService } from 'src/services/note/note.service';
import { AuthService } from '../services/auth/auth.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }])],
  controllers: [NoteController],
  providers: [NoteService, AuthService],
})
export class NoteModule {}