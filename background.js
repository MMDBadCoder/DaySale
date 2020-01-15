var in_sale = false;

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request);

        if (request.state === 'button_clicked') {
            if (in_sale) {
                in_sale = false;
            } else {
                in_sale = true;
                // localStorage.setItem('user', request.user);
                // localStorage.setItem('pass', request.pass);
                // localStorage.setItem('priority', request.priority);
                chrome.tabs.create({ "url": 'https://sso.stu.sharif.ir/students/sign_in' });
            }
            sendResponse({ state: in_sale });
        }

        if (request.state === 'is_in_sale') {
            sendResponse({
                state: in_sale,
                // user: localStorage.getItem('user'),
                // pass: localStorage.getItem('pass'),
                // priority: localStorage.getItem('priority')
                user : '97110071',
                pass : '14813790',
                priority: 1
            });
        }

        if (request.state === 'sale_finished') {
            in_sale = false;
        }
    }
);
