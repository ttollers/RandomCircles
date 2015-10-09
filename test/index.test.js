
"use strict";

var expect = require('chai').expect,
	Random = require('../index');

describe("Random Circles", function(){


	beforeEach(function(){
		Random.overlaps = [];
		Random.collection = [
			{
				latitude : 53,
				longitude : -2.6,
				rad : 5000
			},
			{
				latitude : 53.8,
				longitude : -3,
				rad : 50000
			}
		];
	});

	describe("setCollection()", function(){
		it("Sets the array containing circle objects", function(){
			Random.setCollection([
				{
					lat : 52,
					lng : 1,
					id : 50
				}
			]);

			expect(Random.collection).to.be.an('array');
			expect(Random.collection.length).to.equal(1);
			expect(Random.collection[0].latitude).to.equal(52);
			expect(Random.collection[0].rad).to.equal(50);
		});
	});

	describe("circlesOverlap()", function(){
		it("returns false as no overlap", function(){
			var value = Random.circlesOverlap(0,1);
			expect(value).to.equal(false);
		});

		it("returns the circle if overlaps", function(){
			Random.collection[1].rad = 92925;
			var value = Random.circlesOverlap(0,1);
			expect(value).to.equal(Random.collection[1]);
		});

		it("returns true as the smaller circle is within the larger with no overlap", function(){
			Random.collection[1].rad = 100000;
			var value = Random.circlesOverlap(0,1);
			expect(value).to.equal(true);
		});
	})

	describe("overlappingCircles", function(){
		var value;

		it("fails as circles DO NOT overlap", function(){
			Random.collection[1].rad = 50000;
			value = Random.overlappingCircles();
			expect(value).to.equal(false);
		});

		it("returns an array as the circles DO overlap", function(){
			Random.collection[1].rad = 92925;
			value = Random.overlappingCircles();
			expect(value[0]).to.be.an("object");
		});

		it("returns an empty array as smaller circle is directly inside larger", function(){
			Random.collection[1].rad = 200000;
			value = Random.overlappingCircles();
			expect(value[0]).to.equal(undefined);
		});

	});

	describe("bounds()", function(){
		it("returns the bounds of the circle", function(){
			var value = Random.bounds(Random.collection[0]);

			expect(value[0].latitude).to.equal(52.955084235794025);
			expect(value[0].longitude).to.equal(-2.6746338502358036);
			expect(value[1].latitude).to.equal(53.044915764205975);
			expect(value[1].longitude).to.equal(-2.5253661497641966);
		});
	});

	describe("random()", function(){
		it("creates a random decimal inbetween a max and min", function(){
			var value = Random.random(53,54);
			expect(value).to.be.within(53,54);
		})
	});

	describe("point()", function(){
		it("checks that a given point is inside a circle", function(){
			var value = Random.point({
				latitude : 52.97,
				longitude : -2.62
			},
			Random.collection[0]);
			expect(value).to.equal(true);
		});
	});

	describe("circle()", function(){
		it("creates a random point within a circle", function(){
			var value = Random.circle(Random.collection[0]);
			expect(value).to.be.ok;
		})
	});

	describe("randomPointInCircle()", function(){
		it("creates a random point and verifies that it is within the given circle", function(){
			var value = Random.randomPointInCircle(Random.collection[0]);
			expect(value).to.be.an("object");
		})
	});

	describe("randomPointInCirclesCollection", function(){
		it("creates a random point where all the circles overlap", function(){
			var value = Random.randomPointInCirclesCollection();
			console.log(value);
			expect(value).to.be.an("object");
		})
	})

});