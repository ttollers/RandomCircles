# RandomCircles

Creates a random point inside a circle or group of overlapping circles.

## Installation
````
npm install random-circles --save
var Random = require('random-circles');
````
RandomCircles is built on top of Geolib. Geolib is the only dependency.

## Circle Object

The Circle object must contain the following:

````
var circle = {
	latitude : number_between_-90_and_90,
	longitude : number_between_-180_and_180
	radius : integer_radius_in_metres
};
````

## Usage - One Circle
````
var Random = require('random-circles');
Random.randomPointInCircle(circle_object_as_above);

````
## Usage - Multiple Cirlces

This takes an array of circle objects as defined above.

First, we filter and sort the circles. This can be done in 2 ways: 

# Method 1: Filter collection from within:

````
Random.randomPointInCirclesCollection([
	{
		lat : lat_of_origin,
		lng : lng_of_origin,
		rad : radius_of_circle_in_metres
	}
	...
}
]);
````
This method will filter and sort the collection each time a random point is calculated.

# Method 2: Filter collection first:

````
var filtered = Random.filterAndSort(circles_collection);

// Notice the second argument:
var randomPoint = Random.randomPointInCirclesCollection(filtered, true);
````
The value, true, will tell the function not to sort and filter the array itself. This is useful if you want to find multiple random points without changing your circles collection. However, you must remember to use filterAndSort() each time your circles change.

````
return_object = {
	latitude : random_latitude_point,
	longitude : random_longitude_point
};
````

## Mechanics

The module will order circles by radius size when the collection set. Then, the bounds of the smallest circle will be calculated and a random location will be found inside.

* This isn't quite random as the changing longitude differential is not taken into account. *

If there is more than one circle in the collection, the module will check to see which (if any) overlap with the smaller circle. If the circles do not overlap at all, the randomPointInCirclesCollection will return false.

See working example at photopunt.com.

## To Do
* Error handling
* Find a better way of creating a random longitude that takes into account variations as you get further north / south.
* Find a method that avoids using the while function.
