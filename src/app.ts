import express, { Application } from "express";
import { startDatabase } from "./database";
import { deleteMoviesById, getAllMovies, getMoviesById, postMovies, updateMoviesById } from "./logic";
import { checkExistsId, checkingDuplicateNames } from "./middlewares";

const app:Application = express()

app.use(express.json())

app.post('/movies',checkingDuplicateNames,postMovies)

app.get('/movies',checkingDuplicateNames,getAllMovies)

app.get('/movies/:id',checkExistsId,getMoviesById)

app.patch('/movies/:id',checkExistsId,checkingDuplicateNames,updateMoviesById)

app.delete('/movies/:id',checkExistsId,deleteMoviesById)


app.listen(3000,async () => {
   await startDatabase()
   console.log('Server started on port 3000');
})