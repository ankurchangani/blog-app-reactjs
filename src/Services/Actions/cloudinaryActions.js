const CLOUD_NAME = 'dgo3idm03';  // Directly assign your Cloudinary cloud name
const API_KEY = '848136188393758';  // Directly assign your Cloudinary API key
const UPLOAD_PRESET = 'PostsUpload';  // Directly assign your Cloudinary upload preset

console.log(CLOUD_NAME, API_KEY, UPLOAD_PRESET);  // Debugging logs

export const uploadImageToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('cloud_name', CLOUD_NAME);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Image upload failed.");
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};
