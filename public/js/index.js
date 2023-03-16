const postRoute = "/api/post";
const commentRoute = "/api/comment";

const toggleElementClass = (mode, selector) => {
    let toggleElement = document.querySelector(selector);

    if (toggleElement.classList.contains(mode)) {
        toggleElement.classList.remove(mode);
    } else {
        toggleElement.classList.add(mode);
    }
};

const clearForm = () => {
    document.querySelector('.form.card-body').reset();
};

const formHandler = async (mode, route, event) => {
    event.preventDefault();
    let title, body, user_id, post_id, formData;

    if (route === postRoute) 
    {
        title = document.querySelector('#post-title').value.trim();
        body = document.querySelector('#post-body').value.trim();
        user_id = event.target.getAttribute("data-userid");
        formData = { title, body, user_id };
    }
    else if (route === commentRoute)
    {
        body = document.querySelector('#comment-body').value.trim();
        post_id = event.target.getAttribute("data-postid");
        user_id = event.target.getAttribute("data-userid");
        formData = { body, post_id, user_id };
    }

    console.log(formData);
  
    if 
    ( 
    (route == postRoute && (formData.title && formData.body)) ||
    (route == commentRoute && (formData.body))
    ) 
    {        
        toggleElementClass("hidden", ".toggle-container");
        toggleElementClass("hidden", ".form-card");

        const response = await fetch(route, {
            method: 'POST',
            body: JSON.stringify( formData ),
            headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
            showFormEvent();
            clearForm();
            location.reload();
        } else {
            let err = await response.json()
            alert(err.message);
        }
    } 
    else
    {
        alert("You must fill out all fields before submitting!");
    }
};

const submitFormEvent = () => {
    document.querySelector('#submit-form')
    .addEventListener('click', function eventHandler(event) {        
        if (document.title === "Tech Blog - Dashboard") {
            formHandler("POST", postRoute, event);    
        } else if (document.title === "Tech Blog - Post") {
            formHandler("POST", commentRoute, event);  
        }            
    });
};

const showFormEvent = () => {
    document.querySelector('#footer-btn')
    .addEventListener('click', function eventHandler() {
        toggleElementClass("hidden", ".toggle-container");
        toggleElementClass("hidden", ".form-card");
        toggleElementClass("disabled", "#footer-btn");        
        this.removeEventListener('click', eventHandler);
    });
};

function init() {
    showFormEvent();
    submitFormEvent();
}

init();

