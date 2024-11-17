'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import MarkdownRenderer from "@/components/markdown";

import skills from "../../../data/catergories/skill.json";
import acadDomains from "../../../data/catergories/academicdomain.json";
import acadSubDomains from "../../../data/catergories/academicsubdomainbyid.json";
import elective1 from "../../../data/catergories/elective1.json";

interface ProjectProps {
    projects: any;
}

export const Projects = ({ projects }: ProjectProps) => {
    const [expandedProjects, setExpandedProjects] = useState<{ [key: string]: boolean }>({});

    const toggleProject = (projectId: string) => {
        setExpandedProjects(prev => ({
            ...prev,
            [projectId]: !prev[projectId]
        }));
    };

    return (
        <div className="space-y-8">
            {Object.values(projects).map((item: any, key: number) => (
                <div key={item.projectId} 
                     className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 transition-all hover:border-blue-500/50">
                    {/* Project Header - Always Visible */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-bold text-white">
                                Project {key + 1}
                            </h2>
                            <span className="px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                                ID: {item.projectId}
                            </span>
                        </div>
                    </div>

                    {/* Project Title - Always Visible */}
                    <h3 className="text-xl text-blue-400 font-semibold mb-4">{item.title}</h3>

                    {/* Enhanced Collapsible Toggle Button */}
                    <div 
                        className="flex items-center justify-between cursor-pointer hover:bg-white/5 rounded-lg p-2 transition-colors mb-4"
                        onClick={() => toggleProject(item.projectId)}
                    >
                        <div className="flex items-center gap-2">
                            {expandedProjects[item.projectId] ? (
                                <ChevronUpIcon className="w-5 h-5 text-blue-400" />
                            ) : (
                                <ChevronDownIcon className="w-5 h-5 text-blue-400" />
                            )}
                            <span className="text-gray-400 text-sm font-medium">
                                {expandedProjects[item.projectId] ? 'Hide Project Details' : 'View Project Details'}
                            </span>
                        </div>
                        <div className="flex-grow mx-4 border-t border-gray-700/50"></div>
                    </div>

                    {/* Collapsible Content */}
                    {expandedProjects[item.projectId] && (
                        <div className="space-y-6 animate-fadeIn">
                            {/* Description */}
                            <div className="bg-black/20 rounded-xl p-4 mb-6">
                                <MarkdownRenderer>
                                    {item.description
                                        .replaceAll("color: rgb(0, 0, 0);", "color: rgb(255, 255, 255);")
                                        .replaceAll("color: black", "color: rgb(255, 255, 255);")
                                        .replaceAll("background-color: rgb(255, 255, 255)", "background-color: transparent")}
                                </MarkdownRenderer>
                            </div>

                            {/* Requirements Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
                                <RequirementCard
                                    label="CGPA Required"
                                    value={`${item.projectDiscipline[0].cgpamin} - ${item.projectDiscipline[0].cgpamax}`}
                                    className="col-span-1"
                                />
                                <RequirementCard
                                    label="Degree"
                                    value={item.projectDiscipline[0].degree}
                                    className="col-span-1"
                                />
                                <RequirementCard
                                    label="Stipend (UG)"
                                    value={`${item.projectFacility[0].ugstipend} ${item.projectFacility[0].currency}`}
                                    className="col-span-1"
                                />
                                <RequirementCard
                                    label="Stipend (PG)"
                                    value={`${item.projectFacility[0].pgstipend} ${item.projectFacility[0].currency}`}
                                    className="col-span-1"
                                />
                                <RequirementCard
                                    label="Male Requirement"
                                    value={item.projectDiscipline[0].maleRequirement}
                                    className="col-span-1"
                                />
                                <RequirementCard
                                    label="Female Requirement"
                                    value={item.projectDiscipline[0].femaleRequirement}
                                    className="col-span-1"
                                />
                                <RequirementCard
                                    label="Fresh Requirement"
                                    value={item.projectDiscipline[0].freshRequirement}
                                    className="col-span-1"
                                />
                                <RequirementCard
                                    label="Total Requirement"
                                    value={item.projectDiscipline[0].totalRequirement}
                                    className="col-span-1"
                                />
                            </div>

                            {/* Skills and Requirements Grid */}
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

                            {/* Collapse Button at Bottom */}
                            <div 
                                className="flex items-center justify-center mt-6 cursor-pointer"
                                onClick={() => toggleProject(item.projectId)}
                            >
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                                    <ChevronUpIcon className="w-5 h-5 text-blue-400" />
                                    <span className="text-gray-400 text-sm font-medium">Collapse Details</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

// Helper Components
const RequirementCard = ({ 
    label, 
    value, 
    className = "" 
}: { 
    label: string; 
    value: string | number; 
    className?: string;
}) => (
    <div className={`bg-white/5 rounded-xl p-3 sm:p-4 ${className}`}>
        <p className="text-gray-400 text-xs sm:text-sm mb-1">{label}</p>
        <p className="text-white font-semibold text-sm sm:text-base">{value}</p>
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

export default Projects; 