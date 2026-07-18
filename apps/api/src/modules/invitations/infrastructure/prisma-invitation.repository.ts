import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/infrastructure/prisma/prisma.service';
import { CreateInvitationProps, Invitation, InvitationRepository } from '../domain/invitation';

@Injectable()
export class PrismaInvitationRepository implements InvitationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByToken(token: string): Promise<Invitation | null> {
    const record = await this.prisma.invitation.findUnique({ where: { token } });
    return record ? Invitation.fromPersistence(record) : null;
  }

  async create(props: CreateInvitationProps): Promise<Invitation> {
    const record = await this.prisma.invitation.create({
      data: {
        token: props.token,
        email: props.email,
        createdBy: props.createdBy,
        expiresAt: props.expiresAt,
      },
    });
    return Invitation.fromPersistence(record);
  }

  async markAsUsed(id: string): Promise<void> {
    await this.prisma.invitation.update({ where: { id }, data: { usedAt: new Date() } });
  }
}
