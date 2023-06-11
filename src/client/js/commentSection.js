const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const removeComment = document.getElementById("remove_comment");
const videoComments = document.querySelector(".video__comments ul");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.innerText = "❌";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const { status } = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  textarea.value = "";
  if (status === 201) {
    addComment(text);
  }
};

const handleRemoveComment = (event) => {
  console.log("Let's remove comment");
  const some = event.target.parentElement;
  const videoId = videoContainer.dataset.id;
  const comment_id = some.getAttribute(`data-id`);
  console.log(some);
  console.log(comment_id);
  videoComments.removeChild(some);
  fetch(`/api/videos/${videoId}/${comment_id}/delete`, {
    method: "POST",
    body: {
      comment_id: "comment_id",
    },
  });
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

removeComment.addEventListener("click", handleRemoveComment);
