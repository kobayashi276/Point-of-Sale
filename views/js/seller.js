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

// app.js
document.addEventListener('DOMContentLoaded', function () {
    const searchBarcodeInput = document.getElementById('searchBarcode');
    const searchResultsDiv = document.getElementById('searchResults');

    searchBarcodeInput.addEventListener('input', function () {
        const searchTerm = searchBarcodeInput.value.trim().toLowerCase();

        // Clear previous search results
        searchResultsDiv.innerHTML = '';

        // Fetch products and filter based on the search term
        fetch(`${rootURL}/api/product`)
            .then(response => response.json())
            .then(products => {
                const matchingProducts = products.filter(product => {
                    return product.barcode.toLowerCase().includes(searchTerm);
                });

                // Display search results
                matchingProducts.forEach(product => {
                    const resultItem = document.createElement('div');
                    resultItem.textContent = `${product.name} - ${product.barcode}`;
                    resultItem.addEventListener('click', function () {
                        // Add the selected product to the order or perform other actions
                        addProductToOrder(product.id);
                        searchBarcodeInput.value = ''; // Clear the search input after selection
                        searchResultsDiv.innerHTML = ''; // Clear search results
                    });
                    searchResultsDiv.appendChild(resultItem);
                });
            });
    });
});

function addProductToOrder(productId) {
    // Add your logic to handle adding the selected product to the order
    console.log(`Product with ID ${productId} selected.`);
}
