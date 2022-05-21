/* eslint-disable import/no-absolute-path */

import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import './overlay.css'

export default function ChatPersona () {
  const params = useParams()
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  const alertas = []
  let activa = false
  useEffect(() => {
    const socket = io('http://ws.lizardon.es')
    socket.emit('join', params.id + '-overlay')
    socket.on('tts', (params) => {
      const text = params.replace(' ', '+')
      const url = `https://api.streamelements.com/kappa/v2/speech?voice=Enrique&text=${text}&key=MAN0PnTqdziKrbwALxsBxciP3TxBsYAH4QDgNF8kI9lFH_Al`
      // eslint-disable-next-line no-undef
      nuevaAlerta(url)
    })
  }, [])
  return (
    <div className='contenedorOverlay'>
      <div id='alerta' />
    </div>
  )

  async function nuevaAlerta (url) {
    alertas.push({ img: 'https://static.wikia.nocookie.net/espokemon/images/9/95/Charizard.png', url })
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
      // divAlerta.innerHTML = `<img class='imgAlerta' src='${alerta.img}'></img>`
      const a = new Audio(alerta.url)
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
}
