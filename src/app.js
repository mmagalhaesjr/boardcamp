import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import gamesRoutes from './routes/games.routes.js';
import customersRoutes from './routes/customers.routes.js';
import rentalsRoutes from './routes/rentals.routes.js';

dotenv.config();


const server = express();
server.use(express.json());
server.use(cors());

server.use([gamesRoutes,customersRoutes,rentalsRoutes]);


const porta = process.env.PORTA  || 5001;
server.listen(porta, () => {
    console.log(`*** RODANDO NA PORTA ${porta} ***`);

});


