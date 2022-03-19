const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
	sequelize.define('communicationLog', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        body: {
            type: DataTypes.STRING,
            field: 'body'
        },
        username: {
            type: DataTypes.STRING,
            field: 'username'
        }
	},
    {
        tableName: 'communication_logs',
        underscored: true,
        timestamps: true,
        updatedAt: false,
        createdAt: 'date'
    });
};
