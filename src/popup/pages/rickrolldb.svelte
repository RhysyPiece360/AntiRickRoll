<script>
    import { Badge, Button, Input } from "flowbite-svelte";

    let videoId = '';

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
            } else {
                alert('Error submitting video ID: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error submitting video ID:', error);
        });
    };

    const approveVideoId = () => {
        if (videoId.length !== 11) {
            alert('The YouTube video ID must be exactly 11 characters long.');
            return;
        }

        fetch('http://localhost:80/approve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: videoId }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Video ID approved successfully.');
            } else {
                alert('Error approving video ID: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error approving video ID:', error);
        });
    };
</script>

<div class="mt-4">
    <p>Add Youtube Url Here (must be 11 characters or it wont accept it)</p>
    <Input bind:value={videoId} placeholder="Enter YouTube video ID" />
    <Button color="primary" class="mt-2" on:click={submitVideoId}>Submit</Button>
</div>