// import React, { useEffect, useState } from "react";
// import { storage } from "./firebaseConfig";

// const FileDownloader = () => {
//   const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

//   interface FileDownloaderProps {
//     // Define any additional props you want to pass to the component
//   }

//   useEffect(() => {
//     const getFileDownloadUrl = async () => {
//       try {
//         const url = await fileRef.getDownloadURL();
//         setDownloadUrl(url);
//       } catch (error) {
//         console.log("Error getting download URL:", error);
//       }
//     };

//     getFileDownloadUrl();
//   }, []);

//   const handleDownload = () => {
//     if (downloadUrl) {
//       const anchorElement = document.createElement("a");
//       anchorElement.href = downloadUrl;
//       anchorElement.download = "filename"; // Замените 'filename' на желаемое имя файла при загрузке
//       anchorElement.click();
//     }
//   };

//   return (
//     <div>
//       {downloadUrl ? (
//         <button onClick={handleDownload}>Скачать файл</button>
//       ) : (
//         <p>Загрузка URL файла...</p>
//       )}
//     </div>
//   );
// };

// export default FileDownloader;
