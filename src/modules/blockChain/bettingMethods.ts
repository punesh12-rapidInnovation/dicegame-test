import { instanceType, selectInstances } from '../../utils/contracts';

// export const userLpBalance = async (userAddress: any, tokenAddress: any) => {
//     //create instance of an abi to call any blockChain function
//     const lpInstance =
//         await selectInstances(
//             instanceType.LP, // type of instance
//             tokenAddress //contract address
//         );
//     if (userAddress) {
//         const userBalance = await lpInstance.methods.balanceOf(userAddress).call();
//         return userBalance;
//     }
// };
