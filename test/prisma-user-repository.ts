import { PrismaUserRepository } from "../src/repositories/prisma-user-repository";
import { expect } from "chai";
import prisma from "./prisma-client";

describe("PrismaUserRepository", () => {
  const userRepository = new PrismaUserRepository(prisma);

  before(async () => {
    await prisma.user.deleteMany();
  });

  after(async () => {
    await prisma.$disconnect();
  });

  it("should be able to create a new user", async () => {
    await userRepository.save({
      id: 1,
      name: "Shrek de Andrade",
      email: "shrek_de_andrade@email.com",
    });

    const user = await userRepository.findByEmail("shrek_de_andrade@email.com");

    expect(user).to.have.property("id");
    expect(user?.name).to.be("Shrek de Andrade");
  });
});
