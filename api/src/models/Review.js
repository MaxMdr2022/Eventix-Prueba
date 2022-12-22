const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('review', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
      primaryKey: true
    },
    username: {                   // cambie user por username. Me rompia por colicion de nombres. el atributo user con el nombre de la tabla user.
      type: DataTypes.STRING, 
      allowNull: false,
    },
    stars: {
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING, 
      allowNull: false,
    },  
  });
};