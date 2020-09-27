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
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name.includes("Conjured")) {
        if (this.items[i].quality > 2) {
          this.items[i].quality = this.items[i].quality - 2;
        } else {
          this.items[i].quality = 0;
        }
      } else if (
        this.items[i].name != "Sharp Cheddar" &&
        this.items[i].name != "Lady Gaga tickets"
      ) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != "Ping-pong Paddle") {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].name == "Lady Gaga tickets") {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }

      if (this.items[i].name != "Ping-pong Paddle") {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }

      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != "Sharp Cheddar") {
          if (this.items[i].name != "Lady Gaga tickets") {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != "Ping-pong Paddle") {
                if (this.items[i].name.includes("Conjured")) {
                  if (this.items[i].quality > 2) {
                    this.items[i].quality = this.items[i].quality - 2;
                  } else {
                    this.items[i].quality = 0;
                  }
                } else {
                  this.items[i].quality = this.items[i].quality - 1;
                }
              }
            }
          } else {
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}
