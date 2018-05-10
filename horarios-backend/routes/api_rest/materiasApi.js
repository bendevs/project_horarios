console.log('cargado materiasApi.js')

var models = require('../../models');

module.exports = app => {
    app.get('/materias', function (req, res) {
        models.Materia.findAll().then(function (materias) {
            res.status(200).json(materias)
        }).catch(err => {
            console.log(err)
            res.status(500).json(err);
        });
    });

    app.post('/materias', function (req, res) {
        models.Materia.create(req.body).then(materia => {
            res.status(201).json(materia);
        }).catch(err => {
            res.status(500).json(err);
        });
    });
}