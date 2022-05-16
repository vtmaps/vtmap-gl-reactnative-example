import MapboxDirectionsFactory from '@vtmap/vtmap-sdk-js/services/directions';

import config from './utils/config';

const clientOptions = {accessToken: config.get('accessToken')};
const directionsClient = MapboxDirectionsFactory(clientOptions);

export {directionsClient};
