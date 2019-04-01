var Random = (function() {
	'use strict';
	
	function nextDouble() {
		return Math.random();
	}
	
	function nextRange(min, max) {
		var range = max - min;
		return Math.floor((Math.random() * range) + min);
	}
	
	function nextPosCircleVector() {
		var angle = Math.random() * 2 * Math.PI;
        var ydir = Math.sin(angle);
        if(Math.sin(angle) < 0){
            ydir = -Math.sin(angle);
        }
		return {
			x: Math.cos(angle),
			y: ydir,
		};
	}
	
	//
	// This is used to give a small performance optimization in generating gaussian random numbers.
	var usePrevious = false,
		y2;
	
	//
	// Generate a normally distributed random number.
	//
	// NOTE: This code is adapted from a wiki reference I found a long time ago.  I originally
	// wrote the code in C# and am now converting it over to JavaScript.
	//
	function nextGaussian(mean, stdDev) {
		if (usePrevious) {
			usePrevious = false;
			return mean + y2 * stdDev;
		}
		
		usePrevious = true;
		
		var x1 = 0,
			x2 = 0,
			y1 = 0,
			z = 0;
		
		do {
			x1 = 2 * Math.random() - 1;
			x2 = 2 * Math.random() - 1;
			z = (x1 * x1) + (x2 * x2);
		} while (z >= 1);
		
		z = Math.sqrt((-2 * Math.log(z)) / z);
		y1 = x1 * z;
		y2 = x2 * z;
		
		return mean + y1 * stdDev;
	}
	
	return {
		nextDouble : nextDouble,
		nextRange : nextRange,
		nextPosCircleVector : nextPosCircleVector,
		nextGaussian : nextGaussian
	};
	
}());