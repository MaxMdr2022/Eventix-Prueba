const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('event', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    createInDB:{
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull:false
    }
  },{
    timestamps: false
  });
};