import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createHash } from 'node:crypto';
import { User, UserDocument } from '../../database/schemas/user.schema';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.userModel.findOne({ email: dto.email.toLowerCase(), deleted_at: { $exists: false } }).lean();
    if (!user) throw new UnauthorizedException('Invalid email or password');

    // Replace this placeholder with bcrypt/argon2 verification before production.
    const passwordHash = createHash('sha256').update(dto.password).digest('hex');
    if (user.passwordHash && user.passwordHash !== passwordHash) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: String(user._id), id: String(user._id), email: user.email, role: user.role, permissions: user.permissions ?? [] };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      user: { id: String(user._id), email: user.email, name: user.name, role: user.role, permissions: user.permissions ?? [] },
    };
  }

  async me(userId: string) {
    return this.userModel.findById(userId).select('-passwordHash').lean();
  }

  refresh() {
    return { message: 'Refresh token rotation endpoint placeholder' };
  }

  logout() {
    return { message: 'Logged out' };
  }

  forgotPassword(email: string) {
    return { message: `Password reset flow accepted for ${email}` };
  }

  resetPassword() {
    return { message: 'Password reset completed' };
  }
}
