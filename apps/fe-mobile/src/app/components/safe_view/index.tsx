import React, { ReactNode } from 'react'
import { StyleSheet} from 'react-native'
import { Edge, SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { RootState } from '@fe-monorepo/store'
import { getStyle } from '@fe-monorepo/themes';
import { colors } from 'libs/themes/src/colors'
import Loading from '../Loading'

interface SafeViewProps {
  children: ReactNode,
  topEdge?: boolean,
  withoutBottomEdge?: boolean,
  bgColor?: string,
  withoutBottomTopEdges?: boolean
}

export const StyledSafeView = ({ children, topEdge, withoutBottomEdge, withoutBottomTopEdges }: SafeViewProps) => {

  const theme = useSelector((state: RootState) => state.app.themes);
  const isLoading = useSelector((state: RootState) => state.app.isLoading);
  

  const edges: Edge[] = ['bottom', 'left', 'right']

  const withTopEdge: Edge[] = ['bottom', 'left', 'right', 'top']
  const withOutBottomEdge: Edge[] = ['left', 'right', 'top']
  const withoutBottomTop: Edge[] = ['left', 'right']
  const styles = createStyles(theme)

  let availableEdges: Edge[] = []

  if (topEdge) {
    availableEdges = withTopEdge
  } else if (withoutBottomEdge) {
    availableEdges = withOutBottomEdge
  } else if (withoutBottomTopEdges) {
    availableEdges = withoutBottomTop
  } else {
    availableEdges = edges
  }

  return (
    <SafeAreaView style={styles.container} edges={availableEdges}>
      {children}
      {isLoading ? <Loading /> : ''}  
    </SafeAreaView>
  )
}

const createStyles = (
  theme?: string
) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: getStyle(theme).backgroundColor
    }
  })
}
