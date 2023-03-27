const Cryptolog = artifacts.require("./cryptolog");

module.exports = function (deployer) {
  deployer.deploy(Cryptolog);
};
