"use client";

import { useState, useEffect, useMemo } from "react";
import StationData from "../../../../data/stations.json";
import cn from "classnames";

export default function StationsPage() {
    //location filters
    const initLocationFilter = {
        bangalore: 1,
        mumbai: 1,
        pune: 1,
        hyd: 1,
        gurgaon: 1,
        delhi: 1,
        other: 1,
    };
    const [locationFil, setLocationFil] = useState(initLocationFilter);

    const handleLocFilter = (e: any) => {
        const _newData = { ...locationFil, [e.target.name]: e.target.value == 1 ? 0 : 1 };
        setLocationFil(_newData);
        localStorage.setItem("locationFil", JSON.stringify(_newData));
    };

    //branch filters
    const initBranchFilter = {
        csis: 1,
        addOther: 0,
        Others: 0,
        finance: 0,
    };
    const [branchFil, setBranchFil] = useState(initBranchFilter);
    const handleBranchFilter = (e: any) => {
        const _newData = { ...branchFil, [e.target.name]: e.target.value == 1 ? 0 : 1 };
        setBranchFil(_newData);
        localStorage.setItem("branchFil", JSON.stringify(_newData));
    };

    //cgpa filters
    const initCgpaFilter = {
        gt0: 1,
        gt6: 1,
        gt65: 1,
        gt7: 1,
        gt75: 1,
        gt8: 1,
        gt85: 1,
        gt9: 1,
    };
    const [cgpaFil, setCgpaFil] = useState(initCgpaFilter);
    const handleCgpaFilter = (e: any) => {
        const _newData = { ...cgpaFil, [e.target.name]: e.target.value == 1 ? 0 : 1 };
        setCgpaFil(_newData);
        localStorage.setItem("cgpaFil", JSON.stringify(_newData));
    };

    //requirement filters
    const initReqFilter = {
        req0: 1,
        req0to10: 1,
        req10to20: 1,
        req20to30: 1,
        req30plus: 1,
    };
    const [reqFil, setReqFil] = useState(initReqFilter);
    const handleReqFilter = (e: any) => {
        const _newData = { ...reqFil, [e.target.name]: e.target.value == 1 ? 0 : 1 };
        setReqFil(_newData);
        localStorage.setItem("reqFil", JSON.stringify(_newData));
    };

    const [search,setSearch] = useState("");

    //back fill filters from localStorage
    useEffect(() => {
        setLocationFil(JSON.parse(localStorage.getItem("locationFil") || JSON.stringify(initLocationFilter)));
        setBranchFil(JSON.parse(localStorage.getItem("branchFil") || JSON.stringify(initBranchFilter)));
        setCgpaFil(JSON.parse(localStorage.getItem("cgpaFil") || JSON.stringify(initCgpaFilter)));
        setReqFil(JSON.parse(localStorage.getItem("reqFil") || JSON.stringify(initReqFilter)));
    }, []);

    const searchResult = useMemo(() => {
        if (!search) return StationData;

        return StationData.filter((_station) => {
            return _station.stationName.toLowerCase().includes(search.toLowerCase());
        });
    }, [search]);


    return (
        <main className="flex min-h-screen flex-col items-center gap-4 px-8 py-12">
            <div className="w-full flex flex-col border border-gray-600 py-3 rounded-md gap-1 items-center justify-center">
                <div className="w-full flex gap-1 items-center justify-center text-6xl font-black">
                    <div className="text-green-500">P</div>
                    <div className="text-orange-500">S</div>
                    <div className="text-violet-500">M</div>
                    <div className="text-green-500">S</div>
                </div>
                Thank GOD Kodam
            </div>
            <div className="w-full flex items-center justify-center text-2xl font-bold">PS Stations List</div>
            {/* location filter btns */}
            <div className="w-full flex items-center justify-center my-3 gap-4">
                <div className="text-lg">Location Filters - </div>
                <button
                    onClick={handleLocFilter}
                    name="bangalore"
                    value={locationFil.bangalore}
                    type="button"
                    className={!locationFil.bangalore ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    Bengluru
                </button>
                <button onClick={handleLocFilter} name="hyd" value={locationFil.hyd} type="button" className={!locationFil.hyd ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    Hyderabad
                </button>
                <button
                    onClick={handleLocFilter}
                    name="mumbai"
                    value={locationFil.mumbai}
                    type="button"
                    className={!locationFil.mumbai ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    Mumbai
                </button>
                <button onClick={handleLocFilter} name="pune" value={locationFil.pune} type="button" className={!locationFil.pune ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    Pune
                </button>
                <button
                    onClick={handleLocFilter}
                    name="gurgaon"
                    value={locationFil.gurgaon}
                    type="button"
                    className={!locationFil.gurgaon ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    Gurgaon
                </button>
                <button onClick={handleLocFilter} name="delhi" value={locationFil.delhi} type="button" className={!locationFil.delhi ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    Delhi
                </button>
                <button onClick={handleLocFilter} name="other" value={locationFil.other} type="button" className={!locationFil.other ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    others
                </button>
            </div>

            {/* branch filter btns */}
            <div className="w-full flex items-center justify-center my-3 gap-4">
                <div className="text-lg">Branch Filters - </div>
                <button onClick={handleBranchFilter} name="csis" value={branchFil.csis} type="button" className={!branchFil.csis ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    CSIS/IT, HealthCare
                </button>
                <button
                    onClick={handleBranchFilter}
                    name="finance"
                    value={branchFil.finance}
                    type="button"
                    className={!branchFil.finance ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    Finance and Mgmt
                </button>
                <button onClick={handleBranchFilter} name="Others" value={branchFil.Others} type="button" className={!branchFil.Others ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    Others
                </button>
                <button
                    onClick={handleBranchFilter}
                    name="addOther"
                    value={branchFil.addOther}
                    type="button"
                    className={!branchFil.addOther ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    Add Other Domains
                </button>
            </div>
            {/* req filter btns */}
            <div className="w-full flex items-center justify-center my-3 gap-4">
                <div className="text-lg">Requirements Filters - </div>
                <button onClick={handleReqFilter} name="req0" value={reqFil.req0} type="button" className={!reqFil.req0 ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    Req == 0
                </button>
                <button onClick={handleReqFilter} name="req0to10" value={reqFil.req0to10} type="button" className={!reqFil.req0to10 ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    {`0 < req <= 10`}
                </button>
                <button onClick={handleReqFilter} name="req10to20" value={reqFil.req10to20} type="button" className={!reqFil.req10to20 ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    {`10 < req <= 20`}
                </button>
                <button onClick={handleReqFilter} name="req20to30" value={reqFil.req20to30} type="button" className={!reqFil.req20to30 ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    {`20 < req <= 30`}
                </button>
                <button onClick={handleReqFilter} name="req30plus" value={reqFil.req30plus} type="button" className={!reqFil.req30plus ? "bg-gray-600 px-3 rounded-md" : "bg-blue-500 px-3 rounded-md"}>
                    {`30 < req`}
                </button>
            </div>
            {/* cgpa filter btns */}
            <div className="w-full flex items-center justify-center my-3 gap-4">
                <div className="text-lg">CGPA Filters - </div>
                <button onClick={handleCgpaFilter} name="gt0" value={cgpaFil.gt0} type="button" className={!cgpaFil.gt0 ? "bg-gray-600 px-5 rounded-md" : "bg-blue-500 px-5 rounded-md"}>
                    0-6 CGPA
                </button>
                <button onClick={handleCgpaFilter} name="gt6" value={cgpaFil.gt6} type="button" className={!cgpaFil.gt6 ? "bg-gray-600 px-5 rounded-md" : "bg-blue-500 px-5 rounded-md"}>
                    6-6.5 CGPA
                </button>
                <button onClick={handleCgpaFilter} name="gt65" value={cgpaFil.gt65} type="button" className={!cgpaFil.gt65 ? "bg-gray-600 px-5 rounded-md" : "bg-blue-500 px-5 rounded-md"}>
                    6.5-7 CGPA
                </button>
                <button onClick={handleCgpaFilter} name="gt7" value={cgpaFil.gt7} type="button" className={!cgpaFil.gt7 ? "bg-gray-600 px-5 rounded-md" : "bg-blue-500 px-5 rounded-md"}>
                    7-7.5 CGPA
                </button>
                <button onClick={handleCgpaFilter} name="gt75" value={cgpaFil.gt75} type="button" className={!cgpaFil.gt75 ? "bg-gray-600 px-5 rounded-md" : "bg-blue-500 px-5 rounded-md"}>
                    7.5-8 CGPA
                </button>
                <button onClick={handleCgpaFilter} name="gt8" value={cgpaFil.gt8} type="button" className={!cgpaFil.gt8 ? "bg-gray-600 px-5 rounded-md" : "bg-blue-500 px-5 rounded-md"}>
                    8-8.5 CGPA
                </button>
                <button onClick={handleCgpaFilter} name="gt85" value={cgpaFil.gt85} type="button" className={!cgpaFil.gt85 ? "bg-gray-600 px-5 rounded-md" : "bg-blue-500 px-5 rounded-md"}>
                    8.5-9 CGPA
                </button>
                <button onClick={handleCgpaFilter} name="gt9" value={cgpaFil.gt9} type="button" className={!cgpaFil.gt9 ? "bg-gray-600 px-5 rounded-md" : "bg-blue-500 px-5 rounded-md"}>
                    9+ CGPA
                </button>
            </div>
            {/* searchBar */}
            <div className="w-full flex items-center justify-center my-3 gap-4">
                <input type="text" placeholder="Search" className="w-[30rem] py-2 rounded-full px-8 bg-gray-900 border-blue-600 border-2" value={search} onChange={(e) => setSearch(e.target.value)} />
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

            {searchResult.map((item: any) => {
                // put cgpa filters
                if (
                    (cgpaFil.gt6 && item.minCgpa >= 6 && item.minCgpa < 6.5) ||
                    (cgpaFil.gt65 && item.minCgpa >= 6.5 && item.minCgpa < 7) ||
                    (cgpaFil.gt7 && item.minCgpa >= 7 && item.minCgpa < 7.5) ||
                    (cgpaFil.gt75 && item.minCgpa >= 7.5 && item.minCgpa < 8) ||
                    (cgpaFil.gt8 && item.minCgpa >= 8 && item.minCgpa < 8.5) ||
                    (cgpaFil.gt85 && item.minCgpa >= 8.5 && item.minCgpa < 9) ||
                    (cgpaFil.gt9 && item.minCgpa >= 9) ||
                    (cgpaFil.gt0 && item.minCgpa >= 0 && item.minCgpa < 6)
                )
                    if (
                        (branchFil.csis && item.stationDomain === "CSIS/IT") ||
                        (branchFil.csis && item.stationDomain === "Health Care") ||
                        (branchFil.finance && item.stationDomain === "Finance and Mgmt") ||
                        (branchFil.Others && item.stationDomain === "Others") ||
                        (branchFil.addOther && item.stationDomain !== "CSIS/IT" && item.stationDomain !== "Health Care" && item.stationDomain !== "Finance and Mgmt" && item.stationDomain !== "Others")
                    )
                        if (
                            (reqFil.req0 && item.requirements === 0) ||
                            (reqFil.req0to10 && item.requirements > 0 && item.requirements <= 10) ||
                            (reqFil.req10to20 && item.requirements > 10 && item.requirements <= 20) ||
                            (reqFil.req20to30 && item.requirements > 20 && item.requirements <= 30) ||
                            (reqFil.req30plus && item.requirements > 30)
                        )
                            // put branch filters
                            if (
                                (locationFil.pune && item.city.includes("Pune")) ||
                                (locationFil.hyd && item.city.includes("Hyderabad")) ||
                                (locationFil.mumbai && item.city.includes("Mumbai")) ||
                                (locationFil.gurgaon && item.city.includes("Gurgaon")) ||
                                (locationFil.bangalore && (item.city.includes("Bangalore") || item.city.includes("Bengaluru"))) ||
                                (locationFil.delhi && item.city.includes("Delhi")) ||
                                (locationFil.other &&
                                    !item.city.includes("Pune") &&
                                    !item.city.includes("Hyderabad") &&
                                    !item.city.includes("Mumbai") &&
                                    !item.city.includes("Gurgaon") &&
                                    !item.city.includes("Bangalore") &&
                                    !item.city.includes("Delhi") &&
                                    !item.city.includes("Bengaluru"))
                            )
                                // put requirement filters
                                // put location filters
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
