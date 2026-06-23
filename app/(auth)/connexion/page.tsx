"use client"

import React from "react";
import Image from "next/image";
import img from "@/public/Screenshot_20241008-065130.jpg";

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">

      <div className=" rounded-2xl shadow-2xl flex border-2 border-gray-600">

        <div className=" flex items-center justify-center md:w-1/2">
        <form className="flex flex-col gap-5 ml-1 p-8 sm:p-10 ">
          <h2 className='text-center text-3xl font-extrabold flex items-center justify-center mr-6 mb-2 '>Connexion</h2>
          <div className=''>
            <label htmlFor="email" className="font-medium block mb-2">Adresse Email</label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="exemple@gmail.com"
              className="w-full p-3 border border-gray-300 rounded-lg h-12 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all duration-150"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="font-medium block mb-2 text-gray-700">Mot de passe</label>

            <input
              id="password"
              name="password"
              type='password'
              placeholder="********"
              className="w-full p-3 border border-gray-300 rounded-lg h-12 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all duration-150 pr-12"
            />
          </div>

          <button
            type="submit"
            className="w-full text-white py-3 rounded-lg transition-all duration-300 font-semibold mt-4 bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg disabled:bg-indigo-400 disabled:cursor-not-allowed cursor-pointer"
          >
            Se connecter
          </button>

        <p className="mt-6 text-center text-sm">
          Pas encore de compte ?{" "}

          <button
            className="text-indigo-600 hover:text-indigo-800 font-bold transition-colors duration-200 underline underline-offset-2 cursor-pointer"
          >
            S'inscrire
          </button>
        </p>
        </form>


        </div>
        
        <div className="hidden md:block relative md:w-1/2 ">
          <Image
            src={img}
            alt="Login"
            className="object-cover h-full "
          />
        </div>

      </div>

    </div>
  );
};

export default Page;