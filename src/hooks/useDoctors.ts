import { useQuery } from "@tanstack/react-query";
import { getDoctors } from "../Api/doctors.api";

export const useDoctors = () =>
  useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });
