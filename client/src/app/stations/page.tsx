"use client";

import { useState, useEffect, useMemo } from "react";
import StationData from "../../../../data/stations.json";
import cn from "classnames";
import Dropdown from "@/components/dropdown";
import RangeSlider from "@/components/rangeSlider";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

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
        <main className="flex min-h-screen flex-col items-center gap-4 px-2 sm:px-8 py-6 sm:py-12">
            <div className="w-full flex flex-col border border-gray-600 py-2 sm:py-3 rounded-md gap-1 items-center justify-center">
                <div className="w-full flex gap-1 items-center justify-center text-6xl font-black">
                    <div className="text-green-500">P</div>
                    <div className="text-orange-500">S</div>
                    <div className="text-violet-500">M</div>
                    <div className="text-green-500">S</div>
                </div>
                Thank GOD Kodam
            </div>
            <div className="w-full flex items-center justify-center text-2xl font-bold">PS Stations List</div>

            {/* Filters Section */}
            <div className="w-full max-w-7xl mx-auto">
                {/* Dropdowns Section */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    {/* Location Filter */}
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-lg font-medium">Location Filter</label>
                        <Dropdown 
                            className="w-full" 
                            options={locationOptions} 
                            selected={location} 
                            setSelected={setLocation} 
                            selectMultiple 
                        />
                    </div>

                    {/* Domain Filter */}
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-lg font-medium">Domain Filter</label>
                        <Dropdown 
                            className="w-full" 
                            options={branchOptions} 
                            selected={branch} 
                            setSelected={setBranch} 
                            selectMultiple 
                        />
                    </div>
                </div>

                {/* Range Sliders Section */}
                <div className="flex flex-wrap gap-4 mb-6">
                    {/* CGPA Range */}
                    <div className="flex-1 min-w-[300px] flex flex-col gap-2 p-4 bg-gray-800 rounded-lg">
                        <label className="text-lg font-medium">CGPA Range</label>
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
                    <div className="flex-1 min-w-[300px] flex flex-col gap-2 p-4 bg-gray-800 rounded-lg">
                        <label className="text-lg font-medium">Requirements Range</label>
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
                    <div className="flex-1 min-w-[300px] flex flex-col gap-2 p-4 bg-gray-800 rounded-lg">
                        <label className="text-lg font-medium">Stipend Range (in K)</label>
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
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                    <input 
                        type="text" 
                        placeholder="Search stations or domains..." 
                        className="w-full sm:flex-1 py-2 px-4 rounded-lg bg-gray-900 border-2 border-blue-600 focus:outline-none focus:border-blue-400" 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                    />
                    <div className="flex items-center gap-2">
                        <span className="text-lg">Sort:</span>
                        <button 
                            onClick={() => setSortFunc(true)} 
                            className={cn(
                                "px-4 py-2 rounded-lg transition-colors",
                                sortFunc ? "bg-blue-500" : "bg-gray-600 hover:bg-gray-500"
                            )}
                        >
                            A-Z
                        </button>
                        <button 
                            onClick={() => setSortFunc(false)} 
                            className={cn(
                                "px-4 py-2 rounded-lg transition-colors",
                                !sortFunc ? "bg-blue-500" : "bg-gray-600 hover:bg-gray-500"
                            )}
                        >
                            Stipend
                        </button>
                    </div>
                </div>
            </div>

            {/* Table/Card View */}
            <div className="w-full max-w-7xl mx-auto">
                {/* Desktop Table - hidden on mobile */}
                <div className="hidden sm:block overflow-hidden bg-gray-900 rounded-xl shadow-xl">
                    {/* Table Header */}
                    <div className="grid grid-cols-10 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                        <div className="flex items-center justify-center p-4 font-semibold">
                            <span>StationID</span>
                        </div>
                        <div className="col-span-3 flex items-center justify-center p-4 font-semibold">
                            <span>Station Name</span>
                        </div>
                        <div className="flex items-center justify-center p-4 font-semibold">
                            <span>Location</span>
                        </div>
                        <div className="flex items-center justify-center p-4 font-semibold">
                            <span>Domain</span>
                        </div>
                        <div className="flex items-center justify-center p-4 font-semibold">
                            <span>Stipend</span>
                        </div>
                        <div className="flex items-center justify-center p-4 font-semibold">
                            <span>Requirmnt</span>
                        </div>
                        <div className="flex items-center justify-center p-4 font-semibold">
                            <span>MinCGPA</span>
                        </div>
                        <div className="flex items-center justify-center p-4 font-semibold">
                            <span>Details</span>
                        </div>
                    </div>

                    {/* Table Body */}
                    {filteredAndSortedStations.map((item: any, index: number) => (
                        <div 
                            key={item.stationId} 
                            className={cn(
                                "grid grid-cols-10 hover:bg-gray-800 transition-colors",
                                index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-850'
                            )}
                        >
                            <div className="flex items-center justify-center p-4 border-b border-gray-800">
                                <span className="text-gray-400">{item.stationId}</span>
                            </div>
                            <div className="col-span-3 flex p-4 border-b border-gray-800">
                                <span className="font-medium text-white">{item.stationName}</span>
                            </div>
                            <div className="flex items-center justify-center p-4 border-b border-gray-800">
                                <span className="text-gray-300 text-center">{item.city}</span>
                            </div>
                            <div className="flex items-center justify-center p-4 border-b border-gray-800">
                                <span className="text-gray-300 text-center">{item.stationDomain}</span>
                            </div>
                            <div className="flex items-center justify-center p-4 border-b border-gray-800">
                                <span className="text-green-400 font-medium">
                                    ₹{item.ugstipend.toString().match(/.{1,3}(?=(.{3})*$)/g).join(',')}
                                </span>
                            </div>
                            <div className="flex items-center justify-center p-4 border-b border-gray-800">
                                <span className="text-blue-400">{item.requirements}</span>
                            </div>
                            <div className="flex items-center justify-center p-4 border-b border-gray-800">
                                <span className="text-yellow-400">{item.minCgpa}</span>
                            </div>
                            <div className="flex items-center justify-center p-4 border-b border-gray-800">
                                <a 
                                    href={`/station-details/${item.stationId}`}
                                    className="p-2 hover:bg-blue-600 text-blue-500 hover:text-white rounded-lg transition-all duration-200 group"
                                    title="View Details"
                                >
                                    <ArrowTopRightOnSquareIcon className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile Cards View - show only on mobile */}
                <div className="sm:hidden space-y-4">
                    {filteredAndSortedStations.map((item: any) => (
                        <div 
                            key={item.stationId} 
                            className="bg-gray-800 rounded-lg shadow-lg p-4"
                        >
                            <div className="flex justify-between mb-3 gap-2">
                                <h3 className="text-lg font-semibold text-white">{item.stationName}</h3>
                                <span className="text-sm bg-gray-700 px-2 py-1 rounded text-gray-300 whitespace-nowrap h-fit">
                                    #{item.stationId}
                                </span>
                            </div>

                            <div className="space-y-2">
                                {/* Location and Domain - Fixed alignment */}
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <span className="text-gray-400 text-sm block mb-1">Location</span>
                                        <p className="text-white font-medium">{item.city}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 text-sm block mb-1">Domain</span>
                                        <p className="text-white font-medium">{item.stationDomain}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-4 gap-2">
                                    <div className="col-span-2">
                                        <span className="text-gray-400 text-sm">Stipend</span>
                                        <p className="text-green-400 font-medium">
                                            ₹{item.ugstipend.toString().match(/.{1,3}(?=(.{3})*$)/g).join(',')}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 text-sm">Reqs</span>
                                        <p className="text-blue-400">{item.requirements}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 text-sm">MinCGPA</span>
                                        <p className="text-yellow-400">{item.minCgpa}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-end">
                                <a 
                                    href={`/station-details/${item.stationId}`}
                                    className="p-2 hover:bg-blue-600 text-blue-500 hover:text-white rounded-lg transition-all duration-200 group"
                                    title="View Details"
                                >
                                    <ArrowTopRightOnSquareIcon className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
