'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // The many side of the 1-to-many with table Spots
      Booking.belongsTo(models.Spot, { foreignKey: 'spotId'});
      // The many side of the 1-to-many with table Users
      Booking.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.STRING,
    },
    endDate: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Booking',
    scopes: {
      allBookingsNonOwner: {
        attributes: {
          exclude: ['id', 'userId', 'createdAt', 'updatedAt'],
        }
      }
    }
  });
  return Booking;
};
