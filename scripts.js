let modal = document.getElementById("myModal");
let close = document.getElementById("close");

document.addEventListener("DOMContentLoaded", function () {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        let temp = "";
        data.forEach((user) => {
          temp += "<div class='card'> ";
          temp += "<p class='name'>" + user.name + "</p>";
          temp +=
            "<p class='email'>" +
            user.email +
            `</p> <button id='button${user.id}' onclick='myFunction(${user.id})'>view post</button></div>`;
        });
        document.getElementById("cardContainer").innerHTML = temp;
      }
    });
});

function myFunction(id) {
  let loader = `<div class="boxLoading">loading ...</div>`;
  document.getElementById(`button${id}`).innerHTML = loader;
  fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
    .then((response) => response.json())
    .then((posts) => {
      if (posts.length > 0) {
        var temp = "";

        posts.forEach((post) => {
          temp += "<div class='cardbody'> ";
          temp += "<h2>" + post.title + "</h2>";
          temp += "<span>" + post.body + "</span> </div>";
        });
        document.getElementById(`button${id}`).innerHTML = "view post";
        document.getElementById("modal_content").innerHTML = temp;
      }
      modal.style.display = "block";
      gsap.from(".modalWrapper", { duration: 0.5, y: "100%", ease: "linear" });
    });
}

close.addEventListener("click", function () {
  modal.style.display = "none";
});
