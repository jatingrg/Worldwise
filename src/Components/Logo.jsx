import { Link } from "react-router-dom";
import styles from "./Logo.module.css";
import Icon from "../assets/icon.png"
function Logo() {
  return 
  
  <Link to="/">
  
    <img src={Icon} alt="WorldWise logo" className={styles.logo} />
    </Link>
}

export default Logo;
