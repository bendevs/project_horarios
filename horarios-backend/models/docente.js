'use strict';
module.exports = (sequelize, DataTypes) => {
  var Docente = sequelize.define('Docente', {
    idDocente: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nombre: DataTypes.STRING,
    paterno: DataTypes.STRING,
    materno: DataTypes.STRING
  }, {});
  Docente.associate = function(models) {
    Docente.hasMany(models.Materia, {
      as: 'materia',
      foreignKey: {
        name: 'idDocente', 
        allowNull: false 
      }
    });
  };
  return Docente;
};