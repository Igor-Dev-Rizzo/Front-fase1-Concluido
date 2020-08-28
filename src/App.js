import React, { useEffect, useState } from "react";
import api from "./services/api";
import "./styles.css";

export default function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get("repositories").then((res) => {
      setRepositories(res.data);
    });
  }, []);
  async function handleAddRepository() {
    // TODO
    const res = await api.post("repositories", {
      title: "Igor",
      url: "https://github.com/",
      techs: ["Node", "React Native"],
    });
    setRepositories([...repositories, res.data]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter((repository) => repository.id != id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}
