import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="flex justify-center pb-10">
      <div className="font-semibold text-xl rounded-full overflow-hidden">
        {/* Links */}
        <div className="flex bg-gray-700/50 text-white ">
          <Link
            to="/"
            className="border-r border-gray-600 px-5 py-2 hover:bg-gray-800 transition duration-300 ease-in-out"
          >
            Accueil
          </Link>
          <Link
            to="/about"
            className="border-r border-gray-600 px-5 py-2 hover:bg-gray-800 transition duration-300 ease-in-out"
          >
            À Propos
          </Link>
          <Link
            to="/create-pokemon"
            className="px-5 py-2 hover:bg-gray-800 transition duration-300 ease-in-out"
          >
            Créer un pokémon
          </Link>
        </div>
      </div>
    </nav>
  );
}
