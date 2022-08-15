import { Body, Controller, Delete, Get, Request, Headers, Param, Post, Put } from '@nestjs/common';
import { NoteService } from 'src/services/note/note.service';
import { NoteModel } from '../models/note.model';
import { NoteDocument } from '../schemas/note.schemas';
import { AuthService } from '../services/auth/auth.service';

@Controller('note')
export class NoteController {
    constructor(private noteService: NoteService, private authService: AuthService){}
 
    @Post('/create')
    public async createNote(@Body() note:NoteModel, @Request() req:any){    // @Headers('Authorization') tokenId: string){
        // console.log(tokenId);
        // let verifiedToken = await this.authService.verifyToken(tokenId);
        //note.user = verifiedToken.uid;
        console.log(req.user);
        note.user = req.user.uid;
        return await this.noteService.create(note);
    }

    @Get('/get')
    public async getAllNote(){
        return await this.noteService.getAll();
    }

    @Get('/content/:fromContent')
    public async getFromContent(@Param('fromContent') fromContent: string){
        return await this.noteService.getByContent(fromContent);
    }

    @Put('/update')
    public async update(@Body() note:NoteDocument){
        return await this.noteService.update(note._id, note);
    }

    @Delete('/delete')
    public async delete(@Body() note: NoteDocument){
        return await this.noteService.delete(note);
    }
}
