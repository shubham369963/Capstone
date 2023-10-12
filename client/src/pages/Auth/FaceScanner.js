import React, { useEffect, useRef, useState } from 'react';
import Layout from './../../components/Layout/Layout.js';
import './FaceScanner.css';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from "axios";

const FaceScanner = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [capturing, setCapturing] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    startVideo();
  }, []);

  const handleImages = async(imageDataURL)=>{
    try{
        const id = localStorage.getItem("userId");
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/faceRecognition`, {
            image:imageDataURL,
            user:id
        });

        if(res && res.data.success){
            toast.success(res.data.message);
            navigate("/login")
        }else{
            toast.error(res.data.message);
            navigate("/FaceScanner")
        }
    }catch(error){
        console.log(error);
        toast.error("Something Went Wrong")
    }
  }

  const startVideo = async () => {
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set the canvas dimensions to match the video frame
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas content to a data URL (base64 encoded)
    const imageDataURL = canvas.toDataURL('image/png');

    // console.log(imageDataURL);
    handleImages(imageDataURL);

    // Store the image data URL in the state
    setImages((prevImages) => [...prevImages, imageDataURL]);
  };

  const startCapture = () => {
    // Capture images at a rate of 5 images per second for 5 seconds
    const intervalId = setInterval(() => {
      captureImage();
    }, 200);

    // Set a countdown timer for 5 seconds
    setCapturing(true);
    const countdownIntervalId = setInterval(() => {
      setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
    }, 1000);

    // Stop capturing after 20 seconds
    setTimeout(() => {
      clearInterval(intervalId);
      clearInterval(countdownIntervalId);
      setCapturing(false);
      
    }, 5000);
  };

  return (
    <Layout title={'Register - Face Scanner'}>
      <div className="mid">
        <h1>Face Scanner</h1>

        <video id="faceScn" height="500" width="500" ref={videoRef} autoPlay playsInline />
        <Button
          onClick={startCapture}
          disabled={capturing}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {capturing ? `Capturing (${countdown})` : 'Start Capture'}
        </Button>
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        <div>
          {images.length > 0 && (
            <div>
              <h2>Captured Images:</h2>
              {images.map((imageDataUrl, index) => (
                <div key={index}>
                  <img
                    src={imageDataUrl}
                    alt={`Captured Image ${index + 1}`}
                    width="100"
                    height="100"
                  />
                  <p>{index}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FaceScanner;
