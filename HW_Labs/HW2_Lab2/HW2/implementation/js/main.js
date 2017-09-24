// DATASETS

// Global variable with 1198 pizza deliveries
// console.log(deliveryData);

// Global variable with 200 customer feedbacks
// console.log(feedbackData.length);


// FILTER DATA, THEN DISPLAY SUMMARY OF DATA & BAR CHART



createVisualization();

function createVisualization() {
	var globalData = deliveryData;
	var globalFeed = feedbackData;
	var selectBox1 = document.getElementById("area");
  	var area = selectBox1.options[selectBox1.selectedIndex].value;
  
  	var selectBox2 = document.getElementById("order-type");
  	var orderType = selectBox2.options[selectBox2.selectedIndex].value;
  
  	if (area != "all") {
  		var filtered = globalData.filter( function(value) {
  			return (area == value.area);
  		});

  		globalData = filtered;
  	}


  	if (orderType != "all") {
  		var filtered =  globalData.filter( function(value) {
  			return (orderType == value.order_type);
  		});
  		globalData = filtered;
  	}	

  	var ids = [];
	for (i = 0; i < globalData.length; i++) {
		ids.push(globalData[i].delivery_id);
	}

	globalFeed = globalFeed.filter(function (value) {
		return (ids.includes(value.delivery_id));
	});

  	renderBarChart(globalData);

  	showDataset(globalData, globalFeed);

}

function showDataset(data, feed) {
	var numDeliveries = data.length;
	var numPizzasDelivered = 0;
	var deliveryTime = 0;
	var totalSales = 0;

	data.filter( function(value, index) {
		numPizzasDelivered += value.count;
		deliveryTime += value.delivery_time;
		totalSales += value.price;
	});

	var avgDeliveryTime = deliveryTime / numPizzasDelivered;

	var feedbackEntries = feed.length;
	var feedbackLow = 0;
	var feedbackMedium = 0;
	var feedbackHigh = 0;

	feed.filter(function (value) {
        if(value.quality === "low")
            feedbackLow += 1;
        if(value.quality === "medium")
            feedbackMedium += 1;
        if(value.quality === "high")
            feedbackHigh += 1;
    });

    
    document.getElementById("pizza_d").innerHTML = numPizzasDelivered;
    document.getElementById("num_all").innerHTML = numDeliveries;
    document.getElementById("avg_time").innerHTML = avgDeliveryTime.toFixed(2);
    document.getElementById("total_s").innerHTML = "$" + totalSales.toFixed(2);
    document.getElementById("num_feed").innerHTML = feedbackEntries;
    document.getElementById("feed_low").innerHTML = feedbackLow;
    document.getElementById("feed_med").innerHTML = feedbackMedium;
    document.getElementById("feed_high").innerHTML = feedbackHigh;
}

function showVisualization() {



}

