/* global navigator */
const helpers = {
  getGeolocation: () => {
    if (!('geolocation' in navigator)) {
      // geolocation not available
      console.log('geolocation required.');
      return {};
    }
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position, err) => {
        if (err) {
          reject(err);
        } else {
          resolve(position.coords);
        }
      });
    });
  },

  watchGeolocation: (callback) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition
    if (!('geolocation' in navigator)) {
      callback({
        message: 'geolocation required.',
        err: 'Geolocation not supported',
      });
    } else {
      const id = navigator.geolocation.watchPosition((position) => {
        // need to cancel id at some point
        callback(null, position, id);
      }, (err) => {
        callback({
          message: 'Error getting location',
          err,
        });
      }, {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: 500,
      });
    }
  },
};

export default helpers;