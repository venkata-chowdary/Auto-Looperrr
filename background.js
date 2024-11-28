chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes('music.youtube.com')) {
        const songId1 = tab.url.split('=')[1];
        const songId = songId1.split('&')[0];
        chrome.storage.local.get('songs', (data) => {
            const songsList = data.songs || [];  // Default to an empty array if data.songs is undefined
            chrome.tabs.sendMessage(tabId, { action: 'repeatOff' });
            if (songId && songsList.includes(songId)) {
                console.log('Song is in the list');
                chrome.tabs.sendMessage(tabId, { action: 'setRepeatOne' });
            }
        });
    }
});
