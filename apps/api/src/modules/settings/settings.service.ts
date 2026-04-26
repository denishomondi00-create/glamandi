import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Setting, SettingDocument } from '../../database/schemas/setting.schema';

@Injectable()
export class SettingsService {
  constructor(@InjectModel(Setting.name) private readonly settingModel: Model<SettingDocument>) {}

  all() { return this.settingModel.find().sort({ group: 1, key: 1 }).lean(); }
  getGroup(group: string) { return this.settingModel.find({ group }).lean(); }
  async patchGroup(group: string, value: Record<string, unknown>) {
    return this.settingModel.findOneAndUpdate({ key: group }, { $set: { key: group, group, value } }, { upsert: true, new: true }).lean();
  }
}
