const apiKey = 'AIzaSyC_6mL9XuHaQSeuTWMTYlX29RUMyh19NRM';
let nextPageToken = '';

function searchMusic() {
    var searchTerm = document.getElementById('searchInput').value;
    var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=' + searchTerm + '&type=video&key=' + apiKey;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            nextPageToken = data.nextPageToken;
            displayMusicResults(data.items);
        })
        .catch(error => console.error('Error:', error));
}

function displayMusicResults(videos) {
    var musicList = document.getElementById('musicList');

    videos.forEach(video => {
        var musicItem = document.createElement('div');
        musicItem.className = 'musicItem';

        var videoId = video.id.videoId;
        var videoUrl = 'https://www.youtube.com/embed/' + videoId;

        var thumbnail = document.createElement('img');
        thumbnail.src = video.snippet.thumbnails.medium.url;
        thumbnail.onclick = function() {
            checkEmbeddable(videoId, function(embeddable) {
                if (embeddable) {
                    var embeddedPlayer = document.createElement('iframe');
                    embeddedPlayer.src = videoUrl;
                    embeddedPlayer.width = '560';
                    embeddedPlayer.height = '315';
                    embeddedPlayer.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                    embeddedPlayer.allowFullscreen = true;

                    musicItem.innerHTML = ''; // Clear the content of the musicItem
                    musicItem.appendChild(embeddedPlayer);
                } else {
                    console.error('Video is not embeddable');
                }
            });
        };

        musicItem.appendChild(thumbnail);
        musicList.appendChild(musicItem);
    });
}

function checkEmbeddable(videoId, callback) {
    var url = 'https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=' + videoId + '&key=' + apiKey;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.items.length > 0) {
                var contentDetails = data.items[0].contentDetails;
                var embeddable = contentDetails.regionRestriction ? contentDetails.regionRestriction.allowed : true;
                callback(embeddable);
            } else {
                callback(false);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            callback(false);
        });
}

// Implementing endless scrolling
window.addEventListener('scroll', function() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // User has scrolled to the bottom of the page
        fetchMoreResults();
    }
});

function fetchMoreResults() {
    if (!nextPageToken) {
        return; // No more results to fetch
    }

    var searchTerm = document.getElementById('searchInput').value;
    var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=' + searchTerm + '&type=video&pageToken=' + nextPageToken + '&key=' + apiKey;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            nextPageToken = data.nextPageToken;
            displayMusicResults(data.items);
        })
        .catch(error => console.error('Error:', error));
}
