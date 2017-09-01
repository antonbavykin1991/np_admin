import Ember from 'ember';

import {productTotalPrice} from 'np-admin/helpers/product-total-price';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  orders: [],

  users: [],

  isPaid: true,

  cashOnly: false,

  showPaymentFilters: true,

  showUserFilter: false,

  userId: null,

  showHookahSalary: false,

  totalPriceKey: Ember.computed('showHookahSalary', function () {
    return this.get('showHookahSalary') ? 'hookahPrice' : 'totalPrice';
  }),

  colspan: Ember.computed('showHookahSalary', function () {
    return this.get('showHookahSalary') ? 8 : 7;
  }),

  startAt: Ember.computed({
    get() {
      const currentDate = new Date()
      const day = currentDate.getDate()
      const month = currentDate.getMonth()

      if (day > 10) {
        currentDate.setDate(10)
      } else {
        currentDate.setMonth(month - 1)
      }

      currentDate.setMinutes(0)
      currentDate.setSeconds(0)
      currentDate.setHours(10)

      return currentDate
    }
  }),

  endAt: Ember.computed({
    get() {
      const currentDate = new Date()
      const day = currentDate.getDate()

      currentDate.setMinutes(0)
      currentDate.setSeconds(0)
      currentDate.setHours(10)
      currentDate.setDate(day + 1)

      return currentDate
    }
  }),

  filteredOrders: Ember.computed('orders.[]', 'isPaid', 'cashOnly', 'userId', 'showUserFilter', function () {
    const orders = this.get('orders').toArray()
    const filteredOrders = []

    const isPaid = this.get('isPaid')
    const cashOnly = this.get('cashOnly')
    const userId = this.get('userId')
    const showUserFilter = this.get('showUserFilter');

    orders.forEach((order) => {
      let pushForCashOnly = !cashOnly ? true : false;
      let pushForIsPaid = !isPaid ? true : false;
      let pushForUserId = true;

      if (cashOnly) {
        if (Ember.get(order, 'cashOnly') === true) {
          pushForCashOnly = true;
        }
      }

      if (isPaid) {
        if (Ember.get(order, 'isPaid') === true) {
          pushForIsPaid = true;
        }
      }

      if (showUserFilter || userId) {
        pushForUserId = Ember.get(order, 'user.id') === userId
      }

      if (pushForCashOnly && pushForIsPaid && pushForUserId) {
        filteredOrders.push(order)
      }
    })

    return filteredOrders.sortBy('createdAt')
  }),


  groupedOrders: Ember.computed('filteredOrders.[]', function () {
    const filteredOrders = this.get('filteredOrders').toArray()
    const groupedOrdersObject = {}
    const groupedOrders = []

    filteredOrders.forEach((order) => {
      const date = order.get('createdAt')
      const key = moment(date).format('DD/MM/YYYY')

      if (!groupedOrdersObject[key]) {
        groupedOrdersObject[key] = []
      }

      groupedOrdersObject[key].push(order)
    })

    if (Ember.isEmpty(groupedOrdersObject)) { return groupedOrders }

    for (let key in groupedOrdersObject) {
      groupedOrders.push({
        key: key,
        value: groupedOrdersObject[key],
        totalPrice: productTotalPrice([groupedOrdersObject[key]])
      })
    }

    return groupedOrders
  }),

  barValues: Ember.computed('groupedOrders.[]', 'startAt', 'endAt', function () {
    const {
      groupedOrders,
      startAt,
      endAt
    } = this.getProperties('groupedOrders', 'startAt', 'endAt')

    if (!groupedOrders.length) { return []}

    const daysBetween = parseInt((endAt - startAt) / (1000 * 60 * 60 * 24))
    const dates = {}
    const barValues = []

    for (let i = 0; i < daysBetween; i++) {
      const date = new Date(startAt);
      const day = date.getDate()

      date.setDate(day + i)
      dates[moment(date).format('DD/MM/YYYY')] = 0
    }

    groupedOrders.toArray().forEach(order => {
      if (typeof dates[order.key] !== 'undefined') {
        dates[order.key] = order.totalPrice;
      }
    });

    for (let i in dates) {
      barValues.push(dates[i]);
    }

    return barValues;
  }),

  onSelection(key, value) {
    this.set(key, value)
  },

  getOrders() {
    let {
      startAt,
      endAt
    } = this.getProperties('startAt', 'endAt')

    startAt = startAt || new Date()
    endAt = endAt || new Date()

    this.get('store').query('product-request', {
      orderBy: 'createdAt',
      startAt: (new Date(startAt)).toISOString(),

      endAt: (new Date(endAt)).toISOString(),
    }).then((productRequests) => {
      this.set('orders', productRequests)
    })
  },

  didInsertElement() {
    this._super(...arguments)

    this.getOrders()
  },

  onChangeDate: Ember.observer('startAt', 'endAt', function () {
    this.getOrders()
  }),

  print () {
    console.log('print')
  }
});
