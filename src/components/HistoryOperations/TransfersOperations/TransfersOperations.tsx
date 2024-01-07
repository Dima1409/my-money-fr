// import { operations } from "service/api";
// import { ISearchOperation } from "types/data";
// import Loader from "components/Loader";
// import {
//   OperationWrapper,
//   OperationsHeader,
//   Operation,
// } from "../Operations/Operations.styled";
// import { useEffect, useState } from "react";

// const TransfersOperations: React.FC = () => {
  // const [operation, setOperation] = useState<ISearchOperation[]>();
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
        // const operationsTransfers: ISearchOperation[] = await operations();
        // const sortedOperations = operationsTransfers
        //   .sort(
        //     (a, b) =>
        //       new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        //   )
        //   .filter((elem) => elem.type);
        // setOperation(sortedOperations);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getData();
  // }, []);
  // return (
    // <OperationWrapper>
    //   <OperationsHeader>Історія переказів</OperationsHeader>
    //   {operation ? null : <Loader type="spin"></Loader>}
    //   {operation === undefined
    //     ? null
    //     : operation.map(({ _id, category, comment, createdAt }) => {
    //         // const date = new Date(createdAt);
    //         return (
    //           <>
    //             <Operation></Operation>
    //             {/* <OperationInfo>Дата: {date.getDate()}.{date.getMonth()+1}</OperationInfo>
    //           <OperationInfo>Час: {date.getHours().toString().padStart(2,"0")}:{date.getMinutes().toString().padStart(2,"0")}:{date.getSeconds().toString().padStart(2,"0")}</OperationInfo> */}
    //           </>
    //         );
    //       })}
    // </OperationWrapper>
  // );
// };
// export default TransfersOperations;

const Transfers:React.FC = () => {
  return (
    <div>Transfers</div>
  )
}

export default Transfers;