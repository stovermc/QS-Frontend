const $ = require('jquery');
const host = require('./config').host

function Food(entry) {
  this.id = entry.id
  this.name = entry.name
  this.calories = entry.calories
  this.createdat = entry.createdat
}

Food.getAllFoods = function() {
  return $.getJSON(`${host}/api/v1/foods`)
}

Food.allFoodsToHTML = function() {
  return this.getAllFoods()
    .then(function(foods) {
      return foods.map(function(food) {
        return new Food(food)
      })
    })
    .then(function(foods) {
      return foods.map(function(food) {
        return food.toHTML()
      })
    })
}

Food.prototype.toHTML = function() {
  return `<tr class="food" data-id='food-${this.id}'>
            <td><h4 class='name'>${this.name}</h4></td>
            <td><h4 class='calories'>${this.calories}</h4></td>
            <td><h4 class='delete-button'><img src="lib/images/delete-button.png" id=${this.id} /></h4></td>
          </tr>`
}

Food.prototype.create = function () {
  return $.post(`${host}/api/v1/foods`,
    { name: this.name, calories: this.calories } )
      .then(function(foodObject){
        return new Food(foodObject[foodObject.length-1])
      })
}

Food.destroy = function (id) {
  $.ajax({
    method: 'DELETE',
    contentType: 'application/json; charset=utf-8',
    url: `${host}/api/v1/foods/${id}`,
    dataType: 'json'
  })
}

module.exports = Food