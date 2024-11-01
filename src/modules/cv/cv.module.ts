import { Module } from '@nestjs/common';
import { WebsiteController } from './cv.controller';
import { WebsiteService } from './cv.service';

@Module({
  imports: [],
  controllers: [WebsiteController],
  providers: [WebsiteService]
})
export class WebsiteModule { }
