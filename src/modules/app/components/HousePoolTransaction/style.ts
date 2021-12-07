import { colors } from "shared/styles/theme";
import styled from "styled-components";

import Rectangle from 'assets/images/rectangle.svg'


export const DataContainer = styled.div`
display: flex;
flex-direction: column;
// background: ${colors.black};
width: 100%;
`;

export const TableStyles = styled.div`
  // /* This is required to make the table full-width */
  // display: block;
  // max-width: 100%;
  // background: #000;
  // margin:20px 0px;
  // border-radius:10px;
  // overflow:hidden;

  // /* This will make the table scrollable when it gets too small */
  // .tableWrap {
  //   display: block;
  //   max-width: 100%;
  //   overflow-x: scroll;
  //   overflow-y: hidden;
  //   border-bottom: 1px solid black;
  // }

  // table {
  //   /* Make sure the inner table is always as wide as needed */
  //   width: 100%;
  //   border-spacing: 0;

  //   tr {  
	// 	cursor:pointer;
        
  //     :last-child {
  //       td {
  //         border-bottom: 0;
  //       }
  //     }
  //   }

    
  //   tbody{
  //       background: transparent;
  //       color:#fff;
  //       border :1px solid red;
  //   }

  //   th,
  //   td {
  //     margin: 0;
  //     padding: 1rem;
  //     text-align: left;

  //     /* The secret sauce */
  //     /* Each cell should grow equally */
  //     width: 1%;
  //     /* But "collapsed" cells should be as small as possible */
  //     &.collapse {
  //       width: 0.0000000001%;
  //     }

  //     :last-child {
  //       border-right: 0;
  //     }
  //   }
  // }

  // .pagination {
  //   padding: 0.5rem;
  //   color:#fff;
  //   text-align:center;
  // }
`

export const TABLE = styled.table`
width:100%;
border-collapse:collapse;
`
export const THead = styled.thead`
background:${colors.black};
box-shadow:inset 10px 1px 20px 5px ${colors.darkPurple};
width:100%;
color:${colors.purple};
height:70px;
border-radius:10px;
text-align:center;
`
export const TR = styled.tr`
border-radius:50px;
height:70px;
border:1px solid ${colors.darkPurple};
color:${colors.white};
width: 100%;
text-align:center;
`
export const TD = styled.td`

`
export const PaginationCont = styled.div`
display:flex;
justify-content:space-between;
color:${colors.white};
height:50px;

div{
  width:20%;
  // background:red;
  display:flex;
  justify-content:center;
  align-items:center;
}

`
