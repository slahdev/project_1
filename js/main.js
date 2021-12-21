// check if there local storage color option
let mainColors = localStorage.getItem("color-option");
 
if (mainColors !== null)  {
    
    document.documentElement.style.setProperty("--main-color", mainColors);

    //remove active class from all colors
    document.querySelectorAll(".colors-list li").forEach(element => {

        element.classList.remove("active");
    // add active class on element data-color === local storage item
        if (element.dataset.color === mainColors) {
        
        element.classList.add("active");
    }


    });   

}

//random background Option
let backgroundOption = true;

// variable to control the interval
let backgroundInterval;

// check if there is local storage random backgound item
let backgoundLocalItem = localStorage.getItem("background_option");

//check if random background local storage is empty 
if (backgoundLocalItem !== null) {
    
    if (backgoundLocalItem === 'true') {
        
        backgroundOption = true;
    }else {
        backgroundOption = false;
    }

    // romove active class from all spans
    document.querySelectorAll(".random span").forEach(element => {
        
        element.classList.remove("active");
    })

    if (backgoundLocalItem === 'true') {
        
        document.querySelector(".random .yes").classList.add("active");
    } else {

        document.querySelector(".random .no").classList.add("active");
    }
}

// toggle spin class on icon 
document.querySelector(".toggle-settings i").onclick = function() {
    
    this.classList.toggle("fa-spin");
    
    document.querySelector(".settings-box").classList.toggle("open");
}

// switch colors
const colorsLi = document.querySelectorAll(".colors-list li");

//loop on list items 
colorsLi.forEach(li => {

    //click on every list items 

    li.addEventListener("click", (e) => {

        //set color on root
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

        // set color on local storage
        localStorage.setItem("color-option", e.target.dataset.color);

        //remove active class from all childrens
        e.target.parentElement.querySelectorAll(".active").forEach(element => {

            element.classList.remove("active");
        })
        
        //add active class on self
        e.target.classList.add("active");

       

    })
 })
// switch random background option
const randomBackground = document.querySelectorAll(".random span");

//loop on all spans 
randomBackground.forEach(span => {

    //click on every span

    span.addEventListener("click", (e) => {

        //remove active class from all span
        e.target.parentElement.querySelectorAll(".active").forEach(element => {

            element.classList.remove("active");
        })
        
        //add active class on self
        e.target.classList.add("active");

         if (e.target.dataset.background === 'yes') {
            
            backgroundOption = true;

            randomizeImgs();

            localStorage.setItem("background_option", true);
        }else {
            backgroundOption = false;

            clearInterval(backgroundInterval);

            localStorage.setItem("background_option", false);
        }

    })
 })


let landingPage = document.querySelector(".landing-page");

//Get array of image
let imgsArray = ["1.jpg", "2.jpg", "3.jpg", "04.jpg"];



//function de rondomize imgs
function randomizeImgs() {
    if (backgroundOption === true) {
        
        backgroundInterval = setInterval(() => {

        //get random number 
        let randomNumber = Math.floor(Math.random() * imgsArray.length);

         // change background image Url
         landingPage.style.backgroundImage = 'url("images/' + imgsArray[randomNumber] +'")'; 
      },10000);
    }
}


// slect skills selector

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
    
    // skills ofset top
    let skillsOffsetTop = ourSkills.offsetTop;

    // skills outer height
    let skillsOuterHeight = ourSkills.offsetHeight;

    // window height
    let windowHeight = this.innerHeight;

    // window scrollTop
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach(skill => {
            
            skill.style.width = skill.dataset.progress;
        })
    }

}

//////////// greate popup whit the image 
let ourProducts = document.querySelectorAll(".products img");

ourProducts.forEach(img => {

    img.addEventListener('click', (e) => {

      //create overly element
      let overlay = document.createElement("div");

      //add class to overly 
      overlay.className = 'popup-overlay';

      //append overly to the body
      document.body.appendChild(overlay);

      //create the popup box 
      let popupBox = document.createElement("div");

      // add class popup box
      popupBox.className = 'popup-box';

      // create the close span
      let closeButton = document.createElement("span");

      //create the close button text
      let closeButtonText = document.createTextNode("x");

      //append the text to the button
      closeButton.appendChild(closeButtonText);

      // add class to close button
      closeButton.className = 'close-button';

      //add close button to the popup-box
      popupBox.appendChild(closeButton);


      //create the image 
      let popupImage = document.createElement("img");

      //set image source
      popupImage.src = img.src;

      // add image to popup-box
      popupBox.appendChild(popupImage);

      //append the popup-box to body
      document.body.appendChild(popupBox);

    });

})

// close popup
document.addEventListener("click", function(e) {

    if (e.target.className == 'close-button') {

        //remove the current popup
        e.target.parentNode.remove();

        //remove the overlay
        document.querySelector(".popup-overlay").remove();

    }
})

//select all bullets 
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

allBullets.forEach(bullet => {

    bullet.addEventListener("click", (e) => {

        document.querySelector(e.target.dataset.section).scrollIntoView({
            
            behavior: "smooth"
        })
    })
})


// toggle menu
let toggleBtn = document.querySelector(".toglle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {

    e.stopPropagation()

    this.classList.toggle("active");

    tLinks.classList.toggle("open");
};

//click anywhere outside toggle button 
document.addEventListener("click", (e) => {

    if (e.target !== toggleBtn && e.target !== tLinks) {

        //check if menu is open
        if (tLinks.classList.contains("open")) {

            toggleBtn.classList.toggle("menu-active");

            tLinks.classList.toggle("open");
        } 

    }
});

//stop propagation on menu 
tLinks.onclick = function (e) {
    e.stopPropagation();
}


