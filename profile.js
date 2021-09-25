frappe.ready(function() {
	console.log(frappe.session.user)
	// HTML Tempalate
	// head function
	// with comma
	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	fetch('http://localhost:8080/api/resource/Fees')
	.then(res => res.json())
	.then(res => {
		var name = res.data[0].name
		if(res.data.length != 0){
			fetch('http://localhost:8080/api/resource/Fees/'+name)
			.then(res => res.json())
			.then(res => {
				console.log(res.data)
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
							<input type="number" class="form-control" value="" id="Gcash_Number">
							</div>
							<div class="col text12">
							<label for="Gcash_Name" class="form-label">Full Name (Registered in Gcash)</label>
							<input  class="form-control" id="Gcash_Name">
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
								<p class="border p-2">${res.data.student_name}</p>
							</div>
							<div class="col">
								<label class="text12" for="Address_Line1" class="form-label">Address (Line 1)</label>
								<input type="text" class="form-control text12" id="Address_Line1">
							</div>
						</div>
						<div class="row mt-1">
							<div class="col">
								<label class="text12" for="Phone_Number" class="form-label">Phone Number</label>
								<input type="text" class="form-control text12" id="Phone_Number">
							</div>
							<div class="col">
								<label class="text12" for="Address_Line2" class="form-label">Address (Line 2)</label>
								<input type="text" class="form-control text12" id="Address_Line2">
							</div>
						</div>
						<div class="row mt-1">
							<div class="col">
								<label class="text12" class="form-label">Email</label>
								<input type="text" class="form-control text12" value=${frappe.session.user} id="Email" disabled readonly>
							</div>
							<div class="col">
								<label class="text12" for="Country" class="form-label p-4">Country</label></br>
								<input type="text" class="form-control text12" id="Country">
							</div>
						</div>
						<div class="row mt-1">
							<div class="col-4">
								<label class="text12" for="State" class="form-label">State</label>
								<input type="text" class="form-control text12" id="State">
							</div>
							<div class="col-4">
								<label class="text12" for="City" class="form-label">City</label>
								<input type="text" class="form-control text12" id="City">
							</div>
							<div class="col-4">
								<label class="text12" for="Zip_Code" class="form-label">Zip Code</label>
								<input type="text" class="form-control text12" id="Zip_Code">
							</div>
						</div>
						</form>
					</div>
				`
				const payment_choice = `
				<div class="form-check text12">
					<input class="form-check-input" type="checkbox" value="" id="installment">
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
				const error = `<p class="error"></p>`
				const outstanding_balance = `
					<label class="text12" for="Zip_Code" class="form-label">Balance</label>
					<input type="text" class="form-control w-25 text12" value=${numberWithCommas(res.data.outstanding_amount) + ".00 (Php)"} id="balance" disabled readonly>
				`
				const payment =`
					<p class="payment"></p>
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
					$(".align-items-center").append(title + button + gcas_form + billing_details +  error + outstanding_balance + payment_choice + payment + next_button).removeClass("d-flex justify-content-between align-items-center")
					
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
				
					// checkbox
					$( "#installment" ).click(function() {
						$("#fullpayment").prop('checked', false)
						$(".payment").html(`<input type="text" class="form-control w-25 text12" value="15,000" id="payment" disabled readonly>`)
					});
					$( "#fullpayment" ).click(function() {
						$("#installment").prop('checked', false)
						$(".payment").html(`<input type="text" class="form-control w-25 text12" value=${numberWithCommas(res.data.outstanding_amount)} id="payment" disabled readonly>`)
					});
					// input value
					
					const input_id = ["payment", "Gcash_Number", "Gcash_Name","Full_Name","Address_Line1","Phone_Number","Address_Line2","Email","Country","State","City","Zip_Code"]
					const gcash_func = () => {
						var res = []
						for (let i = 0; i < input_id.length; i++) {
							const element = input_id[i];
							$( "#" + element ).keyup(function() {
								var value = $( this ).val();
								// var data = element
								res[ ( i < 10 ? input_id[ i ] : '' )] = value;
								// res.push({[data]: value})
							}).keyup()
						}
						return res
					}	
					// pay button
					$('#paynow_btn').click( function(){
						const array = gcash_func()
						console.log(array)
						var installment= document.getElementById("installment");
						var fullpayment= document.getElementById("fullpayment");
						
						if(array.Gcash_Number === '' || array.Gcash_Name === '' || array.Full_Name === '' || array.Address_Line1 === '' || array.Phone_Number === '' || array.Address_Line2 === '' || array.Email === '' || array.Country === '' || array.State === '' || array.City === '' || array.Zip_Code === ''){
							console.log("some field is empty")
							$(".error").html("<p class='alert alert-danger'> Some fields are empty</p>")
						}else{
							
							if(installment.checked || fullpayment.checked ) {
								console.log("clicked")
								$(".error").html("<p class='alert alert-success'> success</p>")
							} else {
								console.log("not")
								$(".error").html("<p class='alert alert-danger'>Check installment or full payment</p>")
							}
						}
					
					})
					
				}
			})
		}

	})
})