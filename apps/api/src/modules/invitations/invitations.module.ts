import { Module } from '@nestjs/common';
import { InvitationsService } from './application/invitations.service';
import { INVITATION_REPOSITORY } from './domain/invitation';
import { PrismaInvitationRepository } from './infrastructure/prisma-invitation.repository';
import { InvitationsController } from './presentation/invitations.controller';

@Module({
  controllers: [InvitationsController],
  providers: [
    InvitationsService,
    { provide: INVITATION_REPOSITORY, useClass: PrismaInvitationRepository },
  ],
  exports: [INVITATION_REPOSITORY],
})
export class InvitationsModule {}
