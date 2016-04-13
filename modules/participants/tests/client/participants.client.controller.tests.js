'use strict';

(function () {
  // Participants Controller Spec
  describe('Participants Controller Tests', function () {
    // Initialize global variables
    var ParticipantsController,
      scope,
      $httpBackend,
      $stateParams,
      $location,
      Authentication,
      Participants,
      mockParticipant;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, _Authentication_, _Participants_) {
      // Set a new global scope
      scope = $rootScope.$new();

      // Point global variables to injected services
      $stateParams = _$stateParams_;
      $httpBackend = _$httpBackend_;
      $location = _$location_;
      Authentication = _Authentication_;
      Participants = _Participants_;

      // create mock participant
      mockParticipant = new Participants({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'An Participant about MEAN',
        email: 'MEAN@ro.cks'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Participants controller.
      ParticipantsController = $controller('ParticipantsController', {
        $scope: scope
      });
    }));

    it('$scope.find() should create an array with at least one participant object fetched from XHR', inject(function (Participants) {
      // Create a sample participants array that includes the new participant
      var sampleParticipants = [mockParticipant];

      // Set GET response
      $httpBackend.expectGET('api/participants').respond(sampleParticipants);

      // Run controller functionality
      scope.find();
      $httpBackend.flush();

      // Test scope value
      expect(scope.participants).toEqualData(sampleParticipants);
    }));

    it('$scope.findOne() should create an array with one participant object fetched from XHR using a participantId URL parameter', inject(function (Participants) {
      // Set the URL parameter
      $stateParams.participantId = mockParticipant._id;

      // Set GET response
      $httpBackend.expectGET(/api\/participants\/([0-9a-fA-F]{24})$/).respond(mockParticipant);

      // Run controller functionality
      scope.findOne();
      $httpBackend.flush();

      // Test scope value
      expect(scope.participant).toEqualData(mockParticipant);
    }));

    describe('$scope.create()', function () {
      var sampleParticipantPostData;

      beforeEach(function () {
        // Create a sample participant object
        sampleParticipantPostData = new Participants({
          name: 'An Participant about MEAN',
          email: 'MEAN@ro.cks'
        });

        // Fixture mock form input values
        scope.name = 'An Participant about MEAN';
        scope.email = 'MEAN@ro.cks';

        spyOn($location, 'path');
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (Participants) {
        // Set POST response
        $httpBackend.expectPOST('api/participants', sampleParticipantPostData).respond(mockParticipant);

        // Run controller functionality
        scope.create(true);
        $httpBackend.flush();

        // Test form inputs are reset
        expect(scope.name).toEqual('');
        expect(scope.email).toEqual('');

        // Test URL redirection after the participant was created
        expect($location.path.calls.mostRecent().args[0]).toBe('participants/' + mockParticipant._id);
      }));

      it('should set scope.error if save error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/participants', sampleParticipantPostData).respond(400, {
          message: errorMessage
        });

        scope.create(true);
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      });
    });

    describe('$scope.update()', function () {
      beforeEach(function () {
        // Mock participant in scope
        scope.participant = mockParticipant;
      });

      it('should update a valid participant', inject(function (Participants) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/participants\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        scope.update(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($location.path()).toBe('/participants/' + mockParticipant._id);
      }));

      it('should set scope.error to error response message', inject(function (Participants) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/participants\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        scope.update(true);
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      }));
    });

    describe('$scope.remove(participant)', function () {
      beforeEach(function () {
        // Create new participants array and include the participant
        scope.participants = [mockParticipant, {}];

        // Set expected DELETE response
        $httpBackend.expectDELETE(/api\/participants\/([0-9a-fA-F]{24})$/).respond(204);

        // Run controller functionality
        scope.remove(mockParticipant);
      });

      it('should send a DELETE request with a valid participantId and remove the participant from the scope', inject(function (Participants) {
        expect(scope.participants.length).toBe(1);
      }));
    });

    describe('scope.remove()', function () {
      beforeEach(function () {
        spyOn($location, 'path');
        scope.participant = mockParticipant;

        $httpBackend.expectDELETE(/api\/participants\/([0-9a-fA-F]{24})$/).respond(204);

        scope.remove();
        $httpBackend.flush();
      });

      it('should redirect to participants', function () {
        expect($location.path).toHaveBeenCalledWith('participants');
      });
    });
  });
}());
