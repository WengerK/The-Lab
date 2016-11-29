import { uniq } from 'lodash';
import insane from 'insane';
import jsonp from 'jsonp';
import { apiKey as key, url, sayHi, old, dog } from './config/app';

import User, { createURL, gravatar } from './module/person';

const wengerk = new User('Kevin Wenger', 'contact@kevin-wenger.ch', 'kevin-wenger.ch');
const profile = createURL(wengerk.name);
const image = gravatar(wengerk.email);
console.log(image);
