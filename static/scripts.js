// Function to fetch company profiles
function fetchCompanies() {
    fetch('http://127.0.0.1:5000/companies') // Update with your API endpoint for fetching companies
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(companies => {
            const companyContainer = document.getElementById('companyProfiles');
            companyContainer.innerHTML = ''; // Clear existing content

            companies.forEach(company => {
                const card = `
            <div class="col-md-4 mb-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${company.name}</h5>
                  <p class="card-text">${company.query}</p>
                  <button class="btn btn-primary" onclick="showSolutionModal('${company.name}')">Suggest a Solution</button>
                </div>
              </div>
            </div>
          `;
                companyContainer.innerHTML += card;
            });
        })
        .catch(error => console.error('Error fetching companies:', error));
}

// Fetch and display company profiles on page load
window.onload = function () {
    fetchCompanies();
    getQueries();
};

// Function to handle idea submission
document.getElementById('ideaForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const ideaTitle = document.getElementById('ideaTitle').value;
    const ideaDescription = document.getElementById('ideaDescription').value;

    fetch('http://127.0.0.1:5000/ideas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: ideaTitle,
                description: ideaDescription
            })
        })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            alert(data.message); // Show success message
            document.getElementById('ideaForm').reset(); // Reset the form
        })
        .catch(error => console.error('Error submitting idea:', error));
});

// Function to show solution modal
function showSolutionModal(companyName) {
    document.getElementById('solutionCompanyName').innerText = companyName;
    const modal = new bootstrap.Modal(document.getElementById('solutionModal'));
    modal.show();
}

// Function to handle solution submission
document.getElementById('solutionForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const solutionDescription = document.getElementById('solutionDescription').value;
    const companyName = document.getElementById('solutionCompanyName').innerText;

    fetch('http://127.0.0.1:5000/solutions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                company: companyName,
                description: solutionDescription
            })
        })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            alert(data.message); // Show success message
            document.getElementById('solutionForm').reset(); // Reset the form
            const modal = bootstrap.Modal.getInstance(document.getElementById('solutionModal'));
            modal.hide(); // Hide modal after submission
        })
        .catch(error => console.error('Error submitting solution:', error));
});

// Function to handle query submission
document.getElementById('query-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const query = document.getElementById('query-input').value.trim();

    if (query) {
        // Send a POST request to the /queries API endpoint
        fetch('http://127.0.0.1:5000/queries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: query, // Define query-input as the value of query
                }),
            })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                console.log(data); // Log the response data
                document.getElementById('query-input').value = ''; // Clear the input field
                getQueries(); // Fetch and display the queries
                alert("Query submitted successfully!"); // Display a submission alert
            })
            .catch(error => {
                console.error('Error submitting query:', error.message); // Print the error message
                alert(`Error: ${error.message}`); // Display an alert with the error message
            });
    }
});

// Function to get queries
function getQueries() {
    fetch('http://127.0.0.1:5000/api/queries')
        .then(response => response.json())
        .then(data => {
            const queryContainer = document.getElementById('queries-container');
            queryContainer.innerHTML = ''; // Clear existing content

            data.forEach(query => {
                const queryHtml = `
            <div>
              <p>${query.query}</p>
            </div>
          `;
                queryContainer.innerHTML += queryHtml;
            });
        })
        .catch(error => console.error('Error fetching queries:', error));
}