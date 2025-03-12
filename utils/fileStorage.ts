import path from "path";
import fs from "fs/promises";

export class FileStorage {
  static async saveFile(file: File): Promise<string> {
    const uploadDir = path.join(process.cwd(), "public/data/portfolios");
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, file.name);
    const fileData = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, fileData);

    return `/data/portfolios/${file.name}`; // 저장된 파일의 URL 반환
  }
}
