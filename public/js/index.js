
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

$('#delete_toggle').click(function () {
  $(".delete-button-form").toggle(function () {
    $(".delete-button-form").css({ display: 'none' })
  }, function () {
    $(".delete-button-form").css({ display: 'block' })
  })
})

$('.delete-button').click(function (e) {
  e.stopPropagation()
  id = $(e.currentTarget).data('restaurant_id')
  console.log($(e.currentTarget).data('restaurant_id'))
  $("#deletion").modal()
  $('#deletion-confirm').attr('action', `/${id}/delete`)
})

