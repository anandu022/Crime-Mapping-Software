// import "./widget.scss";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

// const Widget = ({ type }) => {
//   let data;

//   //temporary
//   const amount = 100;
//   const diff = 20;

//   switch (type) {
//     case "user":
//       data = {
//         title: "USERS",
//         isMoney: false,
//         link: "See all users",
//         icon: (
//           <PersonOutlinedIcon
//             className="icon"
//             style={{
//               color: "crimson",
//               backgroundColor: "rgba(255, 0, 0, 0.2)",
//             }}
//           />
//         ),
//       };
//       break;
//     case "order":
//       data = {
//         title: "CRIMES",
//         isMoney: false,
//         link: "View all crimes",
//         icon: (
//           <ShoppingCartOutlinedIcon
//             className="icon"
//             style={{
//               backgroundColor: "rgba(218, 165, 32, 0.2)",
//               color: "goldenrod",
//             }}
//           />
//         ),
//       };
//       break;
//     case "earning":
//       data = {
//         title: "EARNINGS",
//         isMoney: true,
//         link: "View net earnings",
//         icon: (
//           <MonetizationOnOutlinedIcon
//             className="icon"
//             style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
//           />
//         ),
//       };
//       break;
//     case "balance":
//       data = {
//         title: "BALANCE",
//         isMoney: true,
//         link: "See details",
//         icon: (
//           <AccountBalanceWalletOutlinedIcon
//             className="icon"
//             style={{
//               backgroundColor: "rgba(128, 0, 128, 0.2)",
//               color: "purple",
//             }}
//           />
//         ),
//       };
//       break;
//     default:
//       break;
//   }

//   return (
//     <div className="widget">
//       <div className="left">
//         <span className="title">{data.title}</span>
//         <span className="counter">
//           {data.isMoney && "$"} {amount}
//         </span>
//         <span className="link">{data.link}</span>
//       </div>
//       <div className="right">
//         <div className="percentage positive">
//           <KeyboardArrowUpIcon />
//           {diff} %
//         </div>
//         {data.icon}
//       </div>
//     </div>
//   );
// };

// export default Widget;

import supabase from "../../../utilities/supabase";
import "./widget.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined"; // New icon for crimes

const Widget = ({ type }) => {
  let data;
  const [count, setCount] = useState(0); // State to store count for user/crime

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      let tableName = "";
      switch (type) {
        case "user":
          tableName = "tbl_user";
          break;
        case "order":
          tableName = "tbl_crime";
          break;
        default:
          return;
      }

      const { count, error } = await supabase
        .from(tableName)
        .select("*", { count: "exact" });

      if (!error) {
        setCount(count); // Update count based on the table
      } else {
        console.error(`Error fetching ${type} data:`, error.message);
      }
    };

    fetchData();
  }, [type]);

  // Configure widget data
  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: (
          <Link to="./../users" className="link">
            See all users
          </Link>
        ),
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;

    case "order":
      data = {
        title: "CRIMES",
        isMoney: false,
        link: (
          <Link to="./../viewcrime" className="link">
            View all crimes
          </Link>
        ),
        icon: (
          <ReportProblemOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(255, 165, 0, 0.2)",
              color: "orange",
            }}
          />
        ),
      };
      break;

    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{count}</span>
        <span className="link">{data.link}</span> {/* Link added here */}
      </div>
      <div className="right">{data.icon}</div>
    </div>
  );
};

export default Widget;
