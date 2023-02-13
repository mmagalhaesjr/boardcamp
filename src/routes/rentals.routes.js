import { Router } from "express";
import { validateRentals, verifyRentalIdToDelete } from "../middlewares/rentals.middlewares.js";
import { deleteRental, insertRentals, listRentals } from '../controller/rentals.controller.js';

const rentalsRoutes = Router();





//listar alugueis
rentalsRoutes.get('/rentals', listRentals);

//inserir alugueis
rentalsRoutes.post('/rentals',validateRentals, insertRentals);

// finalizar aluguel
rentalsRoutes.post('/rentals/:id/return');

//apagar alugueis
rentalsRoutes.delete('/rentals/:id', verifyRentalIdToDelete, deleteRental);


export default rentalsRoutes;

