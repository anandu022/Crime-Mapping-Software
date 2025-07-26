// import { Typography, Container, Box } from "@mui/material";
// import React from "react";

// const CrimeRadar = () => {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "50vh",
//         background: "linear-gradient(to bottom, #d1c4e9, #b39ddb)",
//         color: "white",
//         textAlign: "left",
//         padding: "20px",
//       }}
//     >
//       <Container maxWidth="sm">
//         <Typography
//           variant="h2"
//           sx={{
//             color: "white",
//             fontWeight: "bold",
//             letterSpacing: "2px",
//             marginBottom: "20px",
//           }}
//         >
//           Crime Radar
//         </Typography>
//         <Typography
//           variant="body1"
//           sx={{
//             fontSize: "18px",
//             lineHeight: "1.6",
//             opacity: 0.9,
//           }}
//         >
//           Crime Radar is a real-time crime mapping platform designed to enhance public safety by providing up-to-date crime reports.
//           Our interactive map highlights crime hotspots, allowing users to stay informed and take necessary precautions.
//           Verified users can report crimes instantly, where the officials can view the crime in real time and act accordingly.
//         </Typography>
//         <Typography
//           variant="body1"
//           sx={{
//             fontSize: "18px",
//             lineHeight: "1.6",
//             opacity: 0.9,
//             marginTop:"10px"
//           }}
//         >
//           Our main aim is to create a safe and secure environment for peaceful life.
//           Stay aware, stay safe, and help make your community a better place.
//         </Typography>
//       </Container>
//     </Box>
//   );
// };

// export default CrimeRadar;

import { Typography, Container, Box } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import React from "react";

const CrimeRadar = () => {
  return (
    <>
      {/* Section 1 - Crime Zone Image */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
          position: "relative",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809')", // Replace with your preferred image
          backgroundSize: "cover",
          backgroundPosition: "center",
          textAlign: "center",
          padding: "20px",
        }}
      >
        {/* Dark Overlay for Better Text Visibility */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay to enhance text visibility
            zIndex: 1,
          }}
        />
        {/* Crime Zone Text */}
        <Typography
          variant="h2"
          sx={{
            position: "relative",
            zIndex: 2,
            fontWeight: "bold",
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontSize: { xs: "40px", sm: "50px", md: "60px" },
            color: "white", // White text on top of the image
          }}
        >
          Crime Radar
        </Typography>
      </Box>

      {/* Section 2 - About Us */}
      <Box
        sx={{
          padding: "50px 20px",
          textAlign: "center",
        }}
      >
        <Container maxWidth="sm">
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            About Us
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "18px",
              lineHeight: "1.6",
              opacity: 0.9,
            }}
          >
            Crime Radar is a real-time crime mapping platform designed to enhance
            public safety by providing up-to-date crime reports. Our interactive
            map highlights crime hotspots, allowing users to stay informed and
            take necessary precautions. Verified users can report crimes
            instantly, where officials can view the crime in real time and act
            accordingly.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "18px",
              lineHeight: "1.6",
              opacity: 0.9,
              marginTop: "10px",
            }}
          >
            Our main aim is to create a safe and secure environment for peaceful
            life. Stay aware, stay safe, and help make your community a better
            place.
          </Typography>
        </Container>
      </Box>

      {/* Section 3 - Contact Us (Dark Theme) */}
      <Box
        sx={{
          backgroundColor: "#555555", // Dark background
          padding: "50px 20px",
          textAlign: "center",
        }}
      >
        <Container maxWidth="sm">
          <Typography
            variant="h3"
            sx={{
              color: "white", // White text in dark theme
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Contact Us
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            {/* Email Section */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <EmailIcon sx={{ color: "white", fontSize: "28px" }} />
              <Typography
                variant="body1"
                sx={{
                  fontSize: "18px",
                  color: "white",
                }}
              >
                amalvbabu369@gmail.com
              </Typography>
            </Box>

            {/* Phone Section */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <PhoneIcon sx={{ color: "white", fontSize: "28px" }} />
              <Typography
                variant="body1"
                sx={{
                  fontSize: "18px",
                  color: "white",
                }}
              >
                +91 9778198974
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CrimeRadar;
