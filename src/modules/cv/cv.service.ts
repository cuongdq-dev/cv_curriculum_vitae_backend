import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Collection, Connection } from 'mongoose';
import { BaseLogger } from '../../core/logger';

@Injectable()
export class WebsiteService extends BaseLogger {
  private readonly webCollection: Collection;

  constructor(@InjectConnection() private connection: Connection) {
    super(WebsiteService.name);
    this.webCollection = this.connection.collection('websites');

  }



  async getWebsites() {
    const data = await this.webCollection
      .find()
      .project({
        name: 1,
        url: 1,
        supplier: 1,
        pid: 1,
        domain: 1,
        domainUser: 1,
        domainPassword: 1,
        wp: 1,
        wpUser: 1,
        wpPassword: 1,
        _id: 0
      })
      .sort({ pid: 1, _id: -1 })
      .toArray();

    return {
      title: 'All Websites',
      header: [
        { name: 'no', width: 10, title: '#', align: 'right' },
        { name: 'name', width: 250, title: 'website', align: 'left' },
        { name: 'supplier', width: 10, title: 'supplier', align: 'left' },
        { name: 'pid', width: 200, title: 'pid', align: 'center' },
        { name: 'domain', width: 300, title: 'domain', align: 'left' },
        { name: 'domainUser', width: 300, title: 'domainUser', align: 'left' },
        { name: 'domainPassword', width: 300, title: 'domainPassword', align: 'left' },
        { name: 'wp', width: 300, title: 'wp', align: 'left' },
        { name: 'wpUser', width: 300, title: 'wpUser', align: 'left' },
        { name: 'wpPassword', width: 300, title: 'wpPassword', align: 'left' },
        { name: 'refresh', width: 10, title: '', align: 'center' },
        { name: 'edit', width: 10, title: '', align: 'center' }
      ],

      data
    };
  }

}
