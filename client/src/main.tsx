import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Custom styles for material icons and fonts
const style = document.createElement('style');
style.textContent = `
  body {
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  .truncate-address {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 120px;
    display: inline-block;
    vertical-align: middle;
  }
  
  @media (min-width: 768px) {
    .truncate-address {
      max-width: 220px;
    }
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
