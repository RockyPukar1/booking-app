import { useQuery } from "react-query";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import { useSearchContext } from "../hooks/useSearchContext";
import * as apiClient from "../api-client";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Booking() {
  const search = useSearchContext();
  const { hotelId } = useParams();

  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  const { data: hotel } = useQuery(
    "fetchHotelByID",
    () => apiClient.fetchOtherHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 60 * 24);
      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />
    </div>
  );
}
