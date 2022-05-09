import { useId } from 'react'
export function FrasePersona (props) {
  const frase = props.frase.frase
  const imagen = props.frase.imagen
  const lineas = frase.match(/.{1,64}(\s|$)/g)
  const caracteres = lineas[0].length
  const ancho = caracteres / 64 * 200
  const id = useId()
  const anchoNumero = props.index < 99 ? 0 : 7

  const fecha = new Date(Date.parse(props.frase.fecha))
  const fechaString = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}`
  // Esto lo ordeno luego
  const remote = props.frase.idUsuario % 2 === 0
  const fontSize = 10
  const lineHeight = 1.5
  const messageBox = {
    origin: {
      x: remote ? 130 : 130, y: 20
    },
    centerWidth: 70 + ancho,
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
    <div>
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
          {props.frase.transparente === 1
            ? <polygon points='20,0 120,0 101,58 42,65' />
            : <polygon points='30,8 95,12 101,58 42,65' />}
        </clipPath>
        {props.frase.transparente === 1
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
          points={`${92 + messageBox.centerWidth},0 ${167 + messageBox.centerWidth},0 ${162 + messageBox.centerWidth},22 ${92 + messageBox.centerWidth},24`}
          style={{ fill: secondaryColor() }}
          className={remote ? '' : 'flipX'}
        />
        <polygon
          v-if='remote'
          points={`${95 + messageBox.centerWidth},2 ${165 + messageBox.centerWidth},1 ${160 + messageBox.centerWidth},20 ${95 + messageBox.centerWidth},22`}
          style={{ fill: primaryColor() }}
          className={remote ? '' : 'flipX'}
        />
        <text>
          <tspan
            x={`${remote ? 100 + messageBox.centerWidth : 345 - messageBox.centerWidth}px`}
            dy='1.5em'
            fontSize='8px'
            style={{ fill: secondaryColor() }}
            className={remote ? '' : 'flipX'}
          >{fechaString}
          </tspan>
        </text>

        <polygon
          v-if='remote'
          points={`120,2 ${145 + anchoNumero},1 ${155 + anchoNumero},22 130,25`}
          style={{ fill: primaryColor() }}
          className={remote ? '' : 'flipX'}
        />

        <polygon
          v-if='remote'
          points={`122,4 ${143 + anchoNumero},3 ${152 + anchoNumero},20 132,23`}
          style={{ fill: secondaryColor() }}
          className={remote ? '' : 'flipX'}
        />

        <text>
          <tspan
            x={`${remote ? 130 : 357 - anchoNumero}px`}
            dy='1.6em'
            fontSize='9px'
            style={{ fill: primaryColor() }}
            className={remote ? '' : 'flipX'}
          >#{props.index}
          </tspan>
        </text>

        <polygon
          v-if='remote'
          points='50,70 114,70 110,53 55,54'
          style={{ fill: primaryColor() }}
          className={remote ? '' : 'flipX'}
        />

        <polygon
          v-if='remote'
          points='55,68 110,68 108,56 56,56'
          style={{ fill: secondaryColor() }}
          className={remote ? '' : 'flipX'}
        />
        <text>
          <tspan
            x={remote ? 60 : 395}
            dy='65px'
            fontSize='8px'
            style={{ fill: primaryColor() }}
          >{props.frase.nombre}
          </tspan>
        </text>
        {lineas.map(function (linea, index) {
          return (
            <text key={`${id}-${index}`} y={textOffset.y + (textOffset.y / lineHeight * index)} style={{ fontSize: fontSize + 'px' }}>
              <tspan
                v-for='line of wrappedMessage'
                x={remote ? messageBox.origin.x : 500 - messageBox.origin.x - messageBox.centerWidth}
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
    const height = fontSize * lineHeight * lineas.length
    return parseInt(height + fontSize * lineHeight)
  }

  function primaryColor () {
    return remote ? 'white' : 'black'
  }
  function secondaryColor () {
    return remote ? 'black' : 'white'
  }
}
