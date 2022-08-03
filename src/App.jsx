import { useEffect, useState } from "react";
import "./App.css";

function useAnimalSearch() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const lastquery = localStorage.getItem("lastquery");
    search(lastquery); 
  }, []);

  const search = async (q) => {
    const response = await fetch('http://localhost:8080?' + new URLSearchParams({ q }));
    const data = await response.json();
    setAnimals(data);

    localStorage.setItem("lastquery", q);
  };

  return { animals, search };
}

function App() {

  const { animals, search } = useAnimalSearch();

  return (
    <main>
      <h1>Animal Farm</h1>

      <input
        type="text"
        placeholder="Enter a keyword"
        onChange={(e) => search(e.target.value)}
      />

      <ul>
        {animals.map((animal) => (
          <li key={animal.id}>
            <strong>{animal.type} </strong>
            {animal.name} {animal.age}
          </li>
        ))}
        {animals.length === 0 && <p>No animals found</p>}
      </ul>
    </main>
  );
}

export default App;
