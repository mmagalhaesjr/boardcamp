import { Router } from "express";

const rentalsRoutes = Router();





//listar alugueis
rentalsRoutes.get('/rentals');

//inserir alugueis
rentalsRoutes.post('/rentals');

// finalizar aluguel
rentalsRoutes.post('/rentals/:id/return');

//apagar alugueis
rentalsRoutes.delete('/rentals/:id');


export default rentalsRoutes;

