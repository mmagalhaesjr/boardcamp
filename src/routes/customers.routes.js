import { Router } from "express";
import { insertCustomer, listCustomer } from '../controller/customers.controller.js';
import { validateCustomer } from '../middlewares/customer.middleware.js';


const customersRoutes = Router();



// inserir clientes
customersRoutes.post('/customers',validateCustomer,insertCustomer)

//listar clientes 
customersRoutes.get('/customers',listCustomer)

//buscar clientes por id
customersRoutes.get('/customers/:id')

//atualizar cliente por id
customersRoutes.put('/customers/:id')







export default customersRoutes;