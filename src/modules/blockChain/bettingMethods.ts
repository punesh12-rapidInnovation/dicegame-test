import { BETTING_ADDRESS } from "./../../config";
import { instanceType, selectInstances } from "../../utils/contracts";

export const MinBetAmount = async () => {
  //create instance of an abi to call any blockChain function
  const lpInstance = await selectInstances(
    instanceType.BETTING, // type of instance
    BETTING_ADDRESS //contract address
  );
  if (true) {
    const MinBetAmount = await lpInstance.methods.minBet().call();
    return MinBetAmount;
  }
};
