const songData = new Object();

document.addEventListener("DOMContentLoaded", () => {
    const SendSongData = () => {
        songData.isPopup = true
        songData.songName = document.getElementById("songName").value;

        chrome.tabs.query({active:true, currentWindow: true}, tabs=>{
            songData.songUrl = url=tabs[0].url;
            chrome.runtime.sendMessage(songData)
        })

    }

    document.getElementById("send").addEventListener("click", SendSongData);
})
