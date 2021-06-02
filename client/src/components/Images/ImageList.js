import {useState, useEffect } from 'react';
import axios from 'axios';

const fetchImages = () => {
    return axios
    .get('http://localhost:8080/api/images')
    .then(({ data }) => {
        console.log(data);
        return data;
    })
    .catch((err) => {
        console.error(err);
    });
};

export default function ImageList() {
    document.title = 'freebiegeebies';
    const [imageData, setImageData] = useState([])

    const getImages = () => { 
        fetchImages().then((imageData) => {
            setImageData(imageData)
        })
    }

    useEffect(() => {
        getImages();
    }, [])

    return (
        <main>
            <div className="image-container">
                {imageData.map((image, idx) => (
                <div key={idx}>
                    <img width="864" height="576" alt={image.title} src={image.image_URL}/>
                    <p>{image.title}</p>
                </div>
                ))}
            </div>
        </main>
    );
}