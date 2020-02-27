let deleteButton = document.getElementById("delete_button")


function toggleDeletion() {
  // console.log($(".delete-button"))

  $(".delete-button-form").toggle(function () {
    $("#user_button").css({ display: 'none' });
  }, function () {
    $("#user_button").css({ display: 'block' });
  });
}

$('.delete-button').click(function (e) {
  e.stopPropagation();
  console.log($(e.currentTarget).data('restaurant_id'))
  $("#deletion").modal();
});

$(document).ready(function () {
  jQuery('[data-toggle="tooltip"]').tooltip();
});


deleteButton.addEventListener('click', toggleDeletion)