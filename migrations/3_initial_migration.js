const Migrations = artifacts.require('NFTTraider')

module.exports = function (deployer) {
  deployer.deploy(Migrations)
}
