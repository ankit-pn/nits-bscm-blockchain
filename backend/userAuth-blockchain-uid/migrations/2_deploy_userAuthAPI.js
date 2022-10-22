const data = artifacts.require("./userAuthAPI");

module.exports = function(deployer) {
  deployer.deploy(data);
};