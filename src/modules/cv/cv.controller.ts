import { Body, Controller, Get, Param, Patch, Post, Query, UsePipes } from '@nestjs/common';
import { MainValidationPipe } from '../../pipes';
import { WebsiteService } from './cv.service';

@Controller('/website')
export class WebsiteController {
  constructor(private readonly _service: WebsiteService) { }
  @Get()
  @UsePipes(new MainValidationPipe())
  async getWebsites() {
    return this._service.getWebsites();
  }

}
