export default function (seconds) {
    const delayInMilliSeconds=1000*seconds;
    const startInMilliSeconds = Date.now();
    const endInMilliSeconds = startInMilliSeconds+delayInMilliSeconds;

    do {
        // Busy waiting
    } while (Date.now() < endInMilliSeconds);
}
