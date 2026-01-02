// import { z } from 'zod';

// const subServiceSchema = z.object({
//   subServiceName: z.string(),
//   frequency: z.string(),
//   plannedCount: z.number().min(1, { message: 'Must be greater than 1!' })
// });

// const serviceGroupSchema = z.object({
//   mainService: z.string(),
//   subServices: z.array(subServiceSchema).min(1, { message: 'At least one sub-service is required!' })
// });

// const createServiceSchema = z.object({
//   clientName: z.string(),
//   gstPercentage: z.number().min(0).max(28, { message: 'GST must be between 0 and 28!' }),
//   billingType: z.string(),
//   billingAddress: z.string(),
//   workAddress: z.string(),
//   serviceStartDate: z.string().or(z.date()),
//   serviceEndDate: z.string().or(z.date()),
//   services: z.array(serviceGroupSchema).min(1, { message: 'At least one service is required!' })
// });

// const updateServiceSchema = z.object({
//   clientName: z.string().optional(),
//   gstPercentage: z.number().min(0).max(28).optional(),
//   billingType: z.string().optional(),
//   billingAddress: z.string().optional(),
//   workAddress: z.string().optional(),
//   serviceStartDate: z.string().or(z.date()).optional(),
//   serviceEndDate: z.string().or(z.date()).optional(),
//   services: z.array(serviceGroupSchema).optional()
// });

// const serviceValidator = { createServiceSchema, updateServiceSchema };
// export default serviceValidator;





import { z } from 'zod';

const visitSchema = z.object({
  visitNumber: z.number(),
  date: z.string().or(z.date()).nullable(),
  person: z.string(),
  completed: z.boolean()
});

const extraServiceSchema = z.object({
  description: z.string(),
  date: z.string().or(z.date()).nullable(),
  person: z.string()
});

const subServiceSchema = z.object({
  subServiceName: z.string(),
  frequency: z.string(),
  plannedCount: z.number().min(1, { message: 'Must be greater than 1!' }),
  visits: z.array(visitSchema).default([]),
  extraServices: z.array(extraServiceSchema).default([])
});

const serviceGroupSchema = z.object({
  mainService: z.string(),
  subServices: z.array(subServiceSchema).min(1, { message: 'At least one sub-service is required!' })
});

const createServiceSchema = z.object({
  clientName: z.string(),
  gstPercentage: z.number().min(0).max(28, { message: 'GST must be between 0 and 28!' }),
  billingType: z.string(),
  billingAddress: z.string(),
  workAddress: z.string(),
  serviceStartDate: z.string().or(z.date()),
  serviceEndDate: z.string().or(z.date()),
  services: z.array(serviceGroupSchema).min(1, { message: 'At least one service is required!' })
});

const updateServiceSchema = z.object({
  clientName: z.string().optional(),
  gstPercentage: z.number().min(0).max(28).optional(),
  billingType: z.string().optional(),
  billingAddress: z.string().optional(),
  workAddress: z.string().optional(),
  serviceStartDate: z.string().or(z.date()).optional(),
  serviceEndDate: z.string().or(z.date()).optional(),
  services: z.array(serviceGroupSchema).optional()
});

const serviceValidator = { createServiceSchema, updateServiceSchema };
export default serviceValidator;