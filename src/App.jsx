import { useState, useEffect } from "react";
import Logo from "./components/Logo/Logo";
import Pokecard from "./components/Pokecard/Pokecard";

export default function App() {
  // State
  const [pokemons, setPokemons] = useState([]);

  // récupérer les 30 premiers pokemons
  const fetchPokemons = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    //console.log(response);
    const data = await response.json();
    //console.log(data);

    //details des pokemons
    const promises = data.results.map(async (pokemon) => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      return await response.json();
    });
    const results = await Promise.all(promises);
    console.log(results);
    setPokemons(results);
  };

  useEffect (() => {
    fetchPokemons();
  })
  

  return (
    <div>
      <Logo />
      <div>
        {/* Pokemons */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 max-w-7xl mx-auto mt-10 md:p-0 p-5">
          {pokemons.map((pokemon, index) => (
            <Pokecard key={index} pokemon={pokemon} />
          ))}
        </div>
      </div>
    </div>
  );
}
