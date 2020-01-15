chrome.runtime.sendMessage({ state: 'is_in_sale' }, function (response) {
    setColor(response.state);
});

var start_button = document.getElementById('start-sale');
start_button.onclick = function () {
    // let user = document.getElementById('user').innerText;
    // let pass = document.getElementById('pass').innerText;
    // let priority = document.getElementById('priority').innerText;
    chrome.runtime.sendMessage({
        state: 'button_clicked',
        // pass: pass,
        // user: user,
        // priority: priority
    }, function (response) {
        setColor(response.state);
    });
}


function setColor(red) {
    if (!red) {
        start_button.className = 'ui inverted white button';
        start_button.innerText = "Start!";
        red = false;
    } else {
        start_button.className = 'ui inverted red button';
        start_button.innerText = "Stop!";
        red = true;
    }
}



