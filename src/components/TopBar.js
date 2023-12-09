import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './TopBar.module.css';
import { authActions } from '../store/auth-slice';

const TopBar = () => {
      const navigate = useNavigate();
        const dispatch = useDispatch();
      const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
      const handleSignup = () => navigate("/signup");
      const handleLogin = () => navigate("/login");
      const handleLogout = () => {
        dispatch(authActions.logout());
      }
  return (
    <div style={{display: "flex", flexDirection: "column"}}>
    <div className={styles.topBar}>
      <h1 className={styles.title}>Screen Recorder</h1>
      {!isLoggedIn && (
        <div className={styles.buttons}>
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleSignup}>Signup</button>
        </div>
      )}
      {isLoggedIn && (
        <div className={styles.buttons}>
          <p style={{ color: "transparent", cursor: "default"}}>Dummy</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
      <p style={{ alignSelf: "center"}}>The perfect place to record your screen, video and download them!</p>
    </div>
  );
}

export default TopBar