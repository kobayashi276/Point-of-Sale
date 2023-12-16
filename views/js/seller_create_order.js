var rootURL = window.location.origin;

const selectedProductIds = new Set();

// app.js
// app.js
document.addEventListener('DOMContentLoaded', function () {
    const searchBarcodeInput = document.getElementById('searchBarcode');
    const searchResultsDiv = document.getElementById('searchResults');
    const selectedProductsList = document.getElementById('selectedProductsList');


    searchBarcodeInput.addEventListener('input', function () {
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
                        selectedProductIds.add(product);
                        updateSelectedProductsList();
                        searchBarcodeInput.value = ''; // Clear the search input after selection
                        searchResultsDiv.innerHTML = ''; // Clear search results
                    });
                    searchResultsDiv.appendChild(resultItem);
                });
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    });

    function updateSelectedProductsList() {
        selectedProductsList.innerHTML = ''; // Clear previous list
        selectedProductIds.forEach(productId => {
            const listItem = document.createElement('li');
            listItem.textContent = `Product ID: ${productId.barcode} | Product name: ${productId.name}`;
            selectedProductsList.appendChild(listItem);
        });
    }
});

function createOrder() {
    const customerPhone = document.getElementById('customerPhone').value;
    // Use selectedProductIds to create the order or perform other actions
    console.log('Customer Phone:', customerPhone);
    console.log('Selected Product IDs:', Array.from(selectedProductIds));
}
