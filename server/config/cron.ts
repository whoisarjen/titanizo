import { type GenericService } from "@strapi/strapi/lib/core-api/service";
import fetch from "node-fetch";
import _ from "lodash";

type Product = {
  id: string;
  brand: string;
  producer: string;
  url: string;
  name: string;
  collection: string;
  finishes: string[];
  ean: string;
  cn: string;
  prices: {
    currency: "PLN";
    netPrice: number;
    grossPrice: number;
    vat: number;
    hasPromotion: boolean;
  };
  categories: any[];
  images: any[];
  files: any[];
  description: string;
  package: object;
  isDesigned: boolean;
  properties: any[];
  features: any[];
  warranty: number;
  recommendedProducts: string[];
};

type ProductParams = {
  name: string;
  manufacturer_id: string;
  manufacturer_net_price: number;
  manufacturer_gross_price: number;
  manufacturer_promotion_net_price?: number;
  manufacturer_promotion_gross_price?: number;
  vat: number;
  gross_price: number;
  net_price: number;
  promotion_price?: number;
  collection?: string;
  is_designed?: boolean;
  ean: string;
  cn?: string;
  description: string;
  warranty_in_months: number;
  subcategory?: number;
};

const createProduct = async (strapi: any, data: ProductParams) => {
  return new Promise(async (resolve, reject) => {
    try {
      const productService: GenericService = strapi.service(
        "api::product.product"
      );

      const response = await strapi.db.query("api::product.product").findOne({
        where: { ean: data.ean },
      });

      if (response) {
        const res = await productService.update(response.id, { data });
        resolve(res);
      } else {
        const res = await productService.create({ data });
        resolve(res);
      }
    } catch (err) {
      console.log({ err });
      reject(err);
    }
  });
};

const getOrCreate = async (strapi: any, where: string, params: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = _.omit(params, ["id"]);
      const service: GenericService = strapi.service(`api::${where}.${where}`);

      const response = await strapi.db.query(`api::${where}.${where}`).findOne({
        where: { name: data.name },
      });

      if (response) {
        resolve({
          ...data,
          ...response,
        });
        return;
      }

      const newObject = await service.create({
        data,
      });

      resolve({
        ...data,
        ...newObject,
      });
    } catch (err) {
      console.log({ err });
      reject(err);
    }
  });
};

export default {
  synchronizationDeante: {
    task: async ({ strapi }) => {
        console.log("Started synchronization with Deante")
      const response = await fetch(
        "https://api.deante.pl/api/products?key=deante-62e59625-50d9-470a-88e1-0d03585c7308"
      );
      const data: Product[] = await response.json();

      const allPossibleCategories = data.flatMap(({ categories }) =>
        categories.flatMap((category) => {
          const { name } = category;
          return name.split("/").map((word) => {
            return {
              ...category,
              name: name.substring(0, name.lastIndexOf(word) + word.length),
            };
          });
        })
      );

      const uniquePossibleCategories = _.uniqWith(
        allPossibleCategories,
        _.isEqual
      );

      const mainCategories = uniquePossibleCategories.filter(
        ({ name }) => name.length - name.replaceAll("/", "").length === 0
      );
      const categories = uniquePossibleCategories.filter(
        ({ name }) => name.length - name.replaceAll("/", "").length === 1
      );
      const subCategories = uniquePossibleCategories.filter(
        ({ name }) => name.length - name.replaceAll("/", "").length === 2
      );

      const mainCategoriesCreated: any[] = await Promise.all(
        mainCategories.map((mainCategory) =>
          getOrCreate(strapi, "main-category", {
            ...mainCategory,
            oryginalId: mainCategory.id,
          })
        )
      );

      const categoriesCreated: any[] = await Promise.all(
        categories.map((category) =>
          getOrCreate(strapi, "category", {
            ...category,
            oryginalId: category.id,
            name: category.name.substring(
              category.name.lastIndexOf("/") + 1,
              category.name.length
            ),
            main_category: mainCategoriesCreated.find(
              (mainCategory) =>
                mainCategory.oryginalId.toLowerCase() ===
                category.id
                  .substring(0, category.id.lastIndexOf("/"))
                  .toLowerCase()
            ).id,
          })
        )
      );

      const subCategoriesCreated: any[] = await Promise.all(
        subCategories.map((subcategory) => {
          console.log({ subcategory });
          return getOrCreate(strapi, "subcategory", {
            ...subcategory,
            oryginalId: subcategory.id,
            name: subcategory.name.substring(
              subcategory.name.lastIndexOf("/") + 1,
              subcategory.name.length
            ),
            category: categoriesCreated.find(
              (category) =>
                category.oryginalId.toLowerCase() ===
                subcategory.id
                  .substring(0, subcategory.id.lastIndexOf("/"))
                  .toLowerCase()
            ).id,
          });
        })
      );

      const productsToAdd = [];
      data.forEach(async (product, i) => {
        productsToAdd.push(product);
        console.log(`${i} from ${data.length}`);
        if (productsToAdd.length === 10 || i + 1 === data.length) {
          await Promise.all(
            productsToAdd.map((product) => {
              const subcategory = subCategoriesCreated.find(({ oryginalId }) =>
                product.categories.find(
                  (category) =>
                    category.id.toLowerCase() === oryginalId.toLowerCase()
                )
              )?.id;

              return createProduct(strapi, {
                name: product.name,
                manufacturer_id: product.id,
                manufacturer_net_price: product.prices.netPrice,
                manufacturer_gross_price: product.prices.grossPrice,
                vat: product.prices.vat,
                gross_price: product.prices.grossPrice,
                net_price: product.prices.netPrice,
                collection: product.collection,
                is_designed: product.isDesigned,
                ean: product.ean,
                cn: product.cn,
                description: product.description,
                warranty_in_months: product.warranty * 12,
                ...(!!subcategory ? { subcategory } : {}),
              });
            })
          );
        }
      });

      console.log("Finished synchronization with Deante", new Date().toISOString())
    },
    options: {
      rule: "30 * * * * *",
    },
  },
};
