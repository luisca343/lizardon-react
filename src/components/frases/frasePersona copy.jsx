import { useId } from 'react'
export function FrasePersona (props) {
  const frase = props.frase
  console.log(displayTextWidth(props.frase))
  const lineas = frase.match(/.{1,64}(\s|$)/g)
  const id = useId()

  // # '100,0 400,0 390,50 95,45'
  const viewBoxHeight = 100
  return (
    <div>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox={`0 0 500 ${viewBoxHeight}`} style={{}}>
        <text
          visibility='hidden'
          style={{ fontSize: 10 + 'px' }}
        >
          Este texto es para hacer cosas chungas, no existe, no os preocupéis
        </text>
        <polygon
          points='0, 5 72,10 80,60 15,68'
          style={{ fill: 'black' }}
        />
        <polygon
          v-if='remote'
          points='10,5 70,15 80,55 20,65'
          style={{ fill: 'white' }}
        />
        <clipPath id='avatarClipPath'>
          <polygon points='10,5 70,15 80,55 20,65' />
        </clipPath>
        <image clipPath='url(#avatarClipPath)' x='-10' y='-10' width='80px' xlinkHref='https://i.pinimg.com/originals/e4/b9/a0/e4b9a0148cbb30c56728485e22d94e4f.jpg' />

        <polygon
          v-if='remote'
          points='100,0 400,0 390,50 95,45'
          style={{ fill: 'white' }}
        />

        <polygon
          v-if='remote'
          points='102,2 398,2 388,48 97,43'
          style={{ fill: 'black' }}
        />

        <polygon
          v-if='remote'
          points='99,20 98,30 85,35 80,25 70,30 85,15 90,25'
          style={{ fill: 'white' }}
        />

        <polygon
          v-if='remote'
          points='100,21 100,28 86,33 81,24 73,28 84,18 89,27'
          style={{ fill: 'black' }}
        />
        {lineas.map((linea, index) => (
          <text key={`${id}-${index}`} y={5 + (index * 10)} style={{ fontSize: '10px'}}>
            <tspan
              x='105'
              dy='12px'
              style={{ fill: 'white' }}
            >
              {linea}
            </tspan>
          </text>
        ))}
      </svg>
    </div>
  )

  function displayTextWidth(text, font) {
    const canvas = displayTextWidth.canvas || (displayTextWidth.canvas = document.createElement('canvas'))
    const context = canvas.getContext('2d')
    context.font = font
    const metrics = context.measureText(text)
    return metrics.width
  }
}
