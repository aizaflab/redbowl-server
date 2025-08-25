import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path'; // Import path module to handle file paths

export const uploadToCloudinary = async (localFilePath: string, folder: string): Promise<string | null> => {
  try {
    // Extract the filename from the local file path
    const fileName = path.basename(localFilePath, path.extname(localFilePath)); // Filename without extension
    const filePathOnCloudinary = `${folder}/${fileName}`;

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(localFilePath, { public_id: filePathOnCloudinary });

    // Delete the local file after upload
    fs.unlinkSync(localFilePath);

    return result.secure_url; // Return the secure HTTPS URL
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);

    // Delete the local file if it exists in case of an error
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};
