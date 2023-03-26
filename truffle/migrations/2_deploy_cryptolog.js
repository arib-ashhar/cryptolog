const Cryptolog = artifacts.require("./fileStore");

module.exports = function (deployer) {
  deployer.deploy(Cryptolog);
};
