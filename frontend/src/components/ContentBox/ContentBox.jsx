// import React from "react";
// import Shopping from "../../pages/Shopping";
// import Transport from "../../pages/Transport";
// import Electricity from "../../pages/Electricity";
// import Food from "../../pages/Food";
// import Result from "../../pages/Result";
// import "./ContentBox.css";

// const ContentBox = ({ activeSection }) => {
//   let SectionComponent;

//   switch (activeSection) {
//     case "Shopping":
//       SectionComponent = Shopping;
//       break;
//     case "Transport":
//       SectionComponent = Transport;
//       break;
//     case "Electricity":
//       SectionComponent = Electricity;
//       break;
//     case "Food":
//       SectionComponent = Food;
//       break;
//     case "Result":
//       SectionComponent = Result;
//       break;
//     default:
//       SectionComponent = Shopping;
//   }

//   return (
//     <div className="content-box">
//       <SectionComponent />
//     </div>
//   );
// };

// export default ContentBox;

// import React from "react";
// import Shopping from "../../pages/Shopping";
// import Transport from "../../pages/Transport";
// import Electricity from "../../pages/Electricity";
// import Food from "../../pages/Food";
// import Result from "../../pages/Result";
// import "./ContentBox.css";

// const ContentBox = ({ activeSection, setActiveSection }) => {
//   return (
//     <div className="content-box">
//       {activeSection === "Shopping" && <Shopping setActiveSection={setActiveSection} />}
//       {activeSection === "Transport" && <Transport setActiveSection={setActiveSection} />}
//       {activeSection === "Electricity" && <Electricity setActiveSection={setActiveSection} />}
//       {activeSection === "Food" && <Food setActiveSection={setActiveSection} />}
//       {activeSection === "Result" && <Result setActiveSection={setActiveSection} />}
//     </div>
//   );
// };

// export default ContentBox;




import React from "react";
import Shopping from "../../pages/Shopping";
import Transport from "../../pages/Transport";
import Electricity from "../../pages/Electricity";
import Food from "../../pages/Food";
import Result from "../../pages/Result";
import "./ContentBox.css";

const ContentBox = ({ activeSection, setActiveSection }) => {
  return (
    <div className="content-box">
      {activeSection === "Shopping" && <Shopping setActiveSection={setActiveSection} />}
      {activeSection === "Transport" && <Transport setActiveSection={setActiveSection} />}
      {activeSection === "Electricity" && <Electricity setActiveSection={setActiveSection} />}
      {activeSection === "Food" && <Food setActiveSection={setActiveSection} />}
      {activeSection === "Result" && <Result setActiveSection={setActiveSection} />}
    </div>
  );
};

export default ContentBox;
