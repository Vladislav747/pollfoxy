console.log('Works');

function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
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
      //Выводим всю информацию в блоке
      console.log(data);
      var arr2 = "";
      data.forEach(element => {
        console.log(element.os);
        if(typeof element.os !== "undefined"){
        arr2 += '<tr><td>'+element.os+'</td></tr>';
        }
      });
      console.log(arr2);
      document.querySelector('.main__content_result').innerHTML = '<table class="asde">'+arr2+'</table>';
      

    })
}





var exampleBtn = document.getElementById("example");
// $( "#example" ).on( "click", getVotes());
exampleBtn.addEventListener("click", getVotes);