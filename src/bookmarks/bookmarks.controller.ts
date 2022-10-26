import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { BookmarksService } from './bookmarks.service';
import { BookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarksController {
  constructor(private service: BookmarksService) {}
  @Get('/')
  getBookMarks(@GetUser() user: User) {
    return this.service.getBookMarks(user);
  }

  @Post('/create')
  createBookMark(@Body() dto: BookmarkDto, @GetUser() user: User) {
    return this.service.createBookMark(dto, user);
  }

  @Get('/:id')
  getBookMark(@Param('id', new ParseIntPipe()) id, @GetUser() user: User) {
    return this.service.getBookMark(id, user);
  }

  @Put('/:id')
  updateBookMark(
    @Param('id', new ParseIntPipe()) id,
    @GetUser() user: User,
    @Body() dto: BookmarkDto,
  ) {
    return this.service.updateBookMark(id, user, dto);
  }

  @Delete('/:id')
  deleteBookMark(@Param('id', new ParseIntPipe()) id, @GetUser() user: User) {
    return this.service.deleteBookMark(id, user);
  }
}
