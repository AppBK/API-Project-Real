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
      Review.hasMany(models.ReviewImage, { foreignKey: 'reviewId', onDelete: 'CASCADE', hooks: true });
      //many side of a 1-to-many with table Users
      Review.belongsTo(models.User, { foreignKey: 'userId' });
      //manmy side of a 1-to-many with table Spots
      Review.belongsTo(models.Spot, { foreignKey: 'spotId'});
    }
  }
  Review.init({
    spotId: {
	    type: DataTypes.INTEGER,
      allowNull: false,
	  },
    userId: {
	    type: DataTypes.INTEGER,
      allowNull: false,
	  },
    review: {
	    type: DataTypes.STRING,
      allowNull: false,
	  },
    stars: {
	    type: DataTypes.INTEGER,
      allowNull: false,
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
