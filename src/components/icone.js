import user from "../assets/icons/ant-design_user-outlined.svg";
import password from "../assets/icons/carbon_password.svg";
import enter from "../assets/icons/angle-right.svg";
import instagram from "../assets/icons/instagram.svg";
import facebook from "../assets/icons/facebook-f.svg";
import google from "../assets/icons/google.svg";
import menu from "../assets/icons/mdi_dots-vertical.svg";
import filter from "../assets/icons/mono-icons_filter.svg";
import addTask from "../assets/icons/ant-design_plus-outlined.svg";
import calendar from "../assets/icons/uil_schedule.svg";

const icone = {
  user,
  password,
  enter,
  instagram,
  facebook,
  google,
  menu,
  filter,
  addTask,
  calendar,
};

export default function Icone(props) {
  return <img src={icone[props.name]} alt="icone" className={props.twclass} />;
}
