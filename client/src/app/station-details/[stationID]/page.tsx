import fs from "fs";
import path from "path";
import Projects from "@/components/Projects";

// Define the server component
const StationDetails = async ({ params }: any) => {
    const { stationID } = params;
    const filePath = path.join(process.cwd(), "..", "data", "stationData", stationID);
    const files = await fs.promises.readdir(filePath);

    let station: any = {};
    let problemBank: any = {};
    let projects: any = {};
    const fileContents = await Promise.all(
        files.map(async (file) => {
            const content = await fs.promises.readFile(path.join(filePath, file), "utf-8");
            if (file === "station.json") {
                station = JSON.parse(content).problemBankGridLines[0];
            } else if (file === "problem-bank.json") {
                problemBank = JSON.parse(content);
            } else {
                projects[file] = JSON.parse(content);
            }
            return { file, content };
        })
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="container mx-auto px-4 py-8">
                {/* Station Header */}
                <div className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-2">
                        {station.stationName}
                    </h1>
                    <p className="text-center text-blue-400">{station.businessDomain}</p>
                </div>

                {/* Station Overview Card - Enhanced */}
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 mb-10 border border-gray-700">
                    <h2 className="text-xl font-semibold mb-6 text-blue-400">Station Overview</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <StatsCard
                            title="Location"
                            value={station.stationCity}
                            icon="🌍"
                        />
                        <StatsCard
                            title="Total Positions"
                            value={station.totalRequirement}
                            icon="👥"
                        />
                        <StatsCard
                            title="Male Positions"
                            value={station.totalMaleRequirement}
                            icon="👨"
                        />
                        <StatsCard
                            title="Female Positions"
                            value={station.totalFemalRequirement}
                            icon="👩"
                        />
                        <StatsCard
                            title="Projects"
                            value={station.noOfProject}
                            icon="📋"
                        />
                        <StatsCard
                            title="PS Type"
                            value={station.psTypeName}
                            icon="📑"
                        />
                        <StatsCard
                            title="Problem Bank ID"
                            value={station.problemBankId}
                            icon="🏦"
                        />
                        <StatsCard
                            title="Station ID"
                            value={station.stationId}
                            icon="🔢"
                        />
                    </div>
                </div>

                {/* Projects Section - Now using Projects component */}
                <Projects projects={projects} />
            </div>
        </div>
    );
};

// Helper Components
const StatsCard = ({ title, value, icon }: { title: string; value: string | number; icon: string }) => (
    <div className="bg-white/5 rounded-xl p-3 sm:p-4 flex items-center space-x-3 sm:space-x-4">
        <span className="text-xl sm:text-2xl">{icon}</span>
        <div>
            <p className="text-gray-400 text-xs sm:text-sm">{title}</p>
            <p className="text-white font-semibold text-sm sm:text-base">{value}</p>
        </div>
    </div>
);

export default StationDetails;
