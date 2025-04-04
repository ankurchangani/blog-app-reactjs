import { setDoc, deleteDoc, getDocs, doc, collection } from "firebase/firestore";
import { db } from '../../firebase.js';
import { uploadImageToCloudinary } from "./cloudinaryActions.js";

const generateNumericId = () => {
    return Math.floor(Math.random() * 10000);
};

const addPostSuccess = (data) => ({
    type: "AddPostSuccess",
    payload: data,
});


const removePostSuccess = (id) => ({
    type: "REMOVE_POST",
    payload: id,
});

const editPostSuccess = (updatedPost) => ({
    type: "EDIT_POST",
    payload: updatedPost,
  });



export const addPostAsync = (data) => async (dispatch) => {
    try {
        const { title, category, content, image } = data;


        const imageUrl = await uploadImageToCloudinary(image);
        if (!imageUrl) {
            throw new Error("Image upload failed");
        }

        const id = generateNumericId();


        await setDoc(doc(db, "posts", id.toString()), {
            ...data,
            id,
            image: imageUrl,
        });

        dispatch(addPostSuccess({ ...data, image: imageUrl, id }));
    } catch (error) {
        console.error("Error adding post:", error.message);
    }
};


export const fetchSinglePostAsync = (id) => async (dispatch) => {
    try {
        const postRef = doc(db, "posts", id);
        
        const postSnap = await getDoc(postRef);

        if (postSnap.exists()) {
            const postData = { id, ...postSnap.data() };
            dispatch(setSelectedPost(postData));
        } else {
            console.error("Post not found");
        }
    } catch (error) {
        console.error("Error fetching single post:", error);
    }
};

export const editPostAsync = (id, post) => async (dispatch) => {
    try {
      let imageUrl = post.image;
  
      // Upload image if it's a new file
      if (post.image instanceof File) {
        imageUrl = await uploadImageToCloudinary(post.image);
        if (!imageUrl) throw new Error("Image upload failed");
      }
  
      const updatedPost = { ...post, image: imageUrl };
  
      await setDoc(doc(db, "posts", id.toString()), updatedPost);
  
      dispatch(editPostSuccess(updatedPost));
      dispatch(fetchPosts());
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

export const removePostAsync = (id) => async (dispatch) => {
    try {
        await deleteDoc(doc(db, "posts", id.toString()));
        dispatch(removePostSuccess(id));
        dispatch(fetchPosts());
    } catch (error) {
        console.error("Error removing post:", error.message);
    }
};


export const fetchPosts = () => async (dispatch) => {
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      dispatch({ type: "FETCH_POSTS", payload: postsArray });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };