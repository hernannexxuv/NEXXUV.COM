import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BookingRepository, BookingData } from './api';

export function useCreateBooking() {
  return useMutation({
    mutationFn: (data: BookingData) => BookingRepository.save(data),
  });
}

export function useBookings() {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: () => BookingRepository.getAll(),
  });
}

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      BookingRepository.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}
