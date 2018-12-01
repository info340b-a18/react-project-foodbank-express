export default function(bankJson) {
    let banks = []
    //console.log(bankJson);
    bankJson.forEach(b => {
        banks.push(b.result.name);
    });
    return banks;
}