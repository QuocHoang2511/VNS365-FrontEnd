import { getApp, getApps, initializeApp } from "firebase/app";
import {
  FullMetadata,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBKzerQbFFYjOZBCt2EU_e4DmdiTgjZYDc",
  authDomain: "file-storage-6ac01.firebaseapp.com",
  projectId: "file-storage-6ac01",
  storageBucket: "file-storage-6ac01.appspot.com",
  appId: "1:188932312041:web:96806c157751c296765978",
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

const fbApp = getApp();
const fbStorage = getStorage();

export { fbApp, fbStorage };

export const uploadToFirebase = async (
  file: File,
  onProgress: (progress: number) => void
): Promise<{
  downloadUrl: string;
  metadata: FullMetadata;
}> => {
  if (file) {
    const storeRef = ref(fbStorage, `hoangha/images/${file.name}`);

    const uploadTask = uploadBytesResumable(storeRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress && onProgress(progress);
        },
        (error) => {
          console.log(error);
          reject(error);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({
            downloadUrl,
            metadata: uploadTask.snapshot.metadata,
          });
        }
      );
    });
  }

  return {
    downloadUrl: "",
    metadata: {} as FullMetadata,
  };
};
