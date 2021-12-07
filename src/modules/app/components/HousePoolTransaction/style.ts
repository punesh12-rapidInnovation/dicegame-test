import { colors } from "shared/styles/theme";
import styled from "styled-components";

import Rectangle from 'assets/images/rectangle.png'


export const DataContainer = styled.div`
display: flex;
flex-direction: column;
// background: ${colors.black};
width: 100%;
`;

export const TableStyles = styled.div`
  /* This is required to make the table full-width */
  display: block;
  max-width: 100%;
  background: #000;
  margin:20px 0px;
  border-radius:10px;
  overflow:hidden;

  /* This will make the table scrollable when it gets too small */
  .tableWrap {
    display: block;
    max-width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    border-bottom: 1px solid black;
  }

  table {
    /* Make sure the inner table is always as wide as needed */
    width: 100%;
    border-spacing: 0;

    tr {  
		cursor:pointer;
        
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    thead{
        background: url(${Rectangle});
        color:${colors.purple};
        height:20px;
    }
    tbody{
        background: transparent;
        color:#fff;
        border :1px solid red;
    }

    th,
    td {
      margin: 0;
      padding: 1rem;
      text-align: left;

      /* The secret sauce */
      /* Each cell should grow equally */
      width: 1%;
      /* But "collapsed" cells should be as small as possible */
      &.collapse {
        width: 0.0000000001%;
      }

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
    color:#fff;
    text-align:center;
  }
`

export const TABLE = styled.div`
width:100%;
`
export const THead = styled.div`
background: url(${Rectangle});
width:100%;
color:${colors.purple};
height:20px;

`