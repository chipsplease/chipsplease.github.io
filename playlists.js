
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

var playlist1 = {
    title: "The Top 100: UK Number 1's of the 80's",
    description: "The greatest songs that topped the UK Charts in the 1980's. All the best number ones from 1980 - 1989.",
    imageUrl :"images/playlist1.jpg",
    songs: [
        {title:"Culture Club - Karma Chameleon (Official Music Video)",youtube:"https://www.youtube.com/embed/JmcA9LIIXWw"},
        {title:"Whitney Houston - I Wanna Dance With Somebody (Official 4K Video)",youtube:"https://www.youtube.com/embed/eH3giaIzONA"},
        {title:"The Human League - Don't You Want Me (Official Music Video)",youtube:"https://www.youtube.com/embed/uPudE8nDog0"},
        {title:"Rick Astley - Never Gonna Give You Up (Official Music Video)",youtube:"https://www.youtube.com/embed/dQw4w9WgXcQ"},
        {title:"Soft Cell - Tainted Love (Official Music Video)",youtube:"https://www.youtube.com/embed/XZVpR3Pk-r8"},
        {title:"Madonna - Like A Prayer (Official Video)",youtube:"https://www.youtube.com/embed/79fzeNUqQbQ"},
        {title:"Bonnie Tyler - Total Eclipse of the Heart (Turn Around) (Official Video)",youtube:"https://www.youtube.com/embed/lcOxhH8N3Bo"},
        {title:"The Police - Every Breath You Take (Official Music Video)",youtube:"https://www.youtube.com/embed/OMOGaugKpzs"},
        {title:"Blondie - Call me",youtube:"https://www.youtube.com/embed/StKVS0eI85I"},
        {title:"Come On Eileen",youtube:"https://www.youtube.com/embed/GbpnAGajyMc"},
        {title:"Michael Jackson - Billie Jean (Official Video)",youtube:"https://www.youtube.com/embed/Zi_XLOBDo_Y"},
        {title:"Billy Joel - Uptown Girl (Official Video)",youtube:"https://www.youtube.com/embed/hCuMWrfXG4E"},
        {title:"Madonna - Into The Groove (Official Video)",youtube:"https://www.youtube.com/embed/52iW3lcpK5M"},
        {title:"George Michael - Careless Whisper (Official Video)",youtube:"https://www.youtube.com/embed/izGwDsrQ1eQ"},
        {title:"a-ha - The Sun Always Shines on T.V. (Official Video)",youtube:"https://www.youtube.com/embed/a3ir9HC9vYg"},
        {title:"Tiffany - I Think We're Alone Now (Official Music Video)",youtube:"https://www.youtube.com/embed/w6Q3mHyzn78"},
        {title:"Men At Work - Down Under (Official HD Video)",youtube:"https://www.youtube.com/embed/XfR9iY5y94s"},
        {title:"David Bowie - Let's Dance (Official Video)",youtube:"https://www.youtube.com/embed/VbD_kBJc_gI"},
        {title:"Queen - Under Pressure (Official Video)",youtube:"https://www.youtube.com/embed/a01QQZyl-_I"},
        {title:"Spandau Ballet - True (HD Remastered)",youtube:"https://www.youtube.com/embed/AR8D2yqgQ1U"},
        {title:"The Police - Every Little Thing She Does Is Magic (Official Music Video)",youtube:"https://www.youtube.com/embed/aENX1Sf3fgQ"},
        {title:"Pet Shop Boys - West End Girls (Official Video) [HD REMASTERED]",youtube:"https://www.youtube.com/embed/p3j2NYZ8FKs"},
        {title:"Wham! - Wake Me Up Before You Go-Go (Official Video)",youtube:"https://www.youtube.com/embed/pIgZ7gMze7A"},
        {title:"UB40 - Red Red Wine (Official Video HD Remastered)",youtube:"https://www.youtube.com/embed/zXt56MB-3vc"},
        {title:"Dead Or Alive - You Spin Me Round (Like A Record) [Official 4K Video]",youtube:"https://www.youtube.com/embed/fpmTe3TDdVU"},
        {title:"Duran Duran - The Reflex (Official Music Video)",youtube:"https://www.youtube.com/embed/J5ebkj9x5Ko"},
        {title:"Madonna - Papa Don't Preach (Official Video) [HD]",youtube:"https://www.youtube.com/embed/G333Is7VPOg"},
        {title:"Culture Club - Do You Really Want To Hurt Me",youtube:"https://www.youtube.com/embed/2nXGPZaTKik"},
        {title:"Madness - House of Fun (Official 4K Video)",youtube:"https://www.youtube.com/embed/GJ2X9SANsME"},
        {title:"David Bowie - Ashes To Ashes (Official Video)",youtube:"https://www.youtube.com/embed/HyMm4rJemtI"},
        {title:"Blondie - Atomic (Official Music Video)",youtube:"https://www.youtube.com/embed/O_WLw_0DFQQ"},
        {title:"The Communards - Don't Leave Me This Way (with Sarah Jane Morris) [Official Video]",youtube:"https://www.youtube.com/embed/1RHBAd5YUR8"},
        {title:"Survivor - Eye Of The Tiger (Official HD Video)",youtube:"https://www.youtube.com/embed/btPJPFnesV4"},
        {title:"Europe - The Final Countdown (Official Video)",youtube:"https://www.youtube.com/embed/9jK-NcRmVcw"},
        {title:"Wham! - I'm Your Man (Official Video)",youtube:"https://www.youtube.com/embed/6W0d9xMhZbo"},
        {title:"Berlin - Take My Breath Away (Official Video - Top Gun)",youtube:"https://www.youtube.com/embed/Bx51eegLTY8"},
        {title:"The Bangles - Eternal Flame (Official Video)",youtube:"https://www.youtube.com/embed/PSoOFn3wQV4"},
        {title:"There Must Be An Angel (Playing With My Heart) (Remastered)",youtube:"https://www.youtube.com/embed/RCdneDxFRYQ"},
        {title:"Starship - Nothing's Gonna Stop Us Now (Official Music Video) [HD]",youtube:"https://www.youtube.com/embed/3wxyN3z9PL4"},
        {title:"Madonna - La Isla Bonita (Official Video)",youtube:"https://www.youtube.com/embed/zpzdgmqIHOQ"},
        {title:"Deleted video",youtube:"https://www.youtube.com/embed/P-WP6POdTgY"},
        {title:"Billy Ocean - When the Going Gets Tough, the Tough Get Going (Official Video)",youtube:"https://www.youtube.com/embed/-n3sUWR4FV4"},
        {title:"Yazz - The Only Way Is Up (Official Music Video)",youtube:"https://www.youtube.com/embed/vjD3EVC1-zU"},
        {title:"Adam & The Ants - Stand And Deliver (Video)",youtube:"https://www.youtube.com/embed/4B2a6l6wM2k"},
        {title:"Lisa Stansfield - All Around the World",youtube:"https://www.youtube.com/embed/JVuuatjHGnY"},
        {title:"Chaka Khan - I Feel for You (Official Music Video) [HD Remaster]",youtube:"https://www.youtube.com/embed/YW0sxgYAmLM"},
        {title:"Phil Collins - A Groovy Kind Of Love (Official Music Video)",youtube:"https://www.youtube.com/embed/HsC_SARyPzk"},
        {title:"Kylie Minogue & Jason Donovan - Especially For You",youtube:"https://www.youtube.com/embed/aGuNsiSZ9RI"},
        {title:"UB40 Featuring Chrissie Hynde - I Got You Babe (Official Music Video)",youtube:"https://www.youtube.com/embed/2aP4GaAruws"},
        {title:"ABBA - The Winner Takes It All",youtube:"https://www.youtube.com/embed/92cwKCU8Z5c"}
    ]
    
};

var saved_playlists = [playlist1];
var playlists = localStorage.getItem('playlists') ? JSON.parse(localStorage.getItem('playlists')) : [];

// Check if any saved playlist is not in the playlists array then add it
saved_playlists.forEach(saved_playlist => {
    if (!playlists.some(playlist => playlist.title === saved_playlist.title)) {
        playlists.push(saved_playlist);
    }
});
localStorage.setItem('playlists', JSON.stringify(playlists));
populate_playlists(playlists);
