import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();


const server = express();
server.use(express.json());
server.use(cors());




const porta = process.env.PORTA  || 5001;
server.listen(porta, () => {
    console.log(`*** RODANDO NA PORTA ${porta} ***`);

});


