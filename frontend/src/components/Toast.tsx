import { useEffect } from "react";

interface IToastProps {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: IToastProps) {
  useEffect(() => {
    const timerId = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timerId);
    };
  }, [onClose]);

  return (
    <div
      className={`"fixed top-4 right-4 z-50 p-4 rounded-md bg-${
        type === "SUCCESS" ? "green" : "red"
      }-600 text-white max-w-md"`}
    >
      <div className="flex justify-center items-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
}
