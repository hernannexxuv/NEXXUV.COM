import { useMutation } from '@tanstack/react-query';
import { BookingRepository, BookingData } from './api';

export function useCreateBooking() {
  return useMutation({
    mutationFn: (data: BookingData) => BookingRepository.save(data),
  });
}
