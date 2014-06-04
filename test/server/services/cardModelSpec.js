'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    Card = mongoose.model('Card');


var card;

describe('Card Model', function() {
  before(function(done) {
    card = new Card({
      title: 'An Awesome thing to do',
      content: "It's just so cool!"
    });

    Card.remove().exec();
    done();
  });

  afterEach(function(done) {
    Card.remove().exec();
    done();
  });

  it('should begin with no cards', function(done) {
    Card.find({}, function(err, cards) {
      cards.should.have.length(0);
      done();
    });
  });

  it('should add a card', function(done) {
    card.save(function(){
      Card.find({}, function(err, cards) {
        cards.should.have.length(1);
        done();
      });
    })
  });

});
