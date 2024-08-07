const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/posts`;

const index = async () => {
  try {
    const response = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const show = async (id) => {
  try {
    const response = await fetch(BASE_URL + "/" + id, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const create = async (newPost) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

const deletePost = async (id) => {
  try {
    const response = await fetch(BASE_URL + "/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

const updatePost = async (postId, updatedPost) => {
  try {
    const response = await fetch(BASE_URL + "/" + postId, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

const likePost = async (postId) => {
  try {
    const response = await fetch(BASE_URL + "/" + postId + "/like", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

const addComment = async (postId, comment) => {
  try {
    const response = await fetch(BASE_URL + "/" + postId + "/comments", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: comment }),
    });

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export { index, show, create, deletePost, likePost, addComment, updatePost };
