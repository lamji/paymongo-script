frappe.ready(function() {
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
				// remove the space of the name
				var text = res.data.student_name;
    			var lastName = text.split(' ')[2];
				var FirstName = text.split(' ')[0];
				var FullName = FirstName + " " +lastName

				// html Template
				const login_required = `
				<div class="alert alert-danger" role="alert">
					You need to Login
				</div>
				`
				const title = `<h2>PAYMENT METHOD</h2>`
				const no_payment = `
					<p class="alert alert-warning no_payment">No paymnet method selected</p>
				`
				const select_option = `
				<form>
					<label>Select Payment Method:</label>
					<select class="payment_method text12" style="width: 200px !important">
						<option value="-- Select --"> -- Select --</option>
						<option value="Gcash">Gcash</option>
						<option value="GrabPay">GrabPay</option>
						<option value="Debit/Credit">Debit/Credit</option>
					</select>
				</form>
				`
				const gcas_form =`
				<div class="gcash_form_container my-5 p-5 border "
					<h4></h4>
					<h4><img id='theImg' src='https://gadgetsmagazine.com.ph/wp-content/uploads/2020/05/GCASH-logo.jpg' style="width: 50px; margin-right: 10px">Gcash Payment Form</h4>
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
				const card_form =`
				<div class="card_form_container my-5 p-5 border "
					<h4></h4>
					<h4><img id='theImg' src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Former_Visa_%28company%29_logo.svg/3072px-Former_Visa_%28company%29_logo.svg.png' style="width: 50px; margin-right: 10px">Card Payment Form</h4>
					<form>
						<div class="row">
							<div class="col text12">
							<label for="Card_Number" class="form-label">Card Number</label>
							<input type="number" class="form-control" value="" id="Card_Number">
							</div>
							<div class="col text12">
							<label for="Card_Name" class="form-label">Card Name</label>
							<input  class="form-control" id="Card_Name">
							</div>
						</div>
						<div class="row mt-3">
							<div class="col text12">
								<label for="Expiration_Month" class="form-label">Expiration Month</label>
								<input type="number" class="form-control" value="" id="Expiration_Month">
							</div>
							<div class="col text12">
								<label for="Expiration_Year" class="form-label">Expiration Year</label>
								<input  class="form-control" id="Expiration_Year">
							</div>
							<div class="col text12">
								<label for="CVC" class="form-label">CVC</label>
								<input  class="form-control" id="CVC">
							</div>
						</div>
					</form>
				</div>
				`
				const grabpay_form =`
				<div class="grabpay_form_container my-5 p-5 border "
					<h4></h4>
					<h4><img id='theImg' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpfbN61TTZ6wlleMzPFlVIwT9P43QoiYptWA&usqp=CAU' style="width: 50px; margin-right: 10px">GrabPay Payment Form</h4>
					<form>
						<div class="row">
							<div class="col text12">
							<label for="Grabpay_Number" class="form-label">Number (Registered in GrabPay)</label>
							<input type="number" class="form-control" value="" id="Grabpay_Number">
							</div>
							<div class="col text12">
							<label for="Grabpay_Name" class="form-label">Full Name (Registered in GrabPay)</label>
							<input  class="form-control" id="Grabpay_Name">
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
								<p class="border p-2">${FullName}</p>
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
								<input type="number" class="form-control text12" id="Zip_Code">
							</div>
						</div>
						<div class="row">
							<div class="col" id="hide">
								<label class="text12" for="data" class="form-label">Address (Line 1)</label>
								<input type="text" class="form-control text12" id="data">
							</div>
						</div>
						</form>
					</div>
				`
				const payment_choice = `
				
				<p class="mt-3">Paymnet Plan: </p>
				<p class="alert alert-danger my-0 payment-plan">Check one of the following</p>
				<div class="form-check text12 mt-3">
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
				
					$(".align-items-center").append(title + select_option + no_payment + gcas_form + card_form + grabpay_form + billing_details +  error + outstanding_balance + payment_choice + payment + next_button).removeClass("d-flex justify-content-between align-items-center")
					//hide form
					$('.grabpay_form_container').hide()
					$('.card_form_container').hide()
					$('.gcash_form_container').hide()
					$('.payment-plan').hide()
			
					// checkbox
					$( "#installment" ).click(function() {
						$("#fullpayment").prop('checked', false)
						$(".payment").html(`<input type="text" class="form-control w-25 text12" value="15,000" id="payment" disabled readonly>`)
					});
					$( "#fullpayment" ).click(function() {
						$("#installment").prop('checked', false)
						$(".payment").html(`<input type="text" class="form-control w-25 text12" value=${numberWithCommas(res.data.outstanding_amount)} id="payment" disabled readonly>`)
					});
					// input value functions
					//GrabPay
					const card_func = () => {
						const input_id = ["payment", "Card_Number","CVC", "Card_Name","Expiration_Year","Expiration_Month","Full_Name","Address_Line1","Phone_Number","Address_Line2","Email","Country","State","City","Zip_Code"]
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
					//GrabPay
					const grabpay_func = () => {
						const input_id = ["payment", "Grabpay_Number", "Grabpay_Name","Full_Name","Address_Line1","Phone_Number","Address_Line2","Email","Country","State","City","Zip_Code"]
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
					// Gcash
					const gcash_func = () => {
						const input_id = ["payment", "Gcash_Number", "Gcash_Name","Full_Name","Address_Line1","Phone_Number","Address_Line2","Email","Country","State","City","Zip_Code", "data"]
						var res = []
						for (let i = 0; i < input_id.length; i++) {
							const element = input_id[i];
							$( "#" + element ).keyup(function() {
								var value = $( this ).val();
								var data = element
								// res[ ( i < 10 ? element : '' )] = value;
								res.push({[data]: value})
							}).keyup()
						}
						return res
						
					}	
					// Select
					let selected;
					$("select.payment_method").change(function(){
						var selected_paymnet= $(this).children("option:selected").val();
						selected = selected_paymnet
						if(selected_paymnet == "Gcash"){
							$('.grabpay_form_container').hide()
							$('.card_form_container').hide()
							$('.no_payment').hide()
							$('.gcash_form_container').show()
						}else if(selected_paymnet == "GrabPay"){
							$('.grabpay_form_container').show()
							$('.no_payment').hide()
							$('.gcash_form_container').hide()
							$('.card_form_container').hide()
						}else if(selected_paymnet == "Debit/Credit"){
							$('.grabpay_form_container').hide()
							$('.no_payment').hide()
							$('.gcash_form_container').hide()
							$('.card_form_container').show()
						}else{
							$('.no_payment').show()
							$('.grabpay_form_container').hide()
							$('.gcash_form_container').hide()
							$('.card_form_container').hide()
						}
					});
					
					// pay button
					$('#paynow_btn').click( function(){
						
						//if Gcash
						if(selected === "Gcash"){
							const array = gcash_func()
							const data_array =[]
							if(data_array.length === 0){
								for (let index = 0; index < array.length; index++) {
									const element = array[index];
									const data = element
									//check required feilds
									for (const key in data) {
										const res = data[key]
										if(res === ""){
											$('.error').html(`<p class="alert alert-danger mt-3">Some fields are empty</p>`)
											$('#' + key).attr("style", "background-color: #fff3cd !important")
										}else {
											$('#' + key).attr("style", "background-color: white !important")
											var installment= document.getElementById("installment");
											var fullpayment= document.getElementById("fullpayment");
											if(installment.checked || fullpayment.checked ) {
												console.log("checked")
												$(".error").hide()
												data_array.push(element)
												// call paymongo
											} else {
												console.log("nonde")
												$('.payment-plan').show()
												$(".error").html("<p class='alert alert-danger'>Check one of the paymnet plan</p>")
											}
										}
									}
									
								}
							}
							console.log(data_array)
							
						}



						// if(selected == "Gcash"){
						// 	const array = gcash_func()
						// 	console.log(array)
						// 	var installment= document.getElementById("installment");
						// 	var fullpayment= document.getElementById("fullpayment");
						// 	if(array.Gcash_Number === '' || array.Gcash_Name === '' || array.Full_Name === '' || array.Address_Line1 === '' || array.Phone_Number === '' || array.Address_Line2 === '' || array.Email === '' || array.Country === '' || array.State === '' || array.City === '' || array.Zip_Code === ''){
						// 		$(".error").html("<p class='alert alert-danger'> Some fields are empty</p>")
						// 	}else{
								
						// 		if(installment.checked || fullpayment.checked ) {
						// 			$(".error").hide()
						// 			// call paymongo
						// 		} else {
						// 			$(".error").html("<p class='alert alert-danger'>Check one of the paymnet plan</p>")
						// 		}
						// 	}
						// // If GrabPay
						// }else if(selected == "GrabPay"){
						// 	const array = grabpay_func()
						
						// 	var installment= document.getElementById("installment");
						// 	var fullpayment= document.getElementById("fullpayment");
						// 	if(array.Gcash_Number === '' || array.Gcash_Name === '' || array.Full_Name === '' || array.Address_Line1 === '' || array.Phone_Number === '' || array.Address_Line2 === '' || array.Email === '' || array.Country === '' || array.State === '' || array.City === '' || array.Zip_Code === ''){
						// 		$(".error").html("<p class='alert alert-danger'> Some fields are empty</p>")
						// 	}else{
						// 		if(installment.checked || fullpayment.checked ) {
						// 			$(".error").hide()
						// 			// call paymongo
						// 		} else {
						// 			$(".error").html("<p class='alert alert-danger'>Check one of the paymnet plan</p>")
						// 		}
						// 	}
						// // If Card
						// }else if(selected == "Debit/Credit"){
						// 	const array = card_func()
						// 	var installment= document.getElementById("installment");
						// 	var fullpayment= document.getElementById("fullpayment");
						// 	if(array.Gcash_Number === '' || array.Gcash_Name === '' || array.Full_Name === '' || array.Address_Line1 === '' || array.Phone_Number === '' || array.Address_Line2 === '' || array.Email === '' || array.Country === '' || array.State === '' || array.City === '' || array.Zip_Code === ''){
						// 		$(".error").html("<p class='alert alert-danger'> Some fields are empty</p>")
						// 	}else{
						// 		if(installment.checked || fullpayment.checked ) {
						// 			$(".error").hide()
						// 			// call paymongo
						// 		} else {
						// 			$(".error").html("<p class='alert alert-danger'>Check one of the paymnet plan</p>")
						// 		}
						// 	}
						// // elese
						// }else{
						// 	$('.no_payment').show()
						// 	//error
						// }



						frappe.ready(function() {
							const user_logedin = frappe.session.user
							const url_base = window.location.origin
							console.log(url_base)
						
						
							if(frappe.session.user === "Guest"){
								$('.container.my-4').html('<p class="p-3 alert alert-danger">You are not authorized</p>')
							}else{
								fetch(url_base + '/api/resource/User/'+ user_logedin)
								.then(res => res.json())
								.then(res => {
									const user_array = res.data
									if(res.data.length != 0){
										fetch(url_base + '/api/resource/Paymongo billing info')
										.then(res => res.json())
										.then( res => {
											const billing_info = res.data
											if(res.data.length != 0){
												const user_name = user_array.last_name + "," + " " + user_array.first_name
												billing_info.forEach(element => {
													if(element.name === user_name){
														
														fetch(url_base + '/api/resource/Paymongo billing info/' + user_name)
														.then(res => res.json())
														.then(res => {
															const data = res.data
															console.log(data)
															const gcash_payment = data.gcash_payment
															console.log(gcash_payment)
															const html_template =`
																<a class="text12 my-4" href="https://www.w3schools.com/">Edit</a>
																<div class="border p-3 text12">
																<h6>Personal Information</h6>
																	<div class="row">
																		<p class="mb-1 col"><b>Full Name: </b>${data.first_name + " " + data.last_name}</p>
																		<p class="mb-1 col"><b>Address: </b>${data.address1 + ", " + data.city + ", " + data.state + ", " + data.country + ", " + data.zip_code}</p>
																	</div>
																	<div class="row">
																		<p class="mb-1 col">Phone Number: ${data.phone_number}</p>
																		<p class="mb-1 col">Email: ${data.email}</p>
																	</div>
																</div>
						
																<div class="p-4 border mt-5 text12">
																<h6>Gcash Information</h6>
																	<div class="row" id="gcash-info">
																		
																	</div>
																</div>
																<button class="btn py-1 text12 mt-4" id="procced">Procced</button>
															`
															$('.container.my-4').html(html_template)
															if(gcash_payment.length === 0){
																$('#gcash-info').html(`<p class="alert alert-warning col m-5">No Gcash Information <br><br>
																<a href="https://www.w3schools.com/">Add</a>
																</p>`)
																$('#procced').hide()
															}else{
																$('$gcash-info').html(`
																	<p class="mb-1 col"><b>Full Name: </b>${data.first_name + " " + data.last_name}</p>
																	<p class="mb-1 col"><b>Full Name: </b>${data.first_name + " " + data.last_name}</p>
																`)
																$('#procced').show()
															}
														})
													}else{
						
													}
												})
											}else{
												$('.container.my-4').show()
												frappe.web_form.set_value("first_name", user_array.first_name)
												frappe.web_form.set_value("last_name", user_array.last_name)
												frappe.web_form.set_value("email", user_array.email)
											}
										})
									}
								})
								
							}
							// paymnet pro
							frappe.web_form.after_save = () => {
								// init script here
								location.reload()
							}
							
						})
						
					})
					
				}
			})
		}

	})
})