import React, { useState } from "react";
import axios from 'axios';

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
const API_KEY = process.env.CLOUDINARY_API_KEY

export default function Upload (props) {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const upload = async (files) => {
        const { signature, timestamp } = await axios({
            method: "POST",
            url: "http://localhost:8080/createUpload"
        }).then((res) => {
            console.log("signature and timestamp ", res.data)
        })
        const form = new FormData()
        form.append('file', files[0])
        await fetch('http://localhost:8080/upload', {
            method: "POST",
            body: JSON.stringify({ data: base64EncodedImage })
        }
        )}


        // axios({
        //     method: "POST",
        //     // title, filetype and tags
        //     data: {
        //         file: files[0],
        //         title: title,
        //         description: description,
        //         category: category
        //         // tags
        //     },
        //     url: "http://localhost:8080/upload"
        // }).then((res) => {
        //     console.log(res.data);
        //     props.history.push("/home")
        // });
    };

    const handleUpload = () => {
        const { files } = document.querySelector('input[type="file"]')
        upload(files)
    }

    return (
        <div>
            <form>
                <h1>Upload a file</h1>
                <p>Currently only image files are supported, more coming soon!</p>
                <br />
                <input 
                    type="file" 
                    id="file" 
                    accept=".mp4,.png,.jpg,.jpeg"
                /> <br/> <br/>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input 
                    type="textarea" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="image">image</option>
                    <option value="video">video</option>
                    <option value="sound">sound</option>
                </select>
                {/* implement tag system */}
                <button onClick={handleUpload}>
                    Upload
                </button>
            </form>
        </div>
    )
}