var rootURL = window.location.origin; //if you need to go deep after admin, you need to + '/....'



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

//set detail info
let btnDelete = [...document.querySelectorAll('.delete')];
btnDelete.forEach(btn => {

    //" - " + id
    btn.addEventListener('click', async (e) => {
        let email = e.target.getAttribute("data-email");

        await fetch(`${rootURL}/api/user?email=${email}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
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

//set detail product to dialog update
let btnEditOnProduct = [...document.querySelectorAll('.EditBtnDetailProduct')];
btnEditOnProduct.forEach(btn => {

    btn.addEventListener('click', (e) => {
        let barcode = e.target.getAttribute("data-barcode");
        let oldName = e.target.getAttribute("data-name");
        let oldImportPrice = e.target.getAttribute("data-import");
        let oldRetailPrice = e.target.getAttribute("data-retail");
        let oldCategory = e.target.getAttribute("data-category");

        let barcodeInput = document.querySelector('#barcode-dialog');
        let nameInput = document.querySelector('#name-dialog');
        let importInput = document.querySelector('#importprice-dialog');
        let retailInput = document.querySelector('#retailprice-dialog');
        let categoryInput = document.querySelector('#category-dialog');

        barcodeInput.value = barcode;
        nameInput.value = oldName;
        importInput.value = oldImportPrice;
        retailInput.value = oldRetailPrice;
        categoryInput.value = oldCategory;
    })
})



// submit update 
let btnUpdateProduct = document.querySelector('.update-product-btn');
btnUpdateProduct.addEventListener('click', async (e) => {
    e.preventDefault();

    let barcodeInput = document.querySelector('#barcode-dialog').value;
    let nameInput = document.querySelector('#name-dialog').value;
    let importInput = document.querySelector('#importprice-dialog').value;
    let retailInput = document.querySelector('#retailprice-dialog').value;
    let categoryInput = document.querySelector('#category-dialog').value;

    await fetch(`${rootURL}/api/product?barcode=${barcodeInput}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: nameInput,
            importprice: importInput,
            retailprice: retailInput,
            category: categoryInput
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
                setTimeout(() => {
                    // document.querySelector('.closeUpdate').click();
                    window.location.reload();
                }, 3000)
            }

            // window.location.href = `${rootURL}/admin`


        })
        .catch(err => {
            document.querySelector('.msg-update').innerText = err;
            document.querySelector('.msg-update').style.display = "block";
            document.querySelector('.msg-update').classList.add("alert-danger");
        })


})



//set info for delete to dialog
let btnRemoveOnProduct = [...document.querySelectorAll('.deleteProduct')];
let btnRemoveProduct = document.querySelector('.confirm-removebtn');
btnRemoveOnProduct.forEach(btn => {

    btn.addEventListener('click', (e) => {
        let name = e.target.getAttribute("data-name");
        let barcode = e.target.getAttribute("data-barcode");

        document.querySelector('.name-remove-product').innerText = name;
        btnRemoveProduct.setAttribute('data-barcode', barcode);


    })
})
//confirm delete
btnRemoveProduct.addEventListener(('click'), async (e) => {
    let barcode = e.target.getAttribute("data-barcode");

    await fetch(`${rootURL}/api/product?barcode=${barcode}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },

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
                document.querySelector('.msg-remove').innerText = 'Successfully';
                document.querySelector('.msg-remove').style.display = "block";
                document.querySelector('.msg-remove').classList.add("alert-success");
            }

            setTimeout(() => {
                // document.querySelector('.closeRemove').click();
                window.location.reload();
            }, 3000)
            // window.location.reload();

        })
        .catch(err => {
            document.querySelector('.msg-remove').innerText = err;
            document.querySelector('.msg-remove').style.display = "block";
            document.querySelector('.msg-remove').classList.add("alert-danger");
        })
})




//handle nav bar
function listPageContent(pageType) {
    let product = document.querySelector('.product-page');
    let order = document.querySelector('.orders-page');
    let seller = document.querySelector('.seller-page');
    let statistic = document.querySelector('.statistic-page');

    let productNav = document.querySelector('.product-nav-bar');
    let orderNav = document.querySelector('.order-nav-bar');
    let sellerNav = document.querySelector('.seller-nav-bar');
    let statisticNav = document.querySelector('.statistic-nav-bar');






    if (pageType === 'product') {
        product.classList.remove("disable-page");
        order.classList.add("disable-page");
        seller.classList.add("disable-page");
        statistic.classList.add("disable-page");

        productNav.classList.add("active");
        orderNav.classList.remove("active");
        sellerNav.classList.remove("active");
        statisticNav.classList.remove("active");



    }
    if (pageType === 'order') {
        product.classList.add("disable-page");
        order.classList.remove("disable-page");
        seller.classList.add("disable-page");
        statistic.classList.add("disable-page");

        productNav.classList.remove("active");
        orderNav.classList.add("active");
        sellerNav.classList.remove("active");
        statisticNav.classList.remove("active");

    }
    if (pageType === 'seller') {
        product.classList.add("disable-page");
        order.classList.add("disable-page");
        seller.classList.remove("disable-page");
        statistic.classList.add("disable-page");

        productNav.classList.remove("active");
        orderNav.classList.remove("active");
        sellerNav.classList.add("active");
        statisticNav.classList.remove("active");

    }
    if (pageType === 'statistic') {
        product.classList.add("disable-page");
        order.classList.add("disable-page");
        seller.classList.add("disable-page");
        statistic.classList.remove("disable-page");

        productNav.classList.remove("active");
        orderNav.cremoveremoveremovelassList.remove("active");
        sellerNav.classList.remove("active");
        statisticNav.classList.add("active");
    }
}


//lock seller
async function lock(email) {
    await fetch(`${rootURL}/api/lock?email=${email}`, {
        method: 'get',
        headers: { 'Contype-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => {
            // location.replace(`${rootURL}/admin`)
            window.location.reload();
        })
        .catch(err => console.log(err))
}

//unlock seller
async function unlock(email) {
    await fetch(`${rootURL}/api/unblock?email=${email}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => {
            // location.replace(`${rootURL}/admin`)
            window.location.reload();

        })
        .catch(err => console.log(err))
}

function redirectToRegisterForm() {
    window.location.href = `${rootURL}/register`
}

function redirectToAdmin() {
    window.location.href = `${rootURL}/admin`

}

function redirectToAddProduct() {

    window.location.href = `${rootURL}/api/addnewproduct`
}
