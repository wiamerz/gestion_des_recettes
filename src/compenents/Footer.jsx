import React from 'react'
import pic from '../assets/chef_wiwi.png'

function Footer() {
  return (
      <>
          <footer className='bg-[rgb(161,193,129)]  text-black py-4 mt-8'>


            <div className='flex justify-center items-center'>
                <div className=' w-20'> <img src={pic} alt="picture" /> </div>
                <h1>Wecoook</h1>
            </div>
             
                    <div className="flex justify-center mb-2">
                  <p>&copy; Tout droits réservés 2025. Wecook.</p>
              </div>
          </footer>
      </>
  )
}

export default Footer