var rootURL = window.location.origin;
var differentURL = 'http://localhost:3000';

function listPageContent(pageType) {
    let order = document.querySelector('.orders-page');
    let statistic = document.querySelector('.statistic-page');

    let orderNav = document.querySelector('.order-nav-bar');
    let statisticNav = document.querySelector('.statistic-nav-bar');


    if (pageType === 'order') {
        order.classList.remove("disable-page");
        statistic.classList.add("disable-page");

        orderNav.classList.add("active");
        statisticNav.classList.remove("active");
    }
    if (pageType === 'statistic') {
        order.classList.add("disable-page");
        statistic.classList.remove("disable-page");


        orderNav.classList.remove("active");
        statisticNav.classList.add("active");
    }
}


let btnUpdateSellerNav = document.querySelector('.btnEditInfoOnNav');
btnUpdateSellerNav.addEventListener('click', (e) => {
    let email = e.target.getAttribute('data-email');

    let btn = document.querySelector('.update-seller-btn');
    btn.addEventListener('click', async (e1) => {

        e1.preventDefault();

        let username = document.querySelector('#username-dialog').value;
        let phone = document.querySelector('#phone-dialog').value;
        let country = document.querySelector('#country-dialog').value;


        await fetch(`${differentURL}/api/user?email=${email}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                phone: phone,
                country: country
            })

        })
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                // e1.target.setAttribute("data-dismiss", "modal")
                // e.target.removeAttribute("data-target");
                // $('#deleteEmployeeModal').modal('hide');
                // let tr = btn.paren   tElement.parentElement;
                // let tbodyElement = btn.parentElement.parentElement.parentElement;
                // tbodyElement.removeChild(tr);

                if (data != null) {
                    document.querySelector('.msg-update').innerText = 'Successfully';
                    document.querySelector('.msg-update').style.display = "block";
                    document.querySelector('.msg-update').classList.add("alert-success");
                }

                setTimeout(() => {
                    // document.querySelector('.closeRemove').click();
                    window.location.reload();
                }, 3000)


            })
            .catch(err => {
                document.querySelector('.msg-update').innerText = err;
                document.querySelector('.msg-update').style.display = "block";
                document.querySelector('.msg-update').classList.add("alert-danger");
            })
    })
})


document.querySelector('.btnSeeDetailInfo').addEventListener('click', async (e) => {
    let email = e.target.getAttribute('data-email');


    await fetch(`${differentURL}/api/user?email=${email}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => {
            document.querySelector('.name-seller').innerText = data.fullname;
            document.querySelector('.email-seller').innerText = data.email;
            document.querySelector('.phone-seller').innerText = data.phone == null ? 'seller does not have phone' : data.phone;
            document.querySelector('.country-seller').innerText = data.country == null ? 'seller does not have country' : data.country;
        })
})



function redirectToAddOrder() {
    window.location.href = `${rootURL}/seller/new-order`
}
