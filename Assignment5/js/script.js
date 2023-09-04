/* Question: This serves as an expansion upon our prior shopping cart page task. 
We're aiming to introduce several enhancements to this page's functionality. 
The application of Ajax using jQuery is on the agenda, 
with the product specifics accessible through this URL: https://dummyjson.com/products */
$(document).ready(function () {
    $.ajax({
        url: "https://dummyjson.com/products",
        method: "GET",
        success: function (data) {
            arrayOfProducts = data.products;
            let productsContainer = $('#products-container');

            function displayProducts() {
                productsContainer.empty();
                $.each(arrayOfProducts, function (index, item) {
                    let arrayOfImages = item.images;
                    let selectedIndex = 0;
                    function updateImg(type) {
                        if (type === '0') {
                            selectedIndex -= 1;
                        } else {
                            selectedIndex += 1;
                        }

                        if (selectedIndex < 0) {
                            selectedIndex = arrayOfImages.length - 1;
                        } else if (selectedIndex >= arrayOfImages.length) {
                            selectedIndex = 0;
                        }
                        $(".product-image", productContainer).attr("src", arrayOfImages[selectedIndex]);
                    }

                    let productItem = `
                        <div class="product ${item.category}">
                            <div class="image-slider-container">
                                <div class="image-container">
                                <img src="${item.images[0]}" alt="Image could not be displayed." class="product-image">
                                </div>
                                <div class="image-update-button-container">
                                    <input type="button" value="PREV" class="prevbtn">
                                    <input type="button" value="NEXT" class="nextbtn"> 
                                </div>
                            </div>
                            <div class="product-details-block1">
                                <h2 class="product-title">${item.title}</h2>
                                <span class="product-rating">Rating: ${item.rating}</span>
                                <p class="product-description">${item.description}</p>
                                <input type="button" value="ADD TO CART" id="tv-add-button" class="add-to-cart">
                            </div>
                            <div class="product-details-block2">
                                <h2 class="product-price">$ ${item.price}</h2>
                                <span class="product-discount-percentage">Discount: ${item.discountPercentage}%</span>
                                <span class="product-discount-percentage">Stock: ${item.stock}</span>
                            </div>
                        </div>
                    `;

                    let productContainer = $(productItem);

                    $(".prevbtn", productContainer).click(function () {
                        updateImg('0');
                    });

                    $(".nextbtn", productContainer).click(function () {
                        updateImg('1');
                    });
                    productsContainer.append(productContainer);
                });
            }

            displayProducts();

            $("#searchbox").keyup(function () {
                let inputValue = $(this).val().toLowerCase();
                let allHidden = true;
                $("p").empty();
                $(".product").each(function () {
                    let productName = $(this).find(".product-details-block1 .product-title").text().toLowerCase();
                    if (productName.includes(inputValue)) {
                        $(this).show();
                        allHidden = false;
                    }
                    else {
                        $(this).hide();
                    }
                });
                if (allHidden) {
                    $("#products-container").append("<p>No products to show.</p>")
                }
            })

            $('#sort').change(function () {
                let selectedOption = $(this).val();
                if (selectedOption === 'lowtohigh') {
                    arrayOfProducts.sort(function (a, b) {
                        return a.price - b.price;
                    });
                } else if (selectedOption === 'hightolow') {
                    arrayOfProducts.sort(function (a, b) {
                        return b.price - a.price;
                    });
                } else if (selectedOption === 'productrating') {
                    arrayOfProducts.sort(function (a, b) {
                        return b.rating - a.rating;
                    });
                }
                displayProducts(arrayOfProducts);
            });

            $('#filter').change(function () {
                var selectedCategory = $(this).val();
                console.log(selectedCategory);
                $('.product').hide();
                if (selectedCategory === 'allcategories') {
                    $('.product').show();
                }
                else {
                    $('.' + selectedCategory).show();
                }
            });

            let cartItems = [];
            $(".add-to-cart").click(function () {
                let productTitle = $(this).siblings('h2').text();
                console.log(productTitle)
                const productDetailsBlock1 = $(this).parent();
                const productPrice = productDetailsBlock1.siblings('.product-details-block2').find('h2');
                const productPriceText = productPrice.text();
                let productPriceTextWithoutSymbol = Number(productPriceText.replaceAll(/[^0-9\.-]+/g, ''));

                let quantity = 1;
                let itemFound = false;
                cartItems.forEach(item => {
                    if (item.title === productTitle) {
                        item.itemquantity++;
                        item.productTotalAmount = item.productTotalAmount + productPriceTextWithoutSymbol
                        itemFound = true;
                    }
                });
                if (!itemFound) {
                    cartItems.push({
                        title: productTitle,
                        itemquantity: quantity,
                        price: productPriceTextWithoutSymbol,
                        productTotalAmount: productPriceTextWithoutSymbol
                    });
                }
                $("#cart-body").empty();
                let totalAmount = 0;
                let hrline = $('<hr>');
                let totalTextContainer = $("<div>", {
                    text: 'TOTAL'
                });
                let totalAmountContainer = $("<div>", {
                    text: totalAmount,
                    id: 'totalAmountContainer'
                });
                totalAmountContainer.css({
                    'grid-column': 'span 2'
                });
                let checkoutButtonContainer = $('<div>');
                checkoutButtonContainer.css("padding-top", "15px");
                checkoutButton = $('<input/>').attr({ type: 'button', name: 'checkoutButton', value: 'Check out', });

                let productTitleHeading = $("<div>", {
                    text: 'Product Name',
                    class: 'heading'
                });
                $("#cart-body").append(productTitleHeading);
                let productQuantityHeading = $("<div>", {
                    text: 'Product Quantity',
                    class: 'heading'
                });
                $("#cart-body").append(productQuantityHeading);
                let productPriceHeading = $("<div>", {
                    text: 'Product Price',
                    class: 'heading'
                });
                $("#cart-body").append(productPriceHeading);
                $.each(cartItems, function (index, item) {
                    let cartElementTitle = $("<div>");
                    $("#cart-body").append(cartElementTitle);
                    cartElementTitle.append(item.title);
                    let cartElementQuantity = $('<div>');
                    $("#cart-body").append(cartElementQuantity);
                    let decrementButton = $('<input/>').attr({ type: 'button', name: 'decrementButton', value: '-' });
                    cartElementQuantity.append(decrementButton);
                    decrementButton.click(function () {
                        item.itemquantity = item.itemquantity - 1;
                        quantityContainer.text(item.itemquantity);
                        item.productTotalAmount = item.productTotalAmount - item.price;
                        individualProductCost.text(item.productTotalAmount);
                        totalAmount = totalAmount - item.price;
                        console.log(totalAmount);
                        totalAmountContainer.text(totalAmount);
                        if (item.itemquantity < 1) {
                            cartElementTitle.remove();
                            cartElementQuantity.remove();
                            individualProductCost.remove();
                            cartItems = cartItems.filter(obj => obj.title !== item.title);
                            if (cartItems.length <= 0) {
                                checkoutButton.remove();
                                hrline.remove();
                                totalTextContainer.remove();
                                totalAmountContainer.remove();
                                productTitleHeading.remove();
                                productQuantityHeading.remove();
                                productPriceHeading.remove();
                            }
                        } else {
                            quantityContainer.text(item.itemquantity);
                        }
                    });
                    let quantityContainer = $('<span>', {
                        text: item.itemquantity,
                        id: 'Quantity-container',
                    });
                    cartElementQuantity.append(quantityContainer);
                    let incrementButton = $('<input/>').attr({ type: 'button', name: 'incrementButton', value: '+' });
                    cartElementQuantity.append(incrementButton);
                    incrementButton.click(function () {
                        item.itemquantity = item.itemquantity + 1;
                        quantityContainer.text(item.itemquantity);
                        item.productTotalAmount = item.productTotalAmount + item.price;
                        individualProductCost.text(item.productTotalAmount);
                        totalAmount = totalAmount + item.price;
                        console.log(totalAmount);
                        totalAmountContainer.text(totalAmount);
                    });
                    let individualProductCost = $("<span>", {
                        text: item.productTotalAmount
                    });
                    $("#cart-body").append(individualProductCost);
                    totalAmount = totalAmount + item.productTotalAmount;
                    totalAmountContainer.text(totalAmount);
                });
                if (cartItems.length > 0) {
                    $("#cart-body").append(hrline);
                    $("#cart-body").append(totalTextContainer);
                    $("#cart-body").append(totalAmountContainer);
                    $("#cart-body").append(checkoutButtonContainer);
                    checkoutButtonContainer.append(checkoutButton);
                }
            });

        }
    });
});