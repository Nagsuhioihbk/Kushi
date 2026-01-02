// import mongoose, { Schema } from 'mongoose';
// import { IService } from './service.interface';

// const SubServiceSchema = new Schema(
//   {
//     subServiceName: { type: String, required: true },
//     frequency: { type: String, required: true },
//     plannedCount: { type: Number, required: true },
//   },
//   { _id: false }
// );

// const ServiceGroupSchema = new Schema(
//   {
//     mainService: { type: String, required: true },
//     subServices: { type: [SubServiceSchema], required: true },
//   },
//   { _id: false }
// );

// const ServiceSchema = new Schema<IService>(
//   {
//     clientName: { type: String, required: true },
//     gstPercentage: { type: Number, required: true },
//     billingType: { type: String, required: true },
//     billingAddress: { type: String, required: true },
//     workAddress: { type: String, required: true },
//     serviceStartDate: { type: Date, required: true },
//     serviceEndDate: { type: Date, required: true },
//     services: { type: [ServiceGroupSchema], required: true },
//   },
//   { timestamps: true }
// );

// export default mongoose.model<IService>('Service', ServiceSchema);



import mongoose, { Schema } from 'mongoose';
import { IService } from './service.interface';

const VisitSchema = new Schema(
  {
    visitNumber: { type: Number, required: true },
    date: { type: Date, default: null },
    person: { type: String, default: '' },
    completed: { type: Boolean, default: false },
  },
  { _id: false }
);

const ExtraServiceSchema = new Schema(
  {
    description: { type: String, default: '' },
    date: { type: Date, default: null },
    person: { type: String, default: '' },
  },
  { _id: false }
);

const SubServiceSchema = new Schema(
  {
    subServiceName: { type: String, required: true },
    frequency: { type: String, required: true },
    plannedCount: { type: Number, required: true },
    visits: { type: [VisitSchema], default: [] },
    extraServices: { type: [ExtraServiceSchema], default: [] },
  },
  { _id: false }
);

const ServiceGroupSchema = new Schema(
  {
    mainService: { type: String, required: true },
    subServices: { type: [SubServiceSchema], required: true },
  },
  { _id: false }
);

const ServiceSchema = new Schema<IService>(
  {
    clientName: { type: String, required: true },
    gstPercentage: { type: Number, required: true },
    billingType: { type: String, required: true },
    billingAddress: { type: String, required: true },
    workAddress: { type: String, required: true },
    serviceStartDate: { type: Date, required: true },
    serviceEndDate: { type: Date, required: true },
    services: { type: [ServiceGroupSchema], required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IService>('Service', ServiceSchema);