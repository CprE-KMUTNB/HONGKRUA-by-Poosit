'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <div className="wrapper">
        <div className="container d-flex justify-content-center align-items-center m-0 p-0 min-vh-100">
            <div className="row">
                <div className="col-md-6 d-none d-md-block">
                    
                    <img src="style/asset/loginleftside.png" className="m-0" alt="leftsidepic" width="720px"/>
                </div>
                <div className="col-md-6 right-image">
                    <div className="creamboard p-1">
                        <div className="login-box mx-auto my-auto mt-5">
                            <div className="login-header">
                                <header>เข้าสู่ระบบ</header>
                                
                            </div>
                            <div className="input-box">
                                <input type="text" className="input-field" id="email"  required/>
                                <label htmlFor="email">อีเมล</label>
                            </div>
                            <div className="input-box">
                                <input type="password" className="input-field" id="password"  required/>
                                <label htmlFor="password">รหัสผ่าน</label>
                            </div>
                            <div className="forgot">
                                <section>
                                    
                                </section>
                                <section>
                                    <a href="#" className="forgot-link">ลืมรหัสผ่าน?</a>
                                </section>
                            </div>
                            <div className="input-box">
                                <input type="submit" className="input-submit" value="เข้าสู่ระบบ"/>
                            </div>
                            <div className="middle-text">
                                <hr/>
                                <p className="or-text">Or</p>
                            </div>
                            <div className="social-sign-in">
                                <button className="input-google">
                                    <img src="style/asset/googlelogo.png"/>
                                    <p className="my-auto mx-auto">เข้าสู่ระบบด้วย Google</p>
                                </button>
                            </div>
                            
                            <div className="sign-up mt-2">
                                <p>ยังไม่มีบัญชี? <a href="#">สมัครสมาชิก</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}