counter = 0;

onmessage = function (e) {
    console.log('Worker: Message received from main script');
    console.log(e.data);
    counter = counter + e.data;
    console.log('Worker: Posting message back to main script');
    postMessage(counter);
}