
import React from 'react'
import Image from 'next/image'
import axios from "axios"
import { useEffect, useState } from 'react'

const Card = ({ artista, cancion, imagen , usuario}) => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios.get('http://127.0.0.1:3001/canciones');
    setData(data.content);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex justify-center ">
        <section className="w-[90%] bg-red-100 rounded-lg h-[280px] flex flex-col items-center mb-4">
        <div className="mt-2  w-[250px] ">
        <Image className="w-[100%] h-[180px] rounded-md"
              src={imagen}
              width={10000}
              height={10000}
              alt="Picture of the author"
            />
          </div>
          <div className="w-full h-[100px] flex flex-col justify-center items-center">
            <p> Artista: {artista} </p>
            <p> Canción: {cancion} </p>
          </div>
        </section>
      </div>
    </>
  )
}

export default Card