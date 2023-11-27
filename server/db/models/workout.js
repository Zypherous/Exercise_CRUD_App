'use strict';

module.exports = (sequelize, DataTypes) => {
  const Workout = sequelize.define('workout', {
    workout_name:{
      type: DataTypes.STRING,
      unique: false
    },
    numsets: {
      type: DataTypes.INTEGER
    },
    numreps: {
      type: DataTypes.INTEGER
    },
    time: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    },
    updatedAt: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
  },
  workoutNumber:  {
    type: DataTypes.INTEGER,
    allowNull: false
  }
  });

  return Workout;
};
