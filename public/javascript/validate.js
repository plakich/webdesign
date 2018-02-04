        function validate()
        {
            alert("here");
            var pass = document.getElementById('pass').value;
            var name = document.getElementById('name').value; 
            alert(pass);
            var validate = false; 
            if (!validate)
            alert("why");
            
            if ( !pass.match(/^(?=.*\d)[A-Za-z0-9]{8,}$/) )
            {
                document.getElementById('pass').style.backgroundColor = "yellow";
                document.getElementById('pass').textContent = "Warning!";
                validate = false; 
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
            return false; 
        }
       