import * as React from 'react'

import Svg, { Defs, Path, SvgProps } from 'react-native-svg'

type Props = SvgProps & {
  iconStroke: string
}

export const Logo = (props: Props) => {
  return (
    <Svg id='prefix__Art1' viewBox='0 0 128 128' {...props}>
      <Defs></Defs>
      <Path
        stroke={props.iconStroke}
        d='M52.75 76.78v19.28c0 1.65.79 1.91 1.77.58L65.8 81.23'
      />
      <Path
        stroke={props.iconStroke}
        d='M95.46 31.9c.26-1.63-.66-2.23-2-1.34L34.59 68.09c-1.39.88-1.25 2 .31 2.58l48.52 16.56a2.46 2.46 0 003.32-2z'
      />
    </Svg>
  )
}
