import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import '../index.css'

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  
  useEffect(() => {
    axios.get(`http://localhost:3000/recipes/${id}`)
      .then((response) => setRecipe(response.data))
      .catch((error) => console.error('Error fetching recipe:', error));
  }, [id]);
  
  if (!recipe) return <div className="flex justify-center items-center h-screen">Chargement...</div>;
  
  return (
    <div>
    <Navbar/>
    <div className="bg-[#F6E9D7] p-8 w-full mx-auto">
        
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-8">{recipe.title}</h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-64 object-cover rounded-lg shadow-md" 
          />
        </div>
        
        <div className="md:w-1/2">
          <div className="mb-4">
            <h2 className="text-lg mb-1">origine:</h2>
            <p className="text-lg font-semibold">{recipe.origine}</p>
          </div>
          
          <div>
            <h2 className="text-lg mb-1">ingredient:</h2>
            <div className=" bg-[#6C584C] text-white p-4 rounded-md h-32 overflow-y-auto">
              {recipe.ingredient}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-lg mb-1">les etapes:</h2>
        <div className=" bg-[#6C584C] text-white p-4 rounded-md min-h-48 overflow-y-auto">
          {recipe.instructions}
        </div>
      </div>
     
    </div>
 <Footer/>
    </div>
  );
};

export default RecipeDetails;