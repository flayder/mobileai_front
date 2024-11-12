import { COLOR_GREEN } from '@/constants/Colors';
import { useEffect } from 'react';
import { Text, View, type TextProps, StyleSheet, PixelRatio, Platform, Dimensions } from 'react-native';

export type ThemedTextProps = TextProps & {
  italic?: boolean
  wrapStyle?: any
  onSize?: any
  fullScreen?: boolean
  type?: 'default' | 'caption_2' | 'title_1' | 'title_2' | 'title_3' | 'defaultSemiBold' | 'subtitle' | 'link' | 'subhead';
};

export function ThemedText({
  style,
  italic,
  type = 'default',
  wrapStyle,
  onSize,
  fullScreen = false,
  ...rest
}: ThemedTextProps) {

  const width = Dimensions.get('window').width

  var fontFamily = {fontFamily: 'Inter'}
  if(italic)
    fontFamily = {fontFamily: 'InterItalic'}


  const scale = width / 340;

  const normalize = (size: number) => {
    const newSize = size * scale 
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  }

  const getFontStyle = (type: any) => {
    var st: any = styles.default
    if(type === 'title_1')
      st = styles.title_1
    if(type === 'title_2') 
      st = styles.title_2
    if(type === 'title_3') 
      st = styles.title_3
    if(type === 'defaultSemiBold') 
      st = styles.defaultSemiBold
    if(type === 'subtitle')
      st = styles.subtitle
    if(type === 'link') 
      st = styles.link
    if(type === 'subhead') 
      st = styles.subhead
    if(type === 'caption_2') 
      st = styles.caption_2

    return st
  }

  const newStyle = {
    ...getFontStyle(type),
    ...style as object,
    ...fontFamily
  }

  if(newStyle?.fontSize && newStyle.fontSize) {
    newStyle.fontSize = normalize(newStyle.fontSize)
  }

  if(newStyle?.lineHeight && newStyle.lineHeight) {
    newStyle.lineHeight = normalize(newStyle.lineHeight)
  }

  if(fullScreen) {
    newStyle.width = width - 20
  }

  useEffect(() => {
    if(onSize && newStyle?.fontSize)
      onSize(newStyle.fontSize)
  }, [newStyle?.fontSize])

  return (
    <View style={{...styles.wrap, ...wrapStyle}}>
      <Text
        style={newStyle}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingTop: 5,
    paddingBottom: 5
  },
  default: {
    fontSize: 15,
    lineHeight: 17,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 600,
  },
  title_1: {
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 28,
  },
  caption_2: {
    fontSize: 11,
    lineHeight: 14
  },
  title_2: {
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 26,
  },
  title_3: {
    fontSize: 17,
    fontWeight: 600,
    lineHeight: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subhead: {
    lineHeight: 18,
    fontSize: 16,
    fontWeight: 600
  },
  link: {
    lineHeight: 30,
    fontSize: 14,
    fontWeight: 600,
    color: COLOR_GREEN,
  },
});
