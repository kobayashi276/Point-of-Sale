var rootURL = window.location.origin;

const selectedProductIds = new Set();
var selectedBarCode = new Set();
var selectedProductQuantity = []

// app.js
// app.js
document.addEventListener('DOMContentLoaded', function () {
    const searchBarcodeInput = document.getElementById('searchBarcode');
    const searchResultsDiv = document.getElementById('searchResults');
    const productTable = document.querySelector('#product-table tbody')


    searchBarcodeInput.addEventListener('input', function () {
        updateTotalPrice()
        const searchTerm = searchBarcodeInput.value.trim().toLowerCase();
        searchResultsDiv.innerHTML = ''; // Clear previous search results

        fetch(`${rootURL}/api/product`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(products => {
                const matchingProducts = products.filter(product => {
                    return product.barcode.toLowerCase().includes(searchTerm);
                });

                matchingProducts.forEach(product => {
                    const resultItem = document.createElement('div');
                    resultItem.textContent = `${product.name} - ${product.barcode}`;
                    resultItem.addEventListener('click', function () {
                        // Add the selected product to the list
                        console.log(!selectedBarCode.has(product.barcode))
                        if (!selectedBarCode.has(product.barcode)) {
                            selectedProductIds.add(product);
                            selectedBarCode.add(product.barcode)
                            selectedProductQuantity.push(1)
                            // console.log(product.name)
                            updateTable();
                            updateTotalPrice();
                            searchBarcodeInput.value = ''; // Clear the search input after selection
                            searchResultsDiv.innerHTML = ''; // Clear search results

                        }

                    });
                    searchResultsDiv.appendChild(resultItem);

                })
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    });

    function updateQuantity(){
        selectedProductQuantity = []
        var tableRows = document.querySelectorAll('#product-table tbody tr');

        tableRows.forEach(row => {
            console.log(parseInt(row.cells[5].querySelector('input[type="number"]').value))
            selectedProductQuantity.push(parseInt(row.cells[5].querySelector('input[type="number"]').value))
        })
    }

    function updateTable() {
        productTable.innerHTML = '';
        let index = 0
        selectedProductIds.forEach((product) => {
            console.log('updated table')
            var row = productTable.insertRow(index);
            console.log(index)

            var cellIndex = row.insertCell(0);
            var cellBarcode = row.insertCell(1);
            var cellProductName = row.insertCell(2);
            var cellPrice = row.insertCell(3);
            var cellCategory = row.insertCell(4);
            var cellQuantity = row.insertCell(5);
            var cellDelete = row.insertCell(6);

            cellIndex.textContent = index + 1;
            cellBarcode.textContent = product.barcode;
            cellProductName.textContent = product.name;
            cellPrice.textContent = product.retailprice;
            cellCategory.textContent = product.category;

            var quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = selectedProductQuantity[index]; // You can set a default value if needed
            quantityInput.min = 1; // Set the minimum value
            quantityInput.name = 'quantity'; // Optional: Add a name for the input
            cellQuantity.appendChild(quantityInput);

            quantityInput.addEventListener('input',(event) => {
                updateTotalPrice()
            })

            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function () {
                // Delete the row and update the selected products list
                row.remove();
                deleteProductIds(product.barcode)
                updateTable()
            });
            cellDelete.appendChild(deleteButton);

            index++
        });
        updateQuantity()
    }

    function updateTotalPrice() {
        updateQuantity()
        var tableRows = document.querySelectorAll('#product-table tbody tr');
        var totalPrice = 0

        tableRows.forEach(function (row) {
            totalPrice+=parseFloat(row.cells[3].textContent) * parseInt(row.cells[5].querySelector('input[type="number"]').value)
        });

        var totalPriceP = document.getElementById('total-price')
        console.log(totalPrice)
        totalPriceP.innerHTML = totalPrice
    }

    function deleteProductIds(barcode) {
        selectedProductIds.forEach(product => {
            if (product.barcode === barcode) {
                selectedProductIds.delete(product)
                selectedBarCode.delete(barcode)
                updateTotalPrice()
                return
            }
        })
    }

});



function createOrder() {
    const customerPhone = document.getElementById('customerPhone').value;
    // Use selectedProductIds to create the order or perform other actions
    console.log('Customer Phone:', customerPhone);
    console.log('Selected Product IDs:', Array.from(selectedProductIds));
}
