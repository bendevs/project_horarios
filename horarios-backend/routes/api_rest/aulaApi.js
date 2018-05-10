console.log('cargado aulaApi.js')

var models = require('../../models');

module.exports = app => {
    debugger;
    // salas
    app.get('/aulas', function (req, res) {
        models.Aula.findAll().then(function (aulas) {
            res.status(200).json(aulas)
        }).catch(err => {
            console.log(err)
            res.status(500).json(err);
        });
    });

    app.post('/aulas', function (req, res) {
        models.Aula.create(req.body).then(aula => {
            res.status(201).json(aula);
        }).catch(err => {
            res.status(500).json(err);
        });
    });
}