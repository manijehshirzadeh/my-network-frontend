import { useState, createContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import * as authService from "../src/services/authService";
import * as postService from "./services/postService";

import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import SignupForm from "./components/SignupForm/SignupForm";
import SigninForm from "./components/SigninForm/SigninForm";
import PostList from "./components/PostList/PostList";
import PostDetails from "./components/PostDetails/PostDetails";
import UsersList from "./components/UsersList/UsersList";
import MyFriendsRequest from "./components/MyFriendsRequest/MyFriendsRequest";
import MyFriends from "./components/MyFriends/MyFriends";
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

  const handleDeletePost = async (postid) => {
    await postService.deletePost(postid);
    const newPosts = posts.filter((listing) => listing._id !== postid);
    setPosts(newPosts);
    navigate("/posts");
  };

  const handleLikePost = async (postid) => {
    await postService.likePost(postid);
    fetchAllPosts();
  };

  const handleCommentSubmit = async (comment, postId) => {
    await postService.addComment(postId, comment);
    fetchAllPosts();
  };

  const handlePostEdit = async (postId, updatedPost) => {
    await postService.updatePost(postId, updatedPost);
    fetchAllPosts();
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar
          user={user}
          handleSignout={handleSignout}
          handleAddPost={handleAddPost}
        />
        {user && <PostCreateDialog handleSubmit={handleAddPost} />}
        <main>
          <Routes>
            {user ? (
              <>
                <Route
                  path="/"
                  element={
                    <PostList
                      posts={posts}
                      handleLikePost={handleLikePost}
                      handleCommentSubmit={handleCommentSubmit}
                    />
                  }
                />
                <Route
                  path="/posts"
                  element={
                    <PostList
                      posts={posts}
                      handleLikePost={handleLikePost}
                      handleCommentSubmit={handleCommentSubmit}
                    />
                  }
                />
                <Route
                  path="/my-posts"
                  element={
                    <PostList
                      posts={posts.filter(
                        (post) => post.owner._id === user._id
                      )}
                    />
                  }
                />

                <Route path="/users" element={<UsersList />} />
                <Route
                  path="/myfriendsrequest"
                  element={<MyFriendsRequest />}
                />
                <Route path="/myfriends" element={<MyFriends />} />

                <Route
                  path="/posts/:id"
                  element={
                    <PostDetails
                      handlePostDelete={handleDeletePost}
                      handlePostEdit={handlePostEdit}
                      handleLikePost={handleLikePost}
                      handleCommentSubmit={handleCommentSubmit}
                    />
                  }
                />
              </>
            ) : (
              <Route path="/" element={<Landing />} />
            )}
            <Route path="/signup" element={<SignupForm setUser={setUser} />} />
            <Route path="/signin" element={<SigninForm setUser={setUser} />} />
          </Routes>
        </main>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
