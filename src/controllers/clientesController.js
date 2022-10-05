import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const criarCliente = async (req, res) => {
  console.log(req);
  try {
    const criar = await prisma.cliente.create({
			data: {
				email,
				name,
				password
			},
    });
      res.status(200).json(criar);
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error.message);
  }
};