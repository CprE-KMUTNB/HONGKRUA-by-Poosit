import React from "react";
import Image from "next/image";
import Link from "next/link";
import Stars from "../stars/page";
export default function Card(props) {
    const { title, img, flag, url,rating,ratingCount} = props;
    return (
        <Link href={url} className="h-[260px] w-[300px] my-3 shadow">
            <div className="">
                <pic >
                    <img className="absolute p-1" src={flag} alt="logo" width={32} height={24} />
                    <img className="h-[200px] w-[300px]" src={img} alt="a" />
                </pic>

                <div>
                    <p className=" text-base font-normal mt-1 max-w-max overflow-hidden text-ellipsis whitespace-nowrap">
                        {title}
                    </p>
                    <div className="mt-1 flex">
                        <Stars rating ={rating}/>
                        <p className="text-sm">{ratingCount} rating</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
