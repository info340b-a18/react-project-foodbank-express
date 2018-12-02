//Get list of bank names from the 
//given bank json file
export default function(bankJson) {
    let banks = []
    //console.log(bankJson);
    bankJson.forEach(b => {
        banks.push(b.result.name);
    });
    return banks;
}

