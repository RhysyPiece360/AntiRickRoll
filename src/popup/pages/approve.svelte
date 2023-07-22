<script>
    import { Badge, Button, Input } from "flowbite-svelte";
    import { onMount } from 'svelte';

    let videos = [];
    let videoId = '';

    onMount(loadVideos);

    async function loadVideos() {
        // Fetch the videos in queue when the component is mounted
        const response = await fetch('http://localhost:80/getQueue');
        videos = await response.json();
    }

    const submitVideoId = () => {
        if (videoId.length !== 11) {
            alert('The YouTube video ID must be exactly 11 characters long.');
            return;
        }

        fetch('http://localhost:80/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: videoId }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Video ID submitted successfully.');
                loadVideos(); // Reload the videos
            } else {
                alert('Error submitting video ID: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error submitting video ID:', error);
        });
    };

    const approveVideo = (id) => {
        fetch('http://localhost:80/approve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Video ID approved successfully.');
                loadVideos(); // Reload the videos
            } else {
                alert('Error approving video ID: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error approving video ID:', error);
        });
    };

    const disapproveVideo = (id) => {
        fetch('http://localhost:80/disapprove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Video ID disapproved successfully.');
                loadVideos(); // Reload the videos
            } else {
                alert('Error disapproving video ID: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error disapproving video ID:', error);
        });
    };
</script>

<div class="mt-4">
    <h1>Videos in Queue</h1>
    {#each videos as video (video.id)}
        <div>
            <iframe src="https://www.youtube.com/watch?v={video.id}" title="Video checking"></iframe> 
            <Button color="success" on:click={() => approveVideo(video.id)}>Approve</Button>
            <Button color="danger" on:click={() => disapproveVideo(video.id)}>Disapprove</Button>
        </div>
    {/each}
</div>
