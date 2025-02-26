import type { User } from "@prisma/client";
import type { UserRepository } from "@/domain/repositories/userRepository";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PsUserRepository implements UserRepository {
  async create(user: Omit<User, "id" | "createdAt">): Promise<User> {
    const createdUser = await prisma.user.create({
      data: user,
    });
    return createdUser;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user || null;
  }

  async update(id: string, user: Partial<Omit<User, "id" | "createdAt">>): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: user,
    });
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}
