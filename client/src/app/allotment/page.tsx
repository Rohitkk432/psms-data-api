"use client";

import { useState } from "react";
import Link from "next/link";
import Dropdown from "@/components/dropdown";
import allotmentData from "../../../../data/allotments.json";
import cn from "classnames";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { TimeConfig } from "@/config-time";

export default function AllotmentPage() {
    const [email, setEmail] = useState("");
    const [searchType, setSearchType] = useState<"email" | "station">("email");
    const [selectedStation, setSelectedStation] = useState<any[]>([]);
    const [searchResult, setSearchResult] = useState<any>(null);
    const [notFound, setNotFound] = useState(false);
    const [isResult1Open, setIsResult1Open] = useState(false);
    const [isResult2Open, setIsResult2Open] = useState(false);

    // Get unique station names from allotment data
    const stationOptions = Array.from(
        new Set(
            Object.values(allotmentData as Record<string, any>)
                .map((allotment) => allotment.stationName)
                .filter(Boolean)
        )
    ).sort();

    const convertToEmail = (bitsId: string): string => {
        // Check if input is already an email
        if (bitsId.includes("@")) return bitsId;

        const match = bitsId.match(/^(20\d{2})[A-Z0-9]+(\d{4})([GHP])$/);
        if (match) {
            const [_, year, number, campus] = match;
            const campusDomain = {
                G: "goa",
                P: "pilani",
                H: "hyderabad",
            }[campus];
            return `f${year}${number}@${campusDomain}.bits-pilani.ac.in`;
        }
        return bitsId;
    };

    const handleSearch = () => {
        setNotFound(false);
        setSearchResult(null);

        if (searchType === "email") {
            const searchEmail = convertToEmail(email);
            const result = (allotmentData as Record<string, any>)[searchEmail];
            if (result) {
                // Include student ID and name from allotments
                const allotmentDetails =
                    result.allotments.length > 0
                        ? {
                              studentName: result.allotments[0].studentName,
                              campusId: result.allotments[0].campusId,
                              pstypeId: result.allotments[0].pstypeId,
                              semesterId: result.allotments[0].semesterId,
                              batchName: result.allotments[0].batchName,
                          }
                        : {}; // Default if no allotments
                setSearchResult({
                    ...result,
                    email: searchEmail,
                    details: allotmentDetails,
                });
            } else {
                setNotFound(true);
            }
        } else {
            const stationName = selectedStation[0];
            const results = Object.entries(allotmentData as Record<string, any>)
                .filter(([_, data]) => data.stationName === stationName)
                .reduce((acc, [email, data]) => {
                    const allotmentDetails =
                        data.allotments.length > 0
                            ? {
                                  studentName: data.allotments[0].studentName,
                                  campusId: data.allotments[0].campusId,
                                  pstypeId: data.allotments[0].pstypeId,
                                  semesterId: data.allotments[0].semesterId,
                                  batchName: data.allotments[0].batchName,
                              }
                            : {};

                    // Separate results into two arrays
                    if (data.allotments.length > 0) {
                        acc.result2.push({ email, details: allotmentDetails, ...data });
                    } else {
                        acc.result1.push({ email, details: allotmentDetails, ...data });
                    }
                    return acc;
                }, { result1: [] as { email: string; details: any; [key: string]: any }[], result2: [] as { email: string; details: any; [key: string]: any }[] }); // Initialize with empty arrays

            if (results.result1.length > 0 || results.result2.length > 0) {
                setSearchResult({
                    stationName: stationName,
                    result1: results.result1,
                    result2: results.result2,
                });
            } else {
                setNotFound(true);
            }
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
            {/* Navigation Menu */}
            <nav className="flex justify-center pt-4">
                <div className="flex gap-2">
                    <Link href="/stations" className="px-4 py-2 bg-black/20 text-gray-400 hover:text-blue-400 border border-gray-700 hover:border-blue-500 rounded-xl transition-colors">
                        Stations
                    </Link>
                    <Link href="/allotment" className="px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-500 rounded-xl transition-colors">
                        Allotment
                    </Link>
                </div>
            </nav>

            <div className="container mx-auto px-4 sm:px-2 lg:px-0 py-8">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-2">PS2 Allotment (24-25)</h1>
                    {/* Last Updated Timestamp for Semester 2 with similar UI to Stations Page */}
                    <div className="flex flex-col items-center mt-4 gap-2">
                        <div className="bg-black/20 border border-gray-700 rounded-xl px-4 py-2">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-sm text-gray-400">
                                    Last Updated: {TimeConfig.sem2LastUpdated}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Type Toggle */}
                <div className="max-w-2xl mx-auto mb-6">
                    <div className="flex justify-center gap-4">
                        <button
                            className={`px-4 py-2 rounded-xl transition-colors ${
                                searchType === "email" ? "bg-blue-500/20 text-blue-400 border border-blue-500" : "bg-black/20 text-gray-400 border border-gray-700"
                            }`}
                            onClick={() => {
                                setSearchType("email");
                                setSearchResult(null);
                                setNotFound(false);
                            }}>
                            Search by Email
                        </button>
                        <button
                            className={`px-4 py-2 rounded-xl transition-colors ${
                                searchType === "station" ? "bg-blue-500/20 text-blue-400 border border-blue-500" : "bg-black/20 text-gray-400 border border-gray-700"
                            }`}
                            onClick={() => {
                                setSearchType("station");
                                setSearchResult(null);
                                setNotFound(false);
                            }}>
                            Search by Station
                        </button>
                    </div>
                </div>

                {/* Search Section */}
                <div className="max-w-[80vw] mx-auto">
                    <div className="bg-white/5 rounded-2xl p-6 mb-10 border border-gray-700 z-[400]">
                        <div className="flex flex-col sm:flex-row gap-4 items-end">
                            {searchType === "email" ? (
                                <div className="flex flex-col gap-2 w-full">
                                <h2 className="text-xl font-semibold mb-4 text-white">Search Allotment by Email ID / BITS ID</h2>
                                <input
                                    type="email"
                                    placeholder="Enter your email ID / BITS ID"
                                    className="w-full py-2 px-4 rounded-xl bg-black/20 border border-gray-700 focus:border-blue-500 transition-colors text-white"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2 w-full">
                                <h2 className="text-xl font-semibold mb-4 text-white">Search Allotment by Selecting PS Station</h2>
                                <Dropdown
                                    options={stationOptions}
                                    selected={selectedStation}
                                    setSelected={setSelectedStation}
                                    selectMultiple={true}
                                    maximumSelect={1}
                                    selectPlaceholder="Select a station..."
                                    className="w-full"
                                    wrapOptions={true}
                                />
                                </div>
                            )}
                            <button onClick={handleSearch} className="px-6 py-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-xl transition-colors border border-blue-500 h-fit sm:w-fit w-full">
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Results Section */}
                    {notFound && <div className="text-center text-red-400">Not found in PS2 sem2</div>}

                    {searchResult && searchType === "email" && (
                        <>
                            <div className="flex justify-end mb-4">
                                <Link
                                    href={`/station-details/${searchResult.stationId}`}
                                    className="px-4 py-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-xl transition-colors border border-blue-500">
                                    View Station Details
                                </Link>
                            </div>
                            <div className="hidden sm:block bg-white/5 rounded-2xl p-6 border border-gray-700">
                                <h2 className="text-xl text-white mb-4">{searchResult.stationName}</h2>
                                <div
                                    className={cn("grid gap-4", {
                                        "grid-cols-6": Object.keys(searchResult.details).length === 0,
                                        "grid-cols-11": Object.keys(searchResult.details).length > 0,
                                    })}>
                                    <div className="text-left py-2 px-4 text-gray-400 font-semibold col-span-3">Email ID</div>
                                    {Object.keys(searchResult.details).length > 0 && (
                                    <>
                                        <div className="text-left py-2 px-4 text-gray-400   font-semibold col-span-3">Student Name</div>
                                        <div className="text-left py-2 px-4 text-gray-400   font-semibold col-span-2">ID</div>
                                    </> 
                                    )}
                                    <div className="text-left py-2 px-4 text-gray-400   font-semibold">Sem</div>
                                    <div className="text-left py-2 px-4 text-gray-400   font-semibold">PS</div>
                                    <div className="text-left py-2 px-4 text-gray-400 font-semibold">#PR</div>
                                </div>
                                <div
                                    className={cn("grid gap-4 mt-4", {
                                        "grid-cols-6": Object.keys(searchResult.details).length === 0,
                                        "grid-cols-11": Object.keys(searchResult.details).length > 0,
                                    })}>
                                    <div className="py-2 px-4 text-gray-400 border-t border-gray-700 col-span-3">{searchResult.email}</div>
                                    {Object.keys(searchResult.details).length > 0 && (
                                        <>
                                            <div className="py-2 px-4 border-t border-gray-700 col-span-3">{searchResult.details?.studentName}</div>
                                            <div className="py-2 px-4 border-t border-gray-700 col-span-2">{searchResult.details?.campusId}</div>
                                        </>
                                    )}
                                    {/* Semester ID Badge */}
                                    <div className="ml-3 flex items-center justify-center px-3 h-8 w-fit rounded-md text-sm font-medium bg-blue-500/20 text-blue-400 border border-blue-500">
                                        {searchResult.details?.semesterId || '1'}
                                    </div>
                                    {/* PS Type Badge */}
                                    <div className="ml-3 flex items-center justify-center px-3 h-8 w-fit rounded-md text-sm font-medium bg-purple-500/20 text-purple-400 border border-purple-500">
                                        {searchResult.details?.pstypeId === 1 ? "PS1" : "PS2"}
                                    </div>
                                    <div className="flex items-center justify-center px-3 h-8 w-fit rounded-md text-sm font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500">
                                        {searchResult.preferenceNoDisplay}
                                    </div>
                                </div>
                            </div>
                            {/* Mobile Cards View for Email Results */}
                            <div className="sm:hidden bg-white/5 rounded-2xl p-6 border border-gray-700">
                                <h2 className="text-xl text-white mb-4">{searchResult.stationName}</h2>
                                <div className="flex flex-col justify-between mb-4 gap-1">
                                    <span className="text-gray-400">Email ID:</span>
                                    <span className="text-white">{searchResult.email}</span>
                                </div>
                                <div className="flex flex-col justify-between mb-4 gap-1">
                                    <span className="text-gray-400">Student Name:</span>
                                    <span className="text-white">{searchResult.details?.studentName || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <span className="text-gray-400">Sem:</span>
                                    <span className="text-blue-400">{searchResult.details?.semesterId || '1'}</span>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <span className="text-gray-400">PS:</span>
                                    <span className="text-purple-400">{searchResult.details?.pstypeId === 1 ? "PS1" : "PS2"}</span>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <span className="text-gray-400">#PR:</span>
                                    <span className="text-emerald-400">{searchResult.preferenceNoDisplay}</span>
                                </div>
                            </div>
                        </>
                    )}

                    {searchResult && searchType === "station" && (
                        <>
                            <div className="flex justify-end mb-4">
                                <Link
                                    href={`/station-details/${searchResult.result2.length>0 ? searchResult.result2[0].stationId : searchResult.result1[0].stationId}`}
                                    className="px-4 py-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-xl transition-colors border border-blue-500">
                                    View Station Details
                                </Link>
                            </div>

                            {/* Collapsible Section for Result 1 */}
                            {searchResult.result1.length > 0 && (
                                <>
                                <div className="hidden sm:block bg-white/5 rounded-2xl p-6 border border-gray-700 mb-8">
                                    <h2 className="text-xl text-white mb-4">{searchResult.stationName} - Sem1</h2>
                                    <div
                                        className={cn("grid gap-4","grid-cols-6")}>
                                        <div className="text-left py-2 px-4 text-gray-400 font-semibold col-span-3">Email ID</div>
                                        <div className="text-left py-2 px-4 text-gray-400 font-semibold">Sem</div>
                                        <div className="text-left py-2 px-4 text-gray-400 font-semibold">PS</div>
                                        <div className="text-left py-2 px-4 text-gray-400 font-semibold">#PR</div>
                                    </div>
                                    {searchResult.result1.map((result: any, index: number) => (
                                        <div
                                            key={index}
                                            className={cn("grid gap-4 mt-4","grid-cols-6")}>
                                            <div className="py-2 px-4 text-gray-400 border-t border-gray-700 col-span-3">{result.email}</div>
                                            {/* Semester ID Badge */}
                                            <div className="ml-3 flex items-center justify-center px-3 h-8 w-fit rounded-md text-sm font-medium bg-blue-500/20 text-blue-400 border border-blue-500">
                                                {result.details?.semesterId || '1'}
                                            </div>
                                            {/* PS Type Badge */}
                                            <div className="ml-3 flex items-center justify-center px-3 h-8 w-fit rounded-md text-sm font-medium bg-purple-500/20 text-purple-400 border border-purple-500">
                                                {result.details?.pstypeId === 1 ? "PS1" : "PS2"}
                                            </div>
                                            <div className="flex items-center justify-center px-3 h-8 w-fit rounded-md text-sm font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500">
                                                {result.preferenceNoDisplay}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* Mobile Cards View for Result 1 */}
                                <div className="sm:hidden">
                                    <h2 className="text-xl text-white mb-4">{searchResult.stationName} - Sem1</h2>
                                    {searchResult.result1.map((result: any) => (
                                        <div key={result.email} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 gap-2 flex-col flex mb-4">
                                            <div className="flex flex-col justify-between gap-1">
                                                <span className="text-gray-400">Email ID:</span>
                                                <span className="text-white">{result.email}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Sem:</span>
                                                <span className="text-blue-400">{result.details?.semesterId || '1'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">PS:</span>
                                                <span className="text-purple-400">{result.details?.pstypeId === 1 ? "PS1" : "PS2"}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">#PR:</span>
                                                <span className="text-emerald-400">{result.preferenceNoDisplay}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                </>
                            )}

                            {searchResult.result2.length > 0 && (
                                <>                            
                                <div className="hidden sm:block bg-white/5 rounded-2xl p-6 border border-gray-700">
                                    <h2 className="text-xl text-white mb-4">{searchResult.stationName} - Sem2</h2>
                                    <div
                                        className={cn("grid gap-4","grid-cols-11")}>
                                        <div className="text-left py-2 px-4 text-gray-400 font-semibold col-span-3">Email ID</div>
                                        <div className="text-left py-2 px-4 text-gray-400 font-semibold col-span-3">Student Name</div>
                                        <div className="text-left py-2 px-4 text-gray-400 font-semibold col-span-2">ID</div>
                                        <div className="text-left py-2 px-4 text-gray-400 font-semibold">Sem</div>
                                        <div className="text-left py-2 px-4 text-gray-400 font-semibold">PS</div>
                                        <div className="text-left py-2 px-4 text-gray-400 font-semibold">#PR</div>
                                    </div>
                                    {searchResult.result2.map((result: any, index: number) => (
                                        <div
                                            key={index}
                                            className={cn("grid gap-4 mt-4","grid-cols-11")}>
                                            <div className="py-2 px-4 text-gray-400 border-t border-gray-700 col-span-3">{result.email}</div>
                                            <div className="py-2 px-4 border-t border-gray-700 col-span-3">{result.details?.studentName}</div>
                                            <div className="py-2 px-4 border-t border-gray-700 col-span-2">{result.details?.campusId}</div>
                                            {/* Semester ID Badge */}
                                            <div className="ml-3 flex items-center justify-center px-3 h-8 w-fit rounded-md text-sm font-medium bg-blue-500/20 text-blue-400 border border-blue-500">
                                                {result.details?.semesterId || '1'}
                                            </div>
                                            {/* PS Type Badge */}
                                            <div className="ml-3 flex items-center justify-center px-3 h-8 w-fit rounded-md text-sm font-medium bg-purple-500/20 text-purple-400 border border-purple-500">
                                                {result.details?.pstypeId === 1 ? "PS1" : "PS2"}
                                            </div>
                                            <div className="flex items-center justify-center px-3 h-8 w-fit rounded-md text-sm font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500">
                                                {result.preferenceNoDisplay}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* Mobile Cards View for Result 2 */}
                                <div className="sm:hidden">
                                    <h2 className="text-xl text-white mb-4">{searchResult.stationName} - Sem2</h2>
                                    {searchResult.result2.map((result: any) => (
                                        <div key={result.email} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 gap-2 flex-col flex mb-4">
                                            <div className="flex flex-col justify-between gap-1">
                                                <span className="text-gray-400">Email ID:</span>
                                                <span className="text-white">{result.email}</span>
                                            </div>
                                            <div className="flex flex-col justify-between gap-1">
                                                <span className="text-gray-400">Student Name:</span>
                                                <span className="text-white">{result.details?.studentName}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Sem:</span>
                                                <span className="text-blue-400">{result.details?.semesterId || '1'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">PS:</span>
                                                <span className="text-purple-400">{result.details?.pstypeId === 1 ? "PS1" : "PS2"}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">#PR:</span>
                                                <span className="text-emerald-400">{result.preferenceNoDisplay}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}
