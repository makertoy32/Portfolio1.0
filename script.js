window.addEventListener("load", function () {
  const loader  = document.getElementById("loader");
  const content = document.getElementById("content");

  // Stop scroll initially
  document.body.classList.add("loading");

  // Ensure content can fade in
  if (content) content.style.display = "block";

  const extraDelay = 1500; // how long loader stays visible ⏳

  setTimeout(() => {
    document.body.classList.remove("loading"); // allow scroll
    document.body.classList.add("loaded");     // fade-in content

    loader.style.opacity = "0"; // fade-out loader
    loader.addEventListener("transitionend", () => {
      loader.style.display = "none"; // remove completely
    }, { once: true });
  }, extraDelay);
});
const nav = document.getElementById("ul");
const hamburger = document.getElementById("hamburger");
const navbar = document.getElementById("navbar");

hamburger.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevents the click from bubbling up to the document
    nav.classList.toggle("clicked");
});

document.addEventListener("click", function (event) {
    const isClickInsideNav = navbar.contains(event.target);
    const isHamburgerClicked = hamburger.contains(event.target);

    
    if (!isClickInsideNav && !isHamburgerClicked) {
        nav.classList.remove("clicked");
    }
});

window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 1) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


let contactBtn=document.getElementById("contact-btn");
let form_Card=document.getElementById("form-div-card");
let navBtn=document.getElementById("nav-btn");



navBtn.addEventListener("click", function (event) {
    // Prevent the default anchor link behavior
  
    
    // Add the "clicked" class to the form
    form_Card.classList.add("clicked");

    // Get the target element from the data-target attribute
    const targetId = navBtn.getAttribute("data-target");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
        // Use scrollIntoView to smoothly scroll the element into the center of the viewport
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'center' // This is the key property to center the element
        });
    }
});
contactBtn.addEventListener("click",function(){
// contactBtn.style.opacity="0";
    form_Card.classList.add("clicked");
})

// let formSendBtn=document.getElementById("send");
// let span=document.getElementById("img-span"); 
// send.addEventListener("click",function(){
//     span.classList.toggle("clicked");
// }) 

document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault()
  // contactBtn.style.opacity="1";
  contactBtn.style.rotateX="180deg";
form_Card.classList.remove("clicked");
  const params = {
    name: document.getElementById("userName").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
   
  };

  emailjs.send("service_u4m2mfs", "template_17ylas6", params)
    .then(function(response) {
      alert("✅ Email sent successfully!");
      document.getElementById("contact-form").reset(); // Optional: reset form
    }, function(error) {
      alert("❌ Failed to send email. Check console for details.");
      console.error(error);
    });
});


const inputs = document.querySelectorAll("input, textarea"); // include textarea
inputs.forEach(input => {
    input.addEventListener("focus", function() {
        input.parentElement.classList.add("clicked"); // add class to wrapper
    });
    input.addEventListener("blur", function() {
        input.parentElement.classList.remove("clicked");
    });
});


let lastScrollY = window.scrollY;
const nav1 = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY) {
    // scrolling down → hide navbar
    nav1.style.top = "-80px"; // adjust to navbar height
  } else {
    // scrolling up → show navbar
    nav1.style.top = "0";
  }
  lastScrollY = window.scrollY;
});
var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };