import '../../common/components/incrementdemo/incrementdemo.js';
import sleep from '../../common/modules/sleep.js';


console.log(`Number of tags seen is ${document.getElementsByTagName('*').length}`);
console.log("Before sleep");
sleep(5); // Sleep for 5 seconds
console.log("After sleep");
console.log(`Number of tags seen is ${document.getElementsByTagName('*').length}`);