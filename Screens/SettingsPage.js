import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Icon
} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'




 const SettingsPage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
         <Text style={styles.headerText}>Settings</Text>
            </View>
        <View style={styles.content}>
          <Text style={styles.headerText}>General</Text>
          <TouchableOpacity style={styles.button}>
          <Ionic name={'notifications'} />
            <Text style={{ fontSize: 16 }}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <MCIcons name={'account'}/>
            <Text style={{ fontSize: 16 }}>Account</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>Appearance</Text>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            
            <Text style={{ fontSize: 16 }}>Dark Mode</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            
            <Text style={{ fontSize: 16 }}>Color Scheme</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
};

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
        marginTop: 20,
      },
      listItem: {
        flex: 0.1,
        padding: 20,
        borderWidth: 1,
        borderColor: '',
        backgroundColor: '#7692FF',
        width: '90%',
        borderRadius: 15,
        justifyContent: 'center'
    
      }
});

export default SettingsPage;




