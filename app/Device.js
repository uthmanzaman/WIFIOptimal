/**
 * A Object containing infomation about a  device
 * @property {string} uuid - Unique identifier of device
 * @property {URL} location - URL of device
 * @property {integer} port - Port number of device
 * @property {string} ip - address of device
 * @property {string} auth - Authorization Token of device
 * @property {Object} Segmants - Individial  segmants of device
 * @property {string} type - Type of  device
 */
class Device {
  /**
 * Creates a Device
 * @param {object} device - Contains infomation regarding  device
 * @param {string} device.uuid - Unique identifier of device
 * @param {string} device.location - URL of device
 * @param {string} device.type - Type of  device
 * @param {string} device.auth - Authorization Token of device
 * @param {Object} device.Segmants - Individial  segmants of device
 */
  constructor(device) {
    this.type = device.type;
    this.uuid = device.uuid;
    this.location = new URL(device.location);
    this.authToken = device.auth ? device.auth : null;
    this.Segmants = device.Segmants ? device.Segmants : {};
  }

  /**
 * Get stream control version for  segmants types
 *
 * @return {string} stream control version
 *
 */
  get streamControlVersion() {
    switch (this.type) {
      case 'DEVICE': {
        const keyArray = Object.keys(this.Segmants);
        if (keyArray.length >= 1 && this.Segmants[keyArray[0]].streamControlVersion) {
          return this.Segmants[keyArray[0]].streamControlVersion;
        }
        return 'v1';
      }
      case 'HUE':
        return undefined;
      case 'LIFT':
        return undefined;
      default:
        return undefined;
    }
  }

  /**
 * Port number of device
 * @returns {string} Port number of device
 */
  get port() {
    if (this.location !== null) {
      // eslint-disable-next-line no-underscore-dangle
      return this.location._url.match(/\/{2}.*:(.*)\//)[1];
    }
    return null;
  }

  /**
 * IP address of device
 * @returns {string} IP address of device
 */
  get ip() {
    if (this.location !== null) {
      // eslint-disable-next-line no-underscore-dangle
      return this.location._url.match(/\/{2}(.*):/)[1];
    }
    return null;
  }
}

export default Device;

