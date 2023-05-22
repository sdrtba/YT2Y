const popupRequest = new Object();

document.addEventListener("DOMContentLoaded", () => {
    const main = () => {
        popupRequest.song_name = document.getElementById("song_name").value;
        popupRequest.artist_name = document.getElementById("artist_name").value;

        chrome.runtime.sendMessage(popupRequest) // {song_name: '', artist_name: ''}
    }

    document.getElementById("send").addEventListener("click", main);
})
