import * as echarts from 'echarts';
export default (function() {
  window.addEventListener('load', () => { 
    // 获取所有图表 DOM
		if (!document.getElementById('voltage-chart')) {
		  return;
		}
    const voltageChart = echarts.init(document.getElementById('voltage-chart'));
    const currentChart = echarts.init(document.getElementById('current-chart'));
    const resistanceChart = echarts.init(document.getElementById('ressistance-chart'));
    const temperatureChart = echarts.init(document.getElementById('temperature-chart'));
		const dataCard = document.getElementById('val-show');

    // 初始化数据
    const xData = [];
    const yVoltage = [];
    const yCurrent = [];
    const yResistance = [];
    const yTemperature = [];
    let t = 0;

    // 初始化配置
    const optionVoltage = {
      title: { text: '电压' },
      xAxis: { type: 'category', boundaryGap: false, data: xData },
      yAxis: { type: 'value', min: -260, max: 260, name: '电压（V）' },
      series: [{ name: '电压', type: 'line', showSymbol: false, data: yVoltage, smooth: true }]
    };
    const optionCurrent = {
      title: { text: '电流' },
      xAxis: { type: 'category', boundaryGap: false, data: xData },
      yAxis: { type: 'value', min: -1.5, max: 1.5, name: '电流（A）' },
      series: [{ name: '电流', type: 'line', showSymbol: false, data: yCurrent, smooth: true, lineStyle: { color: '#00aa00' } }]
    };
    const optionResistance = {
      title: { text: '电阻' },
      xAxis: { type: 'category', boundaryGap: false, data: xData },
      yAxis: { type: 'value', min: 195, max: 208, name: '电阻（Ω）' },
      series: [{ name: '电阻', type: 'line', showSymbol: false, data: yResistance, smooth: true, lineStyle: { color: '#f0a000' } }]
    };
    const optionTemperature = {
      title: { text: '温度' },
      xAxis: { type: 'category', boundaryGap: false, data: xData },
      yAxis: { type: 'value', min: 19, name: '温度（℃）' },
      series: [{ name: '温度', type: 'line', showSymbol: false, data: yTemperature, smooth: true, lineStyle: { color: '#aa0000' } }]
    };

    voltageChart.setOption(optionVoltage);
    currentChart.setOption(optionCurrent);
    resistanceChart.setOption(optionResistance);
    temperatureChart.setOption(optionTemperature);

    // 数据更新
    setInterval(() => {
      t += 0.1;

      xData.push(t.toFixed(1));
      yVoltage.push(220 * Math.sin(t) + (Math.random() - 0.5) * 5);
      yCurrent.push((220 * Math.sin(t) + (Math.random() - 0.5) * 10) / 200);
      yResistance.push(200 + (Math.random() - 0.5) * 0.05);
      yTemperature.push(20 + Math.log2(t + 1) + (Math.random() - 0.5) * 0.05);

      if (xData.length > 100) {
        xData.shift();
        yVoltage.shift();
        yCurrent.shift();
        yResistance.shift();
        yTemperature.shift();
      }

      // 更新图表
      voltageChart.setOption({ xAxis: { data: xData }, series: [{ data: yVoltage }] });
      currentChart.setOption({ xAxis: { data: xData }, series: [{ data: yCurrent }] });
      resistanceChart.setOption({ xAxis: { data: xData }, series: [{ data: yResistance }] });
      temperatureChart.setOption({ xAxis: { data: xData }, series: [{ data: yTemperature }] });

    }, 100);

    window.addEventListener('resize', () => {
      voltageChart.resize();
      currentChart.resize();
      resistanceChart.resize();
      temperatureChart.resize();
    });
		
		// 每 3 秒更新卡片显示最新数据
		    setInterval(() => {
		      if (!dataCard) return;
		      dataCard.innerHTML = `<H6>
		        U: ${yVoltage[0].toFixed(2)} &nbsp;&nbsp;
		        I: ${yCurrent[0].toFixed(2)} &nbsp;&nbsp;
		        R: ${yResistance[0].toFixed(2)} &nbsp;&nbsp;
		        t: ${xData[0]} &nbsp;&nbsp;
		        T: ${yTemperature[0].toFixed(2)} &nbsp;&nbsp;</H6>
		      `;
		    }, 3000);
  });
})();