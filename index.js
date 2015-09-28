
"use strict";

// ----------------------------------------------------------------------------
// imports
//
var Geo = require('geolib') || null;

// ----------------------------------------------------------------------------
// random location within OVERLAPPING circles generator
//
module.exports = {

    collection : [],

    setCollection : function(array){
        this.collection = array;
    },

    length : function(){
        return this.collection.length;
    },

    circlesOverlap : function(i,n){
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
    },
    
    overlappingCircles : function(){
        var i, n, overlap, overlaps = [];
        var l = this.length();
        for (i = 1; i < l; i++)
        {
            overlap = this.circlesOverlap(0,i);
            if(typeof overlap === "object"){
                overlaps.push(overlap);
            } else if(!overlap){
                return false;
            }
        }
        return overlaps;
    },

    // get north west and south east bounds
    bounds : function(circle){
        return Geo.getBoundsOfDistance(circle, circle.rad);
    },

    // random number within min and max
    random : function(min, max){
        return Math.random() * (max - min) + min;
    },

    // checks to see if point is within circle. returns true if INSIDE circle
    point : function(point, circle){
        return Geo.isPointInCircle(point, circle, circle.rad);
    },

    // finds a random point within BOUNDS of a cirlce
    circle : function(circle){
        var r_lat, r_lng, bounds
        bounds = this.bounds(circle);
        r_lat = this.random(bounds[0].latitude, bounds[1].latitude);
        r_lng = this.random(bounds[1].longitude, bounds[0].longitude);
        return {
            latitude : r_lat,
            longitude : r_lng
        };
    },

    // finds the random point within circle bounds and verifies it is within a circle
    randomPointInCircle : function(circle){
        var point = false;
        while(!point || !this.point(point, circle)){
            point = this.circle(circle);
        }
        return point;
    },

    // creates a random position within a set of circles
    randomPointInCirclesCollection : function() {

        var latLng = this.randomPointInCircle(this.collection[0]);
        var overlaps = this.overlappingCircles();
        var withinCircle;
        var i;
        var l = overlaps.length;

        // creates an array of the distances between each 
        for (i = 0; i < l; i++) {
            withinCircle = this.point(latLng, overlaps[i]);
            if(!withinCircle){
                return this.randomPointCirclesCollection();
            }
        }
        return latLng
    }
};
