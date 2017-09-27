
// SVG Size
var width = 700,
		height = 500;


// Load CSV file
d3.csv("data/wealth-health-2014.csv", function(data){

	// Analyze the dataset in the web console
	console.log(data);
	console.log("Countries: " + data.length)

	var svg = d3.select("#chart-area").append("svg")
		.attr("width", width)
		.attr("height", height);

	var incomeMin = d3.min(data, function(d) {
		return +d.Income;
	});

	var incomeMax = d3.max(data, function(d) {
		return +d.Income;
	});

	var lifeMin = d3.min(data, function(d) {
		return +d.LifeExpectancy;
	});

	var lifeMax = d3.max(data, function(d) {
		return +d.LifeExpectancy;
	});

	var padding = 30;

	var incomeScale = d3.scaleLinear()
		.domain([incomeMin, incomeMax])
		.range([0, width]);

	var lifeExpectancyScale = d3.scaleLinear()
		.domain([lifeMin, lifeMax])
		.range([height, 0]);

	console.log(incomeScale(5000));

	console.log(lifeExpectancyScale(68));


	/*svg.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("cx", function(d) {return })*/


});

