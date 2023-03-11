import React from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

export const WIFICoverage = () => {
    return (

        <View style={styles.container}>
            <View style={styles.header}>
         <Text style={styles.headerText}>WIFI Coverage</Text>
            </View>
            <View style={styles.content}>
       
       <View style={styles.output}>
        <View style={{flex: 1}}>
         <Text style={styles.outputText}>Download speed: MB/s</Text>
         </View>
         <View style={{flex: 1}}>
         <Text style={styles.outputText}>Upload speed:  MB/s</Text>
         </View>
       </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16
      },
      header: {
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
        alignItems: 'center',
      },
      headerText: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
      },
      button: {
        width: 100,
        height: 100,
        borderRadius: 60,
        backgroundColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      }
});

export default WIFICoverage; 