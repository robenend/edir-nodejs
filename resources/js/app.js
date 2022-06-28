const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');
const inputs = document.querySelectorAll(".input");


function focusFunc() {
	let parent = this.parentNode;
	parent.classList.add("focus");
}

function blurFunc() {
	let parent = this.parentNode;
	if (this.value == "") {
		parent.classList.remove("focus");
}
}

inputs.forEach((input) => {
	input.addEventListener("focus", focusFunc);
	input.addEventListener("blur", blurFunc);
});

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});

document.addEventListener('scroll', () => {
	var scroll_position = window.scrollY;
	if (scroll_position > 250) {
		header.style.backgroundColor = '#24292F';
	} else {
		header.style.backgroundColor = 'transparent';
	}
});

menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		mobile_menu.classList.toggle('active');
	});
});

function loginVaidator(){
localStorage.setItem("id", "user");
localStorage.setItem("password","1234");

const id = document.getElementById("id-input");
const password = document.getElementById("password-input");

if(id.value===localStorage.getItem("id")){

	if(password.value == localStorage.getItem("password")){
		window.open("../../index.html");
	}
}
}  
