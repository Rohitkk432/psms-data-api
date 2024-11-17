import fs from "fs";
import path from "path";

import skills from "../../../../../data/catergories/skill.json";
import acadDomains from "../../../../../data/catergories/academicdomain.json";
import acadSubDomains from "../../../../../data/catergories/academicsubdomainbyid.json";

import elective1 from "../../../../../data/catergories/elective1.json";

import MarkdownRenderer from "@/components/markdown";

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
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
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

                {/* Projects Section - Enhanced */}
                <div className="space-y-8">
                    {Object.values(projects).map((item: any, key) => (
                        <div key={item.projectId} 
                             className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 transition-all hover:border-blue-500/50">
                            {/* Project Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-white">
                                    Project {key + 1}
                                </h2>
                                <span className="px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                                    ID: {item.projectId}
                                </span>
                            </div>

                            {/* Project Title */}
                            <h3 className="text-xl text-blue-400 font-semibold mb-4">{item.title}</h3>

                            {/* Description */}
                            <div className="bg-black/20 rounded-xl p-4 mb-6">
                                <MarkdownRenderer>
                                    {item.description
                                        .replaceAll("color: rgb(0, 0, 0);", "color: rgb(255, 255, 255);")
                                        .replaceAll("color: black", "color: rgb(255, 255, 255);")
                                        .replaceAll("background-color: rgb(255, 255, 255)", "background-color: transparent")}
                                </MarkdownRenderer>
                            </div>

                            {/* Enhanced Requirements Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                                <RequirementCard
                                    label="CGPA Required"
                                    value={`${item.projectDiscipline[0].cgpamin} - ${item.projectDiscipline[0].cgpamax}`}
                                />
                                <RequirementCard
                                    label="Stipend (UG)"
                                    value={`${item.projectFacility[0].ugstipend} ${item.projectFacility[0].currency}`}
                                />
                                <RequirementCard
                                    label="Stipend (PG)"
                                    value={`${item.projectFacility[0].pgstipend} ${item.projectFacility[0].currency}`}
                                />
                                <RequirementCard
                                    label="Total Requirement"
                                    value={item.projectDiscipline[0].totalRequirement}
                                />
                                <RequirementCard
                                    label="Male Requirement"
                                    value={item.projectDiscipline[0].maleRequirement}
                                />
                                <RequirementCard
                                    label="Female Requirement"
                                    value={item.projectDiscipline[0].femaleRequirement}
                                />
                                <RequirementCard
                                    label="Fresh Requirement"
                                    value={item.projectDiscipline[0].freshRequirement}
                                />
                                <RequirementCard
                                    label="Degree"
                                    value={item.projectDiscipline[0].degree}
                                />
                            </div>

                            {/* Skills and Requirements - Enhanced */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <DetailSection
                                    title="Required Skills"
                                    items={item.projectSkill.map((skl: any) => {
                                        const _skl = skills.find((fd: any) => fd.skillId === skl.skillId);
                                        return _skl?.skillName;
                                    })}
                                    bgColor="bg-purple-500/20"
                                    textColor="text-purple-400"
                                />
                                <DetailSection
                                    title="Academic Domains"
                                    items={item.projectAcademicDomain.map((skl: any) => {
                                        const _skl = acadDomains.find((fd: any) => fd.academicDomainId === skl.academicDomainId);
                                        return _skl?.name;
                                    })}
                                    bgColor="bg-green-500/20"
                                    textColor="text-green-400"
                                />
                                <DetailSection
                                    title="Academic Sub-Domains"
                                    items={item.projectAcademicSubDomain.map((skl: any) => {
                                        const _skl = acadSubDomains.find((fd: any) => fd.academicSubDomainId === skl.academicSubDomainId);
                                        return _skl?.name;
                                    })}
                                    bgColor="bg-blue-500/20"
                                    textColor="text-blue-400"
                                />
                                <DetailSection
                                    title="Project Electives"
                                    items={item.projectElective.map((skl: any) => {
                                        const _skl = elective1.find((fd: any) => fd.electiveId === skl.electiveId);
                                        return `${_skl?.elective1} (Grade: ${skl.grade})`;
                                    })}
                                    bgColor="bg-amber-500/20"
                                    textColor="text-amber-400"
                                />
                                <DetailSection
                                    title="Discipline Codes"
                                    items={[item.projectDiscipline[0].disciplineCodes]}
                                    bgColor="bg-rose-500/20"
                                    textColor="text-rose-400"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Helper Components
const StatsCard = ({ title, value, icon }: { title: string; value: string | number; icon: string }) => (
    <div className="bg-white/5 rounded-xl p-4 flex items-center space-x-4">
        <span className="text-2xl">{icon}</span>
        <div>
            <p className="text-gray-400 text-sm">{title}</p>
            <p className="text-white font-semibold">{value}</p>
        </div>
    </div>
);

const RequirementCard = ({ label, value }: { label: string; value: string }) => (
    <div className="bg-white/5 rounded-xl p-4">
        <p className="text-gray-400 text-sm mb-1">{label}</p>
        <p className="text-white font-semibold">{value}</p>
    </div>
);

const DetailSection = ({ 
    title, 
    items, 
    bgColor, 
    textColor 
}: { 
    title: string; 
    items: (string | undefined)[]; 
    bgColor: string;
    textColor: string;
}) => (
    <div className="bg-white/5 rounded-xl p-4">
        <h3 className="font-semibold mb-3 text-white">{title}</h3>
        <div className="flex flex-wrap gap-2">
            {items.map((item, index) => (
                item && (
                    <span 
                        key={index} 
                        className={`${bgColor} ${textColor} px-3 py-1 rounded-full text-sm font-medium`}
                    >
                        {item}
                    </span>
                )
            ))}
        </div>
    </div>
);

export default StationDetails;
