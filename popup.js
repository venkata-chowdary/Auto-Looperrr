const addBtn = document.getElementById('add')
const removeBtn = document.getElementById('remove')
const songsList = document.getElementById('list')
const clearBtn = document.getElementById('clear')


function updateList() {
    chrome.storage.local.get('songs', (data) => {
        if (!data.songs) {
            chrome.storage.local.set({ songs: [] });
        }
        const songs = data.songs || []
        songsList.innerHTML = ''
        songs.forEach((song) => {
            const songEle = document.createElement('p')
            songEle.textContent = song
            songsList.appendChild(songEle)
        })
    })
}

updateList()

function changeRepeatMode(tabId,repeatType){
    chrome.tabs.sendMessage(tabId, { action: repeatType });
}


addBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
        const songId1 = tab[0].url.split('=')[1]
        const songId = songId1.split('&')[0]

        const tabId=tab[0].id
        if (songId) {
            chrome.storage.local.get('songs', (data) => {
                let songs = data.songs || []
                if (!songs.includes(songId)) {
                    songs.push(songId)
                    chrome.storage.local.set({ songs: songs }, ()=>{
                        updateList();
                        changeRepeatMode(tabId,'setRepeatOne');
                        (()=>console.log('mode changed'))
                    })
                }
            })
        }
    })
})

removeBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
        const songId1 = tab[0].url.split('=')[1]
        const songId=songId1.split('&')[0]

        const tabId=tab[0].id

        if (songId) {
            chrome.storage.local.get('songs', (data) => {
                let songs = data.songs || []
                songs = songs.filter((song) => song !== songId)
                chrome.storage.local.set({ songs: songs }, ()=>{
                    updateList();
                    changeRepeatMode(tabId,'repeatOff');
                })
            })
        }
    })
})

clearBtn.addEventListener('click', () => {
    chrome.storage.local.set({ songs: [] }, updateList)
})