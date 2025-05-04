import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    setIsLoggedIn(!!userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("username");
    setIsLoggedIn(false);

    window.location.reload();

    navigate("/");
  };

  return (
    <nav className="bg-[rgb(161,193,129)] p-4 shadow-lg text-black">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          
          <Link to="/Accueil" className=" text-2xl font-bold">
            Wecoook
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className=" hover:text-[rgb(243,180,78)] transition-colors duration-300"
          >
            Accueil
          </Link>
            
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className=" hover:text-[rgb(243,180,78)] transition-colors duration-300"
              >
                se connecter
              </Link>
              <Link
                to="/signup"
                className=" rounded-2xl py-1 px-2 border bg-[rgba(100,82,65,0.47)] hover:bg-[rgb(243,180,78)]  transition-colors duration-300"
              >
                S’inscrire
              </Link>
            </>

          ) : (
            <button
              onClick={handleLogout}
              className="hover:text-[rgb(243,180,78)] transition-colors duration-300"
            >
              Déconnexion
            </button>
          )}
           
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
