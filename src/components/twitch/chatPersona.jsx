/* eslint-disable import/no-absolute-path */

import { useEffect, useState, useId } from 'react'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import { FrasePersona } from '../frases/frasePersona'
import { MensajePersona } from '../../objects/MensajePersona'
import '../frases/personaMensaje.css'

export default function ChatPersona () {
  const key = useId()
  const params = useParams()
  const [mensajes, setMensajes] = useState([])
  useEffect(() => {
    const socket = io('http://localhost:34304')
    socket.emit('join', params.id)
    socket.on('mensajeTwitch', (params) => {
      const datos = JSON.parse(params)
      // # const usuarios = ['Luisca343', 'Hammer20lancer', 'GolDBotsca', 'StreamElements']
      const msg = new MensajePersona(datos.id, datos.nombre, datos.mensaje, new Date(), datos.imagen, 0)
      console.log(datos.id)
      setMensajes(mensajes => [...mensajes, msg])
    })
  }, [])
  return (
    <div className='container'>
      <div className='mensajes' id='mensajes'>
        {mensajes.slice(0).reverse().map(function (mensaje, index) {
          return (
            <FrasePersona key={`${key}-${index}`} datos={mensaje} index={(mensajes.length - index)} style={{ width: '100%' }} />
          )
        })}
      </div>
    </div>
  )
}
