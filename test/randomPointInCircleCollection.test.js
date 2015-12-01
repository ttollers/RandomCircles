
// "use strict";

// var expect = require('chai').expect,
// 	rc = require('../src/randomPointInCirclesCollection');

// describe("Random Circles", function(){


// 	beforeEach(function(){
		
// 		var circles = [
// 			{
// 				latitude : 53,
// 				longitude : -2.6,
// 				rad : 5000
// 			},
// 			{
// 				latitude : 53.8,
// 				longitude : -3,
// 				rad : 50000
// 			}
// 		];
// 	});

// 	describe("setCollection()", function(){
// 		it("Sets the array containing circle objects", function(){
// 			rpicc.setCollection([
// 				{
// 					lat : 52,
// 					lng : 1,
// 					id : 50
// 				}
// 			]);

// 			expect(circles).to.be.an('array');
// 			expect(circles.length).to.equal(1);
// 			expect(circles[0].latitude).to.equal(52);
// 			expect(circles[0].rad).to.equal(50);
// 		});
// 	});

// 	describe("circlesOverlap()", function(){
// 		it("returns false as no overlap", function(){
// 			var value = rpicc.circlesOverlap(0,1);
// 			expect(value).to.equal(false);
// 		});

// 		it("returns the circle if overlaps", function(){
// 			circles[1].rad = 92925;
// 			var value = rpicc.circlesOverlap(0,1);
// 			expect(value).to.equal(circles[1]);
// 		});

// 		it("returns true as the smaller circle is within the larger with no overlap", function(){
// 			circles[1].rad = 100000;
// 			var value = rpicc.circlesOverlap(0,1);
// 			expect(value).to.equal(true);
// 		});
// 	})

// 	describe("overlappingCircles", function(){
// 		var value;

// 		it("fails as circles DO NOT overlap", function(){
// 			circles[1].rad = 50000;
// 			value = rpicc.overlappingCircles();
// 			expect(value).to.equal(false);
// 		});

// 		it("returns an array as the circles DO overlap", function(){
// 			circles[1].rad = 92925;
// 			value = rpicc.overlappingCircles();
// 			expect(value[0]).to.be.an("object");
// 		});

// 		it("returns an empty array as smaller circle is directly inside larger", function(){
// 			circles[1].rad = 200000;
// 			value = rpicc.overlappingCircles();
// 			expect(value[0]).to.equal(undefined);
// 		});

// 	});

// 	describe("randomPointInCirclesCollection", function(){
// 		it("creates a random point where all the circles overlap", function(){
// 			var value = rpicc.randomPointInCirclesCollection();
// 			console.log(value);
// 			expect(value).to.be.an("object");
// 		})
// 	})

// });