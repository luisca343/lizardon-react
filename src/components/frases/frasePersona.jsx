import { useId } from 'react'
export function FrasePersona (props) {
  const datos = props.datos
  const frase = datos.mensaje
  const imagen = datos.imagen
  const nombre = datos.nombre
  const transparente = datos.transparente
  const fontSize = props.fontSize || 13
  const maxCaracteres = parseInt(6400 / (fontSize * fontSize))
  const lineas = frase.match(new RegExp('.{1,' + maxCaracteres + '}(\\s|$)', 'g'))
  const caracteres = lineas[0].length
  const caracteresNombre = nombre.length
  const ancho = caracteres / 64 * 200
  const anchoNombre = caracteresNombre / 32 * 200
  const id = useId()
  let anchoNumero
  if (props.anchoNumero) {
    anchoNumero = props.index < 99 ? 0 : 7
  } else {
    anchoNumero = 0
  }
  const fecha = new Date(datos.fecha)
  if (transparente) {
    // fecha.setHours(fecha.getHours() - 2)// Por algún motivo la fecha sale mal, solución preventiva
  }

  let fechaString
  if (fecha.getDate()) {
    fechaString = `${fecha.getDate()}/${('0' + (fecha.getMonth() + 1)).slice(-2)}/${fecha.getFullYear()} ${('0' + (fecha.getHours())).slice(-2)}:${('0' + (fecha.getMinutes())).slice(-2)}`
    if (!transparente) {
      fechaString = `${('0' + (fecha.getHours())).slice(-2)}:${('0' + (fecha.getMinutes())).slice(-2)}`
    }
  } else {
    fechaString = datos.fecha
  }

  // Esto lo ordeno luego
  const remote = datos.idUsuario % 2 === 0
  const lineHeight = 1.5

  const messageBox = {
    origin: {
      x: remote ? 130 : 130, y: 20
    },
    centerWidth: fontSize * fontSize - 2 * fontSize + ancho,
    leftWidth: 10,
    rightWidth: 20,
    slantHeight: 5,
    border:
    {
      normal: 4,
      left: 15,
      right: 35
    }
  }
  const textOffset = {
    x: 15,
    y: messageBox.origin.y + fontSize * lineHeight / 4
  }
  return (
    <div className={`frasePersona ${transparente ? '' : 'nuevaFrase'}`}>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox={`0 0 500 ${viewBoxHeight()}`} style={{}}>
        <text
          visibility='hidden'
          style={{ fontSize: 10 + 'px' }}
          className={remote ? '' : 'flipX'}
        >
          Este texto es para hacer cosas chungas, no existe, no os preocupéis
        </text>
        <polygon
          points='25,5 97,10 105,60 40,68'
          style={{ fill: 'black' }}
          className={remote ? '' : 'flipX'}
        />
        <polygon
          v-if='remote'
          points='30,8 95,12 101,58 42,65'
          style={{ fill: 'white' }}
          className={remote ? '' : 'flipX'}
        />
        <clipPath id={`avatarClipPath-${id}`}>
          {transparente === 1
            ? <polygon points='20,0 120,0 101,58 42,65' />
            : <polygon points='30,8 95,12 101,58 42,65' />}
        </clipPath>
        {transparente === 1
          ? <image clipPath={`url(#avatarClipPath-${id})`} x='30' y='-5' width='80px' xlinkHref={imagen} className={remote ? '' : 'flipX'} />
          : <image clipPath={`url(#avatarClipPath-${id})`} x='26' y='-8' width='80px' xlinkHref={imagen} className={remote ? '' : 'flipX'} />}
        <polygon
          v-if='remote'
          points={containerBorderPoints()}
          style={{ fill: primaryColor() }}
          className={remote ? '' : 'flipX'}
        />

        <polygon
          v-if='remote'
          points={containerTailBorderPoints()}
          style={{ fill: primaryColor() }}
          className={remote ? '' : 'flipX'}
        />

        <polygon
          v-if='remote'
          points={containerTailPoints()}
          style={{ fill: secondaryColor() }}
          className={remote ? '' : 'flipX'}
        />

        <polygon
          v-if='remote'
          points={containerPoints()}
          style={{ fill: secondaryColor() }}
          className={remote ? '' : 'flipX'}
        />

        <polygon
          v-if='remote'
          points={`${92 + messageBox.centerWidth},0 ${177 + messageBox.centerWidth},0 ${172 + messageBox.centerWidth},22 ${92 + messageBox.centerWidth},24`}
          style={{ fill: secondaryColor() }}
          className={remote ? '' : 'flipX'}
        />
        <polygon
          v-if='remote'
          points={`${95 + messageBox.centerWidth},2 ${175 + messageBox.centerWidth},1 ${170 + messageBox.centerWidth},20 ${95 + messageBox.centerWidth},22`}
          style={{ fill: primaryColor() }}
          className={remote ? '' : 'flipX'}
        />
        <text>
          <tspan
            x={`${remote ? 100 + messageBox.centerWidth : 335 - messageBox.centerWidth}px`}
            dy='1.3em'
            fontSize={transparente ? '8px' : '12px'}
            style={{ fill: secondaryColor() }}
            className={remote ? '' : 'flipX'}
          >{fechaString}
          </tspan>
        </text>

        <polygon
          v-if='remote'
          points={`115,2 ${145 + anchoNumero},1 ${155 + anchoNumero},22 125,25`}
          style={{ fill: primaryColor() }}
          className={remote ? '' : 'flipX'}
        />

        <polygon
          v-if='remote'
          points={`117,4 ${143 + anchoNumero},3 ${152 + anchoNumero},20 127,23`}
          style={{ fill: secondaryColor() }}
          className={remote ? '' : 'flipX'}
        />

        <text>
          <tspan
            x={`${remote ? 125 : 357 - anchoNumero}px`}
            dy='1.6em'
            fontSize='9px'
            style={{ fill: primaryColor() }}
            className={remote ? '' : 'flipX'}
          >#{props.index}
          </tspan>
        </text>
        <polygon
          v-if='remote'
          points={`25,70 ${52 + anchoNombre},70 ${55 + anchoNombre},53 35,54`}
          style={{ fill: primaryColor() }}
          className={remote ? '' : 'flipX'}
        />

        <polygon
          v-if='remote'
          points={`30,68 ${50 + anchoNombre},68 ${50 + anchoNombre},56 36,56`}
          style={{ fill: secondaryColor() }}
          className={remote ? '' : 'flipX'}
        />
        <text>
          <a href={`https://lizardon.es/frases/${nombre}`}>
            <tspan
              x={remote ? 40 : 462 - anchoNombre}
              dy='65px'
              fontSize='12px'
              style={{ fill: primaryColor() }}
            >{nombre}
            </tspan>
          </a>
        </text>
        {lineas.map(function (linea, index) {
          return (
            <text key={`${id}-${index}`} y={textOffset.y + (textOffset.y / lineHeight * index)} style={{ fontSize: `${fontSize}px` }}>
              <tspan
                v-for='line of wrappedMessage'
                x={remote ? messageBox.origin.x + 10 : 500 - messageBox.origin.x - messageBox.centerWidth}
                dy={`${lineHeight}em`}
                style={{ fill: primaryColor() }}
              >
                {linea}
              </tspan>
            </text>
          )
        })}
      </svg>
    </div>
  )
  function viewBoxHeight () {
    return containerHeight() + messageBox.origin.y * 2
  }

  function containerPoints () {
    return [
      {
        x: messageBox.origin.x,
        y: messageBox.origin.y
      },
      {
        x: messageBox.origin.x + messageBox.centerWidth + messageBox.rightWidth,
        y: messageBox.origin.y
      },
      {
        x: messageBox.origin.x + messageBox.centerWidth,
        y: messageBox.origin.y + containerHeight() + messageBox.slantHeight
      },
      {
        x: messageBox.origin.x - messageBox.leftWidth,
        y: messageBox.origin.y + containerHeight()
      }
    ].map(p => `${p.x},${p.y}`).join(' ')
  }

  function containerBorderPoints () {
    return [
      {
        x: messageBox.origin.x - messageBox.border.normal,
        y: messageBox.origin.y - messageBox.border.normal
      },
      {
        x: messageBox.origin.x + messageBox.centerWidth + messageBox.border.right,
        y: messageBox.origin.y - messageBox.border.normal
      },
      {
        x: messageBox.origin.x + messageBox.centerWidth + messageBox.border.normal,
        y: messageBox.origin.y + containerHeight() + messageBox.border.normal + messageBox.slantHeight
      },
      {
        x: messageBox.origin.x - messageBox.border.left,
        y: messageBox.origin.y + containerHeight() + messageBox.border.normal
      }
    ].map(p => `${p.x},${p.y}`).join(' ')
  }

  function containerTailPoints () {
    return [
      {
        x: messageBox.origin.x - 33,
        y: messageBox.origin.y + containerHeight() / 2 + 8
      },
      {
        x: messageBox.origin.x - 17,
        y: messageBox.origin.y + containerHeight() / 2 - 10
      },
      {
        x: messageBox.origin.x - 12,
        y: messageBox.origin.y + containerHeight() / 2 - 4
      },
      {
        x: messageBox.origin.x,
        y: messageBox.origin.y + containerHeight() / 2 - 10
      },
      {
        x: messageBox.origin.x,
        y: messageBox.origin.y + containerHeight() / 2 + 5
      },
      {
        x: messageBox.origin.x - 18,
        y: messageBox.origin.y + containerHeight() / 2 + 10
      },
      {
        x: messageBox.origin.x - 22,
        y: messageBox.origin.y + containerHeight() / 2 + 5
      }
    ].map(p => `${p.x},${p.y}`).join(' ')
  }

  function containerTailBorderPoints () {
    return [
      {
        x: messageBox.origin.x - 40,
        y: messageBox.origin.y + containerHeight() / 2 + 12
      },
      {
        x: messageBox.origin.x - 15,
        y: messageBox.origin.y + containerHeight() / 2 - 16
      },
      {
        x: messageBox.origin.x - 12,
        y: messageBox.origin.y + containerHeight() / 2 - 10
      },
      {
        x: messageBox.origin.x,
        y: messageBox.origin.y + containerHeight() / 2 - 15
      },
      {
        x: messageBox.origin.x,
        y: messageBox.origin.y + containerHeight() / 2 + 10
      },
      {
        x: messageBox.origin.x - 20,
        y: messageBox.origin.y + containerHeight() / 2 + 15
      },
      {
        x: messageBox.origin.x - 24,
        y: messageBox.origin.y + containerHeight() / 2 + 10
      }
    ].map(p => `${p.x},${p.y}`).join(' ')
  }

  function containerHeight () {
    const height = fontSize * lineHeight * lineas.length * 0.85
    return parseInt(height + fontSize * lineHeight)
  }

  function primaryColor () {
    return remote ? 'white' : 'black'
  }

  function secondaryColor () {
    return remote ? 'black' : 'white'
  }
}
