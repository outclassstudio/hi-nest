import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';

//데코레이터 : 클래스에 함수를 추가함
@Module({
  imports: [MoviesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
