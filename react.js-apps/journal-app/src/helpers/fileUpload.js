

export const fileUpload = async (file) => {

    if (!file) throw new Error("There is no file")

    const cloudUrl = "https://api.cloudinary.com/v1_1/dkixtok7a/auto/upload"

    const formData = new FormData()
    formData.append("upload_preset", "react-journal")
    formData.append("file", file)

    try {

        const resp = await fetch(cloudUrl, {
            method: "POST",
            body: formData
        })

        console.log(resp);
        if (!resp.ok) throw new Error("The image couldn´t be loaded")

        const cloudResp = await resp.json()
        console.log(cloudResp);

        return cloudResp.secure_url;

    } catch (error) {
        console.log(error);
        throw new Error(error.message)
    }
}