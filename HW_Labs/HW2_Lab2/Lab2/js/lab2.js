
// Global variable with 60 attractions (JSON format)
// console.log(attractionData);

dataFiltering();

function dataFiltering(type) {
	var attractions = attractionData;

	var selectBox = document.getElementById("SELECT-ID");
	var selectedValue = selectBox.options[selectBox.selectedIndex].value;
	var filtered;

	if (selectedValue == "all") {
		filtered = attractions;
	}

	else {
		filtered = attractions.filter( function(value) {
			return value.Category == selectedValue;
		});
	}

	attractions.sort( function(a, b){
		return b.Visitors - a.Visitors;
	});

	filter5 = filtered.filter( function(value, index) {
		return index < 5;
	})

	renderBarChart(filter5);

}

function dataManipulation(){
	dataFiltering();
}