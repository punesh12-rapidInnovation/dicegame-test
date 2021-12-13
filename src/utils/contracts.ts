import {
  FACTORY_ADDRESS,
  LINK_TOKEN_ADDRESS,
  BETTING_ADDRESS,
  HOUSEPOOL_ADDRESS,
} from "../config";
import {
  ERC20_ABI,
  FACTORY_ABI,
  HOUSEPOOL_ABI,
  LP_ABI,
  BETTING_ABI,
  ROUTER_ABI,
} from "./abi";
import wallet from "./wallet";

export enum instanceType {
  "ROUTER" = "ROUTER",
  "FACTORY" = "FACTORY",
  "LP" = "LP",
  "ERC20TOKEN" = "ERC20TOKEN",
  "HOUSEPOOL" = "HOUSEPOOL",
  "BETTING" = "BETTING",
}
export const selectInstances = async (
  type: any,
  contractAddress?: any
): Promise<any> => {
  switch (type) {
    case "ROUTER":
      return new wallet.web3.eth.Contract(ROUTER_ABI, LINK_TOKEN_ADDRESS);
    case "FACTORY":
      return new wallet.web3.eth.Contract(FACTORY_ABI, FACTORY_ADDRESS);
    case "LP":
      return new wallet.web3.eth.Contract(LP_ABI, contractAddress);
    case "ERC20TOKEN":
      return new wallet.web3.eth.Contract(ERC20_ABI, contractAddress);
    case "HOUSEPOOL":
      return new wallet.web3.eth.Contract(HOUSEPOOL_ABI, HOUSEPOOL_ADDRESS);
    case "BETTING":
      return new wallet.web3.eth.Contract(BETTING_ABI, BETTING_ADDRESS);
    case "HOUSEPOOL":
      return new wallet.web3.eth.Contract(HOUSEPOOL_ABI, HOUSEPOOL_ADDRESS);
    default:
      return null;
  }
};
