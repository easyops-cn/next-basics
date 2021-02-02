import { Story } from "../../../interfaces";
import timeSeriesDoc from "../../../docs/chart-v2/time-series-chart.md";
import { mergeCommon } from "./utils";

const doc = mergeCommon(timeSeriesDoc);

export const story: Story = {
  storyId: "chart-v2.time-series-chart",
  type: "brick",
  author: "ice",
  text: {
    en: "chart-v2 Time Chart",
    zh: "chart-v2 时间序列图",
  },
  icon: { lib: "fa", icon: "chart-line" },
  description: {
    en: "display time chart",
    zh: "用于展示时间序列数据",
  },
  conf: [
    {
      brick: "chart-v2.time-series-chart",
      events: {
        "chart-v2.click": {
          action: "console.log",
        },
      },
      properties: {
        height: 300,
        xField: "time",
        groupField: "ip",
        yFields: ["load1", "load5", "load15"],
        data: [
          {
            time: 1589264100,
            ip: "192.168.100.162",
            load1: 1,
            load5: 5,
            load15: 15,
          },
          {
            time: 1589264160,
            ip: "192.168.100.162",
            load1: 1,
            load5: 5,
            load15: 15,
          },
          {
            time: 1589264220,
            ip: "192.168.100.162",
            load1: 1,
            load5: 5,
            load15: 15,
          },
          {
            time: 1589264280,
            ip: "192.168.100.162",
            load1: 1,
            load5: 5,
            load15: 15,
          },
          {
            time: 1589264100,
            ip: "192.168.100.163",
            load1: 2,
            load5: 6,
            load15: 16,
          },
          {
            time: 1589264160,
            ip: "192.168.100.163",
            load1: 2,
            load5: 6,
            load15: 16,
          },
          {
            time: 1589264220,
            ip: "192.168.100.163",
            load1: 2,
            load5: 6,
            load15: 16,
          },
          {
            time: 1589264280,
            ip: "192.168.100.163",
            load1: 2,
            load5: 6,
            load15: 16,
          },
        ],
      },
    },
    {
      brick: "chart-v2.time-series-chart",
      events: {
        "chart-v2.click": {
          action: "console.log",
        },
      },
      properties: {
        height: 300,
        xField: "time",
        yField: "value",
        showPoint: true,
        pointSize: 3,
        axis: {
          yAxis: {
            min: 1000000000,
            unit: "bytes",
          },
        },
        connectNulls: true,
        data: [
          {
            value: null,
            time: 1589264100,
          },
          {
            value: 2127848000,
            time: 1589264160,
          },
          {
            value: 656459300000,
            time: 1589264220,
          },
          {
            value: 1312490000000,
            time: 1589264280,
          },
          {
            value: 2131249000,
            time: 1589264340,
          },
          {
            value: 1313851000000,
            time: 1589264400,
          },
          {
            value: 658489300000,
            time: 1589264460,
          },
          {
            value: 658754300000,
            time: 1589264520,
          },
          {
            value: 659113100000,
            time: 1589264580,
          },
          {
            value: 2135633000,
            time: 1589264640,
          },
          {
            value: 1318390000000,
            time: 1589264700,
          },
          {
            value: 660319300000,
            time: 1589264760,
          },
          {
            value: 2141762000,
            time: 1589264820,
          },
          {
            value: 1321210000000,
            time: 1589264880,
          },
          {
            value: 1322141000000,
            time: 1589264940,
          },
          {
            value: 662852900000,
            time: 1589265000,
          },
          {
            value: 663196900000,
            time: 1589265060,
          },
          {
            value: 2146040000,
            time: 1589265120,
          },
          {
            value: 663746800000,
            time: 1589265180,
          },
          {
            value: 664796700000,
            time: 1589265240,
          },
          {
            value: 665465700000,
            time: 1589265300,
          },
          {
            value: 665682400000,
            time: 1589265360,
          },
          {
            value: 2149504000,
            time: 1589265420,
          },
          {
            value: 666682600000,
            time: 1589265480,
          },
          {
            value: 667118800000,
            time: 1589265540,
          },
          {
            value: 667313000000,
            time: 1589265600,
          },
          {
            value: 667952000000,
            time: 1589265660,
          },
          {
            value: 668182800000,
            time: 1589265720,
          },
          {
            value: 2153384000,
            time: 1589265780,
          },
          {
            value: 669232900000,
            time: 1589265840,
          },
          {
            value: 669618900000,
            time: 1589265900,
          },
          {
            value: 669918300000,
            time: 1589265960,
          },
          {
            value: 670678600000,
            time: 1589266020,
          },
          {
            value: 671143600000,
            time: 1589266080,
          },
          {
            value: 671529700000,
            time: 1589266140,
          },
          {
            value: 672287200000,
            time: 1589266200,
          },
          {
            value: 672571100000,
            time: 1589266260,
          },
          {
            value: 672931400000,
            time: 1589266320,
          },
          {
            value: 2175885000,
            time: 1589266380,
          },
          {
            value: 2182259000,
            time: 1589266440,
          },
          {
            value: 674378400000,
            time: 1589266500,
          },
          {
            value: 1347297000000,
            time: 1589266560,
          },
          {
            value: 2195098000,
            time: 1589266620,
          },
          {
            value: 675786300000,
            time: 1589266680,
          },
          {
            value: 676487000000,
            time: 1589266740,
          },
          {
            value: 676677100000,
            time: 1589266800,
          },
          {
            value: 676372400000,
            time: 1589266860,
          },
          {
            value: 1352569000000,
            time: 1589266920,
          },
          {
            value: 2203676000,
            time: 1589266980,
          },
          {
            value: 2205904000,
            time: 1589267040,
          },
          {
            value: 679234000000,
            time: 1589267100,
          },
          {
            value: 678961100000,
            time: 1589267160,
          },
          {
            value: 1356811000000,
            time: 1589267220,
          },
          {
            value: 1358507000000,
            time: 1589267280,
          },
          {
            value: 2212147000,
            time: 1589267340,
          },
          {
            value: 1360485000000,
            time: 1589267400,
          },
          {
            value: 1361050000000,
            time: 1589267460,
          },
          {
            value: 682342900000,
            time: 1589267520,
          },
          {
            value: 682669500000,
            time: 1589267580,
          },
          {
            value: null,
            time: 1589267640,
          },
          {
            value: 682669500000,
            time: 1589267700,
          },
        ],
      },
    },
  ],
  doc,
};
