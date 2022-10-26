import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookmarkDto } from './dto';

@Injectable()
export class BookmarksService {
  constructor(private prisma: PrismaService) {}
  async createBookMark(dto: BookmarkDto, user: User) {
    const bookmark = await this.prisma.bookMark
      .create({
        data: {
          title: dto.title,
          description: dto.description,
          link: dto.link,
          userId: user.id,
        },
      })
      .catch((error) => {
        throw error;
      });

    delete bookmark.userId;
    return {
      bookmark,
      message: 'Bookmark created successfully',
    };
  }

  async getBookMarks(user: User) {
    const bookmarks = await this.prisma.bookMark
      .findMany({
        where: {
          userId: user.id,
        },
        orderBy: {
          id: 'asc',
        },
      })
      .catch((error) => {
        throw error;
      });

    bookmarks.forEach((e) => {
      delete e.userId;
    });

    return {
      message: 'All bookmarks fetched succesfully!',
      bookmarks,
    };
  }

  async getBookMark(id: number, user: User) {
    const bookmark = await this.prisma.bookMark.findFirst({
      where: { id: id, userId: user.id },
    });
    if (!bookmark) {
      throw new NotFoundException('No bookmark with that ID found!');
    }

    delete bookmark.userId;
    return {
      message: `Bookmark with ID ${id} fetched successfully`,
      bookmark,
    };
  }

  async updateBookMark(id: number, user: User, dto: BookmarkDto) {
    const bookmark = await this.prisma.bookMark.findFirst({
      where: {
        id: id,
        userId: user.id,
      },
    });
    if (!bookmark) {
      throw new NotFoundException('No bookmark with that ID found!');
    }

    await this.prisma.bookMark.update({
      where: {
        id: id,
      },
      data: {
        title: dto.title,
        description: dto.description,
        link: dto.link,
      },
    });
    delete bookmark.userId;
    return {
      message: `Bookmark with ID ${id} updated successfully!`,
      bookmark,
    };
  }

  async deleteBookMark(id: number, user: User) {
    const bookmark = await this.prisma.bookMark.findFirst({
      where: {
        id: id,
        userId: user.id,
      },
    });

    if (!bookmark) {
      throw new NotFoundException('No bookmark with that ID found!');
    }

    await this.prisma.bookMark.deleteMany({
      where: {
        id: id,
        userId: user.id,
      },
    });

    delete bookmark.userId;

    return {
      message: `Bookmark with ID ${id} deleted successfully!`,
      bookmark,
    };
  }
}
