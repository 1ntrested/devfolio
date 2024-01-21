import { Chrono } from "react-chrono";
import "./Experience.css"
import { Button } from "@mui/material";
const x="https://youtu.be/gY5sGvq-8h8?si=_N67ThFllOKvw_on";
const items = [
  {
    title: "",
    url: "",
    cardSubtitle: "Learn react",
    cardDetailedText: "",
    media: {
      type: "IMAGE",
      source: {
        url: "http://res.cloudinary.com/dfug2hsvu/image/upload/v1705755644/a2cy4nbnbio23gx8ongs.png",
      }
    }
  },  
  {
    title: "",
    url: "",
    cardSubtitle: "Learn React-Router-dom",
    cardDetailedText: "",
    media: {
      type: "IMAGE",
      source: {
        url: "http://res.cloudinary.com/dfug2hsvu/image/upload/v1705768777/seutpp6iwiati4rx7e5o.webp"
      }
    }
  }, 
  {
    title: "",
    url: "",
    cardSubtitle: "MUI",
    cardDetailedText: "",
    media: {
      type: "IMAGE",
      source: {
        url: "http://res.cloudinary.com/dfug2hsvu/image/upload/v1705772447/bomnznz79clknh8vwyqn.png"
      }
    }
  },
  {
    title: "",
    url: "",
    cardSubtitle: "Nodejs",
    cardDetailedText: "",
    media: {
      type: "IMAGE",
      source: {
        url: "http://res.cloudinary.com/dfug2hsvu/image/upload/v1705772940/zrkverppdil3sh9wuifu.png"
      }
    }
  }
];
const VerticalAlternatingTimeline = () => {
  return (
    <Chrono allowDynamicUpdate={true} className="chrono-style"
    cardWidth={300} items={items} mode="VERTICAL_ALTERNATING"
    slideItemDuration={1000} 
    slideShow={true} borderLessCards={true}
    fontSizes={{
      cardSubtitle: '2rem', cardText: '1.5rem'
    }}
  />
  );
};

export default VerticalAlternatingTimeline;