import { ROUTER_ADDRESS, BETTING_ADDRESS } from "./../../config";
import { instanceType, selectInstances } from "../../utils/contracts";
import web3 from "../../utils/web3";

export const CheckAllowance = async (
  OwnerAddress: string,
  ContractAddress: string
) => {
  //create instance of an abi to call any blockChain function
  const lpInstance = await selectInstances(
    instanceType.ERC20TOKEN, // type of instance
    ROUTER_ADDRESS //contract address
  );
  if (true) {
    const CheckAllowanceResult = await lpInstance.methods
      .allowance(OwnerAddress, ContractAddress)
      .call();
    return CheckAllowanceResult;
  }
};


