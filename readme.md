# Backend Websocket

## Backend do projeto desenvolvido para a disciplina de PWII 2025.2

Grupo:

- [Gabriella](https://github.com/gabs44)
- [Maria Clara](https://github.com/marysclair)
- [Maurício](https://github.com/maueici0)

## Descrição do projeto

Esse projeto apresenta um exemplo simples, mas prático, de como utilizar o conceito de Websocket. Nesse repositório, você tem acesso ao backend da aplicação. Nessa aplicação, o usuário normal pode criar um pedido e atualizar o endereço daquele pedido. O usuário admin, que tem acesso a lista de todos os pedidos de todos os usuários cadastrados, vai poder vizualizar em tempo real a modificação de endereço, que é enviada via Websocket.

Então no geral: esse projeto funciona como uma API normal utilizando HTTP nas rotas, apenas utilizando Websocket na rota de patch para enviar o pedido atualizado com o endereço novo.

## Executando o projeto

Para executar o backend desse projeto (este repositório), execute os seguintes passos:

1. Clone esse repositório em um diretório na sua máquina

```
git clone https://github.com/marysclair/Backend-Websocket-PWII.git
```

2. Execute os seguintes comandos no terminal para baixar as dependências e executar a API em modo de desenvolvimento

```
npm install
npm run dev
```

Os usuários criados estão no array `userDb` que são:

```
  {
    id: "574fc54f-692b-49c2-908c-f2093ed15314",
    username: "clara",
    email: "clara@gmail.com",
    type: "user",
    orders: [],
  },
  {
    id: "574fc54f-692b-49c2-908c-f2093ed15314",
    username: "gabi",
    email: "gabi@gmail.com",
    type: "user",
    orders: [],
  },
  {
    id: "b774c88c-b3f5-47d0-850c-50d4792e2f68",
    username: "mauricio",
    email: "maueicio@gmail.com",
    type: "user",
    orders: [],
  },
  {
    id: "5f120b19-3eab-4f87-8c96-30ce7549f584",
    username: "admin",
    email: "admin@gmail.com",
    type: "admin",
    orders: [],
  } as UserAdmin,
];
```

## Documentação

Orders
URL | Método | Descrição
------|------------|-----
/order/ | POST | Recurso de criação de pedidos enviando como corpo da requisição os campos "address", "description" e "title
/order/ | GET | Recurso de exibição de todos os pedidos de todos os usuários acessado unicamente pelo usuário admin
/order/user | GET | Recurso de exibição de todos os pedidos do usuário especificado
/order/:orderId | PATCH | Recurso de atualização parcial das informações do pedido, enviando como parâmetro o id do pedido e como corpo o endereço
