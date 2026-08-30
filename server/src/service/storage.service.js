import { ImageKit } from "@imagekit/nodejs/client.js";
import fs from 'fs';
const imageKit = new ImageKit({
    privateKey: "private_MycyaBOc+Ajd8Lv+upR46oXpiqU=",
})
export async function  uploadFile(buffer) {
    const result = await imageKit.files.upload({
        file: buffer.toString("base64"),
        fileName: "image.jpg"
    })
    return result;
}