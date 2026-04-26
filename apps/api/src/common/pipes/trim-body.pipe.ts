import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TrimBodyPipe implements PipeTransform {
  transform(value: unknown): unknown {
    if (Array.isArray(value)) return value.map((item) => this.transform(item));
    if (value && typeof value === 'object') {
      return Object.fromEntries(Object.entries(value).map(([key, val]) => [key, typeof val === 'string' ? val.trim() : this.transform(val)]));
    }
    return value;
  }
}
