
// "use strict";

// // ----------------------------------------------------------------------------
// // Requires Geolib
// // 
// // It actually works very well (with a few minor modifcations) with the google 
// // maps geometry library. However this is very difficult to test and more coupling
// // to google maps
// // 
// // TODO allow support for both Geolib AND google maps geometry library.
// //
// var Geo = require('geolib');

// // ----------------------------------------------------------------------------
// // Random point in overlapping circles
// //
// module.exports = {

//     collection : [],

//     /*
//      *
//      * Setting the collection seperately dramtically improves the speed if more than 
//      * one random point is require. 
//      *
//      * This function allows for differences in the naming of the lat, lng and rad 
//      * properites. 
//      *
//      * It also orders the array by radius which is a crucial. For this reason, do not 
//      * set the collection directly.
//      * 
//      */
//     setCollection : function(array){
//         var i, l;
//         l = array.length;
//         for(i=0;i < l; i++){
//             if(array[i].lat){
//                 array[i].latitude = array[i].lat;
//             }
//             if(array[i].lng){
//                 array[i].longitude = array[i].lng;
//             }
//             if(!array[i].rad){
//                 if(array[i].radius){
//                     array[i].rad = array[i].radius;
//                 } else if(array[i].id){
//                     array[i].rad = array[i].id;
//                 }
//             }
//         }
//         this.collection = array;
//         this.collection.sort(function(a, b) {
//             return parseFloat(a.price) - parseFloat(b.price);
//         });
//     },

//     /*
//      *
//      * Checks whether 2 circles overlap. 
//      * Returns false if they DON'T overlap.
//      * Returns true if the smaller circle is inside the larger with no overlap
//      * Otherwise returns the larger circle
//      * 
//      */
//     circlesOverlap : function(i,n){
//         var distance, maxDistance, overlapDistance;
//         distance = Geo.getDistance(this.collection[i],this.collection[n]);

//         maxDistance = this.collection[i].rad + this.collection[n].rad;
//         overlapDistance = Math.abs(this.collection[i].rad - this.collection[n].rad);

//         if (distance > maxDistance) {
//             return false;
//         }
//         else if ((distance > overlapDistance) && (i === 0)) {
//             return this.collection[n];
//         }
//         else {
//             return true;
//         }
//     },
    
    
//      *
//      * Uses the above function to cycle through a an array of circles and find the
//      * ones that overlap.
//      *
//      * If 2 circles don't overlap AND the smaller one is not inside it, returns false 
//      * as cannot find a random point inside two seperate circles.
//      * 
     
//     overlappingCircles : function(){
//         var i, n, overlap, overlaps = [];
//         var l = this.collection.length;
//         for (i = 1; i < l; i++)
//         {
//             overlap = this.circlesOverlap(0,i);
//             if(typeof overlap === "object"){
//                 overlaps.push(overlap);
//             } else if(!overlap){
//                 return false;
//             }
//         }
//         return overlaps;
//     },

//     /*
//      *
//      * Returns the square shaped bounds of a circle 
//      * 
//      */
//     bounds : function(circle){
//         return Geo.getBoundsOfDistance(circle, circle.rad);
//     },

//     /*
//      *
//      * Returns a random floating point number
//      *
//      * TBR to take into account changes in longitude
//      * 
//      */
//     random : function(min, max){
//         return Math.random() * (max - min) + min;
//     },

//     /*
//      *
//      * checks to see if point is within circle. returns true if INSIDE circle
//      * 
//      */
//     point : function(point, circle){
//         return Geo.isPointInCircle(point, circle, circle.rad);
//     },

//     /*
//      *
//      * finds a random point within BOUNDS of a cirlce. At this point, we do not know
//      * if point is within the circle as the random point could be near the corners.
//      * 
//      */
//     circle : function(circle){
//         var r_lat, r_lng, bounds
//         bounds = this.bounds(circle);
//         r_lat = this.random(bounds[0].latitude, bounds[1].latitude);
//         r_lng = this.random(bounds[1].longitude, bounds[0].longitude);
//         return {
//             latitude : r_lat,
//             longitude : r_lng
//         };
//     },

//     /*
//      *
//      * finds the random point within circle bounds and verifies it is within a circle
//      * 
//      */
//     randomPointInCircle : function(circle){
//         var point = false;
//         while(!point || !this.point(point, circle)){
//             point = this.circle(circle);
//         }
//         return point;
//     },

//     /*
//      *
//      * Finds a random point inside an array of circle. The collection must be set before this
//      * funtion can be called.
//      * 
//      */
//     randomPointInCirclesCollection : function() {
//         var latLng, overlaps, withinCircle, i, l;
//         latLng = this.randomPointInCircle(this.collection[0]);
//         overlaps = this.overlappingCircles();
//         l = overlaps.length;

//         // creates an array of the distances between each 
//         for (i = 0; i < l; i++) {
//             withinCircle = this.point(latLng, overlaps[i]);
//             if(!withinCircle){
//                 return this.randomPointInCirclesCollection();
//             }
//         }
//         return latLng
//     }
// };
