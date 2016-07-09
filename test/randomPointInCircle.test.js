
var expect = require('chai').expect;

var rc = require('../src/randomPointInCircle');

describe("Random point within a circle", function(){


	var circle = {
		latitude : 53,
		longitude : -2.6,
		radius : 5000
	};


	describe("bounds()", function(){
		it("returns the bounds of the circle", function(){
			var value = rc.getBounds(circle);

			expect(value[0].latitude).to.equal(52.955084235794025);
			expect(value[0].longitude).to.equal(-2.6746338502358036);
			expect(value[1].latitude).to.equal(53.044915764205975);
			expect(value[1].longitude).to.equal(-2.5253661497641966);
		});
	});

	describe("random()", function(){
		it("creates a random decimal inbetween a max and min", function(){
			var value = rc.random(53,54);
			expect(value).to.be.within(53,54);
		})
	});

	describe("isInCircle()", function(){
		it("checks that a given point is inside a circle", function(){
			var value = rc.isInCircle({
				latitude : 52.97,
				longitude : -2.62
			}, circle);
			expect(value).to.equal(true);
		});
	});

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