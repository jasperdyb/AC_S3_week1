$('#inputRating').on('input', function (e) {
  val = $(e.currentTarget).val()
  $('#rating-value-label').text(val)
})