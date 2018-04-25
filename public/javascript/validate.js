        function validate(page)
        {
            var pass = document.getElementById('pass');
            var name = document.getElementById('name'); 
            var validate = true;
            
            if (page === 'register')
            {
                var confirm = document.getElementById('confirm'); 
                var passError = document.getElementById('passError');
                var nameError = document.getElementById('nameError');
                var confirmError = document.getElementById('confirmError');
                
                
                if ( !name.value ) //if name is undefined, i.e., user left field blank
                {
                    name.classList.add('warning');
                    nameError.innerHTML = "<em>! Username cannot be left blank.</em>";
                    nameError.classList.add('error');
                    validate = false; 
                }
                else
                {
                    name.classList.remove('warning');
                    nameError.innerHTML = "";
                    nameError.classList.remove('error');
                }
                
                //use positive lookahead: pass must contain at least one upper case, lowercase, digit, and special character and be
                //at least 8 chars long consisting of only upper, lower, digits, and special chars. 
                if ( !pass.value.match(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[~`!@#\$%\^&\*\(\)\-_\+=\{\}\[\]\|\\;:"<>,.\/\?])[A-Za-z0-9~`!@#\$%\^&\*\(\)\-_\+=\{\}\[\]\|\\;:"<>,.\/\?]{8,}$/) )
                {
                    pass.classList.add("warning");
                    passError.innerHTML = "<em>! Password must be at least 8 characters," +
                    " and contain at least one <strong>special character</strong>, <strong>uppercase letter</strong>,"   +
                    " <strong>lowercase letter</strong>, and <strong>digit</strong>.</em> e.g., aaaaa!A1";
                    passError.classList.add("error");
                    validate = false; 
                    
                }
                else //password is okay
                {
                    pass.classList.remove("warning");
                    passError.innerHTML = "";
                    passError.classList.remove("error");
                }
                
                if ( confirm.value && pass.value && !(confirm.value === pass.value) )
                {
                    confirm.classList.add('warning');
                    confirmError.innerHTML = "<em>! Passwords must match.</em>";
                    confirmError.classList.add('error');
                    validate = false;
                }
                else if ( !confirm.value && pass.value ) //if user didn't reenter password at all
                {
                    confirm.classList.add('warning');
                    confirmError.innerHTML = "<em>! Type in your password again.</em>";
                    confirmError.classList.add('error');
                    validate = false;
                }
                else
                {
                    confirm.classList.remove('warning');
                    confirmError.innerHTML = "";
                    confirmError.classList.remove('error');
                }
        
                /*if ( !first.match(/^[A-Za-z\u00C0-\u017F]+$/) ) //only allow upper and lower case chars in name
                {
                    if ( !last.match(/^[A-Za-z\u00C0-\u017F ]+$/) ) //allows spaces for surnames like Van Der Vei
                    {
                        alert("Error. Please enter a proper first and last name.\n");
                        document.getElementById('first').style.backgroundColor = "yellow";
                        document.getElementById('last').style.backgroundColor = "yellow";
                    }
                    else
                    {
                        alert("Error. Please enter a proper first name.\n");
                        document.getElementById('first').style.backgroundColor = "yellow";
                    }
        
                }
        
                if ( !last.match(/^[A-Za-z\u00C0-\u017F ]+$/) ) //\u00...etc allows for latin characters and diacritic marks
                {
                    alert("Error. Please enter a proper last name.\n");
                    document.getElementById('last').style.backgroundColor = "yellow";
                }
        
                if ( !street.match(/^[A-Za-z0-9. ]+$/) ) //allow characters and digits and spaces
                {
                    alert("Error. Please enter a proper street address.\n");
                    document.getElementById('street').style.backgroundColor = "yellow";
                }
        
                if ( !city.match(/^[A-Za-z. ]+$/) )
                {
                    alert("Error. Please enter a proper city.\n");
                    document.getElementById('city').style.backgroundColor = "yellow";
                }
        
                if ( !state.match(/^[A-Z]{2}$/) )
                {
                    alert("Error. There was a problem processing the state.\n" +
                         "Please go back and try to select your state again.\n");
                    document.getElementById('state').style.backgroundColor = "yellow";
                }
        
                if ( !zip.match(/^[0-9]{5}$/) )
                {
                    alert("Error. Please enter a proper five digit zipcode.\n");
                    document.getElementById('zip').style.backgroundColor = "yellow";
                }
        
                if ( !phone.match(/^[0-9]{10}$/) )
                {
                    alert("Error. Please enter a proper ten digit phone number.\n");
                    document.getElementById('phone').style.backgroundColor = "yellow";
                }
        
                if ( !email.match(/^[A-Za-z0-9]{2,40}$/) )
                {
                    alert("Error. Please enter a proper username.\n" +
                        "Note: no special characters or spaces are allowed.\n" +
                            "Only upper- and lower-case characters and digits 0-9 are accepted.\n");
                    document.getElementById('email').style.backgroundColor = "yellow";
                }*/
            }
            else if(page === 'login')
            {
                var passError = document.getElementById('passError');
                var nameError = document.getElementById('nameError');
                
                if ( !name.value ) //if name is undefined, i.e., user left field blank
                {
                    name.classList.add('warning');
                    nameError.innerHTML = "<em>! Username cannot be left blank.</em>";
                    nameError.classList.add('error');
                    validate = false; 
                }
                else
                {
                    name.classList.remove('warning');
                    nameError.innerHTML = "";
                    nameError.classList.remove('error');
                }
                
                if ( !pass.value )
                {
                    pass.classList.add("warning");
                    passError.innerHTML = "<em>! Please enter your password. </em>";
                    passError.classList.add("error");
                    validate = false; 
                    
                }
                else //password is okay
                {
                    pass.classList.remove("warning");
                    passError.innerHTML = "";
                    passError.classList.remove("error");
                }
                
            }
            
            
           
            return validate; 
        }
       