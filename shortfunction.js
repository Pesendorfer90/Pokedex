// The checkWidth function checks the width of the bodyContainer element.
// If the width is less than 500 pixels, it hides the header and cardContainer elements by adding the d-none class.
// If the width is greater than or equal to 500 pixels, it disables scrolling by setting overflow: hidden on the body.
function checkWidth() {
    mainContainer = document.getElementById('bodyContainer').clientWidth;
    if (mainContainer < 500) {
        document.getElementById('header').classList.add("d-none");
        document.getElementById('cardContainer').classList.add("d-none");
    } else {
        document.body.style = "overflow: hidden";
    }
}


// he checkNumberOfEvolutions function checks the number of <div> elements within the evoChain element.
// If there are fewer than 3, it sets the justify-content style to space-around to space them evenly.
// If there are 3 or more, it sets justify-content to space-between for even distribution with space between the items.
// This function adjusts the layout based on the number of evolution stages.
function checkNumberOfEvolutions() {
    evoDiv = document.getElementById('evoChain');

    allChildren = evoDiv.getElementsByTagName('div').length;
    if (allChildren < 3) {
        document.getElementById('evoChain').style.justifyContent = 'space-around';
    } else {
        document.getElementById('evoChain').style.justifyContent = 'space-between';
    }

}


// The updateProgress function calculates the loading progress based on the current Pokémon ID and maxID,
// then updates a progress bar and corresponding text. The progress is displayed as a percentage.
// If the progress bar or text elements exist, it sets the progress bar's value and updates the
// progress text to indicate how much of the loading process has been completed.
function updateProgress() {
    const progress = Math.round((id / maxID) * 100);
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");

    if (progressBar) {
        progressBar.value = progress;
    }
    if (progressText) {
        progressText.innerText = `Ladevorgang: ${progress}%`;
    }
}