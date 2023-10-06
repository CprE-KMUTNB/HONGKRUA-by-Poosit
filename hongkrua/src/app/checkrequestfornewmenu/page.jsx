import React from "react";
import RequestCard from "../../../components/requestcard";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import data from "../component/fakedata/fooddata";
export default function home() {
    const food = data
        .map((card, index) => (
            <RequestCard
                key={index}
                title={card.title}
                img={card.img}
                flag={card.flag}
                url={card.tag}
                rating={card.rating}
                ratingCount={card.ratingCount}
            />
        ));
    return (
        <>
            <Navbar />
            <div className=" px-2 2xl:px-64 xl:px-10 md:px-40 ">
                <div className="text-5xl font-extrabold">
                    <h1>สูตรอาหาร</h1>
                </div>
                <div className=" container mx-auto mt-[24px]">
                    <div className="grid grid-cols-4 ">
                        {food}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
