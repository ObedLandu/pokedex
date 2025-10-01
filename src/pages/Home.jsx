import { useState, useEffect } from "react";
import Pokecard from "../components/Pokecard/Pokecard";
import Logo from "../components/Logo/Logo";
import { toast } from "react-toastify";

export default function Home() {
  // States
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);

  // récupérer les 30 premiers pokemons
  const fetchPokemons = async (add = false) => {
    setLoading(true);
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=30${
        add && "&offset=" + pokemons.length
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
      //console.log(response);
      return await response.json();
    });
    const results = await Promise.all(promises);
    //console.log(results);
    setPokemons([...pokemons, ...results]);
    setLoading(false);
    toast.success("Pokemons chargés avec succès !");
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <div>
      <Logo />
      {/* Pokemons */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 max-w-7xl mx-auto mt-10 md:p-0 p-5">
        {pokemons.map((pokemon, index) => (
          <Pokecard key={index} pokemon={pokemon} />
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center text-white mt-5">
          Chargement...
        </div>
      )}

      {/* Add */}
      <div className="text-center my-10">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
          onClick={() => fetchPokemons(true)}
        >
          Get more pokemons
        </button>
      </div>
    </div>
  );
}
