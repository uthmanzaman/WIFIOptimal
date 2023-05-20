import { PermissionsAndroid } from 'react-native';
import WifiManager from 'react-native-wifi-reborn';

// Function to request Wi-Fi permission (for Android)
async function requestWifiPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Wi-Fi Permission',
        message: 'App needs access to your Wi-Fi to scan networks.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
}

// Function to perform the Wi-Fi scan
export async function scanWifiNetworks() {
  if (Platform.OS === 'android') {
    const permissionGranted = await requestWifiPermission();
    if (!permissionGranted) {
      console.log('Wi-Fi permission denied');
      return [];
    }
  }

  try {
    const wifiList = await WifiManager.loadWifiList();
    //console.log('Wi-Fi networks:', wifiList);
    
  } catch (error) {
    console.log('Error scanning Wi-Fi networks:', error);
    return [];
  }
}

  
  


