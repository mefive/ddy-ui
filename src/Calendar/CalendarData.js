/*!
 * calendar.js: inspired by the calendar module from Python
 * Copyright(c) 2011 Luciano Ramalho <luciano@ramalho.org>
 * MIT Licensed
 */

/* eslint-disable */
define((require, exports) => {
  exports.version = '0.1.0';

  const CalendarException = function CalendarException(message) {
    this.message = message;
    this.toString = function () {
      return `${this.constructor.name}: ${this.message}`;
    };
  };

  const Calendar = function Calendar(firstWeekDay) {
    // properties
    this.firstWeekDay = firstWeekDay || 0; // 0 = Sunday
  };

  Calendar.prototype = {
    constructor: Calendar,
    weekStartDate: function weekStartDate(date) {
      const startDate = new Date(date.getTime());
      while (startDate.getDay() !== this.firstWeekDay) {
        startDate.setDate(startDate.getDate() - 1);
      }
      return startDate;
    },
    monthDates: function monthDates(year, month, dayFormatter, weekFormatter) {
      if ((typeof year !== 'number') || (year < 1970)) {
        throw new CalendarException('year must be a number >= 1970');
      }
      if ((typeof month !== 'number') || (month < 0) || (month > 11)) {
        throw new CalendarException('month must be a number (Jan is 0)');
      }
      let weeks = [],
        week = [],
        i = 0,
        date = this.weekStartDate(new Date(year, month, 1));
      do {
        for (i = 0; i < 7; i++) {
          week.push(dayFormatter ? dayFormatter(date) : date);
          date = new Date(date.getTime());
          date.setDate(date.getDate() + 1);
        }
        weeks.push(weekFormatter ? weekFormatter(week) : week);
        week = [];
      } while ((date.getMonth() <= month) && (date.getFullYear() === year));
      return weeks;
    },
    monthDays: function monthDays(year, month) {
      const getDayOrZero = function getDayOrZero(date) {
        return date.getMonth() === month ? date.getDate() : 0;
      };
      return this.monthDates(year, month, getDayOrZero);
    },
    monthText: function monthText(year, month) {
      if (typeof year === 'undefined') {
        const now = new Date();
        year = now.getFullYear();
        month = now.getMonth();
      }
      const getDayOrBlank = function getDayOrBlank(date) {
        let s = date.getMonth() === month ? date.getDate().toString() : '  ';
        while (s.length < 2) s = ` ${s}`;
        return s;
      };
      const weeks = this.monthDates(
        year, month, getDayOrBlank,
        week => week.join(' '),
      );
      return weeks.join('\n');
    },
  };
  const months = 'JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC'.split(' ');
  for (let i = 0; i < months.length; i++) { Calendar[months[i]] = i; }

  return Calendar;
});
/* eslint-enable */
