'use strict'
const Customer = use('App/Models/Customer');
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with customers
 */
class CustomerController {
  /**
   * Show a list of all customers.
   * GET customers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
  const customer=await Customer.query().with('projects').fetch();


  response.status(200).json({
    data:customer
  })

  }

  /**
   * Render a form to be used for creating a new customer.
   * GET customers/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new customer.
   * POST customers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const { name, description } = request.post();

    // const customer = new Customer();
    // customer.name = name;
    // customer.description = description;
    // // Insert
    // await customer.save();

    const customer = await Customer.create({ name, description });
    response.status(201).json({
      message: "customer add successfully",
      data: customer
    })


  }

  /**
   * Display a single customer.
   * GET customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, request, response, view }) {
    const customer = await Customer.find(id);
    if (customer) {
      response.status(200).json({
        message: 'data found',
        id
      })
    } else {
      response.status(404).json({
        message: 'customer not found',
        id
      })
    }




  }

  /**
   * Render a form to update an existing customer.
   * GET customers/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update customer details.
   * PUT or PATCH customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params:{id}, request, response }) {
    const {name,description}=request.post();
    const customer = await Customer.find(id);
if(customer){
  customer.name=name;
  customer.description=description;
  await customer.save();

  response.status(200).json({
    message:'update data successfully',
    data:customer
  })
}else{
  response.status(404).json({
    message: 'customer not found',
    id
  })
}
}



  /**
   * Delete a customer with id.
   * DELETE customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params:{id}, request, response }) {

    const customer=await Customer.find(id);
    if(customer){
      customer.delete();
      response.status(200).json({
        message: 'remove customer successfully',
        id
      })

    }else{
      response.status(404).json({
        message: 'customer not found',
        id
      })

    }

  }
}

module.exports = CustomerController
