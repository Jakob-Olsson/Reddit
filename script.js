let container = document.getElementById("posts-main-container");

fetch('https://dummyjson.com/posts')
    .then(res => res.json())
    .then((posts) => {
        
        let storedValue = localStorage.getItem("data");
        if (!storedValue) {
            localStorage.setItem("data", JSON.stringify(posts));
        }
        let object = JSON.parse(localStorage.getItem("data"));
        console.log(object);




        for (let i = 0; i < object.posts.length; i++) {

            let postContainer = document.createElement("div");
            postContainer.classList.add("postContainer");
            container.append(postContainer);

            //title
            let title = document.createElement("h3");
            title.innerText = object.posts[i].title;
            postContainer.append(title);

            //innehåll
            let content = document.createElement("p");
            content.innerText = object.posts[i].body;
            postContainer.append(content);

            //tags och likes container
            let bottom = document.createElement("div");
            bottom.classList.add("postBottom");
            postContainer.append(bottom);


            //tags
            let tagsContainer = document.createElement("div");
            tagsContainer.classList.add("tagsContainer");
            bottom.append(tagsContainer);
            for (let c = 0; c < object.posts[i].tags.length; c++) {
                let tag = document.createElement("span");
                tag.innerText = "#" + object.posts[i].tags[c];
                tagsContainer.append(tag);
            }
            //Reactions
            let likeContainer = document.createElement("div");
            likeContainer.classList.add("likeContainer");
            bottom.append(likeContainer);

            //Like

            let leftButton = document.createElement("button");
            leftButton.classList.add("leftButton");
            likeContainer.append(leftButton);
            let leftSvg = document.createElement("img");
            leftSvg.src = "./media/like-svgrepo-com.svg";
            leftButton.append(leftSvg);
            leftButton.addEventListener("click", function () {
                let counter = object.posts[i].reactions;
                counter++;
                object.posts[i].reactions = counter;
                likeCount.innerText = object.posts[i].reactions;


                localStorage.setItem("data", JSON.stringify(object));
                object = JSON.parse(localStorage.getItem("data"));

            })

            //Likes
            let likeCount = document.createElement("span");
            likeCount.classList.add("likeCount");
            likeCount.innerText = object.posts[i].reactions;
            likeContainer.append(likeCount);

            //Disslike
            let rightButton = document.createElement("button");
            rightButton.classList.add("rightButton");
            likeContainer.append(rightButton);
            let rightSvg = document.createElement("img");
            rightSvg.src = "./media/dislike-svgrepo-com.svg";
            rightButton.append(rightSvg);
            rightButton.addEventListener("click", function () {
                let counter = object.posts[i].reactions;
                counter--;
                object.posts[i].reactions = counter;
                likeCount.innerText = object.posts[i].reactions;


                localStorage.setItem("data", JSON.stringify(object));
                object = JSON.parse(localStorage.getItem("data"));

            })
        }
    })
