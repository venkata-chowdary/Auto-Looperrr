chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'setRepeatOne') {
        const repeatButton = document.querySelector('tp-yt-paper-icon-button.repeat');

        if (repeatButton) {
            const repeatType = repeatButton.getAttribute('title');

            if (repeatType === 'Repeat off') {
                repeatButton.click()
                setTimeout(() => {
                    repeatButton.click()
                }, 500)
            }
            else if (repeatType === 'Repeat all') {
                repeatButton.click()

            }
        }
    }

    else if(message.action==='repeatOff'){
        const repeatButton = document.querySelector('tp-yt-paper-icon-button.repeat');
        if(repeatButton){
            const repeatType=repeatButton.getAttribute('title')
            if(repeatType==='Repeat one'){
                repeatButton.click()
            }
            else if(repeatType==='Repeat all'){
                repeatButton.click()
                setTimeout(()=>{
                    repeatButton.click()
                },500)
            }
        }
    }
});
