import { DataTypes } from 'sequelize';
import { sequelize } from '../configs/db';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    userType: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user',

    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, { timestamps: true })

export default User