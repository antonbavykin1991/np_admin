import Ember from 'ember';

export function productTotalPrice([productRequests = []]) {
  let price = 0

  if (!productRequests) { return price }

  productRequests.toArray().forEach((productRequest) => {
    const totalPrice = productRequest.get('totalPrice')

    if (totalPrice) {
      price += totalPrice
    }
  });

  return price
}

export default Ember.Helper.helper(productTotalPrice);
