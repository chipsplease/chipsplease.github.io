const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const playlistId = event.queryStringParameters.playlistId;
    const apiKey = process.env.YOUTUBE_API_KEY;

    try {
        const requestUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`;
        console.log('Request URL:', requestUrl);

        const response = await fetch(requestUrl);
        
        if (!response.ok) {
            throw new Error(`YouTube API request failed with status ${response.status}`);
        }

        const data = await response.json();

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': 'https://chipsplease.github.io',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET'
            },
            body: JSON.stringify(data.items.map(item => ({
                title: item.snippet.title,
                youtube: `https://www.youtube.com/embed/${item.snippet.resourceId.videoId}`
            })))
        };
    } catch (error) {
        console.error('Error fetching playlist:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': 'https://chipsplease.github.io',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET'
            },
            body: JSON.stringify({ error: 'Failed to fetch playlist' })
        };
    }
};
