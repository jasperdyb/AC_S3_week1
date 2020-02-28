$('#inputRating').on('input', function (e) {
  console.log($(e.currentTarget).val())
  val = $(e.currentTarget).val()
  $('#rating-value-label').text(val)
})