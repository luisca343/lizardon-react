// Constants.js
const prod = {
  API_URL: 'https://api.lizardon.es',
  REDIRECT_URL: 'https://lizardon.es',
  TWITCH_CLIENT_ID: 'ffufl0nly7omwkf2brv1dnkuo89ati'
}
const dev = {
  API_URL: 'https://dev.lizardon.es',
  REDIRECT_URL: 'https://local.lizardon.es',
  TWITCH_CLIENT_ID: 'om90s2of19rz5srmug5x7l0wmlpqqe'
}
export const config = process.env.NODE_ENV === 'development' ? dev : prod
