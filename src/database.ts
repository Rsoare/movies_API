import { Client } from "pg";

const client:Client = new Client({
   user:'Micro',
   host:'localhost',
   port:5432,
   password:'123456',
   database:'movies_sp2_m4'
})

const startDatabase = async():Promise<void> =>{
   await client.connect()
   console.log('Database connected')
}

export{client,startDatabase}