import React, { useContext, useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { Navbar } from "../components/Navbar";
import { db, storage } from "../lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { ProfilePost } from "../components/ProfilePost";
import { UserInfo } from "../components/UserInfo";
import { AuthContext } from "../context/AuthContext";
import { EditProfileModal } from "../components/EditProfileModal";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { updateProfile } from "firebase/auth";

function Profile() {
  const { currentUser, userProfile } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState();
  const [open, setOpen] = useState(false);
  const[loading,setLoading]=useState(false);

  const openModal = () => setOpen(true);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!currentUser) return;
    const q = query(
      collection(db, "posts"),
      where(
        "postedBy.uid",
        "==",
        userProfile && userProfile ? userProfile.uid : currentUser?.uid
      )
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let data=snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      data.sort((a,b)=>b.data.createdAt-a.data.createdAt)
      setPosts(data);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    const userD = query(
      collection(db, "users"),
      where("uid", "==", currentUser.uid)
    );
    const unsubscribe = onSnapshot(userD, (snapshot) => {
      setUser(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    !userProfile && alert("Double click on post to delete");
  }, []);

  const handleUpdateProfile = async (file, username, fullname) => {
    setLoading(true)
    if (!file || !username || !fullname) return;
    try {
      // creating image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${username + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(currentUser && currentUser, {
              displayName: username,
              photoURL: downloadURL,
            });
            await updateDoc(doc(db, "users", currentUser && currentUser.uid), {
              displayName: username,
              photoURL: downloadURL,
              fullname,
            }).then(()=>setLoading(false))
          } catch (e) {
            setLoading(false)
            console.log(e);
          }
        });
      });

      close();
    } catch (e) {
      setLoading(false)
      console.log(e);
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "posts", id));
  };
  return (
    <>
      <Navbar currentUser={currentUser} />
      <Container maxWidth="md">
        <UserInfo
          username={
            userProfile && userProfile
              ? userProfile.displayName
              : user && user[0].data.displayName
          }
          fullname={
            userProfile && userProfile
              ? userProfile.fullname
              : user && user[0].data.fullname
          }
          photoURL={
            userProfile && userProfile
              ? userProfile.photoURL
              : user && user[0].data.photoURL
          }
          followings={
            userProfile && userProfile
              ? userProfile.following.length
              : user && user[0].data.following.length
          }
          followers={
            userProfile && userProfile
              ? userProfile.followers.length
              : user && user[0].data.followers.length
          }
          posts={posts && posts.length}
          openModal={openModal}
          hideEditProfile={userProfile && userProfile ? false : true}
        />
        <Grid className="profileGrid" container gap={3} sx={{ marginTop: 4 }}>
          {posts &&
            posts.map((post) => (
              <ProfilePost
                key={post.id}
                image={post && post.data.image}
                likes={post && post.data.likes.length}
                comments={post && post.data.comments.length}
                handleDelete={!userProfile && handleDelete}
                id={post && post.id}
              />
            ))}
          {posts.length === 0 && <Typography>No posts yet</Typography>}
        </Grid>
      </Container>
      <EditProfileModal
        close={close}
        open={open}
        handleUpdateProfile={handleUpdateProfile}
        loading={loading}
      />
    </>
  );
}

export default Profile;
