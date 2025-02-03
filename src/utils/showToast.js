import { Slide, toast } from "react-toastify";
import SessionExpiredToast from "../components/UserComponents/SessionExpiredToast";

export default function showToast(
  message,
  type,
  options = { autoClose: 3000, hideProgressBar: true, pauseOnFocusLoss: false }
) {
  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "warn":
      toast.warn(message, options);
      break;

    case "info":
      toast.info(message, options);
      break;

    case "dark":
      toast.dark(message, options);
      break;
    case "custom": {
      toast(<SessionExpiredToast />, {
        autoClose: 10 * 1000,
        hideProgressBar: true,
        pauseOnFocusLoss: false,
        position: "top-center",
        transition: Slide,
      });
      break;
    }
    default:
      toast.success(message, options);
      break;
  }
}
