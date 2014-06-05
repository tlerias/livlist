var expect = chai.expect;


describe('CardsCtrl Test', function(){
  beforeEach(module('livListApp'));

  var mockService = {
    cards: ['card1', 'card2'],
    getCards: function() {
      return new Promise(function(resolve, reject){
        return this.cards
      })
    },
    create: function(title, description) {
      // this.cards.push('card3');
      // return this.cards
      return new Promise(function(resolve, reject){
        this.cards.push('card3');
        return this.cards
      })

    }
  };


  it('should start empty', inject(function($rootScope, $controller) {
     var scope = $rootScope.$new();
     var ctrl = $controller('CardCtrl', { $scope: scope });

     expect(scope.cards.length).to.equal(0);

  }));

  it('should add a card', inject(function($rootScope, $controller) {
     var scope = $rootScope.$new();
     var ctrl = $controller('CardCtrl', { $scope: scope, Card: mockService });
     scope.question_text = "Title";
     scope.description_text = "Description";
     scope.addCard();

     //expect(scope.cards.length).to.equal(1);
  }));
})
