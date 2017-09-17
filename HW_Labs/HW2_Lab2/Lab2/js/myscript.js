console.log("My debug message");
var debugId = 12;
console.log("Another debug message with id: " + debugId);


var amusementRides = [
	{
		"id": 1,
		"name": "Top Thrill Dragster",
		"price": 4.50,
		"days": ["Thursday", "Friday", "Monday"],
		"access": "no"
	},
	{
		"id": 2,
		"name": "Wooden Giant",
		"price": 2.30,
		"days": ["Monday", "Wednesday", "Friday", "Saturday"],
		"access": "no"
	},
	{
		"id": 3,
		"name": "Millenium",
		"price": 5.60,
		"days": ["Tuesday", "Wedesnday", "Sunday"],
		"access": "yes"
	}
]

console.log("Name of the ﬁrst amusement ride: " + amusementRides[0].name);
console.log("All days when the second attraction is open: " + amusementRides[1].days);
console.log("First item of the list of opening days from the second amusement ride: " + amusementRides[1].days[1]);
console.log("There is a 50% discount for your third attraction: " + amusementRides[2].price * 0.50);

var amusementRidesDouble = doublePrices(amusementRides);

function doublePrices(amusementRides) {
	for (rides in amusementRides) {
		if (rides != 1) {
			amusementRides[rides].price *= 2;
		}
	}
	return amusementRides;
}


function debugAmusementRides(amusementRides) {

	for (rides in amusementRides) {
		console.log("Name: " + amusementRides[rides].name + ", Price: $" + amusementRides[rides].price);
	}
}

debugAmusementRides(amusementRides);


// Changing the DOM with JS Activity

document.getElementById("content-1").innerHTML = '<h1>Headline</h1>...and some text';

// Loop through array, build HTML block and finally display it on the page
var fruits = ["Orange", "Banana", "Apple"];
var result = '';
for (var i = 0; i < fruits.length; i++) {
	result += fruits[i] + "<br/>";
}

document.getElementById("content-2").innerHTML = result;

function displayName_Price(amusementRides){
	res = '';
	for (rides in amusementRides) {
		res += "Name: " + amusementRides[rides].name + ", Price: $" + amusementRides[rides].price + "<br/>";
	}
	return res;
}


document.getElementById("content-3").innerHTML = displayName_Price(amusementRides);