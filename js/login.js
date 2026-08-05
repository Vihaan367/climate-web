login.js




const loginForm = document.getElementById("loginForm");


loginForm.addEventListener("submit", async function(e){

    e.preventDefault();



    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;



    try{


        const response = await fetch(
            "http://localhost:5001/api/auth/login",
            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },


                body:JSON.stringify({

                    email,

                    password

                })

            }
        );



        const data = await response.json();



        if(!response.ok){

            alert(data.message);

            return;

        }



        localStorage.setItem(
            "token",
            data.token
        );


        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );

        localStorage.setItem(
            "communityId",
            "6a73513d173fb47af5da1463"
        );



        alert("Login Successful!");



        if(data.user.role==="community_admin"){

            window.location.href="admin.html";

        }

        else{

            window.location.href="dashboard.html";

        }



    }

    catch(error){

        console.log(error);

        alert("Server error");

    }



});