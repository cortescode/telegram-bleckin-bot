



function describe(testDescription, testFunction) {
    console.log(`\n${testDescription}`)
    testFunction()
}


function it(testDescription, testFunction) {
    try {
        testFunction();
        console.log(`  ✓ ${testDescription}`);
    } catch (error) {
        console.error(`  ✗ ${testDescription}`);
        console.error(`    ${error.message}`);
    }
}


module.exports = {describe, it}