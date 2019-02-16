//Client Mode

const form = document.getElementById('vote-form');
var event;
var clearBtn = document.getElementById('clearBtn');

//Так как мы работаем и с локальной и с интернетом то нужно проверять где мы сейчас находимся
function checkUri(UrlForCheck) {
    if (UrlForCheck === "localhost:3000") {
        uriCorrect = "http://localhost:3000/poll";
        return uriCorrect;
    } else if (UrlForCheck === "pollfoxy.herokuapp.com") {
        uriCorrect = "https://pollfoxy.herokuapp.com/poll";
        return uriCorrect;
    }
}

//const uri = checkUri(window.location.host);
const uri = window.location.origin+"/poll";

//Создание XMLHttpRequest запросом get 
function getVotes(uri) {
    fetch(uri)
        .then(res => res.json())
        .then(data => {

            //Получаем голоса при запросе get
            let votes = data.votes;
            //Так как мы получаем массив данных то нам нужно посчитать количество проголосоваших
            let totalVotes = votes.length;
            document.querySelector('#chartTitle').textContent = `Total Votes: ${totalVotes}`;

            //***************************** CanvasJS*******************************/

            let voteCounts = {
                Windows: 0,
                Macos: 0,
            }

            //Преобразование массива 
            //acc[vote.os] - аккумуляция голосов 
            //если в переменное что то есть то мы берем это если нет то ноль и добавляем из
            //существующего массива к нашему нынешнему
            voteCounts = votes.reduce((acc, vote) => (
                (acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.point)), acc),
                {}
            );

            //Изначальные точки графика
            let dataPoints = [
                { label: 'Windows', y: voteCounts.Windows },
                { label: 'Macos', y: voteCounts.Macos },
            ];

            //Поле внизу выборы
            const chartContainer = document.querySelector('#chartContainer');

            if (chartContainer) {

                // Listen for the event.
                document.addEventListener('votesAdded', function (e) {
                    document.querySelector('#chartTitle').textContent = `Total Votes: ${e.detail.totalVotes}`;
                });


                /*Изначально без дошедшего события создается график - пока просто пустой график*/
                const chart = new CanvasJS.Chart('chartContainer', {
                    animationEnabled: true,
                    theme: 'theme1',
                    title: {
                        text: 'OS results'
                    },
                    data: [
                        {
                            type: 'column',
                            dataPoints: dataPoints,
                        }

                    ]
                });
                chart.render();

                // Enable pusher logging - don't include this in production
                Pusher.logToConsole = true;

                var pusher = new Pusher('77eadd41f0797f105b75', {
                    cluster: 'ap2',
                    forceTLS: true
                });


                var channel = pusher.subscribe('os-poll');

                channel.bind('os-vote', function (data) {
                    //Точки графика 
                    dataPoints.forEach((point) => {
                        if (point.label == data.os) {
                            point.y += data.point;
                            totalVotes += data.point;
                            event = new CustomEvent('votesAdded', { detail: { totalVotes: totalVotes } });
                            // Dispatch the event.
                            document.dispatchEvent(event);
                        }
                    });
                    chart.render();
                });
            }
        })
        .catch(err => console.log(err));
}


//Создаем слушателя события формы.
//Слушаем событие submit 
form.addEventListener('submit', (e) => {

    const choice = document.querySelector('input[name=os]:checked').value;

    const data = { os: choice };

    //Создание XMLHttpRequest post
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


        getVotes(uri);

    e.preventDefault();


});


clearBtn.addEventListener('click', (e) => {

 //Отправляю запрос на удаление
 fetch(uri+'/delete', {
    method: 'get',
})
    //Тут выводим в консоль результат выбора
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));

e.preventDefault();
    //***************************** CanvasJS*******************************/

    let voteCounts = {
        Windows: 0,
        Macos: 0,
    }


    //Изначальные точки графика
    let dataPoints = [
        { label: 'Windows', y: voteCounts.Windows },
        { label: 'Macos', y: voteCounts.Macos },
    ];

    //Поле внизу выборы
    const chartContainer = document.querySelector('#chartContainer');

    if (chartContainer) {

        // Listen for the event.
        document.addEventListener('votesAdded', function (e) {
            document.querySelector('#chartTitle').textContent = `Total Votes: ${e.detail.totalVotes}`;
        });


        /*Изначально без дошедшего события создается график - пока просто пустой график*/
        const chart = new CanvasJS.Chart('chartContainer', {
            animationEnabled: true,
            theme: 'theme1',
            title: {
                text: 'OS results'
            },
            data: [
                {
                    type: 'column',
                    dataPoints: dataPoints,
                }

            ]
        });
        chart.render();
}
});

getVotes(uri);