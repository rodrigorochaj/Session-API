import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwb from 'jsonwebtoken';

const prisma = new PrismaClient();

export const efetuarLogin = async (req, res) => { 
	try {
		const {
			email,
			password
		} = req.body;

		const cliente = await prisma.Cliente.findUnique({
			where: {
				email
			},
		})

		if (!cliente)
			return res.status(400).send({ error: "Email não encontrado"});

		if (!await bcrypt.compare(password, cliente.password))
			return res.status(400).send({ error: "Senha incorreta"});

		const token = jwb.sign({ id: cliente.id}, "b70e22e191ec7bef3139b47bc34ddde5", {
			expiresIn: 86400,
		});

		cliente.password = undefined;
		res.send({ cliente, token });

	} catch (error) {
		console.log(error)
    	res.status(500).send("Internal Server Error: " + error.message);
	}
}