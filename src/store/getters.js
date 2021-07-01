const getters = {
  sidebar: (state) => state.app.sidebar,
  language: (state) => state.app.language,
  device: (state) => state.app.device,
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  user: (state) => state.user.user,
  email: (state) => state.user.email,
  mobile: (state) => state.user.mobile,
  id: (state) => state.user.id,
  introduction: (state) => state.user.introduction,
  status: (state) => state.user.status,
  roles: (state) => state.user.roles,
  elements: (state) => state.user.elements,
  setting: (state) => state.user.setting,
  permission_routers: (state) => state.permission.routers,
  addRouters: (state) => state.permission.addRouters,
  homeMushroomId: (state) => state.homeMushroomId,
  // homeDeviceId: state => state.homeActionDevice.deviceId,
  // homeDevicestatus: state => state.homeActionDevice.status
};
export default getters;
