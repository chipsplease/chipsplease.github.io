async function fetchPlaylistSongs(playlistId) {
    const response = await fetch(`https://astonishing-frangipane-bf712a.netlify.app/.netlify/functions/fetchPlaylist?playlistId=${playlistId}`);
    const data = await response.json();
    return data;
}
async function fetchSpotifyPlaylistSongs(playlistId) {
    const response = await fetch(`https://astonishing-frangipane-bf712a.netlify.app/.netlify/functions/fetchSpotifyPlaylist?playlistId=${playlistId}`);
    const data = await response.json();
    return data;
}

async function importPlaylistSongs() {
    const input = document.getElementById('playlistUrl').value;
    let playlistId;
    let platform;

    if (input.includes('youtube.com')) {
        const urlParams = new URLSearchParams(new URL(input).search);
        playlistId = urlParams.get('list');
        platform = 'youtube';
    } else if (input.includes('spotify.com')) {
        const urlParts = input.split('/');
        playlistId = urlParts[urlParts.length - 1].split('?')[0];
        platform = 'spotify';
    } else {
        alert('Please enter a valid YouTube or Spotify playlist URL.');
        return;
    }

    if (!playlistId) {
        alert('Please enter a valid playlist URL.');
        return;
    }

    try {
        let songs;
        if (platform === 'youtube') {
            songs = await fetchPlaylistSongs(playlistId);
        } else if (platform === 'spotify') {
            songs = await fetchSpotifyPlaylistSongs(playlistId);
        }

        songs.forEach(song => {
            const songContainer = document.createElement('div');
            songContainer.classList.add('song');
            songContainer.innerHTML = `
                <label for="songTitle">Song Title:</label>
                <input type="text" class="songTitle" name="songTitle" value="${song.title}" required>
                <label for="songUrl">YouTube Or Spotify Embed URL:</label>
                <input type="url" class="songUrl" name="songUrl" value="${song.youtube || song.spotify}" required>
            `;
            document.getElementById('songsContainer').appendChild(songContainer);
        });
    } catch (error) {
        console.error('Failed to fetch playlist songs:', error);
    }
}

document.getElementById('importPlaylistButton').addEventListener('click', importPlaylistSongs)

function addSong() {
    const songContainer = document.createElement('div');
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.innerHTML = 'Remove Song';
    removeButton.id = 'removeSong';
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
    <label for="songUrl">YouTube Or Spotify Embed URL:</label>
    <input type="url" class="songUrl" name="songUrl" value=${songUrlString} required>
    `;
    songTitle.value = ''
    songUrl.value = ''
    songContainer.appendChild(removeButton);
    
    document.getElementById('songsContainer').appendChild(songContainer);
}


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
        alert('Please fill in all song titles and YouTube URLs.');
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

