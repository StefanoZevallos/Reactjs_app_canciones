"use client"
import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'

const Header = () => {
  const [dropDown, setDropDown] = useState(false)
  return (
    <>    <header className='h-[80px] w-full bg-gray-200 flex justify-between items-center'>
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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </header> 
    { dropDown ? (
    <section className='flex justify-end mr-2 lg:mr-7'>
      <div className='bg-gray-200 w-[120px] h-[50px] flex flex-col justify-center items-center rounded-lg absolute'>
        <Link href={"/login"}>
        <p className='font-bold'> Iniciar Sesión</p>
        </Link>
        <Link href={"/registro"}>
        <p className='font-bold'> Registrate</p>
        </Link>
      </div>
    </section> ) :
    <div></div>
    }
    </>

  )
}

export default Header