import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export const resolvers = {
  Query: {
    users: async () => {
      return await prisma.user.findMany({
        include: {
          posts: true,
        },
      })
    },

    user: async (_: any, { id }: { id: string }) => {
      return await prisma.user.findUnique({
        where: { id },
        include: {
          posts: true,
        },
      })
    },

    posts: async () => {
      return await prisma.post.findMany({
        include: {
          author: true,
        },
      })
    },

    post: async (_: any, { id }: { id: string }) => {
      return await prisma.post.findUnique({
        where: { id },
        include: {
          author: true,
        },
      })
    },

    me: async (_: any, __: any, context: any) => {
      // This would be implemented with authentication middleware
      return null
    },

    characters: async (_: any, args: any) => {
      const { name, species, status, gender, origin, orderBy = 'name', order = 'asc' } = args;
      return prisma.character.findMany({
        where: {
          isDeleted: false,
          ...(name && { name: { contains: name, mode: 'insensitive' } }),
          ...(species && { species }),
          ...(status && { status }),
          ...(gender && { gender }),
          ...(origin && { origin }),
        },
        orderBy: {
          [orderBy]: order,
        },
        include: { comments: true },
      });
    },

    character: async (_: any, { id }: { id: string }) => {
      return prisma.character.findUnique({
        where: { id },
        include: { comments: true },
      });
    },
  },

  Mutation: {
    createUser: async (_: any, { input }: { input: any }) => {
      const hashedPassword = await bcrypt.hash(input.password, 10)
      
      return await prisma.user.create({
        data: {
          email: input.email,
          name: input.name,
          password: hashedPassword,
        },
        include: {
          posts: true,
        },
      })
    },

    updateUser: async (_: any, { id, input }: { id: string; input: any }) => {
      const updateData: any = {}
      
      if (input.email) updateData.email = input.email
      if (input.name) updateData.name = input.name
      if (input.password) {
        updateData.password = await bcrypt.hash(input.password, 10)
      }

      return await prisma.user.update({
        where: { id },
        data: updateData,
        include: {
          posts: true,
        },
      })
    },

    deleteUser: async (_: any, { id }: { id: string }) => {
      await prisma.user.delete({
        where: { id },
      })
      return true
    },

    createPost: async (_: any, { input }: { input: any }, context: any) => {
      // This would check for authenticated user
      const authorId = 'temp-user-id' // Replace with actual user ID from context
      
      return await prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          published: input.published || false,
          authorId,
        },
        include: {
          author: true,
        },
      })
    },

    updatePost: async (_: any, { id, input }: { id: string; input: any }) => {
      const updateData: any = {}
      
      if (input.title) updateData.title = input.title
      if (input.content !== undefined) updateData.content = input.content
      if (input.published !== undefined) updateData.published = input.published

      return await prisma.post.update({
        where: { id },
        data: updateData,
        include: {
          author: true,
        },
      })
    },

    deletePost: async (_: any, { id }: { id: string }) => {
      await prisma.post.delete({
        where: { id },
      })
      return true
    },

    login: async (_: any, { email, password }: { email: string; password: string }) => {
      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        throw new Error('User not found')
      }

      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) {
        throw new Error('Invalid password')
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '24h' }
      )

      return {
        token,
        user: {
          ...user,
          password: undefined, // Don't return password
        },
      }
    },

    register: async (_: any, { input }: { input: any }) => {
      const existingUser = await prisma.user.findUnique({
        where: { email: input.email },
      })

      if (existingUser) {
        throw new Error('User already exists')
      }

      const hashedPassword = await bcrypt.hash(input.password, 10)
      
      const user = await prisma.user.create({
        data: {
          email: input.email,
          name: input.name,
          password: hashedPassword,
        },
      })

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '24h' }
      )

      return {
        token,
        user: {
          ...user,
          password: undefined, // Don't return password
        },
      }
    },

    toggleStarCharacter: async (_: any, { id }: { id: string }) => {
      const character = await prisma.character.findUnique({ where: { id } });
      if (!character) throw new Error('Character not found');
      return prisma.character.update({
        where: { id },
        data: { isStarred: !character.isStarred },
      });
    },

    addComment: async (_: any, { characterId, text }: { characterId: string; text: string }) => {
      return prisma.comment.create({
        data: {
          characterId,
          text,
        },
      });
    },
  },

  Character: {
    comments: (parent: any) => {
      return prisma.comment.findMany({
        where: { characterId: parent.id },
        orderBy: { createdAt: 'desc' },
      });
    },
  },
} 