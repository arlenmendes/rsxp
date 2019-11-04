/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('/sessions', 'SessionController.store').validator('Session')
Route.post('/forgot', 'ForgotPasswordController.store').validator('Forgot')
Route.patch('/reset', 'ForgotPasswordController.reset').validator('Reset')

Route.group(() => {
  Route.resource('workshops', 'WorkshopController')
    .apiOnly()
    .validator(new Map([[['workshops.store'], ['StoreWorkshop']]]))
}).middleware(['auth'])
