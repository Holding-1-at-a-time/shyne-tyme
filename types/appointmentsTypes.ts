/**
    * @description      : 
    * @author           : Owner
    * @group            : 
    * @created          : 20/10/2024 - 14:08:29
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 20/10/2024
    * - Author          : Owner
    * - Modification    : 
**/
export type Appointment = {
  serviceDuration: number;
  location: string;
  clientName: string;
  appointmentDate: Date;
  isConfirmed: boolean;
  serviceType: string;
  notes: string;
  contactNumber: string;
  isCancelled: boolean;
  serviceId: string;
  userId: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  vehicleId: string;
  vehiclePlate: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleColor: string;
  vehicleYear: number;
  vehicleVIN: string;
  vehicleLicensePlate: string;
  vehicleBodyType: string;
};