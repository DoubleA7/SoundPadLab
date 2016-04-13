var assert = require('assert');

var events = require('./controllers/event.server.controller');

describe('event creations', function(){
  it('should return a 200', function(){
  	events.create({ title: 'sss',
         description: 'eee',
         image: './modules/events/client/img/daba1ce90f834f5155a6f69b5241add5' }).done(function(req,res){
         	assert(res.status.equals(200));
         })
  });
  console.log("here");
})
