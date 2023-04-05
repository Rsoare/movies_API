interface Imovies {
   id: number
   name:string
   category:string
   duration:number
   price:number
}

type ImoviesResquest = Omit<Imovies,'id'>

export {Imovies,ImoviesResquest}