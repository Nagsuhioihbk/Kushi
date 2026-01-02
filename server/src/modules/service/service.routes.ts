// import { Router } from 'express';
// import serviceController from './service.controller';
// import validateRequest from '../../middlewares/validateRequest';
// import { z } from 'zod';

// const serviceRoute = Router();

// // Define schemas directly in routes file
// const subServiceSchema = z.object({
//   subServiceName: z.string(),
//   frequency: z.string(),
//   plannedCount: z.number().min(1)
// });

// const serviceGroupSchema = z.object({
//   mainService: z.string(),
//   subServices: z.array(subServiceSchema).min(1)
// });

// const createServiceSchema = z.object({
//   clientName: z.string(),
//   gstPercentage: z.number().min(0).max(28),
//   billingType: z.string(),
//   billingAddress: z.string(),
//   workAddress: z.string(),
//   serviceStartDate: z.string().or(z.date()),
//   serviceEndDate: z.string().or(z.date()),
//   services: z.array(serviceGroupSchema).min(1)
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

// serviceRoute.post('/', validateRequest(createServiceSchema), serviceController.create);
// serviceRoute.get('/', serviceController.getAll);
// serviceRoute.get('/:id', serviceController.getById);
// serviceRoute.patch('/:id', validateRequest(updateServiceSchema), serviceController.update);
// serviceRoute.delete('/:id', serviceController.delete);

// export default serviceRoute;


import { Router } from 'express';
import serviceController from './service.controller';
import validateRequest from '../../middlewares/validateRequest';
import { z } from 'zod';

const serviceRoute = Router();

// Define schemas directly in routes file
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
  plannedCount: z.number().min(1),
  visits: z.array(visitSchema).default([]),
  extraServices: z.array(extraServiceSchema).default([])
});

const serviceGroupSchema = z.object({
  mainService: z.string(),
  subServices: z.array(subServiceSchema).min(1)
});

const createServiceSchema = z.object({
  clientName: z.string(),
  gstPercentage: z.number().min(0).max(28),
  billingType: z.string(),
  billingAddress: z.string(),
  workAddress: z.string(),
  serviceStartDate: z.string().or(z.date()),
  serviceEndDate: z.string().or(z.date()),
  services: z.array(serviceGroupSchema).min(1)
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

serviceRoute.post('/', validateRequest(createServiceSchema), serviceController.create);
serviceRoute.get('/', serviceController.getAll);
serviceRoute.get('/:id', serviceController.getById);
serviceRoute.patch('/:id', validateRequest(updateServiceSchema), serviceController.update);
serviceRoute.delete('/:id', serviceController.delete);

export default serviceRoute;