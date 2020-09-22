'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Customer extends Model {

    projects(){
        return this.hasMany("App/Models/Project")
    }
  tasks(){
        return this.hasMany("App/Models/Task")
    }

}

module.exports = Customer
