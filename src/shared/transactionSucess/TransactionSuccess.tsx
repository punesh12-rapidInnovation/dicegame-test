
import CustomModal from 'shared/custom-modal';

const TransactionSuccess = (props: any) => {
  const { show, toggleModal } = props;
  return (
    <CustomModal
      show={show}
      toggleModal={toggleModal}
      heading={"Transaction Successful"}
    >
      {/* <div>success</div> */}
    </CustomModal>
  );
};
export default TransactionSuccess;
