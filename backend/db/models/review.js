'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //1 side of a 1-to-many with table ReviewImages
      Review.hasMany(models.ReviewImage, { foreignKey: 'reviewId' });
      //many side of a 1-to-many with table Users
      Review.belongsTo(models.User, { foreignKey: 'userId' });
      //manmy side of a 1-to-many with table Spots
      Review.belongsTo(models.Spot, { foreignKey: 'spotId' });
    }
  }
  Review.init({
    spotId: {
	    type: DataTypes.INTEGER,
	  },
    userId: {
	    type: DataTypes.INTEGER,
	  },
    review: {
	    type: DataTypes.STRING,
	  },
    stars: {
	    type: DataTypes.INTEGER,
	  },
  }, {
    sequelize,
    modelName: 'Review',
    scopes: {
      onlyAvg: {
        include: ['avgRating'],
      },
    },
  });
  return Review;
};
