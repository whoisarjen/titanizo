import { type GenericService } from "@strapi/strapi/lib/core-api/service";
import fetch from "node-fetch";
import _ from "lodash";
import FormData from "form-data";
import axios from "axios";

const TOKEN =
  "4223a4b1be0377835b23333fa365bc3ea473cd0bab274cf9bf14a9dfa03ac1173f3308a1786d0af8b04d64cef4f128478d33a7dbe43230451939cf44d27a2697ecd2728679ddb6430a5e8df95214990734fe3d313d2862a77fc5dd8482d40df982d834b138ab53973328d813263349a662a666562b10d0ddd76460936c47cf21";

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

const ALL_IMAGES: any = {};

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
      .post("http://127.0.0.1:1337/api/upload", form, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .catch((error) => {
        console.log(error.response.data.error);
        return resolve(null) // FOR 404 ERROR
      });

    // @ts-ignore
    ALL_IMAGES[nameOfImg] = upload.data[0].id;
    // @ts-ignore
    return resolve(upload.data[0]?.id);
    } catch (err) {
      return resolve(null) // FOR 404 ERROR
    }
  });
};

let isSynchronization = false

export default {
  synchronization: {
    task: async ({ strapi }) => {
      if (isSynchronization) {
        console.log("Synchornization already in progress!")
        return
      } else {
        isSynchronization = true
      }
      console.log("Started synchronization with Deante!");
      const manufacturer: any = await getOrCreate(strapi, "manufacturer", {
        name: "Deante",
      });

      const allImages = await fetch("http://127.0.0.1:1337/api/upload/files", {
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
        (a: any, b: any) =>
          a.name.trim().toLowerCase() == b.name.trim().toLowerCase()
      );

      const categories = uniquePossibleCategories.filter(
        ({ name }) => name.length - name.replaceAll("/", "").length === 0
      );
      const subcategories = _.uniqWith(
        uniquePossibleCategories
          .filter(
            ({ name }) => name.length - name.replaceAll("/", "").length > 0
          )
          .map((category) => ({
            ...category,
            oryginalName: category.name,
            name: category.name.substring(
              category.name.lastIndexOf("/") + 1,
              category.name.length
            ),
          })),
        (a, b) => a.name == b.name
      );

      console.log(categories.length, subcategories.length);

      const createdCategories: any[] = await Promise.all(
        categories.map((mainCategory) => {
          return getOrCreate(strapi, "category", {
            ...mainCategory,
            oryginalId: mainCategory.id,
          });
        })
      );
      console.log("categories", categories[0]);

      const subcategoriesCreated: any[] = await Promise.all(
        subcategories.map((category) => {
          return getOrCreate(strapi, "subcategory", {
            ...category,
            oryginalId: category.id,
            category: createdCategories.find(
              (mainCategory) =>
                mainCategory.name.toLowerCase() ===
                category.oryginalName
                  .substring(0, category.oryginalName.indexOf("/"))
                  .toLowerCase()
            ).id,
          });
        })
      );
      console.log("subcategoriesCreated", subcategoriesCreated[0]);

      const productsToAdd = [];
      let i = 0;

      for await (const product of data) {
        console.log(data.length - i);
        const images = await Promise.all(
          product.images.map(({ src }) => fetchAndUploadSocialImage(src))
        );

        productsToAdd.push({
          ...product,
          images: images.filter(x => !!x),
        });

        if (productsToAdd.length === 200 || i + 1 === data.length) {
          await Promise.all(
            productsToAdd.map(async (product) => {
              const subcategories = subcategoriesCreated
                .filter(({ name }) =>
                  product.categories.find(
                    (category) =>
                      category.name
                        .substring(
                          category.name.lastIndexOf("/") + 1,
                          category.name.length
                        )
                        .toLowerCase() === name.toLowerCase()
                  )
                )
                .map(({ id }) => id);

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
                subcategories,
                package_height_in_mm: product.package.height.value,
                package_depth_in_mm: product.package.depth.value,
                package_width_in_mm: product.package.width.value,
                package_weight_in_g: product.package.weight.value,
                manufacturer_url: product.url,
              });
            })
          );
        }
        i++;
      }
      isSynchronization = false
    },
    options: {
      rule: "* 4 * * * *",
    },
  },
};
