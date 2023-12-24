import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../HomeScreen';
import Detail from '../Detail';
import { BlockData } from '../axios/fetchLatestHash';
export type RootStackParamList = {
    HomeScreen: undefined;
    Detail: { blockData: BlockData };
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
        </Stack.Navigator>
    );
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}