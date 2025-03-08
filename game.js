<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Vote for your favorite songs in the Song Battle game.">
    <title>Song Battle</title>
    <link rel="stylesheet" href="game.css">
    <link rel="stylesheet" href="main.css">
</head>
<body>
    <header>
        <h1>Song Battle</h1>
        <h2 class="playlist_title"></h2>
        <nav>
            <button type="button" class="back_button" onclick="window.location.href = 'index.html'">Back</button>
        </nav>
    </header>
    <main>
        <div class="content_container">
            <div class="progress_container">
                <progress id="progress_bar" value="0" max="100"></progress>
            </div>
            <div class="songs_container">
                <div class="youtube" id="song1">
                    <h2 class="song_title" id="song_title1">Song Title 1</h2>
                    <iframe width="560" height="315" src="http://www.youtube.com/embed/1" referrerpolicy="no-referrer-when-downgrade" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                    <button type="button" class="vote_button" onclick="vote(0)">Vote</button>
                </div>
                <div class="youtube" id="song2">
                    <h2 class="song_title" id="song_title2">Song Title 2</h2>
                    <iframe width="560" height="315" src="http://www.youtube.com/embed/1" referrerpolicy="no-referrer-when-downgrade" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                    <button type="button" class="vote_button" onclick="vote(1)">Vote</button>
                </div>
            </div>
        </div>
    </main>
    <footer>
        <p>&copy; 2025 Song Battle. All rights reserved.</p>
        <button type="button" class="feedback_button" onclick="window.location.href = 'https://forms.office.com/e/sqUfPrc0sS'">Feedback</button>
    </footer>
    <script src="game.js"></script>
</body>
</html>
