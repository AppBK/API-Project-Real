'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //The many side of the 1-to-many with table Users
      Spot.belongsTo(models.User, { foreignKey: 'ownerId' });
      //The 1 side of the 1-to-many with table Bookings
      Spot.hasMany(models.Booking, { foreignKey: 'spotId' });
      // The 1 side of a 1-to-many with table SpotImages
      Spot.hasMany(models.SpotImage, { foreignKey: 'spotId', as: 'previewImage' });
      // The 1 side of a 1-to-many with table Reviews
      Spot.hasMany(models.Review, { foreignKey: 'spotId', as: 'avgRating' });
    }
  }
  Spot.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    ownerId: {
      type: DataTypes.INTEGER,
    },
    address: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    lat: {
      type: DataTypes.DECIMAL,
    },
    lng: {
      type: DataTypes.DECIMAL,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL,
    }
  }, {
    sequelize,
    modelName: 'Spot',
    defaultScope: {
      attributes: {},
    },
    scopes: {
      getAll: {
        attributes: {},
      },
    }
  });
  return Spot;
};
