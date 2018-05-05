'use strict';
module.exports = (sequelize, DataTypes) => {
  var Materia = sequelize.define('Materia', {
    idMateria: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    idDocente: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    nombre: DataTypes.STRING
  }, {});
  Materia.associate = function(models) {
    Materia.belongsTo(models.Docente, {
      as: 'docente',
      onDelete: "CASCADE",
      foreignKey: {
        name: 'idDocente',
        allowNull: false
      }
    });
  };
  return Materia;
};