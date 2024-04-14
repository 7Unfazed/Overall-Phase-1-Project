
document.addEventListener("DOMContentLoaded", function () {
    fetchDataAndPopulateTable();
    addUni();
});
//This function fetches the data and throws an error if any problem occurs
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
//this function creates new rows and populates them with the fetched data
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
        //Create a button for cell 5 inorder to visit the website of the university
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
//Function filters the the whole document according to the users input
function filterUniversities() {
    var inputName, inputState, filterName, filterState, table, tr, tdName, tdState, i, txtValueName, txtValueState;
    inputName = document.getElementById("nameFilter");
    inputState = document.getElementById("stateFilter");
    filterName = inputName.value.toUpperCase();
    filterState = inputState.value.toUpperCase();
    table = document.getElementById("universities");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        tdName = tr[i].getElementsByTagName("td")[0];
        tdState = tr[i].getElementsByTagName("td")[1];
        if (tdName && tdState) {
            txtValueName = tdName.textContent || tdName.innerText;
            txtValueState = tdState.textContent || tdState.innerText;
            if (txtValueName.toUpperCase().indexOf(filterName) > -1 && txtValueState.toUpperCase().indexOf(filterState) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
  }
  function addUni() {
    document.getElementById('addUniversityForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const country = document.getElementById('country').value;
        const state = document.getElementById('state').value;
        const countrycode = document.getElementById('code').value;
        const website = document.getElementById('website').value;
  
        var table = document.querySelector("#universities tbody");
        var newRow = table.insertRow(table.rows.length);
        var cellsContent = [name, country, state, countrycode, `<a href="${website}" target="_blank"><button>Website</button></a>`];
  
        cellsContent.forEach(content => {
            var cell = newRow.insertCell();
            cell.innerHTML = content;
        });
  
        fetch('http://localhost:3000/api/universities', { // Change the URL to your server URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, country, state, countrycode, website }),
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
  
        // Clear form fields
        document.getElementById("name").value = "";
        document.getElementById("country").value = "";
        document.getElementById("state").value = "";
        document.getElementById("code").value = "";
        document.getElementById("website").value = "";
    });
  }
  function scrollToSection() {
    var section = document.getElementById('add');
    section.scrollIntoView({ behavior: 'smooth' });
  }
  document.getElementById('scrollButton').addEventListener('click', scrollToSection);
