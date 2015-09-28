# RandomCircles

Creates a random point inside a circle or group of overlapping circles.

## Installation

npm install random-circles --save

RandomCircles is built on top of Geolib. Geolib is the only dependency.

## Usage

var Random = require('random-circles');

The collection is an array of circle objects

Random.setCollection([
	{
		lat : lat_of_origin,
		lng : lng_of_origin,
		rad : radius_of_circle_in_metres
	}
]);
** Don't set the collection directly **

var randomPositionInCircleArray = Random.randomPointInCirclesCollection();

## Mechanics

The module will order circles by radius size when the collection set. Then, the bounds of the smallest circle will be calculated and a random location will be found inside.

* This isn't quite random as the changing longitude differential is not taken into account. *

If there is more than one circle in the collection, the module will check to see which (if any) overlap with the smaller circle. If the circles do not overlap at all, the randomPointInCirclesCollection will return false.

See working example here.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

TODO: Write history

## Credits

TODO: Write credits

## License

TODO: Write license
