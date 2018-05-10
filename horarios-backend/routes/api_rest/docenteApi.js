console.log('cargado docenteApi.js')

var models = require('../../models');

module.exports = app => {
    app.get('/docentes', function (req, res) {
        models.Docente.findAll().then(function (docentes) {
            res.status(200).json(docentes)
        }).catch(err => {
            console.log(err)
            res.status(500).json(err);
        });
    });

    app.post('/docentes', function (req, res) {
        models.Docente.create(req.body).then(docente => {
            res.status(201).json(docente);
        }).catch(err => {
            res.status(500).json(err);
        });
    });
}