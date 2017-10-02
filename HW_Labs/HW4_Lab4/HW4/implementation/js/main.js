// 4. D3 margin convention
var margin = {top: 100, right: 100, bottom: 60, left: 80};

var width = 670 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

// 3. Preparing data for area chart
var formatTime = d3.timeParse("%Y-%m-%d");

// 3. Load CSV file
d3.csv("data/zaatari-refugee-camp-population.csv", function(data){

	// Analyze the dataset in the web console
	//console.log(data);

	// 3. Preparing data for area chart
	data.forEach(function(d) {
		d.population = +d.population;
		d.date = formatTime(d.date);
	})

	// 5. linear scale for x-axis and y-axis
	var popMax = d3.max(data, function(d) {
		return d.population;
	});

	var dateScale = d3.scaleTime()
		.domain([data[0].date, data[280].date])
		.range([0, width]);

	var popScale = d3.scaleLinear()
		.domain([0, popMax])
		.range([height, 0]);

	var svg = d3.select("#chart-area").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// 6. Define area chart
	var area = d3.area()
		.x(function(d) {return dateScale(d.date);})
		.y0(height)
		.y1(function(d) {return popScale(d.population);});

	var path = svg.append("path")
		.datum(data)
		.attr("class", "area")
		.attr("d", area);

	// 7. append x- and y-axes and add a chart title
	var displayMonths = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

	var xAxis = d3.axisBottom()
		.scale(dateScale)
		.tickFormat(function(d) { 
			return displayMonths[d.getMonth()] + " " + d.getFullYear(); 
		});

	var yAxis = d3.axisLeft()
		.scale(popScale);

	// x axis label
	svg.append("g")
		.attr("class", "axis x-axis")
		.attr("transform", "translate(0," + (height) + ")")
		.call(xAxis)
		.selectAll("text")
		.attr("x", -15)
		.attr("transform", "rotate(-15)");

	// y axis label
	svg.append("g")
		.attr("class", "axis y-axis")
		.call(yAxis);

	// x axis label beneath
	svg.append("g")
		.append("text")
		.attr("class", "axis-label")
		.text("Date")
		.attr("x", width / 2)
		.attr('y', height + 50);

	// y axis label beneath
	svg.append("g")
		.append("text")
		.attr("class", "axis-label")
		.text("Population")
		.attr("x", -70)
		.attr('y', height / 2)
		.attr('transform', 'rotate(-90 ' + -60 + ' ' + height/2 + ')');

	// chart title
	svg.append("text")
		.attr("class", "chart-label")
		.text("Camp Population")
		.attr('x', width / 2)
    	.attr('y', -10);


    /****************************************************/

    var bisectDate = d3.bisector(function(d) {
    	return d.date;
    })
    .left;

    var focus = svg.append("g")
    	.style("display", "none");

    focus.append("line")
    	.attr("class", "vert-line")
    	.attr("y1", 0)
	    .attr("y2", height);

	focus.append("text")
	    .attr("class", "pop-text")
	    .attr("dx", 10)
	    .attr("dy", 10);

	focus.append("text")
		.attr("class", "date-text")
		.attr("dx", 10)
		.attr("dy", 30);

	svg.append("rect")
		.attr("width", width)
		.attr("height", height)
		.style("fill", "none")
		.style("pointer-events", "all")
		.on("mouseover", function() {focus.style("display", null);})
		.on("mouseout", function() {focus.style("display", "none");})
		.on("mousemove", mousemove);


    function mousemove() {
    	var x0 = dateScale.invert(d3.mouse(this)[0]),
    		i = bisectDate(data, x0, 1),
    		d0 = data[i - 1],
    		d1 = data[i],
    		d = x0 - d0.date > d1.date - x0 ? d1 : d0;

	    var year = d3.timeFormat("%Y")(d.date) - 2000;

	    focus.select("text.pop-text")
	      .attr("transform", 
	      	"translate(" + dateScale(d.date) + ",0)")
	      .text(d3.format(",")(d.population));

	    focus.select("text.date-text")
	      .attr("transform", 
	      	"translate(" + dateScale(d.date) + ",0)")
	      .text(d3.timeFormat("%m/%d/" + String(year))(d.date));

	    focus.select("line.vert-line")
	      .attr("transform", 
	      	"translate(" + dateScale(d.date) + ",0)")
    }

    /*****************************************************/

    var shelterTypes = [
    	{
    		type: "Caravans",
    		percent: 0.7968
    	},
    	{
    		type: "Both",
    		percent: 0.1081
    	},
    	{
    		type: "Tents",
    		percent: 0.0951
    	}
    ];


    var typeScale = d3.scaleBand()
    	.domain(shelterTypes.map(function(d) {
    		return d.type;
    	}))
    	.range([0, width])
    	.padding(0.1);

    var percentScale = d3.scaleLinear()
    	.domain([0, 1])
    	.range([height, 0]);

    // 9. create vertical bar chart
	var svg2 = d3.select("#chart-bar").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// 9. define bar chart
	var group2 = svg2.append("g")
		
	group2.selectAll("rect")
		.data(shelterTypes)
		.enter()
		.append("rect")
		.attr('class', 'bar')
		.attr('x', function(d) {
    		return typeScale(d.type);
  		})
  		.attr('y', function(d) {
    		return percentScale(d.percent);
  		})
	  	.attr('width', function(d) {
	    	return typeScale.bandwidth();
	  	})
	  	.attr('height', function(d) {
	    	return height - percentScale(d.percent);
	  	});

	group2.selectAll(".bar-label")
		.data(shelterTypes)
		.enter()
		.append("text")
		.attr('class', 'bar-label')
		.attr('x', function(d) {
	    	return typeScale(d.type) + typeScale.bandwidth()/2;
	  	})
	  	.attr('y', function(d) {
	    	return percentScale(d.percent) - 10;
	  	})
	  	.text(function(d) {
	  		return d3.format(".2%")(d.percent);
	  	});
	  	
	var xAxis2 = d3.axisBottom()
		.scale(typeScale);

	var yAxis2 = d3.axisLeft()
		.scale(percentScale)
		.tickFormat(d3.format(".0%"));


	// x axis label
	svg2.append("g")
		.attr("class", "axis x-axis")
		.attr("transform", "translate(0," + (height) + ")")
		.call(xAxis2);

	// y axis label
	svg2.append("g")
		.attr("class", "axis y-axis")
		.call(yAxis2);

	// x axis label beneath
	svg2.append("g")
		.append("text")
		.attr("class", "axis-label")
		.text("Shelter Type")
		.attr("x", (width / 2) - 50)
		.attr('y', height + 50);

	// y axis label beneath
	svg2.append("g")
		.append("text")
		.attr("class", "axis-label")
		.text("Percentage ")
		.attr("x", -70)
		.attr('y', height / 2)
		.attr('transform', 'rotate(-90 ' + -50 + ' ' + height/2 + ')');

	// chart title
	svg2.append("text")
		.attr("class", "chart-label")
		.text("Type of Shelter")
		.attr('x', width / 2)
    	.attr('y', -10);

});

