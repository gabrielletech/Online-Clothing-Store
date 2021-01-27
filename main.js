//========================================================= CODE ===========================================================================

	let cartItems = [];// empty array to recieve and store items added to the array
	let total = 0;

	let Item = [//array of item objects
		{
			name:"Polka Dot Mini",
			image: "/images/119469273_1257141594645713_3489490998363617874_n.jpg",
			price: 8.99,
			inCart: 0,
		},

		{
			name: "Exotic Maxi Dress",
			image: "/images/115889193_1215859095440630_3124536734724679976_n.jpg",
			price: 11.99,
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
		$(".product-items").append(
			`<li>
				<div class="box">
					<div class="slide-img">
						<img src="${Item[i].image}" alt="image" />
					</div>
					<div class="detail-box">
						<div class="type">
							<a href="#">${Item[i].name}</a>
							<span>NEW</span>
							<small class="in-stock">In Stock</small>
							<a href="#" class="price">$ ${Item[i].price}</a>
							<div class="action-btn">
								<button onclick="add(${i})" class="add-cart">Add to Cart</button>
								<ion-icon class="like" name="heart"></ion-icon>
							</div>
						</div>  
					</div>
				</div>
            </li>`)
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
		document.querySelector(".shop-cart span").textContent = cartItems.length;
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

	// blog page filter selection
	filterSelection("all") //execute the function and show all columns 

	function filterSelection(c) {
		let x, i;
		x = document.getElementsByClassName("blog-col");
		if(c == "all") c = "";
		// add the show-blogs class to the filtered elements and remove the show-blogs class from the elements that aren't selected
		for (i = 0; i < x.length; i++) {
			removeBlog(x[i], "show-blogs");
			if (x[i].className.indexOf(c) > -1) addBlog(x[i], "show-blogs")
		}
	}

	//show filtered blogs
	function addBlog(element, name) {
		let i, arr1, arr2;
		arr1 = element.className.split(" ");
		arr2 = name.split(" ");
		for (i = 0; i < arr2.length; i++) {
			if (arr1.indexOf(arr2[i]) == -1) {
				element.className += " " + arr2[i];
			}
		}
	}

	// hide blogs not selected
	function removeBlog(element, name) {
		let i, arr1, arr2;
		arr1 = element.className.split(" ");
		arr2 = name.split(" ");
		for (i = 0; i < arr2.length; i++) {
			while (arr1.indexOf(arr2[i]) > -1) {
				arr1.splice(arr1.indexOf(arr2[i]), 1);
			}
		}
		element.className = arr1.join(" ");
	}

	//add active class to the current button 
	let btnContainer = document.getElementById("myBtnContainer");
	let btns = btnContainer.getElementsByClassName("blog-btn");
	for (let i = 0; i < btns.length; i++) {
		btns[i].addEventListener("click", function(){
			let current = document.getElementsByClassName("active");
			current[0].className = current[0].className.replace(" active", "");
			this.className += " active";
		});
	}

	/* Back to top on scroll button */
	myButton = document.getElementById("myBtn");

	// when the user scrolls down 20px from the top of the document, show the button
	window.onscroll = function() {scrollFrunction()};

	function scrollFunction() {
		if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
			myButton.style.display = "block";
		} else {
			myButton.style.display = "none";
		}
	}

	// when the user clicks the button, scroll to the top of the document
	function topFunction() {
		document.body.scrollTop = 0; // for Safari
		document.documentElement.scrollTop = 0; // Chrome, Firefox, IE and Opera
	}

	// TABS
	function checkoutOption(evt, option) {
		let i, tabcontent, tablinks;
	

	// get all elements "tabcontent" and hide them 
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	//get all elements "tablinks" and remove the class active
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// show the current tab and add active class to the btn that opened the tab 
	document.getElementById(option).style.display = "block";
	evt.currentTarget.className += " active";
}


//==========================================================END OF CODE======================================================================

	


	
	
	



