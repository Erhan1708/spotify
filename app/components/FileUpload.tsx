import React, { ChangeEvent, FC, ReactNode, useRef } from 'react';

interface FileUploadProps {
   setFile: Function;
   accept: string;
   children: ReactNode;
}

const FileUpload: FC<FileUploadProps> = ({ setFile, accept, children }) => {
   const ref = useRef<HTMLInputElement>(null)

   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
         setFile(e.target.files[0])
      }
   }

   return (
      <div onClick={() => ref.current?.click()}>
         <input
            ref={ref}
            type='file'
            accept={accept}
            style={{ display: 'none' }}
            onChange={onChange}
         />
         {children}
      </div>
   );
};

export default FileUpload;