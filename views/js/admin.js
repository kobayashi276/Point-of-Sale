var rootURL = 'http://localhost:3000'; //if you need to go deep after admin, you need to + '/....'



/*let btnDeleteAll = document.querySelector('.deleteAll');
btnDeleteAll.addEventListener('click', (e) => {
    let btnDeleteAllDialog = document.querySelector('.deleteAllDetail');
    btnDeleteAllDialog.addEventListener('click', async (e1) => {
        await fetch('http://localhost:9090/employees/delete', {
            method: 'delete',
            headers: { 'Contype-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                // e1.target.setAttribute("data-dismiss", "modal")
                // e.target.removeAttribute("data-target");
                $('#deleteAllEmployeeModal').modal('hide');
                let allTd = [...document.querySelectorAll('.tdOfTbody')];
                console.log(allTd)
                allTd.forEach(tagTd => {

                    let tbodyElement = tagTd.parentElement;
                    tbodyElement.removeChild(tagTd);
                })


            })
            .catch(err => console.log(err))
    })
})*/


let btnDelete = [...document.querySelectorAll('.delete')];
btnDelete.forEach(btn => {

    //" - " + id
    btn.addEventListener('click', async (e) => {
        let email = e.target.getAttribute("data-email");

        await fetch(`${rootURL}/api/user?email=${email}`, {
            method: 'get',
            headers: { 'Contype-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                // e1.target.setAttribute("data-dismiss", "modal")
                // e.target.removeAttribute("data-target");
                // $('#deleteEmployeeModal').modal('hide');
                // let tr = btn.parentElement.parentElement;
                // let tbodyElement = btn.parentElement.parentElement.parentElement;
                // tbodyElement.removeChild(tr);

                //document.querySelector('.name-seller').innerText = 'hello';
                //document.querySelector('.email-seller').innerText = 'hello@gmail.com';

                document.querySelector('.name-seller').innerText = data.fullname;
                document.querySelector('.email-seller').innerText = data.email;
                document.querySelector('.phone-seller').innerText = data.phone == null ? 'seller does not have phone' : data.phone;
                document.querySelector('.country-seller').innerText = data.country == null ? 'seller does not have country' : data.country;
                document.querySelector('.createAt-seller').innerText = data.createdAt;

                //total is not code 
                document.querySelector('.total-order-seller').innerText = data?.totalOrder ? 'do not have order' : 'data.totalOrder';

            })
            .catch(err => console.log(err))


        /*let btnDeleteDialog = document.querySelector('.deleteDetail');
        btnDeleteDialog.addEventListener('click', async (e1) => {
            await fetch(`${rootURL}//delete/${splitID[0]}`, {
                method: 'delete',
                headers: { 'Contype-Type': 'application/json' }
            })
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    // e1.target.setAttribute("data-dismiss", "modal")
                    // e.target.removeAttribute("data-target");
                    $('#deleteEmployeeModal').modal('hide');
                    let tr = btn.parentElement.parentElement;
                    let tbodyElement = btn.parentElement.parentElement.parentElement;
                    tbodyElement.removeChild(tr);

                })
                .catch(err => console.log(err))
        })*/

    })
})






function listPageContent(pageType) {
    let product = document.querySelector('.product-page');
    let order = document.querySelector('.orders-page');
    let seller = document.querySelector('.seller-page');
    let statistic = document.querySelector('.statistic-page');

    if (pageType === 'product') {
        product.classList.remove("disable-page");
        order.classList.add("disable-page");
        seller.classList.add("disable-page");
        statistic.classList.add("disable-page");

    }
    if (pageType === 'order') {
        product.classList.add("disable-page");
        order.classList.remove("disable-page");
        seller.classList.add("disable-page");
        statistic.classList.add("disable-page");

    }
    if (pageType === 'seller') {
        product.classList.add("disable-page");
        order.classList.add("disable-page");
        seller.classList.remove("disable-page");
        statistic.classList.add("disable-page");

    }
    if (pageType === 'statistic') {
        product.classList.add("disable-page");
        order.classList.add("disable-page");
        seller.classList.add("disable-page");
        statistic.classList.remove("disable-page");
    }
}



async function lock(email) {
    await fetch(`${rootURL}/api/lock?email=${email}`, {
        method: 'get',
        headers: { 'Contype-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => {
            location.replace(`${rootURL}/admin`)
        })
        .catch(err => console.log(err))
}


async function unlock(email) {
    await fetch(`${rootURL}/api/unblock?email=${email}`, {
        method: 'get',
        headers: { 'Contype-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => {
            location.replace(`${rootURL}/admin`)
        })
        .catch(err => console.log(err))
}

function redirectToRegisterForm() {
    window.location.replace('http://localhost:3000/register')
}

function redirectToAdmin() {
    window.location.replace('http://localhost:3000/admin')

}
