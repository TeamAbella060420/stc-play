import React from 'react';
import { WebView } from 'react-native-webview';
import styles from './styles';
import { WebViewContainerProps } from './type';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import { getStyle } from '@fe-monorepo/themes';
import { Platform } from 'react-native';

const WebViewContainer = (props: WebViewContainerProps) => {
  const { style, htmlTag } = props;
  const { themes, isRTL } = useSelector((state: RootState) => state.app);
  const backgroundColor = { backgroundColor: getStyle(themes).backgroundColor };


  const fontUrl = Platform.select({
    ios: "assets/STCForward-Regular.ttf",
    android: "file:///android_asset/fonts/STCForward-Regular.ttf",
  });

  const dir = (isRTL) ? "rtl" : "ltr"

  const html = `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><style type="text/css">
        @font-face {
          font-family: "STC Forward"; 
          src: local('STC-Forward'), url(`+fontUrl+`) format('truetype')
        }
        h2 {
          font-family: "STC Forward";
          margin-top: 42px;
          margin-bottom: 16px;    
          font-size: 16px;
        }
        body {
           margin: 20;
           margin-top: 24;
           font-family:STC Forward;
        }
 </style></head><body dir=`+ dir +`>` + htmlTag + `</body></html>`
  
  return (
    <WebView 
    useWebKit
    originWhitelist={['*']}
    style={[styles.container, backgroundColor, style]}
    source={{ html: html}}/>
  );
};

export default WebViewContainer;