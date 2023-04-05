import { Request, Response, response } from "express";
import { Imovies, ImoviesResquest } from "./interfaces";
import { QueryConfig, QueryResult } from "pg";
import { client } from "./database";

const postMovies = async (
   req: Request,
   res: Response
   ): Promise<Response> => {

   const moviesData: ImoviesResquest = req.body;

   const queryString: string = `

   INSERT INTO
      movies 
      (name,category,duration,price)     

   VALUES
      ($1, $2, $3, $4)

   RETURNING *;
   `;

   const queryConfig: QueryConfig = {
      text: queryString,
      values: Object.values(moviesData),
   };

   const queryResult: QueryResult<Imovies> = await client.query(queryConfig);

   return res.status(201).json(queryResult.rows[0]);
};


const getAllMovies = async (
   req:Request,
   res:Response
   ):Promise<Response> =>{

      const movies:Imovies = res.locals.listMovies

   return res.json(movies)
}

const getMoviesById = async (
   req:Request,
   res:Response
):Promise<Response> =>{

   const movie:Imovies = res.locals.MovieById

   return res.json(movie)

}

const updateMoviesById = async (
   req:Request,
   res:Response
):Promise<Response> => {

   const moviesData:ImoviesResquest = req.body

   const id: number = parseInt(req.params.id) 

   const queryString:string = `
   UPDADE 
      movies
   
   SET
      () = ROW()

   WHERE id = $1;

   `

   const queryConfig:QueryConfig ={
      text:queryString,
      values:[id]
   }

   const queryResult:QueryResult<Imovies> = await client.query(queryConfig)

   return res.status(201).json(queryResult)
}


export { postMovies,getAllMovies,getMoviesById };