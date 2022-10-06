import { PrismaClient } from "@prisma/client";
import { hash } from 'bcrypt';
import jwb from 'jsonwebtoken';

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

    const cliente = await prisma.Cliente.create({
			data: {
				email,
				name,
				password
			},
    });

    const token = jwb.sign({ id: cliente.id }, dotenv.SALT, {
      expiresIn: 86400,
    })
    
    res.send(token);

  } catch (error) {
    res.status(500).send("Internal Server Error: " + error.message);
  }
};