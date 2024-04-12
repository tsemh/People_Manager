// app.module.ts
import { Module } from '@nestjs/common';
import { UserModule } from './module/user.module';
import { PeopleModule } from './module/people.module';
import { AddressModule } from './module/address.module';
import { DatabaseModule } from './module/database.module';

@Module({
  imports: [
    AddressModule,
    PeopleModule,
    UserModule,
    DatabaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
