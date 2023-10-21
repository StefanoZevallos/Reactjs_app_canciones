'use client'
import Image from "next/image"
import Card from "./components/Card"
import axios from "axios"
import { useEffect, useState } from 'react'
import Link from "next/link"

export default function Home() {
  const [data, setData] = useState([]);
  const [popup, setPopUp] = useState(false)
  const [nombreCancion, setNombreCancion] = useState("")
  const [nombreArtista, setNombreArtista] = useState("")
  const [imagenArtista, setImagenArtista] = useState("")
  const [usuarioId, setUsuarioId] = useState(78)
  const [selectedFile, setSelectedFile] = useState(null);

  // funcion para obtener datos de la api
  // const getData = async () => {
  //   const { data } = await axios.get('http://127.0.0.1:3001/canciones');
  //   setData(data.content);
  // };
  // // useEffect para hacer get de la api
  // useEffect(() => {
  //   getData();
  // }, []);
  // funcion que se ejecuta al darle click a agregar cancion , desplegado el pop up








  return (
    <>
      <nav className='h-[250px] bg-blue-100 mb-2 flex flex-col items-center justify-evenly '>
        <p className="font-bold text-xl">
          ¿Quienes Somos?
        </p>
        <p>Aqui puedes compartir tú música favorita</p>
        <p>Comparte tus canciones favoritas</p>
        <p>Descubre una nueva canción , ¡Hoy!</p>
        <Link href={"/mis_canciones"}>
        <button className="bg-red-400 rounded-full h-10 w-[200px] text-white font-bold"> Mis Canciones</button>
        </Link>
      </nav>
    </>
  )
}
