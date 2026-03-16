"use client"

import React, { useRef, useLayoutEffect, useState, useEffect } from "react"
import Image from "next/image"

import car1 from "@/public/images/car1.png"
import car2 from "@/public/images/car2.png"
import car3 from "@/public/images/car3.png"
import car4 from "@/public/images/car4.png"
import car5 from "@/public/images/car5.png"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Head from "next/head"

gsap.registerPlugin(ScrollTrigger)


export default function Page() {

  const [mobile, setMobile] = useState(null)

  const wrap = useRef(null)
  const container = useRef(null)
  const text = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 1200);
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])


  useLayoutEffect(() => {

    if (mobile === null || mobile) return

    const ctx = gsap.context(() => {

      gsap.to(container.current, {
        rotateY: 360,
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "center center",
          end: "+=1500",
          scrub: 1,
          pin: true
        }
      })

      gsap.fromTo(
        text.current,
        {
          y: 100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 2
        }
      )

    }, wrap)

    return () => ctx.revert()

  }, [mobile])


  if (mobile === null) return null


  if (mobile) return <p className="only_desktop">Only for Desktop</p>

  return (
    <>
     <Head>
        <title>Vintage Cars</title>
        <meta name="description" content="Classic cars" />
      </Head>
      <p className="vintage_text" ref={text}>
        VINTAGE<br /><span>CARS</span>
      </p>

      <span className="tooltip">SCROLL TO SEE</span>
      <div className="overlay"></div>

      <div style={{ height: "10vh" }}></div>

      <div className="wrapper" ref={wrap}>
        <div className="container" ref={container}>

          <div className="slide">
            <Image src={car1} alt="" />
          </div>

          <div className="slide">
            <Image src={car2} alt="" />
          </div>

          <div className="slide">
            <Image src={car3} alt="" />
          </div>

          <div className="slide">
            <Image src={car4} alt="" />
          </div>

          <div className="slide">
            <Image src={car5} alt="" />
          </div>

          <div className="slide">
            <Image src={car3} alt="" />
          </div>

        </div>
      </div>
    </>
  )
}