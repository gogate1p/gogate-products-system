import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../common/prisma.service';
import { UserRole } from '@gogate/database';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(email: string, password: string, role: UserRole, profile?: Record<string, string>) {
    const exists = await this.prisma.user.findUnique({ where: { email } });
    if (exists) throw new ConflictException('Email already registered');
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { email, passwordHash, role, status: 'PENDING' },
    });
    if (role === 'SELLER' && profile) {
      await this.prisma.sellerProfile.create({
        data: {
          userId: user.id,
          sellerId: `GP-SELLER-${Date.now().toString().slice(-5)}`,
          businessName: profile.businessName || 'Pending',
          ownerName: profile.ownerName || 'Pending',
          address: profile.address || '',
          pincode: profile.pincode || '',
        },
      });
    }
    if (role === 'CUSTOMER' && profile) {
      await this.prisma.customerProfile.create({
        data: { userId: user.id, fullName: profile.fullName || email },
      });
    }
    return this.tokenFor(user.id, user.email, user.role);
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || user.status === 'DISABLED') throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    return this.tokenFor(user.id, user.email, user.role);
  }

  private tokenFor(sub: string, email: string, role: UserRole) {
    const accessToken = this.jwt.sign({ sub, email, role });
    return { accessToken, role, email };
  }
}
