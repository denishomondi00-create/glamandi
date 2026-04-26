import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { EntityNotFoundException } from '../../common/exceptions/not-found.exception';
import { getPagination, buildPaginationMeta } from '../../common/utils/pagination';
import { User, UserDocument } from '../../database/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly model: Model<UserDocument>) {}

  async findAll(query: PaginationQueryDto) {
    const { page, limit, skip } = getPagination(query);
    const filter: Record<string, unknown> = { deleted_at: { $exists: false } };
    if (query.status) filter.status = query.status;
    const [items, total] = await Promise.all([
      this.model.find(filter).select('-passwordHash').sort({ created_at: -1 }).skip(skip).limit(limit).lean(),
      this.model.countDocuments(filter),
    ]);
    return { items, meta: buildPaginationMeta(page, limit, total) };
  }

  async findOne(id: string) {
    const record = await this.model.findById(id).select('-passwordHash').lean();
    if (!record) throw new EntityNotFoundException('User', id);
    return record;
  }

  async create(dto: CreateUserDto) {
    const payload = { ...dto } as Record<string, unknown>;
    if (payload.password) {
      payload.passwordHash = await bcrypt.hash(String(payload.password), 12);
      delete payload.password;
    }
    return this.model.create(payload as never);
  }

  async update(id: string, dto: UpdateUserDto) {
    const payload = { ...dto } as Record<string, unknown>;
    if (payload.password) {
      payload.passwordHash = await bcrypt.hash(String(payload.password), 12);
      delete payload.password;
    }
    const updated = await this.model.findByIdAndUpdate(id, { $set: payload }, { new: true, runValidators: true }).select('-passwordHash').lean();
    if (!updated) throw new EntityNotFoundException('User', id);
    return updated;
  }

  async remove(id: string) {
    const removed = await this.model.findByIdAndUpdate(id, { $set: { deleted_at: new Date() } }, { new: true }).select('-passwordHash').lean();
    if (!removed) throw new EntityNotFoundException('User', id);
    return removed;
  }
}
