let deleteButton = document.getElementById("delete_button")


function toggleDeletion() {
  console.log($(".delete-button"))

  $(".delete-button").toggle(function () {
    $("#user_button").css({ display: 'none' });
  }, function () {
    $("#user_button").css({ display: 'block' });
  });
}

deleteButton.addEventListener('click', toggleDeletion)