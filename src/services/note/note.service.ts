import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Note, NoteDocument } from 'src/note/schemas/note.schemas';
import { NoteModel } from '../../note/models/note.model'


@Injectable()
export class NoteService {
    constructor(@InjectModel(Note.name) private noteModel:Model<NoteDocument>){}

    async create(note: NoteModel) {
        note.createAt = Date.now();
        let createdNote = new this.noteModel(note);
        await createdNote.save();
    }

    async getAll(){
        return await this.noteModel.find().exec();
    }

    async getByContent(fromContent: string){
        return await this.noteModel.find({ content: fromContent }).exec();
    }

    async update(id, note: Note){
        try{
            let res = await this.noteModel.findByIdAndUpdate(id, note).exec();
            if (!res){
                return {
                    message:'Cannot find the id',
                }
            };
            return {
                message: 'Update successed',
                result: res,
            };
        }
        catch(err){
            return{
                message:'Update failed',
                error:err,
            }
        }
    }

    async delete(id){
        try{
            let res = await this.noteModel.findByIdAndDelete(id).exec()
            if(!res){
                return {
                    message: 'Cannot find the id to delete'
                }
            };

            return {
                message: 'Delete success',
                result:'Note choose' + res 
            }
        }
        catch(err){
            return {
                message:'Delete failed',
                error:err
            }
        }
    }

}
