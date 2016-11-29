import { uniq } from 'lodash';
// import insane from 'insane';
// import jsonp from 'jsonp';

const ages = [1, 1, 4, 52, 12, 4];

console.log(uniq(ages));

// Get the default export - use no brackets
import dog from 'config/app.js';
console.log(dog);

// Get named export - use brackets
import { apiKey } from 'config/app.js';
console.log(apiKey);

// Get named function export - use brackets
// It's exactly the same as variables !!
import { sayHi } from 'config/app.js';
console.log(sayHi('Kevin Wenger'));

// Get multiple export named - using the comma separator
import { url, endpoint } from 'config/app.js';
console.log(url, endpoint);

// You can also rename the export using the "as" keyword
// Get multiple export named - using the comma separator
import { old as age } from 'config/app.js';
console.log(old);
