export interface InvitationProps {
  id: string;
  token: string;
  email: string;
  createdBy: string;
  expiresAt: Date;
  usedAt: Date | null;
  createdAt: Date;
}

export class InvitationInvalidError extends Error {}

export class Invitation {
  private constructor(private readonly props: InvitationProps) {}

  static fromPersistence(props: InvitationProps): Invitation {
    return new Invitation(props);
  }

  get id(): string {
    return this.props.id;
  }
  get token(): string {
    return this.props.token;
  }
  get email(): string {
    return this.props.email;
  }
  get createdBy(): string {
    return this.props.createdBy;
  }
  get expiresAt(): Date {
    return this.props.expiresAt;
  }

  private get isExpired(): boolean {
    return this.props.expiresAt.getTime() < Date.now();
  }
  private get isUsed(): boolean {
    return this.props.usedAt !== null;
  }

  assertValidFor(email: string): void {
    if (this.isUsed) throw new InvitationInvalidError('Este convite já foi utilizado.');
    if (this.isExpired) throw new InvitationInvalidError('Este convite expirou.');
    if (this.props.email.toLowerCase() !== email.toLowerCase()) {
      throw new InvitationInvalidError('Este convite não pertence a este e-mail.');
    }
  }
}

export const INVITATION_REPOSITORY = Symbol('INVITATION_REPOSITORY');

export interface CreateInvitationProps {
  token: string;
  email: string;
  createdBy: string;
  expiresAt: Date;
}

export interface InvitationRepository {
  findByToken(token: string): Promise<Invitation | null>;
  create(props: CreateInvitationProps): Promise<Invitation>;
  markAsUsed(id: string): Promise<void>;
}
