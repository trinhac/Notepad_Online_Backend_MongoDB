import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { NoteController } from './note/controllers/note.controller';
import { NoteModule } from './note/modules/note.module';
import { AuthService } from './note/services/auth/auth.service';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://pablo:963852741A@cluster0.ybc7phv.mongodb.net/test',
    {
      appName: 'NoteApp'
    }),
    NoteModule
  ],
  controllers: [AppController,],
  providers: [AppService, AuthService,],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    }
    )
  }
}
