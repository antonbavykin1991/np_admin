import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['mini-charts-item'],

  values: [1,2,3,4,5,6,7,8,9,10,3,4,3],

  type: 'bar',

  height: '35px',

  width: '50px',

  barWidth: 3,

  barColor: '#d6d8d9',

  barSpacing: 2,

  didRender() {
    const {
      values,
      type,
      height,
      width,
      barWidth,
      barColor,
      barSpacing,
    } = this.getProperties('values', 'type', 'width', 'height', 'barWidth', 'barColor', 'barSpacing');

    this.$('.stats-bar').sparkline(values, {
      type: type,
      height: height,
      width: width,
      barWidth: barWidth,
      barColor: barColor,
      barSpacing: barSpacing
    })
  }
});
