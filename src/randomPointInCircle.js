
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

/*
 *
 * Returns the square shaped bounds of a circle 
 * 
 */
function getBounds(circle){
    return Geo.getBoundsOfDistance(circle, circle.radius);
}

/*
 *
 * Returns a random floating point number
 *
 * TBR to take into account changes in longitude
 * 
 */
function random(min, max){
    return Math.random() * (max - min) + min;
}

/*
 *
 * checks to see if point is within circle. returns true if INSIDE circle
 * 
 */
function isInCircle(point, circle){
    return Geo.isPointInCircle(point, circle, circle.radius);
}

/*
 *
 * finds a random point within BOUNDS of a cirlce. At this point, we do not know
 * if point is within the circle as the random point could be near the corners.
 * 
 */
function randomWithinSquare(circle){
    var r_lat, r_lng, bounds;
    bounds = getBounds(circle);
    r_lat = random(bounds[0].latitude, bounds[1].latitude);
    r_lng = random(bounds[1].longitude, bounds[0].longitude);
    return {
        latitude : r_lat,
        longitude : r_lng
    };
}

/*
 *
 * finds the random point within circle bounds and verifies it is within a circle
 * 
 */
function randomPointInCircle(circle){
    var point = false;
    while(!point || !isInCircle(point, circle)){
        point = randomWithinSquare(circle);
    }
    return point;
}


exports.getBounds = getBounds;
exports.random = random;
exports.isInCircle = isInCircle;
exports.randomWithinSquare = randomWithinSquare;
exports.randomPointInCircle = randomPointInCircle;