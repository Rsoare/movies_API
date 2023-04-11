import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { Imovies, ImoviesResquest } from "./interfaces";
import { client } from "./database";

const checkingDuplicateNames = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<Response | void> => {
   const { name }: ImoviesResquest = req.body;

   const queryString: string = `

   SELECT 
      *   

   FROM
      movies;
   `;

   const queryResult: QueryResult<Imovies> = await client.query(queryString);

   res.locals.listMovies = queryResult.rows;

   const filterMovies:Imovies | undefined = queryResult.rows.find((movie) => movie.name == name);

   if (filterMovies) {
      return res.status(409).json({
         error: "Movie name already exists!",
      });
   }

   return next();
};

const checkExistsId = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<Response | void> => {
   const id: number = parseInt(req.params.id);

   const queryString: string = `

      SELECT 
         *

      FROM
         movies

      WHERE
         id = $1;
      `;

   const queryConfig: QueryConfig = {
      text: queryString,
      values: [id],
   };

   const queryResult: QueryResult<Imovies> = await client.query(queryConfig);

   res.locals.MovieById = queryResult.rows[0];

   if (queryResult.rowCount == 0) {
      return res.status(404).json({ error: "Movie not found!" });
   }

   return next();
};

export { checkingDuplicateNames, checkExistsId };
