import './util.js';
import './form.js';
import './map.js';
import {createPropertyAdvertisements} from'./asvertisements-data.js';
import {handleFormState} from'./form.js';

handleFormState(true);
// eslint-disable-next-line no-console
console.log(createPropertyAdvertisements());
