const NEVTOKEN = artifacts.require("./contracts/NEVToken.sol");


module.exports = function(deployer) {


  deployer.deploy(NEVTOKEN);

};
