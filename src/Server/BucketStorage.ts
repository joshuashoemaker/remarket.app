import aws from 'aws-sdk'
import SYS from '../SYS'

class BucketStorage {
  private static s3 = new aws.S3({
    endpoint: SYS.objectStorageEndpoint,
    accessKeyId: SYS.objectStorageAccessId,
    secretAccessKey: SYS.objectStorageSecretAccessKey,
    region: 'default',
    httpOptions: {
      timeout: 0
    }
  })

  public static async upload (props: { bucketName: string, file: Buffer, fileName: string }): Promise<string> {
    try {
      const fileUploadResponse: aws.S3.ManagedUpload.SendData = await this.s3.upload({
        Bucket: props.bucketName,
        Key: props.fileName,
        Body: props.file,
        ACL: 'private'
      }).promise()
      return fileUploadResponse.Key
    } catch (err) {
      throw err
    }
  }

  public static getPresignedUrl (props: { bucketName: string, key: string, expiresInSeconds: number }) {
    const expriesInMiliseconds = (props.expiresInSeconds * 1000) || 60000
    const presignedUrlResponse = this.s3.getSignedUrl('getObject', {
      Bucket: props.bucketName,
      Key: props.key,
      Expires: expriesInMiliseconds
    })
    return presignedUrlResponse
  }
}

export default BucketStorage
