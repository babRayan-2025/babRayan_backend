const { storage } = require('./firebaseConfig');
const { ref, uploadBytes, getDownloadURL, getStorage, deleteObject, } = require('firebase/storage');

// Function to upload an image to Firebase Storage
const uploadToFbStorage = async (file) => {
  const storageRef = ref(storage, `factures/${file.originalname}`);
  await uploadBytes(storageRef, file.buffer);
  return getDownloadURL(storageRef);
};

const uploadToFbStorageForPDP = async (file) => {
  const storageRef = ref(storage, `images/${file.originalname}`);
  await uploadBytes(storageRef, file.buffer);
  return getDownloadURL(storageRef);
};

const uploadToFbStorageForPrepaDossier = async (file) => {
  const storageRef = ref(storage, `prepaDossier/${file.originalname}`);
  await uploadBytes(storageRef, file.buffer);
  return getDownloadURL(storageRef);
};

const deleteFileToStorage = async (fileUrl) => {
  // Récupération de la référence à partir de l'URL
  try {
    // Initialize Firebase Storage
    const storage = getStorage();
    // Get a reference to the file using its URL
    const storageRef = ref(storage, fileUrl);
    // Suppression du fichier du stockage
    await deleteObject(storageRef);
  } catch (error) {
    console.error("Erreur lors de la suppression du fichier :", error);
  }
};

module.exports = { uploadToFbStorage, uploadToFbStorageForPDP, uploadToFbStorageForPrepaDossier, deleteFileToStorage };