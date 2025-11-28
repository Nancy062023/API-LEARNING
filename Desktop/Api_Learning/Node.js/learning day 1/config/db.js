import { Sequelize } from "sequelize";

const sequelize = new Sequelize('global', 'root', 'Pragya@123', {
    host: 'localhost',
    dialect: 'mysql'
});

// Database connection check
sequelize.authenticate()
    .then(() => {
        console.log("Database connected successfully ✅");
    })
    .catch((err) => {
        console.log("Database connection error ❌:", err);
    });

export default sequelize;
