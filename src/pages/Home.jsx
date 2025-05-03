import React, { useState } from 'react'
import Footer from '../compenents/Footer'
import Navbar from '../compenents/Navbar'
import pic from '../assets/chef_wiwi.png'
import { Link, useNavigate } from "react-router-dom";
import RecipeCard from '../compenents/RecipeCard';

function Home() {
  const [showModal, setShowModal] = useState(false);

  // const recette = {
  //   title: "Pasta à la Wiame",
  //   ingredients: [
  //     "200g de pâtes",
  //     "2 cuillères d'huile d'olive",
  //     "1 gousse d'ail",
  //     "Sel, poivre",
  //   ],
  //   steps: [
  //     "Faire bouillir de l'eau et cuire les pâtes.",
  //     "Faire revenir l'ail dans l'huile.",
  //     "Ajouter les pâtes, sel et poivre.",
  //     "Mélanger et servir chaud.",
  //   ],
  // };

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

          <Link
            to="/signup"
            className="rounded-2xl py-1 px-2 border bg-[rgb(255,255,255)] hover:bg-[rgb(243,180,78)] transition-colors duration-300"
          >
            Inscrivez-vous gratuitement
          </Link>
        </div>

        {/* section des recettes */}
        <section className='bg-[rgb(108,88,76)]'>
          <div className='flex justify-between items-center m-4'>
            <h1 className='text-center text-white font-bold text-3xl'> Les recettes </h1>
            
            <button 
              onClick={() => setShowModal(true)}
              className='text-white font-bold rounded-2xl py-1 px-2 bg-[rgb(181,138,115)] border border-[rgb(73,56,46)] hover:bg-[rgb(82,53,29)] transition-colors duration-300'
            > 
              ajoute une recette 
            </button>
          </div>
          {/* <div className="bg-[#6C584C] p-6 rounded-xl shadow-lg w-full max-w-lg text-white">
            <h2 className="text-2xl font-bold mb-4">{recette.title}</h2>
            <h3 className="font-semibold text-lg">Ingrédients :</h3>
            <ul className="list-disc list-inside mb-4 pl-2">
              {recette.ingredients.map((item, i) => (
                <li key={i} className="mb-1">{item}</li>
              ))}
            </ul>

            <h3 className="font-semibold text-lg">Étapes :</h3>
            <ol className="list-decimal list-inside pl-2">
              {recette.steps.map((step, i) => (
                <li key={i} className="mb-2">{step}</li>
              ))}
            </ol>
          </div> */}
        </section>

        <Footer />
      </div>
    </>
  )
}

export default Home