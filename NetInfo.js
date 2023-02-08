import * as Network from 'expo-network';

const ipAlert = async () => {
  const ip = await Network.getIpAddressAsync()
  alert(ip);
};

ipAlert();