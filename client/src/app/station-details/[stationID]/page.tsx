import fs from "fs";
import path from "path";
import Projects from "@/components/Projects";

interface Station {
    stationName?: string;
    businessDomain?: string;
    stationCity?: string;
    totalRequirement?: number;
    totalMaleRequirement?: number;
    totalFemalRequirement?: number;
    noOfProject?: number;
    psTypeName?: string;
    problemBankId?: string;
    stationId?: string;
}

interface StationResponse {
    problemBankGridLines?: Station[];
}

const StationDetails = async ({ params }: { params: { stationID: string } }) => {
    try {
        const { stationID } = params;
        
        // Validate stationID
        if (!stationID || typeof stationID !== 'string') {
            throw new Error("Invalid station ID");
        }

        // Extract semester from stationID (assuming format: sem1-xxx or sem2-xxx)
        const semesterPath = stationID.startsWith('sem1-') ? 'sem1' : 'data';
        const actualStationID = stationID.replace(/^(sem1-|sem2-)/, '');

        const filePath = path.join(process.cwd(), "..", semesterPath, "stationData", actualStationID);
        
        // Check if directory exists
        if (!fs.existsSync(filePath)) {
            throw new Error("Station not found");
        }

        const files = await fs.promises.readdir(filePath);

        let station: Station = {};
        let problemBank: Record<string, any> = {};
        let projects: Record<string, any> = {};

        await Promise.all(
            files.map(async (file) => {
                try {
                    const content = await fs.promises.readFile(path.join(filePath, file), "utf-8");
                    const parsedContent = JSON.parse(content);

                    if (file === "station.json") {
                        // Type assertion and safer access
                        const stationData = parsedContent as StationResponse;
                        station = stationData?.problemBankGridLines?.[0] ?? {};
                    } else if (file === "problem-bank.json") {
                        problemBank = parsedContent ?? {};
                    } else if (file.endsWith('.json')) {  // Only process JSON files
                        projects[file] = parsedContent;
                    }
                } catch (error) {
                    console.error(`Error processing file ${file}:`, error);
                    // Continue with other files even if one fails
                }
            })
        );

        // Validate essential data
        if (!station || Object.keys(station).length === 0) {
            throw new Error("Station data not found or invalid");
        }

        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="container mx-auto px-4 py-8">
                    {/* Station Header */}
                    <div className="mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-2">
                            {station.stationName || 'Station Name Not Available'}
                        </h1>
                        <p className="text-center text-blue-400">
                            {station.businessDomain || 'Business Domain Not Available'}
                        </p>
                    </div>

                    {/* Station Overview Card */}
                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 mb-10 border border-gray-700">
                        <h2 className="text-xl font-semibold mb-6 text-blue-400">Station Overview</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <StatsCard
                                title="Location"
                                value={station.stationCity || 'Not Specified'}
                                icon="🌍"
                            />
                            <StatsCard
                                title="Total Positions"
                                value={station.totalRequirement ?? 0}
                                icon="👥"
                            />
                            <StatsCard
                                title="Male Positions"
                                value={station.totalMaleRequirement ?? 0}
                                icon="👨"
                            />
                            <StatsCard
                                title="Female Positions"
                                value={station.totalFemalRequirement ?? 0}
                                icon="👩"
                            />
                            <StatsCard
                                title="Projects"
                                value={station.noOfProject ?? 0}
                                icon="📋"
                            />
                            <StatsCard
                                title="PS Type"
                                value={station.psTypeName || 'Not Specified'}
                                icon="📑"
                            />
                            <StatsCard
                                title="Problem Bank ID"
                                value={station.problemBankId || 'Not Available'}
                                icon="🏦"
                            />
                            <StatsCard
                                title="Station ID"
                                value={station.stationId || 'Not Available'}
                                icon="🔢"
                            />
                        </div>
                    </div>

                    {/* Projects Section */}
                    <Projects projects={projects} />
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error in StationDetails:", error);
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                <div className="text-center text-white">
                    <h1 className="text-2xl font-bold mb-4">Error Loading Station Details</h1>
                    <p className="text-gray-400">
                        {error instanceof Error ? error.message : 'Please try again later'}
                    </p>
                </div>
            </div>
        );
    }
};

const StatsCard = ({ 
    title, 
    value, 
    icon 
}: { 
    title: string; 
    value: string | number; 
    icon: string;
}) => (
    <div className="bg-white/5 rounded-xl p-3 sm:p-4 flex items-center space-x-3 sm:space-x-4">
        <span className="text-xl sm:text-2xl">{icon}</span>
        <div>
            <p className="text-gray-400 text-xs sm:text-sm">{title}</p>
            <p className="text-white font-semibold text-sm sm:text-base">{value}</p>
        </div>
    </div>
);

export default StationDetails;
