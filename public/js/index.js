
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

$('#delete_toggle').click(function () {
  $(".delete-button").toggle(function () {
    $(".delete-button").css({ display: 'none' })
  }, function () {
    $(".delete-button").css({ display: 'block' })
  })
})

$('.delete-button').click(function (e) {
  e.stopPropagation()
  id = $(e.currentTarget).data('restaurant_id')
  $("#deletion").modal()
  $('#deletion-confirm').attr('action', `/restaurants/${id}/delete?_method=DELETE`)
})

$('#sort-method').change(function (e) {
  e.preventDefault()
  method = $(e.currentTarget).val()
  console.log(method)
  this.form.submit()
})
