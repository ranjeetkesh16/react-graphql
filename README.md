# React GraphQL App

This project is a simple full-stack example that combines a React client with a GraphQL server. The frontend uses Apollo Client to fetch data from a GraphQL API, and the backend exposes GraphQL resolvers using Apollo Server and Express. The data source is the public JSONPlaceholder API via Axios.

## Project overview

The application demonstrates how to:

- Build a GraphQL API with Apollo Server
- Expose queries for users and todos
- Resolve nested relations between todos and users
- Consume the API from a React frontend with Apollo Client
- Render data in a table-based UI

## Tech stack

- React
- Apollo Client
- Apollo Server
- Express
- GraphQL
- Axios
- JSONPlaceholder API

## Project structure

```text
react-graphql/
├── client/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── package-lock.json
├── server/
│   ├── node_modules/
│   ├── package.json
│   ├── package-lock.json
│   ├── index.js
│   └── server.js
├── read.txt
└── README.md
```

## Backend implementation

The server is configured in `server/server.js`.

It creates an Apollo Server instance with this schema:

- `User`
  - `id`
  - `name`
  - `username`
  - `email`
  - `phone`
  - `website`
- `Todo`
  - `id`
  - `title`
  - `completed`
  - `userId`
  - `user`
- `Query`
  - `getTodos`
  - `getAllUsers`
  - `getUser(id: ID!)`

The backend resolves the `user` field on each todo by fetching the matching user from `https://jsonplaceholder.typicode.com/users/{id}`.

The GraphQL server is mounted at:

```text
http://localhost:8000/graphql
```

## Frontend implementation

The React app in `client/src/index.js` sets up Apollo Client with:

```js
new HttpLink({
  uri: "http://localhost:8000/graphql",
})
```

The app in `client/src/App.js` queries todos and nested user data using GraphQL:

```graphql
query getAllTools {
  getTodos {
    id
    title
    completed
    userId
    user {
      id
      email
      name
      phone
    }
  }
}
```

Then it renders a table containing:

- Todo ID
- Title
- Completion status
- User ID
- User name
- User email
- User phone

## How to run

### 1) Install backend dependencies

```bash
cd server
npm install
```

### 2) Start the GraphQL server

```bash
cd server
node server.js
```

You should see output similar to:

```text
Server Started at PORT 8000
```

### 3) Install frontend dependencies

```bash
cd client
npm install
```

### 4) Start the React app

```bash
cd client
npm start
```

The app should open in the browser at:

```text
http://localhost:3000
```

## Sample GraphQL query

This query is the same pattern used in the project notes and client code:

```graphql
query getAllTools($getUserID: ID!) {
  getAllUsers {
    id
    name
    email
    phone
  }
  getTodos {
    id
    title
    completed
  }
  getUser(id: $getUserID) {
    id
    name
    email
    phone
  }
}
```

Variables:

```json
{
  "getUserID": "2"
}
```

## Notes

- The client is a React application created with Create React App.
- The server is a standalone GraphQL HTTP server built with Express and Apollo Server.
- The project uses JSONPlaceholder as a mock backend for users and todos, making it easy to learn GraphQL concepts without a database.
- The current app demonstrates the practical flow of GraphQL queries from frontend to backend and nested relational data resolution.
