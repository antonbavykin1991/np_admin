import Ember from 'ember';

export function productTotalPrice([productRequests = [], key='totalPrice']) {
  let price = 0

  if (!productRequests) { return price }

  productRequests.toArray().forEach((productRequest) => {
    const totalPrice = productRequest.get(key)

    if (totalPrice) {
      price += totalPrice
    }
  });

  return price
}

export default Ember.Helper.helper(productTotalPrice);
