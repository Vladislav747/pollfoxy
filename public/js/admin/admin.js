console.log('Works');

function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    //Время окончания куки
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}


function getVotes() {

  fetch("http://localhost:3000/admin/list/")
    .then((res) => res.json())
    .then(function (data) {
      //Выводим всю информацию о голосах в блоке
      var arr2 = "";
      arr2 = '<thead><tr>Результаты голосования</tr></thead>';
      arr2 += '<thead><tr><th scope="col">Номер результата</th><th scope="col">Тип операционной системы</th></tr></thead>';
      arr2 += '<tbody>';
      data.forEach((element, i) => {
        console.log(element.os);
        if (typeof element.os !== "undefined") {

          arr2 += '<tr><th scope="row">' + i + '</th><td>' + element.os + '</td></tr>';
        }
      });
      console.log(arr2, "Without tbody");
      arr2 += '</tbody>';
      console.log(arr2, "with tbody");
      var result = document.querySelector('.main__content_result');
      result.innerHTML = '<table class="table">' + arr2 + '</table>';
    })
}

function filterVotes() {
  console.log("FilterWorks");
  var items = $('.table tbody tr');
  if(!$('#collapseExample').hasClass("show")){
    console.log("Error no table");
    alert("Не подгружена таблица");
    return;
  }
  var exampleText = searchForm.value;
  if (searchForm.value != "") {
    for (i = 0; i < items.length; i++) {
      items[i].style.display = "none";
      td = items[i].getElementsByTagName("td");
      if (td[0].innerHTML.toUpperCase().indexOf(exampleText.toUpperCase()) > -1) {
        items[i].style.display = "";
      }
    }
  } else {
    for (i = 0; i < items.length; i++) {
      items[i].style.display = "";
    }
  }
}



//Вывод результатов
var exampleBtn = document.getElementById("example");
exampleBtn.addEventListener("click", getVotes);
//Фильтрация элементов
var searchForm = document.getElementById('searchForm');
searchForm.onkeyup = filterVotes;
