/* ============ service worker ============*/

// installing function of service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', (reg) => {
        navigator.serviceWorker
            .register('../sw.js')
            .then(() => {
                console.log('service worker added');
            })
            .catch(err => console.log(`Some error occurred: Error: ${err}`));
    })
}

