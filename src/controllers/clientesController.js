import { PrismaClient } from "@prisma/client";
import { hash } from 'bcrypt';

const prisma = new PrismaClient();


prisma.$use(async (params, next) => {
  if( params.model === "Cliente" && params.action === "create" ) {
      const hashedPassword = await hash(params.args.data.password, 10);
      params.args.data.password = hashedPassword;
  }
    const result = await next(params)
  
    return result
})

export const criarCliente = async (req, res) => {
  try {
    const {
      email,
      name,
      password,
    } = req.body;

    const criar = await prisma.Cliente.create({
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