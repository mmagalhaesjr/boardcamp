import { Router } from "express";

const customersRoutes = Router();



// inserir clientes
customersRoutes.post('/custumers')

//listar clientes 
customersRoutes.get('/custumers')

//buscar clientes por id
customersRoutes.get('/custumers/:id')

//atualizar cliente por id
customersRoutes.put('/custumers/:id')







export default customersRoutes;