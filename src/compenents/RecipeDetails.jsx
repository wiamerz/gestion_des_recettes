import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import '../index.css';
import { Trash2, Pencil } from 'lucide-react';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    origine: '',
    ingredient: '',
    instructions: '',
    image: ''
  });

  const username = localStorage.getItem('username');
  const isLoggedIn = Boolean(username);

  useEffect(() => {
    axios.get(`http://localhost:3000/recipes/${id}`)
      .then((res) => setRecipe(res.data))
      .catch((err) => console.error('Error fetching recipe:', err));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette recette ?")) {
      try {
        await axios.delete(`http://localhost:3000/recipes/${id}`);
        navigate('/');
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        alert("Échec de la suppression");
      }
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setFormData({
      title: recipe.title || '',
      origine: recipe.origine || '',
      ingredient: recipe.ingredient || '',
      instructions: recipe.instructions || '',
      image: recipe.image || ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/recipes/${id}`, formData);
      setRecipe(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("Échec de la mise à jour");
    }
  };

  if (!recipe) return <div className="flex justify-center items-center h-screen">Chargement...</div>;

  return (
    <div>
      <Navbar />
      <div className="bg-[#F6E9D7] p-8 w-full mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-8">{recipe.title}</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <img src={recipe.image} alt={recipe.title} className="w-[400px] h-[400px] object-cover rounded-lg shadow-md" />
          </div>
          <div className="md:w-1/2">
            <div className="mb-4">
              <h2 className="text-lg mb-1">Origine : {recipe.origine}</h2>
              {/* <p className="text-lg font-semibold"></p> */}
            </div>
            <div>
              <h2 className="text-lg mb-1">Ingrédients :</h2>
              <div className="bg-[#6C584C] text-white p-4 rounded-md min-h-32 overflow-y-auto">
                {recipe.ingredient}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
               <h2 className="text-lg mb-1">Instructions :</h2>
                <div className="bg-[#6C584C] text-white p-4 rounded-md min-h-48 overflow-y-auto">
                    {recipe.instructions}
                </div>
             </div>
        
        {isLoggedIn && (
        <div className="flex justify-center md:justify-end gap-4 mt-6">
          <button onClick={handleEditClick} className="bg-[#A1C181] hover:bg-[#8dbc5d] text-white py-2 px-4 rounded">
          <Pencil size={18} />
          </button>
          <button onClick={handleDelete} className="bg-[#F2C57C] hover:bg-[#e3b05e] text-white py-2 px-4 rounded">
          <Trash2 size={18} />
          
          </button>
        </div> 
      )}

        {isEditing && (
          <form onSubmit={handleEdit} className="mt-10 space-y-4 ">
            <div>
              <label className="block mb-1">Titre</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 rounded text-black"
              />
            </div>
            <div>
              <label className="block mb-1">Origine</label>
              <input
                type="text"
                name="origine"
                value={formData.origine}
                onChange={handleInputChange}
                className="w-full p-2 rounded text-black"
              />
            </div>
            <div>
              <label className="block mb-1">Ingrédients</label>
              <textarea
                name="ingredient"
                rows="4"
                value={formData.ingredient}
                onChange={handleInputChange}
                className="w-full p-2 rounded text-black"
              />
            </div>
            <div>
              <label className="block mb-1">Instructions</label>
              <textarea
                name="instructions"
                rows="4"
                value={formData.instructions}
                onChange={handleInputChange}
                className="w-full p-2 rounded text-black"
              />
            </div>
            <div>
              <label className="block mb-1">Image</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              {formData.image && (
                <img src={formData.image} alt="Aperçu" className="mt-4 w-32 h-32 object-cover rounded" />
              )}
            </div>
            <div className="flex gap-4">
              <button type="submit" className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded">
                Enregistrer
              </button>
              <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-500 py-2 px-4 rounded">
                Annuler
              </button>
            </div>
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default RecipeDetails;
