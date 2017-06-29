import Ember from 'ember';
let swal = window.swal;

export default Ember.Component.extend({
  store: Ember.inject.service(),

  actions: {
    addProductToOrder(place, product) {
      place.createProductRequest(product)
    },

    deleteProductRequest(productRequestId, place) {
      swal({
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel plx!",
        closeOnConfirm: false,
        closeOnCancel: false
      }, (isConfirm) => {
        if (isConfirm) {
          place.deleteProductRequest(productRequestId).then(() => {
            swal("Deleted!", "Your imaginary file has been deleted.", "success")
          })
        } else {
          swal("Cancelled", "Cancelled by you", "error")
        }
      })
    },

    changeQuantity(productRequest, increment) {
      productRequest.changeQuantity(increment)
    },

    changeDiscount(productRequest) {
      swal({
        title: "Discount form",
        text: "Change discount:",
        type: "input",
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "Write something"
      }, (inputValue) => {
        if (inputValue === false) return false;

        if (inputValue === "" || inputValue * 0 !== 0) {
          swal.showInputError("You need to write something!")
          return false
        }

        productRequest.changeDiscount(inputValue).then(() => {
          swal("Discount Changed", "You wrote: " + inputValue, "success")
        })
      })
    },

    changeDiscountForAllProductRequests(place) {
       swal({
        title: "Discount form",
        text: "Change discount:",
        type: "input",
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "Write something"
      }, (inputValue) => {
        if (inputValue === false) return false;

        if (inputValue === "" || inputValue * 0 !== 0) {
          swal.showInputError("You need to write something!")
          return false
        }

        place.changeDiscount(inputValue).then(() => {
          swal("Discount Changed", "You wrote: " + inputValue, "success")
        })
      })
    },

    archiveProductsRequests(place) {
      swal({
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, arhive it!",
        cancelButtonText: "No, cancel plx!",
        closeOnConfirm: false,
        closeOnCancel: false
      }, (isConfirm) => {
        if (isConfirm) {
          place.archiveProductsRequests().then(() => {
            swal("Archived!", "Your imaginary file has been deleted.", "success")
          })
        } else {
          swal("Cancelled", "Cancelled by you", "error")
        }
      })
    }
  }
});
