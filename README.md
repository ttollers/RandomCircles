# RandomCircles

Creates a random point inside a circle or group of overlapping circles.

## Installation

npm install random-circles --save
var Random = require('random-circles');

RandomCircles is built on top of Geolib. Geolib is the only dependency.

## Circle Object

The Circle object must contain the following:

````
var circle = {
	latitude / lat : integer_between_-90_and_90,
	longitude / lng : integer_between_-180_and_180
	id / rad / radius : integer_radius_in_metres
};
````

## Usage - One Circle
````
Random.randomPointInCircle(circle_object_as_above);
````
## Usage - Multiple Cirlces

This takes an array of circle objects as defined above.

First, we must set the circles collection. We do this seperately so we can call the random function more than once without setting the collection each time.

````
Random.setCollection([
	{
		lat : lat_of_origin,
		lng : lng_of_origin,
		rad : radius_of_circle_in_metres
	}
	...
}
]);
````
** Don't set the collection directly **

You can then call the random function as follows:
````
var randomPositionInCircleArray = Random.randomPointInCirclesCollection();
````
This will return a latitude longitude object:

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

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


