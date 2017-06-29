import Ember from 'ember'

export function activePlace([place, activePlace]) {
  return place === activePlace
}

export default Ember.Helper.helper(activePlace)
