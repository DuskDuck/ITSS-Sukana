import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCvrMdNxoUOk1c5HaiV1NNRJ2lvMt0aj14",
    authDomain: "itss-sukana.firebaseapp.com",
    projectId: "itss-sukana",
    storageBucket: "itss-sukana.appspot.com",
    messagingSenderId: "1060359336675",
    appId: "1:1060359336675:web:08b0db5d76c5f34d628bd6",
    measurementId: "G-J0XZWQF9KK"
    
};

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

const getImageURL = async (fileName) => {
  const imageRef = ref(storage, fileName);

  try {
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error('Error getting image URL:', error);
    throw error;
  }
};

export { getImageURL };