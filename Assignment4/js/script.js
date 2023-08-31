// Question: Developing a Shopping Cart Page using jQuery
$(document).ready(function () {
  $("#searchbox").keyup(function () {
    let inputValue = $(this).val().toLowerCase();
    let allHidden = true;
    $("p").empty();
    $(".product").each(function () {
      let productName = $(this).find(".product-details .product-name").text().toLowerCase();
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
  let cartItems = [];
  $(".add-to-cart").click(function () {
    let productTitle = $(this).siblings('h2').text();

    const productDetails = $(this).parent();
    const productPrice = productDetails.siblings('.product-price').find('h2');
    const productPriceText = productPrice.text();
    let productPriceTextWithoutSymbol = productPriceText.replaceAll(/[^0-9\.-]+/g,'');
    console.log(productPriceTextWithoutSymbol);

    let quantity = 1;
    let itemFound = false;
    cartItems.forEach(item => {
      if (item.title === productTitle) {
        item.itemquantity++;
        itemFound = true;
      }
    });
    if (!itemFound) {
      cartItems.push({
        title: productTitle,
        itemquantity: quantity,
        price: productPriceTextWithoutSymbol
      });
    }
    $("#cart-items-container").empty();
    $.each(cartItems, function (index, item) {
      let cartElementTitle = $("<div>");
      $("#cart-items-container").append(cartElementTitle);
      cartElementTitle.append(item.title);
      let cartElementQuantity = $('<div>');
      $("#cart-items-container").append(cartElementQuantity);
      let decrementButton = $('<input/>').attr({ type: 'button', name: 'decrementButton', value: '-' });
      cartElementQuantity.append(decrementButton);
      decrementButton.click(function () {
        item.itemquantity = item.itemquantity - 1;
        if (item.itemquantity < 1) {
          cartElementTitle.remove();
          cartElementQuantity.remove();
          cartItems = cartItems.filter(obj => obj.title !== item.title);
          if (cartItems.length <= 0) {
            checkoutButton.remove();
          }
        } else {
          quantityContainer.text(item.itemquantity);
        }
      });
      let quantityContainer = $('<span>', {
        text: item.itemquantity,
        id: 'Quantity-container'
      });
      cartElementQuantity.append(quantityContainer);
      let incrementButton = $('<input/>').attr({ type: 'button', name: 'incrementButton', value: '+' });
      cartElementQuantity.append(incrementButton);
      incrementButton.click(function () {
        item.itemquantity = item.itemquantity + 1;
        quantityContainer.text(item.itemquantity);
        item.price = item.price*2;
        individualProductCost.text(item.price);
      });

      let individualProductCost = $("<span>", {
        text: item.price
      });
      $("#cart-items-container").append(individualProductCost);

    });
    if (cartItems.length > 0) {
      let hrline = $('<hr>').css({
        'background-color': 'black',
        'height': '2px',
        'width': '300px',
        'border': 'none'
      });
      // $("#cart-items-container").innerHTML(hrline);
      $("#cart-items-container").insertAdjacentElement("afterbegin", hrline);
      // let checkoutButtonContainer = $('<div>');
      // $("#cart-items-container").append(checkoutButtonContainer);
      // checkoutButtonContainer.css("padding-top", "15px");
      // checkoutButton = $('<input/>').attr({ type: 'button', name: 'checkoutButton', value: 'Check out', });
      // checkoutButtonContainer.append(checkoutButton);
    }
  });
});