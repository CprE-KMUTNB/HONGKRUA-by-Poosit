import React from "react";
import Navbar from "../component/navbar/page";
import Footer from "../component/footer/page";
import data from "./data";
import RequestBox from "../../../components/RequestBox";
export default function home() {
    const allrequest = data
        .map((card, index) => (
            <RequestBox 
            key = {index}
            username={card.username}
            img={card.profileimg}
            userrequest={card.requestdetail} />
        ));

    return (
        <>
            <Navbar />
            <div className=" px-2 2xl:px-64 xl:px-10 md:px-40 ">
                <div className="text-5xl font-extrabold">
                    <h1>ตรวจสอบรีเควส</h1>
                </div>
                <div className=" container mx-auto mt-[24px] mb-[450px]">
                        {allrequest}
                </div>
            </div>
            <Footer className=""/>
        </>
    )
}
