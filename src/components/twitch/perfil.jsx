import { useEffect, useState } from 'react'
import { useSearchParams, Navigate } from 'react-router-dom'
import Axios from 'axios'
import Cookies from 'universal-cookie'
import { config } from '../../constants'

export default function Perfil () {
  const [usuario, setUsuario] = useState([])
  const [redirect, setRedirect] = useState(false)
  const url = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${config.TWITCH_CLIENT_ID}&redirect_uri=${config.REDIRECT_URL}/twitch/auth&scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls`
  useEffect(() => {
    const cookies = new Cookies()
    const token = cookies.get('twitch_token')
    console.log('el token es: ' + token)
    if (cookies.get('twitch_token')) {
      console.log(cookies.get('twitch_token'))
      Axios.post(`${config.API_URL}/twitch/getUsuario`, {
        hash: cookies.get('twitch_token')
      })
        .then(res => {
          setUsuario(res.data)
          console.log(res.data)
        })
        .catch(error => {
          const status = error.response.status
          if (status === 434) {
            console.log('Redirigiendo...')
            setRedirect(true)
          }
        })
    } else {
      setRedirect(true)
    }
  }, [])

  if (redirect) {
    window.location.href = url
  }

  if (!usuario.login) {
    return <div>Cargando datos...</div>
  }

  return (
    <div className='container'>
      <h1>Sesión iniciada como {usuario.display_name}</h1>
    </div>
  )
}
