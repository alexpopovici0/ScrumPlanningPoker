import firebase from "./firebase";
import Cookies from "js-cookie";

export default function didfinish(value) {
  const user = Cookies.get("username");
  const room = Cookies.get("yourroom");

  firebase
    .database()
    .ref(room + "/users/" + user + "/didfinish")
    .set(value);
}
