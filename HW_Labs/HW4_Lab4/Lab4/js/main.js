
var margin = {top: 20, right: 10, bottom: 50, left: 70};

// SVG Size
var width = 700 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

// Load CSV file
d3.csv("data/wealth-health-2014.csv", function(data){

	// Analyze the dataset in the web console
	console.log(data);
	console.log("Countries: " + data.length)

	data.forEach(function(d) {
		d.Income = +d.Income;
		d.LifeExpectancy = +d.LifeExpectancy;
		d.Population = +d.Population;
	})

	data.sort(function(a, b) {
		return b.Population - a.Population;
	})

	var svg = d3.select("#chart-area").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var incomeMin = d3.min(data, function(d) { return d.Income;});
	var incomeMax = d3.max(data, function(d) { return d.Income;});

	var lifeMin = d3.min(data, function(d) { return d.LifeExpectancy;});
	var lifeMax = d3.max(data, function(d) { return d.LifeExpectancy;});

	var popMax = d3.max(data, function(d) {return d.Population;});

	var incomePadding = 100;
	var lifePadding = 10;

	var incomeScale = d3.scaleLog()
		.domain([incomeMin - incomePadding, incomeMax + incomePadding])
		.range([0, width]);

	var lifeExpectancyScale = d3.scaleLinear()
		.domain([lifeMin - 5, lifeMax + 5])
		.range([height, 0]);

	var populationScale = d3.scaleLinear()
		.domain([0, popMax])
		.range([4, 30]);

	console.log(incomeScale(5000));

	console.log(lifeExpectancyScale(68));

	var colorPalette = d3.scaleOrdinal(d3.schemeCategory10);

	svg.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("cx", function(d) {
			return incomeScale(d.Income);
		})
		.attr("cy", function(d) {
			return lifeExpectancyScale(d.LifeExpectancy);
		})
		.attr("r", function(d) {
			return populationScale(d.Population);
		})
		.attr("fill", function(d) {
			return colorPalette(d.Region);
		})
		.attr("class", "circ-circle");


	var group = svg.append("g")
		.attr("transform", "translate(70, 50)");

    var xScale = d3.scaleLinear()
        .domain([incomeMin - incomePadding, incomeMax + incomePadding])
        .range([0, width]);

    var yScale = d3.scaleLinear()
        .domain([lifeMin - 5, lifeMax + 5])
        .range([height, 0]);

	var xAxis = d3.axisBottom()
		.scale(xScale)
		.ticks(6)

	var yAxis = d3.axisLeft()
		.scale(yScale);
	
	// Draw the axis
	svg.append("g")
		.attr("class", "axis x-axis")
		.attr("transform", "translate(0," + (height) + ")")
		.call(xAxis)
		.append("text")
		.attr("class", "axis-label")
		.attr("transform", "translate(" + (width / 2) + ", 40)")
		.text("Income");

	svg.append("g")
		.attr("class", "axis y-axis")
		.attr("transform", "translate(" + 0 + ", 0)")
		.call(yAxis)
		.append("text")
		.attr("class", "axis-label")
		.attr("transform", "translate(-35, " + 170 + ") rotate(-90)")
		.text("Life Expectancy");

});

