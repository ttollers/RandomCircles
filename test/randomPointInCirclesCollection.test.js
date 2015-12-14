
"use strict";

var expect = require('chai').expect;
var rpicc = require('../src/randomPointInCirclesCollection');

describe("Random point in colleciton of circles", function(){

	var circles = [
		{
			latitude : 53,
			longitude : -2.6,
			radius : 5000
		},
		{
			latitude : 53.8,
			longitude : -3,
			radius : 50000
		}
	];

	describe("sortCollection()", function(){
		it("Sets the array containing circle objects", function(){

			var circlesToSort = [
				{
					radius : 100000
				},
				{
					radius : 50000
				},
				{
					radius : 200000
				},
				{
					radius : 10000
				}
			];

			var sortedCircles = rpicc.sortCollection(circlesToSort);

			expect(sortedCircles).to.deep.equal([
				{
					radius : 10000
				},
				{
					radius : 50000
				},
				{
					radius : 100000
				},
				{
					radius : 200000
				}

			])
		});
	});

	describe("filterRedundant", function(){
		var value;

		// it("fails as circles DO NOT overlap", function(){
		// 	circles[1].radius = 50000;
		// 	value = rpicc.filterRedundant(circles);
		// 	expect(value).to.be.false;
		// });

		it("returns an array as the circles DO overlap", function(){
			circles[1].radius = 92925;
			value = rpicc.filterRedundant(circles);
			expect(value[0]).to.be.an("object");
		});

		it("removes the larger circle as it does not overlap the smaller", function(){
			circles[1].radius = 200000;
			value = rpicc.filterRedundant(circles);
			expect(value.length).to.equal(1);
			expect(value[0].radius).to.equal(5000);
		});

	});

	describe("circlesOverlap()", function(){
		it("returns false as no overlap", function(){
			var value = rpicc.circlesOverlap(circles[0], circles[1]);
			expect(value).to.be.false;
		});

		it("returns the circle if overlaps", function(){
			circles[1].radius = 92925;
			var value = rpicc.circlesOverlap(circles[0], circles[1]);
			expect(value).to.be.true;
		});

		it("returns true as the smaller circle is within the larger with no overlap", function(){
			circles[1].radius = 100000;
			var value = rpicc.circlesOverlap(circles[0], circles[1]);
			expect(value).to.be.false;
		});
	});

	describe("sortAndFilter()", function() {
		it("sorts and filters redundant circles", function() {
			circles[1].radius = 92925;
			var filtered = rpicc.sortAndFilter(circles);
			expect(filtered.length).to.equal(2);
		})
	})

	describe("randomPointInCirclesCollection", function(){
		it("creates a random point where all the circles overlap", function(){
			var value = rpicc.randomPointInCirclesCollection(circles);
			expect(value.latitude).to.be.a("number");
			expect(value.longitude).to.be.a("number");
		})


		it("creates a random point exactly as above, but filters and sorts the array outside", function() {
			var filtered = rpicc.sortAndFilter(circles);
			console.log(filtered)
			var value = rpicc.randomPointInCirclesCollection(filtered, true);
			expect(value.latitude).to.be.a("number");
			expect(value.longitude).to.be.a("number");
		})
	})

});