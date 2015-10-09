
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
        this.collection = array;
        this.collection.sort(function(a, b) {
            return parseFloat(a.price) - parseFloat(b.price);
        });
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
        var l = this.collection.length;
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
        var latLng, overlaps, withinCircle, i, l;
        latLng = this.randomPointInCircle(this.collection[0]);
        overlaps = this.overlappingCircles();
        l = overlaps.length;

        // creates an array of the distances between each 
        for (i = 0; i < l; i++) {
            withinCircle = this.point(latLng, overlaps[i]);
            if(!withinCircle){
                return this.randomPointInCirclesCollection();
            }
        }
        return latLng
    }
};
