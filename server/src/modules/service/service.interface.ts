// import { Document } from 'mongoose';

// export interface ISubService {
//   subServiceName: string;
//   frequency: string;
//   plannedCount: number;
// }

// export interface IServiceGroup {
//   mainService: string;
//   subServices: ISubService[];
// }

// export interface IService extends Document {
//   clientName: string;
//   gstPercentage: number;
//   billingType: string;
//   billingAddress: string;
//   workAddress: string;
//   serviceStartDate: Date;
//   serviceEndDate: Date;
//   services: IServiceGroup[];
//   createdAt: Date;
//   updatedAt: Date;
// }


import { Document } from 'mongoose';

export interface IVisit {
  visitNumber: number;
  date: Date | null;
  person: string;
  completed: boolean;
}

export interface IExtraService {
  description: string;
  date: Date | null;
  person: string;
}

export interface ISubService {
  subServiceName: string;
  frequency: string;
  plannedCount: number;
  visits: IVisit[];
  extraServices: IExtraService[];
}

export interface IServiceGroup {
  mainService: string;
  subServices: ISubService[];
}

export interface IService extends Document {
  clientName: string;
  gstPercentage: number;
  billingType: string;
  billingAddress: string;
  workAddress: string;
  serviceStartDate: Date;
  serviceEndDate: Date;
  services: IServiceGroup[];
  createdAt: Date;
  updatedAt: Date;
}
