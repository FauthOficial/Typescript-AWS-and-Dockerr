#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ProductsAppStack } from '../lib/productsApp-stack';
import { EcommerceApiStack } from '../lib/ecommerceAPI-stack';

const app = new cdk.App();



const env: cdk.Environment = {
  account: "637423448642", // replace with your AWS Account ID
  region: "us-east-1",     // replace with the desired AWS Region for deployment

}

const tags = {
  cost: "ECommerce",
  team: "SiecolaCode"
}

const productsAppStack = new ProductsAppStack(app, "ProductsApp", { 
  tags: tags,
  env: env
})

const  eCommerceApiStack = new EcommerceApiStack(app, "EcommerceApi", {
  productsFetchHandler:  productsAppStack.productsFetchHandler,
  tags: tags,
  env: env
})
eCommerceApiStack.addDependency(productsAppStack)