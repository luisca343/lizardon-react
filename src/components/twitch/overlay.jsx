/* eslint-disable import/no-absolute-path */

import { useEffect, useState, useId } from 'react'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import { Alerta } from '../../objects/Alerta'
import { Voto } from '../../objects/Voto'
import './overlay.css'

export default function ChatPersona () {
  const key = useId()
  const voto1 = new Voto('Son 2', 1)
  const voto2 = new Voto('Son 7', 3)
  const voto3 = new Voto('Yo que sé, soy de letras', 2)
  const voto4 = new Voto('Felicidades, Luisca', 20)
  const [votos, setVotos] = useState([voto1, voto2, voto3, voto4])
  console.log(votos)
  const params = useParams()
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  const alertas = []
  let activa = false
  useEffect(() => {
    const socket = io('http://localhost:34304')
    socket.emit('join', params.id + '-overlay')
    socket.on('tts', (params) => {
      const text = params.replace(' ', '+')
      const url = `https://api.streamelements.com/kappa/v2/speech?voice=Enrique&text=${text}&key=MAN0PnTqdziKrbwALxsBxciP3TxBsYAH4QDgNF8kI9lFH_Al`
      // eslint-disable-next-line no-undef
      const alerta = new Alerta(text, '', url)
      nuevaAlerta(alerta)
    })
    socket.on('alerta', (params) => {
      const res = JSON.parse(params)
      const tipo = res.tipo
      if (tipo === 'promo') {
        const datos = res.datos[0]
        const promo = new Alerta(`¡Echa un ojo al canal de ${datos.display_name}!`, datos.profile_image_url, getTTS(datos.description))
        nuevaAlerta(promo)
      }
    })
  }, [])
  return (
    <div className='contenedorOverlay'>
      <div id='alerta' />
      <div className='encuesta hidden'>
        <div className='tituloEncuesta'>
          <div>¿Cuánto es 1+1?</div>
        </div>
        <div className='opcionesEncuesta'>
          {votos.map(function (voto, index) {
            return (
              <div key={`${key}-${index}`} style={{ height: `${250 / votos.length}px` }}>
                <div>{voto.texto}</div>
                <progress value={voto.votos} max={getVotos()} /><span>{voto.votos}</span>
              </div>
            )
          })}
        </div>
        Votos totales: {getVotos()}
      </div>
    </div>
  )

  function getVotos () {
    let suma = 0
    votos.forEach(voto => {
      suma += voto.votos
    })
    return suma
  }

  async function nuevaAlerta (alerta) {
    alertas.push(alerta)
    if (!activa) {
      reproducirAlertas()
    } else {
      console.log('La alerta ha sido prorrogada')
    }
  }
  async function reproducirAlertas () {
    activa = true
    while (alertas.length > 0) {
      const alerta = alertas[0]
      console.log('Reproduciendo alerta...')
      const divAlerta = document.getElementById('alerta')
      if (alerta.img !== '') {
        divAlerta.innerHTML = `<div class='alerta'><img class='imgAlerta' src='${alerta.img}'/><div class='textoAlerta'>${alerta.mensaje}</div></div>`
      }
      const a = new Audio(alerta.sonido)
      await playAudio(a)
      divAlerta.innerHTML = ''
      alertas.shift()
      await delay(500)
    }
    activa = false
  }

  function playAudio (audio) {
    return new Promise(resolve => {
      audio.play()
      audio.onended = resolve
    })
  }

  function getTTS (texto) {
    return `https://api.streamelements.com/kappa/v2/speech?voice=Enrique&text=${texto}&key=MAN0PnTqdziKrbwALxsBxciP3TxBsYAH4QDgNF8kI9lFH_Al`
  }
}
