const form = document.getElementById('vote-form');


const uri = 'http://localhost:3000/poll';



//Создаем слушателя события формы.
//Слушаем событие submit 
form.addEventListener('submit', (e) => {

    const choice = document.querySelector('input[name=os]:checked').value;

    const data = { os: choice };


    //Получение XMLHttpRequest
    fetch(uri, {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        //Тут выводим в консоль результат выбора
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));

    e.preventDefault();
});


//Получение XMLHttpRequest
fetch(uri, {
    method: 'get',
    body: JSON.stringify(data),
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
}).then(res => res.json())
.then(data => console.log(data))
.catch(err => console.log(err));
    //Тут выводим в консоль результат выбора
    





//***************************** CanvasJS*******************************/

//Изначальные точки графика
let dataPoints = [
    { label: 'Windows', y: 0 },
    { label: 'MacOs', y: 0 },
];

//Поле внизу выборы
const chartContainer = document.querySelector('#chartContainer');

if (chartContainer) {
    const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'theme1',
        title: {
            text: 'OS results'
        },
        data: [
            {
                type: 'column',
                dataPoints: dataPoints
            }
        ]
    });

    
    function ChangeChart(osvote) {
        dataPoints = dataPoints.map(x => {
            //Вытаскиваем название label из dataPoints
            if (x.label == osvote) {
                //x.y += data.points;
                x.y += 1;
                return x;
            } else {
                return x;
            }
        });
    }
    ChangeChart("MacOs");
    chart.render();
}