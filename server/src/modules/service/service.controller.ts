import httpStatus from 'http-status';
import asyncHandler from '../../lib/asyncHandler';
import sendResponse from '../../lib/sendResponse';
import serviceService from './service.service';

class ServiceController {
  /**
   * Create new service
   */
  create = asyncHandler(async (req, res) => {
    const result = await serviceService.create(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Service created successfully!',
      data: result
    });
  });

  /**
   * Get all services
   */
  getAll = asyncHandler(async (req, res) => {
    const result = await serviceService.getAll();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'All services retrieved successfully',
      data: result
    });
  });

  /**
   * Get single service by ID
   */
  getById = asyncHandler(async (req, res) => {
    const result = await serviceService.getById(req.params.id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Service fetched successfully!',
      data: result
    });
  });

  /**
   * Update service
   */
  update = asyncHandler(async (req, res) => {
    const result = await serviceService.update(req.params.id, req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Service updated successfully!',
      data: result
    });
  });

  /**
   * Delete service
   */
  delete = asyncHandler(async (req, res) => {
    await serviceService.delete(req.params.id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Service deleted successfully!'
    });
  });
}

const serviceController = new ServiceController();
export default serviceController;