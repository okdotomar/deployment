console.log("connected");

const createPost = document.getElementById("create-post");
let postReviewWrapper = document.querySelector("#main")
let rightSidebar = document.querySelector("#right-sidebar");
let postID = null;

let username = document.querySelector("#username");
let meowContent = document.querySelector("#post-content");
let catName = document.querySelector("#cat-name");
let catColor = document.querySelector("#cat-color");

function addPost(data, index) {
    if (!data || !data.username || !data.meow) {
        // Skip if data is missing or invalid
        return;
    }

    let postElement = document.createElement("div");
    postElement.classList.add("post");

    let contentWrapper = document.createElement("div");
    contentWrapper.classList.add("post-content-wrapper");

    // Create the image element for the profile icon
    let profileIcon = document.createElement("img");
    profileIcon.classList.add("profile-icon");
    profileIcon.src = `https://robohash.org/${index}?set=set4&size=50x50`; // Generate a unique image per post

    let usernameElement = document.createElement("strong");
    usernameElement.innerText = data["username"] + ": ";

    // Create the text element for the post content
    let postContent = document.createElement("p"); // Use <p> tag to display the 
    postContent.innerText = data["meow"];

    // Append the profile icon and post content to the post element
    contentWrapper.appendChild(profileIcon);
    contentWrapper.appendChild(usernameElement);
    contentWrapper.appendChild(postContent);


    // Button container
    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("post-buttons");

    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = function() {
        username.value = data["username"];
        meowContent.value = data["meow"];
        catName.value = data["cat_name"];
        catColor.value = data["cat_color"];
        postID = data["id"];
        let saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        rightSidebar.appendChild(saveButton);
        const date = new Date();
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        console.log(username.value, meowContent.value, catName.value, catColor.value, formattedDate);
        //let editData = 'username=' + encodeURIComponent(username.value) + '&meow=' + encodeURIComponent(meowContent.value) + '&cat_name=' + encodeURIComponent(catName.value) + '&cat_color=' + encodeURIComponent(catColor.value) + '&date=' + encodeURIComponent(formattedDate);
        saveButton.onclick = function() {
            console.log(username.value, meowContent.value, catName.value, catColor.value, formattedDate);
            let editData = 'username=' + encodeURIComponent(username.value) + '&meow=' + encodeURIComponent(meowContent.value) + '&cat_name=' + encodeURIComponent(catName.value) + '&cat_color=' + encodeURIComponent(catColor.value) + '&date=' + encodeURIComponent(formattedDate);
            fetch(`http://localhost:8081/kitter/posts/${postID}`, {
                method: "PUT",
                body: editData,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
            })
            .then(function(response) {
                console.log('edit post added', response);
                postReviewWrapper.innerHTML = "";
                username.value = "";
                meowContent.value = "";
                catName.value = "";
                catColor.value = "";
                rightSidebar.removeChild(saveButton);
                loadPosts();
            })
        }

    }

    // Delete button
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.onclick = function() {
        // Confirmation prompt
        const userConfirmed = confirm("Are you sure you want to delete this post?");
        
        if (userConfirmed) {
            fetch(`http://localhost:8081/kitter/posts/${data["id"]}`, {
                method: "DELETE",
            })
            .then(function(response) {
                console.log('Post deleted', response);
                postReviewWrapper.innerHTML = "";
                loadPosts();
            })
            .catch(function(error) {
                console.error("Error deleting post:", error);
            });
        } else {
            console.log("User canceled deletion");
        }
    };

    // Append buttons to button container
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    // Append button container to post element
    postElement.appendChild(contentWrapper);
    postElement.appendChild(buttonContainer);

    // Append the post element to the post wrapper
    postReviewWrapper.appendChild(postElement);
}

function loadPosts() {
    postReviewWrapper.innerHTML = "";
    fetch("http://localhost:8081/kitter/posts")
    .then(function(response) {
        response.json()
        .then(function(data) {
            console.log(data);
            // Filter out empty entries before adding posts
            let posts = data.filter(post => post && post.username && post.meow);
            posts.forEach(addPost);
        })
    })
}

function addNewPost(){

    const date = new Date();
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    console.log(formattedDate);

    //prep data
    let data = 'username=' + encodeURIComponent(username.value) + '&meow=' + encodeURIComponent(meowContent.value) + '&cat_name=' + encodeURIComponent(catName.value) + '&cat_color=' + encodeURIComponent(catColor.value) + '&date=' + encodeURIComponent(formattedDate);
    fetch("http://localhost:8081/kitter/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data
    })
    .then(function(response) {
        console.log('new post added', response);
        postReviewWrapper.innerHTML = "";
        username.value = "";
        meowContent.value = "";
        catName.value = "";
        catColor.value = "";
        loadPosts();
    })
}

createPost.onclick = addNewPost;

loadPosts();
