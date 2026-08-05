s


const user = JSON.parse(
    localStorage.getItem("user")
);



if(!user){

    window.location.href="login.html";

}



document.getElementById("welcomeUser").innerHTML =
`
Welcome Back, ${user.name} 👋
`;



document.getElementById("contribution").innerHTML =
`
₹${user.contribution}
`;



document.getElementById("status").innerHTML =
`
${user.eligible ? "ACTIVE ✓" : "INACTIVE"}
`;