register.js


const registerForm = document.getElementById("registerForm");


registerForm.addEventListener("submit", async function(e){

    e.preventDefault();


    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;



    try {


        const response = await fetch(
            "http://localhost:5001/api/auth/register",
            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },


                body:JSON.stringify({

                    name,

                    email,

                    password,

                    role:"member"

                })

            }
        );



        const data = await response.json();



        if(!response.ok){

            alert(data.message);

            return;

        }



        alert("Registration Successful!");

        window.location.href="login.html";



    }

    catch(error){

        console.log(error);

        alert("Server error");

    }


});