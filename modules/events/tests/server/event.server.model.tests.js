'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  Event = mongoose.model('Event_t');

/**
 * Globals
 */
var event;

/**
 * Unit tests
 */
describe('Event Model Unit Tests:', function () {

  beforeEach(function (done) {
      event = new Event({
        title: 'Event Title',
        description: 'Event Content',
        image: 'Image'
      });
      done();
    });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(10000);
      return event.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without title', function (done) {
      event.title = '';

      return event.save(function (err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function (done) {
    Event.remove().exec(done);
  });
});
