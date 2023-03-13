const toggleComments = async (e) => {
    const posts = document.querySelector('main').children;
    console.log(posts);

    const post = e.target;
};
  
document.querySelector('main').addEventListener('click', (e) => {
    if (e.target.closest('main .card-title')) {
        toggleComments(e);
    }
}); 




/* // Access toggle switch HTML element
var themeSwitcher = document.querySelector("#theme-switcher");
var container = document.querySelector(".container");

// Set default mode to dark
var mode = "dark";

// Listen for a click event on toggle switch
themeSwitcher.addEventListener("click", function() {
  // If mode is dark, apply light background
  if (mode === "dark") {
    mode = "light";
    container.setAttribute("class", "light");
  }
  // If mode is light, apply dark background 
  else {
    mode = "dark";
    container.setAttribute("class", "dark");
  }
}); */
