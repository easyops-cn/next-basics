import lineDoc from "../../../docs/chart-v2/line-chart.md";
import { mergeCommon } from "./utils";
import { Story } from "@next-core/brick-types";

const doc = mergeCommon(lineDoc);

export const story: Story = {
  storyId: "chart-v2.line-chart",
  type: "brick",
  author: "ice",
  text: {
    en: "chart-v2 Line Chart",
    zh: "chart-v2 折线图",
  },
  icon: { lib: "fa", icon: "chart-line" },
  description: {
    en: "display line chart",
    zh: "用于显示数据在一个连续的时间间隔或者时间跨度上的变化",
  },
  conf: [
    {
      brick: "div",
      slots: {
        "": {
          type: "bricks",
          bricks: [
            // for test
            // {
            //   brick: "basic-bricks.general-button",
            //   properties: {
            //     buttonName: "click to change chart",
            //   },
            //   events: {
            //     "general.button.click": {
            //       target: "#target",
            //       properties: {
            //         axis: {
            //           yAxis: {
            //             unit: "bytes",
            //           },
            //         },
            //       },
            //     },
            //   },
            // },
            {
              brick: "chart-v2.line-chart",
              events: {
                "chart-v2.click": {
                  action: "console.log",
                },
              },
              properties: {
                id: "target",
                height: 300,
                data: [
                  { year: "1991", value: 15468 },
                  { year: "1992", value: 16100 },
                  { year: "1993", value: 15900 },
                  { year: "1994", value: 17409 },
                  { year: "1995", value: 17000 },
                  { year: "1996", value: 31056 },
                  { year: "1997", value: 31982 },
                  { year: "1998", value: 32040 },
                  { year: "1999", value: 33233 },
                ],
                xField: "year",
                yField: "value",
                axis: {
                  yAxis: {
                    shape: "smooth",
                    unit: "KB",
                  },
                },
                thresholds: [
                  {
                    value: 31000,
                    color: "red",
                  },
                  {
                    value: 20000,
                    color: "#5cd8a8",
                  },
                ],
                showPoint: true,
                label: {
                  field: "value",
                  config: {
                    style: {
                      fill: "rgb(140,140,140)",
                    },
                  },
                },
              },
            },
          ],
        },
      },
    },
    {
      brick: "div",
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "chart-v2.line-chart",
              events: {
                "chart-v2.click": {
                  action: "console.log",
                },
              },
              properties: {
                id: "target",
                height: 300,
                label: {
                  field: "value1",
                  rightField: "value2",
                  config: {
                    style: {
                      fill: "rgb(140,140,140)",
                    },
                  },
                },
                data: [
                  {
                    year1: "1991",
                    value1: 15468,
                    value2: 14,
                  },
                  {
                    year1: "1992",
                    value1: 16100,
                    value2: 17,
                  },
                  {
                    year1: "1993",
                    value1: 15900,
                    value2: 21,
                  },
                  {
                    year1: "1994",
                    value1: 17409,
                    value2: 16,
                  },
                  {
                    year1: "1995",
                    value1: 17000,
                    value2: 17,
                  },
                  {
                    year1: "1996",
                    value1: 27000,
                    value2: 27,
                  },
                  {
                    year1: "1997",
                    value1: 31000,
                    value2: 23,
                  },
                  {
                    year1: "1998",
                    value1: 33000,
                    value2: 22,
                  },
                ],
                xField: "year1",
                yField: "value1",
                rightYField: "value2",
                axis: {
                  yAxis: {
                    unit: "KB",
                  },
                  rightYAxis: {
                    unit: "b",
                  },
                },
                thresholds: [
                  {
                    value: 29000,
                    color: "red",
                    fill: true,
                  },
                  {
                    value: 26000,
                    color: "#5cd8a8",
                    fill: true,
                  },
                  {
                    value: 17,
                    color: "red",
                    fill: true,
                    yAxis: "right",
                    operator: "lt",
                  },
                  {
                    value: 13,
                    color: "#5cd8a8",
                    fill: true,
                    yAxis: "right",
                  },
                ],
                showPoint: true,
              },
            },
          ],
        },
      },
    },
    {
      brick: "chart-v2.line-chart",
      events: {
        "chart-v2.click": {
          action: "console.log",
        },
      },
      properties: {
        height: 300,
        xField: "month",
        yField: "temperature",
        groupField: "city",
        showPoint: true,
        data: [
          { month: "Jan", city: "Tokyo", temperature: 7 },
          { month: "Jan", city: "London", temperature: 3.9 },
          { month: "Feb", city: "Tokyo", temperature: 6.9 },
          { month: "Feb", city: "London", temperature: 4.2 },
          { month: "Mar", city: "Tokyo", temperature: 9.5 },
          { month: "Mar", city: "London", temperature: 5.7 },
          { month: "Apr", city: "Tokyo", temperature: 14.5 },
          { month: "Apr", city: "London", temperature: 8.5 },
          { month: "May", city: "Tokyo", temperature: 18.4 },
          { month: "May", city: "London", temperature: 11.9 },
          { month: "Jun", city: "Tokyo", temperature: 21.5 },
          { month: "Jun", city: "London", temperature: 15.2 },
          { month: "Jul", city: "Tokyo", temperature: 25.2 },
          { month: "Jul", city: "London", temperature: 17 },
          { month: "Aug", city: "Tokyo", temperature: 26.5 },
          { month: "Aug", city: "London", temperature: 16.6 },
          { month: "Sep", city: "Tokyo", temperature: 23.3 },
          { month: "Sep", city: "London", temperature: 14.2 },
          { month: "Oct", city: "Tokyo", temperature: 18.3 },
          { month: "Oct", city: "London", temperature: 10.3 },
          { month: "Nov", city: "Tokyo", temperature: 13.9 },
          { month: "Nov", city: "London", temperature: 6.6 },
          { month: "Dec", city: "Tokyo", temperature: 9.6 },
          { month: "Dec", city: "London", temperature: 4.8 },
        ],
      },
    },
  ],
  doc,
};
