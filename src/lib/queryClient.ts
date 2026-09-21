import { QueryClient } from "@tanstack/react-query";
import { getDoctors } from "../Api/doctors.api";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

void queryClient.prefetchQuery({
  queryKey: ["doctors"],
  queryFn: getDoctors,
});
