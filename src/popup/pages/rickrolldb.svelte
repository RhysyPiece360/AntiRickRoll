<script>
    import { Badge, Button, Input } from "flowbite-svelte";

    let videoId = '';

    const submitVideoId = () => {

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
    let active = false;
</script>

<style>
	.active {
		background-color: pink;
        text-align: center;
	}
</style>

<div class="mt-4">
    <p>Add Youtube Url Here (must be 11 characters or it wont accept it)</p>
    <Input bind:value={videoId} placeholder="Enter YouTube video ID" />
    <div class:active={active}>
        <Button on:click={submitVideoId}>Submit</Button>
    </div>
</div>