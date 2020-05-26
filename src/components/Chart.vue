<template>
  <div class="dash" ref='dash'>
    <svg></svg>
  </div>
</template>

<script>
/* eslint-disable */
import * as d3 from 'd3';
import _ from 'lodash';

export default {
  name: 'Chart',
  props: {
    title: {
      type: String,
      default: '',
    },
    yAxis: {
      type: String,
      default: '',
    },
    data: {
      type: Array,
      default: [],
    },
  },
  mounted() {
    this.renderChart(this.data);
  },
  methods: {
    renderChart(dataset) {
      let svgWidth = 1000;
      const svgHeight = 600;

      if (window.innerWidth < svgWidth) svgWidth = window.innerWidth;
      const margin = svgWidth / 10;
      const chartWidth = svgWidth - 2.2 * margin;
      const chartHeight = 600 - 2 * (margin + 50);
      const svg = d3
        .select(this.$refs.dash)
        .select('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);
      this.chart = svg
        .append('g')
        .attr('transform', `translate(${margin + 40}, ${margin})`);

      const yScale = d3
        .scaleLinear()
        .range([chartHeight, 0])
        .domain([0, _.maxBy(dataset, 'rate').rate]);

      this.chart
        .append('g')
        .call(d3.axisLeft(yScale).ticks(10));

      const xScale = d3
        .scaleBand()
        .range([0, chartWidth])
        .domain(dataset.map(s => s.title))
        .padding(0.2);

      this.chart
        .append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${chartHeight})`)
        .call(d3.axisBottom(xScale))
        .selectAll('.tick text')
        .call(this.wrap, xScale.bandwidth());


      const barGroups = this.chart
        .selectAll('rect')
        .data(dataset)
        .enter();

      barGroups
        .append('rect')
        .attr('class', 'bar')
        .attr('x', g => xScale(g.title))
        .attr('y', chartHeight)
        .attr('height', 0)
        .attr('width', xScale.bandwidth())
        .append('title')
        .text(g => `value: ${g.rate}`);

      barGroups.selectAll('rect')
        .transition()
        .delay((d, i) => 100 * i)
        .duration(1000)
        .attr('y', g => yScale(g.rate))
        .attr('height', g => chartHeight - yScale(g.rate));


      svg
        .append('text')
        .attr('class', 'label')
        .attr('x', -(chartHeight / 2) - margin)
        .attr('y', margin / 1.4)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text(this.yAxis);

      svg
        .append('text')
        .attr('class', 'label')
        .attr('x', chartWidth / 2 + margin)
        .attr('y', chartHeight + margin * 2.5)
        .attr('text-anchor', 'middle')
        .text('Movie Titles');

      svg
        .append('text')
        .attr('class', 'title')
        .attr('x', chartWidth / 2 + margin)
        .attr('y', 40)
        .attr('text-anchor', 'middle')
        .text(this.title);
    },
    wrap(text, width) {
      text.each(function () {
        let text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1,
          y = text.attr('y'),
          dy = parseFloat(text.attr('dy')),
          tspan = text.text(null).append('tspan').attr('x', 0).attr('y', y)
            .attr('dy', `${dy}em`);
        while (word = words.pop()) {// eslint-disable-line
          line.push(word);
          tspan.text(line.join(' '));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(' '));
            line = [word];
            tspan = text.append('tspan').attr('x', 0).attr('y', y).attr('dy', `${++lineNumber * lineHeight + dy}em`) // eslint-disable-line
              .text(word);
          }
        }
      });
    },
  },
};
</script>

<style lang="sass">
@keyframes fadein
  from
    opacity: 0

  to
    opacity: 1
.dash
  position: relative
.axis
  font: 10px sans-serif
  path,
  line
    fill: none
    stroke: #000
    shape-rendering: crispEdges
  .tick text
    color: black
.bar
  fill: steelblue
  transition: all 0.6s
  &:hover
    fill: brown
svg
  animation-name: fadein
  animation-duration: 2s
  max-width: 100%

</style>
