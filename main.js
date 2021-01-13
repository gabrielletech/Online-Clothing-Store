//========================================================= CODE ===========================================================================

	let cartItems = [];// empty array to recieve and store items added to the array
	let total = 0;

	let Item = [//array of item objects
		{
			name:"Flowery One-Piece",
			color:"White & Red",
			image: "images/cloth11.jpg",
			price: 20,
			inCart: 0,
		},
		{
			name:"Ruffly Two-Piece",
			image:"images/cloth9.jpg",
			color:"Red",
			price: 25,
			inCart: 0,
		},
		{
			name:"Black Playsuit",
			image: "images/cloth4.jpg",
			color:"Striped Cream",
			price: 15,
			inCart: 0,
		},
		{
			name:"Front tie Shirt Dress",
			image: "images/cloth17.jpg",
			color:"Light Blue",
			price: 30,
			inCart: 0,
		}
	];

	// function for dropdown menu 
	function homeDropdown() {
		document.getElementById("myDropdown").classList.toggle("show");
	}

	function shopDropdown() {
		document.getElementById("myDropdown2").classList.toggle("show");
	}

	function aboutDropdown() {
		document.getElementById("myDropdown3").classList.toggle("show");
	}

	// close the dropdown when a user clicks outside of it 
	window.onclick = function(e) {
		if (!e.target.matches('.dropbtn')) {
			let dropdowns = document.getElementsByClassName("dropdown-content");

			let i;

			for (i = 0; i < dropdowns.length; i++) {
				let openDropdown = dropdowns[i];
				if (openDropdown.classList.contains('show')) {
					openDropdown.classList.remove('show');
				}
			}
		}
	}

$(document).ready(function() {

	let h2 = $(".contact");//jQuery function that animates the heading on the ContactUs.html page
	h2.animate({fontSize: '3em'}, "slow");


	for (i in Item) {//for in loop to display catalogue items on the catalogue page
		$(".shop-container").append(
			`<div class="image">
		    	<img src="${Item[i].image}" alt="${Item[i].name}" class="cataPic responsive rounded">
		    	<h3 class="shopItem">${Item[i].name}</h3>
		    	<h3 class="price">$${Item[i].price}</h3>
		    	<button onclick="add(${i})" class="add-cart cart1"> Quick Add to Cart </button>
    		</div>`)
	}

	cartItems = JSON.parse(localStorage.getItem("cartItems"));
	totalCartCost = JSON.parse(localStorage.getItem("totalCost"));
	for (i in cartItems) {//for in loop that displays items added to cart on the cart page including the remove button
		$(".table").append(
			`
			<tr>
			<td>${cartItems[i].name}</td>
			<td>$ ${cartItems[i].price}</td>
			<td><button onclick="removeItem(${i})" type="button" class="btn btn-secondary btn-sm">Remove Item</button></td>
			</tr>
			
			`);
	}

	$(".table").append(//jQuery function that displays the vat percentage and total cart cost on the cart page
		`<tr><td>VAT: 15%</td><tr> 
		<tr><td id="removePrice">Total Cost: $ ${totalCartCost}</td></tr>`
	);

});
	
	if(JSON.parse(localStorage.getItem("cartItems")) == null || JSON.parse(localStorage.getItem("cartItems")) == undefined) {
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
	}

	function add(i) {//function to add items to the cart and a popup alert displays alerting the user of an item added to card
		cartItems.push(Item[i]);
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
		alert("Item added to cart!")
		cartNumbers();
		totalCost();
		
	}

	function removeItem(i) {//functionality for the remove button to remove items from cart onclick
		cartItems.splice(Item[i], 1);
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
		let action = event.target;
		action.parentElement.parentElement.remove();
		alert("item removed from cart");
		totalCost();//updates total cost when an item is removed
	}


	function cartNumbers() {// function that adds cart numbers to the cart icon span
		document.querySelector(".cart span").textContent = cartItems.length;
	}


	function totalCost() {//function that calculates total cost of items in cart and updates cart cost when an item is removed

		total = 0;
		for(i in cartItems) {//to loop throuh all items in the cart and get the price
			let vat = (0.15 * total);
			total += cartItems[i].price + vat;
		}

			localStorage.setItem("totalCost", total);
			$("#removePrice").html(`Total Cost: $ ${total}`);

		}

	function discount() {//function for discount coupon code to be applied and alter totalcost
		let currentCost = localStorage.getItem("totalCost");
		let userInput = document.getElementById("disCode");

		let discountCode = "HA1FOFF";
		let discountAmount = 0.5 * currentCost;

		if (userInput = discountCode) {
			currentCost = currentCost - discountAmount;
			alert("Discount Applied");
		}
		else if(userInput != discountCode) {
			alert("Invalid Discount Code");
		}

		localStorage.setItem("totalCost", currentCost);//updates current cost when discount is applied
		$("#removePrice").html(`Total Cost: $ ${currentCost}`);

	}

	function calculateDelivery() {//function for adding delivery cost when delivery is selected
		let cost = Number(localStorage.getItem("totalCost"));
		let deliveryFee = 10;

		cost = cost + deliveryFee;
	
		localStorage.setItem("totalCost", cost);
		$("#removePrice").html(`Total Cost: $ ${cost}`);//updates total cost when delivery is selected
	}
//==========================================================END OF CODE======================================================================

	


	
	
	



