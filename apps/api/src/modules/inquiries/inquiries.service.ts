import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { EntityNotFoundException } from '../../common/exceptions/not-found.exception';
import { getPagination, buildPaginationMeta } from '../../common/utils/pagination';
import { Inquiry, InquiryDocument } from '../../database/schemas/inquiry.schema';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { UpdateInquiryDto } from './dto/update-inquiry.dto';

@Injectable()
export class InquiriesService {
  constructor(@InjectModel(Inquiry.name) private readonly model: Model<InquiryDocument>) {}

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
    if (!record) throw new EntityNotFoundException('Inquiry', id);
    return record;
  }

  async create(dto: CreateInquiryDto) {
    return this.model.create(dto as never);
  }

  async update(id: string, dto: UpdateInquiryDto) {
    const updated = await this.model.findByIdAndUpdate(id, { $set: dto }, { new: true, runValidators: true }).lean();
    if (!updated) throw new EntityNotFoundException('Inquiry', id);
    return updated;
  }

  async remove(id: string) {
    const removed = await this.model.findByIdAndUpdate(id, { $set: { deleted_at: new Date() } }, { new: true }).lean();
    if (!removed) throw new EntityNotFoundException('Inquiry', id);
    return removed;
  }
}
