import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';
import { OwnerGuard } from '../../../shared/guards/owner.guard';
import type { AuthenticatedUser } from '../../../shared/types/authenticated-user.interface';
import { InvitationsService } from '../application/invitations.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';

@Controller('invitations')
@UseGuards(OwnerGuard)
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Post()
  create(@Body() dto: CreateInvitationDto, @CurrentUser() user: AuthenticatedUser) {
    return this.invitationsService.create({ email: dto.email, createdBy: user.id });
  }
}
