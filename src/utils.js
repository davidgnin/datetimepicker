'use strict';

export let isDOMElement = function isDOMElement(o) {
  return (typeof HTMLElement === 'object' ? o instanceof HTMLElement : //DOM2
    o && typeof o === 'object' && o !== null && o.nodeType === 1 &&
    typeof o.nodeName === 'string');
};

export const PREFIX = 'dtp';

export const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
export const WEEK_DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const STYLE = `<style>
  .dtp {
    position: relative;
  }
  .dtp .dtp-picker {
    font-family: sans-serif;
    text-align: center;
    font-size: 0.8em;
    position: absolute;
    top: 2em;
    left: 0;
    background-color: #fff;
    width: 15em;
    border: solid 1px #ccc;
    border-radius: 0.25em;
    padding: 0.5em;
    display: none;
  }
  .dtp .dtp-month-picker {
    display: flex;
    font-weight: bold;
    padding-bottom: 0.75em;
  }
  .dtp .dtp-month, .dtp .dtp-month-pick, .dtp .dtp-week-days > div,
  .dtp .dtp-days > div {
    width: 14.2857%;
    box-sizing: border-box;
    padding: 0.25em;
  }
  .dtp .dtp-month {
    width: 100%;
  }
  .dtp .dtp-month-pick, .dtp .dtp-day {
    cursor: pointer;
    border-radius: 0.25em;
  }
    .dtp .dtp-month-pick:hover, .dtp .dtp-day:hover {
      background-color: #ccc;
    }
  .dtp .dtp-week-days {
    font-weight: bold;
    padding-bottom: 0.25em;
  }
  .dtp .dtp-week-days, .dtp .dtp-days {
    display: flex;
    flex-wrap: wrap;
  }
  .dtp .dtp-day.dtp-active {
    background-color: #666;
    color: #fff;
    cursor: default;
  }
  .dtp .dtp-time-picker {
    padding: 0.5em 0.25em 0.75em;
  }
  .dtp .dtp-time-picker, .dtp .dtp-buttons {
    display: flex;
  }
    .dtp .dtp-time-decorator {
      flex-grow: 1;
    }
    .dtp .dtp-two-digits {
      flex-grow: 2;
    }
    .dtp .dtp-three-digits {
      flex-grow: 3;
    }
  .dtp .dtp-buttons {
    padding: 0 0.25em 0.25em;
  }
  .dtp button {
    width: 50%;
  }
  .dtp .dtp-ok {
    margin-left: 0.5em;
  }
</style>`;

export let generateHTML = function generateHTML() {
  return `${STYLE}
<div class="${PREFIX}-calendar">
  <div class="${PREFIX}-month-picker">
    <div class="dtp-month-before dtp-month-pick">&#x276e;</div>
    <div class="dtp-month">February 2017</div>
    <div class="dtp-month-after dtp-month-pick">&#x276f;</div>
  </div>
  <div class="dtp-day-picker">
    <div class="dtp-week-days">
      <div class="dtp-week-day">Mo</div>
      <div class="dtp-week-day">Tu</div>
      <div class="dtp-week-day">We</div>
      <div class="dtp-week-day">Th</div>
      <div class="dtp-week-day">Fr</div>
      <div class="dtp-week-day">Sa</div>
      <div class="dtp-week-day">Su</div>
    </div>
    <div class="dtp-days">
      <div></div>
      <div></div>
      <div class="dtp-day">1</div>
      <div class="dtp-day">2</div>
      <div class="dtp-day">3</div>
      <div class="dtp-day">4</div>
      <div class="dtp-day">5</div>
      <div class="dtp-day">6</div>
      <div class="dtp-day">7</div>
      <div class="dtp-day">8</div>
      <div class="dtp-day">9</div>
      <div class="dtp-day">10</div>
      <div class="dtp-day">11</div>
      <div class="dtp-day">12</div>
      <div class="dtp-day">13</div>
      <div class="dtp-day">14</div>
      <div class="dtp-day">15</div>
      <div class="dtp-day">16</div>
      <div class="dtp-day">17</div>
      <div class="dtp-day">18</div>
      <div class="dtp-day dtp-active">19</div>
      <div class="dtp-day">20</div>
      <div class="dtp-day">21</div>
      <div class="dtp-day">22</div>
      <div class="dtp-day">23</div>
      <div class="dtp-day">24</div>
      <div class="dtp-day">25</div>
      <div class="dtp-day">26</div>
      <div class="dtp-day">27</div>
      <div class="dtp-day">28</div>
    </div>
  </div>
</div>
<div class="dtp-time-picker">
  <input class="dtp-hour dtp-two-digits" type="number" min="0" max="23">
  <span class="dtp-time-decorator">:</span>
  <input class="dtp-minute dtp-two-digits" type="number" min="0" max="59">
  <span class="dtp-time-decorator">:</span>
  <input class="dtp-second dtp-two-digits" type="number" min="0" max="59"
    value="00">
  <span class="dtp-time-decorator">.</span>
  <input class="dtp-milisecond dtp-three-digits" type="number" min="0"
    max="999" value="000">
</div>
<div class="dtp-buttons">
  <button class="dtp-now">Now</button>
  <button class="dtp-ok">OK</button>
</div>`;
};
