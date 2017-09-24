// Activity 1 
/*var svg = d3.select("body").append("svg")
	.attr("width", 500)
	.attr("height", 400);

svg.append("rect")
	.attr("fill", "green")
	.attr("width", 400)
	.attr("height", 200)
	.attr("y", 0)
	.attr("x", 0);

d3.select("body").append("div").text("Dynamic Content");

// Binding Data to DOM Elements

var states = ["Connecticut", "Main", "Massachusetts", "New Hampshire", "Rhode Island", "Vermont"];

d3.select("body").style("background-color", "#EEE");

var p = d3.select("body").selectAll("p")
	.data(states)
	.enter()
	.append("p")
	.text( function (d) { return d; })
	.attr("class", "custom-paragraph")
	.style("color", "blue")
	.style("font-weight", function(d) {
		if(d == "Massachusetts")
			return "bold";
		else
			return "normal";
	});

var numericData = [1, 2, 4, 8, 16];

// Add svg element (drawing space)
var svg = d3.select("body").append("svg")
	.attr("width", 300)
	.attr("height", 50);

// Add rectangle
svg.selectAll("rect")
	.data(numericData)
	.enter()
	.append("rect")
	.attr("fill", "red")
	.attr("width", 50)
	.attr("height", 50)
	.attr("y", 0)
	.attr("x", function(d, index) {
		return (index * 60);
	}); */

// Activity 3

// 3.2 
d3.csv("../data/cities.csv", function(data) {
	console.log("data:", data);

	// 3.3
	var eu = data.filter(function(city) {
		return city.eu === "true";

	});

	// 3.4
	d3.select("body").append("p").text("Number of EU cities: " + eu.length);

	// 3.5
	eu.forEach(function(city) {
		city.population = +city.population;
		city.x = +city.x;
		city.y = +city.y;
	});

	// 3.6 and 3.7
	var svg = d3.select("body").append("svg")
		.attr("width", 700)
		.attr("height", 550);

	svg.selectAll("circle")
		.data(eu)
		.enter()
		.append("circle")
		.attr("fill", function(d) {
			return d.population > 1000000 ? "#1abc9c" : "#f39c12";
		})
		.attr('cx', function(d) {
			return d.x;
		})
		.attr('cy', function(d) {
			return d.y;
		})
		.attr('r', function(d) {
			return d.population > 1000000 ? 8 : 4;
		});

	// 3.8
	svg.selectAll("text")
		.data(eu)
		.enter()
		.append('text')
		.attr('class', 'city-label')
		.attr('x', function(d) {
			return d.x;
		})
		.attr('y', function(d) {
			return d.y - 15;
		})
		.attr('opacity', function(d) {
			return d.population >= 1000000 ? 1 : 0
		})
		.text(function(d) {
			return d.city;
		});

});