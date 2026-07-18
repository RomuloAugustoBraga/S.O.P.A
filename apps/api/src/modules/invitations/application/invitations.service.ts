import { randomBytes } from 'node:crypto';
import { Inject, Injectable } from '@nestjs/common';
import { INVITATION_REPOSITORY, InvitationRepository } from '../domain/invitation';

const INVITATION_TTL_DAYS = 7;

export interface CreatedInvitation {
  token: string;
  email: string;
  expiresAt: Date;
}

@Injectable()
export class InvitationsService {
  constructor(@Inject(INVITATION_REPOSITORY) private readonly invitations: InvitationRepository) {}

  async create(input: { email: string; createdBy: string }): Promise<CreatedInvitation> {
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + INVITATION_TTL_DAYS * 24 * 60 * 60 * 1000);

    const invitation = await this.invitations.create({
      token,
      email: input.email,
      createdBy: input.createdBy,
      expiresAt,
    });

    return { token: invitation.token, email: invitation.email, expiresAt: invitation.expiresAt };
  }
}
