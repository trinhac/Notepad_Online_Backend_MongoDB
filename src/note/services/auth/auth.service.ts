import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {

    async verifyToken(tokenId:string){
        try{
            let verifiedToken = await admin.auth().verifyIdToken(tokenId);
            return verifiedToken;
        }
        catch{
            return null;
        }
        
    }

}
