import { type GenericService } from "@strapi/strapi/lib/core-api/service";
import fetch from "node-fetch";
import _ from "lodash";
import FormData from "form-data";
import axios from "axios";

const TOKEN =
  "dbb424a16e30abd6c7ddc60b5a314263b659df5e401fa9f358ffa0857241f9e65498dcb3a36e9c9304452ed7ddc6e736f186b67cad1fe22fb3112b40f6d440611888d24bf5e57e00462ef376aa6eb322fac86fcf692d525380e64a393c1efcbad48f5a651e5767a54e08a48ae9a769fd136c41595dcae01a25f562f363f151bd";

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
  description: string;
  package: {
    height: {
      value: number;
    };
    width: {
      value: number;
    };
    depth: {
      value: number;
    };
    weight: {
      value: number;
    };
  };
  isDesigned: boolean;
  properties: any[];
  warranty: number;
  recommendedProducts: string[];
  images: {
    src: string;
    type: string;
  }[];
  files: {
    src: string;
    type: string;
  }[];
  features: any[];
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
  subcategories: number[];
  recommendedProducts: string[];
  images: {
    src: string;
    type: string;
  }[];
  files: {
    src: string;
    type: string;
  }[];
  package_height_in_mm: number;
  package_weight_in_g: number;
  package_depth_in_mm: number;
  package_width_in_mm: number;
  features: any[];
  properties: any[];
  finishes: any[];
  manufacturer_url: string;
  source: any;
};

const createOrUpdateProduct = async (strapi: any, params: ProductParams) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = _.omit(params, ["id"]);
      const productService: GenericService = strapi.service(
        "api::product.product"
      );

      const response = await strapi.db.query("api::product.product").findOne({
        where: { ean: data.ean },
      });

      if (response) {
        const recommendedProducts = await Promise.all(
          data.recommendedProducts.map((manufacturer_id) => {
            return strapi.db.query("api::product.product").findOne({
              where: { manufacturer_id },
            });
          })
        );

        const res = await productService.update(response.id, {
          data: {
            ...data,
            recommended_products: recommendedProducts
              .filter((x) => !!x)
              .map(({ id }) => id),
          },
        });
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

let ALL_IMAGES: any = {};

const fetchAndUploadSocialImage = async (img: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const nameOfImg = img
        .substring(img.lastIndexOf("/") + 1, img.length)
        .toLowerCase();
      if (ALL_IMAGES[nameOfImg]) {
        console.log("FROM CACHE");
        return resolve(ALL_IMAGES[nameOfImg]);
      }

      const response = await axios.get(img, { responseType: "arraybuffer" });

      const form = new FormData();
      form.append("files", response.data, nameOfImg);

      const upload = await axios
        .post("http://0.0.0.0:1337/api/upload", form, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        })
        .catch((error) => {
          console.log({ error, img });
          return resolve(null); // FOR 404 ERROR
        });

      // @ts-ignore
      ALL_IMAGES[nameOfImg] = upload.data[0].id;
      // @ts-ignore
      return resolve(upload.data[0]?.id);
    } catch (error) {
      console.log({ error, img });
      return resolve(null); // FOR 404 ERROR
    }
  });
};

export default {
  synchronizationDeanteAmount: {
    task: async ({ strapi }) => {
      console.log("Started amount synchronization with Deante!");
      const productService: GenericService = strapi.service(
        "api::product.product"
      );

      const existingProducts = await strapi.db
        .query("api::product.product")
        .findMany({
          where: {
            id: {
              $gt: 0,
            },
          },
        });

      const stocks = await fetch(
        "https://api.deante.pl/api/stocks?key=deante-62e59625-50d9-470a-88e1-0d03585c7308"
      );
      const stocksData: any[] = await stocks.json();

      console.log("stocksData", stocksData?.length);
      console.log("existingProducts", existingProducts?.length);
      if (stocksData?.length && existingProducts?.length) {
        let index = 0;
        let toSend = [];
        for await (const stock of stocksData) {
          index++;
          toSend.push({
            ...stock,
            id: existingProducts.find(
              ({ manufacturer_id, ean }) =>
                manufacturer_id === stock.id && ean === stock.ean
            )?.id,
          });
          console.log(stocksData.length - index);
          if (toSend.length === 100 || index === stocksData.length) {
            await Promise.all(
              toSend
                .filter(({ id }) => !!id)
                .map(({ id, stock }) => {
                  return productService.update(id, {
                    data: { quantity: stock },
                  });
                })
            );
            toSend = [];
          }
        }
      }
      console.log("Finished amount synchronization with Deante!");
    },
    options: {
      rule: "0 45 */1 * * *",
    },
  },
  synchronizationDeante: {
    task: async ({ strapi }) => {
      console.log("Started synchronization with Deante!");
      ALL_IMAGES = {}
      const manufacturer: any = await getOrCreate(strapi, "manufacturer", {
        name: "Deante",
      });

      const allImages = await fetch("http://0.0.0.0:1337/api/upload/files", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      const allImagesJSONed: any[] = await allImages.json();

      for (const image of allImagesJSONed) {
        ALL_IMAGES[image.name.toLowerCase()] = image.id;
      }

      const response = await fetch(
        "https://api.deante.pl/api/products?key=deante-62e59625-50d9-470a-88e1-0d03585c7308"
      );
      const data: Product[] = await response.json();

      const productsToAdd = [];
      let i = 0;

      for await (const source of data) {
        console.log(data.length - i);
        const images = await Promise.all(
          source.images.map(({ src }) => fetchAndUploadSocialImage(src))
        );

        productsToAdd.push({
          ...source,
          images: images.filter((x) => !!x),
        });

        if (productsToAdd.length === 200 || i + 1 === data.length) {
          await Promise.all(
            productsToAdd.map(async (product) => {
              // const categories = product.categories.map()

              return createOrUpdateProduct(strapi, {
                ...product,
                manufacturer: manufacturer.id,
                manufacturer_id: product.id,
                manufacturer_net_price: product.prices.netPrice,
                manufacturer_gross_price: product.prices.grossPrice,
                vat: product.prices.vat,
                gross_price: product.prices.grossPrice,
                net_price: product.prices.netPrice,
                is_designed: product.isDesigned,
                warranty_in_months: product.warranty * 12,
                // categories,
                package_height_in_mm: product.package.height.value,
                package_depth_in_mm: product.package.depth.value,
                package_width_in_mm: product.package.width.value,
                package_weight_in_g: product.package.weight.value,
                manufacturer_url: product.url,
                source,
              });
            })
          );
        }
        i++;
      }
      console.log("Finished synchronization with Deante!");
    },
    options: {
      rule: "0 30 6 * * *",
    },
  },
};
