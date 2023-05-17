# Locadora de Filmes

## Endpoints da aplicação

| Método | Endpoint    | Responsabilidade       |
| ------ | ----------- | ---------------------- |
| POST   | /movies     | Criar os filmes        |
| GET    | /movies     | Listar todos os filmes |
| GET    | /movies/:id | Buscar filme por id    |
| PATCH  | /movies/:id | Atualizar filme por id |
| DELETE | /movies/:id | Deletar filme por id   |

#

## Regras da aplicação

### GET /movies

-   A rota **GET /movies**, além de listar todos os filmes do cinema, também consegui listar os filmes a partir da categoria específica.
    -   Essa categoria deve ser enviada pelo query parameter **category**.
    -   Caso a categoria enviada não exista, ela retornar todos os filmes do banco.

## Exemplos de requisição

### POST /movies

Rota de criação de filme.
| **Corpo da requisição:** |
|-|

```json
{
    "name": "Divertidamente",
    "category": "Animação",
    "duration": 120,
    "price": 35
}
```

| **Resposta do servidor:**           |
| ----------------------------------- |
| **Status code:** **_201 CREATED._** |

```json
{
    "id": 1,
    "name": "Divertidamente",
    "category": "Animação",
    "duration": 120,
    "price": 35
}
```

### GET /movies

Rota de listagem de filmes. 
| Resposta do servidor: |
| - |
|**Status code:** **_200 OK._**|

```json
[
    {
        "id": 1,
        "name": "Divertidamente",
        "category": "Animação",
        "duration": 120,
        "price": 35
    },
    {
        "id": 2,
        "name": "Matrix",
        "category": "Ficção",
        "duration": 120,
        "price": 35
    }
]
```

#### Com query parameter

O exemplo abaixo foi realizado na seguinte rota: **/movies?category=Animação**.
| Resposta do servidor: |
| - |
| **Status code:** **_200 OK._** |

```json
[
    {
        "id": 1,
        "name": "Divertidamente",
        "category": "Animação",
        "duration": 120,
        "price": 35
    }
]
```

#### Com query parameter

O exemplo abaixo foi realizado na seguinte rota: **/movies?category=outra categoria**.
| Resposta do servidor: |
| - |
| **Status code:** **_200 OK._** |

```json
[
    {
        "id": 1,
        "name": "Divertidamente",
        "category": "Animação",
        "duration": 120,
        "price": 35
    },
    {
        "id": 2,
        "name": "Matrix",
        "category": "Ficção",
        "duration": 120,
        "price": 35
    }
]
```

### GET /movies/:id

O exemplo abaixo foi realizado na seguinte rota: **/movies/1**.
| Resposta do servidor: |
| - |
| **Status code:** **_200 OK._** |

```json
{
    "id": 1,
    "name": "Divertidamente",
    "category": "Animação",
    "duration": 120,
    "price": 35
}
```

### PATCH /movies/:id

Todos os campos podem ser atualizados de forma opcional.

O exemplo abaixo foi realizado na seguinte rota: **/movies/2**.
| **Corpo da requisição:** |
|-|

```json
{
    "name": "Matrix 2"
}
```

| Resposta do servidor:          |
| ------------------------------ |
| **Status code:** **_200 OK._** |

```json
{
    "id": 2,
    "name": "Matrix 2",
    "category": "Ficção",
    "duration": 120,
    "price": 35
}
```

### DELETE /movies/:id

Rota de deleção de filme. É possível deletar um filme pelo id.
O exemplo abaixo foi realizado na seguinte rota: **/movies/1**.
| Resposta do servidor: |
|-|
|**Status code:** **_204 NO CONTENT._**|
