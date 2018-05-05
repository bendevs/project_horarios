'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Dicta', {
      idAula: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Aulas",
          key: "idAula"
        }
      },
      idMateria: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Materia",
          key: "idMateria"
        }
      },
      dia: {
        type: Sequelize.STRING
      },
      hora_inicio: {
        type: Sequelize.STRING
      },
      hora_fin: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Dicta');
  }
};