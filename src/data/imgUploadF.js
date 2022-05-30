import { storageService } from "@/firebase";

export const imgageUpload = async (imgFile, loc) => {
    let loloca = storageService.ref();
    let please = await loloca.child(`${loc}/${imgFile.name}`).put(imgFile);
    let attatchmentUrl = await please.ref.getDownloadURL();
    console.log(attatchmentUrl);
    return attatchmentUrl
}
