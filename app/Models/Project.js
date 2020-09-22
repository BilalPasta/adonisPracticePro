'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {

    customers(){
        return this.belongsTo('App/Models/Customer')
    }
    
    tasks(){
        return this.hasMany('App/Models/Task')
    }
}

module.exports = Project
