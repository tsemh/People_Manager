import { Module } from '@nestjs/common';
import { PeopleController } from './Controller/people.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './Module/user.module';
import { PeopleModule } from './Module/people.module';
import { AddressModule } from './Module/address.module';
import { AddressController } from './Controller/address.controller';
import { UserController } from './Controller/user.controller';

@Module({
  imports: [
    AddressModule,
    PeopleModule,
    UserModule,
    TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db',
    entities: [__dirname = '/**/*.entity{.ts,.js'],
    synchronize: true
  })
],
  controllers: [
    PeopleController, 
    AddressController, 
    UserController],
  providers: [],
})
export class AppModule {}
