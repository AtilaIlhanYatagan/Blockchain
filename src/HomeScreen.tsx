import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlockData, fetchLatestBlock } from './axios/fetchLatestHash';
import { G, Path, Svg } from 'react-native-svg';
import Animated, { FadeInLeft, PinwheelIn } from 'react-native-reanimated'
import { formatTime } from './util/formatTime';
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const HomeScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [latestBlock, setLatestBlock] = useState<BlockData | undefined>();

    useEffect(() => {
        // Fetch latest hash when the component mounts
        fetchLatestBlock()
            .then((block: BlockData) => {
                setLatestBlock(block)
            })
            .catch((error) => console.error('Error setting latest hash:', error));
    }, []);

    return (
        <LinearGradient
            colors={['#a05ff5', '#3b5998', '#192f6a']}
            style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>


            <AnimatedSvg entering={PinwheelIn.duration(400).delay(300)} height="20%"
                width="40%" viewBox="0 0 64 64" >
                <G transform="translate(0.00630876,-0.00301984)">
                    <Path fill="#f7931a" d="m63.033,39.744c-4.274,17.143-21.637,27.576-38.782,23.301-17.138-4.274-27.571-21.638-23.295-38.78,4.272-17.145,21.635-27.579,38.775-23.305,17.144,4.274,27.576,21.64,23.302,38.784z" />
                    <Path fill="#FFF" d="m46.103,27.444c0.637-4.258-2.605-6.547-7.038-8.074l1.438-5.768-3.511-0.875-1.4,5.616c-0.923-0.23-1.871-0.447-2.813-0.662l1.41-5.653-3.509-0.875-1.439,5.766c-0.764-0.174-1.514-0.346-2.242-0.527l0.004-0.018-4.842-1.209-0.934,3.75s2.605,0.597,2.55,0.634c1.422,0.355,1.679,1.296,1.636,2.042l-1.638,6.571c0.098,0.025,0.225,0.061,0.365,0.117-0.117-0.029-0.242-0.061-0.371-0.092l-2.296,9.205c-0.174,0.432-0.615,1.08-1.609,0.834,0.035,0.051-2.552-0.637-2.552-0.637l-1.743,4.019,4.569,1.139c0.85,0.213,1.683,0.436,2.503,0.646l-1.453,5.834,3.507,0.875,1.439-5.772c0.958,0.26,1.888,0.5,2.798,0.726l-1.434,5.745,3.511,0.875,1.453-5.823c5.987,1.133,10.489,0.676,12.384-4.739,1.527-4.36-0.076-6.875-3.226-8.515,2.294-0.529,4.022-2.038,4.483-5.155zm-8.022,11.249c-1.085,4.36-8.426,2.003-10.806,1.412l1.928-7.729c2.38,0.594,10.012,1.77,8.878,6.317zm1.086-11.312c-0.99,3.966-7.1,1.951-9.082,1.457l1.748-7.01c1.982,0.494,8.365,1.416,7.334,5.553z" />
                </G>
            </AnimatedSvg>


            <Animated.View style={{ flex: 0.5, width: "100%", paddingHorizontal: 36 }}>
                <Text style={styles.headerText}>Latest Block</Text>

                <Animated.View entering={FadeInLeft.duration(600).delay(200)} style={styles.row}>
                    <Text style={styles.labelText}>Id:</Text>
                    <Text style={styles.valueText}>{latestBlock?.height}</Text>
                </Animated.View>
                <Animated.View entering={FadeInLeft.duration(600).delay(400)} style={styles.row}>
                    <Text style={styles.labelText}>Size:</Text>
                    <Text style={styles.valueText}>{latestBlock?.size}</Text>
                </Animated.View>
                <Animated.View entering={FadeInLeft.duration(600).delay(600)} style={styles.row}>
                    <Text style={styles.labelText}>Time:</Text>
                    <Text style={styles.valueText}>{latestBlock && formatTime(latestBlock?.timestamp)}</Text>
                </Animated.View>
                <Animated.View entering={FadeInLeft.duration(600).delay(800)} style={styles.row}>
                    <Text style={styles.labelText}>Tx Count:</Text>
                    <Text style={styles.valueText}>{latestBlock?.tx_count}</Text>
                </Animated.View>
            </Animated.View>

            <View style={styles.squareContainer}>

                <TouchableOpacity onPress={() => latestBlock && navigation.navigate("Detail", { blockData: latestBlock })}>
                    <LinearGradient colors={['#ffcc00', '#ff6666']} style={styles.square}>
                        <Text style={styles.squareText}>Show Details</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => latestBlock && navigation.navigate("SearchPage", { latestBlockNumber: latestBlock.height.toString() })}>
                    <LinearGradient colors={['#66ccff', '#00cc66']} style={styles.square}>
                        <Text style={styles.squareText}>Search Blocks</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => latestBlock && navigation.navigate("SearchAddressPage") }>
                    <LinearGradient colors={['#a05ff5', '#ffcc00']} style={styles.square}>
                        <Text style={styles.squareText}>Search  {"\n"} Tx/Adress</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

        </LinearGradient>
    );
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    square: {
        width: 100,
        height: 96,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    squareText: {
        color: 'black',
        fontSize: 18,
        fontWeight: "700",
        textAlign: 'center',
    },
    squareContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: "100%",
        marginBottom: 16,
    },
    headerText: {
        color: "white",
        fontSize: 36,
        fontWeight: "600",
        textAlign: 'center',
        marginBottom: 36
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginVertical: 4
    },
    labelText: {
        color: "white",
        fontSize: 24,
        fontWeight: "600",
    },
    valueText: {
        color: "white",
        fontSize: 24,
        fontWeight: "600"
    },
});
