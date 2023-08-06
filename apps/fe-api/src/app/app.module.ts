import { Module} from '@nestjs/common'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { UserModule } from "./modules/crm/user/user.module"
import { GraphQLModule } from '@nestjs/graphql';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { GeoModule } from "./modules/crm/geo/geo.module";
import { AccountModule } from "./modules/crm/account/account.module";
import { SearchModule } from './modules/cms/search/search.module';
import { StatisticsModule } from './modules/tms/statistics/statistics.module';
import { ContentModule } from './modules/cms/content/data/content.module';
import { CategoryModule } from './modules/cms/category/category.module';
import { ProductModule } from './modules/cms/category/product.module';
import { SectionsModule } from './modules/tms/section/section.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => {
        return {
          cors: {
            origin: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            allowedHeaders: "Content-Type,Accept,Authorization,Access-Control-Allow-Origin"
          },
          context: ({req}) => {
            return {req};
          },
          typePaths: ['./**/*.gql'],
          playground: true,
          installSubscriptionHandlers: true
        }
      }
    }),
    UserModule,
    GeoModule,
    AccountModule,
    SearchModule,
    StatisticsModule,
    ContentModule,
    CategoryModule,
    ProductModule,
    SectionsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule {}
