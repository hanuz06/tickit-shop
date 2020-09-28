import { expect } from "chai";
import "mocha";
import { TickitShop, Item } from "../app/tickit-shop";

describe("TickitShop", () => {
  let tickitShop: TickitShop;

  const createTickitShop = ({ name, sellIn = 15, quality = 15 }) =>
    new TickitShop([new Item(name, sellIn, quality)]);

  const getSingleItem = () => tickitShop.items[0];

  beforeEach(() => {
    tickitShop = createTickitShop({ name: "Parmesan", quality: 1, sellIn: 0 });
  });

  it("decreases sellIn by 1 each day", () => {
    const previousSellIn = getSingleItem().sellIn;
    tickitShop.updateQuality();
    expect(getSingleItem().sellIn).eql(previousSellIn - 1);
  });

  it("decreases quality by 1 each day", () => {
    const previousQuality = getSingleItem().quality;
    tickitShop.updateQuality();
    expect(getSingleItem().quality).eql(previousQuality - 1);
  });

  checkQualityChangesTwiceAsFastWhenConjured({ name: "Parmesan" });

  describe("when quality equals zero", () => {
    beforeEach(() => {
      tickitShop = createTickitShop({ name: "Parmesan", quality: 0 });
    });

    it("does not lower quality below 0", () => {
      tickitShop.updateQuality();
      expect(getSingleItem().quality).eql(0);
    });
  });

  describe("when sellIn date has passed", () => {
    beforeEach(() => {
      tickitShop = createTickitShop({
        name: "Parmesan",
        quality: 6,
        sellIn: 0,
      });
    });

    it("decreases quality by 2 each day", () => {
      const previousQuality = getSingleItem().quality;
      tickitShop.updateQuality();
      expect(getSingleItem().quality).eql(previousQuality - 2);
    });
  });

  describe("Ping-pong Paddle", () => {
    beforeEach(() => {
      tickitShop = createTickitShop({
        name: "Ping-pong Paddle",
        quality: 80,
        sellIn: 14,
      });
    });

    it("does not lower in quality", () => {
      const previousQuality = getSingleItem().quality;
      tickitShop.updateQuality();
      expect(getSingleItem().quality).eql(previousQuality);
    });

    it("does not reduce sellIn date", () => {
      const previousSellIn = getSingleItem().sellIn;
      tickitShop.updateQuality();
      expect(getSingleItem().sellIn).eql(previousSellIn);
    });
  });

  describe("Lady Gaga tickets", () => {
    const name = "Lady Gaga tickets";

    describe("when there are more than 10 days left", () => {
      const sellIn = 18;

      beforeEach(() => {
        tickitShop = createTickitShop({ name, sellIn });
      });

      it("increases in quality by 1 each day", () => {
        const previousQuality = getSingleItem().quality;
        tickitShop.updateQuality();
        expect(getSingleItem().quality).eql(previousQuality + 1);
      });
    });

    describe("when there are 10 or fewer days left", () => {
      const sellIn = 9;

      beforeEach(() => {
        tickitShop = createTickitShop({ name, sellIn });
      });

      it("increases in Quality by 2 each day", () => {
        const previousQuality = getSingleItem().quality;
        tickitShop.updateQuality();
        expect(getSingleItem().quality).eql(previousQuality + 2);
      });
    });

    describe("when there are 5 or fewer days left", () => {
      const sellIn = 4;

      beforeEach(() => {
        tickitShop = createTickitShop({ name, sellIn });
      });

      it("increases in Quality by 3 each day", () => {
        const previousQuality = getSingleItem().quality;
        tickitShop.updateQuality();
        expect(getSingleItem().quality).eql(previousQuality + 3);
      });
    });

    describe("when there are 0 or fewer days left", () => {
      const sellIn = 0;

      beforeEach(() => {
        tickitShop = createTickitShop({ name, sellIn });
      });

      it("has 0 in Quality", () => {
        tickitShop.updateQuality();
        expect(getSingleItem().quality).eql(0);
      });
    });
    checkQualityChangesTwiceAsFastWhenConjured({ name: "Parmesan" });
    checkQualityWillNotExceed50({ name });
  });

  describe("Sharp Cheddar", () => {
    const name = "Sharp Cheddar";

    beforeEach(() => {
      tickitShop = createTickitShop({ name, quality: 4, sellIn: 5 });
    });

    it("increases in Quality by 1 each day", () => {
      const previousQuality = getSingleItem().quality;
      tickitShop.updateQuality();
      expect(getSingleItem().quality).eql(previousQuality + 1);
    });

    describe("when sellIn date has passed", () => {
      const sellIn = 0;
      beforeEach(() => {
        tickitShop = createTickitShop({ name, quality: 5, sellIn });
      });

      it("increases in Quality by 2 each day", () => {
        const previousQuality = getSingleItem().quality;
        tickitShop.updateQuality();
        expect(getSingleItem().quality).eql(previousQuality + 2);
      });
    });

    checkQualityWillNotExceed50({ name });
  });

  function checkQualityWillNotExceed50({ name }) {
    describe("when quality equals 50", () => {
      beforeEach(() => {
        tickitShop = createTickitShop({ name, quality: 50, sellIn: 8 });
      });

      it("does not increase Quality past 50", () => {
        tickitShop.updateQuality();
        expect(getSingleItem().quality).eql(50);
      });
    });
  }

  function checkQualityChangesTwiceAsFastWhenConjured({
    name,
    quality = 20,
    sellIn = 10,
  }) {
    describe("when conjured and Quality is above 2", () => {
      beforeEach(() => {
        tickitShop = new TickitShop([
          new Item(name, sellIn, quality),
          new Item(`Conjured ${name}`, sellIn, quality),
        ]);
      });

      const previousQuality = quality;
      const getConjuredItem = () => tickitShop.items[1];

      it("degrades in Quality twice as fast", () => {
        tickitShop.updateQuality();
        const differenceInQuality = previousQuality - getSingleItem().quality;
        const conjuredDifferenceInQuality =
          previousQuality - getConjuredItem().quality;
        expect(conjuredDifferenceInQuality).eql(2 * differenceInQuality);
      });
    });

    describe("when conjured and Quality equals or less than 2", () => {
      beforeEach(() => {
        tickitShop = new TickitShop([
          new Item(name, sellIn, (quality = 1)),
          new Item(`Conjured ${name}`, sellIn, (quality = 1)),
        ]);
      });
      const previousQuality = 2;
      const getConjuredItem = () => tickitShop.items[1];

      it("Quality equals zero", () => {
        tickitShop.updateQuality();        
        expect(getConjuredItem().quality).eql(0);
      });
    });
  }
});
