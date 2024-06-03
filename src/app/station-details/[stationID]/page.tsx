import fs from "fs";
import path from "path";

import skills from '@/data/catergories/skill.json'
import acadDomains from '@/data/catergories/academicdomain.json'
import acadSubDomains from "@/data/catergories/academicsubdomainbyid.json";

import elective1 from '@/data/catergories/elective1.json'


import MarkdownRenderer from "@/components/markdown";

// Define the server component
const StationDetails = async ({ params }: any) => {
    const { stationID } = params;
    const filePath = path.join(process.cwd(), "src", "data", "stationData", stationID);
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
        <div className="flex min-h-screen w-full justify-between flex-wrap flex-row p-12">
            <div className="flex w-[48%] my-4 flex-col p-4 gap-2 border rounded-xl">
                <div className="w-full flex text-2xl font-bold items-center justify-center">{station.stationName}</div>
                <div className="w-full flex items-center justify-between text-lg px-20">
                    <div>stationCity</div>
                    <div>{station.stationCity}</div>
                </div>
                <div className="w-full flex items-center justify-between text-lg px-20">
                    <div>businessDomain</div>
                    <div>{station.businessDomain}</div>
                </div>
                <div className="w-full flex items-center justify-between text-lg px-20">
                    <div>stationId</div>
                    <div>{station.stationId}</div>
                </div>
                <div className="w-full flex items-center justify-between text-lg px-20">
                    <div>totalMaleRequirement</div>
                    <div>{station.totalMaleRequirement}</div>
                </div>
                <div className="w-full flex items-center justify-between text-lg px-20">
                    <div>totalFemalRequirement</div>
                    <div>{station.totalFemalRequirement}</div>
                </div>
                <div className="w-full flex items-center justify-between text-lg px-20">
                    <div>totalRequirement</div>
                    <div>{station.totalRequirement}</div>
                </div>
                <div className="w-full flex items-center justify-between text-lg px-20">
                    <div>noOfProject</div>
                    <div>{station.noOfProject}</div>
                </div>
                <div className="w-full flex items-center justify-between text-lg px-20">
                    <div>psTypeName</div>
                    <div>{station.psTypeName}</div>
                </div>
                <div className="w-full flex items-center justify-between text-lg px-20">
                    <div>problemBankId</div>
                    <div>{station.problemBankId}</div>
                </div>
            </div>
            {Object.values(projects).map((item: any, key) => {
                return (
                    <div key={item.projectId} className="flex w-[48%] my-4 flex-col p-4 border rounded-xl gap-2">
                        <div className="w-full flex text-2xl font-bold items-center justify-center">Project - {item.title}</div>
                        <div className="w-full flex items-start justify-between flex-wrap text-lg px-10 gap-2 my-4">
                            <strong>description-</strong>
                            <div>
                                <MarkdownRenderer>{item.description}</MarkdownRenderer>
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-between text-lg px-10">
                            <div>CGPA </div>
                            <div>
                                {item.projectDiscipline[0].cgpamin} - {item.projectDiscipline[0].cgpamax}
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-between text-lg px-10">
                            <div>disciplineCodes</div>
                            <div>{item.projectDiscipline[0].disciplineCodes}</div>
                        </div>

                        <div className="w-full flex items-center justify-between text-lg px-10">
                            <div>degree</div>
                            <div>{item.projectDiscipline[0].degree}</div>
                        </div>

                        <div className="w-full flex items-center justify-between text-lg px-10">
                            <div>ugstipend</div>
                            <div>
                                {item.projectFacility[0].ugstipend} {item.projectFacility[0].currency}
                            </div>
                        </div>

                        <div className="w-full flex items-center justify-between text-lg px-10">
                            <div>pgstipend</div>
                            <div>
                                {item.projectFacility[0].pgstipend} {item.projectFacility[0].currency}
                            </div>
                        </div>
                        <div className="w-full flex flex-col my-4 justify-between text-lg px-10">
                            <strong>projectElective - </strong>
                            <div className="flex flex-col gap-1">
                                {item.projectElective.map((skl: any) => {
                                    const _skl = elective1.find((fd: any) => fd.electiveId === skl.electiveId);
                                    return <div key={skl.projectElectiveId}>{`${_skl?.elective1} - ${skl.grade}`}</div>;
                                })}
                            </div>
                        </div>
                        <div className="w-full flex flex-wrap items-center justify-between text-lg px-10">
                            <strong>academicDomain - </strong>
                            <div>
                                {item.projectAcademicDomain.map((skl: any) => {
                                    const _skl = acadDomains.find((fd: any) => fd.academicDomainId === skl.academicDomainId);
                                    return `${_skl?.name} ,`;
                                })}
                            </div>
                        </div>
                        <div className="w-full flex flex-wrap items-center justify-between text-lg px-10">
                            <strong>academicSubDomain - </strong>
                            <div>
                                {item.projectAcademicSubDomain.map((skl: any) => {
                                    const _skl = acadSubDomains.find((fd: any) => fd.academicSubDomainId === skl.academicSubDomainId);
                                    return `${_skl?.name} ,`;
                                })}
                            </div>
                        </div>
                        <div className="w-full flex flex-wrap items-center justify-between text-lg px-10 my-4">
                            <strong>projectSkill -</strong>
                            <div>
                                {item.projectSkill.map((skl: any) => {
                                    const _skl = skills.find((fd: any) => fd.skillId === skl.skillId);
                                    return `${_skl?.skillName} ,`;
                                })}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default StationDetails;
