import React, { useState, useEffect } from 'react'
import Footer from '../compenents/Footer'
import Navbar from '../compenents/Navbar'
import pic from '../assets/chef_wiwi.png'
import { Link, useNavigate } from "react-router-dom";
import RecipeCard from '../compenents/RecipeCard';
import axios from 'axios';
import '../index.css'



function Home() {
  const [showModal, setShowModal] = useState(false);
  const [recipes, setRecipes] = useState([]);

  
  
  

  const username = localStorage.getItem('username');
  const isLoggedIn = Boolean(username);

  useEffect(() => {
   
    axios.get('http://localhost:3000/recipes')
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des recettes:", error);
      });
  }, []);
  

 

  const handleRecipeAdded = (newRecipe) => {
    setShowModal(false); 
  };

  return (
    <>
      <Navbar />

      <div className='bg-[rgb(246,233,215)]'>
        {/* Modal overlay */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
            <div className="bg-[#6C584C] rounded-lg shadow-xl w-full h-full md:h-auto md:max-h-[90vh] md:w-[90vw] mx-4 z-50 flex flex-col overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b border-[#7d6a5c]">
                <h2 className="text-2xl font-semibold text-white">Ajouter une recette</h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-white hover:text-gray-200 text-3xl font-bold"
                >
                  &times;
                </button>
              </div>
              <div className="p-6 flex-1 overflow-y-auto">
                <RecipeCard onRecipeAdded={handleRecipeAdded} />
              </div>
            </div>
          </div>
        )}

        <div className='flex justify-center items-center'>
          <div className='w-[200px] '>
            <img src={pic} alt="picture" />
          </div>
        </div>
        <div className='flex flex-col justify-center items-center gap-y-8'>
          <h1 className='font-bold text-xl text-center'> Wecoook with wiame </h1>
          <h2 className='font-bold text-4xl text-center'> 
            Maîtrisez vos fiches recettes. Créez sans limites. </h2>

          <p className='text-center'>Centralisez vos recettes, maîtrisez vos coûts, optimisez vos commandes. Libérez votre créativité.</p>
          
          {!isLoggedIn ? ( 
          <>
          <Link
            to="/signup"
            className="rounded-2xl py-1 px-2 border bg-[rgb(255,255,255)] hover:bg-[rgb(243,180,78)] transition-colors duration-300"
          >
            Inscrivez-vous gratuitement
          </Link>

          </>

          ):(
            <button 
            onClick={() => setShowModal(true)}
            className='text-white font-bold rounded-2xl py-1 px-2 bg-[rgb(181,138,115)] border border-[rgb(73,56,46)] hover:bg-[rgb(82,53,29)] transition-colors duration-300'
          > 
            ajoute une recette 
          </button>

          )}
          
        </div>

        {/* section des recettes */}
        <section className='bg-[rgb(108,88,76)]'>
          <div className='flex justify-center items-center m-4'>
            <h1 className='text-center text-white font-bold text-3xl'> Les recettes </h1>
            
            {/* <button 
              onClick={() => setShowModal(true)}
              className='text-white font-bold rounded-2xl py-1 px-2 bg-[rgb(181,138,115)] border border-[rgb(73,56,46)] hover:bg-[rgb(82,53,29)] transition-colors duration-300'
            > 
              ajoute une recette 
            </button> */}
          </div>
          <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                  <div key={recipe.id} className="bg-[#f2c57c] p-4 rounded-lg shadow-lg">
                    {recipe.image && (
                      <img src={recipe.image} alt={recipe.title} className="w-[600px] h-[400px] object-cover rounded" />
                    )}

                    <div className='flex justify-between items-center mb-4'>
                        <h2 className="text-xl text-white font-semibold mt-2">{recipe.title}</h2>
                        {/* <p className="text-sm text-gray-600">Origine : {recipe.origine}</p>
                        <p className="text-gray-800 mt-2"><strong>Ingrédients :</strong> {recipe.ingredient}</p>
                        <p className="text-gray-800 mt-2"><strong>Étapes :</strong> {recipe.instructions}</p> */}
                      
                      <Link to={`/recipes/${recipe.id}`}>
                      <button className="mt-4 bg-[#A1C181] text-white px-4 py-2 rounded  hover:bg-[#5a473c]">
                        Details
                      </button>
                      </Link>
                    </div>
                  </div>

                  
                ))}
              </div>
            </div>
            
            <Footer />
        </section>
      </div>
     
    </>
  )
}

export default Home