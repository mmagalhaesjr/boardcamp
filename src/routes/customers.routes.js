import { Router } from "express";
import { getCustomerId, insertCustomer, listCustomer, updateCustomer } from '../controller/customers.controller.js';
import { validateUpdateCustomer, validateCustomer } from '../middlewares/customer.middleware.js';


const customersRoutes = Router();



// inserir clientes
customersRoutes.post('/customers',validateCustomer,insertCustomer)

//listar clientes 
customersRoutes.get('/customers',listCustomer)

//buscar clientes por id
customersRoutes.get('/customers/:id',getCustomerId)

//atualizar cliente por id
customersRoutes.put('/customers/:id',validateUpdateCustomer,updateCustomer)







export default customersRoutes;