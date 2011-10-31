// ***************
// Includes
// ***************

//= require jcanvas/jcanvas.js


// ***************
// Events
// ***************

// On "load"
$('.canvas-container').live('doAnimation', function() {
	if (loggedIn) {
		runCheckinAnimation();
	} else {
		runSampleAnimation();
	}
});

// On animation button trigger
$('a.run-animation').live('click', function() {
	$('.canvas-container').trigger('doAnimation');
	return false;
});


// ***************
// Functions
// ***************

function runCheckinAnimation() {
	// Get foursquare friends
	getFriends(function(friends) {
		// Compile the relevant data points
		var friends_checkins = [];
		$.each(friends, function(index, friend) {
			if (friend.last_checkin) {
				var friend_checkin = {
					x: friend.last_checkin.json.venue.location.lng,
					y: friend.last_checkin.json.venue.location.lat
				};
				friends_checkins.push(friend_checkin); 
			}
		});
		// Get checkins
		getCheckins(function(checkins) {
			// Center at the first checkin location
			var offset = {
				x: (600 - checkins[0].json.venue.location.lng),
				y: (100 - checkins[0].json.venue.location.lat)
			};
			var scale = {
				x: 0,
				y: 0,
				width: 4,
				height: 4
			};
			// Go through each checkin and animate
			$.each(checkins, function(index, checkin) {
				// Get the checkin point
				var point = {
					x: checkin.json.venue.location.lng, 
					y: checkin.json.venue.location.lat
				};
				// Figure and set the timeout for a delayed effect
				var timeout = Math.exp(index)*1000;
				setTimeout(function() {
					// Draw
					drawCompleteFx(point, friends_checkins, offset, scale);
				}, timeout);
			});
		});
	});
}

function getCheckins(callback) {
	callback = callback || $.noop;
	$.ajax({
		url: "/users/checkins",
		data: {},
		type: 'GET',
		dataType: 'json',
		success: function(json) {
			callback(json);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {

		},
	});
}

function getFriends(callback) {
	callback = callback || $.noop;
	$.ajax({
		url: "/users/friends",
		data: {},
		type: 'GET',
		dataType: 'json',
		success: function(json) {
			callback(json);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {

		},
	});
}

function runSampleAnimation() {
	var center_point = {x: 100, y: 200};
	var fx_points = [
		{x: 120, y: 220},
		{x: 200, y: 250},
		{x: 100, y: 250},
		{x: 150, y: 150},
		{x: 80, y: 150},
		{x: 80, y: 180},
		{x: 70, y: 200},
		{x: 60, y: 170},
		{x: 200, y: 300},
		{x: 100, y: 300},
		{x: 120, y: 170},
		{x: 130, y: 180},
		{x: 200, y: 200},
		{x: 50, y: 250},
		{x: 400, y: 10},
		{x: 800, y: 200},
		{x: 700, y: 350}
	];
	
	drawCompleteFx(center_point, fx_points);
	
	setTimeout(function() {
		var center_point = {x: 400, y: 100};
		var fx_points = [
			{x: 420, y: 120},
			{x: 420, y: 80},
			{x: 440, y: 85},
			{x: 380, y: 170},
			{x: 390, y: 70},
			{x: 370, y: 60},
			{x: 220, y: 100},
			{x: 250, y: 50},
			{x: 500, y: 150},
			{x: 800, y: 370},
			{x: 10, y: 370}
		];
		drawCompleteFx(center_point, fx_points);
	}, 6000);
	
	setTimeout(function() {
		var center_point = {x: 200, y: 350};
		var fx_points = [
			{x: 190, y: 330},
			{x: 200, y: 320},
			{x: 220, y: 370},
			{x: 215, y: 360},
			{x: 190, y: 380},
			{x: 10, y: 15},
			{x: 390, y: 50},
			{x: 300, y: 150},
			{x: 800, y: 370},
			{x: 100, y: 370}
		];
		drawCompleteFx(center_point, fx_points);
	}, 12000);
	
	setTimeout(function() {
		var center_point = {x: 800, y: 350};
		var fx_points = [
			{x: 50, y: 100},
			{x: 850, y: 350},
			{x: 820, y: 340},
			{x: 790, y: 360},
			{x: 800, y: 320},
			{x: 250, y: 300},
			{x: 400, y: 150},
			{x: 700, y: 310}
		];
		drawCompleteFx(center_point, fx_points);
	}, 19000);
	
	setTimeout(function() {
		var center_point = {x: 450, y: 250};
		var fx_points = [
			{x: 480, y: 250},
			{x: 490, y: 220},
			{x: 410, y: 210},
			{x: 420, y: 270},
			{x: 400, y: 200},
			{x: 500, y: 250},
			{x: 510, y: 220},
			{x: 420, y: 290},
			{x: 450, y: 100},
			{x: 50, y: 300},
			{x: 440, y: 280},
			{x: 70, y: 10}
		];
		drawCompleteFx(center_point, fx_points);
	}, 30000);
}

function drawCompleteFx(center_point, intersect_points, offset, scale) {
	offset = offset || {x: 0, y: 0};
	scale = scale || {x: 0, y: 0, width:1, height:1};
	
	// Remove the empty spinner
	$('div.canvas-container div.empty').remove();

	// Create the canvas
	var canvas_id = new Date().getTime();
	var z_index		= 0;
	$('div.canvas-container canvas').each(function() {
		var new_z_index = $(this).css('z-index');
		if (new_z_index > z_index) {
			z_index = new_z_index;
		}
	});
	z_index++;
	$('div.canvas-container').prepend('<canvas id="'+canvas_id+'" width="900px" height="400px" style="z-index:'+z_index+';"></canvas>');
	
	// Center the canvas to an offset point
	$('#'+canvas_id).translateCanvas(offset);
	$('#'+canvas_id).scaleCanvas(scale);
	
	// Calculate distances
	for(i=0; i<intersect_points.length;i++) {
		intersect_points[i]['distance'] = distance(center_point, intersect_points[i]);
	}
	// Draw stuff
	var i = 1;
	recursiveFn(canvas_id, center_point, intersect_points, i, function() {
		$("canvas#"+canvas_id).fadeOut(8000, function() {
			$("canvas#"+canvas_id).remove();
		});
	});

}

function recursiveFn(canvas_id, center_point, intersect_points, i, callback) {
	var r = drawSystem(canvas_id, center_point, intersect_points, i);
	
	if (!r) {
		setTimeout(function() {
			i++;
			recursiveFn(canvas_id, center_point, intersect_points, i, function() {
				callback(false);
			})
		}, 1);
	} else {
		callback(true);
	}
}


function drawSystem(canvas_id, center_point, intersect_points, mul) {
	$("canvas#"+canvas_id).clearCanvas({
		x: 0,
		y: 0,
		width:2000,
		height:1000
	});
	var rad = mul;
	
	// center dot
	var center_dot = {
	  fillStyle: "#bbb",
	  x: center_point['x'], 
		y: center_point['y'],
	  radius: rad
	}
	// first ring
	var first_ring = {
	  strokeStyle: "#777",
	  x: center_point['x'], 
		y: center_point['y'],
	  radius: rad
	}
	// second ring
	var second_ring = {
	  strokeStyle: "#999",
	  x: center_point['x'], 
		y: center_point['y'],
	  radius: (rad-4)
	}
	
	// third ring
	var third_ring = {
	  strokeStyle: "#777",
	  x: center_point['x'], 
		y: center_point['y'],
	  radius: (rad-8)
	}
	
	if (mul <= 10) {
		
		// expand center dot
		drawSimpleDot(canvas_id, center_dot);		
	
	} else if ((mul > 10) && (mul <= 12)) {
		
		// contract initial circle
		center_dot['radius'] = (20-rad);
		drawSimpleDot(canvas_id, center_dot);	
		
		// expand first ring
		drawExpandingRing(canvas_id, first_ring, null);
	
	} else if ((mul > 12) && (mul <= 14)) {
		
		// expand initial circle
		center_dot['radius'] = (rad-4);
		drawSimpleDot(canvas_id, center_dot);
		
		// expand first ring
		drawExpandingRing(canvas_id, first_ring, null);
		
	} else if ((mul > 14) && (mul <= 16)) {
		
		// contract initial circle
		center_dot['radius'] = (24-rad);
		drawSimpleDot(canvas_id, center_dot);		
		
		// expand first ring 
		drawExpandingRing(canvas_id, first_ring, null);
		// expand second ring
		drawExpandingRing(canvas_id, second_ring, intersect_points);
		
	} else if ((mul > 16) && (mul <= 18)) { 
		
		// expand initial circle
		center_dot['radius'] = (rad-8);
		drawSimpleDot(canvas_id, center_dot);
		
		// expand first ring 
		drawExpandingRing(canvas_id, first_ring, null);
		// expand second ring
		drawExpandingRing(canvas_id, second_ring, intersect_points);
	
	} else if ((mul > 18) && (mul <= 20)) {
		// contract initial circle 
		center_dot['radius'] = (28-rad);
		drawSimpleDot(canvas_id, center_dot);
		
		// expand first ring 
		drawExpandingRing(canvas_id, first_ring, null);
		// expand second ring
		drawExpandingRing(canvas_id, second_ring, intersect_points);
		// expand third ring 
		drawExpandingRing(canvas_id, third_ring, null);
		
	} else if (mul > 20) {
		// draw center dot
		center_dot['radius'] = 8;
		drawSimpleDot(canvas_id, center_dot);
		
		// expand first ring 
		drawExpandingRing(canvas_id, first_ring, null);
		// expand second ring
		drawExpandingRing(canvas_id, second_ring, intersect_points);
		// expand third ring 
		drawExpandingRing(canvas_id, third_ring, null);
		
	}

	if (mul < 1000) {
		return false;
	} else {
		return true;
	}
}


function drawExpandingRing(canvas_id, ring, intersect_points) {
	// draw the ring
	$("canvas#"+canvas_id).drawArc(ring);
	// check for intersect points
	if (intersect_points != null) {
		for(i=0; i<intersect_points.length;i++) {
			if (ring['radius'] >= intersect_points[i]['distance']) {
				var dot = {
					fillStyle: "#666",
					x: intersect_points[i]['x'],
					y: intersect_points[i]['y'],
					radius: 7
				}
				drawSimpleDot(canvas_id, dot);
			}
		}
	}
}

function drawSimpleDot(canvas_id, dot) {
	dot.radius = dot.radius - 6
	if (dot.radius <= 0) {
		dot.radius = 1;
	}
	$("canvas#"+canvas_id).drawArc(dot);
}






function drawPoint() {
	var canvasElem 		= document.getElementById("main");
	var canvasContext = canvasElem.getContext("2d");
	
	// Draw the circle
	canvasContext.beginPath();
	canvasContext.arc(10, 10, 10, 0, Math.PI * 2, false);
	canvasContext.closePath();
	
	// Set the color and style
	canvasContext.fillStyle = "#FFF";
	canvasContext.fill();
	
	canvasContext.translate(10, 5);

	$("canvas").drawArc({
	  fillStyle: "#999",
	  x: 50, 
		y: 50,
	  radius: 25
	});

}

function drawRipple(mul) {
	

	
	var canvasElem 		= document.getElementById("main");
	var canvasContext = canvasElem.getContext("2d");
	
	// Draw the circle
	canvasContext.beginPath();
	var radius = mul*10;
	canvasContext.arc(10, 10, radius, 0, Math.PI * 2, false);
	canvasContext.closePath();
	
	// Set the color and style
	canvasContext.strokeStyle = "#FFF";
	canvasContext.stroke();
}

function drawRippleFx(center_point, fx_points) {
	var i = 1;
	
	var center_circle = {
		x: center_point['x'],
		y: center_point['y'],
		fillStyle: "#aaa",
		radius: 3
	}
	
	var center_ring = {
		x: center_point['x'],
		y: center_point['y'],
		strokeStyle: "#555",
		radius: 12
	}
	
	animateBubble(center_circle, 12);
	// animateBubble(center_ring, 200);
//	animateBubble(center_circle, 8);
//	animateBubble(center_circle, 12);
// 	animateBubble(center_circle, 8);

}

function animateBubble(circle, newRad) {
	$(circle)
		.animate({
			radius: newRad
		}, {
			// Draw every frame
			duration: 20000,
			step: function() {
				drawSimpleCircle(circle);
			}
		});
}




function drawSimpleCircle(circle) {
	$("canvas").clearCanvas();
	$("canvas").drawArc(circle);
}

function drawCenterCircleFX(center_circle, mul) {
	if (mul%10 == 0) {
		if (center_circle['radius'] == 8) {
			center_circle['radius'] = 6;
		} else {
			center_circle['radius'] = 8;
		}
	}
	$("canvas").clearCanvas();
	$("canvas").drawArc(center_circle);
}

function drawCircle() {
	var i = 1;
	var circle = {
	  fillStyle: "#aaa",
	  x: 300, 
		y: 100,
	  radius: 8
	};
	
	var secondCircle = {
		fillStyle: "#777",
	  x: 400, 
		y: 150,
	  radius: 4
	}

	// Draw initial circle
	drawRipple(circle, secondCircle, i);

	// Animate object properties
	$(circle)
		.delay(100)
		.animate({
	  	radius: 8
	  }, {
	    // Draw every frame
	    duration: 10000,
	    step: function() {
				drawRipple(circle, secondCircle, i);
				i++;
			},
			complete: function() {
				console.log("test");
			}
	  });
}

// Function to draw circle
function drawRipple(circle, secondCircle, mul) {
	var rad = 8+(2*mul);
	var mainRipple = {
	  strokeStyle: "#ccc",
	  x: 300, 
		y: 100,
	  radius: rad
	};
	
	var outerRipple = {
	  strokeStyle: "#555",
	  x: 300, 
		y: 100,
	  radius: rad+(mul/2)
	};
	
	var innerRipple = {
	  strokeStyle: "#555",
	  x: 300, 
		y: 100,
	  radius: rad-(mul/2)
	};
	
	var p1 = {
		x: circle['x'],
		y: circle['y']
	};
	var p2 = {
		x: secondCircle['x'], 
		y: secondCircle['y']
	};
	var d = distance(p1, p2);

	
	$("canvas").clearCanvas();
	$("canvas").drawArc(circle);
	
	if (rad+(mul/2) > d) {
		secondCircle['fillStyle'] = "#444";
		$("canvas").drawArc(secondCircle);
	}
	
	if (rad > d) {
		secondCircle['fillStyle'] = "#555";
		$("canvas").drawArc(secondCircle);
	}
	
	if (rad-(mul/2) > d) {
		secondCircle['fillStyle'] = "#777";
		$("canvas").drawArc(secondCircle);
	}
	
	$("canvas").drawArc(mainRipple);
	$("canvas").drawArc(outerRipple);
	$("canvas").drawArc(innerRipple);
	
}

function distance(p1, p2) {
	return Math.sqrt(((p2['x']-p1['x'])*(p2['x']-p1['x'])) + ((p2['y']-p1['y'])*(p2['y']-p1['y'])));
}