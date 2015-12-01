
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

var rpic = rquire('./randomPointInCircleCollection');

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
function setCollection(array){
    var i, l;
    l = array.length;
    for(i=0;i < l; i++){
        if(array[i].lat){
            array[i].latitude = array[i].lat;
        }
        if(array[i].lng){
            array[i].longitude = array[i].lng;
        }
        if(!array[i].rad){
            if(array[i].radius){
                array[i].rad = array[i].radius;
            } else if(array[i].id){
                array[i].rad = array[i].id;
            }
        }
    }
    return array.sort(function(a, b) {
        return parseFloat(a.price) - parseFloat(b.price);
    });
};

/*
 *
 * Checks whether 2 circles overlap. 
 * Returns false if they DON'T overlap.
 * Returns true if the smaller circle is inside the larger with no overlap
 * Otherwise returns the larger circle
 * 
 */
function circlesOverlap(i,n){
    var distance, maxDistance, overlapDistance;
    distance = Geo.getDistance(this.collection[i],this.collection[n]);

    maxDistance = this.collection[i].rad + this.collection[n].rad;
    overlapDistance = Math.abs(this.collection[i].rad - this.collection[n].rad);

    if (distance > maxDistance) {
        return false;
    }
    else if ((distance > overlapDistance) && (i === 0)) {
        return this.collection[n];
    }
    else {
        return true;
    }
};

/*
 *
 * Uses the above function to cycle through a an array of circles and find the
 * ones that overlap.
 *
 * If 2 circles don't overlap AND the smaller one is not inside it, returns false 
 * as cannot find a random point inside two seperate circles.
 * 
 */
function overlappingCircles(circles){
    var i, n, overlap, overlaps = [];
    var l = circles.length;
    for (i = 1; i < l; i++)
    {
        overlap = circlesOverlap(0,i);
        if(typeof overlap === "object"){
            overlaps.push(overlap);
        } else if(!overlap){
            return false;
        }
    }
    return overlaps;
};

/*
 *
 * Finds a random point inside an array of circle. The collection must be set before this
 * funtion can be called.
 * 
 */
function randomPointInCirclesCollection(collection) {
    var latLng, overlaps, withinCircle, i, l;
    latLng = rpic.randomPointInCircle(collection[0]);
    overlaps = overlappingCircles(collection);
    l = overlaps.length;

    // creates an array of the distances between each 
    for (i = 0; i < l; i++) {
        withinCircle = rpicc.point(latLng, overlaps[i]);
        if(!withinCircle){
            return randomPointInCirclesCollection();
        }
    }
    return latLng
};
