var playlists = localStorage.getItem('playlists');
if (playlists) {
    playlists = JSON.parse(playlists);
}
function getRandomColor() {
    const darkThemeColors = [
        'rgba(187, 134, 252, 0.5)', 'rgba(55, 0, 179, 0.5)', 'rgba(3, 218, 198, 0.5)', 
        'rgba(207, 102, 121, 0.5)', 'rgba(3, 169, 244, 0.5)', 'rgba(76, 175, 80, 0.5)', 
        'rgba(255, 152, 0, 0.5)', 'rgba(255, 87, 34, 0.5)'
    ];
    return darkThemeColors[Math.floor(Math.random() * darkThemeColors.length)];
}
function populate_playlists(playlists){
    const playlistsContainer = document.getElementsByClassName('playlists_container')[0];
    let playlistIndex = 0;
    playlists.forEach(playlist => {
        const playlistContainer = document.createElement('div');
        playlistContainer.className = "playlist_container";
        playlistContainer.style.backgroundColor = getRandomColor(); // Set random background color
        console.log("Setting playlist onclick to startGame with playlistIndex: " + playlistIndex);
        (function(index) {
            playlistContainer.onclick = function() {
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

        playlistsContainer.appendChild(playlistContainer);
        playlistIndex++;
    });
}
populate_playlists(playlists);
