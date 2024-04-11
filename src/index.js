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
function populateTable(data) {
    var tableBody = document.querySelector("#universities tbody");

    // Clear existing table data
    tableBody.innerHTML = '';

    // Loop through the received data and add rows to the table
    data.forEach(item => {
        var newRow = document.createElement("tr");

        var cell1 = document.createElement("td");
        cell1.textContent = item.name;
        newRow.appendChild(cell1);

        var cell2 = document.createElement("td");
        cell2.textContent = item.country;
        newRow.appendChild(cell2);

        var cell3 = document.createElement("td");
        cell3.textContent = item["state-province"];
        newRow.appendChild(cell3);

        var cell4 = document.createElement("td");
        cell4.textContent = item.alpha_two_code;
        newRow.appendChild(cell4);

        var cell5 = document.createElement("td");
        var button = document.createElement("button");
        button.textContent = "Website";
        button.addEventListener("click", function() {
            window.open(item.web_pages[0], '_blank');
        });
        cell5.appendChild(button);
        newRow.appendChild(cell5);

        tableBody.appendChild(newRow);
    });
}


