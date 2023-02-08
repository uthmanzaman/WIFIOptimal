import React from 'react';

import {
    StyleSheet,
    Text,
    View
} from 'react-native';

export const SpeedTest = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                speedTest
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffc125',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});

export default SpeedTest; 