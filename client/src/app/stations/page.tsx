"use client";

import { useState, useEffect, useMemo } from "react";
import StationData from "../../../../data/stations.json";
import cn from "classnames";
import Dropdown from "@/components/dropdown";
import RangeSlider from "@/components/rangeSlider";

const locationOptions = ["Bangalore", "Hyderabad", "Mumbai", "Pune", "Gurgaon", "Delhi", "Others"];
const branchOptions = ["Finance and Mgmt", "Electronics", "Chemical", "Others", "Infrastructure", "CSIS/IT", "Mechanical", "Health Care", "Others"];

export default function StationsPage() {
    const [location, setLocation] = useState<string[]>([]);
    const [branch, setBranch] = useState<string[]>([]);
    const [rangeCGPA, setRangeCGPA] = useState<[number, number]>([0, 10]);
    const [rangeStipend, setRangeStipend] = useState<[number, number]>([0, 200]);
    const [rangeReq, setRangeReq] = useState<[number, number]>([0, 100]);

    const [search, setSearch] = useState("");
    const [sortFunc, setSortFunc] = useState(true);

    const [isInitialized, setIsInitialized] = useState(false);

    const filteredAndSortedStations = useMemo(() => {
        let filtered: any[] = StationData;

        // Apply search filter
        if (search.trim()) {
            filtered = filtered.filter((station) => station.stationName.toLowerCase().includes(search.toLowerCase()) || station.stationDomain.toLowerCase().includes(search.toLowerCase()));
        }

        // Filter by location
        if (location.length > 0) {
            filtered = filtered.filter((station) => {
                const cityLower = station.city.toLowerCase();
                return location.some((loc) => {
                    if (loc === "Others") {
                        return !["bangalore", "bengaluru", "hyderabad", "mumbai", "pune", "gurgaon", "delhi"].some((city) => cityLower.includes(city.toLowerCase()));
                    }
                    // Special case for Bangalore/Bengaluru
                    if (loc.toLowerCase() === "bangalore") {
                        return cityLower.includes("bangalore") || cityLower.includes("bengaluru");
                    }
                    return cityLower.includes(loc.toLowerCase());
                });
            });
        }

        // Filter by branch/domain
        if (branch.length > 0) {
            filtered = filtered.filter((station) => {
                return branch.some((b) => {
                    if (b === "Others") {
                        return !["Finance and Mgmt", "Electronics", "Chemical", "Others", "Infrastructure", "CSIS/IT", "Mechanical", "Health Care"].includes(station.stationDomain);
                    }
                    return station.stationDomain === b;
                });
            });
        }

        // Filter by CGPA range
        filtered = filtered.filter((station) => station.minCgpa >= rangeCGPA[0] && station.minCgpa <= rangeCGPA[1]);

        // Filter by stipend range (converting K to actual values)
        filtered = filtered.filter((station) => {
            if (rangeStipend[1] >= 200) {
                // If max is 200K or more, only apply lower bound
                return station.ugstipend >= rangeStipend[0] * 1000;
            }
            // Otherwise apply both bounds
            return station.ugstipend >= rangeStipend[0] * 1000 && station.ugstipend <= rangeStipend[1] * 1000;
        });

        // Filter by requirements range
        filtered = filtered.filter((station) => {
            if (rangeReq[1] >= 100) {
                // If max is 100 or more, only apply lower bound
                return station.requirements >= rangeReq[0];
            }
            // Otherwise apply both bounds
            return station.requirements >= rangeReq[0] && station.requirements <= rangeReq[1];
        });

        // Apply sorting
        return sortFunc
            ? [...filtered].sort((a, b) => a.stationName.localeCompare(b.stationName)) // Alphabetically
            : [...filtered].sort((a, b) => b.ugstipend - a.ugstipend); // By stipend (high to low)
    }, [StationData, search, location, branch, rangeCGPA, rangeStipend, rangeReq, sortFunc]);

    useEffect(() => {
        const savedLocation = localStorage.getItem('psms-location');
        const savedBranch = localStorage.getItem('psms-branch');
        const savedCGPA = localStorage.getItem('psms-cgpa');
        const savedStipend = localStorage.getItem('psms-stipend');
        const savedReq = localStorage.getItem('psms-req');
        const savedSearch = localStorage.getItem('psms-search');
        const savedSort = localStorage.getItem('psms-sort');

        if (savedLocation) setLocation(JSON.parse(savedLocation));
        if (savedBranch) setBranch(JSON.parse(savedBranch));
        if (savedCGPA) setRangeCGPA(JSON.parse(savedCGPA));
        if (savedStipend) setRangeStipend(JSON.parse(savedStipend));
        if (savedReq) setRangeReq(JSON.parse(savedReq));
        if (savedSearch) setSearch(savedSearch);
        if (savedSort) setSortFunc(JSON.parse(savedSort));

        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (!isInitialized) return; // Skip saving during initial load

        localStorage.setItem('psms-location', JSON.stringify(location));
        localStorage.setItem('psms-branch', JSON.stringify(branch));
        localStorage.setItem('psms-cgpa', JSON.stringify(rangeCGPA));
        localStorage.setItem('psms-stipend', JSON.stringify(rangeStipend));
        localStorage.setItem('psms-req', JSON.stringify(rangeReq));
        localStorage.setItem('psms-search', search);
        localStorage.setItem('psms-sort', JSON.stringify(sortFunc));
    }, [isInitialized,location, branch, rangeCGPA, rangeStipend, rangeReq, search, sortFunc]);

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

            <div className="w-full flex items-center justify-center my-3 gap-4">
                <div className="text-lg">Location Filters - </div>
                <Dropdown className="w-[20rem]" options={locationOptions} selected={location} setSelected={setLocation} selectMultiple />
            </div>

            <div className="w-full flex items-center justify-center my-3 gap-4">
                <div className="text-lg">Domain Filters - </div>
                <Dropdown className="w-[20rem]" options={branchOptions} selected={branch} setSelected={setBranch} selectMultiple />
            </div>

            <div className="w-full flex items-center justify-center my-3 gap-4">
                <div className="text-lg">CGPA Filters - </div>
                <RangeSlider value={rangeCGPA} onChange={setRangeCGPA} min={0} max={10} step={0.5} />
            </div>

            <div className="w-full flex items-center justify-center my-3 gap-4">
                <div className="text-lg">Stipend Filters(in K) - </div>
                <RangeSlider value={rangeStipend} onChange={setRangeStipend} min={0} max={200} step={10} />
            </div>

            <div className="w-full flex items-center justify-center my-3 gap-4">
                <div className="text-lg">Requirements Filters - </div>
                <RangeSlider value={rangeReq} onChange={setRangeReq} min={0} max={100} step={10} />
            </div>

            {/* searchBar */}
            <div className="w-full flex flex-col items-center justify-center my-3 gap-8">
                <input type="text" placeholder="Search" className="w-[30rem] py-2 rounded-full px-8 bg-gray-900 border-blue-600 border-2" value={search} onChange={(e) => setSearch(e.target.value)} />
                <div className="flex items-center gap-3">
                    <div>Sort: </div>
                    <button onClick={() => setSortFunc(true)} type="button" className={!sortFunc ? "bg-gray-600 px-5 rounded-md" : "bg-blue-500 px-5 rounded-md"}>
                        Alphabetically
                    </button>
                    <button onClick={() => setSortFunc(false)} type="button" className={sortFunc ? "bg-gray-600 px-5 rounded-md" : "bg-blue-500 px-5 rounded-md"}>
                        Stipend
                    </button>
                </div>
            </div>

            <div className="w-full grid grid-cols-10 py-2 rounded-xl items-center justify-center bg-gray-700 text-white text-lg">
                <div className="flex items-center justify-center">StationID</div>
                <div className="flex col-span-3 items-center justify-center">Station Name</div>
                <div className="flex items-center justify-center">Location</div>
                <div className="flex items-center justify-center">Domain</div>
                <div className="flex items-center justify-center">Stipend</div>
                <div className="flex items-center justify-center">Requirmnt</div>
                <div className="flex items-center justify-center">MinCGPA</div>
                <div className="flex items-center justify-center">Details</div>
            </div>

            {filteredAndSortedStations.map((item: any) => {
                return (
                    <div key={item.stationId} className="w-full grid grid-cols-10 py-2 items-center justify-center border-b text-white text-lg">
                        <div className="flex items-center justify-center">{item.stationId}</div>
                        <div className="col-span-3 text-center flex items-center justify-center">{item.stationName}</div>
                        <div className="flex items-center justify-center">{item.city}</div>
                        <div className="flex items-center text-center justify-center">{item.stationDomain}</div>
                        <div className="flex items-center justify-center">{item.ugstipend.toString().match(/.{1,3}(?=(.{3})*$)/g).join(',')}</div>
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
