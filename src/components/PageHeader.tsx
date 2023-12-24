import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomBackButtonNoBackground from './CustomBackButton';

interface PageHeaderProps {
    header: string;
    onPress: () => void;
}

const PageHeader: FC<PageHeaderProps> = ({ header, onPress }) => {
    return (
        <View>
            <View style={styles.container}>
                <CustomBackButtonNoBackground onPress={onPress} />
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>{header}</Text>
                </View>
                <View style={styles.rowItem}></View>
            </View>
            <View style={{ height: 1, width: "100%", backgroundColor: '#D9E3F1' }}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        marginBottom:12
    },
    headerTextContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        color: '#0B1015',
        fontSize: 16,
        fontWeight: '500',
        marginVertical: 8,
        lineHeight: 22.4,
    },
    rowItem: {
        flex: 0.25,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight:20,
    },
});

export default PageHeader;
