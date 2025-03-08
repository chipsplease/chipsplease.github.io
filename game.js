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

function tournamentBracket(songs) {
    if (songs.length === 1) { // End of the tournament
        alert(`The winner is ${songs[0].title}!`); // Display the winner
        return songs[0]; // The winner
    }

    nextRound = []; // Reset nextRound for the next round
    currentMatch = 0; // Reset currentMatch for the next round
    updateProgressBar(); 
    displayMatch(songs[currentMatch], songs[currentMatch + 1]);
}

function displayMatch(song1, song2) {
    document.getElementById('song1').querySelector('iframe').src = song1.youtube;
    document.getElementById('song2').querySelector('iframe').src = song2.youtube;
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
// I could have just had a single array with the songs and pop the loser then take next two songs. When the array has only one song left, it is the winner.
// Instead i made it harder for no reason
// I could have also used a binary tree to make it easier to keep track of the matches
