/* eslint-disable import/no-absolute-path */

import { useEffect, useState, useId } from 'react'
import Axios from 'axios'
import { FrasePersona } from './frasePersona'
import './persona.css'
import dedo from '../../../public/dedo.png'
import iconoPersona from '/iconPersona.png'
import { MensajePersona } from '../../objects/MensajePersona'

export default function Frases () {
  const [frases, setFrases] = useState([])
  const id = useId()
  let fechaAnterior = null

  useEffect(() => {
    Axios.get('https://api.lizardon.es/lizardon/frases')
      .then(function (res) {
        const data = res.data
        const frases = []
        data.forEach(function (frase) {
          const mensajePersona = new MensajePersona(frase.idUsuario, frase.nombre, frase.frase, frase.fecha, frase.imagen, frase.transparente)
          frases.push(mensajePersona)
        })
        setFrases(frases)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])
  return (
    <div className='container'>
      <img tabIndex={-1} className='mano' src={dedo} />
      <div className='movil'>
        <img tabIndex={-1} className='iconoPersona' src={iconoPersona} />
        <ul className='mensajes'>
          <li key={`${id}-0`} className='frase bordeAbajo' />
          <input type='text' contentEditable='false' className='barraTexto' value='Mensaje' />
          {frases.reverse().map(function (frase, index) {
            const fecha = new Date(Date.parse(frase.fecha))
            const fechAnt = fechaAnterior
            fechaAnterior = fecha
            let nuevaFecha
            if (fechAnt && (fecha.getDate() < fechAnt.getDate() || fecha.getMonth() < fechAnt.getMonth())) {
              console.log(frase.mensaje)
              console.log(`${fecha.getDate()} < ${fechAnt.getDate()}`)
              console.log()
              nuevaFecha = true
            }

            return (
              <li key={`${id}-${index}`} className='frase'>
                <FrasePersona datos={frase} index={(frases.length - index)} style={{ width: '100%' }} />
                {nuevaFecha ? <div>{`${fechAnt.getDate()}/${('0' + (fechAnt.getMonth() + 1)).slice(-2)}/${fechAnt.getFullYear()}`}</div> : null}
              </li>
            )
          })}
          <span className='titulo'>Los mensajes y las llamadas están cifrados de extremo a extremo. Nadie fuera de este chat, ni siquiera Pegasus, puede leerlos ni escucharlos.</span>
        </ul>
      </div>
    </div>
  )
}
