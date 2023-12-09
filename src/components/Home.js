import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { FaVideoSlash, FaDownload, FaCamera } from 'react-icons/fa'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'video-react/dist/video-react.css'
import { Player } from 'video-react'
import {
  RecordRTCPromisesHandler,
} from 'recordrtc'
import { saveAs } from 'file-saver'
import { useSelector } from 'react-redux'
import TopBar from './TopBar'
import styles from './Home.module.css';
import { saveInDb } from '../utils/saveInDb'

const Home = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const token = useSelector(state => state.auth.token)
  const [recorder, setRecorder] = useState()
  const [stream, setStream] = useState()
  const [videoBlob, setVideoBlob] = useState()
  const [type, setType] = useState('video')
  const videoRef = useCallback(
    (node) => {
      if (node) {
        node.srcObject = stream;
      }
    },
    [stream]
  );

  const startRecording = async () => {
    const stream =
      type === 'video'
        ? await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          })
        : await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: false,
          })

    const recorder = new RecordRTCPromisesHandler(stream, {
      type: 'video',
    })

    await recorder.startRecording()
    setRecorder(recorder)
    setStream(stream)
    setVideoBlob(null)
  }

  const stopRecording = async () => {
    if (recorder) {
         await recorder.stopRecording();
         const blob = await recorder.getBlob();
         stream.getTracks().forEach((track) => track.stop());


         setVideoBlob(blob);
         setStream(null);
         setRecorder(null);
    }
  }
  useEffect(() => {
    const saveVideoInDb = async () => {
      const { data }  = await saveInDb(videoBlob, token);
      if(data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    }
    videoBlob && saveVideoInDb();
  }, [videoBlob]);

  const downloadVideo = () => {
    if (videoBlob) {
      const mp4File = new File([videoBlob], 'demo.mp4', { type: 'video/mp4' })
      saveAs(mp4File, `Video-${Date.now()}.mp4`)
    }
  }

  const changeType = () => {
    if (type === 'screen') {
      setType('video')
    } else {
      setType('screen')
    }
  }

  return (
    <div>
      <TopBar />
      {isLoggedIn && (
        <div className={styles.gridContainer}>
          <div className={styles.innerContainer}>
            <button style={{ background: "greenyellow" }} onClick={changeType}>
              {type === "screen" ? "Record Screen" : "Record Video"}
            </button>
            <FaCamera
              size={20}
              style={{
                margin: "0 15",
                background: "greenyellow",
                border: "1px solid",
              }}
              onClick={startRecording}
            />
            <FaVideoSlash
              size={20}
              style={{
                margin: "0 15",
                background: "greenyellow",
                border: "1px solid",
              }}
              onClick={stopRecording}
            />
            <FaDownload
              size={20}
              style={{
                margin: "0 15",
                background: "greenyellow",
                border: "1px solid",
              }}
              onClick={downloadVideo}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              overflowY: "hidden",
            }}
          >
            <div
              className={styles.screenCapture}
              style={{
                width: "50vw",
                height: "50vh",
                background: !!videoBlob ? "inherit" : "gray",
              }}
            >
              {!!videoBlob ? (
                <Player src={window.URL.createObjectURL(videoBlob)} />
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  style={{ width: "100%", height: "100%" }}
                />
              )}
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default memo(Home)