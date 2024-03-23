import { PrismaClient } from "@prisma/client";
import { IUser, IUserRepository } from "../types";
import { User } from "../entities/user-repository";

export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async save(user: IUser): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  }
  public async findByEmail(email: string): Promise<IUser | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return undefined;

    return new User(user.id, user.name, user.email);
  }
}
