"use server";
import { createAdapter } from "webdav-fs";

const username = "nextcloud";
const password = "ijir3-7EFpi-PoyNP-nsqaY-k6ZoG";
const remotePath = `https://cloud.cohr.sa/remote.php/dav/files/${username}`;
const client = createAdapter(remotePath, {
  username,
  password,
});

export async function uploadToCloud(data) {
  const imageFile = await data.get("file");

  if (!imageFile) {
    console.error("No image file provided for upload");
    return null;
  }

  const imageBytes = await imageFile.arrayBuffer();
  const imageBuffer = Buffer.from(imageBytes);
  const name = `${Date.now()}_${imageFile.name}`;
  try {
    client.writeFile(`/upload/${name}`, imageBuffer, "buffer", (err) => {
      if (err) {
        console.error("Error writing the image " + err);
      } else {
        console.log("Image uploaded successfully");
      }
    });

    const imageUrl = `https://cloud.cohr.sa/apps/sharingpath/nextcloud/upload/${encodeURIComponent(
      name,
    )}`;

    return { adImage: imageUrl };
  } catch (error) {
    console.error("Error uploading the image:", error);
    return null;
  }
}
