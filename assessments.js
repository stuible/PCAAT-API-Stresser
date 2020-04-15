const axios = require('axios');
const faker = require('faker');
const https = require('https');
const parse = require('node-html-parser').parse;
const FormData = require('form-data');
const qs = require('querystring')

// PCAAT Login Cookie Value
adToken = "882D78B183E88E608BA3A8A45CC0812AAAA300E4AF2B96FD08E6BB0B53440A64932C87AF0F02A65B4E014805FAAC1B830A268BA1DC897AC2CF0CA32BFE99BBCA9D6E7402E3BDE300CD0FC78FF2A6D8AA619CC80544E62C4F1E6B3B18CC8F56BA"

// PCAAT URL
baseurl = "https://pcaat.stuible.cloud";



assessmentCount = 0;

login();
//createAssessment();

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
        .catch(function (error) {
            console.log(error);
        });
}

async function login() {
    const { data } = await axios.get(baseurl + "/home/login");

    const root = parse(data);

    const inputs = root.querySelectorAll('input');

    const verificationElement = inputs.find(item => {
        return item.rawAttrs.includes(`name="__RequestVerificationToken"`);
    })

    const verificationToken = verificationElement.rawAttrs.substring(
        verificationElement.rawAttrs.lastIndexOf(`value="`) + 7,
        verificationElement.rawAttrs.lastIndexOf(`"`)
    );
    console.log("Logging into PCAAT");

    const requestBody = {
        Username: 'dev',
        Password: '',
        '__RequestVerificationToken': verificationToken
    }

    const config = {
        headers: {
            //Host: "pcaat.stuible.cloud",
            'Content-Type': 'application/x-www-form-urlencoded',
            Cookie: "__RequestVerificationToken=" + verificationToken + ";",
            // "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:75.0) Gecko/20100101 Firefox/75.0",
            // "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            // "Accept-Language": "en-CA,en-US;q=0.7,en;q=0.3",
            // "Upgrade-Insecure-Requests": "1",
            // Origin: "https://pcaat.stuible.cloud",
            // Connection: "keep-alive",
            // Referer: "https://pcaat.stuible.cloud/home/login",
        }
    }

    // const bodyFormData = new FormData();
    // bodyFormData.append('__RequestVerificationToken', verificationToken);
    // bodyFormData.append('Username', 'dev');
    // bodyFormData.append('Password', '');

    //console.log(bodyFormData.getHeaders())

    axios.post(baseurl + "/home/login?ReturnUrl=%2fhome%2flogin", qs.stringify(requestBody), config)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })



}