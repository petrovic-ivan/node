console.log('Starting app...');

setTimeout(() => {
    console.log('Inside of collback.');
}, 2000);

setTimeout(() => {
    console.log('Zero ms');
}, 0);

console.log('Finishing app...');