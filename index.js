function showAlert(message) {
    const alertModal = document.getElementById("alert-modal");
    const alertMessage = document.getElementById("alert-message");
    alertMessage.innerText = message;
    alertModal.style.display = "flex"; // Show the modal

    // Close the alert when the user clicks the close button
    const closeAlertBtn = document.getElementById("close-alert");
    closeAlertBtn.onclick = function() {
        alertModal.style.display = "none";
    };

    // Close the alert if the user clicks outside the alert box
    window.onclick = function(event) {
        if (event.target === alertModal) {
            alertModal.style.display = "none";
        }
    };
}

function search() {
    let movieInput = document.getElementById("movie");
    let moviename = movieInput.value.trim();

    if (moviename === "") {
        // Show alert if the input is empty
        showAlert("Please enter a movie name.");
        return;
    }

    let htmlRequest = new XMLHttpRequest();
    let url = "http://www.omdbapi.com/?apikey=59854c76&t=" + moviename;

    htmlRequest.open("GET", url);
    htmlRequest.responseType = "json";
    htmlRequest.send();

    htmlRequest.onload = function() {
        let response = htmlRequest.response;
        if (response && response.Poster && response.imdbRating) {
            document.getElementById("poster").src = response.Poster || '';
            document.getElementById("title").innerText = response.Title || 'N/A';
            document.getElementById("released").innerText = response.Released || 'N/A';
            document.getElementById("country").innerText = response.Country || 'N/A';
            document.getElementById("plot").innerText = response.Plot || 'N/A';
            document.getElementById("rate").innerText = response.imdbRating || 'N/A';

            // Show the result container
            document.querySelector('.result-container').style.display = 'flex';
        } else {
            // Show alert if the movie is not found
            showAlert("Movie not found! Please try again.");
        }
    };
}
