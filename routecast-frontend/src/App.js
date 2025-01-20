import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Custom styles
import "animate.css"; // Animations
import { FaArrowUp } from "react-icons/fa"; // Back-to-top icon
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

function App() {
  const [message, setMessage] = useState("");
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    axios
      .get("/api") // Fetching backend response
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // Back to top button visibility
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Router>
      <Navbar /> {/* Navbar outside Routes */}
      <header className="hero">
        <div className="hero-overlay animate__animated animate__fadeIn">
          <h1 className="hero-title">RouteCast</h1>
          <p className="hero-subtitle">
            Real-time weather updates for smarter travel planning.
          </p>
          <button className="btn btn-light hero-button">Get Started</button>
        </div>
      </header>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
      <main className="container features mt-5">
        <h2 className="section-title">Features</h2>
        <div className="row mt-4">
          <div className="col-md-4 feature-card animate__animated animate__zoomIn">
            <i className="fas fa-cloud-sun feature-icon"></i>
            <h3>Real-Time Weather</h3>
            <p>
              Get live weather updates for your route and plan with confidence.
            </p>
          </div>
          <div className="col-md-4 feature-card animate__animated animate__zoomIn">
            <i className="fas fa-map-marked-alt feature-icon"></i>
            <h3>Interactive Maps</h3>
            <p>Plan your routes easily with interactive mapping tools.</p>
          </div>
          <div className="col-md-4 feature-card animate__animated animate__zoomIn">
            <i className="fas fa-bell feature-icon"></i>
            <h3>Weather Alerts</h3>
            <p>
              Stay safe with instant alerts for hazardous weather conditions.
            </p>
          </div>
        </div>
      </main>
      <footer className="footer bg-dark text-white text-center py-3 mt-5">
        <p>&copy; 2024 RouteCast. All rights reserved.</p>
        <p>
          Contact:{" "}
          <a href="mailto:support@routecast.com" className="text-primary">
            support@routecast.com
          </a>
        </p>
      </footer>
      {showTopButton && (
        <button className="back-to-top show" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </Router>
  );
}

export default App;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css"; // Custom styles
// import "animate.css"; // Animations
// import { FaArrowUp } from "react-icons/fa"; // Back-to-top icon
// import Navbar from "./components/Navbar";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import SignUp from "./components/SignUp";
// import SignIn from "./components/SignIn";

// function App() {
//   const [message, setMessage] = useState("");
//   const [showTopButton, setShowTopButton] = useState(false);

//   useEffect(() => {
//     axios
//       .get("/api") // Fetching backend response
//       .then((response) => {
//         setMessage(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });

//     // Back to top button visibility
//     window.addEventListener("scroll", () => {
//       if (window.scrollY > 300) {
//         setShowTopButton(true);
//       } else {
//         setShowTopButton(false);
//       }
//     });
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/Navbar" element={<Navbar />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/signin" element={<SignIn />} />
//         {/* Hero Section */}
//         <header className="hero">
//           <div className="hero-overlay animate__animated animate__fadeIn">
//             <h1 className="hero-title">RouteCast</h1>
//             <p className="hero-subtitle">
//               Real-time weather updates for smarter travel planning.
//             </p>
//             <button className="btn btn-light hero-button">Get Started</button>
//           </div>
//         </header>

//         {/* Features Section */}
//         <main className="container features mt-5">
//           <h2 className="section-title">Features</h2>
//           <div className="row mt-4">
//             <div className="col-md-4 feature-card animate__animated animate__zoomIn">
//               <i className="fas fa-cloud-sun feature-icon"></i>
//               <h3>Real-Time Weather</h3>
//               <p>
//                 Get live weather updates for your route and plan with
//                 confidence.
//               </p>
//             </div>
//             <div className="col-md-4 feature-card animate__animated animate__zoomIn">
//               <i className="fas fa-map-marked-alt feature-icon"></i>
//               <h3>Interactive Maps</h3>
//               <p>Plan your routes easily with interactive mapping tools.</p>
//             </div>
//             <div className="col-md-4 feature-card animate__animated animate__zoomIn">
//               <i className="fas fa-bell feature-icon"></i>
//               <h3>Weather Alerts</h3>
//               <p>
//                 Stay safe with instant alerts for hazardous weather conditions.
//               </p>
//             </div>
//           </div>
//         </main>

//         {/* Footer */}
//         <footer className="footer bg-dark text-white text-center py-3 mt-5">
//           <p>&copy; 2024 RouteCast. All rights reserved.</p>
//           <p>
//             Contact:{" "}
//             <a href="mailto:support@routecast.com" className="text-primary">
//               support@routecast.com
//             </a>
//           </p>
//         </footer>

//         {/* Back to Top Button */}
//         {showTopButton && (
//           <button className="back-to-top show" onClick={scrollToTop}>
//             <FaArrowUp />
//           </button>
//         )}
//       </Routes>
//     </Router>
//   );
// }

// export default App;
