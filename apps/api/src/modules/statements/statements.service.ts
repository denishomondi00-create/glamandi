import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { EntityNotFoundException } from '../../common/exceptions/not-found.exception';
import { getPagination, buildPaginationMeta } from '../../common/utils/pagination';
import { LandlordStatement, LandlordStatementDocument } from '../../database/schemas/landlord-statement.schema';
import { CreateStatementDto } from './dto/create-statement.dto';
import { UpdateStatementDto } from './dto/update-statement.dto';

@Injectable()
export class StatementsService {
  constructor(@InjectModel(LandlordStatement.name) private readonly model: Model<LandlordStatementDocument>) {}

  async findAll(query: PaginationQueryDto) {
    const { page, limit, skip } = getPagination(query);
    const filter: Record<string, unknown> = { deleted_at: { $exists: false } };
    if (query.status) filter.status = query.status;
    const [items, total] = await Promise.all([
      this.model.find(filter).sort({ created_at: -1 }).skip(skip).limit(limit).lean(),
      this.model.countDocuments(filter),
    ]);
    return { items, meta: buildPaginationMeta(page, limit, total) };
  }

  async findOne(id: string) {
    const record = await this.model.findById(id).lean();
    if (!record) throw new EntityNotFoundException('Statement', id);
    return record;
  }

  async create(dto: CreateStatementDto) {
    return this.model.create(dto as never);
  }

  async update(id: string, dto: UpdateStatementDto) {
    const updated = await this.model.findByIdAndUpdate(id, { $set: dto }, { new: true, runValidators: true }).lean();
    if (!updated) throw new EntityNotFoundException('Statement', id);
    return updated;
  }

  async remove(id: string) {
    const removed = await this.model.findByIdAndUpdate(id, { $set: { deleted_at: new Date() } }, { new: true }).lean();
    if (!removed) throw new EntityNotFoundException('Statement', id);
    return removed;
  }
}
