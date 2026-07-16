// ===============================
// Birdhi Studio ChatBot V2
// ===============================
const apiURL = "https://script.google.com/macros/s/AKfycby7Nl3uewMqUkLIm07IqWSZW7sRWIzDOLkUWy0ITSBM_dHGhw_BHfy4leRRde27OuNJ9g/exec";
const chatArea = document.getElementById("chatArea");
const input = document.getElementById("message");
const typing = document.getElementById("typing");

const whatsappNumber = "918000190778";
const messageInput = document.getElementById("message");

messageInput.addEventListener("focus", () => {
    setTimeout(() => {
        chatArea.scrollTop = chatArea.scrollHeight;
        messageInput.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }, 300);
});

// Chat State
let step = "";
let enquiry = {};

// ===============================
// Bot Message
// ===============================
function startWelcome(){

    document.getElementById("welcomeScreen").style.display="none";

}

function addBot(text){

    typing.style.display="block";

    setTimeout(()=>{

        typing.style.display="none";

        chatArea.innerHTML += `
        <div class="bot">
            ${text}
        </div>
        `;

        scrollBottom();

    },700);

}

// ===============================
// User Message
// ===============================

function addUser(text){

    chatArea.innerHTML += `
    <div class="user">
        ${text}
    </div>
    `;

    scrollBottom();

}

// ===============================

function scrollBottom(){

    chatArea.scrollTop=chatArea.scrollHeight;

}

// ===============================
// Service
// ===============================

function startService(service){

    enquiry={};

    enquiry.service=service;

    addUser(service);

    step="name";

    addBot("😊 Great choice!<br><br>Please enter your Full Name");

}

// ===============================
// Packages
// ===============================

function showPackages(){

addBot(`
<b>📸 Our Packages</b>

<br><br>

🥉 Basic - ₹9,999

<br>

🥈 Standard - ₹19,999

<br>

🥇 Premium - ₹39,999

`);

}

// ===============================
// Gallery
// ===============================

function showGallery(){

const galleryLink = "https://YOUR-GALLERY-LINK-HERE";

addBot(`

<h3>🖼 Our Gallery</h3>

Take a look at some of our recent work.

<br><br>

<a href="${galleryLink}" target="_blank"
style="
display:inline-block;
background:#2563eb;
color:#fff;
padding:12px 18px;
border-radius:8px;
text-decoration:none;
font-weight:bold;">
🖼 Open Gallery
</a>

`);

}

// ===============================
// Contact
// ===============================

function showContact(){

addBot(`

<h3>📞 Contact Us</h3>

📍 <b>Birdhi Studio</b>

<br><br>

<a href="tel:+918000190778"
style="
display:inline-block;
background:#2563eb;
color:#fff;
padding:12px 18px;
border-radius:8px;
text-decoration:none;
font-weight:bold;
margin:5px;">
📞 Call Now
</a>

<a href="https://wa.me/918000190778"
target="_blank"
style="
display:inline-block;
background:#25D366;
color:#fff;
padding:12px 18px;
border-radius:8px;
text-decoration:none;
font-weight:bold;
margin:5px;">
💬 WhatsApp
</a>

<br><br>

📱 Mobile : +91 8000190778

`);

}

// ===============================
// SEND MESSAGE
// ===============================

input.addEventListener("keypress", function(e){

    if(e.key==="Enter"){
        sendMessage();
    }

});

function sendMessage(){

    let text=input.value.trim();

    if(text==="") return;

    addUser(text);

    input.value="";

    switch(step){

       case "name":

    enquiry.name = text;

    step = "mobile";

    input.type = "tel";

    input.placeholder = "10 Digit Mobile Number";

    addBot(`
        👋 Welcome <b>${enquiry.name} ji </b>! 😊
        <br><br>
        Thank you for choosing <b>Birdhi Studio </b>.
        <br><br>
        📱 Please enter your 10 Digit Mobile Number.
    `);

break;

        case "mobile":

            if(!/^[0-9]{10}$/.test(text)){
                addBot("❌ Please enter a valid 10 digit Mobile Number");
                return;
            }

            enquiry.mobile=text;

            step="date";

            input.type="date";

            addBot("📅 Please select Event Date");

        break;

        case "date":

            enquiry.date=text;

            step="time";

            input.type="time";

            addBot("⏰ Please select Event Time");

        break;

        case "time":

            enquiry.time=text;

            step="location";

            input.type="text";

            input.placeholder="Event Location";

            addBot("📍 Please enter Event Location");

        break;

        case "location":

            enquiry.location=text;

            step="budget";

            input.type="number";

            input.placeholder="Approx Budget";

            addBot("💰 Please enter your Budget");

        break;

        case "budget":

            enquiry.budget=text;

            step="requirement";

            input.type="text";

            input.placeholder="Special Requirement";

            addBot("✍ Please tell us your Special Requirement");

        break;

        case "requirement":

            enquiry.requirement=text;

            step="summary";

            showSummary();

        break;

 

   default:
    addBot("👇 Please select a service first.");
    break;
}

}

// ===============================
// SUMMARY
// ===============================

function showSummary(){

let msg=`

<h3>✅ Booking Summary</h3>

<b>Service :</b> ${enquiry.service}<br><br>

<b>Name :</b> ${enquiry.name}<br>

<b>Mobile :</b> ${enquiry.mobile}<br>

<b>Date :</b> ${enquiry.date}<br>

<b>Time :</b> ${enquiry.time}<br>

<b>Location :</b> ${enquiry.location}<br>

<b>Budget :</b> ${enquiry.budget}<br>

<b>Requirement :</b> ${enquiry.requirement}<br><br>

`;

let whatsappText=

`Birdhi Studio
 Booking

Service : ${enquiry.service}

Name : ${enquiry.name}

Mobile : ${enquiry.mobile}

Date : ${enquiry.date}

Time : ${enquiry.time}

Location : ${enquiry.location}

Budget : ${enquiry.budget}

Requirement : ${enquiry.requirement}`;

let whatsappURL=
`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

msg += `

<a href="${whatsappURL}" target="_blank"
style="
display:inline-block;
background:#25D366;
color:#fff;
padding:12px 18px;
border-radius:8px;
text-decoration:none;
font-weight:bold;
margin-top:10px;">
📱 Send to WhatsApp
</a>

<br><br>

<button onclick="restartChat()"
style="
padding:12px 18px;
border:none;
background:#2563eb;
color:#fff;
border-radius:8px;
cursor:pointer;">
🔄 New Booking
</button>

`;

addBot(msg);
fetch(apiURL, {
    method: "POST",
    body: JSON.stringify(enquiry)
})
.then(res => res.text())
.then(data => {
    console.log("Saved:", data);
})
.catch(err => {
    console.error(err);
});
}

// ===============================
// RESTART
// ===============================

function restartChat(){

    enquiry={};

    step="";

    input.type="text";
    input.placeholder="Type your message...";
    input.value="";

    chatArea.innerHTML=`

<div class="bot">
👋 Welcome to Birdhi Studio
<br><br>
Please choose a service 👇
</div>

<div class="cards">

<button onclick="startService('Wedding')">💍 Wedding</button>

<button onclick="startService('Pre Wedding')">❤️ Pre Wedding</button>

<button onclick="startService('Birthday')">🎂 Birthday</button>

<button onclick="startService('Baby Shoot')">👶 Baby Shoot</button>

<button onclick="startService('Product Shoot')">📦 Product Shoot</button>

<button onclick="startService('Videography')">🎥 Videography</button>

<button onclick="showPackages()">💰 Packages</button>

<button onclick="showGallery()">🖼 Gallery</button>

<button onclick="showContact()">📞 Contact</button>

</div>

`;

}