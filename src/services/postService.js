const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/posts`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export { index };
