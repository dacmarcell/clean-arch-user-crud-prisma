import { PrismaUserRepository } from "../src/repositories/prisma-user-repository";
import prisma from "./prisma-client";

describe("PrismaUserRepository", () => {
  const userRepository = new PrismaUserRepository(prisma);

  beforeAll(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should be able to create a new user", async () => {
    await userRepository.save({
      id: 1,
      name: "Shrek de Andrade",
      email: "shrek_de_andrade@email.com",
    });

    const user = await userRepository.findByEmail("shrek_de_andrade@email.com");

    expect(user).toHaveProperty("id");
    expect(user?.name).toBe("Shrek de Andrade");
  });
});
