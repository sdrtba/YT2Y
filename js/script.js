const songData = new Object();

document.addEventListener("DOMContentLoaded", () => {
    const SendSongData = () => {
        songData.isPopup = true
        songData.songName = document.getElementById("songName").value;

        chrome.tabs.query({active:true}, tabs=>{
            const tab=tabs[0];
            songData.songUrl = tab.url
            chrome.runtime.sendMessage(songData)
        })

    }

    document.getElementById("send").addEventListener("click", SendSongData);
})
