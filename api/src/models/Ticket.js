const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('ticket', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
      primaryKey: true
    },
    // QR: {
    //   type: DataTypes.STRING, 
    //   allowNull: false,
    // },
    event: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false
    },
    typeTicket: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // date: {
    //   type: DataTypes.STRING,
    //   // allowNull: false
    // },
    // description: {
    //   type: DataTypes.STRING, 
    //   allowNull: false,
    // },  
  },{
    timestamps: false
  });
};

//PREGUNTAR A ALFRED !!!!!