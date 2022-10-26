import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategy';
import { BookmarksController } from './bookmarks.controller';
import { BookmarksService } from './bookmarks.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [BookmarksController],
  providers: [BookmarksService, JwtStrategy],
})
export class BookmarksModule {}
