(() => {
    // Function to extract YouTube video ID from URL
    const extractVideoId = (url) => {
        const urlObj = new URL(url);
        return urlObj.searchParams.get('v');
    };

    // Function to send a request to the server to check if the URL is blocked
    const checkLinkWithServer = (url) => {
        const serverURL = 'http://localhost:80/checkBlockedURL';
        const videoId = extractVideoId(url);
        const data = { url: videoId };

        fetch(serverURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if (data.isBlocked) {
                // If not bypassed (user clicked continue), show warning page
                chrome.storage.local.get(['bypassed'], res => {
                    if (!res.bypassed) {
                        chrome.storage.local.get(['totalRickRolls'], res => {
                            chrome.storage.local.set({ totalRickRolls: (res.totalRickRolls ?? 0) + 1 });
                        });
                        location.replace(chrome.runtime.getURL('warn/warn.html') + '?' + url);
                    } else {
                        chrome.storage.local.set({ bypassed: false });
                    }
                });
            }
        })
        .catch(error => {
            // If the server is not responding or returns an error, proceed as if the URL is not blocked
            console.error('Error checking blocked URL:', error);
        });
    };

    // Get the current URL
    const currentUrl = window.location.href;

    // Make sure we're not already on a blocked link
    checkLinkWithServer(currentUrl);

    // Hook into youtube navigation event
    addEventListener('yt-navigate-start', () => {
        const newUrl = window.location.href;
        checkLinkWithServer(newUrl);
    });
})();