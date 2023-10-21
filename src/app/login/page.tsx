'use client'
import React from 'react'
import { useState,useEffect } from 'react'
import axios from "axios"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { tokenState } from '@/atoms/tokenState'
import { nombreUsuarioState } from '@/atoms/nombreUsuarioState'
import { useRecoilState } from 'recoil'


const page = () => {
  const [correo,setCorreo]=useState("")
  const [contraseña,setContraseña]=useState("")
  const [token, setToken] = useRecoilState(tokenState)
  const [nombreUsuario,setNombreUsuario] = useRecoilState(nombreUsuarioState)

  // useEffect(() => {
  //   if(token){
  //   getPerfil()}
  // }, [token]);

  const loginUsuario = async () => {
    try {
      console.log(correo);
      console.log(contraseña);
     const response = await axios
      .post("https://album-musica-backend.onrender.com/login", { 
        correo: correo,
        password: contraseña
      })
      const nuevoToken = response.data.token; 
      localStorage.setItem('token', nuevoToken);
       getPerfil()
    } catch(error) {
      alert("Error al iniciar sesión");
    }}

    const getPerfil = async () => {
      try {
    const perfilResponse = await axios
    .get("https://album-musica-backend.onrender.com/perfil", {
      headers: {
        Authorization: localStorage.getItem('token'), 
      },
    })
    localStorage.setItem('nombreUsuario', perfilResponse.data.content.nombre.charAt(0).toUpperCase())
    setNombreUsuario(perfilResponse.data.content.nombre.charAt(0).toUpperCase())}
    catch(error) {
    }
  }

   
 
  return (
    <div className="h-[90vh] w-full flex items-center justify-center ">
      <div className="flex flex-col justify-start bg-white p-8 rounded shadow-sm w-[90%] h-[90%]">
        <div className='w-full flex justify-center items-center'>
          <h2 className="text-4xl font-extrabold mb-8 text-gray-600">
            ¡Inicia Sesión!
          </h2>
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
          <div className="mt-[100px] flex items-center justify-center">
            <Link href={"/"}>
            <button onClick={()=>loginUsuario()}
              className="font-semibold bg-gradient-to-r from-blue-200 to-gray-300 text-white px-6 py-3 rounded-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transform transition duration-300 hover:scale-105"
            >
              Iniciar Sesión
            </button>
            </Link>
          </div>
        <div className="flex flex-col items-center justify-center pt-[100px]">
          <p className=" font-semibold text-gray-500">
            ¿Olvidaste Tu contraseña?
          </p>
          <Link href={"/login"}>
          <p className="mt-2 text-sm font-semibold text-gray-800">
            ¡Recuperar Contraseña!
          </p>
          </Link>


        </div>
      </div>
    </div>
  )
}

export default page