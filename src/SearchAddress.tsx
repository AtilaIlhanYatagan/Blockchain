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

const SearchAddressPage = () => {
    const insets = useSafeAreaInsets();
    const navigaton = useNavigation()

    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = (query: React.SetStateAction<string>) => setSearchQuery(query);
    const [searchedBlock, setSearchedBlock] = useState<BlockData | undefined>();

    const [loading, setLoading] = useState(false);

    const handleSearchButtonPress = async () => {
        showMessage({
            message: "Invalid block number",
            description: `Please enter a number between 1 and `,
            type: "danger",
            duration: 3000
        });
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1, backgroundColor: '#F7FFCF' }}>
                <PageHeader header="Search Address" onPress={() => navigaton.goBack()} ></PageHeader>
                <View style={{ paddingHorizontal: 20, flex: 1 }}>
                    <Searchbar
                        placeholder="Search Tx / Address Here"
                        value={searchQuery}
                        onChangeText={onChangeSearch}
                        /* Search button on keyboard triggers this */
                        onSubmitEditing={handleSearchButtonPress}
                        style={{ backgroundColor: '#CFFFFD', marginTop: 16 }}
                        placeholderTextColor={'#63696e'}
                        iconColor='#63696e'
                    />

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

export default SearchAddressPage

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