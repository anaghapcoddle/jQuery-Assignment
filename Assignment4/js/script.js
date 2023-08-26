// Question: Developing a Shopping Cart Page using jQuery
$(document).ready(function () {
  
  $("#searchbox").keyup(function () {
    let inputValue = $(this).val();

    $(".product").each(function () {
      let productName = $(this).find(".product-details .product-name").text();
      let productFound;
      if (productName.includes(inputValue)) {
        $(this).show();
        productFound = true;
      }
      else {
        $(this).hide();
      }
    });
  })

  let cartItems = [];

  $(".add-to-cart").click(function () {

    let productTitle = $(this).siblings('h2').text();
    let quantity = 1;

    if (cartItems.some(obj => obj.title === productTitle)) {
      console.log("Yes");
    } else {
      cartItems.push({
        title: productTitle,
        itemquantity: quantity
      });
    }

    $("#cart-body").empty();

    $.each(cartItems, function (index, item) {

      let cartElement = $("<div>");
      $("#cart-body").append(cartElement);
      cartElement.append(item.title);

      let decrementButton = $('<input/>').attr({ type: 'button', name: 'decrementButton', value: '-' });
      cartElement.append(decrementButton);

      decrementButton.click(function () {
        item.itemquantity = item.itemquantity - 1;
        if (item.itemquantity < 1) {
          cartElement.remove();
        } else {
          quantityContainer.text(item.itemquantity);
        }
      });

      let quantityContainer = $("<span>", {
        text: item.itemquantity,
        id: "Quantity-container"
      });

      cartElement.append(quantityContainer);

      let incrementButton = $('<input/>').attr({ type: 'button', name: 'incrementButton', value: '+' });
      cartElement.append(incrementButton);

      incrementButton.click(function () {
        item.itemquantity = item.itemquantity + 1;
        quantityContainer.text(item.itemquantity);
      });

      let lineBreak = $('<br>')
      cartElement.append(lineBreak);
    });
  });

});