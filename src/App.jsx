import { useState } from "react";
import Logo from "./components/Logo/Logo";
import Pokecard from "./components/Pokecard/Pokecard";

export default function App() {
    // State
    const [pokemons, setPokemons] = useState([]);

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
