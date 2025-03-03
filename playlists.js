function editPlaylist(playlistIndex) {
    var playlists = localStorage.getItem('playlists');

    playlists = JSON.parse(playlists);
    let playlist = playlists[playlistIndex];
    localStorage.setItem('playlist', JSON.stringify(playlist));
    window.location.href = 'edit_playlist.html';
}
function startGame(playlistIndex) {
    var playlists = localStorage.getItem('playlists');
    playlists = JSON.parse(playlists);
    let playlist = playlists[playlistIndex];
    localStorage.setItem('playlist', JSON.stringify(playlist));
    window.location.href = 'game.html';
}
function removePlaylist(playlistIndex) {
    var playlists = localStorage.getItem('playlists');
    playlists = JSON.parse(playlists);
    playlists.splice(playlistIndex, 1); // Remove the element at playlistIndex
    localStorage.setItem('playlists', JSON.stringify(playlists));
    window.location.href = 'index.html';
}
function populate_playlists(playlists){
    const playlistsContainer = document.getElementsByClassName('playlists_container')[0];
    let playlistIndex = 0;
    playlists.forEach(playlist => {
        const playlistContainer = document.createElement('div');
        playlistContainer.className = "playlist_container";
        console.log("Setting playlist onclick to startGame with playlistIndex: " + playlistIndex);
        
        playlistContainer.onclick = (function(index) {
            return function() {
                startGame(index);
            };
        })(playlistIndex);
        
        const playlist_title_container = document.createElement('div');
        playlist_title_container.className = "playlist_title_container";

        const playlist_title = document.createElement('h2');
        playlist_title.innerText = playlist.title;
        playlist_title_container.appendChild(playlist_title);
        playlistContainer.appendChild(playlist_title_container);

        const playlist_image_container = document.createElement('div');
        playlist_image_container.className = "playlist_image_container";

        const playlist_image = document.createElement('img');
        playlist_image.src = playlist.imageUrl;
        playlist_image.style.width = "200px";
        playlist_image.style.height = "200px";
        playlist_image_container.appendChild(playlist_image);
        playlistContainer.appendChild(playlist_image_container);

        const playlist_description_container = document.createElement('div');
        playlist_description_container.className = "playlist_description_container";

        const playlist_description = document.createElement('h2');
        playlist_description.innerText = playlist.description;
        playlist_description_container.appendChild(playlist_description); 
        playlistContainer.appendChild(playlist_description_container);

        const playlist_songs_count = document.createElement('h2');
        playlist_songs_count.className = "playlist_songs_count";
        playlist_songs_count.innerText = "Songs: " + playlist.songs.length;
        playlistContainer.appendChild(playlist_songs_count);

        const playlist_button_container = document.createElement('div');
        playlist_button_container.className = "playlist_button_container"
        const playlist_edit_button = document.createElement('button');
        playlist_edit_button.className = "playlist_edit_button";
        playlist_edit_button.innerText = "Edit";
        
        playlist_edit_button.onclick = (function(index) {
            return function(event) {
                event.stopPropagation(); // Stop the event from propagating to the parent
                editPlaylist(index);
            };
        })(playlistIndex);
        
        const playlist_remove_button = document.createElement('button');
        playlist_remove_button.className = "playlist_remove_button";
        playlist_remove_button.innerText = "Remove";
        playlist_remove_button.onclick = (function(index) {
            return function(event) {
                event.stopPropagation(); // Stop the event from propagating to the parent
                removePlaylist(index);
            };
        })(playlistIndex);
        playlist_button_container.appendChild(playlist_edit_button);
        playlist_button_container.appendChild(playlist_remove_button);
        playlistContainer.appendChild(playlist_button_container);

        playlistsContainer.appendChild(playlistContainer);
        playlistIndex++;
    });
}
var playlists = localStorage.getItem('playlists');
if (playlists) {
    playlists = JSON.parse(playlists);
} else {
    playlists = [];
}
populate_playlists(playlists);
