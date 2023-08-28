// Question: Developing a Shopping Cart Page using jQuery
$(document).ready(function () {
  $("#searchbox").keyup(function () {
    let inputValue = $(this).val().toLowerCase();
    var allHidden = true;
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
      let cartElementTitle = $("<div>");
      $("#cart-body").append(cartElementTitle);
      cartElementTitle.append(item.title);
      let cartElementQuantity = $("<div>");
      $("#cart-body").append(cartElementQuantity);
      let decrementButton = $('<input/>').attr({ type: 'button', name: 'decrementButton', value: '-' });
      cartElementQuantity.append(decrementButton);
      decrementButton.click(function () {
        item.itemquantity = item.itemquantity - 1;
        if (item.itemquantity < 1) {
          cartElementTitle.remove();
          cartElementQuantity.remove();
          cartItems = cartItems.filter(obj => obj.title !== item.title);
        } else {
          quantityContainer.text(item.itemquantity);
        }
      });
      let quantityContainer = $("<span>", {
        text: item.itemquantity,
        id: "Quantity-container"
      });
      cartElementQuantity.append(quantityContainer);
      let incrementButton = $('<input/>').attr({ type: 'button', name: 'incrementButton', value: '+' });
      cartElementQuantity.append(incrementButton);
      incrementButton.click(function () {
        item.itemquantity = item.itemquantity + 1;
        quantityContainer.text(item.itemquantity);
      });
    });
  });
});