import { createContext, useEffect, useState } from "react";
import { collection,  onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";

export const PostContext = createContext(null);

export const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);


  const postsCollection = collection(db, "posts");

  useEffect(() => {
    const unsubscribe = onSnapshot(postsCollection,orderBy('createdAt',"desc"), (snapshot) => {
const data=snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      data.sort((a,b)=>b.data.createdAt-a.data.createdAt)
       setPosts(data);
    });

    return () => {
      unsubscribe();
    };
  }, []);



  return (
    <PostContext.Provider value={{ posts }}>
        {children}
        </PostContext.Provider>
  );
};
