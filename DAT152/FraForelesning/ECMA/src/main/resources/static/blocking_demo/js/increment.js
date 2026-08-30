"use strict";

{
    function increment() {
        ++(document.getElementById('number').textContent);
    }

    function init() {
        document.getElementById('number').textContent=0;
        document.getElementById('bt').addEventListener('click',increment);
    }
    init();
    window.alert('increment.js has finished');
    //console.log('increment.js has finished');
}

