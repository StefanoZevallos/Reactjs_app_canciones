'use client'
import React from 'react'
import Card from '../components/Card'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { tokenState } from '@/atoms/tokenState'
import { dataCancionesState } from '@/atoms/dataCancionesState'
import { usuarioIdState } from '@/atoms/usuarioIdState'
import { useRecoilState } from 'recoil'

const Mis_Canciones = () => {
  const [popup, setPopUp] = useState(false)
  const [nombreCancion, setNombreCancion] = useState("");
  const [nombreArtista, setNombreArtista] = useState("");
  const [dataCanciones, setDataCanciones] = useRecoilState(dataCancionesState)
  const [usuarioId, setUsuarioId] = useRecoilState(usuarioIdState)
  const [token, setToken] = useRecoilState(tokenState);
  const [nada,setNada]=useState("")


    useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('https://album-musica-backend.onrender.com/canciones');
      setDataCanciones(data.content);
    };
    getData()
  }, [nada]);

  useEffect(() => {
      getPerfil()
  }, []);

  const subirArtista = async () => {
    if (!nombreCancion || !nombreArtista) {
      alert('Por favor, complete todos los campos antes de subir la canción.');
      return;
    }
    const cancion = {
      "nombreCancion": nombreCancion,
      "nombreArtista": nombreArtista,
      "usuarioId": localStorage.getItem('usuarioId')
    }
    axios.post('https://album-musica-backend.onrender.com/canciones', cancion)
      .then((response) => {
        alert('Canción agregada con éxito');
      })
      .catch((error) => {
        console.error(error);
        alert('Error al agregar el producto');
      });
    setPopUp(false)
  };

  const getPerfil = async () => {
    try {
      const perfilResponse = await axios
        .get("https://album-musica-backend.onrender.com/perfil", {
          headers: {
            Authorization: localStorage.getItem('token')
          },
        })
      localStorage.setItem('usuarioId',perfilResponse.data.content.id );
      setUsuarioId(perfilResponse.data.content.id)
    }
    catch (error) {
    }
  }


  return (
    <>
      <div className='flex justify-center items-center'>
        {
          localStorage.getItem('token') ? (
            <button onClick={() => setPopUp(!popup)} className="m-4 bg-blue-400 rounded-full h-10 w-[200px] text-white font-bold"> Agregar nueva música</button>
          ) :
          <div></div>
        }
    
      </div>
      {popup ? (
        <>
          <div className="flex justify-center items-center  min-w-screen h-[350px] ">
            <div className="flex flex-col gap-4   bg-blue-200  rounded-lg p-6  w-[90%]">
              <div className="flex justify-end ">
                <button onClick={() => setPopUp(!popup)} className="text-2xl font-bold text-red-500 hover:text-red-700 dark:text-white">
                  X
                </button>
              </div>
              <div>
                <label className="block mb-2 text-lg font-semibold text-gray-900 dark:text-white">Nombre Artista</label>
                <input onChange={(e) => setNombreArtista(e.target.value)}
                  type="text"
                  name="artista"
                  id="artista"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Nombre del artista"
                />
              </div>
              <div>
                <label htmlFor="name" className="block mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  Nombre Música
                </label>
                <input
                  onChange={(e) => setNombreCancion(e.target.value)}
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Nombre de la música"
                />
              </div>

              <button onClick={() => subirArtista()} className="bg-red-500 hover:bg-red-700 text-white text-lg font-semibold py-3 rounded-lg">
                Agregar Música
              </button>
            </div>
          </div>
        </>) :
        <div>
        </div>
      }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-rows-auto lg:grid-cols-4 lg:grid-rows-auto">
        {
          localStorage.getItem('token') ? (
            dataCanciones.filter(data => data.usuarioId == localStorage.getItem('usuarioId'))
            .map((data) => (
              <Card key={data.usuarioId} artista={data.nombreArtista} cancion={data.nombreCancion} />
            ))
          ) :
            <p className='font-bold'>Inicia Sesión para ver tus canciones</p>
        }

      </div>
    </>
  )
}

export default Mis_Canciones