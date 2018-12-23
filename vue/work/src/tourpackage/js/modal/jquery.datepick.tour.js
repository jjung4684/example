!function($) {
    /** @type {string} */
    var name = "datepick";
    $.JQPlugin.createPlugin({
        name : name,
        defaultRenderer : {
            picker : '<div class="datepick"><div class="datepick-nav">{link:prev}{link:today}{link:next}</div>{months}{popup:start}<div class="datepick-ctrl">{link:clear}{link:close}</div>{popup:end}<div class="datepick-clear-fix"></div></div>',
            monthRow : '<div class="datepick-month-row">{months}</div>',
            month : '<div class="datepick-month"><div class="datepick-month-header">{monthHeader}</div><table><thead>{weekHeader}</thead><tbody>{weeks}</tbody></table></div>',
            weekHeader : "<tr>{days}</tr>",
            dayHeader : "<th>{day}</th>",
            week : "<tr>{days}</tr>",
            day : "<td>{day}</td>",
            monthSelector : ".datepick-month",
            daySelector : "td",
            rtlClass : "datepick-rtl",
            multiClass : "datepick-multi",
            defaultClass : "",
            selectedClass : "datepick-selected",
            highlightedClass : "datepick-highlight",
            todayClass : "datepick-today",
            startClass : "start",
            endClass : "end",
            middleClass : "middle",
            otherMonthClass : "datepick-other-month",
            saturdayClass : "",
            sundayClass : "",
            commandClass : "datepick-cmd",
            commandButtonClass : "",
            commandLinkClass : "",
            disabledClass : "datepick-disabled"
        },
        commands : {
            prev : {
                text : "prevText",
                status : "prevStatus",
                keystroke : {
                    keyCode : 33
                },
                /**
                 * @param {Object} inst
                 * @return {?}
                 */
                enabled : function(inst) {
                    var expected = inst.curMinDate();
                    return!expected || assert.add(assert.day(assert._applyMonthsOffset(assert.add(assert.newDate(inst.drawDate), 1 - inst.options.monthsToStep, "m"), inst), 1), -1, "d").getTime() >= expected.getTime();
                },
                /**
                 * @param {Element} inst
                 * @return {?}
                 */
                date : function(inst) {
                    return assert.day(assert._applyMonthsOffset(assert.add(assert.newDate(inst.drawDate), -inst.options.monthsToStep, "m"), inst), 1);
                },
                /**
                 * @param {Element} i
                 * @return {undefined}
                 */
                action : function(i) {
                    assert.changeMonth(this, -i.options.monthsToStep);
                }
            },
            prevJump : {
                text : "prevJumpText",
                status : "prevJumpStatus",
                keystroke : {
                    keyCode : 33,
                    ctrlKey : true
                },
                /**
                 * @param {Object} inst
                 * @return {?}
                 */
                enabled : function(inst) {
                    var expected = inst.curMinDate();
                    return!expected || assert.add(assert.day(assert._applyMonthsOffset(assert.add(assert.newDate(inst.drawDate), 1 - inst.options.monthsToJump, "m"), inst), 1), -1, "d").getTime() >= expected.getTime();
                },
                /**
                 * @param {Element} inst
                 * @return {?}
                 */
                date : function(inst) {
                    return assert.day(assert._applyMonthsOffset(assert.add(assert.newDate(inst.drawDate), -inst.options.monthsToJump, "m"), inst), 1);
                },
                /**
                 * @param {Element} i
                 * @return {undefined}
                 */
                action : function(i) {
                    assert.changeMonth(this, -i.options.monthsToJump);
                }
            },
            next : {
                text : "nextText",
                status : "nextStatus",
                keystroke : {
                    keyCode : 34
                },
                /**
                 * @param {Object} inst
                 * @return {?}
                 */
                enabled : function(inst) {
                    var maxDate = inst.get("maxDate");
                    return!maxDate || assert.day(assert._applyMonthsOffset(assert.add(assert.newDate(inst.drawDate), inst.options.monthsToStep, "m"), inst), 1).getTime() <= maxDate.getTime();
                },
                /**
                 * @param {Element} inst
                 * @return {?}
                 */
                date : function(inst) {
                    return assert.day(assert._applyMonthsOffset(assert.add(assert.newDate(inst.drawDate), inst.options.monthsToStep, "m"), inst), 1);
                },
                /**
                 * @param {Element} i
                 * @return {undefined}
                 */
                action : function(i) {
                    assert.changeMonth(this, i.options.monthsToStep);
                }
            },
            nextJump : {
                text : "nextJumpText",
                status : "nextJumpStatus",
                keystroke : {
                    keyCode : 34,
                    ctrlKey : true
                },
                /**
                 * @param {Object} inst
                 * @return {?}
                 */
                enabled : function(inst) {
                    var maxDate = inst.get("maxDate");
                    return!maxDate || assert.day(assert._applyMonthsOffset(assert.add(assert.newDate(inst.drawDate), inst.options.monthsToJump, "m"), inst), 1).getTime() <= maxDate.getTime();
                },
                /**
                 * @param {Element} inst
                 * @return {?}
                 */
                date : function(inst) {
                    return assert.day(assert._applyMonthsOffset(assert.add(assert.newDate(inst.drawDate), inst.options.monthsToJump, "m"), inst), 1);
                },
                /**
                 * @param {Element} i
                 * @return {undefined}
                 */
                action : function(i) {
                    assert.changeMonth(this, i.options.monthsToJump);
                }
            },
            current : {
                text : "currentText",
                status : "currentStatus",
                keystroke : {
                    keyCode : 36,
                    ctrlKey : true
                },
                /**
                 * @param {Object} inst
                 * @return {?}
                 */
                enabled : function(inst) {
                    var expected = inst.curMinDate();
                    var maxDate = inst.get("maxDate");
                    var defaultCenturyStart = inst.selectedDates[0] || assert.today();
                    return(!expected || defaultCenturyStart.getTime() >= expected.getTime()) && (!maxDate || defaultCenturyStart.getTime() <= maxDate.getTime());
                },
                /**
                 * @param {?} noCorrect
                 * @return {?}
                 */
                date : function(noCorrect) {
                    return noCorrect.selectedDates[0] || assert.today();
                },
                /**
                 * @param {?} inst
                 * @return {undefined}
                 */
                action : function(inst) {
                    var tempDate = inst.selectedDates[0] || assert.today();
                    assert.showMonth(this, tempDate.getFullYear(), tempDate.getMonth() + 1);
                }
            },
            today : {
                text : "todayText",
                status : "todayStatus",
                keystroke : {
                    keyCode : 36,
                    ctrlKey : true
                },
                /**
                 * @param {Object} inst
                 * @return {?}
                 */
                enabled : function(inst) {
                    var expected = inst.curMinDate();
                    var maxDate = inst.get("maxDate");
                    return(!expected || assert.today().getTime() >= expected.getTime()) && (!maxDate || assert.today().getTime() <= maxDate.getTime());
                },
                /**
                 * @param {?} noCorrect
                 * @return {?}
                 */
                date : function(noCorrect) {
                    return assert.today();
                },
                /**
                 * @param {?} i
                 * @return {undefined}
                 */
                action : function(i) {
                    assert.showMonth(this);
                }
            },
            clear : {
                text : "clearText",
                status : "clearStatus",
                keystroke : {
                    keyCode : 35,
                    ctrlKey : true
                },
                /**
                 * @param {Object} inst
                 * @return {?}
                 */
                enabled : function(inst) {
                    return true;
                },
                /**
                 * @param {?} noCorrect
                 * @return {?}
                 */
                date : function(noCorrect) {
                    return null;
                },
                /**
                 * @param {?} i
                 * @return {undefined}
                 */
                action : function(i) {
                    assert.clear(this);
                }
            },
            close : {
                text : "closeText",
                status : "closeStatus",
                keystroke : {
                    keyCode : 27
                },
                /**
                 * @param {Object} inst
                 * @return {?}
                 */
                enabled : function(inst) {
                    return true;
                },
                /**
                 * @param {?} noCorrect
                 * @return {?}
                 */
                date : function(noCorrect) {
                    return null;
                },
                /**
                 * @param {?} i
                 * @return {undefined}
                 */
                action : function(i) {
                    assert.hide(this);
                }
            },
            prevWeek : {
                text : "prevWeekText",
                status : "prevWeekStatus",
                keystroke : {
                    keyCode : 38,
                    ctrlKey : true
                },
                /**
                 * @param {Object} inst
                 * @return {?}
                 */
                enabled : function(inst) {
                    var expected = inst.curMinDate();
                    return!expected || assert.add(assert.newDate(inst.drawDate), -7, "d").getTime() >= expected.getTime();
                },
                /**
                 * @param {?} inst
                 * @return {?}
                 */
                date : function(inst) {
                    return assert.add(assert.newDate(inst.drawDate), -7, "d");
                },
                /**
                 * @param {?} i
                 * @return {undefined}
                 */
                action : function(i) {
                    assert.changeDay(this, -7);
                }
            },
            prevDay : {
                text : "prevDayText",
                status : "prevDayStatus",
                keystroke : {
                    keyCode : 37,
                    ctrlKey : true
                },
                /**
                 * @param {Object} inst
                 * @return {?}
                 */
                enabled : function(inst) {
                    var expected = inst.curMinDate();
                    return!expected || assert.add(assert.newDate(inst.drawDate), -1, "d").getTime() >= expected.getTime();
                },
                /**
                 * @param {?} inst
                 * @return {?}
                 */
                date : function(inst) {
                    return assert.add(assert.newDate(inst.drawDate), -1, "d");
                },
                /**
                 * @param {?} i
                 * @return {undefined}
                 */
                action : function(i) {
                    assert.changeDay(this, -1);
                }
            },
            nextDay : {
                text : "nextDayText",
                status : "nextDayStatus",
                keystroke : {
                    keyCode : 39,
                    ctrlKey : true
                },
                /**
                 * @param {Object} inst
                 * @return {?}
                 */
                enabled : function(inst) {
                    var maxDate = inst.get("maxDate");
                    return!maxDate || assert.add(assert.newDate(inst.drawDate), 1, "d").getTime() <= maxDate.getTime();
                },
                /**
                 * @param {?} inst
                 * @return {?}
                 */
                date : function(inst) {
                    return assert.add(assert.newDate(inst.drawDate), 1, "d");
                },
                /**
                 * @param {?} i
                 * @return {undefined}
                 */
                action : function(i) {
                    assert.changeDay(this, 1);
                }
            },
            nextWeek : {
                text : "nextWeekText",
                status : "nextWeekStatus",
                keystroke : {
                    keyCode : 40,
                    ctrlKey : true
                },
                /**
                 * @param {Object} inst
                 * @return {?}
                 */
                enabled : function(inst) {
                    var maxDate = inst.get("maxDate");
                    return!maxDate || assert.add(assert.newDate(inst.drawDate), 7, "d").getTime() <= maxDate.getTime();
                },
                /**
                 * @param {?} inst
                 * @return {?}
                 */
                date : function(inst) {
                    return assert.add(assert.newDate(inst.drawDate), 7, "d");
                },
                /**
                 * @param {?} i
                 * @return {undefined}
                 */
                action : function(i) {
                    assert.changeDay(this, 7);
                }
            }
        },
        defaultOptions : {
            pickerClass : "",
            showOnFocus : true,
            showTrigger : null,
            showAnim : "show",
            showOptions : {},
            showSpeed : "normal",
            popupContainer : null,
            alignment : "bottom",
            fixedWeeks : false,
            firstDay : 0,
            calculateWeek : null,
            monthsToShow : 1,
            monthsOffset : 0,
            monthsToStep : 1,
            monthsToJump : 12,
            useMouseWheel : true,
            changeMonth : true,
            yearRange : "c-10:c+10",
            shortYearCutoff : "+10",
            showOtherMonths : false,
            selectOtherMonths : false,
            defaultDate : null,
            selectDefaultDate : false,
            minDate : null,
            maxDate : null,
            dateFormat : "mm/dd/yyyy",
            autoSize : false,
            rangeSelect : false,
            rangeSeparator : " - ",
            multiSelect : 0,
            multiSeparator : ",",
            onDate : null,
            onShow : null,
            onChangeMonthYear : null,
            onSelect : null,
            onClose : null,
            altField : null,
            altFormat : null,
            constrainInput : true,
            commandsAsDateFormat : false,
            selectDifferentDate: true,
            platForm : null,
            commands : {}
        },
        regionalOptions : {
            "" : {
                monthNames : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthNamesShort : ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
                dayNames : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                dayNamesShort : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                dayNamesMin : ["\uc77c", "\uc6d4", "\ud654", "\uc218", "\ubaa9", "\uae08", "\ud1a0"],
                dateFormat : "mm/dd/yyyy",
                firstDay : 0,
                renderer : {},
                prevText : "prev",
                prevStatus : "Show the previous month",
                prevJumpText : "&lt;&lt;",
                prevJumpStatus : "Show the previous year",
                nextText : "next",
                nextStatus : "Show the next month",
                nextJumpText : "&gt;&gt;",
                nextJumpStatus : "Show the next year",
                currentText : "Current",
                currentStatus : "Show the current month",
                todayText : "Today",
                todayStatus : "Show today's month",
                clearText : "Clear",
                clearStatus : "Clear all the dates",
                closeText : "Close",
                closeStatus : "Close the datepicker",
                yearStatus : "Change the year",
                earlierText : "&#160;&#160;\u25b2",
                laterText : "&#160;&#160;\u25bc",
                monthStatus : "Change the month",
                weekText : "Wk",
                weekStatus : "Week of the year",
                dayStatus : "Select DD, M d, yyyy",
                defaultStatus : "Select a date",
                isRTL : false
            }
        },
        _getters : ["getDate", "isDisabled", "isSelectable", "retrieveDate"],
        _disabled : [],
        _popupClass : name + "-popup",
        _triggerClass : name + "-trigger",
        _disableClass : name + "-disable",
        _monthYearClass : name + "-month-year",
        _curMonthClass : name + "-month-",
        _anyYearClass : name + "-any-year",
        _curDoWClass : name + "-dow-",
        _ticksTo1970 : 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1E7,
        _msPerDay : 864E5,
        ATOM : "yyyy-mm-dd",
        COOKIE : "D, dd M yyyy",
        FULL : "DD, MM d, yyyy",
        ISO_8601 : "yyyy-mm-dd",
        JULIAN : "J",
        RFC_822 : "D, d M yy",
        RFC_850 : "DD, dd-M-yy",
        RFC_1036 : "D, d M yy",
        RFC_1123 : "D, d M yyyy",
        RFC_2822 : "D, d M yyyy",
        RSS : "D, d M yy",
        TICKS : "!",
        TIMESTAMP : "@",
        W3C : "yyyy-mm-dd",
        /**
         * @param {string} format
         * @param {string} date
         * @param {string} settings
         * @return {?}
         */
        formatDate : function(format, date, settings) {
            if ("string" != typeof format && (settings = date, date = format, format = ""), !date) {
                return "";
            }
            format = format || this.defaultOptions.dateFormat;
            settings = settings || {};
            var dayNamesShort = settings.dayNamesShort || this.defaultOptions.dayNamesShort;
            var dayNames = settings.dayNames || this.defaultOptions.dayNames;
            var monthNamesShort = settings.monthNamesShort || this.defaultOptions.monthNamesShort;
            var monthNames = settings.monthNames || this.defaultOptions.monthNames;
            var calculateWeek = settings.calculateWeek || this.defaultOptions.calculateWeek;
            /**
             * @param {string} match
             * @param {number} step
             * @return {?}
             */
            var doubled = function(match, step) {
                /** @type {number} */
                var matches = 1;
                for (;iFormat + matches < format.length && format.charAt(iFormat + matches) === match;) {
                    matches++;
                }
                return iFormat += matches - 1, Math.floor(matches / (step || 1)) > 1;
            };
            /**
             * @param {string} match
             * @param {string} value
             * @param {number} len
             * @param {number} step
             * @return {?}
             */
            var formatNumber = function(match, value, len, step) {
                /** @type {string} */
                var num = "" + value;
                if (doubled(match, step)) {
                    for (;num.length < len;) {
                        /** @type {string} */
                        num = "0" + num;
                    }
                }
                return num;
            };
            /**
             * @param {string} match
             * @param {number} value
             * @param {Array} shortNames
             * @param {Array} longNames
             * @return {?}
             */
            var formatName = function(match, value, shortNames, longNames) {
                return doubled(match) ? longNames[value] : shortNames[value];
            };
            /** @type {string} */
            var output = "";
            /** @type {boolean} */
            var u = false;
            /** @type {number} */
            var iFormat = 0;
            for (;iFormat < format.length;iFormat++) {
                if (u) {
                    if ("'" !== format.charAt(iFormat) || doubled("'")) {
                        output += format.charAt(iFormat);
                    } else {
                        /** @type {boolean} */
                        u = false;
                    }
                } else {
                    switch(format.charAt(iFormat)) {
                        case "d":
                            output += formatNumber("d", date.getDate(), 2);
                            break;
                        case "D":
                            output += formatName("D", date.getDay(), dayNamesShort, dayNames);
                            break;
                        case "o":
                            output += formatNumber("o", this.dayOfYear(date), 3);
                            break;
                        case "w":
                            output += formatNumber("w", calculateWeek(date), 2);
                            break;
                        case "m":
                            output += formatNumber("m", date.getMonth() + 1, 2);
                            break;
                        case "M":
                            output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
                            break;
                        case "y":
                            output += doubled("y", 2) ? date.getFullYear() : (date.getFullYear() % 100 < 10 ? "0" : "") + date.getFullYear() % 100;
                            break;
                        case "@":
                            output += Math.floor(date.getTime() / 1E3);
                            break;
                        case "!":
                            output += 1E4 * date.getTime() + this._ticksTo1970;
                            break;
                        case "'":
                            if (doubled("'")) {
                                output += "'";
                            } else {
                                /** @type {boolean} */
                                u = true;
                            }
                            break;
                        default:
                            output += format.charAt(iFormat);
                    }
                }
            }
            return output;
        },
        /**
         * @param {string} format
         * @param {string} value
         * @param {Object} settings
         * @return {?}
         */
        parseDate : function(format, value, settings) {
            if (null == value) {
                throw "Invalid arguments";
            }
            if (value = "object" == typeof value ? value.toString() : value + "", "" === value) {
                return null;
            }
            format = format || this.defaultOptions.dateFormat;
            settings = settings || {};
            var string = settings.shortYearCutoff || this.defaultOptions.shortYearCutoff;
            string = "string" != typeof string ? string : this.today().getFullYear() % 100 + parseInt(string, 10);
            var dayNamesShort = settings.dayNamesShort || this.defaultOptions.dayNamesShort;
            var dayNames = settings.dayNames || this.defaultOptions.dayNames;
            var monthNamesShort = settings.monthNamesShort || this.defaultOptions.monthNamesShort;
            var monthNames = settings.monthNames || this.defaultOptions.monthNames;
            /** @type {number} */
            var year = -1;
            /** @type {number} */
            var month = -1;
            /** @type {number} */
            var day = -1;
            /** @type {number} */
            var doy = -1;
            /** @type {boolean} */
            var u = false;
            /** @type {boolean} */
            var p = false;
            /**
             * @param {string} match
             * @param {number} step
             * @return {?}
             */
            var doubled = function(match, step) {
                /** @type {number} */
                var matches = 1;
                for (;iFormat + matches < format.length && format.charAt(iFormat + matches) === match;) {
                    matches++;
                }
                return iFormat += matches - 1, Math.floor(matches / (step || 1)) > 1;
            };
            /**
             * @param {string} match
             * @param {number} step
             * @return {?}
             */
            var getNumber = function(match, step) {
                var nSteps = doubled(match, step);
                var n = [2, 3, nSteps ? 4 : 2, 11, 20]["oy@!".indexOf(match) + 1];
                /** @type {RegExp} */
                var pr_chunkPattern = new RegExp("^-?\\d{1," + n + "}");
                var matches = value.substring(iValue).match(pr_chunkPattern);
                if (!matches) {
                    throw "Missing number at position {0}".replace(/\{0\}/, iValue);
                }
                return iValue += matches[0].length, parseInt(matches[0], 10);
            };
            /**
             * @param {string} match
             * @param {(Object|string)} shortNames
             * @param {string} longNames
             * @param {number} step
             * @return {?}
             */
            var getName = function(match, shortNames, longNames, step) {
                var codeSegments = doubled(match, step) ? longNames : shortNames;
                /** @type {number} */
                var i = 0;
                for (;i < codeSegments.length;i++) {
                    if (value.substr(iValue, codeSegments[i].length).toLowerCase() === codeSegments[i].toLowerCase()) {
                        return iValue += codeSegments[i].length, i + 1;
                    }
                }
                throw "Unknown name at position {0}".replace(/\{0\}/, iValue);
            };
            /**
             * @return {undefined}
             */
            var checkLiteral = function() {
                if (value.charAt(iValue) !== format.charAt(iFormat)) {
                    throw "Unexpected literal at position {0}".replace(/\{0\}/, iValue);
                }
                iValue++;
            };
            /** @type {number} */
            var iValue = 0;
            /** @type {number} */
            var iFormat = 0;
            for (;iFormat < format.length;iFormat++) {
                if (p) {
                    if ("'" !== format.charAt(iFormat) || doubled("'")) {
                        checkLiteral();
                    } else {
                        /** @type {boolean} */
                        p = false;
                    }
                } else {
                    switch(format.charAt(iFormat)) {
                        case "d":
                            day = getNumber("d");
                            break;
                        case "D":
                            getName("D", dayNamesShort, dayNames);
                            break;
                        case "o":
                            doy = getNumber("o");
                            break;
                        case "w":
                            getNumber("w");
                            break;
                        case "m":
                            month = getNumber("m");
                            break;
                        case "M":
                            month = getName("M", monthNamesShort, monthNames);
                            break;
                        case "y":
                            var iSave = iFormat;
                            /** @type {boolean} */
                            u = !doubled("y", 2);
                            iFormat = iSave;
                            year = getNumber("y", 2);
                            break;
                        case "@":
                            var date = this._normaliseDate(new Date(1E3 * getNumber("@")));
                            year = date.getFullYear();
                            month = date.getMonth() + 1;
                            day = date.getDate();
                            break;
                        case "!":
                            date = this._normaliseDate(new Date((getNumber("!") - this._ticksTo1970) / 1E4));
                            year = date.getFullYear();
                            month = date.getMonth() + 1;
                            day = date.getDate();
                            break;
                        case "*":
                            iValue = value.length;
                            break;
                        case "'":
                            if (doubled("'")) {
                                checkLiteral();
                            } else {
                                /** @type {boolean} */
                                p = true;
                            }
                            break;
                        default:
                            checkLiteral();
                    }
                }
            }
            if (iValue < value.length) {
                throw "Additional text found at end";
            }
            if (-1 === year ? year = this.today().getFullYear() : 100 > year && (u && (year += -1 === string ? 1900 : this.today().getFullYear() - this.today().getFullYear() % 100 - (string >= year ? 0 : 100))), doy > -1) {
                /** @type {number} */
                month = 1;
                day = doy;
                var dim = this.daysInMonth(year, month);
                for (;day > dim;dim = this.daysInMonth(year, month)) {
                    month++;
                    day -= dim;
                }
            }
            date = this.newDate(year, month, day);
            if (date.getFullYear() !== year || (date.getMonth() + 1 !== month || date.getDate() !== day)) {
                throw "Invalid date";
            }
            return date;
        },
        /**
         * @param {Object} val
         * @param {string} defaultDate
         * @param {string} date
         * @param {string} value
         * @param {string} settings
         * @return {?}
         */
        determineDate : function(val, defaultDate, date, value, settings) {
            if (date) {
                if ("object" != typeof date) {
                    /** @type {string} */
                    settings = value;
                    /** @type {string} */
                    value = date;
                    /** @type {null} */
                    date = null;
                }
            }
            if ("string" != typeof value) {
                /** @type {string} */
                settings = value;
                /** @type {string} */
                value = "";
            }
            /**
             * @param {string} selector
             * @return {?}
             */
            var offsetString = function(selector) {
                try {
                    return assert.parseDate(value, selector, settings);
                } catch (t) {
                }
                selector = selector.toLowerCase();
                var time = (selector.match(/^c/) && date ? assert.newDate(date) : null) || assert.today();
                /** @type {RegExp} */
                var rquickExpr = /([+-]?[0-9]+)\s*(d|w|m|y)?/g;
                /** @type {null} */
                var matches = null;
                for (;matches = rquickExpr.exec(selector);) {
                    time = assert.add(time, parseInt(matches[1], 10), matches[2] || "d");
                }
                return time;
            };
            return defaultDate = defaultDate ? assert.newDate(defaultDate) : null, val = null == val ? defaultDate : "string" == typeof val ? offsetString(val) : "number" == typeof val ? isNaN(val) || (val === 1 / 0 || val === -(1 / 0)) ? defaultDate : assert.add(assert.today(), val, "d") : assert.newDate(val);
        },
        /**
         * @param {Object} year
         * @param {number} month
         * @return {?}
         */
        daysInMonth : function(year, month) {
            return month = year.getFullYear ? year.getMonth() + 1 : month, year = year.getFullYear ? year.getFullYear() : year, this.newDate(year, month + 1, 0).getDate();
        },
        /**
         * @param {Date} year
         * @param {number} month
         * @param {number} day
         * @return {?}
         */
        dayOfYear : function(year, month, day) {
            var date = year.getFullYear ? year : assert.newDate(year, month, day);
            var expected = assert.newDate(date.getFullYear(), 1, 1);
            return Math.floor((date.getTime() - expected.getTime()) / assert._msPerDay) + 1;
        },
        /**
         * @param {?} year
         * @param {number} month
         * @param {number} day
         * @return {?}
         */
        iso8601Week : function(year, month, day) {
            var checkDate = year.getFullYear ? new Date(year.getTime()) : assert.newDate(year, month, day);
            checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
            var time = checkDate.getTime();
            return checkDate.setMonth(0, 1), Math.floor(Math.round((time - checkDate) / assert._msPerDay) / 7) + 1;
        },
        /**
         * @return {?}
         */
        today : function() {
            return this._normaliseDate(new Date);
        },
        /**
         * @param {Object} year
         * @param {number} month
         * @param {number} recurring
         * @return {?}
         */
        newDate : function(year, month, recurring) {
            return year ? year.getFullYear ? this._normaliseDate(new Date(year.getTime())) : new Date(year, month - 1, recurring, 12) : null;
        },
        /**
         * @param {Date} isoDateTimeVal
         * @return {?}
         */
        _normaliseDate : function(isoDateTimeVal) {
            return isoDateTimeVal && isoDateTimeVal.setHours(12, 0, 0, 0), isoDateTimeVal;
        },
        /**
         * @param {Date} date
         * @param {?} year
         * @return {?}
         */
        year : function(date, year) {
            return date.setFullYear(year), this._normaliseDate(date);
        },
        /**
         * @param {Date} date
         * @param {number} month
         * @return {?}
         */
        month : function(date, month) {
            return date.setMonth(month - 1), this._normaliseDate(date);
        },
        /**
         * @param {Date} date
         * @param {number} deepDataAndEvents
         * @return {?}
         */
        day : function(date, deepDataAndEvents) {
            return date.setDate(deepDataAndEvents), this._normaliseDate(date);
        },
        /**
         * @param {Date} date
         * @param {number} expectedNumberOfNonCommentArgs
         * @param {string} c
         * @return {?}
         */
        add : function(date, expectedNumberOfNonCommentArgs, c) {
            if ("d" === c || "w" === c) {
                this._normaliseDate(date);
                date.setDate(date.getDate() + expectedNumberOfNonCommentArgs * ("w" === c ? 7 : 1));
            } else {
                var year = date.getFullYear() + ("y" === c ? expectedNumberOfNonCommentArgs : 0);
                var month = date.getMonth() + ("m" === c ? expectedNumberOfNonCommentArgs : 0);
                date.setTime(assert.newDate(year, month + 1, Math.min(date.getDate(), this.daysInMonth(year, month + 1))).getTime());
            }
            return date;
        },
        /**
         * @param {Date} index
         * @param {Object} inst
         * @return {?}
         */
        _applyMonthsOffset : function(index, inst) {
            var t = inst.options.monthsOffset;
            return $.isFunction(t) && (t = t.apply(inst.elem[0], [index])), assert.add(index, -t, "m");
        },
        /**
         * @return {undefined}
         */
        _init : function() {
            this.defaultOptions.commands = this.commands;
            this.defaultOptions.calculateWeek = this.iso8601Week;
            this.regionalOptions[""].renderer = this.defaultRenderer;
            this._super();
        },
        /**
         * @param {Array} elem
         * @param {?} dataAndEvents
         * @return {?}
         */
        _instSettings : function(elem, dataAndEvents) {
            return{
                selectedDates : [],
                drawDate : null,
                pickingRange : false,
                inline : $.inArray(elem[0].nodeName.toLowerCase(), ["div", "span"]) > -1,
                /**
                 * @param {string} name
                 * @return {?}
                 */
                get : function(name) {
                    return $.inArray(name, ["defaultDate", "minDate", "maxDate"]) > -1 ? assert.determineDate(this.options[name], null, this.selectedDates[0], this.options.dateFormat, this.getConfig()) : this.options[name];
                },
                /**
                 * @return {?}
                 */
                curMinDate : function() {
                    return this.pickingRange ? this.selectedDates[0] : this.get("minDate");
                },
                /**
                 * @return {?}
                 */
                getConfig : function() {
                    return{
                        dayNamesShort : this.options.dayNamesShort,
                        dayNames : this.options.dayNames,
                        monthNamesShort : this.options.monthNamesShort,
                        monthNames : this.options.monthNames,
                        calculateWeek : this.options.calculateWeek,
                        shortYearCutoff : this.options.shortYearCutoff
                    };
                }
            };
        },
        /**
         * @param {NodeList} target
         * @param {Object} inst
         * @return {undefined}
         */
        _postAttach : function(target, inst) {
            if (inst.inline) {
                inst.drawDate = assert._checkMinMax(assert.newDate(inst.selectedDates[0] || (inst.get("defaultDate") || assert.today())), inst);
                inst.prevDate = assert.newDate(inst.drawDate);
                this._update(target[0]);
                if ($.fn.mousewheel) {
                    target.mousewheel(this._doMouseWheel);
                }
            } else {
                this._attachments(target, inst);
                target.on("keydown." + inst.name, this._keyDown).on("keypress." + inst.name, this._keyPress).on("keyup." + inst.name, this._keyUp);
                if (target.attr("disabled")) {
                    this.disable(target[0]);
                }
            }
        },
        /**
         * @param {HTMLElement} target
         * @param {Object} inst
         * @param {Object} options
         * @return {undefined}
         */
        _optionsChanged : function(target, inst, options) {
            if (options.calendar && options.calendar !== inst.options.calendar) {
                /**
                 * @param {string} name
                 * @return {?}
                 */
                var setOptions = function(name) {
                    return "object" == typeof inst.options[name] ? null : inst.options[name];
                };
                options = $.extend({
                    defaultDate : setOptions("defaultDate"),
                    minDate : setOptions("minDate"),
                    maxDate : setOptions("maxDate")
                }, options);
                /** @type {Array} */
                inst.selectedDates = [];
                /** @type {null} */
                inst.drawDate = null;
            }
            var dates = inst.selectedDates;
            $.extend(inst.options, options);
            this.setDate(target[0], dates, null, false, true);
            /** @type {boolean} */
            inst.pickingRange = false;
            inst.drawDate = assert.newDate(this._checkMinMax((inst.options.defaultDate ? inst.get("defaultDate") : inst.drawDate) || (inst.get("defaultDate") || assert.today()), inst));
            if (!inst.inline) {
                this._attachments(target, inst);
            }
            if (inst.inline || inst.div) {
                this._update(target[0]);
            }
        },
        /**
         * @param {Object} target
         * @param {Object} inst
         * @return {undefined}
         */
        _attachments : function(target, inst) {
            target.off("focus." + inst.name);
            if (inst.options.showOnFocus) {
                target.on("focus." + inst.name, this.show);
            }
            if (inst.trigger) {
                inst.trigger.remove();
            }
            var selector = inst.options.showTrigger;
            inst.trigger = selector ? $(selector).clone().removeAttr("id").addClass(this._triggerClass)[inst.options.isRTL ? "insertBefore" : "insertAfter"](target).click(function() {
                    if (!assert.isDisabled(target[0])) {
                        assert[assert.curInst === inst ? "hide" : "show"](target[0]);
                    }
                }) : $([]);
            this._autoSize(target, inst);
            var dates = this._extractDates(inst, target.val());
            if (dates) {
                this.setDate(target[0], dates, null, true);
            }
            var newDate = inst.get("defaultDate");
            if (inst.options.selectDefaultDate) {
                if (newDate) {
                    if (0 === inst.selectedDates.length) {
                        this.setDate(target[0], assert.newDate(newDate || assert.today()));
                    }
                }
            }
        },
        /**
         * @param {Object} target
         * @param {Object} self
         * @return {undefined}
         */
        _autoSize : function(target, self) {
            if (self.options.autoSize && !self.inline) {
                var date = assert.newDate(2009, 10, 20);
                var dateFormat = self.options.dateFormat;
                if (dateFormat.match(/[DM]/)) {
                    /**
                     * @param {Array} codeSegments
                     * @return {?}
                     */
                    var findMax = function(codeSegments) {
                        /** @type {number} */
                        var maxLineLength = 0;
                        /** @type {number} */
                        var maxI = 0;
                        /** @type {number} */
                        var i = 0;
                        for (;i < codeSegments.length;i++) {
                            if (codeSegments[i].length > maxLineLength) {
                                maxLineLength = codeSegments[i].length;
                                /** @type {number} */
                                maxI = i;
                            }
                        }
                        return maxI;
                    };
                    date.setMonth(findMax(self.options[dateFormat.match(/MM/) ? "monthNames" : "monthNamesShort"]));
                    date.setDate(findMax(self.options[dateFormat.match(/DD/) ? "dayNames" : "dayNamesShort"]) + 20 - date.getDay());
                }
                self.elem.attr("size", assert.formatDate(dateFormat, date, self.getConfig()).length);
            }
        },
        /**
         * @param {Object} input
         * @param {Object} inst
         * @return {undefined}
         */
        _preDestroy : function(input, inst) {
            if (inst.trigger) {
                inst.trigger.remove();
            }
            input.empty().off("." + inst.name);
            if (inst.inline) {
                if ($.fn.mousewheel) {
                    input.unmousewheel();
                }
            }
            if (!inst.inline) {
                if (inst.options.autoSize) {
                    input.removeAttr("size");
                }
            }
        },
        /**
         * @param {?} dataAndEvents
         * @return {?}
         */
        multipleEvents : function(dataAndEvents) {
            /** @type {Arguments} */
            var codeSegments = arguments;
            return function(dataAndEvents) {
                /** @type {number} */
                var i = 0;
                for (;i < codeSegments.length;i++) {
                    codeSegments[i].apply(this, arguments);
                }
            };
        },
        /**
         * @param {Object} target
         * @return {undefined}
         */
        enable : function(target) {
            if (target = $(target), target.hasClass(this._getMarker())) {
                var inst = this._getInst(target);
                if (inst.inline) {
                    target.children("." + this._disableClass).remove().end().find("button,select").prop("disabled", false).end().find("a").attr("href", "javascript:void(0)");
                } else {
                    target.prop("disabled", false);
                    inst.trigger.filter("button." + this._triggerClass).prop("disabled", false).end().filter("img." + this._triggerClass).css({
                        opacity : "1.0",
                        cursor : ""
                    });
                }
                this._disabled = $.map(this._disabled, function(dataAndEvents) {
                    return dataAndEvents === target[0] ? null : dataAndEvents;
                });
            }
        },
        /**
         * @param {Object} target
         * @return {undefined}
         */
        disable : function(target) {
            if (target = $(target), target.hasClass(this._getMarker())) {
                var inst = this._getInst(target);
                if (inst.inline) {
                    var child = target.children(":last");
                    var p2 = child.offset();
                    var p = {
                        left : 0,
                        top : 0
                    };
                    child.parents().each(function() {
                        return "relative" === $(this).css("position") ? (p = $(this).offset(), false) : void 0;
                    });
                    var cDigit = target.css("zIndex");
                    /** @type {number} */
                    cDigit = ("auto" === cDigit ? 0 : parseInt(cDigit, 10)) + 1;
                    target.prepend('<div class="' + this._disableClass + '" style="width: ' + child.outerWidth() + "px; height: " + child.outerHeight() + "px; left: " + (p2.left - p.left) + "px; top: " + (p2.top - p.top) + "px; z-index: " + cDigit + '"></div>').find("button,select").prop("disabled", true).end().find("a").removeAttr("href");
                } else {
                    target.prop("disabled", true);
                    inst.trigger.filter("button." + this._triggerClass).prop("disabled", true).end().filter("img." + this._triggerClass).css({
                        opacity : "0.5",
                        cursor : "default"
                    });
                }
                this._disabled = $.map(this._disabled, function(dataAndEvents) {
                    return dataAndEvents === target[0] ? null : dataAndEvents;
                });
                this._disabled.push(target[0]);
            }
        },
        /**
         * @param {boolean} target
         * @return {?}
         */
        isDisabled : function(target) {
            return target && $.inArray(target, this._disabled) > -1;
        },
        /**
         * @param {Object} target
         * @return {undefined}
         */
        show : function(target) {
            target = $(target.target || target);
            var inst = assert._getInst(target);
            if (assert.curInst !== inst && (assert.curInst && assert.hide(assert.curInst, true), !$.isEmptyObject(inst))) {
                /** @type {null} */
                inst.lastVal = null;
                inst.selectedDates = assert._extractDates(inst, target.val());
                /** @type {boolean} */
                inst.pickingRange = false;
                inst.drawDate = assert._checkMinMax(assert.newDate(inst.selectedDates[0] || (inst.get("defaultDate") || assert.today())), inst);
                inst.prevDate = assert.newDate(inst.drawDate);
                assert.curInst = inst;
                assert._update(target[0], true);
                var iniPos = assert._checkOffset(inst);
                inst.div.css({
                    left : iniPos.left,
                    top : iniPos.top
                });
                var showAnim = inst.options.showAnim;
                var showSpeed = inst.options.showSpeed;
                if (showSpeed = "normal" === showSpeed && ($.ui && parseInt($.ui.version.substring(2)) >= 8) ? "_default" : showSpeed, $.effects && ($.effects[showAnim] || $.effects.effect && $.effects.effect[showAnim])) {
                    var obj = inst.div.data();
                    var prop;
                    for (prop in obj) {
                        if (prop.match(/^ec\.storage\./)) {
                            obj[prop] = inst._mainDiv.css(prop.replace(/ec\.storage\./, ""));
                        }
                    }
                    inst.div.data(obj).show(showAnim, inst.options.showOptions, showSpeed);
                } else {
                    inst.div[showAnim || "show"](showAnim ? showSpeed : 0);
                }
            }
        },
        /**
         * @param {Object} inst
         * @param {string} val
         * @return {?}
         */
        _extractDates : function(inst, val) {
            if (val !== inst.lastVal) {
                /** @type {string} */
                inst.lastVal = val;
                val = val.split(inst.options.multiSelect ? inst.options.multiSeparator : inst.options.rangeSelect ? inst.options.rangeSeparator : "\x00");
                /** @type {Array} */
                var list = [];
                /** @type {number} */
                var j = 0;
                for (;j < val.length;j++) {
                    try {
                        var thing = assert.parseDate(inst.options.dateFormat, val[j], inst.getConfig());
                        if (thing) {
                            /** @type {boolean} */
                            var i = false;
                            /** @type {number} */
                            var p = 0;
                            for (;p < list.length;p++) {
                                if (list[p].getTime() === thing.getTime()) {
                                    /** @type {boolean} */
                                    i = true;
                                    break;
                                }
                            }
                            if (!i) {
                                list.push(thing);
                            }
                        }
                    } catch (l) {
                    }
                }
                return list.splice(inst.options.multiSelect || (inst.options.rangeSelect ? 2 : 1), list.length), inst.options.rangeSelect && (1 === list.length && (list[1] = list[0])), list;
            }
        },
        /**
         * @param {Object} target
         * @param {boolean} hidden
         * @return {undefined}
         */
        _update : function(target, hidden) {
            target = $(target.target || target);
            var inst = assert._getInst(target);
            if (!$.isEmptyObject(inst)) {
                if (inst.inline || assert.curInst === inst) {
                    if (!!$.isFunction(inst.options.onChangeMonthYear)) {
                        if (!(inst.prevDate && (inst.prevDate.getFullYear() === inst.drawDate.getFullYear() && inst.prevDate.getMonth() === inst.drawDate.getMonth()))) {
                            inst.options.onChangeMonthYear.apply(target[0], [inst.drawDate.getFullYear(), inst.drawDate.getMonth() + 1]);
                        }
                    }
                }
                if (inst.inline) {
                    target.html(this._generateContent(target[0], inst));
                } else {
                    if (assert.curInst === inst) {
                        if (!inst.div) {
                            inst.div = $("<div></div>").addClass(this._popupClass).css({
                                display : hidden ? "none" : "static",
                                position : "absolute",
                                left : target.offset().left,
                                top : target.offset().top + target.outerHeight()
                            }).appendTo($(inst.options.popupContainer || "body"));
                            if ($.fn.mousewheel) {
                                inst.div.mousewheel(this._doMouseWheel);
                            }
                        }
                        inst.div.html(this._generateContent(target[0], inst));
                    }
                }
            }
        },
        /**
         * @param {Object} target
         * @param {boolean} recurring
         * @return {undefined}
         */
        _updateInput : function(target, recurring) {
            var inst = this._getInst(target);
            if (!$.isEmptyObject(inst)) {
                /** @type {string} */
                var str = "";
                /** @type {string} */
                var rrule = "";
                var sep = inst.options.multiSelect ? inst.options.multiSeparator : inst.options.rangeSeparator;
                var dateFormat = inst.options.altFormat || inst.options.dateFormat;
                /** @type {number} */
                var i = 0;
                for (;i < inst.selectedDates.length;i++) {
                    str += recurring ? "" : (i > 0 ? sep : "") + assert.formatDate(inst.options.dateFormat, inst.selectedDates[i], inst.getConfig());
                    rrule += (i > 0 ? sep : "") + assert.formatDate(dateFormat, inst.selectedDates[i], inst.getConfig());
                }
                if (!inst.inline) {
                    if (!recurring) {
                        $(target).val(str);
                    }
                }
                $(inst.options.altField).val(rrule);
                if (!!$.isFunction(inst.options.onSelect)) {
                    if (!recurring) {
                        if (!inst.inSelect) {
                            /** @type {boolean} */
                            inst.inSelect = true;
                            inst.options.onSelect.apply(target, [inst.selectedDates]);
                            /** @type {boolean} */
                            inst.inSelect = false;
                        }
                    }
                }
            }
        },
        /**
         * @param {Object} elem
         * @return {?}
         */
        _getBorders : function(elem) {
            /**
             * @param {string} value
             * @return {?}
             */
            var convert = function(value) {
                return{
                        thin : 1,
                        medium : 3,
                        thick : 5
                    }[value] || value;
            };
            return[parseFloat(convert(elem.css("border-left-width"))), parseFloat(convert(elem.css("border-top-width")))];
        },
        /**
         * @param {Object} inst
         * @return {?}
         */
        _checkOffset : function(inst) {
            var iframe = inst.elem.is(":hidden") && inst.trigger ? inst.trigger : inst.elem;
            var offset = iframe.offset();
            var browserWidth = $(window).width();
            var browserHeight = $(window).height();
            if (0 === browserWidth) {
                return offset;
            }
            /** @type {boolean} */
            var isFixed = false;
            $(inst.elem).parents().each(function() {
                return isFixed |= "fixed" === $(this).css("position"), !isFixed;
            });
            /** @type {number} */
            var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
            /** @type {number} */
            var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
            /** @type {number} */
            var above = offset.top - (isFixed ? scrollY : 0) - inst.div.outerHeight();
            var below = offset.top - (isFixed ? scrollY : 0) + iframe.outerHeight();
            /** @type {number} */
            var alignL = offset.left - (isFixed ? scrollX : 0);
            /** @type {number} */
            var alignR = offset.left - (isFixed ? scrollX : 0) + iframe.outerWidth() - inst.div.outerWidth();
            /** @type {boolean} */
            var tooWide = offset.left - scrollX + inst.div.outerWidth() > browserWidth;
            /** @type {boolean} */
            var tooHigh = offset.top - scrollY + inst.elem.outerHeight() + inst.div.outerHeight() > browserHeight;
            inst.div.css("position", isFixed ? "fixed" : "absolute");
            var alignment = inst.options.alignment;
            return offset = "topLeft" === alignment ? {
                    left : alignL,
                    top : above
                } : "topRight" === alignment ? {
                        left : alignR,
                        top : above
                    } : "bottomLeft" === alignment ? {
                            left : alignL,
                            top : below
                        } : "bottomRight" === alignment ? {
                                left : alignR,
                                top : below
                            } : "top" === alignment ? {
                                    left : inst.options.isRTL || tooWide ? alignR : alignL,
                                    top : above
                                } : {
                                    left : inst.options.isRTL || tooWide ? alignR : alignL,
                                    top : tooHigh ? above : below
                                }, offset.left = Math.max(isFixed ? 0 : scrollX, offset.left), offset.top = Math.max(isFixed ? 0 : scrollY, offset.top), offset;
        },
        /**
         * @param {Event} event
         * @return {undefined}
         */
        _checkExternalClick : function(event) {
            if (assert.curInst) {
                var $btn = $(event.target);
                if (!(0 !== $btn.closest("." + assert._popupClass + ",." + assert._triggerClass).length)) {
                    if (!$btn.hasClass(assert._getMarker())) {
                        assert.hide(assert.curInst);
                    }
                }
            }
        },
        /**
         * @param {Object} target
         * @param {boolean} immediate
         * @return {undefined}
         */
        hide : function(target, immediate) {
            if (target) {
                var inst = this._getInst(target);
                if ($.isEmptyObject(inst) && (inst = target), inst && inst === assert.curInst) {
                    var showAnim = immediate ? "" : inst.options.showAnim;
                    var showSpeed = inst.options.showSpeed;
                    showSpeed = "normal" === showSpeed && ($.ui && parseInt($.ui.version.substring(2)) >= 8) ? "_default" : showSpeed;
                    /**
                     * @return {undefined}
                     */
                    var postProcess = function() {
                        if (inst.div) {
                            inst.div.remove();
                            /** @type {null} */
                            inst.div = null;
                            /** @type {null} */
                            assert.curInst = null;
                            if ($.isFunction(inst.options.onClose)) {
                                inst.options.onClose.apply(target, [inst.selectedDates]);
                            }
                        }
                    };
                    if (inst.div.stop(), $.effects && ($.effects[showAnim] || $.effects.effect && $.effects.effect[showAnim])) {
                        inst.div.hide(showAnim, inst.options.showOptions, showSpeed, postProcess);
                    } else {
                        /** @type {string} */
                        var hideAnim = "slideDown" === showAnim ? "slideUp" : "fadeIn" === showAnim ? "fadeOut" : "hide";
                        inst.div[hideAnim](showAnim ? showSpeed : "", postProcess);
                    }
                    if (!showAnim) {
                        postProcess();
                    }
                }
            }
        },
        /**
         * @param {Object} event
         * @return {?}
         */
        _keyDown : function(event) {
            var target = event.data && event.data.elem || event.target;
            var inst = assert._getInst(target);
            /** @type {boolean} */
            var o = false;
            if (inst.inline || inst.div) {
                if (9 === event.keyCode) {
                    assert.hide(target);
                } else {
                    if (13 === event.keyCode) {
                        assert.selectDate(target, $("a." + inst.options.renderer.highlightedClass, inst.div)[0]);
                        /** @type {boolean} */
                        o = true;
                    } else {
                        var commands = inst.options.commands;
                        var name;
                        for (name in commands) {
                            var command = commands[name];
                            if (command.keystroke.keyCode === event.keyCode && (!!command.keystroke.ctrlKey == !(!event.ctrlKey && !event.metaKey) && (!!command.keystroke.altKey === event.altKey && !!command.keystroke.shiftKey === event.shiftKey))) {
                                assert.performAction(target, name);
                                /** @type {boolean} */
                                o = true;
                                break;
                            }
                        }
                    }
                }
            } else {
                command = inst.options.commands.current;
                if (command.keystroke.keyCode === event.keyCode) {
                    if (!!command.keystroke.ctrlKey == !(!event.ctrlKey && !event.metaKey)) {
                        if (!!command.keystroke.altKey === event.altKey) {
                            if (!!command.keystroke.shiftKey === event.shiftKey) {
                                assert.show(target);
                                /** @type {boolean} */
                                o = true;
                            }
                        }
                    }
                }
            }
            return inst.ctrlKey = event.keyCode < 48 && 32 !== event.keyCode || (event.ctrlKey || event.metaKey), o && (event.preventDefault(), event.stopPropagation()), !o;
        },
        /**
         * @param {Object} ev
         * @return {?}
         */
        _keyPress : function(ev) {
            var self = assert._getInst(ev.data && ev.data.elem || ev.target);
            if (!$.isEmptyObject(self) && self.options.constrainInput) {
                /** @type {string} */
                var prefix = String.fromCharCode(ev.keyCode || ev.charCode);
                var buf = assert._allowedChars(self);
                return ev.metaKey || (self.ctrlKey || (" " > prefix || (!buf || buf.indexOf(prefix) > -1)));
            }
            return true;
        },
        /**
         * @param {Element} self
         * @return {?}
         */
        _allowedChars : function(self) {
            var allowedChars = self.options.multiSelect ? self.options.multiSeparator : self.options.rangeSelect ? self.options.rangeSeparator : "";
            /** @type {boolean} */
            var a = false;
            /** @type {boolean} */
            var hasNum = false;
            var dateFormat = self.options.dateFormat;
            /** @type {number} */
            var i = 0;
            for (;i < dateFormat.length;i++) {
                var ch = dateFormat.charAt(i);
                if (a) {
                    if ("'" === ch && "'" !== dateFormat.charAt(i + 1)) {
                        /** @type {boolean} */
                        a = false;
                    } else {
                        allowedChars += ch;
                    }
                } else {
                    switch(ch) {
                        case "d":
                            ;
                        case "m":
                            ;
                        case "o":
                            ;
                        case "w":
                            allowedChars += hasNum ? "" : "0123456789";
                            /** @type {boolean} */
                            hasNum = true;
                            break;
                        case "y":
                            ;
                        case "@":
                            ;
                        case "!":
                            allowedChars += (hasNum ? "" : "0123456789") + "-";
                            /** @type {boolean} */
                            hasNum = true;
                            break;
                        case "J":
                            allowedChars += (hasNum ? "" : "0123456789") + "-.";
                            /** @type {boolean} */
                            hasNum = true;
                            break;
                        case "D":
                            ;
                        case "M":
                            ;
                        case "Y":
                            return null;
                        case "'":
                            if ("'" === dateFormat.charAt(i + 1)) {
                                allowedChars += "'";
                            } else {
                                /** @type {boolean} */
                                a = true;
                            }
                            break;
                        default:
                            allowedChars += ch;
                    }
                }
            }
            return allowedChars;
        },
        /**
         * @param {Event} event
         * @return {?}
         */
        _keyUp : function(event) {
            var input = event.data && event.data.elem || event.target;
            var inst = assert._getInst(input);
            if (!$.isEmptyObject(inst) && (!inst.ctrlKey && inst.lastVal !== inst.elem.val())) {
                try {
                    var dates = assert._extractDates(inst, inst.elem.val());
                    if (dates.length > 0) {
                        assert.setDate(input, dates, null, true);
                    }
                } catch (t) {
                }
            }
            return true;
        },
        /**
         * @param {Event} event
         * @param {number} delta
         * @return {undefined}
         */
        _doMouseWheel : function(event, delta) {
            var target = assert.curInst && assert.curInst.elem[0] || $(event.target).closest("." + assert._getMarker())[0];
            if (!assert.isDisabled(target)) {
                var elem = assert._getInst(target);
                if (elem.options.useMouseWheel) {
                    /** @type {number} */
                    delta = 0 > delta ? -1 : 1;
                    assert.changeMonth(target, -elem.options[event.ctrlKey ? "monthsToJump" : "monthsToStep"] * delta);
                }
                event.preventDefault();
            }
        },
        /**
         * @param {Window} target
         * @return {undefined}
         */
        clear : function(target) {
            var inst = this._getInst(target);
            if (!$.isEmptyObject(inst)) {
                /** @type {Array} */
                inst.selectedDates = [];
                this.hide(target);
                var selectDefaultDate = inst.get("defaultDate");
                if (inst.options.selectDefaultDate && selectDefaultDate) {
                    this.setDate(target, assert.newDate(selectDefaultDate || assert.today()));
                } else {
                    this._updateInput(target);
                }
            }
        },
        /**
         * @param {?} target
         * @return {?}
         */
        getDate : function(target) {
            var inst = this._getInst(target);
            return $.isEmptyObject(inst) ? [] : inst.selectedDates;
        },
        /**
         * @param {number} target
         * @param {Array} dates
         * @param {Array} endDate
         * @param {boolean} recurring
         * @param {boolean} dataAndEvents
         * @return {undefined}
         */
        setDate : function(target, dates, endDate, recurring, dataAndEvents) {
            var inst = this._getInst(target);
            if (!$.isEmptyObject(inst)) {
                if (!$.isArray(dates)) {
                    /** @type {Array} */
                    dates = [dates];
                    if (endDate) {
                        dates.push(endDate);
                    }
                }
                var minDate = inst.get("minDate");
                var maxDate = inst.get("maxDate");
                var i = inst.selectedDates[0];
                /** @type {Array} */
                inst.selectedDates = [];
                /** @type {number} */
                var idx = 0;
                for (;idx < dates.length;idx++) {
                    var temp = assert.determineDate(dates[idx], null, i, inst.options.dateFormat, inst.getConfig());
                    if (temp) {
                        if (!minDate || temp.getTime() >= minDate.getTime()) {
                            if (!maxDate || temp.getTime() <= maxDate.getTime()) {
                                inst.selectedDates.push(temp);
                            }
                        }
                    }
                }
                if (inst.selectedDates.splice(inst.options.multiSelect || (inst.options.rangeSelect ? 2 : 1), inst.selectedDates.length), inst.options.rangeSelect) {
                    switch(inst.selectedDates.length) {
                        case 1:
                            inst.selectedDates[1] = inst.selectedDates[0];
                            break;
                        case 2:
                            inst.selectedDates[1] = inst.selectedDates[0].getTime() > inst.selectedDates[1].getTime() ? inst.selectedDates[0] : inst.selectedDates[1];
                    }
                    /** @type {boolean} */
                    inst.pickingRange = false;
                }
                inst.prevDate = inst.drawDate ? assert.newDate(inst.drawDate) : null;
                inst.drawDate = this._checkMinMax(assert.newDate(inst.selectedDates[0] || (inst.get("defaultDate") || assert.today())), inst);
                if (!dataAndEvents) {
                    this._update(target);
                    this._updateInput(target, recurring);
                }
            }
        },
        /**
         * @param {?} target
         * @param {Object} date
         * @return {?}
         */
        isSelectable : function(target, date) {
            var inst = this._getInst(target);
            return $.isEmptyObject(inst) ? false : (date = assert.determineDate(date, inst.selectedDates[0] || this.today(), null, inst.options.dateFormat, inst.getConfig()), this._isSelectable(target, date, inst.options.onDate, inst.get("minDate"), inst.get("maxDate")));
        },
        /**
         * @param {?} thisObj
         * @param {Object} date
         * @param {Function} fn
         * @param {Date} minDate
         * @param {Date} maxDate
         * @return {?}
         */
        _isSelectable : function(thisObj, date, fn, minDate, maxDate) {
            var options = "boolean" == typeof fn ? {
                    /** @type {Function} */
                    selectable : fn
                } : $.isFunction(fn) ? fn.apply(thisObj, [date, true]) : {};
            return options.selectable !== false && ((!minDate || date.getTime() >= minDate.getTime()) && (!maxDate || date.getTime() <= maxDate.getTime()));
        },
        /**
         * @param {boolean} target
         * @param {string} name
         * @return {undefined}
         */
        performAction : function(target, name) {
            var data = this._getInst(target);
            if (!$.isEmptyObject(data) && !this.isDisabled(target)) {
                var commands = data.options.commands;
                if (commands[name]) {
                    if (commands[name].enabled.apply(target, [data])) {
                        commands[name].action.apply(target, [data]);
                    }
                }
            }
        },
        /**
         * @param {Object} target
         * @param {number} year
         * @param {number} month
         * @param {number} day
         * @return {undefined}
         */
        showMonth : function(target, year, month, day) {
            var inst = this._getInst(target);
            if (!$.isEmptyObject(inst) && (null != day || (inst.drawDate.getFullYear() !== year || inst.drawDate.getMonth() + 1 !== month))) {
                inst.prevDate = assert.newDate(inst.drawDate);
                var show = this._checkMinMax(null != year ? assert.newDate(year, month, 1) : assert.today(), inst);
                inst.drawDate = assert.newDate(show.getFullYear(), show.getMonth() + 1, null != day ? day : Math.min(inst.drawDate.getDate(), assert.daysInMonth(show.getFullYear(), show.getMonth() + 1)));
                this._update(target);
            }
        },
        /**
         * @param {Object} target
         * @param {number} offset
         * @return {undefined}
         */
        changeMonth : function(target, offset) {
            var inst = this._getInst(target);
            if (!$.isEmptyObject(inst)) {
                var date = assert.add(assert.newDate(inst.drawDate), offset, "m");
                this.showMonth(target, date.getFullYear(), date.getMonth() + 1);
            }
        },
        /**
         * @param {Object} target
         * @param {number} expectedNumberOfNonCommentArgs
         * @return {undefined}
         */
        changeDay : function(target, expectedNumberOfNonCommentArgs) {
            var inst = this._getInst(target);
            if (!$.isEmptyObject(inst)) {
                var date = assert.add(assert.newDate(inst.drawDate), expectedNumberOfNonCommentArgs, "d");
                this.showMonth(target, date.getFullYear(), date.getMonth() + 1, date.getDate());
            }
        },
        /**
         * @param {Object} date
         * @param {Object} inst
         * @return {?}
         */
        _checkMinMax : function(date, inst) {
            var minDate = inst.get("minDate");
            var maxDate = inst.get("maxDate");
            return date = minDate && date.getTime() < minDate.getTime() ? assert.newDate(minDate) : date, date = maxDate && date.getTime() > maxDate.getTime() ? assert.newDate(maxDate) : date;
        },
        /**
         * @param {Object} target
         * @param {Element} elem
         * @return {?}
         */
        retrieveDate : function(target, elem) {
            var targets = this._getInst(target);
            return $.isEmptyObject(targets) ? null : this._normaliseDate(new Date(parseInt(elem.className.replace(/^.*dp(-?\d+).*$/, "$1"), 10)));
        },
        /**
         * @param {Object} target
         * @param {Element} elem
         * @return {undefined}
         */
        selectDate : function(target, elem) {
            var inst = this._getInst(target);
            if (!$.isEmptyObject(inst) && !this.isDisabled(target)) {
                var date = this.retrieveDate(target, elem),
                    isSameDates = date.getTime() === (inst.selectedDates.length > 0 ? inst.selectedDates[0].getTime() : "");

                if( inst.options.selectDifferentDate && inst.selectedDates.length === 1 && isSameDates ){
                    return false;
                }

                if (inst.options.multiSelect) {
                    if ("depDatePicker" == target.id) {
                        /** @type {boolean} */
                        var i = false;
                        /** @type {number} */
                        var j = 0;
                        for (;j < inst.selectedDates.length;j++) {
                            if (date.getTime() === inst.selectedDates[j].getTime()) {
                                inst.selectedDates.splice(j, 1);
                                /** @type {boolean} */
                                i = true;
                                break;
                            }
                        }
                        if (!i) {
                            inst.selectedDates.push(date);
                        }
                    } else {
                        /** @type {boolean} */
                        var program = inst.selectedDates.length === inst.options.multiSelect;
                        /** @type {boolean} */
                        var inverse = inst.selectedDates.length > 0 && date.getTime() < inst.selectedDates[inst.selectedDates.length - 1].getTime();
                        if (program || inverse) {
                            /** @type {Array} */
                            inst.selectedDates = [];
                            inst.selectedDates[0] = date;
                        } else {
                            if (!program) {
                                inst.selectedDates.push(date);
                            }
                        }
                    }
                } else {
                    if (inst.options.rangeSelect) {
                        if (inst.pickingRange) {
                            inst.selectedDates[1] = date;
                        } else {
                            /** @type {Array} */
                            inst.selectedDates = [date, date];
                        }
                        /** @type {boolean} */
                        inst.pickingRange = !inst.pickingRange;
                    } else {
                        /** @type {Array} */
                        inst.selectedDates = [date];
                    }
                }
                inst.prevDate = inst.drawDate = assert.newDate();
                this._updateInput(target);
                if (inst.inline || (inst.pickingRange || inst.selectedDates.length < (inst.options.multiSelect || (inst.options.rangeSelect ? 2 : 1)))) {
                    this.updateClass(target,inst.selectedDates);
                    //this._update(target);
                } else {
                    this.hide(target);
                }
            }
        },
        updateClass : function(target, selectedDates){
          
            
            if(selectedDates.length > 0){

                //remove middleClass
                $(target).find('.middle').removeClass('middle');
                $(target).find('.selected').removeClass('selected');
                
                //add middleClass
                if(selectedDates.length == 2){

                   var perDay = 1000 * 60 * 60 * 24;

                   var startDate =  selectedDates[0].getTime();
                   var endDate =  selectedDates[1].getTime();

                   var diffDays = Math.abs((startDate - endDate) / perDay);

                   if(diffDays > 30){
                        $('.dp'+selectedDates[1].getTime()).not('.disable').addClass('middle');
                        return ;
                   }

                   if(diffDays){
                       for(var days = 1 ; days < diffDays ; days++){
                        var middledate = new Date(selectedDates[0].getTime());
                        middledate.setDate(middledate.getDate() + days);
                        $('.dp'+middledate.getTime()).not('.disable').addClass('selected');
                       }
                   }
                }

                selectedDates.map( (a,index) =>{
                    $('.dp'+a.getTime()).not('.disable').addClass('middle');
                });


            }

        },
        /**
         * @param {Object} target
         * @param {Object} inst
         * @return {?}
         */
        _generateContent : function(target, inst) {
            /**
             * @return {undefined}
             */
            function init() {
                (inst.inline ? $(this).closest("." + self._getMarker()) : inst.div).find(inst.options.renderer.daySelector + " a").removeClass(inst.options.renderer.highlightedClass);
            }
            var monthsToShow = inst.options.monthsToShow;
            monthsToShow = $.isArray(monthsToShow) ? monthsToShow : [1, monthsToShow];
            inst.drawDate = this._checkMinMax(inst.drawDate || (inst.get("defaultDate") || assert.today()), inst);
            var date = assert._applyMonthsOffset(assert.newDate(inst.drawDate), inst);
            /** @type {string} */
            var monthRows = "";
            /** @type {number} */
            var row = 0;
            for (;row < monthsToShow[0];row++) {
                /** @type {string} */
                var months = "";
                /** @type {number} */
                var col = 0;
                for (;col < monthsToShow[1];col++) {
                    months += this._generateMonth(target, inst, date.getFullYear(), date.getMonth() + 1, inst.options.renderer, 0 === row && 0 === col);
                    assert.add(date, 1, "m");
                }
                monthRows += this._prepare(inst.options.renderer.monthRow, inst).replace(/\{months\}/, months);
            }
            var picker = this._prepare(inst.options.renderer.picker, inst).replace(/\{months\}/, monthRows).replace(/\{weekHeader\}/g, this._generateDayHeaders(inst, inst.options.renderer));
            /**
             * @param {string} name
             * @param {string} id
             * @param {string} obj
             * @param {string} key
             * @param {string} title
             * @return {undefined}
             */
            var addCommand = function(name, id, obj, key, title) {
                if (-1 !== picker.indexOf("{" + name + ":" + key + "}")) {
                    var args = inst.options.commands[key];
                    var date = inst.options.commandsAsDateFormat ? args.date.apply(target, [inst]) : null;
                    picker = picker.replace(new RegExp("\\{" + name + ":" + key + "\\}", "g"), "<" + id + (args.status ? ' title="' + inst.options[args.status] + '"' : "") + ' class="' + inst.options.renderer.commandClass + " " + inst.options.renderer.commandClass + "-" + key + " " + title + (args.enabled(inst) ? "" : " " + inst.options.renderer.disabledClass) + '">' + (date ? assert.formatDate(inst.options[args.text], date, inst.getConfig()) : inst.options[args.text]) + "</" + obj + ">");
                }
            };
            var camelKey;
            for (camelKey in inst.options.commands) {
                addCommand("button", 'button type="button"', "button", camelKey, inst.options.renderer.commandButtonClass);
                addCommand("link", 'a href="javascript:void(0)"', "a", camelKey, inst.options.renderer.commandLinkClass);
            }
            if (picker = $(picker), monthsToShow[1] > 1) {
                /** @type {number} */
                var count = 0;
                $(inst.options.renderer.monthSelector, picker).each(function() {
                    /** @type {number} */
                    var txt = ++count % monthsToShow[1];
                    $(this).addClass(1 === txt ? "first" : 0 === txt ? "last" : "");
                });
            }
            var self = this;
            picker.find(inst.options.renderer.daySelector + " a").hover(function() {
                init.apply(this);
                $(this).addClass(inst.options.renderer.highlightedClass);
            }, init).click(function() {
                self.selectDate(target, this);
            }).end().find("select." + this._monthYearClass + ":not(." + this._anyYearClass + ")").change(function() {
                var bits = $(this).val().split("/");
                self.showMonth(target, parseInt(bits[1], 10), parseInt(bits[0], 10));
            }).end().find("select." + this._anyYearClass).click(function() {
                $(this).css("visibility", "hidden").next("input").css({
                    left : this.offsetLeft,
                    top : this.offsetTop,
                    width : this.offsetWidth,
                    height : this.offsetHeight
                }).show().focus();
            }).end().find("input." + self._monthYearClass).change(function() {
                try {
                    /** @type {number} */
                    var year = parseInt($(this).val(), 10);
                    year = isNaN(year) ? inst.drawDate.getFullYear() : year;
                    self.showMonth(target, year, inst.drawDate.getMonth() + 1, inst.drawDate.getDate());
                } catch (MSG_CLOSURE_CUSTOM_COLOR_INVALID_INPUT) {
                    alert(MSG_CLOSURE_CUSTOM_COLOR_INVALID_INPUT);
                }
            }).keydown(function(e) {
                if (13 === e.keyCode) {
                    $(e.elem).change();
                } else {
                    if (27 === e.keyCode) {
                        $(e.elem).hide().prev("select").css("visibility", "visible");
                        inst.elem.focus();
                    }
                }
            });
            var scheduleParse = {
                elem : inst.elem[0]
            };
            picker.keydown(scheduleParse, this._keyDown).keypress(scheduleParse, this._keyPress).keyup(scheduleParse, this._keyUp);
            picker.find("." + inst.options.renderer.commandClass).click(function() {
                if (!$(this).hasClass(inst.options.renderer.disabledClass)) {
                    var name = this.className.replace(new RegExp("^.*" + inst.options.renderer.commandClass + "-([^ ]+).*$"), "$1");
                    assert.performAction(target, name);
                }
            });
            if (inst.options.isRTL) {
                picker.addClass(inst.options.renderer.rtlClass);
            }
            if (monthsToShow[0] * monthsToShow[1] > 1) {
                picker.addClass(inst.options.renderer.multiClass);
            }
            if (inst.options.pickerClass) {
                picker.addClass(inst.options.pickerClass);
            }
            $("body").append(picker);
            /** @type {number} */
            var width = 0;
            return picker.find(inst.options.renderer.monthSelector).each(function() {
                width += $(this).outerWidth();
            }), picker.width(width / monthsToShow[0]), $.isFunction(inst.options.onShow) && inst.options.onShow.apply(target, [picker, inst]), picker;
        },
        /**
         * @param {Object} target
         * @param {Object} inst
         * @param {Window} year
         * @param {?} month
         * @param {Object} renderer
         * @param {boolean} first
         * @return {?}
         */
        _generateMonth : function(target, inst, year, month, renderer, first) {
            var key = assert.daysInMonth(year, month);
            var monthsToShow = inst.options.monthsToShow;
            monthsToShow = $.isArray(monthsToShow) ? monthsToShow : [1, monthsToShow];
            var selector = inst.options.fixedWeeks || monthsToShow[0] * monthsToShow[1] > 1;
            if ("mobile" === inst.options.platForm) {
                /** @type {boolean} */
                selector = false;
            }
            var string = inst.options.firstDay;
            /** @type {number} */
            var buf = (assert.newDate(year, month, 1).getDay() - string + 7) % 7;
            /** @type {number} */
            var elems = selector ? 6 : Math.ceil((buf + key) / 7);
            var selectOtherMonths = inst.options.selectOtherMonths && inst.options.showOtherMonths;
            var minDate = inst.pickingRange ? inst.selectedDates[0] : inst.get("minDate");
            var maxDate = inst.get("maxDate");
            /** @type {boolean} */
            var params = renderer.week.indexOf("{weekOfYear}") > -1;
            var expected = assert.today();
            var date = assert.newDate(year, month, 1);
            assert.add(date, -buf - (selector && date.getDay() === string ? 7 : 0), "d");
            var w = date.getTime();
            /** @type {string} */
            var version = "";
            var themeType = $("[role=itinFlg].on").attr("data-type");
            var cnl = inst.selectedDates.length;
            /** @type {number} */
            var s = 0;
            for (;elems > s;s++) {
                /** @type {string} */
                var qs = params ? '<span class="dp' + w + '">' + ($.isFunction(inst.options.calculateWeek) ? inst.options.calculateWeek(date) : 0) + "</span>" : "";
                /** @type {string} */
                var guess = "";
                /** @type {number} */
                var S = 0;
                for (;7 > S;S++) {
                    /** @type {boolean} */
                    var x = false;
                    /** @type {boolean} */
                    var zeroWidth = false;
                    /** @type {boolean} */
                    var a = false;
                    /** @type {boolean} */
                    var b = false;
                    /** @type {boolean} */
                    var shouldThrow = false;
                    /** @type {boolean} */
                    var threw = false;
                    /** @type {boolean} */
                    var err = false;
                    /** @type {boolean} */
                    var err2 = false;
                    /** @type {boolean} */
                    var needsFlash = false;
                    if ((inst.options.rangeSelect || inst.options.multiSelect) && inst.selectedDates.length > 0) {
                        if ("depDatePicker" == target.id) {
                            /** @type {boolean} */
                            x = inst.selectedDates.toString().indexOf(date.toString()) >= 0;
                            if (x) {
                                /** @type {boolean} */
                                needsFlash = true;
                            }
                        } else {
                            /** @type {boolean} */
                            x = date.getTime() >= inst.selectedDates[0] && date.getTime() <= inst.selectedDates[inst.selectedDates.length - 1];
                            if (x) {
                                if (date.getTime() === inst.selectedDates[0].getTime()) {
                                    if ("RT" === themeType) {
                                        /** @type {boolean} */
                                        a = true;
                                    } else {
                                        /** @type {boolean} */
                                        shouldThrow = true;
                                    }
                                }
                                if (cnl > 1) {
                                    if (date.getTime() === inst.selectedDates[1].getTime()) {
                                        if ("RT" === themeType) {
                                            /** @type {boolean} */
                                            b = true;
                                        } else {
                                            /** @type {boolean} */
                                            threw = true;
                                        }
                                    }
                                }
                                if (cnl > 2) {
                                    if (date.getTime() === inst.selectedDates[2].getTime()) {
                                        /** @type {boolean} */
                                        err = true;
                                    }
                                }
                                if (cnl > 3) {
                                    if (date.getTime() === inst.selectedDates[3].getTime()) {
                                        /** @type {boolean} */
                                        err2 = true;
                                    }
                                }
                            }
                        }
                    } else {
                        /** @type {number} */
                        var j = 0;
                        for (;j < inst.selectedDates.length;j++) {
                            if (inst.selectedDates[j].getTime() === date.getTime()) {
                                /** @type {boolean} */
                                zeroWidth = true;
                                break;
                            }
                        }
                    }
                    var dateInfo = $.isFunction(inst.options.onDate) ? inst.options.onDate.apply(target, [date, date.getMonth() + 1 === month]) : {};
                    var selectable = (selectOtherMonths || date.getMonth() + 1 === month) && this._isSelectable(target, date, dateInfo.selectable, minDate, maxDate);
                    guess += this._prepare(renderer.day, inst).replace(/\{day\}/g, (selectable ? '<a href="javascript:void(0)"' : "<span")
                        + ' class="dp' + w + " " + (dateInfo.dateClass || "")
                        + (zeroWidth || (a || (b || (shouldThrow || (threw || (err || (err2 || (needsFlash || (!x || !selectOtherMonths && date.getMonth() + 1 !== month)))))))) ? "" : " "
                            + renderer.selectedClass) + (selectable ? " "
                            + renderer.defaultClass : " "
                            + inst.options.renderer.disabledClass)
                        + (6 === date.getDay() ? " "
                            + renderer.saturdayClass :
                            "")
                        + (0 === date.getDay() ? " " + renderer.sundayClass : "")
                        + (date.getMonth() + 1 === month ? "" : " "
                            + renderer.otherMonthClass) + (date.getTime() === expected.getTime() && date.getMonth() + 1 === month ? " "
                            + renderer.todayClass : "") + (selectable && (zeroWidth || (shouldThrow || (threw || (err || (err2 || (a && b || needsFlash)))))) ? " "
                            + renderer.middleClass : "") + (selectable && (a && !b) ? " " + renderer.startClass : "")
                        + (selectable && (b && !a) ? " " + renderer.endClass :
                            "") + (date.getTime() === inst.drawDate.getTime() && date.getMonth()
                        + 1 === month ? " " + renderer.highlightedClass : "") + '"'
                        + (dateInfo.title || inst.options.dayStatus && selectable ? 'time= "'+date.getTime() +'"title="' + (dateInfo.title || assert.formatDate(inst.options.dayStatus, date, inst.getConfig()))
                            + '"' : "") + ">"
                        + (inst.options.showOtherMonths || date.getMonth() + 1 === month ? dateInfo.content || date.getDate() : "&#160;")
                        + (selectable ? "</a>" : "</span>")
                        //+ (selectable ? '<div class="price">1111</div>' : "")
                        
                        // + (date.getTime() !== expected.getTime() || (date.getMonth()
                        // + 1 !== month || (zeroWidth || (a || (b || (shouldThrow || (threw || (err || (err2 || needsFlash)))))))) ? "" : '<div class="txt">TODAY</div>')
                        // + (selectable && (zeroWidth || a && !b) ? '<div class="txt">IN</div>' : "")
                        // + (selectable && (!a && b) ? '<div class="txt">OUT</div>' : "")
                        // + (!selectable || (!shouldThrow || (threw || (err || err2))) ? "" : '<div class="txt">IN</div>')
                        // + (!selectable || (shouldThrow || (!threw || (err || err2))) ? "" : '<div class="txt">OUT</div>')
                        //   + (selectable && (shouldThrow && (threw && (!err && !err2))) ? '<div class="txt">당일</div>' : "")
                        );
                    assert.add(date, 1, "d");

                    w = date.getTime();
                }
                version += this._prepare(renderer.week, inst).replace(/\{days\}/g, guess).replace(/\{weekOfYear\}/g, qs);
            }
            var monthHeader = this._prepare(renderer.month, inst).match(/\{monthHeader(:[^\}]+)?\}/);
            monthHeader = monthHeader[0].length <= 13 ? "MM yyyy" : monthHeader[0].substring(13, monthHeader[0].length - 1);
            monthHeader = first ? this._generateMonthSelection(inst, year, month, minDate, maxDate, monthHeader, renderer) : assert.formatDate(monthHeader, assert.newDate(year, month, 1), inst.getConfig());
            var pathimportesc = this._prepare(renderer.weekHeader, inst).replace(/\{days\}/g, this._generateDayHeaders(inst, renderer));
            return this._prepare(renderer.month, inst).replace(/\{monthHeader(:[^\}]+)?\}/g, monthHeader).replace(/\{weekHeader\}/g, pathimportesc).replace(/\{weeks\}/g, version);
        },
        /**
         * @param {Object} inst
         * @param {Object} renderer
         * @return {?}
         */
        _generateDayHeaders : function(inst, renderer) {
            /** @type {string} */
            var header = "";
            /** @type {number} */
            var d = 0;
            for (;7 > d;d++) {
                /** @type {number} */
                var day = (d + inst.options.firstDay) % 7;
                header += this._prepare(renderer.dayHeader, inst).replace(/\{day\}/g, '<span class="' + this._curDoWClass + day + '" title="' + inst.options.dayNames[day] + '">' + inst.options.dayNamesMin[day] + "</span>");
            }
            return header;
        },
        /**
         * @param {Object} inst
         * @param {number} year
         * @param {number} month
         * @param {Object} minDate
         * @param {Object} maxDate
         * @param {string} monthHeader
         * @return {?}
         */
        _generateMonthSelection : function(inst, year, month, minDate, maxDate, monthHeader) {
            if (!inst.options.changeMonth) {
                return assert.formatDate(monthHeader, assert.newDate(year, month, 1), inst.getConfig());
            }
            var table = inst.options["monthNames" + (monthHeader.match(/mm/i) ? "" : "Short")];
            var text = monthHeader.replace(/m+/i, "\\x2E").replace(/y+/i, "\\x2F");
            /** @type {string} */
            var tokenizeEvaluate = '<select class="' + this._monthYearClass + '" title="' + inst.options.monthStatus + '">';
            /** @type {number} */
            var m = 1;
            for (;12 >= m;m++) {
                if (!minDate || assert.newDate(year, m, assert.daysInMonth(year, m)).getTime() >= minDate.getTime()) {
                    if (!maxDate || assert.newDate(year, m, 1).getTime() <= maxDate.getTime()) {
                        tokenizeEvaluate += '<option value="' + m + "/" + year + '"' + (month === m ? ' selected="selected"' : "") + ">" + table[m - 1] + "</option>";
                    }
                }
            }
            tokenizeEvaluate += "</select>";
            text = text.replace(/\\x2E/, tokenizeEvaluate);
            var matches = inst.options.yearRange;
            if ("any" === matches) {
                /** @type {string} */
                tokenizeEvaluate = '<select class="' + this._monthYearClass + " " + this._anyYearClass + '" title="' + inst.options.yearStatus + '"><option>' + year + '</option></select><input class="' + this._monthYearClass + " " + this._curMonthClass + month + '" value="' + year + '">';
            } else {
                matches = matches.split(":");
                var todayYear = assert.today().getFullYear();
                var start = matches[0].match("c[+-].*") ? year + parseInt(matches[0].substring(1), 10) : (matches[0].match("[+-].*") ? todayYear : 0) + parseInt(matches[0], 10);
                var end = matches[1].match("c[+-].*") ? year + parseInt(matches[1].substring(1), 10) : (matches[1].match("[+-].*") ? todayYear : 0) + parseInt(matches[1], 10);
                /** @type {string} */
                tokenizeEvaluate = '<select class="' + this._monthYearClass + '" title="' + inst.options.yearStatus + '">';
                start = assert.add(assert.newDate(start + 1, 1, 1), -1, "d");
                end = assert.newDate(end, 1, 1);
                /**
                 * @param {number} y
                 * @param {string} x
                 * @return {undefined}
                 */
                var addYear = function(y, x) {
                    if (0 !== y) {
                        tokenizeEvaluate += '<option value="' + month + "/" + y + '"' + (year === y ? ' selected="selected"' : "") + ">" + (x || y) + "</option>";
                    }
                };
                if (start.getTime() < end.getTime()) {
                    start = (minDate && minDate.getTime() > start.getTime() ? minDate : start).getFullYear();
                    end = (maxDate && maxDate.getTime() < end.getTime() ? maxDate : end).getFullYear();
                    /** @type {number} */
                    var len = Math.floor((end - start) / 2);
                    if (!minDate || minDate.getFullYear() < start) {
                        addYear(start - len, inst.options.earlierText);
                    }
                    var y = start;
                    for (;end >= y;y++) {
                        addYear(y);
                    }
                    if (!maxDate || maxDate.getFullYear() > end) {
                        addYear(end + len, inst.options.laterText);
                    }
                } else {
                    start = (maxDate && maxDate.getTime() < start.getTime() ? maxDate : start).getFullYear();
                    end = (minDate && minDate.getTime() > end.getTime() ? minDate : end).getFullYear();
                    /** @type {number} */
                    len = Math.floor((start - end) / 2);
                    if (!maxDate || maxDate.getFullYear() > start) {
                        addYear(start + len, inst.options.earlierText);
                    }
                    y = start;
                    for (;y >= end;y--) {
                        addYear(y);
                    }
                    if (!minDate || minDate.getFullYear() < end) {
                        addYear(end - len, inst.options.laterText);
                    }
                }
                tokenizeEvaluate += "</select>";
            }
            return text = text.replace(/\\x2F/, tokenizeEvaluate);
        },
        /**
         * @param {string} text
         * @param {Object} inst
         * @return {?}
         */
        _prepare : function(text, inst) {
            /**
             * @param {string} data
             * @param {boolean} retain
             * @return {undefined}
             */
            var replaceSection = function(data, retain) {
                for (;;) {
                    var index = text.indexOf("{" + data + ":start}");
                    if (-1 === index) {
                        return;
                    }
                    var offset = text.substring(index).indexOf("{" + data + ":end}");
                    if (offset > -1) {
                        text = text.substring(0, index) + (retain ? text.substr(index + data.length + 8, offset - data.length - 8) : "") + text.substring(index + offset + data.length + 6);
                    }
                }
            };
            replaceSection("inline", inst.inline);
            replaceSection("popup", !inst.inline);
            /** @type {RegExp} */
            var re = /\{l10n:([^\}]+)\}/;
            /** @type {null} */
            var m = null;
            for (;m = re.exec(text);) {
                text = text.replace(m[0], inst.options[m[1]]);
            }
            return text;
        }
    });
    var assert = $.datepick;
    $(function() {
        $(document).on("mousedown." + name, assert._checkExternalClick).on("resize." + name, function() {
            assert.hide(assert.curInst);
        });
    });
}(jQuery);
