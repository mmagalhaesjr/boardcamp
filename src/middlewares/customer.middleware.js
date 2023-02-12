import { customerSchema } from "../model/schemas.js";
import { db } from "../config/database.js";


export async function validateCustomer(req,res,next){

    const customer = req.body
    const {error}  = customerSchema.validate(customer);

    if(error){
       return res.sendStatus(400)
    }

    const duplicated = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [customer.cpf])

    if(duplicated.rows[0]){
       return res.sendStatus(409)
    }
  next()
}






