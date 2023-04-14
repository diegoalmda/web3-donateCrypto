import Web3 from "web3"
import ABI from "./ABI.json"

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export async function doLogin() {
  if(!window.ethereum) throw new Error("No MetaMask found!")

  const web3 = new Web3(window.ethereum)
  const accounts = await web3.eth.requestAccounts()
  
  if(!accounts || !accounts.length) throw new Error("Wallet not found/allowed.")

  localStorage.setItem("eth-donate-app:wallet", accounts[0])

  return accounts[0]
}

function getContract() {
  const web3 = new Web3(window.ethereum)
  const from = localStorage.getItem("eth-donate-app:wallet")
  return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from })
}

export async function addCampaign(campaign) {
  const { title, description, videoUrl, imageUrl } = campaign
  const contract = getContract()
  return contract.methods.addCampaign(title, description, videoUrl, imageUrl).send()
}

export function getLastCampaignId() {
  const contract = getContract()
  return contract.methods.nextId().call()
}