import { useMutation } from "react-query";

import * as apiClient from "../api-client";

import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../hooks/useAppContext";

export default function AddHotel() {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel Saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error Saving Hotel", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
}
