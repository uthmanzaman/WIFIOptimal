import React from 'react';

import {
    StyleSheet,
    Text,
    View
} from 'react-native';

export const WIFICoverage = () => {
    return (

        <View style={styles.container}>
            <Text style={styles.title}>
                wifi
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#54cbff',
        height: '100%',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

export default WIFICoverage; 