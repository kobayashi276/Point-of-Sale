var rootURL = 'http://localhost:3000';

function listPageContent(pageType) {
    let order = document.querySelector('.orders-page');
    let statistic = document.querySelector('.statistic-page');

    if (pageType === 'order') {
        order.classList.remove("disable-page");
        statistic.classList.add("disable-page");

    }
    if (pageType === 'statistic') {
        order.classList.add("disable-page");
        statistic.classList.remove("disable-page");
    }
}

function redirectToAddOrder() {
    window.location.href = `${rootURL}/seller/new-order`
}
