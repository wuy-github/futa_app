// src/firebase.js

// Import các hàm cần thiết từ Firebase SDK
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// ===== THÊM CÁC HÀM AUTHENTICATION =====
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcdJfhUIO58Pl6HmujVLnNGl-0rTUrUCg",
  authDomain: "futa-app-18858.firebaseapp.com",
  projectId: "futa-app-18858",
  storageBucket: "futa-app-18858.appspot.com",
  messagingSenderId: "372822495817",
  appId: "1:372822495817:web:f32c4ed0ce5b586c442598",
  measurementId: "G-PB5ZEHQ37B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics
// const analytics = getAnalytics(app);

// ===== KHỞI TẠO VÀ EXPORT CÁC DỊCH VỤ AUTH =====
// Khởi tạo Firebase Authentication
export const auth = getAuth(app);

// Tạo các nhà cung cấp dịch vụ đăng nhập
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

// Tạo và export các hàm helper để gọi đăng nhập cho dễ
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signInWithFacebook = () => signInWithPopup(auth, facebookProvider);

// Export app mặc định
export default app;
