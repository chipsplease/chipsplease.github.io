let currentMatch = 0;
let nextRound = [];
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
    {
        title: 'Song 5',
        youtube: 'https://www.youtube.com/embed/5'
    },
    {
        title: 'Song 6',
        youtube: 'https://www.youtube.com/embed/6'
    }
];

function tournamentBracket(songs) {
    if (songs.length === 1) {
        alert(`The winner is ${songs[0].title}!`); // Display the winner
        return songs[0]; // The winner
    }

    nextRound = [];
    currentMatch = 0;
    displayMatch(songs[currentMatch], songs[currentMatch + 1]);
}

function displayMatch(song1, song2) {
    document.getElementById('song1').querySelector('iframe').src = song1.youtube;
    document.getElementById('song2').querySelector('iframe').src = song2.youtube;
    document.getElementById('song1').querySelector('button').innerText = `Vote for ${song1.title}`;
    document.getElementById('song2').querySelector('button').innerText = `Vote for ${song2.title}`;
}

function vote(winnerIndex) {
    let winner = songs[currentMatch + winnerIndex];
    nextRound.push(winner);

    currentMatch += 2;
    if (currentMatch < songs.length - 1) {
        displayMatch(songs[currentMatch], songs[currentMatch + 1]);
    } else {
        songs = nextRound;
        currentMatch = 0; // Reset currentMatch for the next round
        nextRound = []; // Reset nextRound for the next round
        tournamentBracket(songs);
    }
}

var playlist = JSON.parse(localStorage.getItem('playlist'));

// let songs = debug_songs;
let songs = playlist.songs;

document.getElementsByClassName("playlist_title")[0].innerText = playlist.title;
// Check if songs data exists
if (songs) {
    tournamentBracket(songs);
} else {
    console.error('No songs data found in localStorage');
}