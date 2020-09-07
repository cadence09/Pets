import React, { useRef, useState } from 'react';

function FileUpload() {
    const [file, setFile] = useState(''); // storing the uploaded file    // storing the recived file from backend
    const [data, getFile] = useState({ name: "", path: "" });    const [progress, setProgess] = useState(0); // progess bar
    const el = useRef(); // accesing input element
    const handleChange = (e) => {
        setProgess(0)
        const file = e.target.files[0]; // accesing file
        console.log(file);
        setFile(file); // storing file
    }
    const uploadFile = () => {
        const formData = new FormData();        
        formData.append('file', file); // appending file
        // axios.post('http://localhost:4500/upload', formData, {
        //     onUploadProgress: (ProgressEvent) => {
        //         let progress = Math.round(
        //         ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
        //         setProgess(progress);
        //     }
        // })
        fetch('./getCats',{
            method:"POST",
            body: formData
        })
        .then(res => {
            console.log("res",res.data,"path",res.data.path);
            getFile({ name: res.data.name,
                     path: 'http://localhost:3001/getCats' + res.data.path
                   })
        }).catch(err => console.log(err))}
    return (
        <div>
            <div className="file-upload">
                <input type="file" ref={el} onChange={handleChange} />                
                {/* <div className="progessBar" style={{ width: progress }}>
                   {progress}
                </div> */}
                <button onClick={uploadFile} className="upbutton">                  
                 Upload
                </button>
            <hr />
            {/* displaying received image*/}
            {data.path && <img src={data.path} alt={data.name} />}
            </div>
        </div>
    );
}
export default FileUpload;