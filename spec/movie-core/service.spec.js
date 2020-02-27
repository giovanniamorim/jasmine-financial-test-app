describe('Movie core', function(){
    var PopularMovies;
    var $httpBackend;

    beforeEach(module('movieCore'));

    beforeEach(inject(function(_PopularMovies_, _$httpBackend_){
        PopularMovies = _PopularMovies_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function(){
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should create popular movie', function(){

       
        var expectedData = function(data){
            return angular.fromJson(data).movieId === 'tt0076758';
        }

        $httpBackend.expectPOST(/./, expectedData)
            .respond(201);

        var popularMovie = new PopularMovies({
            movieId: 'tt0076758',
            description: 'Great movie!'
        });

        popularMovie.$save();
        expectedData($httpBackend.flush).not.toThrow();
    });

    it('should get popular movie by id', function() {
        $httpBackend.expectedGET('popular/tt0076758')
        .respond(200);

        PopularMovies.get({ movieId: 'tt0076758' })
        expectedData($httpBackend.flush).not.toThrow();
    });

    it('should update popular movie', function(){
        $httpBackend.expectPUT('popular')
            .respond(200);
        var popularMovie = new PopularMovies({
            movieId: 'tt0076758',
            description: 'Great movie!'
        });
        popularMovie.$update();
        expect($httpBackend.flush).not.toThrow();
    });

    it('should authenticate requests', function(){
        var headerData = function(headers){
            return headers.authToken === 'teddybear'
        };
        var matchAny = /.*/;

        $httpBackend.whenGET(matchAny, headerData)
            .respond(200);
        $httpBackend.whenPOST(matchAny, headerData)
            .respond(200);
        $httpBackend.whenPUT(matchAny, headerData)
            .respond(200);
        $httpBackend.whenDELETE(matchAny, headerData)
            .respond(200);

        var popularMovie = { id: 'tt0076758', description: 'This movie is great!' };

        PopularMovies.query();
        PopularMovies.get({ id: 'tt0076758' })
        new PopularMovies(popularMovie).$save();
        new PopularMovies(popularMovie).$update();
        new PopularMovies(popularMovie).$remove();

        expect($httpBackend.flush).not.toThrow();
        
    });

});