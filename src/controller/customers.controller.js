import { db } from '../config/database.js';

export async function insertCustomer(req,res){
const customers = req.body
await db.query(`INSERT INTO customers(name,phone,cpf,birthday)VALUES ($1, $2, $3, $4)`, [customers.name, customers.phone, customers.cpf, customers.birthday])
res.sendStatus(201)

}

export async function listCustomer(req,res){
 const customers = await db.query(`SELECT * FROM customers `)

res.send(customers.rows)

}




