# PSMS - scraper - frontend

scraping from https://psms-web.azureedge.net/

data last updated - 1 July 2024 - 11:30PM

## Table of Contents
- [Installation](#installation)
- [Scraper](#scraper)
- [Frontend](#frontend)
- [Data Folder Structure](#data-folder-structure)
- [Contribution Guidelines](#contribution-guidelines)

## Installation

### Follow these steps to install this project directory:

```
# clone the repo
$ git clone https://github.com/Rohitkk432/psms-data-api.git

# go into app's directory:
$ cd psms-data-api

```

### Requirements

- Node , npm (https://nodejs.org/en)
- typescript, ts-node (install globally via npm)

## Scraper

### Setup (once)

```
$ cd scraper

# install dependencies
$ npm install
```

### PreRun (everytime in new data fetch)

- delete folder ---> <code>./data/stationData</code>
- login to psms ---> on preferences page ---> inspect ---> networks tab --->  refresh  ---> from last API call -->
- copy the response --> paste it appropriately in JSON format in <code>./data/stations.json</code>
- copy token from that API call's Authorization Header
- create <code>.env</code> file in folder <code>./scraper</code> add env var <code>PSMS_TOKEN</code> and paste token

### Run

#### index.ts changes as needed -
- sort pasted <code>./data/stations.json</code> by uncommenting line 202
- fetch data(problemBank, projects) on all station by uncommenting lines 207-210 (output.txt logs stations with no projects)
- backfill <code>./data/stations.json</code> by uncommenting lines 215-218 (needed to show in frontend table) (output.txt logs stations with no folder in stationData)
- to check for (sum of requirements,number of companies) on each domain(line226) uncomment lines 224-235.

```
$ npm run start
```

- check output / errors in output.txt

## Frontend

```
$ cd client

# install dependencies
$ npm install

# development
$ npm run dev

# build and start
$ npm run build
$ npm run start
```

## Data Folder Structure

```
data
├── stations.json
|   (all stations - need to replace with new data before every update)
├── stationData
    |   (for each station - there exists folder)
    ├── <StationID>
        ├── station.json
        |   (station API response)
        ├── problemBank.json
        |   (problem bank API response)
        ├── <projectId>.json
        |   (each project in station API response)
```

## Contribution Guidelines
1. **Fork** the repo on GitHub.
2. **Clone** the project to your own machine.
3. **Commit** changes to your own branch.
4. **Push** your work back up to your fork.
5. **Submit** a pull request.
(Make sure you *merge* before you make a pull request!)

### Pull Request Guidelines
1. The subject should be a short one line summary of the change you've made.
2. The extended description should include a deatiled description of the changes you've made and also a list of all the files you've made changes in.
3. One pull request should cater to only one change. *A change may include multiple file changes that are essential to solving the issue/change.


