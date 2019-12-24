import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-tutorial-841e8.firebaseio.com/"
});

export default instance;
