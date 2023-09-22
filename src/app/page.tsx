'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <div>

    </div>
  )
}