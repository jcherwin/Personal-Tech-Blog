const POST_ROUTE = "/api/post";
const COMMENT_ROUTE = "/api/comment";
const POST_PAGETITLE = "Tech Blog - Post";
const DASHBOARD_PAGETITLE = "Tech Blog - Dashboard";

//Takes in a class to toggle on/off, and the selector for the element to target
const toggleElementClass = (mode, selector) => {
    let toggleElement = document.querySelector(selector);

    if (toggleElement.classList.contains(mode)) {
        toggleElement.classList.remove(mode);
    } else {
        toggleElement.classList.add(mode);
    }
};

//Clears the form if it is needed
const clearForm = () => {
    document.querySelector('.form.card-body').reset();
};

//Fills in data for an edit form before toggling to display it
const fillEditForm = (mode, event) => {
    if (mode === "post")
    {
        const targetEl = event.target.closest(".card-edit");        

        const title = targetEl.querySelector(".card-title").innerHTML;
        const body = targetEl.querySelector(".post-body").innerHTML;
        const post_id = targetEl.getAttribute("data-postid"); 

        document.querySelector("#edit-post-title").value = title;
        document.querySelector("#edit-post-body").value = body;
        document.querySelector("#update-form").setAttribute("data-postid", post_id);
        document.querySelector("#delete-form").setAttribute("data-postid", post_id);     
    }
    else if(mode === "comment")
    {
        const targetEl = event.target.closest(".comment-card");

        const body = targetEl.querySelector(".comment-body").innerHTML;
        const comment_id = targetEl.getAttribute("data-commentid"); 

        document.querySelector("#edit-comment-body").value = body;
        document.querySelector("#update-form").setAttribute("data-commentid", comment_id);
        document.querySelector("#delete-form").setAttribute("data-commentid", comment_id); 
    }
};

//Performs the chosen method on the chosen route and sends data if the method requires it
const formHandler = async (mode, route, event) => {
    event.preventDefault();
    let title, body, user_id, post_id, formData;

    if (mode === "POST") //Gets the data from the form if new content is being added
    {
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
    }
    else if (mode === "PUT" || mode === "DELETE") //Gets data from form is content is being edited
    {
        if (route === POST_ROUTE) 
        {
            title = document.querySelector('#edit-post-title').value.trim();
            body = document.querySelector('#edit-post-body').value.trim();
            post_id = event.target.getAttribute("data-postid");
            formData = { title, body, post_id };
        }
        else if (route === COMMENT_ROUTE)
        {
            body = document.querySelector('#edit-comment-body').value.trim();
            post_id = event.target.getAttribute("data-postid");
            comment_id = event.target.getAttribute("data-commentid");
            formData = { body, post_id, comment_id };
        }
    }

    console.log(formData);

    const request = 
    {
        method: mode,
        headers: { 'Content-Type': 'application/json' },
    }

    if (mode === "POST" || mode === "PUT")
    { request.body = JSON.stringify( formData ) }

    console.log(request);

    //Checks to see if all fields in form have been filled out
    if ((route == POST_ROUTE && (formData.title && formData.body)) ||
        (route == COMMENT_ROUTE && (formData.body)) ) 
    {        
        if (mode === "PUT" || mode === "DELETE") {
            if (route === POST_ROUTE)
            { route += ("/" + formData.post_id) }
            else if (route === COMMENT_ROUTE)
            { route += ("/" + formData.comment_id) }
        }

        //console.log(route);
        const response = await fetch(route, request);
  
        if (response.ok) {
            showFormEvent();
            clearForm();
            location.reload();
        } else {
            //let err = await response.json()
            alert("Failed to connect to db");
        }
    }
    else { alert("You must fill out all fields before submitting!") }
};

//Attach event listeners to all buttons that would submit a form
const submitFormEvent = () => {
    let route;
    const buttons = document.querySelectorAll('#submit-form, #update-form, #delete-form')
    buttons.forEach((button) => {
        button.addEventListener('click', function eventHandler(event) {        
            if (document.title === DASHBOARD_PAGETITLE){ route = POST_ROUTE }
            else if (document.title === POST_PAGETITLE){ route = COMMENT_ROUTE }

            if (event.target.innerHTML.trim() === "Create")
            { formHandler("POST", route, event) }
            else if (event.target.innerHTML.trim() === "Update")
            { formHandler("PUT", route, event)  }
            else if (event.target.innerHTML.trim() === "Delete")
            { formHandler("DELETE", route, event)  }              
          
        });
    });
};

//Attach event listeners to all buttons that would show a form
const showFormEvent = () => {
    document.querySelector('#footer-btn')
    .addEventListener('click', function eventHandler() {
        toggleElementClass("hidden", ".toggle-container");
        toggleElementClass("hidden", ".form-card");
        toggleElementClass("disabled", "#footer-btn");
        this.removeEventListener('click', eventHandler);
    });

    const posts = document.querySelectorAll('.card-edit');
    posts.forEach((post) => {
        post.addEventListener('click', function eventHandler(event) {
            fillEditForm("post", event);
            toggleElementClass("hidden", ".toggle-container");
            toggleElementClass("hidden", ".edit-form-card");
            toggleElementClass("hidden", "#footer-btn");
        });
    })

    const comments = document.querySelectorAll('.edit-comment');
    comments.forEach((comment) => {
        comment.addEventListener('click', function eventHandler(event) {
            fillEditForm("comment", event);
            toggleElementClass("hidden", ".toggle-container");
            toggleElementClass("hidden", ".edit-form-card");
            toggleElementClass("hidden", "#footer-btn");
        });
    });

};

function init() {
    if (document.title === DASHBOARD_PAGETITLE || 
    document.title === POST_PAGETITLE) {
        let loggedIn = document.querySelector("#footer-btn");
        if(loggedIn)
        { showFormEvent() }
        submitFormEvent();
    }
}

init();