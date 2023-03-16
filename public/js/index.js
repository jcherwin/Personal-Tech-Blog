const POST_ROUTE = "/api/post";
const COMMENT_ROUTE = "/api/comment";
const POST_PAGETITLE = "Tech Blog - Post";
const DASHBOARD_PAGETITLE = "Tech Blog - Dashboard";

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

    if (route === POST_ROUTE) 
    {
        title = document.querySelector('#post-title').value.trim();
        body = document.querySelector('#post-body').value.trim();
        user_id = event.target.getAttribute("data-userid");
        formData = { title, body, user_id };
    }
    else if (route === COMMENT_ROUTE)
    {
        body = document.querySelector('#comment-body').value.trim();
        post_id = event.target.getAttribute("data-postid");
        user_id = event.target.getAttribute("data-userid");
        formData = { body, post_id, user_id };
    }

    console.log(formData);

    const request = 
    {
        headers: { 'Content-Type': 'application/json' },
    }

    if (mode === "POST" || mode === "PUT")
    { request.body = JSON.stringify( formData ) }

    if (mode === "PUT")
    { request.method = mode + }
    else if (mode === "DELETE")
    { request.method = mode + }

    if 
    ( 
    (route == POST_ROUTE && (formData.title && formData.body)) ||
    (route == COMMENT_ROUTE && (formData.body))
    ) 
    {        
        toggleElementClass("hidden", ".toggle-container");
        toggleElementClass("hidden", ".form-card");        

        const response = await fetch(route, request);
  
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

const deleteFormHandler = async (route, event) => {
    const user_id = event.target.getAttribute("data-userid");
    const delete_route = route + user_id;

    const response = await fetch(delete_route, {
        method: 'DELETE',
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

const submitFormEvent = () => {
    document.querySelector('#submit-form')
    .addEventListener('click', function eventHandler(event) {        
        if (document.title === DASHBOARD_PAGETITLE) {
            if (event.target.innerHTML === "Create"){
                formHandler("POST", POST_ROUTE, event);  
            } else {
                formHandler("PUT", POST_ROUTE, event);
            }
              
        } else if (document.title === POST_PAGETITLE) {
            formHandler("POST", COMMENT_ROUTE, event);  
        }            
    });
};

const deleteFormEvent = () => {
    document.querySelector('#delete-form')
    .addEventListener('click', function eventHandler(event) {        
        if (document.title === DASHBOARD_PAGETITLE) {
            formHandler("POST", POST_ROUTE, event);                
        } else if (document.title === POST_PAGETITLE) {
            formHandler("POST", COMMENT_ROUTE, event);  
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
    if (document.title === DASHBOARD_PAGETITLE || 
    document.title === POST_PAGETITLE) {
        showFormEvent();
        submitFormEvent();
        deleteFormEvent();
    }
}

init();