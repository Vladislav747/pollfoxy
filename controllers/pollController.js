
//Наша модель mongoose
const Vote = require('../models/Vote');

class PollController {

    constructor() {

    }

    //Get all users
    list(res) {
        this.res = res;
        //Находим нашу модель Данных с помощью метода find();
        Vote.find()
            .then(votes => res.status(200).json({ success: true, votes: votes }))
            .catch(err => {
                console.log(err);
                throw new Error("Ошибка в методе удаления данных", e);
            });
    }

    deleteAll(res) {
        this.res = res;
        Vote.deleteMany()
            .then(() => res.status(200).json({ success: true, delete: true, message: "All Votes were deleted", votes: 0 }))
            .catch(err => {
                console.log(err);
                throw new Error("Ошибка в методе удаления данных", e);
            });
    }

    addVote(req, res, pusher) {
        this.res = res;
        this.req = req;

        const newVote = {
            os: req.body.os,
            point: 1,
        };

        console.log(req.body, "Наш запрос");

        //в нашу модель Vote сохраняем данные newVote согласно схеме данных
        new Vote(newVote).save()
            .then(vote => {
                //Генерируем событие os-vote с каналом os-poll на весь документ с обновлением графика
                pusher.trigger('os-poll', 'os-vote', {
                    //point не делаю +1 так как он возвращает и прошлое количество то же по каждой операционке
                    point: parseInt(vote.point),
                    os: req.body.os,
                });
                  res.json({ success: true, message: "Спасибо ответ дошел" })
            })
           
              
            .catch(e => {
                if (e.name == 'URIError') {
                    throw new ReadError("Ошибка в URI", e);
                  } else if (e.name == 'SyntaxError') {
                    throw new ReadError("Синтаксическая ошибка в данных", e);
                  } else {
                    throw e; // пробрасываем
                  } 
    })
    }

}



module.exports = PollController;