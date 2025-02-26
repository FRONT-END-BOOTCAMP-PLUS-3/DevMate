import type { User } from "@prisma/client";
import type { UserRepository } from "@/domain/repositories/userRepository";

import { PrismaClient } from "@prisma/client";

export class PsUserRepository implements UserRepository {
  async create(user: Omit<User, "id" | "createdAt">): Promise<User> {
    const prisma = new PrismaClient();
    const createdUser = await prisma.user.create({
      data: user,
    });
    return createdUser;
  }

  async findById(id: string): Promise<User | null> {
    const prisma = new PrismaClient();
    return prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    const prisma = new PrismaClient();
    return prisma.user.findUnique({ where: { email } });
  }

  async update(id: string, user: Partial<Omit<User, "id" | "createdAt">>): Promise<User> {
    const prisma = new PrismaClient();
    return prisma.user.update({
      where: { id },
      data: user,
    });
  }

  async delete(id: string): Promise<void> {
    const prisma = new PrismaClient();
    await prisma.user.delete({ where: { id } });
  }
}
