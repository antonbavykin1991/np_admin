import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  orders: [],

  isPaid: true,

  startAt: Ember.computed({
    get() {
      const currentDate = new Date()
      const day = currentDate.getDate()
      const month = currentDate.getMonth()

      if (day < 10) {
        currentDate.setMonth(month - 1)
        currentDate.setDate(10)
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

  filteredOrders: Ember.computed('orders.[]', 'isPaid', function () {
    const orders = this.get('orders').toArray()
    const filteredOrders = []

    const isPaid = this.get('isPaid')

    orders.forEach((order) => {
      if (isPaid) {
        if (Ember.get(order, 'isPaid') === true) {
          filteredOrders.push(order)
        }
      } else {
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
        value: groupedOrdersObject[key]
      })
    }

    return groupedOrders
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
  })
});
