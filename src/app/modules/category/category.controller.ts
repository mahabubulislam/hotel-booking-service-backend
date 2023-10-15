import { Category } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { categoryService } from './category.service'

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body
  const result = await categoryService.createCategory(payload)
  sendResponse<Category>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category created successfully',
    data: result
  })
})
const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.getAllCategory()
  sendResponse<Category[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Categories retrieved successfully',
    data: result
  })
})
const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await categoryService.getSingleCategory(id)
  sendResponse<Category>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category retrieved successfully',
    data: result
  })
})
const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const payload = req.body
  const result = await categoryService.updateCategory(id, payload)
  sendResponse<Category>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category updated successfully',
    data: result
  })
})
const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await categoryService.deleteCategory(id)
  sendResponse<Category>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category deleted successfully',
    data: result
  })
})
export const categoryController = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory
}
