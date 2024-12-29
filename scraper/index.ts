const axios = require("axios");
const fs = require("fs");
const path = require("path");
const data1 = require("../data/stations.json");
const { validEmailsPS2Sem2 } = require("./validEmails");
const allotmentData1 = require('../data/allotments.json')

require("dotenv").config();

const AUTH_TOKEN = process.env.PSMS_TOKEN;

const USER_NAME = process.env.USER_NAME;

const API_URL = 'https://psms.bits-pilani.ac.in/api/api';

interface ProjectDiscipline {
    cgpamin: number;
    cgpamax: number;
}

interface ProjectFacility {
    ugstipend: number;
}

interface StationData {
    problemBankGridLines: Array<{
        totalRequirement: number;
    }>;
}

interface Station {
    stationId: number;
    minCgpa: number | null;
    requirements: number | null;
    ugstipend: number | null;
}

const getStationProjectsData = async (stationID: number, pbID: number, projectID: number) => {
    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${API_URL}/ProblemBank/project/${projectID}?expand=all`,
        headers: {
            Accept: "application/json, text/plain, */*",
            "Accept-Language": "en-US,en;q=0.9",
            Authorization: AUTH_TOKEN,
            Connection: "keep-alive",
            Origin: "https://psms-web.azureedge.net",
            Referer: "https://psms-web.azureedge.net/",
        },
    };

    await axios
        .request(config)
        .then((response: any) => {
            const stationId = `${stationID}`;
            const directory = path.join(__dirname, "..", "data", "stationData", stationId);
            const filePath = path.join(directory, `${projectID}.json`);

            // Ensure the directory exists
            fs.mkdir(directory, { recursive: true }, (err: any) => {
                if (err) {
                    console.error("Error creating directory", err);
                    return;
                }

                // Write the response data to the file
                fs.writeFile(filePath, JSON.stringify(response.data, null, 2), (err: any) => {
                    if (err) {
                        console.error("Error writing to file", err);
                    } else {
                        // console.log("File written successfully");
                    }
                });
            });
        })
        .catch((error: any) => {
            console.error(error);
        });
};

const getStationProblemBank = async (stationID: number, pbID: number) => {
    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${API_URL}/stationallotment/student/preference/projects?problemBankId=${pbID}&userName=${USER_NAME}`,
        headers: {
            Accept: "application/json, text/plain, */*",
            "Accept-Language": "en-US,en;q=0.9",
            Authorization: AUTH_TOKEN,
            Connection: "keep-alive"
        },
    };

    await axios
        .request(config)
        .then((response: any) => {
            const stationId = `${stationID}`;
            const directory = path.join(__dirname, "..", "data", "stationData", stationId);
            const filePath = path.join(directory, "problem-bank.json");

            // Ensure the directory exists
            fs.mkdir(directory, { recursive: true }, (err: any) => {
                if (err) {
                    console.error("Error creating directory", err);
                    return;
                }

                // Write the response data to the file
                fs.writeFile(filePath, JSON.stringify(response.data, null, 2), (err: any) => {
                    if (err) {
                        console.error("Error writing to file", err);
                    } else {
                        // console.log("File written successfully");
                    }
                });
            });

            response.data.projectGridLines.forEach((item: any) => {
                getStationProjectsData(stationID, pbID, item.projectId);
            });
        })
        .catch((error: any) => {
            console.error(error);
        });
};

const getStationData = async (stationID: number, stationName: string) => {
    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${API_URL}/stationallotment/student/preference/problembanks?stationId=${stationID}&userName=${USER_NAME}`,
        headers: {
            Accept: "application/json, text/plain, */*",
            "Accept-Language": "en-US,en;q=0.9",
            Authorization: AUTH_TOKEN,
            Connection: "keep-alive"
        },
    };

    await axios
        .request(config)
        .then((response: any) => {
            const stationId = `${stationID}`;
            const directory = path.join(__dirname, "..", "data", "stationData", stationId);
            const filePath = path.join(directory, "station.json");

            // Ensure the directory exists
            fs.mkdir(directory, { recursive: true }, (err: any) => {
                if (err) {
                    console.error("Error creating directory", err);
                    return;
                }

                // Write the response data to the file
                fs.writeFile(filePath, JSON.stringify(response.data, null, 2), (err: any) => {
                    if (err) {
                        console.error("Error writing to file", err);
                    } else {
                        // console.log("File written successfully");
                    }
                });
            });

            if (response.data.problemBankGridLines[0]?.problemBankId) {
                getStationProblemBank(stationID, response.data.problemBankGridLines[0].problemBankId);
            } else {
                console.log(stationName);
            }
        })
        .catch((error: any) => {
            console.error(error);
        });
};

const backfillListWithData = async (stationID: number) => {
    const stationDir = path.join(__dirname, "..", "data", "stationData", `${stationID}`);
    const files = fs.readdirSync(stationDir);
    let minCgpa: number | null = null;
    let requirements: number | null = null;
    let minStipend: number | null = null;
    
    files.forEach((file: string) => {
        if (file.endsWith(".json") && file !== "station.json" && file !== "problem-bank.json") {
            const projectData = JSON.parse(fs.readFileSync(path.join(stationDir, file), "utf8"));
            
            projectData.projectDiscipline.forEach((discipline: ProjectDiscipline) => {
                if (minCgpa === null || discipline.cgpamin < minCgpa) {
                    minCgpa = discipline.cgpamin;
                }
                if (minCgpa === null || discipline.cgpamax < minCgpa) {
                    minCgpa = discipline.cgpamax;
                }
            });
            
            projectData.projectFacility.forEach((dataItem: ProjectFacility) => {
                if (dataItem.ugstipend > 0 && (minStipend === null || dataItem.ugstipend < minStipend)) {
                    minStipend = dataItem.ugstipend;
                }
            });
        }
        if (file === "station.json") {
            const stationData: StationData = JSON.parse(fs.readFileSync(path.join(stationDir, file), "utf8"));
            requirements = stationData?.problemBankGridLines?.[0]?.totalRequirement || null;
        }
    });

    const stationIndex = data1.findIndex((station: Station) => station.stationId === stationID);
    if (stationIndex !== -1) {
        data1[stationIndex].minCgpa = minCgpa;
        data1[stationIndex].requirements = requirements;
        data1[stationIndex].ugstipend = minStipend;
    }

    // Update the stations.json file
    fs.writeFileSync(path.join(__dirname, "..", "data", "stations.json"), JSON.stringify(data1, null, 2));
};

const compareFunc = (a: any, b: any) => {
    if (a.stationName < b.stationName) return -1;
    if (b.stationName < a.stationName) return 1;
    return 0;
};

const sortStationsList = () => {
    data1.sort(compareFunc);
    fs.writeFileSync(path.join(__dirname, "..", "data", "stations.json"), JSON.stringify(data1, null, 2));
};

// // sort data/stations.json

// sortStationsList();

data1.forEach(async (stationItem: any) => {
    // //fetch individual stationsData (station->problembank->projects)
    // await getStationData(stationItem.stationId, stationItem.stationName).catch((err) => {
    //     console.log(stationItem.stationId);
    //     return;
    // });
    // //backfill some data to data/stations.json
    // await backfillListWithData(stationItem.stationId).catch((err) => {
    //     console.log(stationItem.stationId);
    //     return;
    // });
});


// // find total requirement of each domain -->

// let num = 0;
// let sum = 0;
// let typeDomain = "CSIS/IT";
// data1.map((item: any) => {
//     if (item.stationDomain === typeDomain) {
//         if (typeof item.requirements === "number") {
//             sum += item.requirements;
//             num += 1;
//         }
//     }
// });
// console.log(typeDomain, sum, num);

let allotmentData: { [key: string]: any } = {};

const getAllotmentByMail = async (emailID: string) => {
    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${API_URL}/StationAllotment/stationAllotedByStudent/${emailID}`,
        headers: {
            Accept: "application/json, text/plain, */*",
            "Accept-Language": "en-US,en;q=0.9",
            Authorization: AUTH_TOKEN,
            Connection: "keep-alive"
        },
    };

    try {
        const response = await axios.request(config);
        if (response.status === 200) {
            allotmentData[emailID] = response.data;
            console.log(emailID);
        }
    } catch (error) {
        //blank error
    }
};

const getAllAllotmentData = async () => {
    // const emailIds1 = Array.from({ length: 2701 }, (_, i) => 
    //     `f2020${i.toString().padStart(4, '0')}@goa.bits-pilani.ac.in`
    // );
    
    // const emailIds2 = Array.from({ length: 3300 }, (_, i) => 
    //     `f2021${i.toString().padStart(4, '0')}@goa.bits-pilani.ac.in`
    // );
    
    // Combine all email IDs
    const allEmails = [...validEmailsPS2Sem2];
    
    for (let i=0;i<allEmails.length;i++){
        await getAllotmentByMail(allEmails[i]);
    }

    // Write to file after all API calls are done
    const filePath = path.join(__dirname, "..", "data", "allotments.json");
    fs.writeFileSync(filePath, JSON.stringify(allotmentData, null, 2));
    console.log("Allotment data written to file");
}

let allotmentDataClone = allotmentData1;


const getAllotmentDetailsByID = async (StudentID: string,emailID:string) => {
    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${API_URL}/stationallotment/allotmentletter/${StudentID}`,
        headers: {
            Accept: "application/json, text/plain, */*",
            "Accept-Language": "en-US,en;q=0.9",
            Authorization: AUTH_TOKEN,
            Connection: "keep-alive"
        },
    };

    try {
        const response = await axios.request(config);
        if (response.status === 200) {
            allotmentDataClone[emailID].allotments = response.data.allotments;
            allotmentDataClone[emailID].academicPeriodDetail = response.data.academicPeriodDetail;
            console.log(emailID);
        }
    } catch (error) {
        //blank error
    }
};

const getAllAllotmentDetailsData = async () => {
    const allEmails = [...validEmailsPS2Sem2];

    for (let i=0;i<allEmails.length;i++){
        const StudentID = allotmentData1[allEmails[i]].studentId;
        await getAllotmentDetailsByID(StudentID,allEmails[i]);
    }

    // Write to file after all API calls are done
    const filePath = path.join(__dirname, "..", "data", "allotments.json");
    fs.writeFileSync(filePath, JSON.stringify(allotmentDataClone, null, 2));
    console.log("Allotment details data written to file");
}

// getAllAllotmentData();
// getAllAllotmentDetailsData();