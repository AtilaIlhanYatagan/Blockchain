import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import PageHeader from './components/PageHeader';
import { RootStackParamList } from './navigation/RootNavigation';
import { BlockData } from './axios/fetchLatestHash';

const Detail = () => {
    const insets = useSafeAreaInsets();
    const navigaton = useNavigation()
    const route = useRoute<RouteProp<RootStackParamList, 'Detail'>>();
    const blockItem: BlockData = route.params.blockData;
    return (
        <View
            style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                flex: 1,
            }}
        >
            <PageHeader header="Detay" onPress={() => navigaton.goBack()} ></PageHeader>
            <Text>{blockItem.bits}</Text>
        </View>
    );
}

export default Detail

const styles = StyleSheet.create({})