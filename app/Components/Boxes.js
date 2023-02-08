import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

export default class Boxes extends React.Component {


    render() {
        return (
            <><View style={styles.container}>
            </View>
                <View style={styles.box}>
                </View>
                <View style={styles.inner}>
                    <Text>Box 1</Text>

                </View></>
        )
    }

    

}


const styles = StyleSheet.create({
        container:{
            width: '100%',
            height: '85%',
            padding: 5,
            flexDirection: 'row',
            flexWrap: 'wrap',
        },

        box:{
            width: '50%',
            height: '50%',
            padding: 5,

        },
        inner: {
            flex: 1,
            backgroundColor: 'green',
            alignItems: 'center',
            justifyContent: 'center'

        }
})

