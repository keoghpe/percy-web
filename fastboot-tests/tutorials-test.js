'use strict';

const expect = require('chai').expect;

describe('tutorials', function() {

  it('renders', function() {
    return this.visit('/docs/tutorials/example-apps')
      .then(function(res) {
        let $ = res.jQuery;
        let response = res.response;

        // add your real tests here
        expect(response.statusCode).to.equal(200);
        expect($('div.DocsContainer div.DocsBody h1').text()).to.equal('Tutorials');
      });
  });

});
