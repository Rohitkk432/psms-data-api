"use client";

import { useState, useEffect } from "react";
import StationData from "@/data/stations.json";
import cn from "classnames";

export default function StationsPage() {
    const [bangalore, setBangalore] = useState(true);
    const [mumbai, setMumbai] = useState(true);
    const [pune, setPune] = useState(true);
    const [hyd, setHyd] = useState(true);
    const [gurgaon, setGurgaon] = useState(true);
    const [delhi, setDelhi] = useState(true);
    const [other, setOther] = useState(true);

    const [csis, setCsis] = useState(true);
    const [addOther, setAddOther] = useState(false);
    const [Others, setOthers] = useState(false);
    const [finance, setfinance] = useState(false);

    const [gt0, setGT0] = useState(true);
    const [gt6, setGT6] = useState(true);
    const [gt65, setGT65] = useState(true);
    const [gt7, setGT7] = useState(true);
    const [gt75, setGT75] = useState(true);
    const [gt8, setGT8] = useState(true);
    const [gt85, setGT85] = useState(true);
    const [gt9, setGT9] = useState(true);

    const [req0, setReq0] = useState(true);
    const [req0to10, setReq0to10] = useState(true);
    const [req10to20, setReq10to20] = useState(true);
    const [req20to30, setReq20to30] = useState(true);
    const [req30plus, setReq30plus] = useState(true);

    useEffect(() => {
        setBangalore(localStorage.getItem("bangalore") === "false" ? false : true);
        setMumbai(localStorage.getItem("mumbai") === "false" ? false : true);
        setPune(localStorage.getItem("pune") === "false" ? false : true);
        setHyd(localStorage.getItem("hyd") === "false" ? false : true);
        setGurgaon(localStorage.getItem("gurgaon") === "false" ? false : true);
        setDelhi(localStorage.getItem("delhi") === "false" ? false : true);
        setOther(localStorage.getItem("other") === "false" ? false : true);
        setCsis(localStorage.getItem("csis") === "false" ? false : true);
        setAddOther(localStorage.getItem("addOther") === "true" ? true : false);
        setOthers(localStorage.getItem("Others") === "true" ? true : false);
        setfinance(localStorage.getItem("finance") === "true" ? true : false);
        setGT0(localStorage.getItem("gt0") === "false" ? false : true);
        setGT6(localStorage.getItem("gt6") === "false" ? false : true);
        setGT65(localStorage.getItem("gt65") === "false" ? false : true);
        setGT7(localStorage.getItem("gt7") === "false" ? false : true);
        setGT75(localStorage.getItem("gt75") === "false" ? false : true);
        setGT8(localStorage.getItem("gt8") === "false" ? false : true);
        setGT85(localStorage.getItem("gt85") === "false" ? false : true);
        setGT9(localStorage.getItem("gt9") === "false" ? false : true);
        setReq0(localStorage.getItem("req0") === "false" ? false : true);
        setReq0to10(localStorage.getItem("req0to10") === "false" ? false : true);
        setReq10to20(localStorage.getItem("req10to20") === "false" ? false : true);
        setReq20to30(localStorage.getItem("req20to30") === "false" ? false : true);
        setReq30plus(localStorage.getItem("req30plus") === "false" ? false : true);
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center gap-4 px-8 py-12">
            <div className="w-full flex flex-col border border-gray-600 py-3 rounded-md gap-1 items-center justify-center">
                <div className="w-full flex gap-1 items-center justify-center text-6xl font-black">
                    <div className="text-green-500">P</div>
                    <div className="text-orange-500">S</div>
                    <div className="text-violet-500">M</div>
                    <div className="text-green-500">S</div>
                </div>
                BRRR
            </div>
            <div className="w-full flex items-center justify-center text-2xl font-bold">PS Stations List</div>
            <div className="w-full flex items-center justify-center my-3 gap-4">
                <div className="text-lg">Location Filters - </div>
                <button
                    onClick={() => {
                        localStorage.setItem("bangalore", !bangalore ? "true" : "false");
                        setBangalore(!bangalore);
                    }}
                    type="button"
                    className={!bangalore ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    Bengluru
                </button>
                <button
                    onClick={() => {
                        localStorage.setItem("hyd", !hyd ? "true" : "false");
                        setHyd(!hyd);
                    }}
                    type="button"
                    className={!hyd ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    Hyderabad
                </button>
                <button
                    onClick={() => {
                        localStorage.setItem("mumbai", !mumbai ? "true" : "false");
                        setMumbai(!mumbai);
                    }}
                    type="button"
                    className={!mumbai ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    Mumbai
                </button>
                <button
                    onClick={() => {
                        localStorage.setItem("pune", !pune ? "true" : "false");
                        setPune(!pune);
                    }}
                    type="button"
                    className={!pune ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    Pune
                </button>
                <button
                    onClick={() => {
                        localStorage.setItem("gurgaon", !gurgaon ? "true" : "false");
                        setGurgaon(!gurgaon);
                    }}
                    type="button"
                    className={!gurgaon ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    Gurgaon
                </button>
                <button
                    onClick={() => {
                        localStorage.setItem("delhi", !delhi ? "true" : "false");
                        setDelhi(!delhi);
                    }}
                    type="button"
                    className={!delhi ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    Delhi
                </button>
                <button
                    onClick={() => {
                        localStorage.setItem("other", !other ? "true" : "false");
                        setOther(!other);
                    }}
                    type="button"
                    className={!other ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    others
                </button>
            </div>

            <div className="w-full flex items-center justify-center my-3 gap-4">
                <div className="text-lg">Branch Filters - </div>
                <button
                    onClick={() => {
                        localStorage.setItem("csis", !csis ? "true" : "false");
                        setCsis(!csis);
                    }}
                    type="button"
                    className={!csis ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    CSIS/IT, HealthCare
                </button>
                <button
                    onClick={() => {
                        localStorage.setItem("finance", !finance ? "true" : "false");
                        setfinance(!finance);
                    }}
                    type="button"
                    className={!finance ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    Finance and Mgmt
                </button>
                <button
                    onClick={() => {
                        localStorage.setItem("Others", !Others ? "true" : "false");
                        setOthers(!Others);
                    }}
                    type="button"
                    className={!Others ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    Others
                </button>
                <button
                    onClick={() => {
                        localStorage.setItem("addOther", !addOther ? "true" : "false");
                        setAddOther(!addOther);
                    }}
                    type="button"
                    className={!addOther ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    Add Other Domains
                </button>
            </div>
            <div className="w-full flex items-center justify-center my-3 gap-4">
                <div className="text-lg">Requirements Filters - </div>
                <button
                    onClick={() => {
                        localStorage.setItem("req0", !req0 ? "true" : "false");
                        setReq0(!req0);
                    }}
                    type="button"
                    className={!req0 ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    Req == 0
                </button>
                <button
                    onClick={() => {
                        localStorage.setItem("req0to10", !req0to10 ? "true" : "false");
                        setReq0to10(!req0to10);
                    }}
                    type="button"
                    className={!req0to10 ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    {`0 < req <= 10`}
                </button>
                <button
                    onClick={() => {
                        localStorage.setItem("req10to20", !req10to20 ? "true" : "false");
                        setReq10to20(!req10to20);
                    }}
                    type="button"
                    className={!req10to20 ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    {`10 < req <= 20`}
                </button>
                <button
                    onClick={() => {
                        localStorage.setItem("req20to30", !req20to30 ? "true" : "false");
                        setReq20to30(!req20to30);
                    }}
                    type="button"
                    className={!req20to30 ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    {`20 < req <= 30`}
                </button>
                <button
                    onClick={() => {
                        localStorage.setItem("req30plus", !req30plus ? "true" : "false");
                        setReq30plus(!req30plus);
                    }}
                    type="button"
                    className={!req30plus ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    {`30 < req`}
                </button>
            </div>

            <div className="w-full flex items-center justify-center my-3 gap-4">
                <div className="text-lg">CGPA Filters - </div>
                <button
                    onClick={() => {
                        localStorage.setItem("gt0", !gt0 ? "true" : "false");
                        setGT0(!gt0);
                    }}
                    type="button"
                    className={!gt0 ? "bg-gray-600 px-5 rounded-md" : "bg-blue-500 px-5 rounded-md"}>
                    0-6 CGPA
                </button>
                <button
                    onClick={() => {
                        localStorage.setItem("gt6", !gt6 ? "true" : "false");
                        setGT6(!gt6);
                    }}
                    type="button"
                    className={!gt6 ? "bg-gray-600 px-5 rounded-md" : "bg-blue-500 px-5 rounded-md"}>
                    6-6.5 CGPA
                </button>
                <button
                    onClick={() => {
                        localStorage.setItem("gt65", !gt65 ? "true" : "false");
                        setGT65(!gt65);
                    }}
                    type="button"
                    className={!gt65 ? "bg-gray-600 px-5 rounded-md" : "bg-blue-500 px-5 rounded-md"}>
                    6.5-7 CGPA
                </button>
                <button
                    onClick={() => {
                        localStorage.setItem("gt7", !gt7 ? "true" : "false");
                        setGT7(!gt7);
                    }}
                    type="button"
                    className={!gt7 ? "bg-gray-600 px-5 rounded-md" : "bg-blue-500 px-5 rounded-md"}>
                    7-7.5 CGPA
                </button>
                <button
                    onClick={() => {
                        localStorage.setItem("gt75", !gt75 ? "true" : "false");
                        setGT75(!gt75);
                    }}
                    type="button"
                    className={!gt75 ? "bg-gray-600 px-5 rounded-md" : "bg-blue-500 px-5 rounded-md"}>
                    7.5-8 CGPA
                </button>
                <button
                    onClick={() => {
                        localStorage.setItem("gt8", !gt8 ? "true" : "false");
                        setGT8(!gt8);
                    }}
                    type="button"
                    className={!gt8 ? "bg-gray-600 px-5 rounded-md" : "bg-blue-500 px-5 rounded-md"}>
                    8-8.5 CGPA
                </button>
                <button
                    onClick={() => {
                        localStorage.setItem("gt85", !gt85 ? "true" : "false");
                        setGT85(!gt85);
                    }}
                    type="button"
                    className={!gt85 ? "bg-gray-600 px-5 rounded-md" : "bg-blue-500 px-5 rounded-md"}>
                    8.5-9 CGPA
                </button>
                <button
                    onClick={() => {
                        localStorage.setItem("gt9", !gt9 ? "true" : "false");
                        setGT9(!gt9);
                    }}
                    type="button"
                    className={!gt9 ? "bg-gray-600 px-5 rounded-md" : "bg-blue-500 px-5 rounded-md"}>
                    9+ CGPA
                </button>
            </div>

            <div className="w-full grid grid-cols-9 py-2 rounded-xl items-center justify-center bg-gray-700 text-white text-lg">
                <div className="flex items-center justify-center">StationID</div>
                <div className="flex col-span-3 items-center justify-center">Station Name</div>
                <div className="flex items-center justify-center">Location</div>
                <div className="flex items-center justify-center">Domain</div>
                <div className="flex items-center justify-center">Requirmnt</div>
                <div className="flex items-center justify-center">MinCGPA</div>
                <div className="flex items-center justify-center">Details</div>
            </div>

            {StationData.map((item: any) => {
                if (
                    (gt6 && item.minCgpa >= 6 && item.minCgpa < 6.5) ||
                    (gt65 && item.minCgpa >= 6.5 && item.minCgpa < 7) ||
                    (gt7 && item.minCgpa >= 7 && item.minCgpa < 7.5) ||
                    (gt75 && item.minCgpa >= 7.5 && item.minCgpa < 8) ||
                    (gt8 && item.minCgpa >= 8 && item.minCgpa < 8.5) ||
                    (gt85 && item.minCgpa >= 8.5 && item.minCgpa < 9) ||
                    (gt9 && item.minCgpa >= 9) ||
                    (gt0 && item.minCgpa >= 0 && item.minCgpa < 6)
                )
                    if (
                        !addOther
                            ? (csis && item.stationDomain === "CSIS/IT") ||
                              (csis && item.stationDomain === "Health Care") ||
                              (finance && item.stationDomain === "Finance and Mgmt") ||
                              (Others && item.stationDomain === "Others")
                            : true
                    )
                        if (
                            (req0 && item.requirements === 0) ||
                            (req0to10 && item.requirements > 0 && item.requirements <= 10) ||
                            (req10to20 && item.requirements > 10 && item.requirements <= 20) ||
                            (req20to30 && item.requirements > 20 && item.requirements <= 30) ||
                            (req30plus && item.requirements > 30)
                        )
                            if (
                                (pune && item.city.includes("Pune")) ||
                                (hyd && item.city.includes("Hyderabad")) ||
                                (mumbai && item.city.includes("Mumbai")) ||
                                (gurgaon && item.city.includes("Gurgaon")) ||
                                (bangalore && (item.city.includes("Bangalore") || item.city.includes("Bengaluru"))) ||
                                (delhi && item.city.includes("Delhi")) ||
                                (other &&
                                    !item.city.includes("Pune") &&
                                    !item.city.includes("Hyderabad") &&
                                    !item.city.includes("Mumbai") &&
                                    !item.city.includes("Gurgaon") &&
                                    !item.city.includes("Bangalore") &&
                                    !item.city.includes("Delhi") &&
                                    !item.city.includes("Bengaluru"))
                            )
                                return (
                                    <div key={item.stationId} className="w-full grid grid-cols-9 py-2 items-center justify-center border-b text-white text-lg">
                                        <div className="flex items-center justify-center">{item.stationId}</div>
                                        <div className="col-span-3 text-center flex items-center justify-center">{item.stationName}</div>
                                        <div className="flex items-center justify-center">{item.city}</div>
                                        <div className="flex items-center text-center justify-center">{item.stationDomain}</div>
                                        <div className="flex items-center justify-center">{item.requirements}</div>
                                        <div className="flex items-center justify-center">{item.minCgpa}</div>
                                        <a href={`/station-details/${item.stationId}`} className="flex items-center rounded-xl bg-blue-500 justify-center">
                                            Details
                                        </a>
                                    </div>
                                );
            })}
        </main>
    );
}
