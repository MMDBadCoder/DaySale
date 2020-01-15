var priority = 1;
var user;
var pass;

if (location.origin === 'https://sso.stu.sharif.ir' || location.origin === 'https://dining.sharif.ir') {
    chrome.runtime.sendMessage({ state: "is_in_sale" }, function (response) {
        if (response.state === true) {
            priority = response.priority;
            user = response.user;
            pass = response.pass;
            let result = sale_process();
            if (result === true) {
                chrome.runtime.sendMessage({ state: "sale_finished" }, function (response) { });
            }
        }
    });
}


function sale_process() {
    let address = location.href;
    if (address === 'https://sso.stu.sharif.ir/students/sign_in') {
        sign_in();
        return;
    }
    if (address === 'https://dining.sharif.ir/admin/' || address === 'https://sso.stu.sharif.ir/students') {
        go_to_sale_page();
        return;
    }
    if (address === 'https://dining.sharif.ir/admin/food/food-reserve/reserve') {
        return sale_food();
    }
    go_to_sign_in_page();
}



function sign_in() {
    var userInput = document.getElementById('student_student_identifier');
    userInput.value = user;
    var passInput = document.getElementById('student_password');
    passInput.value = pass;
    var form = document.getElementById('new_student');
    form.submit();
}

function go_to_sign_in_page() {
    location.replace('https://sso.stu.sharif.ir/students/sign_in');
}

function go_to_sale_page() {
    location.replace('https://dining.sharif.ir/admin/food/food-reserve/reserve');
}

function sale_food() {
    var spans = document.getElementsByClassName('fa-cutlery cursor_pointer has_tooltip');
    if (spans.length > 0) {
        if (spans.length === 1) {
            spans[0].click();
        } else {
            spans[(priority - 1) % 2].click();
        }
        return true;
    } else {
        location.reload();
        return false;
    }
}


