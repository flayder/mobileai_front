import { Dimensions, Image, StyleSheet, View } from "react-native";
import Carousel from 'react-native-reanimated-carousel';
import AppImage from "../global/AppImage";
import { ThemedText } from "../ThemedText";
import { useEffect, useState } from "react";
import { COLOR_BACKGROUND, COLOR_GREEN, COLOR_GREEN_HOVER, COLOR_GREY } from "@/constants/Colors";

type AppProps = {
    color?: "green" | "white"
}

export default function AppSlider({
    color = 'white'
}: AppProps) {
    const [activeIndex, setIndex] = useState<number>(0)
    const [localHeight, setHeight] = useState<number>(0)

    const data = [
        require('@/assets/images/slider/banner.png'),
        require('@/assets/images/slider/banner.png'),
        require('@/assets/images/slider/banner.png')
    ]

    useEffect(() => {
        if(data.length > 0) {
            const {width, height} = Image.resolveAssetSource(data[0])
            const win = Dimensions.get('window')

            setHeight(height * (win.width / width))
        }
    }, [data])

    const _renderItem = ({item, index} : any) => {
        return (
            <View style={{...styles.slide, height: localHeight}} key={index}>
                <AppImage 
                    source={item}
                    fullWidth={true}
                    style={styles.img}
                />
            </View>
        );
    }

    const PaginationItem = ({index}: any) => {
        const colorStyle: any = {}

        if(color === 'green'){
            if(activeIndex === index) {
                colorStyle.backgroundColor = 'white'
            } else {
                colorStyle.backgroundColor = COLOR_GREEN_HOVER
            }
        } else if(color === 'white') {
            if(activeIndex === index) {
                colorStyle.backgroundColor = COLOR_GREEN
            } else {
                colorStyle.backgroundColor = COLOR_GREY
            }
        }

        return (
            <View style={{...styles.circle, ...colorStyle}} key={index}></View>
        )
    }

    const width = Dimensions.get('window').width
    return (
        <View style={{...styles.slider, height: localHeight + 40}}>
            <Carousel
                loop
                width={width - 20}
                autoPlayInterval={2500}
                data={data}
                autoPlay={true}
                renderItem={_renderItem}
                onProgressChange={(_, num) => {
                    if(Number.isInteger(num) && num != activeIndex)
                        setIndex(num)
                }}
            />
            {data.length > 0 && <View style={styles.pagination}>
                {
                data.map((item: any, index: number) => {
                    return <PaginationItem index={index} key={index} />
                })
                }
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: 5,
        marginLeft: 3,
        marginRight: 3
    },
    slider: {
        paddingTop: 15,
        marginBottom: 15
    },
    slide: {
        borderRadius: 8,
        overflow: 'hidden'
    },
    img: {
        borderRadius: 8
    }
})