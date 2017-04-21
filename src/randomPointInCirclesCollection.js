
"use strict";

// ----------------------------------------------------------------------------
// Requires Geolib
// 
// It actually works very well (with a few minor modifcations) with the google 
// maps geometry library. However this is very difficult to test and more coupling
// to google maps
// 
// TODO allow support for both Geolib AND google maps geometry library.
//
var Geo = require('geolib');

var rpic = require('./randomPointInCircle');

/*
 *
 * Setting the collection seperately dramtically improves the speed if more than 
 * one random point is require. 
 *
 * This function allows for differences in the naming of the lat, lng and rad 
 * properites. 
 *
 * It also orders the array by radius which is a crucial. For this reason, do not 
 * set the collection directly.
 * 
 */
function sortCollection(circles){
    return circles.sort(function(a, b) {
        return parseFloat(a.radius) - parseFloat(b.radius);
    });
}

/*
 *
 * Filter through circles array to remove redundant circles (i.e. circles that DON'T overlap)
 * 
 */
function filterRedundant(circles) {
    return circles.filter(circle => circlesOverlap(circles[0], circle));
}

/*
 *
 * Checks whether 2 circles overlap. 
 * Returns false if they DON'T overlap.
 * Returns true if the smaller circle is inside the larger with no overlap
 * Otherwise returns the larger circle
 * 
 */
function circlesOverlap(circle1, circle2){
    const distance = Geo.getDistance(circle1,circle2);
    const maxDistance = circle1.radius + circle2.radius;
    const overlapDistance = Math.abs(circle1.radius - circle2.radius);
    return distance >= overlapDistance && distance <= maxDistance;
}

/*
 *
 * TBR - filters and sorts the array to prepare data
 * 
 */
function sortAndFilter(circles){
    const sorted = sortCollection(circles);
    return filterRedundant(sorted);
}

/*
 *
 * Finds a random point inside an array of circle. The collection must be set before this
 * funtion can be called.
 * 
 */
function randomPointInCirclesCollection(circles, isFilteredAndSorted) {
    var latLng = null, overlaps, filtered = circles;

    if(isFilteredAndSorted !== true){
        // filter out the circles that are redundant
        overlaps = sortAndFilter(circles);
    } else {
        overlaps = circles;
    }

    //TBR use immutable method
    var origin = overlaps.shift();

    while(filtered.length !== 0) {
        // find a random point inside the smallest circle
        latLng = rpic.randomPointInCircle(origin);
        filtered = overlaps.filter(circle => Geo.isPointInCircle(latLng, circle, circle.radius));
    }

    return latLng;
}

exports.sortCollection = sortCollection;
exports.filterRedundant = filterRedundant;
exports.circlesOverlap = circlesOverlap;
exports.sortAndFilter = sortAndFilter;
exports.randomPointInCirclesCollection = randomPointInCirclesCollection;
