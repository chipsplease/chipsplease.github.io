// Fisher-Yates shuffle algorithm for randomizing array elements
function shuffle(array) { 
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
} 

// Shuffles songs in all playlists and updates localStorage
function shuffleAllSongs(){
    var playlists = localStorage.getItem('playlists');
    playlists = JSON.parse(playlists);
    playlists.forEach(playlist => {
        shuffle(playlist.songs);
    });
    localStorage.setItem('playlists', JSON.stringify(playlists));
}

// Navigates to edit page for selected playlist
function editPlaylist(playlistIndex) {
    var playlists = localStorage.getItem('playlists');

    playlists = JSON.parse(playlists);
    let playlist = playlists[playlistIndex];
    localStorage.setItem('playlist', JSON.stringify(playlist));
    window.location.href = 'edit_playlist.html';
}

// Starts the voting game for selected playlist
function startGame(playlistIndex) {
    var playlists = localStorage.getItem('playlists');
    playlists = JSON.parse(playlists);
    let playlist = playlists[playlistIndex];
    localStorage.setItem('playlist', JSON.stringify(playlist));
    window.location.href = 'game.html';
}

function removePlaylist(playlistIndex) {
    const dialog = document.createElement('div');
    dialog.className = 'confirm_dialog';
    dialog.innerHTML = `
        <p>Are you sure you want to remove this playlist?</p>
        <div class="dialog_buttons">
            <button class="dialog_cancel">No</button>
            <button class="dialog_confirm">Yes</button>
        </div>
    `;
    document.body.appendChild(dialog);
    
    // Show dialog
    setTimeout(() => dialog.classList.add('active'), 10);
    
    // Handle button clicks
    dialog.querySelector('.dialog_confirm').onclick = function() {
        var playlists = JSON.parse(localStorage.getItem('playlists'));
        playlists.splice(playlistIndex, 1);
        localStorage.setItem('playlists', JSON.stringify(playlists));
        
        // Refresh the page to show updated playlists
        location.reload();
    };
    
    dialog.querySelector('.dialog_cancel').onclick = function() {
        dialog.remove();
    };
}

// Dynamically creates and populates playlist cards in the UI
function populate_playlists(playlists){
    const playlistsContainer = document.getElementsByClassName('playlists_container')[0];
    let playlistIndex = 0;
    playlists.forEach(playlist => {
        // Create main container for playlist card
        const playlistContainer = document.createElement('div');
        playlistContainer.className = "playlist_container";
        
        // Create and add image section with play button
        const playlist_image_container = document.createElement('div');
        playlist_image_container.className = "playlist_image_container";

        const playlist_image = document.createElement('img');
        playlist_image.src = playlist.imageUrl;
        playlist_image_container.appendChild(playlist_image);

        // Add play button inside image container
        const playButton = document.createElement('div');
        playButton.className = "play_button";
        playButton.onclick = (function(index) {
            return function(event) {
                event.stopPropagation();
                startGame(index);
            };
        })(playlistIndex);
        playlist_image_container.appendChild(playButton);
        
        playlistContainer.appendChild(playlist_image_container);

        // Create and add title section
        const playlist_title_container = document.createElement('div');
        playlist_title_container.className = "playlist_title_container";

        const playlist_title = document.createElement('h2');
        playlist_title.innerText = playlist.title;
        playlist_title_container.appendChild(playlist_title);
        playlistContainer.appendChild(playlist_title_container);

        // Create and add description section
        const playlist_description_container = document.createElement('div');
        playlist_description_container.className = "playlist_description_container";

        const playlist_description = document.createElement('h2');
        playlist_description.innerText = playlist.description;
        playlist_description_container.appendChild(playlist_description); 
        playlistContainer.appendChild(playlist_description_container);

        // Add song count display
        const playlist_songs_count = document.createElement('h2');
        playlist_songs_count.className = "playlist_songs_count";
        playlist_songs_count.innerText = "Songs: " + playlist.songs.length;
        playlistContainer.appendChild(playlist_songs_count);

        // Create and add edit button
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
        
        const playlist_remove_button = document.createElement('button');
        playlist_remove_button.className = "playlist_remove_button";
        playlist_remove_button.innerText = "Remove";
        playlist_remove_button.onclick = (function(index) {
            return function(event) {
                event.stopPropagation();
                removePlaylist(index);
            };
        })(playlistIndex);
        playlist_button_container.appendChild(playlist_remove_button);

        playlist_button_container.appendChild(playlist_edit_button);
        playlistContainer.appendChild(playlist_button_container);

        playlistsContainer.appendChild(playlistContainer);
        playlistIndex++;
    });
}

// Predefined playlist data
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
var playlist2 = {
    title:"Late 90s Early 2000s Rock Hits",
    description:"Late 90s Early 2000s Rock Hits",
    imageUrl:"images/playlist2.webp",
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

var playlist3 = 
    {title:"Best 2000s Pop Hits - Greatest Pop Songs",
    description:"Best 2000s Pop Hits - Greatest Pop Songs from The 2000’s",
    imageUrl:"images/playlist3.webp",
    songs:[{title:"Lady Gaga - Poker Face (Official Music Video)",youtube:"https://www.youtube.com/embed/bESGLojNYSo"},
    {title:"Shakira - Hips Don't Lie (Official 4K Video) ft. Wyclef Jean",youtube:"https://www.youtube.com/embed/DUT5rEU6pqM"},
    {title:"Timbaland - Apologize ft. OneRepublic",youtube:"https://www.youtube.com/embed/ZSM3w1v-A_Y"},
    {title:"Lady Gaga - Bad Romance (Official Music Video)",youtube:"https://www.youtube.com/embed/qrO4YZeyl0I"},
    {title:"Céline Dion - I'm Alive (Official HD Video)",youtube:"https://www.youtube.com/embed/NJsa6-y4sDs"},
    {title:"The Black Eyed Peas - I Gotta Feeling (Official Music Video)",youtube:"https://www.youtube.com/embed/uSD4vsh1zDA"},
    {title:"Katy Perry - Hot N Cold (Official Music Video)",youtube:"https://www.youtube.com/embed/kTHNpusq654"},
    {title:"Miley Cyrus - Party In The U.S.A. (Official Video)",youtube:"https://www.youtube.com/embed/M11SvDtPBhA"},
    {title:"Coldplay - Viva La Vida (Official Video)",youtube:"https://www.youtube.com/embed/dvgZkm1xWPE"},
    {title:"Nelly Furtado - Promiscuous (Official Music Video) ft. Timbaland",youtube:"https://www.youtube.com/embed/0J3vgcE5i2o"},
    {title:"HoodTrophy Bino - Baby (Official Music Video)",youtube:"https://www.youtube.com/embed/aDZBDuRba3o"},
    {title:"Jason Mraz - I'm Yours (Official Video) [4K Remaster]",youtube:"https://www.youtube.com/embed/EkHTsc9PU2A"},
    {title:"James Blunt - You're Beautiful (Official Music Video) [4K]",youtube:"https://www.youtube.com/embed/oofSnsGkops"},
    {title:"Backstreet Boys - Shape Of My Heart (Official HD Video)",youtube:"https://www.youtube.com/embed/OT5msu-dap8"},
    {title:"Madonna - Hung Up (Official Video) [HD]",youtube:"https://www.youtube.com/embed/EDwb9jOVRtU"},
    {title:"Britney Spears - Toxic (Official HD Video)",youtube:"https://www.youtube.com/embed/LOZuxwVk7TU"},
    {title:"The Script - The Man Who Can’t Be Moved (Official Video)",youtube:"https://www.youtube.com/embed/gS9o1FAszdk"},
    {title:"Maroon 5 - She Will Be Loved (Official Music Video)",youtube:"https://www.youtube.com/embed/nIjVuRTm-dc"},
    {title:"Lady Gaga - Just Dance (Official Music Video) ft. Colby O'Donis",youtube:"https://www.youtube.com/embed/2Abk1jAONjw"},
    {title:"Shakira - Whenever, Wherever (Official HD Video)",youtube:"https://www.youtube.com/embed/weRHyjj34ZE"},
    {title:"Vanessa Carlton - A Thousand Miles",youtube:"https://www.youtube.com/embed/Cwkej79U3ek"},
    {title:"Dax - i hate that i love you (Official Music Video)",youtube:"https://www.youtube.com/embed/yKMrdBDb80w"},
    {title:"Enrique Iglesias - Hero",youtube:"https://www.youtube.com/embed/koJlIGDImiU"},
    {title:"Kelly Clarkson - Because Of You (VIDEO)",youtube:"https://www.youtube.com/embed/Ra-Om7UMSJc"},
    {title:"Robbie Williams - Feel",youtube:"https://www.youtube.com/embed/iy4mXZN1Zzk"},
    {title:"Keane - Everybody's Changing (Alternate Version)",youtube:"https://www.youtube.com/embed/Zx4Hjq6KwO0"},
    {title:"Dido - White Flag (Official Video)",youtube:"https://www.youtube.com/embed/j-fWDrZSiZs"},
    {title:"Fergie - Big Girls Don't Cry (Personal) (Official Music Video)",youtube:"https://www.youtube.com/embed/agrXgrAgQ0U"},
    {title:"Britney Spears - Oops!...I Did It Again (Official HD Video)",youtube:"https://www.youtube.com/embed/CduA0TULnow"},
    {title:"Coldplay - Clocks (Official Video)",youtube:"https://www.youtube.com/embed/d020hcWA_Wg"},
    {title:"Westlife - My Love (Official Video)",youtube:"https://www.youtube.com/embed/ulOb9gIGGd0"},
    {title:"MIRA - Love Again (Lyric Video)",youtube:"https://www.youtube.com/embed/L9C9WiBBeRk"},
    {title:"Ke$ha - TiK ToK (Official HD Video)",youtube:"https://www.youtube.com/embed/iP6XpLQM2Cs"},
    {title:"Justin Bieber - One Time (Official Music Video)",youtube:"https://www.youtube.com/embed/CHVhwcOg6y8"},
    {title:"Backstreet Boys - Drowning (Official HD Video)",youtube:"https://www.youtube.com/embed/GZXHBgjQjNM"},
    {title:"Justin Bieber - Favorite Girl (Lyrics)",youtube:"https://www.youtube.com/embed/0SC_y5X0V_I"},
    {title:"Empire Of The Sun - We Are The People (Official Music Video)",youtube:"https://www.youtube.com/embed/hN5X4kGhAtU"},
    {title:"Paparazzi",youtube:"https://www.youtube.com/embed/qqpUYOAEmxE"},
    {title:"Marc Anthony - You Sang To Me (Video)",youtube:"https://www.youtube.com/embed/MY4YJxn-9Og"},
    {title:"Whitney Houston with Enrique Iglesias - Could I Have This Kiss Forever (Official HD Video)",youtube:"https://www.youtube.com/embed/zsfj9j0kjoU"},
    {title:"Leona Lewis - Bleeding Love (US Version - Official 4K Video)",youtube:"https://www.youtube.com/embed/-FPOrTU8_hM"},
    {title:"TOESUP, Smiley - Two Feet (Official Visualizer)",youtube:"https://www.youtube.com/embed/AqBwSkn5n18"},
    {title:"MIKA - Relax, Take It Easy",youtube:"https://www.youtube.com/embed/RVmG_d3HKBA"},
    {title:"Taio Cruz - Break Your Heart (Official Video) ft. Ludacris",youtube:"https://www.youtube.com/embed/y_SI2EDM6Lo"},
    {title:"Jordin Sparks - Tattoo",youtube:"https://www.youtube.com/embed/T4E1s0g3ZMw"},
    {title:"Westlife - I Lay My Love on You (Official Video)",youtube:"https://www.youtube.com/embed/ZnOAK04tJhc"},
    {title:"Natasha Bedingfield - Unwritten (Official Video) (as featured in Anyone But You)",youtube:"https://www.youtube.com/embed/b7k0a5hYnSI"},
    {title:"Britney Spears - Womanizer (Director's Cut) (Official HD Video)",youtube:"https://www.youtube.com/embed/rMqayQ-U74s"},
    {title:"The Pussycat Dolls - Hush Hush; Hush Hush (Official Music Video)",youtube:"https://www.youtube.com/embed/3BBsF7VIQyo"},
    {title:"Rihanna - Disturbia",youtube:"https://www.youtube.com/embed/E1mU6h4Xdxc"}]
};

var playlist4 = {
    title:"pepeJAM",
    description:"pepeJAM",
    imageUrl:"https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da849e3b313d57e0e8d6e3bbfe54",
    songs:[{title:"Top Gun","spotify":"https://open.spotify.com/embed/track/5MFaZQtRd4iJYP7X9667sv"},
    {title:"Voodoo People (Pendulum Mix)","spotify":"https://open.spotify.com/embed/track/6dL7YebdUbJKGIbFLmRWvM"},
    {title:"On My Own","spotify":"https://open.spotify.com/embed/track/5UNmYrMMMHROlOMHIRikgZ"},
    {title:"2127","spotify":"https://open.spotify.com/embed/track/1EotA9qUyMnBqRjXorDwVd"},
    {title:"Wake Up for the Night (feat. Caroline Pennell)","spotify":"https://open.spotify.com/embed/track/17xHgUMpdt437NO8Y8P2Pq"},
    {title:"The Oasis (Zyrus 7 Remix) - Original Mix","spotify":"https://open.spotify.com/embed/track/4b7linw8vhDRiIvxML8k8W"},
    {title:"Pon de Replay","spotify":"https://open.spotify.com/embed/track/3DsjHcLYMExprXJECT4QQP"},
    {title:"Beautiful Lies","spotify":"https://open.spotify.com/embed/track/0uryR2h5CovP64xlud4DGZ"},
    {title:"Colour The Past","spotify":"https://open.spotify.com/embed/track/1Ew5Le4ktNyrAHCBUNkmBu"},
    {title:"Like The Sun","spotify":"https://open.spotify.com/embed/track/6bsmYFwAy2Y8e5fkzOLPLR"},
    {title:"Sun & Moon (feat. Richard Bedford) - Club Mix","spotify":"https://open.spotify.com/embed/track/6cyeHC9L8X8i5KCYVFuovJ"},
    {title:"Sleep Tight Anna (Let's Just Leave Cut)","spotify":"https://open.spotify.com/embed/track/6YoAkbFiCNUdHOLywIs6Z7"},
    {title:"Girl With Flower","spotify":"https://open.spotify.com/embed/track/02PBAr6Mz7e7uZQibdCxAB"},
    {title:"Forever","spotify":"https://open.spotify.com/embed/track/432QNdBXBTQhtuUhO3pjiT"},
    {title:"Time","spotify":"https://open.spotify.com/embed/track/3LWFUDiCzFAxcHl2bac0Uv"},
    {title:"Take a Deep Breath","spotify":"https://open.spotify.com/embed/track/2qD3Evq33ECjFMyiy0NtyG"},
    {title:"Funky Baba","spotify":"https://open.spotify.com/embed/track/3jE6v5CyAYZ7IJ5HcYjOd8"},
    {title:"Keleno","spotify":"https://open.spotify.com/embed/track/3167iOe6WMN5VgukbH8EXw"},
    {title:"Serendipity","spotify":"https://open.spotify.com/embed/track/3Z0D3mVsloprY1eiuHdeXL"},
    {title:"Violin 2.0","spotify":"https://open.spotify.com/embed/track/5JpKP0Nf8FgQvu7exw4a7C"},
    {title:"The Twenty Five (Official Nature One Anthem 2019)","spotify":"https://open.spotify.com/embed/track/4a9DD73M93HLGGhSHiIUL1"},
    {title:"The Upside","spotify":"https://open.spotify.com/embed/track/3pANNQr3ikUVDnKHsrn0TG"},
    {title:"Pleasure and Pain","spotify":"https://open.spotify.com/embed/track/14g84D56Zs9C8el70QrKib"},
    {title:"Strangers Do","spotify":"https://open.spotify.com/embed/track/1t0fCdnq92RNlad0C5XPkG"},
    {title:"Abandon","spotify":"https://open.spotify.com/embed/track/74KXXWu3w6dPQFWVF6cvrD"},
    {title:"Flipping Switches - Twodelic Remix","spotify":"https://open.spotify.com/embed/track/7zOJ4F5wMEgtQ4rczbURhl"},
    {title:"Be Focused","spotify":"https://open.spotify.com/embed/track/7GXeN4Kb8jOE4L7UNJym4Y"},
    {title:"Jamming","spotify":"https://open.spotify.com/embed/track/4xT2AOtQPjtyQgPmnygsx4"},
    {title:"Gopher Mambo","spotify":"https://open.spotify.com/embed/track/25G3DUBDmLK44e5wF0W4bl"},
    {title:"Magenta","spotify":"https://open.spotify.com/embed/track/6DYgVv7oh1bx7ilwtXpEjD"},
    {title:"Sorry","spotify":"https://open.spotify.com/embed/track/55whbebR4olz2HHcRQa2kx"},
    {title:"Smooth","spotify":"https://open.spotify.com/embed/track/1L6vtkHvjKWBIym93FmSPP"},
    {title:"Disowned","spotify":"https://open.spotify.com/embed/track/7guCv8opv4IrVdgTctlr98"},
    {title:"Taj","spotify":"https://open.spotify.com/embed/track/400QEuv1HXJcm7gGSya4fn"},
    {title:"Into the Fire","spotify":"https://open.spotify.com/embed/track/1jp3UxDy8bEfNVUdAy1Acl"},
    {title:"Love Is Lost","spotify":"https://open.spotify.com/embed/track/5d811y2awAILGqFglo5Hj2"},
    {title:"Around the World (La La La La La) - Radio Version","spotify":"https://open.spotify.com/embed/track/0IbTukfZdB91gclEXUQZkH"},
    {title:"Out of Touch - Single Version","spotify":"https://open.spotify.com/embed/track/169oHBed4Nj1Q073yu9bFB"},
    {title:"Roadrunner","spotify":"https://open.spotify.com/embed/track/78VziAIFfOUy9nuvgWaq0s"},
    {title:"Continuum","spotify":"https://open.spotify.com/embed/track/2wllg9NVjD8dkhoS8urCGq"},
    {title:"La Guitarra","spotify":"https://open.spotify.com/embed/track/615tSlJBUnubOj4jX9EZYa"},
    {title:"Fandango","spotify":"https://open.spotify.com/embed/track/3xzJBv06yWSKC5sOCPTsyw"},
    {title:"Tri Poloski","spotify":"https://open.spotify.com/embed/track/1mNSomylino1Hoaw3MzCC8"},
    {title:"Go Fuck Yourself","spotify":"https://open.spotify.com/embed/track/3VAeTjREoKPY1exOXR4oBm"}
    ]
};

var saved_playlists = [playlist1, playlist2, playlist3, playlist4];
var playlists = localStorage.getItem('playlists') ? JSON.parse(localStorage.getItem('playlists')) : [];

// Merge any missing default playlists into current playlists
saved_playlists.forEach(saved_playlist => {
    if (!playlists.some(playlist => playlist.title === saved_playlist.title)) {
        playlists.push(saved_playlist);
    }
});

// Save updated playlists and render the UI
localStorage.setItem('playlists', JSON.stringify(playlists));
populate_playlists(playlists);