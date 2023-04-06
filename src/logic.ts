import { Request, Response } from "express";
import { Imovies, ImoviesResquest } from "./interfaces";
import { QueryConfig, QueryResult } from "pg";
import { client } from "./database";
import format from "pg-format";

const postMovies = async (
   req: Request, 
   res: Response): 
   Promise<Response> => {

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
   req: Request,
   res: Response): 
   Promise<Response> => {

   const category: any = req.query;

   const queryParamValues: any[] = Object.values(category);
   const queryParamKeys: any[] = Object.keys(category);

   const movies: Imovies = res.locals.listMovies;

   if (queryParamValues.length !== 0) {
      const queryString: string = format(
         `
   
         SELECT
            *
   
         FROM
            movies
   
         WHERE
         %I = %L
   
         `,
         queryParamKeys,
         queryParamValues
      );

      const queryResult: QueryResult = await client.query(queryString);

      if (queryResult.rows.length == 0) {
         return res.json(movies);
      }

      return res.json(queryResult.rows);
   }

   return res.json(movies);
};



const getMoviesById = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const movie: Imovies = res.locals.MovieById;

   return res.json(movie);
};



const updateMoviesById = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const moviesData: Partial<ImoviesResquest> = req.body;

   const id: number = parseInt(req.params.id);

   const queryString: string = format(
      `

      UPDATE 
         movies
         SET(%I) = ROW(%L)

      WHERE 
         id = $1

      RETURNING *;

      `,
      Object.keys(moviesData),
      Object.values(moviesData)
   );

   const queryConfig: QueryConfig = {
      text: queryString,
      values: [id],
   };

   const queryResult: QueryResult<Imovies> = await client.query(queryConfig);

   return res.json(queryResult.rows[0]);
};



const deleteMoviesById = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const id: number = parseInt(req.params.id);

   const queryString: string = `

   DELETE FROM 
      movies
   
   WHERE
      id = $1

   `;

   const queryConfig: QueryConfig = {
      text: queryString,
      values: [id],
   };

   await client.query(queryConfig);

   return res.status(204).send();
};
export {
   postMovies,
   getAllMovies,
   getMoviesById,
   updateMoviesById,
   deleteMoviesById,
};
