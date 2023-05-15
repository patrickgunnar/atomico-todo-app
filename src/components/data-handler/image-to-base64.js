// convert an image to base64 image
export async function ImageToBase64(file, name) {
    const responseArrBuffer = await file.arrayBuffer()

    return `data:'image/${`${name}`.split('.').at(-1)}';base64,${Buffer.from(responseArrBuffer).toString('base64')}`
}
