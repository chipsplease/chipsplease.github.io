async function fetchPlaylistSongs(playlistId) {
    const response = await fetch(`https://astonishing-frangipane-bf712a.netlify.app/.netlify/functions/fetchPlaylist?playlistId=${playlistId}`);
    const data = await response.json();
    return data;
}
function addSong() {
    const songContainer = document.createElement('div');
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
    document.getElementById('songsContainer').appendChild(songContainer);
}

async function importSongs() {
    const input = document.getElementById('youtubePlaylistUrl').value;
    let playlistId;

    // Check if the input is a URL or just the ID
    if (input.includes('youtube.com')) {
        const urlParams = new URLSearchParams(new URL(input).search);
        playlistId = urlParams.get('list');
    } else {
        playlistId = input;
    }

    if (!playlistId) {
        alert('Please enter a valid YouTube playlist URL or ID.');
        return;
    }
    try {
        songs = await fetchPlaylistSongs(playlistId);
    } catch (error) {
        console.error('Failed to fetch playlist songs:', error);
    }
    try {
        const songs = await fetchPlaylistSongs(playlistId);
        songs.forEach(song => {
            const songContainer = document.createElement('div');
            songContainer.classList.add('song');
            songContainer.innerHTML = `
                <label for="songTitle">Song Title:</label>
                <input type="text" class="songTitle" name="songTitle" value="${song.title}" required>
                <label for="songUrl">YouTube URL:</label>
                <input type="url" class="songUrl" name="songUrl" value="${song.youtube}" required>
            `;
            document.getElementById('songsContainer').appendChild(songContainer);
        });
    } catch (error) {
        console.error('Failed to fetch playlist songs:', error);
    }
}

document.getElementById('playlistForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('playlistTitle').value;
    const description = document.getElementById('playlistDescription').value;
    const imageUrl = document.getElementById('playlistImageUrl').value;
    const songs = Array.from(document.getElementsByClassName('song')).map(song => ({
        title: song.querySelector('.songTitle').value,
        youtube: song.querySelector('.songUrl').value
    }));

    if (title === '' || description === '' || songs.length === 0) {
        alert('Please fill in all fields.');
        return;
    }
    if (songs.some(song => song.title === '' || song.youtube === '')) {
        alert('Please fill in all song titles and YouTube URLs.');
        return;
    }

    // Make sure that the length of songs is at least 2 and a power of 2
    const songsLength = songs.length;
    if (songsLength < 2 || (songsLength & (songsLength - 1)) !== 0) {
        alert('The number of songs must be at least 2 and a power of 2.');
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
});
