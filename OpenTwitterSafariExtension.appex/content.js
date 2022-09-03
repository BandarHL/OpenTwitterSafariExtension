browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
    console.log("Received response: ", response);
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);
});

function afterNavigate() {
    var locationArr = window.location.pathname.split("/").reverse()
    if (locationArr[0] && !locationArr[1]) {
        var tw;
        if (locationArr[0] === "home") {
            tw = `twitter://timeline`
        } else {
            tw = `twitter://user?screen_name=${locationArr[0]}`
        }
        window.location.href = tw
        console.log(tw)
    } else if (locationArr[0] && locationArr[1] === "status") { // tweet
        var tw = `twitter://status?id=${locationArr[0]}`
        window.location.href = tw
        console.log(tw)
    }
}

(document.body || document.documentElement).addEventListener('transitionend',
  function(/*TransitionEvent*/ event) {
    if (event.propertyName === 'width' && event.target.id === 'progress') {
        afterNavigate();
    }
}, true);
// After page load
afterNavigate();
