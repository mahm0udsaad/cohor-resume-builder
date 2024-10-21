import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request) {
  try {
    const { imageData, templateName, format = "webp", dimensions } = await request.json();

    // Convert base64 to buffer
    const base64Data = imageData.replace(/^data:image\/[^;]+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    // Ensure the templates directory exists
    const templatesDir = path.join(process.cwd(), "public", "templates");
    await fs.mkdir(templatesDir, { recursive: true });

    // Save the image
    const filename = `${templateName}.${format}`;
    const filepath = path.join(templatesDir, filename);
    await fs.writeFile(filepath, buffer);

    // Get file size
    const stats = await fs.stat(filepath);
    const fileSizeInKB = stats.size / 1024;

    return NextResponse.json({
      success: true,
      path: `/templates/${filename}`,
      format,
      size: fileSizeInKB,
      dimensions
    });
  } catch (error) {
    console.error("Error saving template image:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save image" },
      { status: 500 },
    );
  }
}