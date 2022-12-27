// check if scrollbar is true or false
function checkScrollbar() {
    if ("ontouchstart" in document.documentElement) {
        if (id < 151) {
        document.getElementById('loadMoreCards').classList.remove("d-none");
        } else {
            document.getElementById('loadMoreCards').classList.add("d-none");
        }
    } else {
        mainContainer = document.getElementById('bodyContainer').clientHeight;
        if (mainContainer < window.innerHeight) {
            document.getElementById('loadMoreCards').classList.remove("d-none");
        } else {
            document.getElementById('loadMoreCards').classList.add("d-none");
        }
    }
}

// check width for full Info. If width is < 500 hidde unused div's
function checkWidth() {
    mainContainer = document.getElementById('bodyContainer').clientWidth;
    if (mainContainer < 500) {
        document.getElementById('header').classList.add("d-none");
        document.getElementById('cardContainer').classList.add("d-none");
    } else {
        document.body.style = "overflow: hidden";
    }
}


// check if the browser changes its size
window.addEventListener('resize', function(){
    setTimeout(function () { checkScrollbar(); }, 1000);
    
});


// trigger function after scroll to the Bottom  
window.onscroll = function (ev) {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        loadMore();
    }
}


// at 2 evolutions space around. at 3 evolutions space between
function checkNumberOfEvolutions() {
    evoDiv = document.getElementById('evoChain');

    allChildren = evoDiv.getElementsByTagName('div').length;
    if (allChildren < 3) {
        document.getElementById('evoChain').style.justifyContent = 'space-around';
    } else {
        document.getElementById('evoChain').style.justifyContent = 'space-between';
    }

}