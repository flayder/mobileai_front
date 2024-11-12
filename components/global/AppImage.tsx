import { Dimensions, Image, View, type ImageProps, type ImageSourcePropType } from "react-native";
import { ThemedText } from "../ThemedText";

export type AppImageProps = ImageProps & {
    fullWidth?: boolean
    addToWidth?: number
    source: ImageSourcePropType
    style?: any
    wrapStyle?: any
}

export default function AppImage({
    style,
    source,
    addToWidth = 0,
    wrapStyle,
    fullWidth
}: AppImageProps) {
    const {width, height} = Image.resolveAssetSource(source)
    const win = Dimensions.get('window')

    if(fullWidth && width > 0 && height > 0) {
        const ratio = win.width / width
        if(typeof style != 'object' || style === null)
            style = {}

        style = {
            ...style,
            width: width * ratio,
            height: height * ratio
        }

        style.width += addToWidth
    }

    return (
        <View style={{...wrapStyle, width: style?.width, height: style?.height}}>
            <Image
                resizeMode={'cover'}
                source={source}
                style={style}
            />
        </View>
    )
}