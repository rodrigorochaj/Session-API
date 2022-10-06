import express from 'express'
import * as clientes from '../controllers/clientesController.js'
import * as login from '../controllers/loginController.js'
import bodyParser from "body-parser";
var jsonParser = bodyParser.json();

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'funcionando'
    })
})

router.post('/clientes/create', jsonParser, clientes.criarCliente);

router.get('/login', jsonParser, login.efetuarLogin);

export default router;