let currentMatch = 0;
let nextRound = [];
let totalMatches = 0;
let completedMatches = 0;
let debug_songs = [
    {
        title: 'Song 1',
        youtube: 'https://www.youtube.com/embed/1'
    },
    {
        title: 'Song 2',
        youtube: 'https://www.youtube.com/embed/2'
    },
    {
        title: 'Song 3',
        youtube: 'https://www.youtube.com/embed/3'
    },
    {
        title: 'Song 4',
        youtube: 'https://www.youtube.com/embed/4'
    },
    // {
    //     title: 'Song 5',
    //     youtube: 'https://www.youtube.com/embed/5'
    // },
    // {
    //     title: 'Song 6',
    //     youtube: 'https://www.youtube.com/embed/6'
    // }
];

function displayWinner(winner) {
    document.querySelector('.media_container').innerHTML = `
        <div class="winner_container media_item">
            <h2 class="song_title">🏆 Winner 🏆</h2>
            <iframe class="embedContainer"></iframe>
            <div class="winner_details">
                <h3>${winner.title}</h3>
                <button class="vote_button" onclick="window.location.href='index.html'">Back to Playlists</button>
            </div>
        </div>
    `;

    // Display the winner's video/song
    const winnerIframe = document.querySelector('.winner_container iframe');
    if (winner.youtube) {
        createYoutubeEmbed(winnerIframe, winner.youtube);
    } else {
        createSpotifyEmbed(winnerIframe, winner.spotify);
    }

    // Ensure completed matches equals total matches for 100% progress
    completedMatches = totalMatches;
    updateProgressBar();
}

function tournamentBracket(songs) {
    console.log("Songs: ", songs);
    if (songs.length === 1) {
        displayWinner(songs[0]);
        return songs[0];
    }

    nextRound = []; // Reset nextRound for the next round
    currentMatch = 0; // Reset currentMatch for the next round
    updateProgressBar(); 
    displayMatch(songs[currentMatch], songs[currentMatch + 1]);
}

function createYoutubeEmbed(iFrame, videoUrl) {
    iFrame.src = videoUrl
    iFrame.style.display = 'block';
    iFrame.style.width = '99%';
    iFrame.referrerPolicy = 'no-referrer-when-downgrade';
    iFrame.allow = 'autoplay; encrypted-media';
    iFrame.allowFullscreen = true;
}
function createSpotifyEmbed(iFrame, videoUrl) {
    iFrame.src = videoUrl + "?&theme=0"; 
    iFrame.style.display = 'block';
    iFrame.style.width = '99%';
    // iFrame.style.height = "352px"
    iFrame.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    iFrame.loading = "lazy"
}
function displayMatch(song1, song2) {
    let song1Iframe = document.getElementById('song1').querySelector('iframe')
    let song2Iframe = document.getElementById('song2').querySelector('iframe')
    if (song1.youtube) {
        createYoutubeEmbed(song1Iframe, song1.youtube);
    } else {
        createSpotifyEmbed(song1Iframe, song1.spotify);
    }
    if (song2.youtube) {
        createYoutubeEmbed(song2Iframe, song2.youtube);
    } else {
        createSpotifyEmbed(song2Iframe, song2.spotify);
    }
    document.getElementById('song_title1').innerText = song1.title;
    document.getElementById('song_title2').innerText = song2.title;
}
function updateProgressBar() {
    const progress = (completedMatches / totalMatches) * 100;
    document.getElementById('progress_bar').value = progress;
}

function vote(winnerIndex) {
    let winner = songs[currentMatch + winnerIndex]; 
    completedMatches++; 
    nextRound.push(winner);
    console.log("Next round: ", nextRound);

    currentMatch += 2; 
    if (currentMatch < songs.length - 1) { // Next match
        displayMatch(songs[currentMatch], songs[currentMatch + 1]);
    } else { // End of a round
        songs = nextRound; // Update songs with the winners
        tournamentBracket(songs); // Start the next round
    }
    updateProgressBar();
}

var playlist = JSON.parse(localStorage.getItem('playlist'))

// let songs = debug_songs;
let songs = playlist.songs;

document.getElementsByClassName("playlist_title")[0].innerText = playlist.title;
totalMatches = songs.length - 1;
// Check if songs data exists
if (songs) {
    tournamentBracket(songs);
} else {
    console.error('No songs data found in localStorage');
}