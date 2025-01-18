import { useFormContext } from "react-hook-form";

import { hotelTypes } from "../../config/hotel-options-config";

import { IHotelFormData } from "./ManageHotelForm";

export default function TypeSection() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<IHotelFormData>();

  const typewatch = watch("type");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((type) => (
          <label
            className={`cursor-pointer bg-${
              typewatch === type ? "blue" : "gray"
            }-300 text-sm rounded-full px-4 py-2 font-semibold`}
          >
            <input
              type="radio"
              value={type}
              {...register("type", {
                required: "This field is required",
              })}
              className="hidden"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm font-bold">
          {errors.type.message}
        </span>
      )}
    </div>
  );
}
