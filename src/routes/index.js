import express from 'express'
import * as clientes from '../controllers/clientesController.js'
import bodyParser from "body-parser";
var jsonParser = bodyParser.json();

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'foi porra'
    })
})

router.post('/clientes/create', jsonParser, clientes.criarCliente);

export default router;