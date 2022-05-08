
import { useEffect, useState, useId } from 'react'
import Axios from 'axios'
import { FrasePersona } from './frasePersona'
import './persona.css'
import dedo from '../../../public/dedo.png'

export default function Frases () {
  const [frases, setFrases] = useState([])
  const id = useId()
  useEffect(() => {
    Axios.get('https://api.lizardon.es/lizardon/frases')
      .then(function (res) {
        console.log(res.data)
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
        <div className='mensajes'>
          {frases.map(function (frase, index) {
            return (
              <div key={`${id}-${index}`} className='frase'>
                <FrasePersona frase={frase} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
