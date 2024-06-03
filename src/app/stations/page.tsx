"use client";

import { useState } from "react";
import StationData from "@/data/stations.json";
import cn from 'classnames'

export default function StationsPage() {
    const [bangalore, setBangalore] = useState(true);
    const [mumbai, setMumbai] = useState(true);
    const [pune, setPune] = useState(true);
    const [hyd, setHyd] = useState(true);
    const [gurgaon, setGurgaon] = useState(true);
    const [delhi, setDelhi] = useState(true);
    const [other, setOther] = useState(true);

    const [gt0, setGT0] = useState(true);
    const [gt6, setGT6] = useState(true);
    const [gt65, setGT65] = useState(true);
    const [gt7, setGT7] = useState(true);
    const [gt75, setGT75] = useState(true);
    const [gt8, setGT8] = useState(true);
    const [gt85, setGT85] = useState(true);
    const [gt9, setGT9] = useState(true);

    const [addOther, setAddOther] = useState(false);
    return (
        <main className="flex min-h-screen flex-col items-center gap-4 p-24">
            <div className="w-full flex items-center justify-center text-2xl font-bold">PS Stations List</div>
            <div className="w-full flex items-center justify-center my-6 gap-4">
                <button
                    onClick={() => {
                        setBangalore(!bangalore);
                    }}
                    type="button"
                    className={!bangalore ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    Bengluru
                </button>
                <button
                    onClick={() => {
                        setHyd(!hyd);
                    }}
                    type="button"
                    className={!hyd ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    Hyderabad
                </button>
                <button
                    onClick={() => {
                        setMumbai(!mumbai);
                    }}
                    type="button"
                    className={!mumbai ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    Mumbai
                </button>
                <button
                    onClick={() => {
                        setPune(!pune);
                    }}
                    type="button"
                    className={!pune ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    Pune
                </button>
                <button
                    onClick={() => {
                        setGurgaon(!gurgaon);
                    }}
                    type="button"
                    className={!gurgaon ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    Gurgaon
                </button>
                <button
                    onClick={() => {
                        setDelhi(!delhi);
                    }}
                    type="button"
                    className={!delhi ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    Delhi
                </button>
                <button
                    onClick={() => {
                        setOther(!other);
                    }}
                    type="button"
                    className={!other ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    others
                </button>
            </div>

            <div className="w-full flex items-center justify-center my-6 gap-4">
                <button
                    onClick={() => {
                        setAddOther(!addOther);
                    }}
                    type="button"
                    className={!addOther ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    Add Other Domains
                </button>
            </div>

            <div className="w-full flex items-center justify-center my-6 gap-4">
                <button
                    onClick={() => {
                        setGT0(!gt0);
                    }}
                    type="button"
                    className={!gt0 ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-5 rounded-md"}>
                    0-6 CGPA
                </button>
                <button
                    onClick={() => {
                        setGT6(!gt6);
                    }}
                    type="button"
                    className={!gt6 ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-5 rounded-md"}>
                    6-6.5 CGPA
                </button>
                <button
                    onClick={() => {
                        setGT65(!gt65);
                    }}
                    type="button"
                    className={!gt65 ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-5 rounded-md"}>
                    6.5-7 CGPA
                </button>
                <button
                    onClick={() => {
                        setGT7(!gt7);
                    }}
                    type="button"
                    className={!gt7 ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-5 rounded-md"}>
                    7-7.5 CGPA
                </button>
                <button
                    onClick={() => {
                        setGT75(!gt75);
                    }}
                    type="button"
                    className={!gt75 ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-5 rounded-md"}>
                    7.5-8 CGPA
                </button>
                <button
                    onClick={() => {
                        setGT8(!gt8);
                    }}
                    type="button"
                    className={!gt8 ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-5 rounded-md"}>
                    8-8.5 CGPA
                </button>
                <button
                    onClick={() => {
                        setGT85(!gt85);
                    }}
                    type="button"
                    className={!gt85 ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-5 rounded-md"}>
                    8.5-9 CGPA
                </button>
                <button
                    onClick={() => {
                        setGT9(!gt9);
                    }}
                    type="button"
                    className={!gt9 ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-5 rounded-md"}>
                    9+ CGPA
                </button>
            </div>

            <div className="w-full grid grid-cols-7 py-2 rounded-xl items-center justify-center bg-gray-700 text-white text-lg">
                <div className="flex items-center justify-center">StationID</div>
                <div className="flex col-span-2 items-center justify-center">Station Name</div>
                <div className="flex items-center justify-center">Location</div>
                <div className="flex items-center justify-center">Domain</div>
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
                    if (!addOther ? item.stationDomain === "CSIS/IT" || item.stationDomain === "Finance and Mgmt" || item.stationDomain === "Others" || item.stationDomain === "Health Care" : true)
                        if (
                            (pune && item.city === "Pune") ||
                            (hyd && item.city === "Hyderabad") ||
                            (mumbai && item.city === "Mumbai") ||
                            (gurgaon && item.city === "Gurgaon") ||
                            (bangalore && (item.city === "Bangalore" || item.city === "Bengaluru")) ||
                            (delhi && item.city === "Delhi") ||
                            (other &&
                                item.city !== "Pune" &&
                                item.city !== "Hyderabad" &&
                                item.city !== "Mumbai" &&
                                item.city !== "Gurgaon" &&
                                item.city !== "Bangalore" &&
                                item.city !== "Delhi" &&
                                item.city !== "Bengaluru")
                        )
                            return (
                                <div key={item.stationId} className="w-full grid grid-cols-7 py-2 items-center justify-center border-b text-white text-lg">
                                    <div className="flex items-center justify-center">{item.stationId}</div>
                                    <div className="col-span-2 text-center flex items-center justify-center">{item.stationName}</div>
                                    <div className="flex items-center justify-center">{item.city}</div>
                                    <div className="flex items-center justify-center">{item.stationDomain}</div>
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
