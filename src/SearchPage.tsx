import { FlatList, Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import PageHeader from './components/PageHeader';
import { RootStackParamList } from './navigation/RootNavigation';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import { showMessage } from 'react-native-flash-message';
import { fetchBlockWithId } from './axios/fetchBlockWithId';
import { BlockData } from './axios/fetchLatestHash';
import { formatTime } from './util/formatTime';
import { SvgFromUri, SvgXml } from 'react-native-svg';
import { richmanSvg } from '../assets/richMan';
import Animated, { FadeInLeft, FadeOut } from 'react-native-reanimated';

const SearchPage = () => {
    const insets = useSafeAreaInsets();
    const navigaton = useNavigation()
    const route = useRoute<RouteProp<RootStackParamList, 'SearchPage'>>();
    const latestBlockNumber: string = route.params.latestBlockNumber;
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = (query: React.SetStateAction<string>) => setSearchQuery(query);
    const [loading, setLoading] = useState(false);

    const [searchedBlock, setSearchedBlock] = useState<BlockData | undefined>();

    const handleSearchButtonPress = async () => {
        const searchNumber = Number(searchQuery)
        const latestNumber = parseInt(latestBlockNumber, 10);

        if (isNaN(searchNumber) || searchNumber < 1 || searchNumber > latestNumber) {
            showMessage({
                message: "Invalid block number",
                description: `Please enter a number between 1 and ${latestBlockNumber}`,
                type: "danger",
                duration: 3000
            });
        } else {
            console.log(`Searching for block ${searchNumber}`);
            setLoading(true); // Set loading to true before making the API call
            try {
                const fetchedBlock = await fetchBlockWithId(searchQuery);
                console.log('fetchedBlock:', fetchedBlock);
                setSearchedBlock(fetchedBlock);
            } catch (error) {
                console.error('Error searching for block:', error);
            } finally {
                setLoading(false); // Set loading to false after the API call is complete
            }
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1, backgroundColor: '#c5cffa' }}>
                <PageHeader header="Search Blocks" onPress={() => navigaton.goBack()} ></PageHeader>
                <View style={{ paddingHorizontal: 20, flex: 1 }}>
                    <Searchbar
                        placeholder="Search Blocks Here"
                        value={searchQuery}
                        onChangeText={onChangeSearch}
                        /* Search button on keyboard triggers this */
                        onSubmitEditing={handleSearchButtonPress}
                        style={{ backgroundColor: '#f2edf5', marginTop: 16 }}
                        placeholderTextColor={'#63696e'}
                        iconColor='#63696e'
                    />
                    <Text style={{ alignSelf: 'flex-start', marginVertical: 8, color: '#63696e' }}>Latest block number {latestBlockNumber}</Text>

                    {!searchedBlock && !loading && (
                        <Animated.View exiting={FadeOut} style={{ alignItems: 'center', marginTop: 20 }}>
                            <SvgXml width="25%" height="45%" xml={richmanSvg}></SvgXml>
                        </Animated.View>
                    )}
                   

                    <ScrollView style={styles.container} >
                        <View onStartShouldSetResponder={() => true}>
                            {loading ? (
                                <ActivityIndicator size="large" color="#0000ff" />
                            ) : searchedBlock && (
                                <BlockDetailsView searchedBlock={searchedBlock} />
                            )}
                        </View>
                    </ScrollView>


                </View>
            </View>
        </TouchableWithoutFeedback>

    );
}


const BlockDetailsView: React.FC<{ searchedBlock: BlockData }> = ({ searchedBlock }) => (
    <>
        <View style={styles.row}>
            <Text style={styles.labelText}>id:</Text>
            <Text style={styles.valueText}>{searchedBlock?.height}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.labelText}>Confirmations:</Text>
            <Text style={styles.valueText}>{searchedBlock?.confirmations}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.labelText}>Difficulty:</Text>
            <Text style={styles.valueText}>{searchedBlock?.difficulty}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.labelText}>Hash:</Text>
            <Text style={styles.valueText}>{searchedBlock?.hash}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.labelText}>Size:</Text>
            <Text style={styles.valueText}>{searchedBlock?.size}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.labelText}>Time:</Text>
            <Text style={styles.valueText}>{formatTime(searchedBlock?.timestamp as number)}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.labelText}>Transaction #:</Text>
            <Text style={styles.valueText}>{searchedBlock?.tx_count}</Text>
        </View>
    </>
);

export default SearchPage

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 4,
        marginVertical: 2
    },
    labelText: {
        fontSize: 16,
        fontWeight: "600",
        flex: 1,
        alignSelf: 'flex-start'
    },
    valueText: {
        fontSize: 16,
        fontWeight: "600",
        flex: 1,
    },
})