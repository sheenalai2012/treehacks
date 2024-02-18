export const getUserGeoLocation = () => {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        // Prompt user for permission to access their location
        navigator.geolocation.getCurrentPosition(
          // Success callback function
          (position) => {
            // Get the user's latitude and longitude coordinates
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
  
            // Resolve the promise with the location data
            resolve({ latitude: lat, longitude: lng });
          },
          // Error callback function
          (error) => {
            // Reject the promise with the error
            reject(error);
          }
        );
      } else {
        // Geolocation is not supported by the browser
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
};
  