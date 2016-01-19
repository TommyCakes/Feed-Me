angular.module('App', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
  .state('home', {
    url: "/",
    templateUrl: 'app/states/home.html'
  })
  .state('recipe', {
    url: '/recipe/:recipe_id',
    templateUrl: 'app/states/recipe.html',
    controller: 'recipeIdCtrl as rec'
  })
})

.filter('imageFix', function() {
  return function(text) {
    var img = text.replace(/=s90-c/, '');
    return img;
  }
})

.controller('RecipeCtrl', function($http, $stateParams) {
  var self = this;
  self.user = '';

  var appId = '83b72964';
  var appKey = '695da5d664513cc2530c06da541b64b0';

  this.searchForRecipe = function() {
    var url = 'http://api.yummly.com/v1/api/recipes?_app_id=83b72964&_app_key=695da5d664513cc2530c06da541b64b0';
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
      // self.image = self.match[0].smallImageUrls[0];

      // for (var i = 0; i < 60; i++) {
      //   self.image = self.data.matches[i].imageUrlsBySize[90].replace("=s90-c", "");
      //   console.log(self.image);
      // }
      // angular.forEach(self.image, function(value, key) {
      //   self.image = self.match[value].smallImageUrls[0].replace("=s90", "");
      // })
    });
  }
})

controller('recipeIdCtrl', function($stateParams) {
   var self = this;
   console.log($stateParams);

   // new http request for the specific recipe
   // http://api.yummly.com/v1/api/  $stateParams.recipe_id
 });
