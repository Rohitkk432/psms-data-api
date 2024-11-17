'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import MarkdownRenderer from "@/components/markdown";

import skills from "../../../data/catergories/skill.json";
import acadDomains from "../../../data/catergories/academicdomain.json";
import acadSubDomains from "../../../data/catergories/academicsubdomainbyid.json";
import elective1 from "../../../data/catergories/elective1.json";

interface ProjectProps {
    projects?: {
        [key: string]: {
            projectId?: string;
            title?: string;
            description?: string;
            projectDiscipline?: Array<{
                cgpamin?: number;
                cgpamax?: number;
                degree?: string;
                maleRequirement?: number;
                femaleRequirement?: number;
                freshRequirement?: number;
                totalRequirement?: number;
                disciplineCodes?: string;
            }>;
            projectFacility?: Array<{
                ugstipend?: number;
                pgstipend?: number;
                currency?: string;
            }>;
            projectSkill?: Array<{ skillId?: string }>;
            projectAcademicDomain?: Array<{ academicDomainId?: string }>;
            projectAcademicSubDomain?: Array<{ academicSubDomainId?: string }>;
            projectElective?: Array<{ electiveId?: string; grade?: string }>;
        };
    };
}

export const Projects = ({ projects }: ProjectProps) => {
    const [expandedProjects, setExpandedProjects] = useState<{ [key: string]: boolean }>({});

    const toggleProject = (projectId: string) => {
        setExpandedProjects(prev => ({
            ...prev,
            [projectId]: !prev[projectId]
        }));
    };

    // If projects is undefined/null, return early with a message or empty state
    if (!projects || typeof projects !== 'object') {
        return (
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
                <p className="text-center text-gray-400">No projects available</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {Object.entries(projects || {}).map(([fileName, item], index) => {
                const discipline = item?.projectDiscipline?.[0] ?? {};
                const facility = item?.projectFacility?.[0] ?? {};
                const projectId = item?.projectId ?? fileName;

                return (
                    <div key={projectId} 
                         className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 transition-all hover:border-blue-500/50">
                        {/* Project Header - Always Visible */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <h2 className="text-2xl font-bold text-white">
                                    Project {index + 1}
                                </h2>
                                <span className="px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                                    ID: {projectId}
                                </span>
                            </div>
                        </div>

                        {/* Project Title - Always Visible */}
                        <h3 className="text-xl text-blue-400 font-semibold mb-4">
                            {item?.title ?? 'Untitled Project'}
                        </h3>

                        {/* Enhanced Collapsible Toggle Button */}
                        <div 
                            className="flex items-center justify-between cursor-pointer hover:bg-white/5 rounded-lg p-2 transition-colors mb-4"
                            onClick={() => toggleProject(projectId)}
                        >
                            <div className="flex items-center gap-2">
                                {expandedProjects[projectId] ? (
                                    <ChevronUpIcon className="w-5 h-5 text-blue-400" />
                                ) : (
                                    <ChevronDownIcon className="w-5 h-5 text-blue-400" />
                                )}
                                <span className="text-gray-400 text-sm font-medium">
                                    {expandedProjects[projectId] ? 'Hide Project Details' : 'View Project Details'}
                                </span>
                            </div>
                            <div className="flex-grow mx-4 border-t border-gray-700/50"></div>
                        </div>

                        {/* Collapsible Content */}
                        {expandedProjects[projectId] && (
                            <div className="space-y-6 animate-fadeIn">
                                {/* Description */}
                                {item?.description && (
                                    <div className="bg-black/20 rounded-xl p-4 mb-6">
                                        <MarkdownRenderer>
                                            {item.description
                                                .replaceAll("color: rgb(0, 0, 0);", "color: rgb(255, 255, 255);")
                                                .replaceAll("color: black", "color: rgb(255, 255, 255);")
                                                .replaceAll("background-color: rgb(255, 255, 255)", "background-color: transparent")}
                                        </MarkdownRenderer>
                                    </div>
                                )}

                                {/* Requirements Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
                                    <RequirementCard
                                        label="CGPA Required"
                                        value={`${discipline?.cgpamin ?? 0} - ${discipline?.cgpamax ?? 10}`}
                                    />
                                    <RequirementCard
                                        label="Degree"
                                        value={discipline?.degree ?? 'Not Specified'}
                                    />
                                    <RequirementCard
                                        label="Stipend (UG)"
                                        value={`${facility?.ugstipend ?? 0} ${facility?.currency ?? 'INR'}`}
                                    />
                                    <RequirementCard
                                        label="Stipend (PG)"
                                        value={`${facility?.pgstipend ?? 0} ${facility?.currency ?? 'INR'}`}
                                    />
                                    <RequirementCard
                                        label="Male Requirement"
                                        value={discipline?.maleRequirement || "Not Specified"}
                                    />
                                    <RequirementCard
                                        label="Female Requirement"
                                        value={discipline?.femaleRequirement || "Not Specified"}
                                    />
                                    <RequirementCard
                                        label="Fresh Requirement"
                                        value={discipline?.freshRequirement || "Not Specified"}
                                    />
                                    <RequirementCard
                                        label="Total Requirement"
                                        value={discipline?.totalRequirement || "Not Specified"}
                                    />
                                </div>

                                {/* Skills and Requirements Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <DetailSection
                                        title="Required Skills"
                                        items={(item?.projectSkill ?? []).map(skl => {
                                            try {
                                                if (!skl?.skillId) return 'Unknown Skill';
                                                const skill = skills.find(s => String(s.skillId) === String(skl.skillId));
                                                return skill?.skillName ?? 'Unknown Skill';
                                            } catch (error) {
                                                console.error('Error processing skill:', error);
                                                return 'Unknown Skill';
                                            }
                                        })}
                                        bgColor="bg-purple-500/20"
                                        textColor="text-purple-400"
                                    />
                                    <DetailSection
                                        title="Academic Domains"
                                        items={(item?.projectAcademicDomain ?? []).map(domain => {
                                            try {
                                                if (!domain?.academicDomainId) return 'Unknown Domain';
                                                const found = acadDomains.find(d => String(d.academicDomainId) === String(domain.academicDomainId));
                                                return found?.name ?? 'Unknown Domain';
                                            } catch (error) {
                                                console.error('Error processing academic domain:', error);
                                                return 'Unknown Domain';
                                            }
                                        })}
                                        bgColor="bg-green-500/20"
                                        textColor="text-green-400"
                                    />
                                    <DetailSection
                                        title="Academic Sub-Domains"
                                        items={(item?.projectAcademicSubDomain ?? []).map(subDomain => {
                                            try {
                                                if (!subDomain?.academicSubDomainId) return 'Unknown Sub-domain';
                                                const found = acadSubDomains.find(d => String(d.academicSubDomainId) === String(subDomain.academicSubDomainId));
                                                return found?.name ?? 'Unknown Sub-domain';
                                            } catch (error) {
                                                console.error('Error processing academic sub-domain:', error);
                                                return 'Unknown Sub-domain';
                                            }
                                        })}
                                        bgColor="bg-blue-500/20"
                                        textColor="text-blue-400"
                                    />
                                    <DetailSection
                                        title="Project Electives"
                                        items={(item?.projectElective ?? []).map(elective => {
                                            try {
                                                if (!elective?.electiveId) return 'Unknown Elective';
                                                const found = elective1.find(e => String(e.electiveId) === String(elective.electiveId));
                                                return found?.elective1 
                                                    ? `${found.elective1}${elective.grade ? ` (Grade: ${elective.grade})` : ''}`
                                                    : 'Unknown Elective';
                                            } catch (error) {
                                                console.error('Error processing elective:', error);
                                                return 'Unknown Elective';
                                            }
                                        })}
                                        bgColor="bg-amber-500/20"
                                        textColor="text-amber-400"
                                    />
                                    <DetailSection
                                        title="Discipline Codes"
                                        items={(() => {
                                            try {
                                                const codes = discipline?.disciplineCodes;
                                                if (!codes) return ['Not Specified'];
                                                return codes.split(/[,\s]+/).filter(Boolean).map(code => code.trim());
                                            } catch (error) {
                                                console.error('Error processing discipline codes:', error);
                                                return ['Not Specified'];
                                            }
                                        })()}
                                        bgColor="bg-rose-500/20"
                                        textColor="text-rose-400"
                                    />
                                </div>

                                {/* Collapse Button */}
                                <div 
                                    className="flex items-center justify-center mt-6 cursor-pointer"
                                    onClick={() => toggleProject(projectId)}
                                >
                                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                                        <ChevronUpIcon className="w-5 h-5 text-blue-400" />
                                        <span className="text-gray-400 text-sm font-medium">Collapse Details</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
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