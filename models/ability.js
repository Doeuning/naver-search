const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const newAbility = sequelize.define(
    "new_ability",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ability: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      birthday: {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  return newAbility;
};
