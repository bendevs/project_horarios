console.log("cargado horariosApi.js");

var models = require("../../models");

module.exports = app => {
  app.get("/horarios", function(req, res) {
    models.Dicta.findAll()
      .then(function(horarios) {
        res.status(200).json(horarios);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  app.get("/horarios/:id", function(req, res) {
    const idAula = req.params.id;

    models.Dicta.findAll({
      where: {
        idAula: idAula
      }
    })
      .then(function(aula) {
        if (aula === null) {
          const error = {
            codigo: 1,
            mensaje: `Error. No se pudo encontrar alguna aula con el idAula: ${idAula}`
          };
          res.status(404).json(error);
        } else {
          res.status(200).json(aula);
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

  app.post("/horarios", function(req, res) {
    console.log("req.body", req.body);

    let horarioBuscado = models.Dicta.findOne({
      where: {
        idAula: req.body.idAula,
        idMateria: req.body.idMateria,
        dia: req.body.dia,
        hora_inicio: req.body.hora_inicio,
        hora_fin: req.body.hora_fin
      }
    }).then(horario => {
      console.log("then->horario->", horario);

      if (horario === null) {
        // no existe
        models.Dicta.create(req.body)
          .then(horario => {
            console.log("create:horario:", horario);
            res.status(201).json(horario);
          })
          .catch(err => {
            console.log("horarioBuscado:", req.body);
            let dia = req.body.dia;
            let hora_inicio = req.body.hora_inicio;
            let hora_fin = req.body.hora_fin;
            let horario_text = `${hora_inicio} - ${hora_fin}`;

            let error = {
              codigo: 1001,
              error:
                "Lo siento no se puede registrar un horario en: " +
                horario_text +
                " para el dia " +
                dia
            };
            console.log(error);
            res.status(403).send(error);
          });
      } else {
        // YA existe, no se aceptan duplicados
        console.log("horarioBuscado:", req.body);
        let dia = req.body.dia;
        let hora_inicio = req.body.hora_inicio;
        let hora_fin = req.body.hora_fin;
        let horario_text = `${hora_inicio} - ${hora_fin}`;

        let error = {
          codigo: 1001,
          error:
            "Lo siento no se puede registrar un horario en: " +
            horario_text +
            " para el dia " +
            dia
        };
        console.log(error);
        res.status(403).send(error);
      }
    });
  });
};
