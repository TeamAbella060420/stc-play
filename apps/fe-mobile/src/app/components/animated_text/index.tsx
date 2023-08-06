import React from 'react'
import Animated, { useAnimatedProps } from 'react-native-reanimated'
import { useSelector } from 'react-redux'
import { RootState } from '@fe-monorepo/store'
import { TextInput } from 'react-native-gesture-handler'
import { StyleProp, ColorValue, TextStyle } from 'react-native'
import { getStyle } from '@fe-monorepo/themes';

// Animated library only allows TextInput to become an animated Text component
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

type AnimatedTextType = {
  type?: 'primary' | 'secondary' | 'disabled',
  textColour?: ColorValue,
  textStyle?: TextStyle,
  style: StyleProp<TextStyle>
  text: {
    value: string
  }
}

export const AnimatedText = ({ style, text, textColour, textStyle,  type = 'primary' }: AnimatedTextType) => {
  const animatedProps = useAnimatedProps(() => {
    return {
      text: text.value
    }
  }) as object

  const theme = useSelector((state: RootState) => state.app.themes); 

  const fontTextColour = {
    color: textColour
      ? textColour
      : type === 'primary'
      ? getStyle(theme).textColor
      : type === 'secondary'
      ? getStyle(theme).textColor
      : type === 'disabled'
      ? getStyle(theme).textColorDisabled
      : getStyle(theme).textColor
  };


  return (
    <AnimatedTextInput
      underlineColorAndroid="transparent"
      editable={false}
      value={text.value}
      style={[textStyle, style, fontTextColour]}
      animatedProps={animatedProps}
    />
  )
}
