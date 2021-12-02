<template>
  <div class="main" id="map"></div>
</template>

<script>
import * as echarts from "echarts";
import nmgDatajson from "../../../assets/json/neimenggu.json";
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      nmgjson: [],
      geoCoordMap: {
        轮训大队: [111.482427, 41.106156],
        总站机关: [111.9225605604553, 40.404249398383925],
        包头边境管理支队: [110.039137, 41.047424],
        兴安边境管理支队: [122.0385233227539, 46.08636631722116],
        阿拉善边境管理支队: [105.74133961914065, 38.844310620203096],
        策克出入境边防检查站: [101.10098927734377, 42.47316391636357],
        锡林郭勒边境管理支队: [116.044952, 43.925793],
        呼伦贝尔边境管理支队: [119.731857, 49.173512],
        巴彦淖尔边境管理支队: [107.378128, 40.753796],
        乌兰察布边境管理支队: [114.01089, 41.90479],
        包头出入境边防检查站: [109.909592, 40.643002],
        二连出入境边防检查站: [119.739101, 49.174913],
        阿尔山出入境边防检查站: [119.949846, 47.188684],
        满洲里出入境边防检查站: [117.500645, 49.597956],
        乌力吉出入境边防检查站: [104.518305, 40.750265],
        海拉尔出入境边防检查站: [119.739101, 49.174913],
        甘其毛都出入境边防检查站: [107.58468, 42.416229],
        额尔古纳出入境边防检查站: [120.176001, 50.247016],
        呼和浩特出入境边防检查站: [111.735134, 40.77822],
        额布都格出入境边防检查站: [104.001715, 40.948684],
        鄂尔多斯出入境边防检查站: [109.984792, 39.854085],
        阿日哈沙特出入境边防检查站: [115.885609, 48.606147],
        珠恩嘎达布其出入境边防检查站: [116.260819, 45.755168],
      },

      max: 480,
      min: 9,
      maxSize4Pin: 100,
      minSize4Pin: 20,
    };
  },
  created() {
    this.nmgjson = nmgDatajson;
  },
  mounted() {
    this.getNeimenggumap();
  },
  methods: {
    convertData(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = this.geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value),
            id: data[i].textID,
          });
        }
      }
      return res;
    },
    getNeimenggumap() {
      var chartDom = document.getElementById("map");
      var myChart = echarts.init(chartDom);
      var option;
      var _that = this;

      myChart.showLoading();
      echarts.registerMap("neimenggu", nmgDatajson); //注册地图
      myChart.hideLoading();

      option = {
        // backgroundColor: "#020933",
        // backgroundColor:rgba(0,0,0,0.4),
        title: {
          top: 20,
          text: "内蒙地图",
          subtext: "",
          x: "center",
          textStyle: {
            color: "#333",
            fontSize: 18,
          },
        },

        tooltip: {
          trigger: "item",
          formatter: function (params) {
            if (typeof params.value[2] == "undefined") {
              // return params.name + " : " + params.value;
            } else {
              return params.name + " : " + params.value[2];
            }
          },
        },
        /*   legend: {
            orient: 'vertical',
            y: 'bottom',
            x: 'right',
              data:['pm2.5'],
            textStyle: {
                color: '#fff'
            }
        },*/
        legend: {
          orient: "vertical",
          y: "bottom",
          x: "right",
          data: ["pm2.5"],
          textStyle: {
            color: "#fff",
          },
        },
        visualMap: {
          show: false,
          min: 0,
          max: 500,
          left: "left",
          top: "bottom",
          text: ["高", "低"], // 文本，默认为数值文本
          calculable: true,
          seriesIndex: [1],
          inRange: {
            // color: ['#3B5077', '#031525'], // 蓝黑
            // color: ['#ffc0cb', '#800080'], // 红紫
            // color: ['#3C3B3F', '#605C3C'], // 黑绿
            // color: ['#0f0c29', '#302b63', '#24243e'], // 黑紫黑
            // color: ['#23074d', '#cc5333'], // 紫红
            // color: ['#00467F', '#A5CC82'], // 蓝绿
            // color: ['#1488CC', '#2B32B2'], // 浅蓝
            // color: ['#00467F', '#A5CC82'], // 蓝绿
            // color: ['#00467F', '#A5CC82'], // 蓝绿
            // color: ['#00467F', '#A5CC82'], // 蓝绿
            // color: ['#00467F', '#A5CC82'], // 蓝绿
          },
        },
        // toolbox: {
        //     show: true,
        //     orient: 'vertical',
        //     left: 'right',
        //     top: 'center',
        //     feature: {
        //             dataView: {readOnly: false},
        //             restore: {},
        //             saveAsImage: {}
        //             }
        // },
        geo: {
          show: true,
          map: "neimenggu",
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: "transparent",
              borderColor: "#3fdaff",
              borderWidth: 2,
              shadowColor: "rgba(63, 218, 255, 0.5)",
              shadowBlur: 30,
            },
            emphasis: {
              areaColor: "#2B91B7",
            },
          },
        },
        series: [
          {
            name: "light",
            type: "scatter",
            coordinateSystem: "geo",
            data: this.convertData(this.data),
            // symbolSize: function(val) {
            //   return val[2] / 10;
            // },
            symbolSize: 18,
            label: {
              normal: {
                // formatter: "{b}",
                position: "right",
                show: false,
              },
              emphasis: {
                show: false,
              },
            },
            itemStyle: {
              normal: {
                color: "#F4E925",
              },
            },
          },
          {
            type: "map",
            map: "jiangxi",
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: "#fff",
                },
              },
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: "#031525",
                borderColor: "#FFFFFF",
              },
              emphasis: {
                areaColor: "#2B91B7",
              },
            },
            animation: false,
            data: this.data,
          },
          {
            name: "Top 5",
            type: "effectScatter",
            coordinateSystem: "geo",
            data: this.convertData(
              this.data
                .sort(function (a, b) {
                  return b.value - a.value;
                })
                .slice(0, 5)
            ),
            // symbolSize: function(val) {
            //   return val[2] / 10;
            // },
            symbolSize: 20,
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke",
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true, //关闭高亮name
              },
            },
            itemStyle: {
              normal: {
                color: "#F4E925",
                shadowBlur: 10,
                shadowColor: "#05C3F9",
              },
            },
            zlevel: 1,
          },
        ],
      };
      myChart.setOption(option);

      window.addEventListener("resize", function () {
        myChart.resize();
      });

      myChart.on("click", function (params) {
        _that.$emit("tops", params);
      });
    },
  },
};
</script>

<style lang="scss" scoped="scoped">
.main {
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
}
</style>
