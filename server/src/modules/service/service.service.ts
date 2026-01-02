import ServiceModel from './service.model';
import { IService } from './service.interface';
import CustomError from '../../errors/customError';

class ServiceService {
  async create(data: Partial<IService>) {
    try {
      const result = await ServiceModel.create(data);
      return result;
    } catch (error) {
      throw new CustomError(400, 'Service creation failed');
    }
  }

  async getAll() {
    try {
      const result = await ServiceModel.find().sort({ createdAt: -1 });
      return result;
    } catch (error) {
      throw new CustomError(400, 'Failed to fetch services');
    }
  }

  async getById(id: string) {
    try {
      const result = await ServiceModel.findById(id);
      if (!result) {
        throw new CustomError(404, 'Service not found');
      }
      return result;
    } catch (error: any) {
      throw new CustomError(error.statusCode || 400, error.message || 'Failed to fetch service');
    }
  }

  async update(id: string, data: Partial<IService>) {
    try {
      const result = await ServiceModel.findByIdAndUpdate(id, data, { 
        new: true,
        runValidators: true 
      });
      
      if (!result) {
        throw new CustomError(404, 'Service not found');
      }
      
      return result;
    } catch (error: any) {
      throw new CustomError(error.statusCode || 400, error.message || 'Service update failed');
    }
  }

  async delete(id: string) {
    try {
      const result = await ServiceModel.findByIdAndDelete(id);
      
      if (!result) {
        throw new CustomError(404, 'Service not found');
      }
      
      return result;
    } catch (error: any) {
      throw new CustomError(error.statusCode || 400, error.message || 'Service deletion failed');
    }
  }
}

const serviceService = new ServiceService();
export default serviceService;