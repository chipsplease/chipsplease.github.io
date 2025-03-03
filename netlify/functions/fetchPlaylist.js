const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const playlistId = event.queryStringParameters.playlistId;
    const apiKey = process.env.YOUTUBE_API_KEY;

    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`);
    const data = await response.json();

    return {
        statusCode: 200,
        body: JSON.stringify(data.items.map(item => ({
            title: item.snippet.title,
            youtube: `https://www.youtube.com/embed/${item.snippet.resourceId.videoId}`
        })))
    };
};
