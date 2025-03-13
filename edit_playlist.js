document.getElementById('playlistForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('playlistTitle').value;
    const description = document.getElementById('playlistDescription').value;
    const imageUrl = document.getElementById('playlistImageUrl').value;
    // const songs = Array.from(document.getElementsByClassName('song')).map(song => ({
    //     title: song.querySelector('.songTitle').value,
    //     youtube: song.querySelector('.songUrl').value
    // }));
    const songs = [];
    document.querySelectorAll('.song').forEach(song => {
        const title = song.querySelector('.songTitle').value;
        const youtubeOrSpotify = song.querySelector('.songUrl').value;
        if (youtubeOrSpotify.includes('youtube.com') || youtubeOrSpotify.includes('spotify.com')) {
            if (youtubeOrSpotify.includes('youtube.com')) {
                const urlParams = new URLSearchParams(new URL(youtubeOrSpotify).search);
                const videoId = urlParams.get('v');
                const youtube = `https://www.youtube.com/embed/${videoId}`;
                songs.push({ title, youtube });
            }
            else if (youtubeOrSpotify.includes('spotify.com')) {
                const trackId = youtubeOrSpotify.split('/track/')[1];
                const spotify = `https://open.spotify.com/embed/track/${trackId}`;
                songs.push({ title, spotify });
            }
        }
    });

    if (title === '' || description === '' || songs.length === 0) {
        alert('Please fill in all fields.');
        return;
    }
    if (songs.some(song => song.title === '' || song.youtube === '' || song.spotify === '')) {
        alert('Please fill in all song titles and YouTube/Spotify URLs.');
        return;
    }

    const songsLength = songs.length;
    if (songsLength < 2 || songsLength % 2 !== 0) {
        alert('The number of songs must be at least 2 and an even number.');
        return;
    }

    const playlist = { title, description, imageUrl, songs };
    // Get the playlists from localStorage
    let playlists = localStorage.getItem('playlists');
    if (playlists) {
        playlists = JSON.parse(playlists);
    } else {
        playlists = [];
    }
    playlists.push(playlist);
    localStorage.setItem('playlists', JSON.stringify(playlists));
    // Redirect to the playlists page
    window.location.href = 'index.html';
});
function addSong() {
    const songContainer = document.createElement('div');
    const removeButton = document.createElement('button');
    removeButton.innerHTML = 'Remove Song';
    removeButton.classList.add('removeSong');
    removeButton.onclick = function() {
        songContainer.remove();
    }
    let songTitle = document.getElementsByClassName('songTitleInput')[0]
    let songUrl = document.getElementsByClassName('songUrlInput')[0]
    songTitleString = songTitle.value
    songUrlString = songUrl.value
    if (songTitleString === '' || songUrlString === '') {
        return;
    }
    songContainer.classList.add('song');
    songContainer.innerHTML = `
    <label for="songTitle">Song Title:</label>
    <input type="text" class="songTitle" name="songTitle" value=${songTitleString} required>
    <label for="songUrl">YouTube URL:</label>
    <input type="url" class="songUrl" name="songUrl" value=${songUrlString} required>
    `;
    songTitle.value = ''
    songUrl.value = ''
    songContainer.appendChild(removeButton);
    
    document.getElementById('songsContainer').appendChild(songContainer);
}
function populate_playlist(){
    var playlist = localStorage.getItem('playlist');
    if (playlist) {
        playlist = JSON.parse(playlist);
    } else {
        playlist = [];
    }
    document.getElementById('playlistTitle').value = playlist.title;
    document.getElementById('playlistDescription').value = playlist.description;
    document.getElementById('playlistImageUrl').value = playlist.imageUrl;

    playlist.songs.forEach(song => {
        const songContainer = document.createElement('div');
        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.id = 'removeSong';
        removeButton.innerHTML = 'Remove Song';
        removeButton.classList.add('removeSong');
        removeButton.onclick = function() {
            songContainer.remove();
        }
        songContainer.classList.add('song');
        if(song.youtube != undefined){
            songContainer.innerHTML = `
            <label for="songTitle">Song Title:</label>
            <input type="text" class="songTitle" name="songTitle" value="${song.title}" required>
            <label for="songUrl">YouTube URL:</label>
            <input type="url" class="songUrl" name="songUrl" value="${song.youtube}" required>
            `;
        }
        else if (song.spotify != undefined){
            songContainer.innerHTML = `
            <label for="songTitle">Song Title:</label>
            <input type="text" class="songTitle" name="songTitle" value="${song.title}" required>
            <label for="songUrl">Spotify URL:</label>
            <input type="url" class="songUrl" name="songUrl" value="${song.spotify}" required>
            `;
        }
        songContainer.appendChild(removeButton);
        document.getElementById('songsContainer').appendChild(songContainer);
    });
}
populate_playlist();


document.getElementById("export_playlist").addEventListener("click", function() {
    var playlist = localStorage.getItem('playlist');
    if (playlist) {
        playlist = JSON.parse(playlist);
    } else {
        return [];
    }
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(playlist));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "playlist.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
});
document.getElementById("delete_playlist").addEventListener("click", function() {
    var playlist = localStorage.getItem('playlist');
    if (playlist) {
        playlist = JSON.parse(playlist);
    } else {
        return [];
    }
    let playlists = localStorage.getItem('playlists');
    if (playlists) {
        playlists = JSON.parse(playlists);
        playlists = playlists.filter(p => p.title !== playlist.title);
    } else {
        playlists = [];
    }
    localStorage.setItem('playlists', JSON.stringify(playlists));
    window.location.href = 'index.html';
});