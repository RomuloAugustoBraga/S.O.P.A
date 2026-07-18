export interface UserProps {
  id: string;
  email: string;
  passwordHash: string;
  status: string;
  isOwner: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private constructor(private readonly props: UserProps) {}

  static fromPersistence(props: UserProps): User {
    return new User(props);
  }

  get id(): string {
    return this.props.id;
  }
  get email(): string {
    return this.props.email;
  }
  get passwordHash(): string {
    return this.props.passwordHash;
  }
  get isOwner(): boolean {
    return this.props.isOwner;
  }
  get isActive(): boolean {
    return this.props.status === 'active';
  }
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface CreateUserProps {
  email: string;
  passwordHash: string;
  isOwner?: boolean;
}

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(props: CreateUserProps): Promise<User>;
}
