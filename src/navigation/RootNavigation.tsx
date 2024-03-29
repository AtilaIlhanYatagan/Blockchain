import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../HomeScreen';
import Detail from '../Detail';
import { BlockData } from '../axios/fetchLatestHash';
import SearchPage from '../SearchPage';
import SearchAddressPage from '../SearchAddress';
export type RootStackParamList = {
    HomeScreen: undefined;
    Detail: { blockData: BlockData };
    SearchPage: { latestBlockNumber: string };
    SearchAddressPage: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigation() {
    return (
        <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="Detail" component={Detail} />
            <Stack.Screen name="SearchPage" component={SearchPage} />
            <Stack.Screen name="SearchAddressPage" component={SearchAddressPage} />
        </Stack.Navigator>
    );
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}