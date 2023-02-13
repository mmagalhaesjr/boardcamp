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

export async function getCustomerId(req,res){
    const userId = req.params.id

   const user = await db.query(`SELECT * FROM customers WHERE id = $1`,[userId])

   if(!user.rows[0]){
    return res.sendStatus(404)
   }
    
   res.send(user.rows[0])
     
}

export async function updateCustomer(req,res){
    const {name,phone,cpf,birthday} = req.body
    const id = req.params.id
    

   const update = await db.query(`UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4  WHERE id = $5`,[name,phone,cpf,birthday,id])

   if(update.rowCount == 0){
    return res.sendStatus(404)
   }
   
   res.sendStatus(200)

}
