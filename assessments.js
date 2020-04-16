const axios = require('axios');
const faker = require('faker');
const https = require('https');

// PCAAT Login Cookie Value
adToken = "3EAB1892FBA1A1132DE06D436C4A2446B31E2C85837B1F522B565C168F884E54ED24E1A687DC14D9982B37D0BC1F9F4352DB40F67A49E02D37644BC68D0708EA56CA3527A77FCBF08681C65121407661BD228B9A586A5EDF255A1BE93A7C643F"

// PCAAT URL
baseurl = "https://192.168.38.133:45455";



assessmentCount = 0;

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

    axios.post(`${baseurl}/api/assessments`, data, {
        headers: {
            Cookie: `ADAuthCookie=${adToken};`
        },
        httpsAgent: agent
    })
        .then(function (response) {
            console.log(`New Assessment Created!  We've made ${assessmentCount} of these so far`);
            createAssessment();
        })
        .catch(function ({response}) {
            console.log(response.data.message);
        });
}
