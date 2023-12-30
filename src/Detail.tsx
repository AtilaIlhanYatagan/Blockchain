import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import PageHeader from './components/PageHeader';
import { RootStackParamList } from './navigation/RootNavigation';
import { BlockData } from './axios/fetchLatestHash';
import { formatTime } from './util/formatTime';

const Detail = () => {
    const insets = useSafeAreaInsets();
    const navigaton = useNavigation()
    const route = useRoute<RouteProp<RootStackParamList, 'Detail'>>();
    const blockItem: BlockData = route.params.blockData;
    return (
        <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1, }}>
            <PageHeader header="Block Detail" onPress={() => navigaton.goBack()} ></PageHeader>
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.row}>
                        <Text style={styles.labelText}>id:</Text>
                        <Text style={styles.valueText}>{blockItem.height}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.labelText}>Confirmations:</Text>
                        <Text style={styles.valueText}>{blockItem.confirmations}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.labelText}>Difficulty:</Text>
                        <Text style={styles.valueText}>{blockItem.difficulty}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.labelText}>Hash:</Text>
                        <Text style={styles.valueText}>{blockItem.hash}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.labelText}>Size:</Text>
                        <Text style={styles.valueText}>{blockItem.size}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.labelText}>Time:</Text>
                        <Text style={styles.valueText}>{formatTime(blockItem.timestamp)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.labelText}>Transaction #:</Text>
                        <Text style={styles.valueText}>{blockItem.tx_count}</Text>
                    </View>

                </ScrollView>
            </View>
        </View>
    );
}

export default Detail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginVertical: 4
    },
    labelText: {
        fontSize: 18,
        fontWeight: "600",
        flex: 1,
        alignSelf: 'flex-start'
    },
    valueText: {
        fontSize: 18,
        fontWeight: "600",
        flex: 1,
    },
})