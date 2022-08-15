import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from 'src/note/services/auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService:AuthService){}
  async use(req: any, res: any, next: () => void) {
    let tokenId = req.headers['authorization'];
    if (tokenId == undefined){
      res.status(401).send('Unauthorized');
      return;
    }

    let verifiedToken = await this.authService.verifyToken(tokenId);
    if(verifiedToken == null){
      res.status(401).send('Permission denied')
      return;
    }

    req.user = verifiedToken;

    console.log(tokenId); 
    next();
  }
}
