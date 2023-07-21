<script>
    import { Button } from "flowbite-svelte";
    import { onMount } from 'svelte';

    let videos = [];

    onMount(loadVideos);

    async function loadVideos() {
        // Fetch the videos in queue when the component is mounted
        const response = await fetch('http://localhost:80/getQueue');
        videos = await response.json();
    }

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
            <p>{video.id}</p>
            <Button color="primary" on:click={() => approveVideo(video.id)}>Approve</Button>
            <Button color="danger" on:click={() => disapproveVideo(video.id)}>Disapprove</Button>
        </div>
    {/each}
</div>