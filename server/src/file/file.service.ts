/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'

export enum FileType{
   AUDIO = "audio",
   IAMGE= "image"
}

@Injectable()
export class FileService{
   createFile(type: FileType, file): string {
      try {
         const fileExtension = file.originalname.split('.').pop()
         const fileName = uuid.v4() + '.' + fileExtension
         const filePath = path.resolve(__dirname, "..", "static", type)
         if (!fs.existsSync(filePath)){
            fs.mkdirSync(filePath,{recursive: true})
         }
         fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)
         return type + '/' + fileName
      } catch (err) { 
         throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
      }
   }
   // eslint-disable-next-line @typescript-eslint/no-empty-function
   removeFile(fileName: string) {
      
   }
}