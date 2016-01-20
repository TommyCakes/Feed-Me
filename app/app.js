angular.module('App', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
  .state('home', {
    url: "/",
    templateUrl: 'app/states/home.html',
    controller: 'RecipeCtrl as vm'
  })
  .state('recipe', {
    url: '/recipe/:recipe_id',
    templateUrl: 'app/states/recipe.html',
    controller: 'recipeIdCtrl as rec'
  })
})

// replaces img url's ('=s90-c') with whitespace
// to allow for bigger images;
.filter('imageFix', function() {
  return function(text) {
    var img = text.replace(/=s90-c/, '');
    return img;
  }
})

.controller('RecipeCtrl', function($http, $stateParams) {
  var self = this;
  self.user = '';

  self.veggie = false;
  this.isVeggie = function() {
    console.log("You're a veggie!")
    self.veggie = true;
  }
  var appId = '83b72964';
  var appKey = '695da5d664513cc2530c06da541b64b0';

  this.searchForRecipe = function() {
    if (self.veggie === true) {
      var url = 'http://api.yummly.com/v1/api/recipes?_app_id=83b72964&_app_key=695da5d664513cc2530c06da541b64b0&course&allowedDiet[]=387^Lacto-ovo%20vegetarian'
    }
    else {
    var url = 'http://api.yummly.com/v1/api/recipes?_app_id=83b72964&_app_key=695da5d664513cc2530c06da541b64b0';
    }
    var request = {
      callback: 'JSON_CALLBACK',
      maxResult: 60,
      q: self.user,
      requirePictures: true,
      //allowedDiet: ["course^course-Beverages"]
    }
    $http({
      method: 'JSONP',
      url: url,
      params: request
    })
    .then(function(data) {
      console.log(data)
      self.data = data.data
      self.matches = self.data.matches;
    });
  }
})

.controller('recipeIdCtrl', function($http, $stateParams) {
   var self = this;
   console.log($stateParams);

   // new http request for the specific recipe
   // http://api.yummly.com/v1/api/  $stateParams.recipe_id
   var recipeUrl = 'http://api.yummly.com/v1/api/recipe/'+ $stateParams.recipe_id +'?_app_id=83b72964&_app_key=695da5d664513cc2530c06da541b64b0';
  //  console.log('This is the url ' + $stateParams.recipe_id)
   var request = {
     callback: 'JSON_CALLBACK',
     requirePictures: true,
     //allowedDiet: ["course^course-Beverages"]
   }
   $http({
     method: 'JSONP',
     url: recipeUrl,
     params: request
   })
   .then(function(response) {
     console.log(response)
     self.recipe = response.data;
     self.ingredients = response.data.ingredientLines;
   })
 });
