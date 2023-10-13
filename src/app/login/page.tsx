'use'
import React from 'react'
import Login from '../components/Login'
import { Formik, Field, Form } from 'formik';


const page = () => {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-semibold mb-4">Inicio de Sesión</h2>
          <form >
            <div className="mb-4">
              <label htmlFor="correo" className="block text-gray-600">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="correo"
                name="correo"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400"

              />
            </div>
            <div className="mb-6">
              <label htmlFor="contrasena" className="block text-gray-600">
                Contraseña
              </label>
              <input
                type="password"
                id="contrasena"
                name="contrasena"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400"

              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default page