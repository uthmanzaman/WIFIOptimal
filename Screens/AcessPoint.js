import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';


 const AcessPoint = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                acessPoint
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#33E6FA',

    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

export default AcessPoint;




