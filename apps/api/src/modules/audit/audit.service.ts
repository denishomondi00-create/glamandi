import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { AuditLog, AuditLogDocument } from '../../database/schemas/audit-log.schema';

@Injectable()
export class AuditService {
  constructor(@InjectModel(AuditLog.name) private readonly auditModel: Model<AuditLogDocument>) {}

  log(entry: Record<string, unknown>) {
    return this.auditModel.create(entry);
  }

  findAll(_query: PaginationQueryDto) {
    return this.auditModel.find().sort({ created_at: -1 }).limit(100).lean();
  }

  findOne(id: string) {
    return this.auditModel.findById(id).lean();
  }
}
