$('#inputRating').on('input', function (e) {
  const val = $(e.currentTarget).val()
  $('#rating-value-label').text(val)
})