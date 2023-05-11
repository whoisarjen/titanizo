import { type GenericService } from "@strapi/strapi/lib/core-api/service";
import fetch from "node-fetch";
import _ from "lodash";
import FormData from "form-data";
import axios from "axios";

const CATEGORY_MAP = {
  "/KUCHNIA": 1,
  "/KUCHNIA/BATERIE/BATERIE KUCHENNE": 9,
  "/KUCHNIA/BATERIE/BATERIE Z WYCIĄGANĄ WYLEWKĄ": 9,
  "/KUCHNIA/BATERIE/BATERIE DO ZIMNEJ WODY": 9,
  "/KUCHNIA/BATERIE/BATERIE STOJĄCE": 9,
  "/KUCHNIA/BATERIE/BATERIE ŚCIENNE": 9,
  "/KUCHNIA/BATERIE": 3,
  "/KUCHNIA/BATERIE/BATERIE DO PODGRZEWACZY": 9,
  "/KUCHNIA/BATERIE/BATERIE ECO": 9,
  "/KUCHNIA/BATERIE/BATERIE DO FILTRA": 9,
  "/KUCHNIA/BATERIE/BATERIE Z DŁUGĄ DŹWIGNIĄ": 9,
  "/KUCHNIA/BATERIE/ZAWORY": 10,
  "/KUCHNIA/BATERIE/AKCESORIA DO BATERII": 27,
  "/KUCHNIA/ZLEWOZMYWAKI": 4,
  "/KUCHNIA/ZLEWOZMYWAKI/ZLEWOZMYWAKI GRANITOWE": 11,
  "/KUCHNIA/ZLEWOZMYWAKI/ZLEWOZMYWAKI STALOWE": 12,
  "/KUCHNIA/ZLEWOZMYWAKI/ZLEWOZMYWAKI CERAMICZNE": 13,
  "/KUCHNIA/ZLEWOZMYWAKI/ZLEWOZMYWAKI HYBRYDOWE": 4,
  "/KUCHNIA/ZLEWOZMYWAKI/ZLEWOZMYWAKI MAGNETYCZNE": 4,
  "/KUCHNIA/ZLEWOZMYWAKI/ZLEWOZMYWAKI WPUSZCZANE": 4,
  "/KUCHNIA/ZLEWOZMYWAKI/ZLEWOZMYWAKI MONTOWANE NA RÓWNI Z BLATEM": 4,
  "/KUCHNIA/ZLEWOZMYWAKI/ZLEWOZMYWAKI PODWIESZANE": 4,
  "/KUCHNIA/ZLEWOZMYWAKI/ZLEWOZMYWAKI FARMERSKIE": 4,
  "/KUCHNIA/ZLEWOZMYWAKI/ZLEWOZMYWAKI NAKŁADANE": 4,
  "/KUCHNIA/ZLEWOZMYWAKI/ZLEWOZMYWAKI DO SZAFKI 40": 4,
  "/KUCHNIA/ZLEWOZMYWAKI/ZLEWOZMYWAKI DO SZAFKI 45": 4,
  "/KUCHNIA/ZLEWOZMYWAKI/ZLEWOZMYWAKI DO SZAFKI 50": 4,
  "/KUCHNIA/ZLEWOZMYWAKI/ZLEWOZMYWAKI DO SZAFKI 60": 4,
  "/KUCHNIA/ZLEWOZMYWAKI/ZLEWOZMYWAKI DO SZAFKI 70": 4,
  "/KUCHNIA/ZLEWOZMYWAKI/ZLEWOZMYWAKI DO SZAFKI 80": 4,
  "/KUCHNIA/ZLEWOZMYWAKI/ZLEWOZMYWAKI DO SZAFKI 90": 4,
  "/KUCHNIA/ZLEWOZMYWAKI/ZLEWOZMYWAKI DO SZAFKI 120": 4,
  "/KUCHNIA/ZLEWOZMYWAKI/ZLEWOZMYWAKI 1-KOMOROWE": 4,
  "/KUCHNIA/ZLEWOZMYWAKI/ZLEWOZMYWAKI 1,5-KOMOROWE": 4,
  "/KUCHNIA/ZLEWOZMYWAKI/ZLEWOZMYWAKI 2-KOMOROWE": 4,
  "/KUCHNIA/ZLEWOZMYWAKI/AKCESORIA DO ZLEWOZMYWAKÓW": 26,
  "/KUCHNIA/ZLEWOZMYWAKI Z BATERIĄ": 5,
  "/KUCHNIA/ZLEWOZMYWAKI Z BATERIĄ/ZLEWOZMYWAKI STALOWE Z BATERIĄ": 16,
  "/KUCHNIA/ZLEWOZMYWAKI Z BATERIĄ/ZLEWOZMYWAKI GRANITOWE Z BATERIĄ": 15,
  "/KUCHNIA/AKCESORIA KUCHENNE": 7,
  "/KUCHNIA/AKCESORIA KUCHENNE/DESKI DO KROJENIA": 7,
  "/KUCHNIA/AKCESORIA KUCHENNE/TACKI, PÓŁKI": 19,
  "/KUCHNIA/AKCESORIA KUCHENNE/KOSZYKI DO ODSĄCZANIA": 20,
  "/KUCHNIA/AKCESORIA KUCHENNE/HACZYKI, WIESZAKI": 21,
  "/KUCHNIA/AKCESORIA KUCHENNE/KUBKI, STOJAKI": 22,
  "/KUCHNIA/AKCESORIA KUCHENNE/MYDELNICZKI": 23,
  "/KUCHNIA/AKCESORIA KUCHENNE/DOZOWNIKI": 24,
  "/KUCHNIA/AKCESORIA KUCHENNE/AKCESORIA DO ZLEWOZMYWAKÓW": 26,
  "/KUCHNIA/AKCESORIA KUCHENNE/AKCESORIA DO BATERII": 27,
  "/KUCHNIA/SYFONY": 6,
  "/KUCHNIA/PIELĘGNACJA": 8,
  "/ŁAZIENKA": 2,
  "/ŁAZIENKA/BATERIE": 28,
  "/ŁAZIENKA/BATERIE/BATERIE UMYWALKOWE": 35,
  "/ŁAZIENKA/BATERIE/BATERIE PRYSZNICOWE": 36,
  "/ŁAZIENKA/BATERIE/BATERIE WANNOWE": 37,
  "/ŁAZIENKA/BATERIE/BATERIE BIDETOWE": 38,
  "/ŁAZIENKA/BATERIE/BATERIE PISUAROWE": 39,
  "/ŁAZIENKA/BATERIE/SYSTEM PODTYNKOWY BOX": 36,
  "/ŁAZIENKA/BATERIE/ZESTAWY BATERII ŁAZIENKOWYCH": 40,
  "/ŁAZIENKA/BATERIE/BATERIE Z TERMOSTATEM": 28,
  "/ŁAZIENKA/BATERIE/BATERIE PODTYNKOWE": 28,
  "/ŁAZIENKA/BATERIE/BATERIE CZASOWE": 28,
  "/ŁAZIENKA/BATERIE/BATERIE BEZDOTYKOWE": 28,
  "/ŁAZIENKA/BATERIE/BATERIE ECO": 28,
  "/ŁAZIENKA/BATERIE/BATERIE DO ZIMNEJ WODY": 28,
  "/ŁAZIENKA/BATERIE/BATERIE Z DŁUGĄ DŹWIGNIĄ": 28,
  "/ŁAZIENKA/BATERIE/BATERIE DO PODGRZEWACZY": 28,
  "/ŁAZIENKA/BATERIE/ZAWORY": 41,
  "/ŁAZIENKA/BATERIE/AKCESORIA DO BATERII": 79,
  "/ŁAZIENKA/PRYSZNIC": 29,
  "/ŁAZIENKA/PRYSZNIC/DESZCZOWNICE": 47,
  "/ŁAZIENKA/PRYSZNIC/PANELE PRYSZNICOWE": 47,
  "/ŁAZIENKA/PRYSZNIC/ZESTAWY PRYSZNICOWE": 48,
  "/ŁAZIENKA/PRYSZNIC/BATERIE PRYSZNICOWE": 36,
  "/ŁAZIENKA/PRYSZNIC/SYSTEM PODTYNKOWY BOX": 36,
  "/ŁAZIENKA/PRYSZNIC/ZESTAWY BATERII ŁAZIENKOWYCH": 40,
  "/ŁAZIENKA/PRYSZNIC/ZESTAWY PRYSZNICOWE PODTYNKOWE": 48,
  "/ŁAZIENKA/PRYSZNIC/GŁOWICE PRYSZNICOWE": 49,
  "/ŁAZIENKA/PRYSZNIC/WYLEWKI WANNOWE": 49,
  "/ŁAZIENKA/PRYSZNIC/WYLEWKI PRYSZNICOWE": 49,
  "/ŁAZIENKA/PRYSZNIC/DYSZE PRYSZNICOWE": 49,
  "/ŁAZIENKA/PRYSZNIC/PRZYŁĄCZA KĄTOWE": 49,
  "/ŁAZIENKA/PRYSZNIC/PRZEŁĄCZNIKI NATRYSKU": 49,
  "/ŁAZIENKA/PRYSZNIC/DRĄŻKI PRYSZNICOWE": 49,
  "/ŁAZIENKA/PRYSZNIC/UCHWYTY PRYSZNICOWE": 49,
  "/ŁAZIENKA/PRYSZNIC/WĘŻE PRYSZNICOWE": 49,
  "/ŁAZIENKA/PRYSZNIC/SŁUCHAWKI PRYSZNICOWE": 49,
  "/ŁAZIENKA/PRYSZNIC/AKCESORIA PRYSZNICOWE": 50,
  "/ŁAZIENKA/WANNY": 30,
  "/ŁAZIENKA/WANNY/BATERIE WANNOWE": 37,
  "/ŁAZIENKA/WANNY/ZESTAWY BATERII ŁAZIENKOWYCH": 40,
  "/ŁAZIENKA/WANNY/WANNY": 51,
  "/ŁAZIENKA/WANNY/PARAWANY NAWANNOWE": 52,
  "/ŁAZIENKA/WANNY/WYLEWKI WANNOWE": 53,
  "/ŁAZIENKA/WANNY/SYFONY DO WANIEN": 54,
  "/ŁAZIENKA/UMYWALKI": 31,
  "/ŁAZIENKA/UMYWALKI/BATERIE UMYWALKOWE": 35,
  "/ŁAZIENKA/UMYWALKI/UMYWALKI CERAMICZNE": 55,
  "/ŁAZIENKA/UMYWALKI/UMYWALKI GRANITOWE": 56,
  "/ŁAZIENKA/UMYWALKI/KONSOLE ŁAZIENKOWE": 57,
  "/ŁAZIENKA/UMYWALKI/KONSOLE Z UMYWALKĄ": 57,
  "/ŁAZIENKA/UMYWALKI/KORKI DO UMYWALEK (CLICK-CLACK)": 58,
  "/ŁAZIENKA/UMYWALKI/SYFONY DO UMYWALEK": 59,
  "/ŁAZIENKA/TOALETA": 32,
  "/ŁAZIENKA/TOALETA/MISKI WC": 60,
  "/ŁAZIENKA/TOALETA/DESKI SEDESOWE": 61,
  "/ŁAZIENKA/TOALETA/ZESTAWY WC PODTYNKOWE": 62,
  "/ŁAZIENKA/TOALETA/STELAŻE PODTYNKOWE": 63,
  "/ŁAZIENKA/TOALETA/PRZYCISKI DO SPŁUCZKI": 78,
  "/ŁAZIENKA/TOALETA/BIDETY": 65,
  "/ŁAZIENKA/TOALETA/BATERIE BIDETOWE": 38,
  "/ŁAZIENKA/TOALETA/PISUARY": 64,
  "/ŁAZIENKA/TOALETA/BATERIE PISUAROWE": 39,
  "/ŁAZIENKA/MEBLE": null,
  "/ŁAZIENKA/MEBLE/KONSOLE ŁAZIENKOWE": 57,
  "/ŁAZIENKA/MEBLE/KONSOLE Z UMYWALKĄ": 57,
  "/ŁAZIENKA/MEBLE/SŁUPKI ŁAZIENKOWE": 57,
  "/ŁAZIENKA/MEBLE/BLATY I PÓŁKI DO KONSOL": 57,
  "/ŁAZIENKA/AKCESORIA": 33,
  "/ŁAZIENKA/AKCESORIA/VITAL": 33,
  "/ŁAZIENKA/AKCESORIA/EASY-FIX": 33,
  "/ŁAZIENKA/AKCESORIA/UCHWYTY NA PAPIER": 69,
  "/ŁAZIENKA/AKCESORIA/HACZYKI, WIESZAKI": 77,
  "/ŁAZIENKA/AKCESORIA/MYDELNICZKI": 70,
  "/ŁAZIENKA/AKCESORIA/KOSZYKI, TACKI, PÓŁKI": null,
  "/ŁAZIENKA/AKCESORIA/RELINGI": 71,
  "/ŁAZIENKA/AKCESORIA/SZCZOTKI WC": 68,
  "/ŁAZIENKA/AKCESORIA/KUBKI, STOJAKI": 72,
  "/ŁAZIENKA/AKCESORIA/PORĘCZE": 73,
  "/ŁAZIENKA/AKCESORIA/SIEDZISKA": 74,
  "/ŁAZIENKA/AKCESORIA/DOZOWNIKI": 75,
  "/ŁAZIENKA/AKCESORIA/LUSTERKA": 67,
  "/ŁAZIENKA/INSTALACJA": null,
  "/ŁAZIENKA/INSTALACJA/KORKI DO UMYWALEK (CLICK-CLACK)": 58,
  "/ŁAZIENKA/INSTALACJA/KORKI DO BRODZIKÓW": 49,
  "/ŁAZIENKA/INSTALACJA/ZAWORY": 41,
  "/ŁAZIENKA/INSTALACJA/AKCESORIA DO KABIN I DRZWI": 50,
  "/ŁAZIENKA/INSTALACJA/AKCESORIA DO STELAŻY": 32,
  "/ŁAZIENKA/INSTALACJA/AKCESORIA DO BATERII": 76,
  "/ŁAZIENKA/INSTALACJA/SYFONY DO UMYWALEK": 59,
  "/ŁAZIENKA/INSTALACJA/SYFONY DO BRODZIKÓW": 49,
  "/ŁAZIENKA/INSTALACJA/SYFONY DO WANIEN": 54,
  "/ŁAZIENKA/PIELĘGNACJA": 34,
  "/KUCHNIA/AKCESORIA KUCHENNE/RELINGI": 25,
  "/KUCHNIA/SYFONY/SYFONY DO ZLEWOZMYWAKÓW GRANITOWYCH": 17,
  "/KUCHNIA/SYFONY/SYFONY DO ZLEWOZMYWAKÓW STALOWYCH": 18,
  "/KUCHNIA/SYFONY/SYFONY DO ZLEWOZMYWAKÓW CERAMICZNYCH": null,
  "/KUCHNIA/ZLEWOZMYWAKI/ZLEWOZMYWAKI GOSPODARCZE": 14,
  "/ŁAZIENKA/TOALETA/SZCZOTKI WC": 68,
  "/ŁAZIENKA/TOALETA/UCHWYTY NA PAPIER": 69,
  "/ŁAZIENKA/TOALETA/KORKI DO BIDETÓW": 66,
  "/ŁAZIENKA/INSTALACJA/KORKI DO BIDETÓW": 66,
  "/ŁAZIENKA/UMYWALKI/BATERIE PISUAROWE": 39,
  "/ŁAZIENKA/KABINY/KABINY WALK-IN": 44,
  "/ŁAZIENKA/KABINY/DRZWI PRYSZNICOWE": 45,
  "/ŁAZIENKA/KABINY/ŚCIANKI PRYSZNICOWE": 45,
  "/ŁAZIENKA/KABINY/PARAWANY NAWANNOWE": 52,
  "/ŁAZIENKA/KABINY/ODPŁYWY LINIOWE": 49,
  "/ŁAZIENKA/KABINY/SYFONY I KORKI DO BRODZIKÓW": 49,
  "/ŁAZIENKA/KABINY/BRODZIKI PRYSZNICOWE": 46,
  "/ŁAZIENKA/KABINY/AKCESORIA DO KABIN I DRZWI": 50,
  "/ŁAZIENKA/KABINY": 29,
  "/ŁAZIENKA/KABINY/KABINY KWADRATOWE I PROSTOKĄTNE": 42,
  "/ŁAZIENKA/KABINY/KABINY PÓŁOKRĄGŁE": 42,
  "/ŁAZIENKA/AKCESORIA/MOKKO": null,
  "/ŁAZIENKA/AKCESORIA/ROUND": null,
  "/ŁAZIENKA/AKCESORIA/SILIA": null,
}

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
      rule: "0 45 */2 * * *",
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
              const uniqueCategories = new Set();
              product.categories.forEach((categoryId: string) => {
                const id = CATEGORY_MAP[categoryId];
                id ? uniqueCategories.add(id) : console.error(`Unknown category: ${categoryId}`)
              })

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
                categories: [...uniqueCategories],
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
      rule: "0 48 19 * * *",
    },
  },
};
