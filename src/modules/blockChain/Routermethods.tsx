import { ROUTER_ADDRESS, BETTING_ADDRESS } from "./../../config";
import { instanceType, selectInstances } from "../../utils/contracts";
import web3 from "../../utils/web3";

export const CheckAllowance = async (
  OwnerAddress: string,
  ContractAddress: string
) => {
  //create instance of an abi to call any blockChain function
  const lpInstance = await selectInstances(
    instanceType.ROUTER, // type of instance
    ROUTER_ADDRESS //contract address
  );
  if (true) {
    const CheckAllowanceResult = await lpInstance.methods
      .allowance(OwnerAddress, ContractAddress)
      .call();
    return CheckAllowanceResult;
  }
};

export const GetAllowance = async (OwnerAddress: string) => {
  //create instance of an abi to call any blockChain function
  const lpInstance = await selectInstances(
    instanceType.ROUTER, // type of instance
    ROUTER_ADDRESS //contract address
  );
  if (true) {
    const CheckAllowanceResult = await lpInstance.methods
      .approve(BETTING_ADDRESS, 1000000000000)
      .send({ from: OwnerAddress });
    return CheckAllowanceResult;
  }
};
