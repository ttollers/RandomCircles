
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
};

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
    var distance, maxDistance, overlapDistance;
    distance = Geo.getDistance(circle1,circle2);

    maxDistance = circle1.radius + circle2.radius;
    overlapDistance = Math.abs(circle1.radius - circle2.radius);

    if (distance >= overlapDistance && distance <= maxDistance) {
        return true;
    } else {
        // we do not need this circle as it does not overlap with the smallest (either it is completely outside or the smaller is direcrtly within - think concentric)
        return false;
    }
};

/*
 *
 * TBR - filters and sorts the array to prepare data
 * 
 */
function sortAndFilter(circles){
    var sorted = sortCollection(circles);
    return filterRedundant(sorted);
};

/*
 *
 * Finds a random point inside an array of circle. The collection must be set before this
 * funtion can be called.
 * 
 */
function randomPointInCirclesCollection(circles, isFilteredAndSorted) {
    var latLng, overlaps, filtered = [0];

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
        var filtered = overlaps.filter(circle => rpic.point(latLng, circle));
    }

    return latLng;
};

exports.sortCollection = sortCollection;
exports.filterRedundant = filterRedundant;
exports.circlesOverlap = circlesOverlap;
exports.sortAndFilter = sortAndFilter;
exports.randomPointInCirclesCollection = randomPointInCirclesCollection;
