import { ExclamationTriangleIcon, ClockIcon } from '@heroicons/react/24/solid';
import Link from "next/link";
import { TimeConfig } from '../config-time';

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Header Section */}
                    <div className="text-center space-y-4 mb-12">
                        <h1 className="text-6xl font-bold flex items-center justify-center gap-3 flex-wrap">
                            <div className="flex">
                                <span className="text-emerald-500 hover:scale-105 transition-transform">P</span>
                                <span className="text-blue-500 hover:scale-105 transition-transform">S</span>
                                <span className="text-purple-500 hover:scale-105 transition-transform">M</span>
                                <span className="text-cyan-500 hover:scale-105 transition-transform">S</span>
                            </div>
                            <span className="text-white">Scraped</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            View all the hidden relevant information about stations from API data
                        </p>
                    </div>

                    {/* Main Action Button */}
                    <Link 
                        href="/stations" 
                        className="block w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-2xl transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 group"
                    >
                        <div className="px-6 py-8 text-center">
                            <h2 className="text-2xl font-semibold text-white mb-2">
                                View Station Data
                            </h2>
                            <p className="text-blue-200/80">
                                Access comprehensive information about all available stations
                            </p>
                        </div>
                    </Link>

                    {/* Info Cards Grid */}
                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Last Updated Card */}
                        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-500/20 rounded-xl">
                                    <ClockIcon className="h-6 w-6 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-white">Last Updated</h3>
                                    <p className="text-gray-400">
                                        {TimeConfig.sem2LastUpdated}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Warning Card */}
                        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-red-800/50 hover:border-red-500/50 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-red-500/20 rounded-xl flex-shrink-0">
                                    <ExclamationTriangleIcon className="h-6 w-6 text-red-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-red-400 mb-1">
                                        Important Disclaimer
                                    </h3>
                                    <p className="text-gray-300 text-sm">
                                        This data are not the exact constraints for allotment and may be subject to change in reality
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
