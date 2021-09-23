frappe.ready(function() {
	console.log(frappe.session.user)
	// HTML Tempalate
	
	const login_required = `
	<div class="alert alert-danger" role="alert">
		You need to Login
  	</div>
	`
	const title = `<h2>PAYMENT METHOD</h2>`
	const button = `
	<div class="container">
	<div class="row">
		<div class="col btn mx-3 btn_label" id="card">
			Card
		</div>
		<div class="col btn mx-3 btn_label" id="grabpay">
			Grabpay
		</div>
		<div class="col btn mx-3 btn_label" id="gcash">
			Gcash
		</div>
	</div>
	</div>
	`
	const gcas_form =`
	<div class="gcash_form_container my-5 p-5 border "
		<h4></h4>
		<h4>Gcash Payment Form</h4>
		<form>
			<div class="row">
				<div class="col text12">
				<label for="Gcash_Number" class="form-label">Number (Registered in Gcash)</label>
				<input type="number" class="form-control" value="" placeholder="09205643264" id="Gcash_Number">
				</div>
				<div class="col text12">
				<label for="Gcash_Name" class="form-label">Full Name (Registered in Gcash)</label>
				<input type="text" class="form-control" placeholder="Juan Cruz" id="Gcash_Name">
				</div>
			</div>
		</form>
	</div>
	`
	const billing_details = `
		<div class="container p-5 border">
			<h4>Billing Details</h4>
			<form class="needs-validation" novalidate>
			<div class="row">
				<div class="col text12">
					<label class="text12" for="Full_Name" class="form-label">Full Name</label>
					<input type="text" class="form-control" placeholder="Juan Cruz" id="Full_Name">
				</div>
				<div class="col">
					<label class="text12" for="Address_Line1" class="form-label">Address (Line 1)</label>
					<input type="text" class="form-control text12" placeholder="#28 Molina street" id="Address_Line1">
				</div>
			</div>
			<div class="row mt-1">
				<div class="col">
					<label class="text12" for="Phone_Number" class="form-label">Phone Number</label>
					<input type="text" class="form-control text12" placeholder="092087656432" id="Phone_Number">
				</div>
				<div class="col">
					<label class="text12" for="Address_Line2" class="form-label">Address (Line 2)</label>
					<input type="text" class="form-control text12" placeholder="#24 Molina street" id="Address_Line2">
				</div>
			</div>
			<div class="row mt-1">
				<div class="col">
					<label class="text12" class="form-label">Email</label>
					<input type="text" class="form-control text12" value=${frappe.session.user} id="Email" disabled readonly>
				</div>
				<div class="col">
					<label class="text12" for="Address_Line2" class="form-label p-4">Country</label></br>
					<select class="form-select text12" id="Country_Select"></select>
				</div>
			</div>
			<div class="row mt-1">
				<div class="col-4">
					<label class="text12" for="State" class="form-label">State</label>
					<input type="text" class="form-control text12" placeholder="NCR" id="State">
				</div>
				<div class="col-4">
					<label class="text12" for="City" class="form-label">City</label>
					<input type="text" class="form-control text12" placeholder="Valenzuela" id="City">
				</div>
				<div class="col-4">
					<label class="text12" for="Zip_Code" class="form-label">Zip Code</label>
					<input type="text" class="form-control text12" placeholder="1447" id="Zip_Code">
				</div>
			</div>
			</form>
		</div>
	`
	const payment_choice = `
	<div class="form-check text12">
		<input class="form-check-input" type="checkbox" value="" id="installment" checked>
		<label class="form-check-label" for="installment">
			Installment
		</label>
		</div>
		<div class="form-check text12">
		<input class="form-check-input" type="checkbox" value="" id="fullpayment">
		<label class="form-check-label" for="fullpayment">
			Full Payment
		</label>
	</div>
	`
	const next_button = `
		<button class="btn my-5" id="paynow_btn">Pay Now</button>
	`
	// Apply the template
	if(frappe.session.user === "Guest"){
		$(".align-items-center").append(login_required).removeClass("d-flex justify-content-between align-items-center")
	}else{
		// Functions
		
		const gcash = () => {
			console.log("gcash click")
		}
		const card = () => {
			console.log("card click")
		}
		const grabpay = () => {
			console.log("grabpay click")
		}
		$(".align-items-center").append(title + button + gcas_form + billing_details + payment_choice + next_button).removeClass("d-flex justify-content-between align-items-center")
	
		// Call the function
		$("#card").click(function(){
			card()
		});
		$("#grabpay").click(function(){
			grabpay()
		});
		$("#gcash").click(function(){
			gcash()
		});
		//get country list
		(function() {
			fetch('https://countriesnow.space/api/v0.1/countries')
			.then(res => res.json())
			.then(res => {
				const list = res.data
				var elm = document.getElementById('Country_Select'),
				df = document.createDocumentFragment();
				for (var i = 0; list.length > i; i++) {
					var option = document.createElement('option');
					option.value = i;
					option.appendChild(document.createTextNode(list[i].country));
					df.appendChild(option);
				}
				elm.appendChild(df);
			})
			
		}());
		// checkbox
		$( "#installment" ).click(function() {
			console.log("check ins")
			$("#fullpayment").prop('checked', false)
		});
		$( "#fullpayment" ).click(function() {
			console.log("check full")
			$("#installment").prop('checked', false)
		});
		// input value
		// Details variable
		var gcash_number =""
		var gcash_name =""
		// Gcash
		const input_id = ["Gcash_Number", "Gcash_Name","Full_Name","Address_Line1","Phone_Number","Address_Line2","Email","Country_Select","State","City","Zip_Code"]
		// $( "#Gcash_Number" ).keyup(function() {
		// 	var value = $( this ).val();
		// 	gcash_number = value
		// }).keyup();
		input_id.forEach(element => {
			console.log("#" + element)
		});
		// pay button
		$('#paynow_btn').click( function(){
			alert(gcash_number)
		})
	}
})