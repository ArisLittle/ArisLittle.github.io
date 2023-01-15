import * as echarts from 'echarts';

var option = {
  dataset: {
    source: [
      ['score', 'amount', 'product'],
      [89.3, 58212, 'Matcha Latte'],
      [57.1, 78254, 'Milk Tea'],
      [74.4, 41032, 'Cheese Cocoa'],
      [50.1, 12755, 'Cheese Brownie'],
      [89.7, 20145, 'Matcha Cocoa'],
      [68.1, 79146, 'Tea'],
      [19.6, 91852, 'Orange Juice'],
      [10.6, 101852, 'Lemon Juice'],
      [32.7, 20112, 'Walnut Brownie']
    ]
  },
  xAxis: {},
  // yAxis: { type: 'category' },
  yAxis: {},
  series: [
    {
      type: 'bar',
      encode: {
        // 将 "amount" 列映射到 X 轴。
        x: 'product',
        // 将 "product" 列映射到 Y 轴。
        y: 'score'
      }
    }
  ]
};

option = {
  color: ['#ffd44f', '#739fff'],
  areaStyle: [{
    color: 'rgba(255, 228, 52, 0.6)'
  }],
  title: {
    text: 'Basic Radar Chart'
  },
  legend: {
    right: 0,
    data: ['Allocated Budget', 'Actual Spending']
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: 'Sales', max: 100 },
      { name: 'Administration' },
      { name: 'Information Technology', max: 30000 },
      { name: 'Customer Support' },
      { name: 'Development' },
      { name: 'Marketing' }
    ],
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [50, 3000, 20000, 35000, 50000, 18000],
          name: 'Allocated Budget',
          areaStyle: {
            color: 'rgba(255, 228, 52, 0.6)'
          }
        },
        {
          value: [50, 14000, 28000, 26000, 42000, 21000],
          name: 'Actual Spending'
        }
      ]
    }
  ],
  tooltip: {
    trigger: 'item',
    // formatter: '{c0}'
    formatter(params, index) {
      console.log(params, index)
      return `${params.name}<br/>${params.value}</li><ul>`
    },
    // valueFormatter: (value) => {
    //   console.log(value)
    //   return '$' + value.toFixed(2)
    // }
  },
  // series: [
  //   {
  //     name: 'Budget vs spending',
  //     type: 'radar',
  //     data: [
  //       {
  //         value: [4200, 3000, 20000, 35000, 50000, 18000],
  //         name: 'Allocated Budget',
  //         areaStyle: {
  //           color: 'rgba(255, 228, 52, 0.6)'
  //         }
  //       },
  //     ]
  //   },
  //   {
  //     name: 'xx',
  //     type: 'radar',
  //     data: [
  //       {
  //         value: [5000, 14000, 28000, 26000, 42000, 21000],
  //         name: 'Actual Spending'
  //       }
  //     ]
  //   }
  // ]
};

var data = [
  {
    name: 'Grandpa',
    children: [
      {
        name: 'Uncle Leo',
        value: 15,
        children: [
          {
            name: 'Cousin Jack',
            value: 2
          },
          {
            name: 'Cousin Mary',
            value: 5,
            children: [
              {
                name: 'Jackson',
                value: 2
              }
            ]
          },
          {
            name: 'Cousin Ben',
            value: 4
          }
        ]
      },
      {
        name: 'Father',
        value: 10,
        children: [
          {
            name: 'Me',
            value: 5
          },
          {
            name: 'Brother Peter',
            value: 1
          }
        ]
      }
    ]
  },
  {
    name: 'Nancy',
    children: [
      {
        name: 'Uncle Nike',
        children: [
          {
            name: 'Cousin Betty',
            value: 1
          },
          {
            name: 'Cousin Jenny',
            value: 2
          }
        ]
      }
    ]
  }
];
option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '40%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: true,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          //fontSize: 40,
          //fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
};

option = {
  series: [{
    type: 'sunburst',
    // emphasis: {
    //     focus: 'ancestor'
    // },
    data: data,
    radius: [60, '90%'],
    label: {
      rotate: 'radial'
    }
  },
  {
    name: 'Access From',
    type: 'pie',
    radius: ['20%', '20%'],
    avoidLabelOverlap: false,
    // itemStyle: {
    //   borderRadius: 10,
    //   borderColor: '#fff',
    //   borderWidth: 2
    // },
    label: {
      show: true,
      position: 'center'
    },
    // emphasis: {
    //   label: {
    //     show: true,
    //     //fontSize: 40,
    //     //fontWeight: 'bold'
    //   }
    // },
    labelLine: {
      show: false
    },
    data: [
      { value: 1048, name: 'Search Engine' },
      // { value: 735, name: 'Direct' },
      // { value: 580, name: 'Email' },
      // { value: 484, name: 'Union Ads' },
      // { value: 300, name: 'Video Ads' }
    ]
  }]
};

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
myChart.setOption(option)
// 绘制图表
// myChart.setOption({
//   title: {
//     text: 'ECharts 入门示例'
//   },
//   tooltip: {},
//   xAxis: {
//     data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
//   },
//   yAxis: {},
//   series: [
//     {
//       name: '销量',
//       type: 'bar',
//       data: [5, 20, 36, 10, 10, 20]
//     }
//   ]
// });