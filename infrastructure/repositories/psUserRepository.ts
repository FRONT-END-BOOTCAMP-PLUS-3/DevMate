import type { User } from "@prisma/client";
import type { UserRepository } from "@/domain/repositories/userRepository";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PsUserRepository implements UserRepository {
  async create(user: Omit<User, "id" | "createdAt">): Promise<User> {
    try {
      const createdUser = await prisma.user.create({
        data: user,
      });
      return createdUser;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
      throw new Error("An error occurred during user creation");
    } finally {
      await prisma.$disconnect();
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      return user || null;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
      return null;
    } finally {
      await prisma.$disconnect();
    }
  }

  async findByIdWithTechStack(id: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        include: { techStackTags: true },
      });
      return user || null;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
      return null;
    } finally {
      await prisma.$disconnect();
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      return user || null;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
      return null;
    } finally {
      await prisma.$disconnect();
    }
  }

  async update(id: string, user: Partial<Omit<User, "id" | "createdAt">>): Promise<User> {
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: user,
      });
      return updatedUser;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
      throw new Error("An error occurred during user update");
    } finally {
      await prisma.$disconnect();
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.user.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
      throw new Error("An error occurred during user deletion");
    } finally {
      await prisma.$disconnect();
    }
  }
}
