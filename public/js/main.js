//Client Mode
var event;
const form = document.getElementById('vote-form');
var clearBtn = document.getElementById('clearBtn');
//Поле внизу выборы
const chartContainer = document.querySelector('#chartContainer');
//Наш запрос
const uri = window.location.origin + "/poll";

/**
 * Создает и возвращает объект графика  
 * 
 * @param  {array} votes
 * @param  {object} chartContainer
 * @param  {string} action
 * @param  {number} totalVotes
 */
function drawCanvasJs(votes, chartContainer, action, totalVotes) {

    let voteCounts = {
        Windows: 0,
        Macos: 0,
    };

    if (action == "getVotes") {

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

        // Listen for the event.
        document.addEventListener('votesAdded', function (e) {
            document.querySelector('#chartTitle').textContent = `${totalVotes}`;
        });

        //Изначально без дошедшего события создается график - пока просто пустой график
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

        return chart;

    } else if (action == "deleteVotes") {

        //Изначальные точки графика
        let dataPoints = [
            { label: 'Windows', y: voteCounts.Windows },
            { label: 'Macos', y: voteCounts.Macos },
        ];

        //Слушаем событие votesAdded
        document.addEventListener('votesAdded', function (e) {
            document.querySelector('#chartTitle').textContent = `${totalVotes}`;
        });

        //Изначально без дошедшего события создается график - пока просто пустой график
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

        return chart;

    } else if (action == "addVotes") {

        /*Преобразование массива 
          acc[vote.os] - аккумуляция голосов 
          если в переменное что то есть то мы берем это если нет то ноль и добавляем из
          существующего массива к нашему нынешнему*/
        voteCounts = votes.reduce((acc, vote) => (
            (acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.point)), acc),
            {}
        );

        //Изначальные точки графика
        let dataPoints = [
            { label: 'Windows', y: voteCounts.Windows },
            { label: 'Macos', y: voteCounts.Macos },
        ];

        //Библиотека Pusher для создания каналов внутри потока
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

}

/**
 * Создание XMLHttpRequest запросом get 
 * 
 * @param  {string} uri
 */
function getVotes(uri) {

    fetch(uri)
        .then(res => res.json())
        .then(data => {

            //Получаем голоса при запросе get
            let votes = data.votes;
            //Так как мы получаем массив данных то нам нужно посчитать количество проголосоваших
            let totalVotes = votes.length;
            document.querySelector('#chartTitle').textContent = `${totalVotes}`;

            //***************************** CanvasJS*******************************/

            chart = drawCanvasJs(votes, chartContainer, "getVotes", totalVotes);
            chart.render();

        })
        .catch(err => console.log(err));
}

/*Создаем слушателя события формы.
Слушаем событие submit*/
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
        .then(data => {
            //Получаем голоса при запросе get
            let votes = data.votes;
            //Так как мы получаем массив данных то нам нужно посчитать количество проголосоваших
            let totalVotes = votes.length;
            document.querySelector('#chartTitle').textContent = `${totalVotes}`;
            drawCanvasJs(votes, chartContainer, "addVotes", totalVotes);
        }
        )
        .catch(err => console.log(err));

    getVotes(uri);

    e.preventDefault();

});

/*Создаем слушателя события кнопки Clear
Слушаем событие submit*/
clearBtn.addEventListener('click', (e) => {

    //Отправляю запрос на удаление
    fetch(uri + '/delete', {
        method: 'delete',
    })
        //Тут выводим в консоль результат выбора
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));

    e.preventDefault();

    //***************************** CanvasJS*******************************/

    votes = [];
    chart = drawCanvasJs(votes, chartContainer, "deleteVotes");
    chart.render();
});

document.addEventListener('load', getVotes(uri));