import {sleep} from '../../common/sleepmodule.js';

console.log(`Number of p tags seen is ${document.getElementsByTagName('p').length}`);
console.log("Before sleep");
sleep(5); // Sleep for 5 seconds
console.log("After sleep");
