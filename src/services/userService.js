const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/users`;

const showUsers = async () => {
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

const addFriend = async (userId) => {
  try {
    const response = await fetch(BASE_URL + "/" + userId + "/add", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

const acceptFriendRequest = async (userId) => {
  try {
    const response = await fetch(BASE_URL + "/" + userId + "/accept", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export { showUsers, addFriend, acceptFriendRequest };
