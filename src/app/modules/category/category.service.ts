import { Category } from '@prisma/client'
import prisma from '../../../shared/prisma'

const createCategory = async (payload: Category): Promise<Category> => {
  const category = await prisma.category.create({
    data: payload
  })
  return category
}
const getAllCategory = async (): Promise<Category[]> => {
  const categories = await prisma.category.findMany()
  return categories
}
const getSingleCategory = async (id: string): Promise<Category | null> => {
  const category = await prisma.category.findUnique({
    where: {
      id: id
    },
    include: {
      books: true
    }
  })
  return category
}
const updateCategory = async (
  id: string,
  payload: Partial<Category>
): Promise<Category | null> => {
  const category = await prisma.category.update({
    where: {
      id: id
    },
    data: payload
  })
  return category
}
const deleteCategory = async (id: string): Promise<Category | null> => {
  const category = await prisma.category.delete({
    where: {
      id: id
    }
  })

  return category
}
export const categoryService = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory
}
