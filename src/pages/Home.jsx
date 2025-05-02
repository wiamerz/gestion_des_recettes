import React from 'react'
import Footer from '../compenents/Footer'
import Navbar from '../compenents/Navbar'
import pic from '../assets/chef_wiwi.png'
import { Link, useNavigate } from "react-router-dom";

function Home() {
  return (

    <>
    <Navbar/>
    <div className=' bg-[rgb(246,233,215)]'>

    <div className='flex justify-center items-center'>
        <div className='w-[200px] '>
        <img src={pic} alt="picture" />
        </div>
    </div>
    <div className='flex flex-col justify-center items-center gap-y-8'>
        <h1 className='font-bold text-xl text-center'> Wecoook with wiame </h1>
        <h2 className='font-bold text-4xl   '> 
        Maîtrisez vos fiches recettes. Créez sans limites. </h2>

        <p className='text-center'>Centralisez vos recettes, maîtrisez vos coûts, optimisez vos commandes.Libérez votre créativité.</p>

        <Link
          to="/signup"
        className=" rounded-2xl py-1 px-2 border bg-[rgb(255,255,255)] hover:bg-[rgb(243,180,78)]  transition-colors duration-300"
       >
          Inscrivez-vous gratuitement
        </Link>
    </div>


     <Footer/>
    </div>
   
    </>
  )
}

export default Home