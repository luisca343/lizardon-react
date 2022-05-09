/* eslint-disable import/no-absolute-path */

import { useEffect, useState, useId } from 'react'
import Axios from 'axios'
import { FrasePersona } from './frasePersona'
import './persona.css'
import dedo from '../../../public/dedo.png'
import iconoPersona from '/iconPersona.png'

export default function Frases () {
  const [frases, setFrases] = useState([])
  const id = useId()

  useEffect(() => {
    Axios.get('https://api.lizardon.es/lizardon/frases')
      .then(function (res) {
        setFrases(res.data)
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
            return (
              <li key={`${id}-${index}`} className='frase'>
                <FrasePersona frase={frase} index={(frases.length - index)} style={{ width: '100%' }} />
              </li>
            )
          })}
          <span className='titulo'>Los mensajes y las llamadas están cifrados de extremo a extremo. Nadie fuera de este chat, ni siquiera Pegasus, puede leerlos ni escucharlos.</span>
        </ul>
      </div>
    </div>
  )
}
