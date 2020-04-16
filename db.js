const Sequelize = require('Sequelize')

const db = new Sequelize({
    dialect : 'sqlite',
    storage : __dirname + '/todos.db'
})


const Todos = db.define('todo',{
    id : {
        type : Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    task : {
        type : Sequelize.STRING(20),
        allowNull : false
    },
    description : {
        type : Sequelize.STRING(200),
        allowNull : false
    },
    due : {
        type : Sequelize.DATEONLY

    },
    done : {
        type : Sequelize.STRING,
        allowNull : false,
        
    },

    Priority :{
        type : Sequelize.STRING,
        allowNull : false
    }
   



})

const Notes = db.define('Notes', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    T_id: {
        type: Sequelize.INTEGER
    },
    
    description: Sequelize.STRING   
})


Todos.hasMany(Notes);

module.exports = {
    db, Todos, Notes
}