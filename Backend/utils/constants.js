module.exports = Object.freeze({
    AWS:{
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey:process.env.AWS_SECRET_KEY,
        bucketName:process.env.AWS_S3_BUCKET_NAME
    }

})