<script>
    import { Badge } from "flowbite-svelte";  
    // Sample statistics data (Replace this with the actual data from the API)
    let statistics = {
       rickrolls: 0,
      urlsInDatabase: 0,
    };
  
    // Fetch the statistics from the API
    async function fetchStatistics() {
      try {
        const response = await fetch("http://localhost/statistics");
        const data = await response.json();
        statistics = data;
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    }
  
      fetchStatistics();
  </script>
  
  <style>
    /* Custom styles for the statistics container */
    .statistics-container {
      display: flex;
      justify-content: space-around;
      margin: 20px 0;
    }
  
    .statistic-item {
      text-align: center;
    }
  </style>
  

  
  <!-- Statistics section -->
  <div class="statistics-container">
    <div class="statistic-item">
    </div>
    <div class="statistic-item">
      <h3>Rickrolls Blocked</h3>
      <p>{statistics.rickrolls}</p>
    </div>
    <div class="statistic-item">
      <h3>URLs in Database</h3>
      <p>{statistics.urlsInDatabase}</p>
    </div>
  </div>
  