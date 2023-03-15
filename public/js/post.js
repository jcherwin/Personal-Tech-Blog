const toggleElementDisabled = (event) => {
    const addButton = event.target;
    if (addButton.classList.contains("disabled")) {
        addButton.classList.remove("disabled");
    } else {
        addButton.classList.add("disabled");
    }
};

const toggleElementHidden = (selector) => {
    const toggleElement = document.querySelector(selector);
    if (toggleElement.classList.contains("hidden")) {
        toggleElement.classList.remove("hidden");
    } else {
        toggleElement.classList.add("hidden");
    }
};

const postFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const body = document.querySelector('#post-body').value.trim();
    const user_id = event.target.getAttribute("data-userid");
  
    if (title && body) {
      const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({ title, body, user_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        //alert("Comment added!");
        addPostButtonEvent();
        location.reload();
      } else {
        let err = await response.json()
        alert(err.message);
      }
    }
};

const submitPostButtonEvent = () => {
    document.querySelector('#submit-post')
    .addEventListener('click', function eventHandler(event) {
        postFormHandler(event);
        toggleElementHidden(".container");
        toggleElementHidden(".post-form");
    });
};

const addPostButtonEvent = () => {
    document.querySelector('#footer-btn')
    .addEventListener('click', function eventHandler(event) {
        toggleElementHidden(".container"); 
        toggleElementDisabled(event);
        toggleElementHidden(".post-form");
        this.removeEventListener('click', eventHandler);
    });
};

function init() {
    addPostButtonEvent();
    submitPostButtonEvent();
}

init();