import logo from './logo.svg';
import './App.css';
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const query = gql`
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
`



function App() {
  const { data, loading, error } = useQuery(query)
  
  if(loading) return <h1>Loading...</h1>

  if (error) {
    return <p>Error loading todos: {error.message}</p>;
  }

  const todos = data?.getTodos || [];
  return (
    <div className="App">
      <h1>Todo List</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Completed</th>
            <th>User ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>

        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.completed ? "Yes" : "No"}</td>
              <td>{todo.userId}</td>
              <td>{todo.user?.name || "N/A"}</td>
              <td>{todo.user?.email || "N/A"}</td>
              <td>{todo.user?.phone || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
