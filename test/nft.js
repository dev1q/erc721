/* eslint-disable no-undef */
const NFTContract = artifacts.require('NFTContract')
const NFTTraider = artifacts.require('NFTTraider')

contract('NFTContract', (accounts) => {
  // it('mint', async () => {
  //   const NFT = await NFTContract.deployed()
  //   NFT.mint('http://google.com')
  // })
  // it('burn', async () => {
  //   const NFT = await NFTContract.deployed()
  //   await NFT.mint('http://google.com')
  //   await NFT.burn(0)
  // })
  it('orders', async () => {
    const NFT1 = await NFTContract.deployed()
    const NFT2 = await NFTContract.deployed()
    const NFT3 = await NFTContract.deployed()

    console.log(NFT1.address)
    console.log(NFT2.address)
    console.log(NFT3.address)

    await NFT1.mint('http://google.com0')
    await NFT1.mint('http://google.com1')

    await NFT2.mint('http://google.com2')

    await NFT3.mint('http://google.com3')
    await NFT3.mint('http://google.com4')

    const traider = await NFTTraider.deployed()

    await NFT1.approve(traider.address, 0)
    await NFT1.approve(traider.address, 1)

    await NFT2.approve(traider.address, 0)

    await NFT3.approve(traider.address, 0)
    await NFT3.approve(traider.address, 1)

    await traider.create(NFT1.address, 0, 1)
    await traider.create(NFT1.address, 1, 1)

    await traider.create(NFT2.address, 0, 1)

    await traider.create(NFT3.address, 0, 1)
    await traider.create(NFT3.address, 1, 1)

    console.log((await traider.getOrders()).toNumber())
  })
  it('sell', async () => {
    const NFT = await NFTContract.deployed()
    await NFT.mint('http://google.com')

    const traider = await NFTTraider.deployed()

    await NFT.approve(traider.address, 0)

    await traider.create(NFT.address, 0, 1)
  })
  it('buy', async () => {
    const NFT = await NFTContract.deployed()
    await NFT.mint('http://google.com')

    const traider = await NFTTraider.deployed()

    await NFT.approve(traider.address, 0)

    await traider.create.call(NFT.address, 0, 1, { from: accounts[0] })
    await traider.buy.call(NFT.address, 0, { from: accounts[1], value: 1 })
  })
})
