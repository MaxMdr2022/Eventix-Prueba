const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('ticket', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
      primaryKey: true
    },
    QR: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    event: {
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING, 
      allowNull: false,
    },  
  });
};

//PREGUNTAR A ALFRED !!!!!