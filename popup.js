chrome.runtime.sendMessage({ state: 'is_in_sale' }, function (response) {
    setColor(response.state);
});


var user = document.getElementById('user');
var pass = document.getElementById('pass');
var priority = document.getElementById('priority');


user.value = localStorage.getItem('user');
pass.value = localStorage.getItem('pass');
priority.value = localStorage.getItem('priority');

var start_button = document.getElementById('start-sale');
start_button.onclick = function () {
    if(user.value === '' || pass.value === '' || priority === ''){
        return;
    }
    chrome.runtime.sendMessage({
        state: 'button_clicked',
        pass: pass.value,
        user: user.value,
        priority: priority.value
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
        localStorage.setItem('pass', pass.value);
        localStorage.setItem('user', user.value);
        localStorage.setItem('priority', priority.value);
    }
}



