// Check if the browser supports Service Workers
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Register the Service Worker
        navigator.serviceWorker.register('./sw.js')
            .then(reg => {
                console.log('Service Worker registered successfully: ', reg);
            })
            .catch(err => {
                console.error('Service Worker registration failed: ', err);
            });
    });
} else {
    console.warn('Service Workers are not supported in this browser.');
}

// Optional: Add simple logic to show network status
const networkStatus = document.createElement('p');
networkStatus.style.marginTop = '20px';
networkStatus.id = 'network-status';
document.querySelector('main').appendChild(networkStatus);

function updateNetworkStatus() {
    const statusText = navigator.onLine ? 'Online' : 'Offline (Serving from Cache)';
    const color = navigator.onLine ? 'green' : 'red';
    networkStatus.innerHTML = `<strong>Status: <span style="color: ${color};">${statusText}</span></strong>`;
}

// Initial check
updateNetworkStatus();

// Listen for network changes
window.addEventListener('online', updateNetworkStatus);
window.addEventListener('offline', updateNetworkStatus);