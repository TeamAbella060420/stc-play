import { colors } from 'libs/themes/src/colors'
import React, { ReactElement } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'

export const defaultPaddingHorizontal = 20
export const defaultPaddingVertical = 38
export const tabBarHeight = 65

interface StylesContainerProps {
  children: ReactElement | Array<ReactElement> | Element
  disableHorizontal?: boolean
  disableVertical?: boolean
  isVisibleBottomTabBar?: boolean,
  type?: 'scrollview' | 'default'
}
export const StyledContainer = ({
  children,
  disableHorizontal = false,
  disableVertical = false,
  isVisibleBottomTabBar = false,
  type= 'default'
}: StylesContainerProps) => {
  const style = styles(disableHorizontal, disableVertical,  isVisibleBottomTabBar)

  if (type ==='scrollview'){
     return <ScrollView showsHorizontalScrollIndicator={false} style={style.container}  keyboardShouldPersistTaps='handled'>{children}</ScrollView>
  }
  return <View style={style.container}>{children}</View>
}

const styles = (disableHorizontal: boolean, disableVertical: boolean, isVisibleBottomTabBar: boolean) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: disableHorizontal ? 0 : defaultPaddingHorizontal,
      paddingVertical: disableVertical ? 0 : defaultPaddingVertical,
      marginBottom: isVisibleBottomTabBar ? tabBarHeight : 0
    }
  })
}
