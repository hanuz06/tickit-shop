export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class TickitShop {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      if (item.name == "Ping-pong Paddle") {
      } else {
        item.sellIn -= 1;
      }
      
      switch (item.name) {
        case "Sharp Cheddar":
          TickitShop.increaseItemQuality(item);
          if (item.sellIn < 0) {
            TickitShop.increaseItemQuality(item);
          }
          break;
        case "Lady Gaga tickets":
          TickitShop.increaseItemQuality(item);
          if (item.sellIn <= 10) {
            TickitShop.increaseItemQuality(item);
          }
          if (item.sellIn <= 5) {
            TickitShop.increaseItemQuality(item);
          }
          if (item.sellIn < 0) {
            item.quality = 0;
          }
          break;
        case "Ping-pong Paddle":
          break;
        default:
          if (item.name.includes("Conjured")) {
            if (item.quality >= 2) {
              item.quality -= 2;
            } else {
              item.quality = 0;
            }
          } else {
            TickitShop.decreaseItemQuality(item);
            if (item.sellIn < 0) {
              TickitShop.decreaseItemQuality(item);
            }
          }
          break;
      }
    }
    return this.items;
  }

  static increaseItemQuality(item: Item) {
    if (item.quality < 50) {
      return (item.quality += 1);
    }
  }

  static decreaseItemQuality(item: Item) {
    if (item.quality > 0) {
      return (item.quality -= 1);
    }
  }
}
