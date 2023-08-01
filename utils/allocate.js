const moment = require("moment");

//Sorting the arrays from the earliest to the latest
function sortArrays(salesOrders, purchaseOrders) {
  const sortedSales = salesOrders.sort((a, b) => {
    const da = new Date(a.created),
      db = new Date(b.created);
    return da - db;
  });

  const sortedPurchases = purchaseOrders.sort((a, b) => {
    const da = new Date(a.receiving),
      db = new Date(b.receiving);
    return da - db;
  });

  return [sortedSales, sortedPurchases];
}

//Setting the delivery date for each sale order
function organizeDeliveries(sortedSales, sortedPurchases) {
  const deliveries = [];
  let iSales = 0,
    iPurchases = 0,
    availableStock = 0,
    addStock = true;

  //Run this block of code until there are no more sales orders or stock
  while (iSales < sortedSales.length && iPurchases < sortedPurchases.length) {
    const purchase = sortedPurchases[iPurchases];
    const sale = sortedSales[iSales];
    let deliveryDate = new Date(purchase.receiving);

    if (addStock) availableStock += purchase.quantity;

    //Set delivery date if there's enough stock
    if (availableStock >= sale.quantity) {
      //The delivery date will depend on stock availability
      if (new Date(sale.created) > deliveryDate)
        deliveryDate = new Date(sale.created);
      deliveries.push({
        id: sale.id,
        date: moment(deliveryDate).add(1, "days").format("YYYY-MM-DD"),
      });
      availableStock -= sale.quantity;
      iSales += 1;
      addStock = false;
    }
    //Otherwise, wait for more stock to arrive.
    else {
      addStock = true;
      iPurchases += 1;
    }
  }
  return deliveries;
}

function allocate(salesOrders, purchaseOrders) {
  const [sortedSales, sortedPurchases] = sortArrays(
    salesOrders,
    purchaseOrders
  );
  return organizeDeliveries(sortedSales, sortedPurchases);
}

module.exports = allocate;
