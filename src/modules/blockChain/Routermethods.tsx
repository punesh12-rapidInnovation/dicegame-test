import { LINK_TOKEN_ADDRESS, BETTING_ADDRESS } from "./../../config";
import { instanceType, selectReadContractInstance } from "../../utils/contracts";
import web3 from "../../utils/web3";

export const CheckAllowance = async (
  OwnerAddress: string,
  ContractAddress: string
) => {
  //create instance of an abi to call any blockChain function
  const lpInstance = await selectReadContractInstance(
    instanceType.ERC20TOKEN, // type of instance
    LINK_TOKEN_ADDRESS //contract address
  );
  if (true) {
    const CheckAllowanceResult = await lpInstance.methods
      .allowance(OwnerAddress, ContractAddress)
      .call();
    return CheckAllowanceResult;
  }
};


