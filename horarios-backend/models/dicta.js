'use strict';
module.exports = (sequelize, DataTypes) => {
  var Dicta = sequelize.define('Dicta', {
    idAula: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    idMateria: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    dia: DataTypes.STRING,
    hora_inicio: DataTypes.STRING,
    hora_fin: DataTypes.STRING
  }, {});
  Dicta.associate = function(models) {
    Dicta.belongsTo(models.Aula, {
      as: 'aula',
      onDelete: "CASCADE",
      foreignKey: {
        name: 'idAula',
        allowNull: false
      }
    });
    Dicta.belongsTo(models.Materia, {
      as: 'materia',
      onDelete: "CASCADE",
      foreignKey: {
        name: 'idMateria',
        allowNull: false
      }
    });
  };
  return Dicta;
};