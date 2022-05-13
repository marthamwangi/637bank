exports.bankAcountGenerate = async  function () {
    let accountNumber = '637'; //prefix
    for (let i = 0; i < 8; i++) {
        accountNumber += Math.floor(Math.random() * 10);
    }
   return Number(accountNumber);
}