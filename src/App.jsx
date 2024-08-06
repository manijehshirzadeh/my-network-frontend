import { useState, createContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import * as authService from "../src/services/authService";
import * as postService from "./services/postService";

import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import SignupForm from "./components/SignupForm/SignupForm";
import SigninForm from "./components/SigninForm/SigninForm";
import PostList from "./components/PostList/PostList";
import PostDetails from "./components/PostDetails/PostDetails";
import PostCreateDialog from "./components/PostCreateDialog/PostCreateDialog";

export const AuthedUserContext = createContext(null);

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(authService.getUser());
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user) fetchAllPosts();
  }, [user]);
  const fetchAllPosts = async () => {
    const allPosts = await postService.index();

    setPosts(allPosts);
  };
  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  const handleAddPost = async (newPost) => {
    const createdPost = await postService.create(newPost);
    setPosts([createdPost, ...posts]);
    // fetchAllPosts();
    navigate("/posts");
  };
  const handlePostEdit = async (postId, updatedPost) => {
    await postService.updatePost(postId, updatedPost);
    fetchAllPosts();
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <PostCreateDialog handleSubmit={handleAddPost} />
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route
                path="/posts/:id"
                element={<PostDetails handlePostEdit={handlePostEdit} />}
              />
            </>
          ) : (
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
