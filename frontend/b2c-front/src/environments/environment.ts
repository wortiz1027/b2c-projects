// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const API_GATEWAY_HOST = 'http://10.39.1.85:9092';

export const environment = {
  production: false,
  CAMPAINS_SERVICE_URL: `${API_GATEWAY_HOST}/campaigns/qrs`,
  LOGIN_SERVICE_URL: `${API_GATEWAY_HOST}/uua/oauth/token`,
  COMMAND_ORDERS_SERVICE_URL: `${API_GATEWAY_HOST}/orders/cmd`,
  GET_ORDERS_BY_USER_URL: `${API_GATEWAY_HOST}/orders/qrs/all/client/`,
  GET_ORDER_DETAILS_URL: `${API_GATEWAY_HOST}/orders/qrs/detail/`,
  PAYMENT_URL: `${API_GATEWAY_HOST}/pay/validations/`,
  GET_ALL_PRODUCTS_SERVICE_URL: `${API_GATEWAY_HOST}/products/qrs`,
  GET_PRODUCT_DETAILS_SERVICE_URL: `${API_GATEWAY_HOST}/products/qrs/details`,
  GET_PRODUCTS_BY_TEXT_SERVICE_URL: `${API_GATEWAY_HOST}/products/qrs/text`,
  CREATE_USER_SERVICE: `${API_GATEWAY_HOST}/registry/users`,
  GET_USER_DETAILS_SERVICE_URL: `${API_GATEWAY_HOST}/security/users/detail`,
  CANCEL_ORDER_BPM: `${API_GATEWAY_HOST}/bpm/cancel`,
  INSTANCE_ORDER_BPM: `${API_GATEWAY_HOST}/bpm/instance`
};
