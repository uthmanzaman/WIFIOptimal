

import {dgram} from 'dgram';
import { Device } from './app/device';



// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const {Buffer} = require('buffer/');

/** 
* @param {dgram.Socket} socket - Socket to broadcast from
* @param {string} ip - SSDP default IP address of device
* @param {number} port - SSDP default port of device
* @param {string} target - Target of device
*/


const broadcastSsdp = (socket, ip, port, target) => {
    const query = Buffer.from( // eslint-disable-line no-undef
      'M-SEARCH * HTTP/1.1\r\n'
        + `HOST: ${ip}:${port}\r\n`
        + 'MAN: "ssdp:discover"\r\n'
        + 'MX: 1\r\n'
        + `ST: ${target}\r\n\r\n`,
    );
  
  socket.send(
    query,
    0,
    query.length,
    port,
    ip,
  );
  }



const  DeviceDiscoveryManager = {

    /**
   * Discover local Nanoleaf devices using SSDP protocol
   *
   * @param {Object} dispatch - Redux dispatch
   * @param {string} target - Target service type
   * * @param {string} ssdpDefaultIp - Target IP Address of target device
   * @param {number} ssdpDefaultPort - Target Port of target device
   * @param {string} type - Target device type
   * @param {Object} headerSelector - Infomation for selecting SSDP response headers
   * @param {string} headerSelector.uuid.header - SSDP response header
   * @param {Regex} headerSelector.uuid.matcher - Regex to select header data
   * @param {string} headerSelector.location.header - SSDP response header
   * @param {Regex} headerSelector.location.matcher - Regex to select header data
   * @param {Function} [deviceChecker] - Function taking an SSDP response as argument,
   * returns boolean
   * @param {number} [sourcePort] - Source port of SSDP request
   * @param {string} [sourceIp] - Source IP address of SSDP request
   * @returns {Promise<LightDevice[]>} Array of discovered devices
   */



     discoverDevices(dispatch, target, ssdpDefaultIp, ssdpDefaultPort, type, headerSelector, deviceChecker = () => true, sourceIp = '0.0.0.0', sourcePort = 1901) {
      const socket = dgram.createSocket('udp4');
      const devices = [];


      //dispatch(AppActions.updateSsdpSearchingStatus(true));



socket.on('listening', () => {
  broadcastSsdp(socket);
});

socket.on('message', (chunk, info) => { // eslint-disable-line no-unused-vars
  const result = { uuid: null, location: null, type };
  const buffer = Buffer.from(chunk);

  const response = buffer
    .toString()
    .trim()
    .split('\r\n');

  // Checks type of device
  const deviceCheck = deviceChecker(response);

  if (deviceCheck) {
    // For each header of device response, extract useful infomation into LightDevice
    response.forEach((item) => {
      const splitter = item.indexOf(':');

      if (splitter > -1) {
        const header = item.slice(0, splitter);
        const value = item.slice(splitter, item.length);

        if (header === headerSelector.uuid.header) {
          // eslint-disable-next-line prefer-destructuring
          result.uuid = value.match(headerSelector.uuid.matcher)[1];
        } else if (header === headerSelector.location.header) {
          // eslint-disable-next-line prefer-destructuring
          result.location = value.match(headerSelector.location.matcher)[1];
        }
      }
    });
    if (result.uuid && result.location) {
      devices.push(new Device(result));
    }
  }
});

socket.bind(sourcePort, sourceIp);

// Timeout after certain amount of time
return new Promise((resolve) => {
  setTimeout(() => {
    socket.close();
    //dispatch(AppActions.updateSsdpSearchingStatus(false));
    resolve(devices);
  }, 3000);
});
},
};

export default DeviceDiscoveryManager;