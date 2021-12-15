import { BETTING_ADDRESS, HOUSEPOOL_ADDRESS } from "./../../config";
import { instanceType, selectInstances } from "../../utils/contracts";
import web3 from "../../utils/web3";




export const MinBetAmount = async () => {
  //create instance of an abi to call any blockChain function
  const lpInstance = await selectInstances(
    instanceType.HOUSEPOOL, // type of instance
    HOUSEPOOL_ADDRESS //contract address
  );
  if (true) {
    const MinBetAmount = await lpInstance.methods.minBet().call();
    return MinBetAmount;
  }
};
export const MaxBetAmount = async () => {
  //create instance of an abi to call any blockChain function
  const lpInstance = await selectInstances(
    instanceType.HOUSEPOOL, // type of instance
    HOUSEPOOL_ADDRESS //contract address
  );
  if (true) {
    const MaxBetAmount = await lpInstance.methods.maxBet().call();
    return MaxBetAmount;
  }
};

export const HouseEdge = async () => {

  try {
    //create instance of an abi to call any blockChain function
    const lpInstance = await selectInstances(
      instanceType.BETTING, // type of instance
      BETTING_ADDRESS //contract address
    );
    if (true) {
      const Houseedge = await lpInstance.methods.houseEdge().call();
      return Houseedge;
    }
  } catch (error) {
    console.log(error);
  }
};
export const HouseEdgeDiviser = async () => {
  //create instance of an abi to call any blockChain function
  const lpInstance = await selectInstances(
    instanceType.BETTING, // type of instance
    BETTING_ADDRESS //contract address
  );
  if (true) {
    const HouseEdgeDiviser = await lpInstance.methods.houseEdgeDivisor().call();
    return HouseEdgeDiviser;
  }
};
export const PlaceBet = async (
  myAccount: string | null,
  Amount: any,
  Rollunder: number
) => {
  //create instance of an abi to call any blockChain function
  const Ethervalue = web3.utils.toWei(Amount.toString(), "ether");

  const lpInstance = await selectInstances(
    instanceType.BETTING, // type of instance
    BETTING_ADDRESS //contract address
  );
  if (true) {
    const RollDice = await lpInstance.methods.playerRollDice(Rollunder).send({
      from: myAccount,
      value: Ethervalue,
    })
    return RollDice;
  }
};
