"use client"
import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import { nombreUsuarioState } from '@/atoms/nombreUsuarioState'
import { dataCancionesState } from '@/atoms/dataCancionesState'
import { usuarioIdState } from '@/atoms/usuarioIdState'
import { tokenState } from '@/atoms/tokenState'
import { useRecoilState } from 'recoil'

const Header = () => {
  const [dropDown, setDropDown] = useState(false)
  const [nombreUsuario,setNombreUsuario] = useRecoilState(nombreUsuarioState)
  const [dataCanciones,setDataCancionesState] = useRecoilState(dataCancionesState)
  const [token,setToken] = useRecoilState(tokenState)
  const [usuarioId, setUsuarioId] = useRecoilState(usuarioIdState)
  const LogoutButton = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuarioId')
    localStorage.removeItem('nombreUsuario')
    setDropDown(false)
  }
  return (
    <> 
    <header className='h-[80px] w-full bg-gray-200 flex justify-between items-center'>
      <Link href={"/"}>
      <div className='ml-4'>
        <Image className="w-[100px] h-[50px] "
          src="/logo.jpeg"
          width={10000}
          height={10000}
          alt="Picture of the author"
        />
      </div>
      </Link>
      <div onClick={()=> {setDropDown(!dropDown)}} className='mr-4 lg:mr-8 flex'>
        {
          localStorage.getItem('nombreUsuario') ? ( 
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mt-1">
            <p className="text-white text-2xl font-bold">{localStorage.getItem('nombreUsuario')}</p>
          </div>
          ):
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        }
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </header> 
    { dropDown ? (
    <section className='flex justify-end mr-2 lg:mr-7'>
      {
        localStorage.getItem('nombreUsuario') ? (
          <div className='bg-gray-300 w-[120px] h-[50px] flex flex-col justify-center items-center rounded-lg absolute'>
            <Link href={"/"}>
          <p onClick={()=>LogoutButton()} className='font-bold text-red-500 cursor-pointer'> Cerrar Sesión</p>
          </Link>
        </div>
        ):
        <div className='bg-gray-200 w-[120px] h-[50px] flex flex-col justify-center items-center rounded-lg absolute'>
        <Link href={"/login"}>
        <p onClick={()=>setDropDown(false)} className='font-bold'> Iniciar Sesión</p>
        </Link>
        <Link href={"/registro"}>
        <p onClick={()=>setDropDown(false)} className='font-bold'> Registrate</p>
        </Link>
      </div>
      }
    
    </section> ) :
    <div></div>
    }
    </>

  )
}

export default Header