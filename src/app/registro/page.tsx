'use client'
import React from 'react'
import { useState } from 'react'
import axios from "axios"
import Link from 'next/link'


const page = () => {
  const [nombre,setNombre]=useState("")
  const [apellido,setApellido]=useState("")
  const [correo,setCorreo]=useState("")
  const [contraseña,setContraseña]=useState("")
  const registroUsuario = async () => {
    try {
      await axios
      .post("https://album-musica-backend.onrender.com/registro", { 
        nombre : nombre,
        apellido: apellido,
        correo: correo,
        password: contraseña
      })
      alert("Usuario creado exitosamente")
    } catch(error) {
      alert("La contraseña debe ser mayor a 6 dígitos , contener mínimo una miniscula y 1 numero");
    }}
   
 
  return (
    <div className="h-[90vh] w-full flex items-center justify-center ">
      <div className="flex flex-col justify-start bg-white p-8 rounded shadow-sm w-[90%] h-[90%]">
        <div className='w-full flex justify-center items-center'>
          <h2 className="text-4xl font-extrabold mb-8 text-gray-600">
            ¡Crea tu Cuenta!
          </h2>
        </div>
        <form >
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-gray-600">
              Nombre
            </label>
            <input
            onChange={(e) => setNombre(e.target.value)}
              type="text"
              id="nombre"
              name="nombre"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="apellido" className="block text-gray-600">
              Apellido
            </label>
            <input
            onChange={(e) => setApellido(e.target.value)}
              type="text"
              id="apellido"
  
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400"

            />
          </div>
          <div className="mb-4">
            <label htmlFor="correo" className="block text-gray-600">
              Correo Electrónico
            </label>
            <input
            onChange={(e) => setCorreo(e.target.value)}
              type="email"
              id="correo"

              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400"

            />
          </div>
          <div className="mb-6">
            <label htmlFor="contrasena" className="block text-gray-600">
              Contraseña
            </label>
            <input
            onChange={(e) => setContraseña(e.target.value)}
              type="password"
              id="contrasena"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="mt-12 flex items-center justify-center">
            <button onClick={()=>registroUsuario()}
              type="submit"
              className="font-semibold bg-gradient-to-r from-blue-200 to-gray-300 text-white px-6 py-3 rounded-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transform transition duration-300 hover:scale-105"
            >
              ¡Regístrate Ahora!
            </button>
          </div>
        </form>
        <div className="flex flex-col items-center justify-center pt-10">
          <p className=" font-semibold text-gray-500">
            ¿Ya tienes una cuenta?
          </p>
          <Link href={"/login"}>
          <p className="mt-2 text-sm font-semibold text-gray-800">
            ¡Inicia Sesión Aqui!
          </p>
          </Link>


        </div>
      </div>
    </div>
  )
}

export default page