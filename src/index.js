document.addEventListener("DOMContentLoaded", function () {
    fetchDataAndPopulateTable();
});

function fetchDataAndPopulateTable() {
    var myUniversityUrl = 'https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json';
  
    fetch(myUniversityUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        populateTable(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
}

