admin.js



async function triggerEmergency(){


const token = localStorage.getItem("token");



const communityId = localStorage.getItem("communityId");



try{


const response = await fetch(
"http://localhost:5001/api/events/simulate",
{

method:"POST",

headers:{

"Content-Type":"application/json",

"Authorization":
`Bearer ${token}`

},


body:JSON.stringify({

type:"Flood",

rainfall:320,

riverLevel:8.2,

community:communityId

})


});



const data = await response.json();



if(!response.ok){

alert(data.message);

return;

}



document.getElementById("response")
.classList.remove("hidden");



document.getElementById("response")
.innerHTML=`

<h2>
🚨 FLOOD EVENT DETECTED
</h2>

<p>
Rainfall threshold exceeded.
</p>

<div class="result-box">


<div>

<h3>
Rainfall
</h3>

<h1>
320 mm
</h1>

</div>



<div>

<h3>
River Level
</h3>

<h1>
8.2 m
</h1>

</div>



<div>

<h3>
Status
</h3>

<h1 class="success">
TRIGGERED ✓
</h1>

</div>


</div>

`;



}

catch(error){

console.log(error);

alert("Server error");

}



}