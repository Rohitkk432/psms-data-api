"use client";

import { useState, useEffect, useMemo } from "react";
import StationData from "../../../../data/stations.json";
import Sem1StationData from "../../../../sem1/stations.json";
import cn from "classnames";
import Dropdown from "@/components/dropdown";
import RangeSlider from "@/components/rangeSlider";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import {TimeConfig} from "../../config-time"

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

    const [semester, setSemester] = useState<1 | 2>(2);

    const filteredAndSortedStations = useMemo(() => {
        let filtered: any[] = semester === 1 ? Sem1StationData : StationData;

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
    }, [StationData, Sem1StationData, semester, search, location, branch, rangeCGPA, rangeStipend, rangeReq, sortFunc]);

    useEffect(() => {
        const savedLocation = localStorage.getItem('psms-location');
        const savedBranch = localStorage.getItem('psms-branch');
        const savedCGPA = localStorage.getItem('psms-cgpa');
        const savedStipend = localStorage.getItem('psms-stipend');
        const savedReq = localStorage.getItem('psms-req');
        const savedSearch = localStorage.getItem('psms-search');
        const savedSort = localStorage.getItem('psms-sort');
        const savedSemester = localStorage.getItem('psms-semester');

        if (savedLocation) setLocation(JSON.parse(savedLocation));
        if (savedBranch) setBranch(JSON.parse(savedBranch));
        if (savedCGPA) setRangeCGPA(JSON.parse(savedCGPA));
        if (savedStipend) setRangeStipend(JSON.parse(savedStipend));
        if (savedReq) setRangeReq(JSON.parse(savedReq));
        if (savedSearch) setSearch(savedSearch);
        if (savedSort) setSortFunc(JSON.parse(savedSort));
        if (savedSemester) setSemester(JSON.parse(savedSemester));

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
        localStorage.setItem('psms-semester', JSON.stringify(semester));
    }, [isInitialized,location, branch, rangeCGPA, rangeStipend, rangeReq, search, sortFunc, semester]);

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="container mx-auto px-4 sm:px-2 lg:px-0 py-8">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-2">
                        PS Stations List
                    </h1>
                    <p className="text-center text-blue-400">Find and filter available stations</p>
                    
                    {/* Semester Toggle with Last Updated Time */}
                    <div className="flex flex-col items-center mt-4 gap-2">
                        <div className="flex justify-center gap-2">
                            <button 
                                onClick={() => setSemester(1)} 
                                className={cn(
                                    "px-4 py-2 rounded-xl transition-colors",
                                    semester === 1 ? "bg-blue-500/20 text-blue-400 border border-blue-500" : "bg-black/20 text-gray-400 border border-gray-700 hover:border-gray-600"
                                )}
                            >
                                Semester 1
                            </button>
                            <button 
                                onClick={() => setSemester(2)} 
                                className={cn(
                                    "px-4 py-2 rounded-xl transition-colors",
                                    semester === 2 ? "bg-blue-500/20 text-blue-400 border border-blue-500" : "bg-black/20 text-gray-400 border border-gray-700 hover:border-gray-600"
                                )}
                            >
                                Semester 2
                            </button>
                        </div>
                        <div className="bg-black/20 border border-gray-700 rounded-xl px-4 py-2 mt-2">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-sm text-gray-400">
                                    Last Updated: {semester === 1 ? TimeConfig.sem1LastUpdated : TimeConfig.sem2LastUpdated}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters Section - Enhanced UI */}
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 mb-10 border border-gray-700">
                    <h2 className="text-xl font-semibold mb-6 text-blue-400">Filter Stations</h2>
                    
                    {/* Dropdowns Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Location Filter */}
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-400">Location Filter</label>
                            <Dropdown 
                                className="w-full bg-black/20 border border-gray-700" 
                                options={locationOptions} 
                                selected={location} 
                                setSelected={setLocation} 
                                selectMultiple 
                            />
                        </div>

                        {/* Domain Filter */}
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-400">Domain Filter</label>
                            <Dropdown 
                                className="w-full bg-black/20 border border-gray-700" 
                                options={branchOptions} 
                                selected={branch} 
                                setSelected={setBranch} 
                                selectMultiple 
                            />
                        </div>
                    </div>

                    {/* Range Sliders Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {/* CGPA Range */}
                        <div className="flex flex-col gap-2 p-4 bg-black/20 rounded-xl border border-gray-700">
                            <label className="text-gray-400">CGPA Range</label>
                            <RangeSlider 
                                value={rangeCGPA} 
                                onChange={setRangeCGPA} 
                                min={0} 
                                max={10} 
                                step={0.5} 
                                className="!w-full"
                            />
                            <div className="flex justify-between text-sm text-gray-400">
                                <span>Min: {rangeCGPA[0]}</span>
                                <span>Max: {rangeCGPA[1]}</span>
                            </div>
                        </div>

                        {/* Requirements Range */}
                        <div className="flex flex-col gap-2 p-4 bg-black/20 rounded-xl border border-gray-700">
                            <label className="text-gray-400">Requirements Range</label>
                            <RangeSlider 
                                value={rangeReq} 
                                onChange={setRangeReq} 
                                min={0} 
                                max={100} 
                                step={10} 
                                className="!w-full"
                            />
                            <div className="flex justify-between text-sm text-gray-400">
                                <span>Min: {rangeReq[0]}</span>
                                <span>Max: {rangeReq[1]}+</span>
                            </div>
                        </div>

                        {/* Stipend Range */}
                        <div className="flex flex-col gap-2 p-4 bg-black/20 rounded-xl border border-gray-700">
                            <label className="text-gray-400">Stipend Range (in K)</label>
                            <RangeSlider 
                                value={rangeStipend} 
                                onChange={setRangeStipend} 
                                min={0} 
                                max={200} 
                                step={10} 
                                className="!w-full"
                            />
                            <div className="flex justify-between text-sm text-gray-400">
                                <span>₹{rangeStipend[0]}K</span>
                                <span>₹{rangeStipend[1]}K+</span>
                            </div>
                        </div>
                    </div>

                    {/* Search and Sort Section */}
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <input 
                            type="text" 
                            placeholder="Search stations or domains..." 
                            className="w-full sm:flex-1 py-2 px-4 rounded-xl bg-black/20 border border-gray-700 focus:border-blue-500 transition-colors" 
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)} 
                        />
                        <div className="flex items-center gap-2">
                            <span className="text-gray-400">Sort:</span>
                            <button 
                                onClick={() => setSortFunc(true)} 
                                className={cn(
                                    "px-4 py-2 rounded-xl transition-colors",
                                    sortFunc ? "bg-blue-500/20 text-blue-400 border border-blue-500" : "bg-black/20 text-gray-400 border border-gray-700 hover:border-gray-600"
                                )}
                            >
                                A-Z
                            </button>
                            <button 
                                onClick={() => setSortFunc(false)} 
                                className={cn(
                                    "px-4 py-2 rounded-xl transition-colors",
                                    !sortFunc ? "bg-blue-500/20 text-blue-400 border border-blue-500" : "bg-black/20 text-gray-400 border border-gray-700 hover:border-gray-600"
                                )}
                            >
                                Stipend
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table/Card View */}
            <div className="container mx-auto px-4 sm:px-2 lg:px-0">
                {/* Desktop Table - hidden on mobile */}
                <div className="hidden sm:block overflow-hidden bg-white/5 backdrop-blur-lg rounded-2xl border border-gray-700 shadow-xl">
                    {/* Table Header */}
                    <div className="grid grid-cols-10 bg-black/20">
                        <div className="flex items-center justify-center p-4 font-semibold text-blue-400">
                            <span>StationID</span>
                        </div>
                        <div className="col-span-3 flex items-center justify-center p-4 font-semibold text-blue-400">
                            <span>Station Name</span>
                        </div>
                        <div className="flex items-center justify-center p-4 font-semibold text-blue-400">
                            <span>Location</span>
                        </div>
                        <div className="flex items-center justify-center p-4 font-semibold text-blue-400">
                            <span>Domain</span>
                        </div>
                        <div className="flex items-center justify-center p-4 font-semibold text-blue-400">
                            <span>Stipend</span>
                        </div>
                        <div className="flex items-center justify-center p-4 font-semibold text-blue-400">
                            <span>Requirmnt</span>
                        </div>
                        <div className="flex items-center justify-center p-4 font-semibold text-blue-400">
                            <span>MinCGPA</span>
                        </div>
                        <div className="flex items-center justify-center p-4 font-semibold text-blue-400">
                            <span>Details</span>
                        </div>
                    </div>

                    {/* Table Body */}
                    {filteredAndSortedStations.map((item: any, index: number) => (
                        <div 
                            key={item.stationId} 
                            className="grid grid-cols-10 hover:bg-white/5 transition-colors border-t border-gray-700/50"
                        >
                            <div className="flex items-center justify-center p-4">
                                <span className="text-gray-400">#{item.stationId}</span>
                            </div>
                            <div className="col-span-3 flex p-4">
                                <span className="font-medium text-white">{item.stationName}</span>
                            </div>
                            <div className="flex items-center justify-center p-4">
                                <span className="text-gray-300 text-center">{item.city}</span>
                            </div>
                            <div className="flex items-center justify-center p-4">
                                <span className="text-gray-300 text-center">{item.stationDomain}</span>
                            </div>
                            <div className="flex items-center justify-center p-4">
                                <span className="text-green-400 font-medium">
                                    ₹{item.ugstipend.toString().match(/.{1,3}(?=(.{3})*$)/g).join(',')}
                                </span>
                            </div>
                            <div className="flex items-center justify-center p-4">
                                <span className="text-blue-400">{item.requirements}</span>
                            </div>
                            <div className="flex items-center justify-center p-4">
                                <span className="text-yellow-400">{item.minCgpa}</span>
                            </div>
                            <div className="flex items-center justify-center p-4">
                                <a 
                                    href={`/station-details/${item.stationId}`}
                                    className="p-2 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 rounded-lg transition-all duration-200"
                                    title="View Details"
                                >
                                    <ArrowTopRightOnSquareIcon className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile Cards View */}
                <div className="sm:hidden space-y-4">
                    {filteredAndSortedStations.map((item: any) => (
                        <div 
                            key={item.stationId} 
                            className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all"
                        >
                            <div className="flex justify-between mb-4">
                                <h3 className="text-xl font-semibold text-white">{item.stationName}</h3>
                                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                                    #{item.stationId}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="bg-black/20 rounded-xl p-3">
                                    <span className="text-gray-400 text-sm block mb-1">Location</span>
                                    <p className="text-white font-medium">{item.city}</p>
                                </div>
                                <div className="bg-black/20 rounded-xl p-3">
                                    <span className="text-gray-400 text-sm block mb-1">Domain</span>
                                    <p className="text-white font-medium">{item.stationDomain}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <div className="bg-black/20 rounded-xl p-3">
                                    <span className="text-gray-400 text-sm block mb-1">Stipend</span>
                                    <p className="text-green-400 font-medium">
                                        ₹{item.ugstipend.toString().match(/.{1,3}(?=(.{3})*$)/g).join(',')}
                                    </p>
                                </div>
                                <div className="bg-black/20 rounded-xl p-3">
                                    <span className="text-gray-400 text-sm block mb-1">Reqs</span>
                                    <p className="text-blue-400 font-medium">{item.requirements}</p>
                                </div>
                                <div className="bg-black/20 rounded-xl p-3">
                                    <span className="text-gray-400 text-sm block mb-1">CGPA</span>
                                    <p className="text-amber-400 font-medium">{item.minCgpa}</p>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <a 
                                    href={`/station-details/${item.stationId}`}
                                    className="px-4 py-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-lg transition-all flex items-center gap-2"
                                >
                                    View Details
                                    <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
