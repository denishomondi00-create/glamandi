import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageService {
  async upload(key: string, body: Buffer, contentType: string) {
    return { key, size: body.length, contentType, url: `/documents/${key}` };
  }
}
