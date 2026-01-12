export interface Category {
  id: string
  name: string
  slug: string
  parentId: string | null
}

export interface Article {
  id: string
  keyword: string
  slug: string
  title: string | null
  description: string | null
  content: string | null
  categoryId: string
  category?: Category
  isPublished: boolean
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  path?: string
}
