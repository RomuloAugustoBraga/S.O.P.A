import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/infrastructure/prisma/prisma.service';
import { CreateUserProps, User, UserRepository } from '../domain/user';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const record = await this.prisma.user.findUnique({ where: { id } });
    return record ? User.fromPersistence(record) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const record = await this.prisma.user.findUnique({ where: { email } });
    return record ? User.fromPersistence(record) : null;
  }

  async create(props: CreateUserProps): Promise<User> {
    const record = await this.prisma.user.create({
      data: {
        email: props.email,
        passwordHash: props.passwordHash,
        isOwner: props.isOwner ?? false,
      },
    });
    return User.fromPersistence(record);
  }
}
