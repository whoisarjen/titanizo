export interface BlogPost {
  slug: string
  title: string
  description: string
  content: string
  image: string
  imageAlt: string
  author: string
  authorAvatar: string
  publishedAt: string
  updatedAt: string
  readingTime: number
  tags: string[]
}

export interface Author {
  name: string
  avatar: string
  bio: string
}
