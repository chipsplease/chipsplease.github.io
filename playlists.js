
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
        // playlist_image.style.width = "200px";
        // playlist_image.style.height = "200px";
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
        playlist_edit_button.type = 'button';
        playlist_edit_button.className = "playlist_edit_button";
        playlist_edit_button.innerText = "Edit";
        
        playlist_edit_button.onclick = (function(index) {
            return function(event) {
                event.stopPropagation(); // Stop the event from propagating to the parent
                editPlaylist(index);
            };
        })(playlistIndex);
        
        // const playlist_remove_button = document.createElement('button');
        // playlist_remove_button.className = "playlist_remove_button";
        // playlist_remove_button.innerText = "Remove";
        // playlist_remove_button.onclick = (function(index) {
        //     return function(event) {
        //         event.stopPropagation(); // Stop the event from propagating to the parent
        //         removePlaylist(index);
        //     };
        // })(playlistIndex);
        // playlist_button_container.appendChild(playlist_remove_button);

        playlist_button_container.appendChild(playlist_edit_button);
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
var playlist2 = {title:"Late 90s Early 2000s Rock Hits",
    description:"Late 90s Early 2000s Rock Hits",
    imageUrl:"https://townsquare.media/site/366/files/2023/04/attachment-2000s-Rock-Songs-Collage.jpg?w=780&q=75",
    songs:[{title:"Numb (Official Music Video) [4K UPGRADE] – Linkin Park",youtube:"https://www.youtube.com/embed/kXYiU_JCYtU"},
    {title:"Evanescence - Bring Me To Life (Official HD Music Video)",youtube:"https://www.youtube.com/embed/3YxaaGgTQYM"},
    {title:"In The End [Official HD Music Video] - Linkin Park",youtube:"https://www.youtube.com/embed/eVTXPUF4Oz4"},
    {title:"The Verve - Bitter Sweet Symphony",youtube:"https://www.youtube.com/embed/1lyu1KKwC74"},
    {title:"System Of A Down - Chop Suey! (Official HD Video)",youtube:"https://www.youtube.com/embed/CSvFpBOe8eY"},
    {title:"Audioslave - Like a Stone (Official Video)",youtube:"https://www.youtube.com/embed/7QU1nvuxaMA"},
    {title:"Red Hot Chili Peppers - Californication (Official Music Video) [HD UPGRADE]",youtube:"https://www.youtube.com/embed/YlUKcNNmywk"},
    {title:"3 Doors Down - Here Without You (Official Music Video)",youtube:"https://www.youtube.com/embed/kPBzTxZQG5Q"},
    {title:"Bon Jovi - It's My Life (Official Music Video)",youtube:"https://www.youtube.com/embed/vx2u5uUu3DE"},
    {title:"Goo Goo Dolls – Iris [Official Music Video] [4K Remaster]",youtube:"https://www.youtube.com/embed/NdYWuo9OFAw"},
    {title:"Garth. // Good Taste (Official Visualizer)",youtube:"https://www.youtube.com/embed/EvQKzm_r_7I"},
    {title:"Eric Benét & Chanté Moore - ",youtube:"https://www.youtube.com/embed/wCSET4s7tYQ"},
    {title:"The Offspring - The Kids Aren't Alright (Official Music Video)",youtube:"https://www.youtube.com/embed/7iNbnineUCI"},
    {title:"Faint (Official Music Video) [4K UPGRADE] – Linkin Park",youtube:"https://www.youtube.com/embed/LYU-8IFcDPw"},
    {title:"The Calling - Wherever You Will Go (First Video- in Tijuana)",youtube:"https://www.youtube.com/embed/iAP9AF6DCu4"},
    {title:"Eric Carmen - Hungry Eyes (Official HD Video)",youtube:"https://www.youtube.com/embed/2ssCL292DQA"},
    {title:"Nickelback - How You Remind Me",youtube:"https://www.youtube.com/embed/1cQh1ccqu8M"},
    {title:"3 Doors Down - Kryptonite (Official Video)",youtube:"https://www.youtube.com/embed/xPU8OAjjS4k"},
    {title:"Breaking the Habit (Official Music Video) [HD UPGRADE] – Linkin Park",youtube:"https://www.youtube.com/embed/v2H4l9RpkwM"},
    {title:"Wheatus - Teenage Dirtbag (Official Video)",youtube:"https://www.youtube.com/embed/FC3y9llDXuM"},
    {title:"Three Days Grace - I Hate Everything About You (Official Video)",youtube:"https://www.youtube.com/embed/d8ekz_CSBVg"},
    {title:"Yanique - Long Way Home Ft Leeky",youtube:"https://www.youtube.com/embed/tC5DeMyzY-c"},
    {title:"FattMack  - Bad Day [Official Music Video]",youtube:"https://www.youtube.com/embed/56NNQK-MFH8"},
    {title:"Disturbed - Down With The Sickness (Official Music Video) [HD UPGRADE]",youtube:"https://www.youtube.com/embed/09LTT0xwdfw"},
    {title:"Creed - One Last Breath (Official HD Music Video)",youtube:"https://www.youtube.com/embed/qnkuBUAwfe0"},
    {title:"Alien Ant Farm - Smooth Criminal (Official Music Video)",youtube:"https://www.youtube.com/embed/CDl9ZMfj6aE"},
    {title:"Smash Mouth - All Star",youtube:"https://www.youtube.com/embed/L_jWHffIx5E"},
    {title:"Limp Bizkit - Break Stuff (Official Music Video)",youtube:"https://www.youtube.com/embed/ZpUYjpKg9KY"},
    {title:"Red Hot Chili Peppers - Scar Tissue [Official Music Video] [HD UPGRADE]",youtube:"https://www.youtube.com/embed/mzJj5-lubeM"},
    {title:"Creed - My Sacrifice",youtube:"https://www.youtube.com/embed/O-fyNgHdmLI"},
    {title:"Crazy Town - Butterfly (Official Video)",youtube:"https://www.youtube.com/embed/6FEDrU85FLE"},
    {title:"Limp Bizkit ",youtube:"https://www.youtube.com/embed/Tr8uesBowS4"},
    {title:"Bleona - Boy Gone Bad (Official Music Video)",youtube:"https://www.youtube.com/embed/h6BiiviB5cY"},
    {title:"Crawling [Official HD Music Video] - Linkin Park",youtube:"https://www.youtube.com/embed/Gd9OhYroLN0"},
    {title:"Evanescence - My Immortal (Official HD Music Video)",youtube:"https://www.youtube.com/embed/5anLPw0Efmo"},
    {title:"One Step Closer [Official HD Music Video] - Linkin Park",youtube:"https://www.youtube.com/embed/4qlCC1GOwFw"},
    {title:"Foo Fighters - Everlong (Official HD Video)",youtube:"https://www.youtube.com/embed/eBG7P-K-r1Y"},
    {title:"Aerosmith - Hole In My Soul",youtube:"https://www.youtube.com/embed/HaC0s-FP-r4"},
    {title:"Incubus - Drive",youtube:"https://www.youtube.com/embed/fgT9zGkiLig"},
    {title:"blink-182 - All The Small Things (Official Music Video)",youtube:"https://www.youtube.com/embed/9Ht5RZpzPqw"},
    {title:"The Offspring - Pretty Fly (For A White Guy) (Official Music Video)",youtube:"https://www.youtube.com/embed/QtTR-_Klcq8"},
    {title:"Avril Lavigne - Sk8er Boi (Official Video)",youtube:"https://www.youtube.com/embed/TIy3n2b7V9k"},
    {title:"Limp Bizkit - My Way",youtube:"https://www.youtube.com/embed/Dn8vzTsnPps"},
    {title:"HoodTrophy Bino - Baby (Official Music Video)",youtube:"https://www.youtube.com/embed/aDZBDuRba3o"},
    {title:"Staind - It's Been Awhile (Official Video)",youtube:"https://www.youtube.com/embed/araU0fZj6oQ"},
    {title:"Sublime - Santeria (Official Music Video)",youtube:"https://www.youtube.com/embed/AEYN5w4T_aM"},
    {title:"Jimmy Eat World - The Middle (Official Music Video)",youtube:"https://www.youtube.com/embed/oKsxPW6i3pM"},
    {title:"David Bowie - Starman [Official Lyric Video]",youtube:"https://www.youtube.com/embed/rpO1U-nEgRU"},
    {title:"Lost [Official Music Video] - Linkin Park",youtube:"https://www.youtube.com/embed/7NK_JOkuSVY"},
    {title:"Blur - Song 2 (Official Music Video)",youtube:"https://www.youtube.com/embed/SSbBvKaM6sk"}]
};
var saved_playlists = [playlist1, playlist2];
var playlists = localStorage.getItem('playlists') ? JSON.parse(localStorage.getItem('playlists')) : [];

// Check if any saved playlist is not in the playlists array then add it
saved_playlists.forEach(saved_playlist => {
    if (!playlists.some(playlist => playlist.title === saved_playlist.title)) {
        playlists.push(saved_playlist);
    }
});
localStorage.setItem('playlists', JSON.stringify(playlists));
populate_playlists(playlists);
