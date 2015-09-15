'use strict';

// Browserify's HTTP module throws errors in PhantomJS when downloading zero-byte files
if (!userAgent.isPhantomJS) {
  describe('Blank files', function() {
    it('should throw an error if parsed as YAML', function(done) {
      $RefParser
        .parse(path.rel('specs/blank/blank.yaml'))
        .then(helper.shouldNotGetCalled(done))
        .catch(function(err) {
          expect(err).to.be.an.instanceOf(SyntaxError);
          expect(err.message).to.contain('blank/blank.yaml" is not a valid JSON Schema');
          done();
        })
        .catch(helper.shouldNotGetCalled(done));
    });

    it('should throw an error if parsed as JSON', function(done) {
      $RefParser
        .parse(path.rel('specs/blank/blank.yaml'), {allow: {yaml: false}})
        .then(helper.shouldNotGetCalled(done))
        .catch(function(err) {
          expect(err).to.be.an.instanceOf(SyntaxError);
          expect(err.message).to.contain('Error parsing "');
          expect(err.message).to.contain('blank/blank.yaml"');
          done();
        })
        .catch(helper.shouldNotGetCalled(done));
    });

    it('should throw an error if "options.allow.empty" is disabled', function(done) {
      $RefParser
        .parse(path.rel('specs/blank/blank.yaml'), {allow: {empty: false}})
        .then(helper.shouldNotGetCalled(done))
        .catch(function(err) {
          if (userAgent.isNode) {
            expect(err).to.be.an.instanceOf(SyntaxError);
            expect(err.message).to.contain('Error parsing "');
            expect(err.message).to.contain('blank/blank.yaml"');
            expect(err.message).to.contain('Parsed value is empty');
          }
          else {
            expect(err).to.be.an.instanceOf(Error);
            expect(err.message).to.contain('HTTP 204: No Content');
          }
          done();
        })
        .catch(helper.shouldNotGetCalled(done));
    });
  });
}
