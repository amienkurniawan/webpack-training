// import {bro} from './js/bro'
import './styles/main.scss'



var elms = document.getElementsByTagName('*'); //select all elements on the page
console.time('TEST')
console.log(elms);
console.log(elms.length);

// for (var i = 0; i < 5000; i++) {
//     for (var j = 0, length = elms.length; j < length; j++) {
//     // nothing to do ...
//     }
// }
console.timeEnd('TEST')