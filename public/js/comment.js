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

const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const body = document.querySelector('#comment-body').value.trim();
    const post_id = event.target.getAttribute("data-postid");
    const user_id = event.target.getAttribute("data-userid");
  
    if (body) {
      const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ body, post_id, user_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        //alert("Comment added!");
        addCommentButtonEvent();
        location.reload();
      } else {
        let err = await response.json()
        alert(err.message);
      }
    }
};

const submitCommentButtonEvent = () => {
    document.querySelector('#submit-comment')
    .addEventListener('click', function eventHandler(event) {
        commentFormHandler(event);
        toggleElementHidden(".comment-container");
        toggleElementHidden(".comment-form");
    });
};

const addCommentButtonEvent = () => {
    document.querySelector('#footer-btn')
    .addEventListener('click', function eventHandler(event) {
        toggleElementHidden(".comment-container"); 
        toggleElementDisabled(event);
        toggleElementHidden(".comment-form");
        this.removeEventListener('click', eventHandler);
    });
};

function init() {
    addCommentButtonEvent();
    submitCommentButtonEvent();
}

init();