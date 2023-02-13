import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import gamesRoutes from './routes/games.routes.js';
import customersRoutes from './routes/customers.routes.js';
import rentalsRoutes from './routes/rentals.routes.js';

dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());

app.use([gamesRoutes,customersRoutes,rentalsRoutes]);


const porta = process.env.PORTA  || 5000;
app.listen(porta, () => {
    console.log(`*** RODANDO NA PORTA ${porta} ***`);

});


