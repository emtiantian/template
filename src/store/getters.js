const getters = {
  sidebar: (state) => state.app.sidebar,
  language: (state) => state.app.language,
  device: (state) => state.app.device,
  homeMushroomId: (state) => state.homeMushroomId,
  // homeDeviceId: state => state.homeActionDevice.deviceId,
  // homeDevicestatus: state => state.homeActionDevice.status
};
export default getters;
