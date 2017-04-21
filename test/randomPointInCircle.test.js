
var expect = require('chai').expect;

var rc = require('../src/randomPointInCircle');

describe("Random point within a circle", function(){


	var circle = {
		latitude : 53,
		longitude : -2.6,
		radius : 5000
	};

	describe("randomWithinSquare()", function(){
		it("creates a random point within a circle", function(){
			var value = rc.randomWithinSquare(circle);
			expect(value).to.be.ok;
		})
	});

	describe("randomPointInCircle()", function(){
		it("creates a random point and verifies that it is within the given circle", function(){
			var value = rc.randomPointInCircle(circle);
			console.log(circle, value);
			expect(value).to.be.an("object");
		})
	});
});
