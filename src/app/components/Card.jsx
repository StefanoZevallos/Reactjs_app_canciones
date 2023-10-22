
import React from 'react'
import Image from 'next/image'
import axios from "axios"
import { useEffect, useState } from 'react'

const Card = ({ artista, cancion }) => {



  return (
    <>
<div className="flex justify-center">
  <section className="w-[80%] bg-red-300 rounded-md shadow-sm p-3 mb-2 mt-1 relative">
    <div className="w-full h-24 flex flex-col justify-center items-center">
      <h2 className="text-md font-extrabold text-white">Artista: {artista}</h2>
      <h3 className="text-base font-semibold text-white mt-1">Canción: {cancion}</h3>
    </div>
    
  </section>
</div>
    </>
  )
}

export default Card