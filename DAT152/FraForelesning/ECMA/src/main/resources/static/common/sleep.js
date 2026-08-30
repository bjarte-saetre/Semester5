"use strict";

function sleep(seconds) {
    
    // Using the legacy but widely supported Date Class
    const delayInMilliSeconds=1000*seconds
    const startInMilliSeconds = Date.now()
    const endInMilliSeconds = startInMilliSeconds+delayInMilliSeconds

    do {
        // Busy waiting
    } while (Date.now() < endInMilliSeconds)
}
