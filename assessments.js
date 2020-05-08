const axios = require('axios');
const faker = require('faker');
const https = require('https');

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const CLI = require('clui');
const Spinner = CLI.Spinner;


// PCAAT Login Cookie Value
adToken = "64AF5BA4D991E9074C90F9455286122E25B6D314EFE26782CB012400F33BF023D1DF8C2A5E8D409CBAC9CCA939DDAB41CA208C024AB74B8973B22D37DE78115D5508ED28E1FEA2A2E8681559832EB3EB2721A843AF84859A84FA172F0901FB59"

// PCAAT URL
baseurl = "https://192.168.38.133:45455";



let assessmentCount = 0;

let failCount = 0;

clear();
createAssessment();

function createAssessment() {
    assessmentCount++;

    let data = {
        "ShiftDate": faker.date.past().toISOString(),
        "Shift": faker.random.arrayElement([0, 1]),
        "RegulatedNurseCount": faker.random.number({ 'min': 1, 'max': 20 }),
        "UnregulatedStaffCount": faker.random.number({ 'min': 1, 'max': 20 }),
        "SwingRegulatedNurseCount": faker.random.number({ 'min': 0, 'max': 10 }),
        "SwingUnregulatedStaffCount": faker.random.number({ 'min': 0, 'max': 10 }),
        "AcuityCurrentL1": faker.random.number({ 'min': 5, 'max': 15 }),
        "AcuityCurrentL2": faker.random.number({ 'min': 5, 'max': 15 }),
        "AcuityCurrentL3": faker.random.number({ 'min': 5, 'max': 15 }),
        "AcuityCurrentL4": faker.random.number({ 'min': 5, 'max': 15 }),
        "AcuityCurrentL5": faker.random.number({ 'min': 5, 'max': 15 }),
        "AcuityCurrentL6": faker.random.number({ 'min': 5, 'max': 15 }),
        "AcuityLeavingL1": faker.random.number({ 'min': 0, 'max': 5 }),
        "AcuityLeavingL2": faker.random.number({ 'min': 0, 'max': 5 }),
        "AcuityLeavingL3": faker.random.number({ 'min': 0, 'max': 5 }),
        "AcuityLeavingL4": faker.random.number({ 'min': 0, 'max': 5 }),
        "AcuityLeavingL5": faker.random.number({ 'min': 0, 'max': 5 }),
        "AcuityLeavingL6": faker.random.number({ 'min': 0, 'max': 5 }),
        "AcuityInflowL1": faker.random.number({ 'min': 0, 'max': 5 }),
        "AcuityInflowL2": faker.random.number({ 'min': 0, 'max': 5 }),
        "AcuityInflowL3": faker.random.number({ 'min': 0, 'max': 5 }),
        "AcuityInflowL4": faker.random.number({ 'min': 0, 'max': 5 }),
        "AcuityInflowL5": faker.random.number({ 'min': 0, 'max': 5 }),
        "AcuityInflowL6": faker.random.number({ 'min': 0, 'max': 5 }),
        "DependencyIndependent": faker.random.number({ 'min': 0, 'max': 16 }),
        "DependencyLow": faker.random.number({ 'min': 0, 'max': 16 }),
        "DependencyMedium": faker.random.number({ 'min': 0, 'max': 16 }),
        "DependencyHigh": faker.random.number({ 'min': 0, 'max': 16 }),
        "DependencyComplete": faker.random.number({ 'min': 0, 'max': 16 }),
        "OtherConsiderations": faker.lorem.paragraph(),
        "DeterminedAcuityComplexityNeeds": faker.random.number({ 'min': 10, 'max': 30 }),
        "DeterminedDependencyNeeds": faker.random.number({ 'min': 10, 'max': 30 }),
        "PotentialWorkingShort": faker.random.boolean(),
        "workloadMitigationIds": faker.random.arrayElement([[1], [1, 2], [1, 3], [1, 4], [3], [2], [4]]),
        "IsWorkingShort": faker.random.boolean(),
        "MitigatedWorkingShort": faker.random.arrayElement([true, false, null]),
        "unitId": faker.random.number({ 'min': 1, 'max': 100 }),
    }

    // At request level
    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    //clear();


    axios.post(`${baseurl}/api/assessments`, data, {
        headers: {
            Cookie: `ADAuthCookie=${adToken};`
        },
        httpsAgent: agent
    })
        .then(function (response) {
            //console.log(`New Assessment Created!   We've made ${assessmentCount} of these so far`);
            clear();
            console.log(
                chalk.blueBright(
                    figlet.textSync('PCAAT', { horizontalLayout: 'full' })
                )
            );
            console.log(
                chalk.green(
                    " GENERATING ASSESSMENTS... \n"
                )
            );
            console.log(` ${assessmentCount} Created | ${response.data.id} Total`);

            createAssessment();
        })
        .catch(function ({ response }) {
            failCount++;
            clear();
            if (failCount < 5) {
                console.log("trying again...")
                createAssessment();
            }
            else {
                console.log(response.data.message);
            }

        });
}
