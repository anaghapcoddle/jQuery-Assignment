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
  let totalAmountContainer;
  $(".add-to-cart").click(function () {
    let productTitle = $(this).siblings('h2').text();
    const productDetails = $(this).parent();
    const productPrice = productDetails.siblings('.product-price').find('h2');
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
        totalAmountContainer.text(totalAmount);
        console.log(totalAmount);
        if (item.itemquantity < 1) {
          cartElementTitle.remove();
          cartElementQuantity.remove();
          individualProductCost.remove();
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
    });
    if (cartItems.length > 0) {
      let hrline = $('<hr>').css({
        'background-color': 'black',
        'height': '2px',
        'width': '350px',
        'border': 'none',
        'grid-column': 'span 3'
      });
      $("#cart-body").append(hrline);
      let totalTextContainer = $("<div>", {
        text: 'TOTAL'
      });
      $("#cart-body").append(totalTextContainer);
      let totalAmountContainer = $("<div>", {
        text: totalAmount,
        id: 'totalAmountContainer'
      });
      totalAmountContainer.css({
        'grid-column': 'span 2'
      });
      $("#cart-body").append(totalAmountContainer);
      let checkoutButtonContainer = $('<div>');
      $("#cart-body").append(checkoutButtonContainer);
      checkoutButtonContainer.css("padding-top", "15px");
      checkoutButton = $('<input/>').attr({ type: 'button', name: 'checkoutButton', value: 'Check out', });
      checkoutButtonContainer.append(checkoutButton);
    }
  });
});