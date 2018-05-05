'use strict';
module.exports = (sequelize, DataTypes) => {
  var Aula = sequelize.define('Aula', {
    idAula: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nombre: DataTypes.STRING
  }, {});
  Aula.associate = function(models) {
    Aula.hasMany(models.Dicta, {
      as: 'dicta',
      foreignKey: {
        name: 'idAula', 
        allowNull: false 
      }
    });
  };
  return Aula;
};