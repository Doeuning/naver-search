const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const newUser = sequelize.define(
    "new_user",
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sex: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      joined_date: {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return newUser;
};
