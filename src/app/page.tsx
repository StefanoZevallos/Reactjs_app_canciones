'use client'
import Image from "next/image"
import Card from "./components/Card"
import axios from "axios"
import { useEffect, useState } from 'react'
import { log } from "console"

export default function Home() {
  const [data, setData] = useState([]);
  const [popup, setPopUp] = useState(false)
  const [nombreCancion, setNombreCancion] = useState("")
  const [nombreArtista, setNombreArtista] = useState("")
  const [imagenArtista, setImagenArtista] = useState("")
  const [usuarioId, setUsuarioId] = useState(78)
  const [selectedFile, setSelectedFile] = useState(null);

  // funcion para obtener datos de la api
  const getData = async () => {
    const { data } = await axios.get('http://127.0.0.1:3001/canciones');
    setData(data.content);
  };
  // useEffect para hacer get de la api
  useEffect(() => {
    getData();
  }, []);
  // funcion que se ejecuta al darle click a agregar cancion , desplegado el pop up

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  useEffect(() => {
    if (selectedFile !== null) {
      enviarImagen();
    }
  }, [selectedFile]);

  const enviarImagen = async () => {
    
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await axios.post('http://127.0.0.1:3001/api/users/upload', formData);
      const imageUrl = response.data.data.url;
      if (imageUrl) {
        setImagenArtista(imageUrl);
      } else {
        throw new Error('No se recibió una URL válida');
      }
    } catch (error) {
      console.error(error);
      alert('Error al subir el archivo');
    }
  }

  const subirArtista = async () => {
    if (!nombreCancion || !nombreArtista || !imagenArtista ) {
      alert('Por favor, complete todos los campos antes de subir la canción.');
      return;
    }
    const cancion = {
      "nombreCancion": nombreCancion,
      "nombreArtista": nombreArtista,
      "imagenArtista": imagenArtista,
      "usuarioId": usuarioId
    }
    axios.post('http://127.0.0.1:3001/canciones', cancion)
      .then((response) => {
        alert('Canción agregada con éxito');
      })
      .catch((error) => {
        console.error(error);
        alert('Error al agregar el producto');
      });
    setPopUp(false)
  };

  return (
    <>
      <nav className='h-[250px] bg-blue-100 mb-2 flex flex-col items-center justify-evenly '>
        <p className="font-bold text-xl">
          ¿Quienes Somos?
        </p>
        <p>Aqui puedes compartir tú música favorita</p>
        <p>Comparte tus canciones favoritas</p>
        <p>Fomentamos la comunidad , comparte </p>
        <button onClick={() => setPopUp(!popup)} className="bg-red-400 rounded-full h-10 w-[200px] text-white font-bold"> Agregar nueva música</button>
        {popup ? (
          <>
            <div className="flex justify-center items-center bg-green-200 min-w-screen min-h-screen">
              <div className="flex flex-col gap-4 mb-4 mt-48 bg-blue-200 absolute rounded-lg p-6  w-[90%]">
                <div className="flex justify-end ">
                  <button onClick={() => setPopUp(!popup)} className="text-2xl font-bold text-red-500 hover:text-red-700 dark:text-white">
                    X
                  </button>
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
                <div className="mb-6">
                  <span className="block mb-2 text-lg font-semibold text-gray-900 dark:text-white">Imagen Del Artista</span>
                  <input onChange={handleFileChange} className="w-[80%]" type="file" />
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

      </nav>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-rows-auto lg:grid-cols-4 lg:grid-rows-auto">
        {data.map((data) =>
          <Card key={data.id} artista={data.nombreArtista} cancion={data.nombreCancion} imagen={data.imagenArtista} usuario={data.usuarioId} />)
        }
      </div>
    </>
  )
}
