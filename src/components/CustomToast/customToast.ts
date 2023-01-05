import { toast, ToastOptions } from "react-toastify";

export enum ToastType {
  DEFAULT,
  SUCCESS,
  WARNING,
  ERROR,
  INFO,
}

export default function customToast(type: ToastType, message: string) {
  const defaultProps: ToastOptions = {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "colored",
  };

  switch (type) {
    case ToastType.SUCCESS:
      return toast.success(message, defaultProps);

    case ToastType.INFO:
      return toast.info(message, defaultProps);

    case ToastType.WARNING:
      return toast.warning(message, defaultProps);

    case ToastType.ERROR:
      return toast.error(message, defaultProps);

    default:
      return toast(message, defaultProps);
  }
}
