/// <reference path="Nepalthinking.js" />

/*
* Nepalthinking.Slider 19.0
* http://www.Nepalthinking.com/
*
* Licensed under the MIT license:
* http://www.opensource.org/licenses/MIT
* 
* TERMS OF USE - Nepalthinking.Slider
* 
* Copyright 2014 Nepalthinking
*
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
* LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
* OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


var $NepalthinkingSlideshowFormations$ = window.$NepalthinkingSlideshowFormations$ = new function () {
    var _This = this;

    //Constants +++++++

    var COLUMN_INCREASE = 0;
    var COLUMN_DECREASE = 1;
    var ROW_INCREASE = 2;
    var ROW_DECREASE = 3;

    var DIRECTION_HORIZONTAL = 0x0003;
    var DIRECTION_VERTICAL = 0x000C;

    var TO_LEFT = 0x0001;
    var TO_RIGHT = 0x0002;
    var TO_TOP = 0x0004;
    var TO_BOTTOM = 0x0008;

    var FROM_LEFT = 0x0100;
    var FROM_TOP = 0x0200;
    var FROM_RIGHT = 0x0400;
    var FROM_BOTTOM = 0x0800;

    var ASSEMBLY_BOTTOM_LEFT = FROM_BOTTOM + TO_LEFT;
    var ASSEMBLY_BOTTOM_RIGHT = FROM_BOTTOM + TO_RIGHT;
    var ASSEMBLY_TOP_LEFT = FROM_TOP + TO_LEFT;
    var ASSEMBLY_TOP_RIGHT = FROM_TOP + TO_RIGHT;
    var ASSEMBLY_LEFT_TOP = FROM_LEFT + TO_TOP;
    var ASSEMBLY_LEFT_BOTTOM = FROM_LEFT + TO_BOTTOM;
    var ASSEMBLY_RIGHT_TOP = FROM_RIGHT + TO_TOP;
    var ASSEMBLY_RIGHT_BOTTOM = FROM_RIGHT + TO_BOTTOM;

    //Constants -------

    //Formation Definition +++++++
    function isToLeft(roadValue) {
        return (roadValue & TO_LEFT) == TO_LEFT;
    }

    function isToRight(roadValue) {
        return (roadValue & TO_RIGHT) == TO_RIGHT;
    }

    function isToTop(roadValue) {
        return (roadValue & TO_TOP) == TO_TOP;
    }

    function isToBottom(roadValue) {
        return (roadValue & TO_BOTTOM) == TO_BOTTOM;
    }

    function PushFormationOrder(arr, order, formationItem) {
        formationItem.push(order);
        arr[order] = arr[order] || [];
        arr[order].push(formationItem);
    }

    _This.$FormationStraight = function (transition) {
        var cols = transition.$Cols;
        var rows = transition.$Rows;
        var formationDirection = transition.$Assembly;
        var count = transition.$Count;
        var a = [];
        var i = 0;
        var col = 0;
        var r = 0;
        var cl = cols - 1;
        var rl = rows - 1;
        var il = count - 1;
        var cr;
        var order;
        for (r = 0; r < rows; r++) {
            for (col = 0; col < cols; col++) {
                cr = r + ',' + col;
                switch (formationDirection) {
                    case ASSEMBLY_BOTTOM_LEFT:
                        order = il - (col * rows + (rl - r));
                        break;
                    case ASSEMBLY_RIGHT_TOP:
                        order = il - (r * cols + (cl - col));
                        break;
                    case ASSEMBLY_TOP_LEFT:
                        order = il - (col * rows + r);
                    case ASSEMBLY_LEFT_TOP:
                        order = il - (r * cols + col);
                        break;
                    case ASSEMBLY_BOTTOM_RIGHT:
                        order = col * rows + r;
                        break;
                    case ASSEMBLY_LEFT_BOTTOM:
                        order = r * cols + (cl - col);
                        break;
                    case ASSEMBLY_TOP_RIGHT:
                        order = col * rows + (rl - r);
                        break;
                    default:
                        order = r * cols + col;
                        break; //ASSEMBLY_RIGHT_BOTTOM
                }
                PushFormationOrder(a, order, [r, col]);
            }
        }

        return a;
    };

    _This.$FormationSwirl = function (transition) {
        var cols = transition.$Cols;
        var rows = transition.$Rows;
        var formationDirection = transition.$Assembly;
        var count = transition.$Count;
        var a = [];
        var hit = [];
        var i = 0;
        var col = 0;
        var r = 0;
        var cl = cols - 1;
        var rl = rows - 1;
        var il = count - 1;
        var cr;
        var courses;
        var course = 0;
        switch (formationDirection) {
            case ASSEMBLY_BOTTOM_LEFT:
                col = cl;
                r = 0;
                courses = [ROW_INCREASE, COLUMN_DECREASE, ROW_DECREASE, COLUMN_INCREASE];
                break;
            case ASSEMBLY_RIGHT_TOP:
                col = 0;
                r = rl;
                courses = [COLUMN_INCREASE, ROW_DECREASE, COLUMN_DECREASE, ROW_INCREASE];
                break;
            case ASSEMBLY_TOP_LEFT:
                col = cl;
                r = rl;
                courses = [ROW_DECREASE, COLUMN_DECREASE, ROW_INCREASE, COLUMN_INCREASE];
                break;
            case ASSEMBLY_LEFT_TOP:
                col = cl;
                r = rl;
                courses = [COLUMN_DECREASE, ROW_DECREASE, COLUMN_INCREASE, ROW_INCREASE];
                break;
            case ASSEMBLY_BOTTOM_RIGHT:
                col = 0;
                r = 0;
                courses = [ROW_INCREASE, COLUMN_INCREASE, ROW_DECREASE, COLUMN_DECREASE];
                break;
            case ASSEMBLY_LEFT_BOTTOM:
                col = cl;
                r = 0;
                courses = [COLUMN_DECREASE, ROW_INCREASE, COLUMN_INCREASE, ROW_DECREASE];
                break;
            case ASSEMBLY_TOP_RIGHT:
                col = 0;
                r = rl;
                courses = [ROW_DECREASE, COLUMN_INCREASE, ROW_INCREASE, COLUMN_DECREASE];
                break;
            default:
                col = 0;
                r = 0;
                courses = [COLUMN_INCREASE, ROW_INCREASE, COLUMN_DECREASE, ROW_DECREASE];
                break; //ASSEMBLY_RIGHT_BOTTOM
        }
        i = 0;
        while (i < count) {
            cr = r + ',' + col;
            if (col >= 0 && col < cols && r >= 0 && r < rows && !hit[cr]) {
                //a[cr] = i++;
                hit[cr] = true;
                PushFormationOrder(a, i++, [r, col]);
            }
            else {
                switch (courses[course++ % courses.length]) {
                    case COLUMN_INCREASE:
                        col--;
                        break;
                    case ROW_INCREASE:
                        r--;
                        break;
                    case COLUMN_DECREASE:
                        col++;
                        break;
                    case ROW_DECREASE:
                        r++;
                        break;
                }
            }

            switch (courses[course % courses.length]) {
                case COLUMN_INCREASE:
                    col++;
                    break;
                case ROW_INCREASE:
                    r++;
                    break;
                case COLUMN_DECREASE:
                    col--;
                    break;
                case ROW_DECREASE:
                    r--;
                    break;
            }
        }
        return a;
    };

    _This.$FormationZigZag = function (transition) {
        var cols = transition.$Cols;
        var rows = transition.$Rows;
        var formationDirection = transition.$Assembly;
        var count = transition.$Count;
        var a = [];
        var i = 0;
        var col = 0;
        var r = 0;
        var cl = cols - 1;
        var rl = rows - 1;
        var il = count - 1;
        var cr;
        var courses;
        var course = 0;
        switch (formationDirection) {
            case ASSEMBLY_BOTTOM_LEFT:
                col = cl;
                r = 0;
                courses = [ROW_INCREASE, COLUMN_DECREASE, ROW_DECREASE, COLUMN_DECREASE];
                break;
            case ASSEMBLY_RIGHT_TOP:
                col = 0;
                r = rl;
                courses = [COLUMN_INCREASE, ROW_DECREASE, COLUMN_DECREASE, ROW_DECREASE];
                break;
            case ASSEMBLY_TOP_LEFT:
                col = cl;
                r = rl;
                courses = [ROW_DECREASE, COLUMN_DECREASE, ROW_INCREASE, COLUMN_DECREASE];
                break;
            case ASSEMBLY_LEFT_TOP:
                col = cl;
                r = rl;
                courses = [COLUMN_DECREASE, ROW_DECREASE, COLUMN_INCREASE, ROW_DECREASE];
                break;
            case ASSEMBLY_BOTTOM_RIGHT:
                col = 0;
                r = 0;
                courses = [ROW_INCREASE, COLUMN_INCREASE, ROW_DECREASE, COLUMN_INCREASE];
                break;
            case ASSEMBLY_LEFT_BOTTOM:
                col = cl;
                r = 0;
                courses = [COLUMN_DECREASE, ROW_INCREASE, COLUMN_INCREASE, ROW_INCREASE];
                break;
            case ASSEMBLY_TOP_RIGHT:
                col = 0;
                r = rl;
                courses = [ROW_DECREASE, COLUMN_INCREASE, ROW_INCREASE, COLUMN_INCREASE];
                break;
            default:
                col = 0;
                r = 0;
                courses = [COLUMN_INCREASE, ROW_INCREASE, COLUMN_DECREASE, ROW_INCREASE];
                break; //ASSEMBLY_RIGHT_BOTTOM
        }
        i = 0;
        while (i < count) {
            cr = r + ',' + col;
            if (col >= 0 && col < cols && r >= 0 && r < rows && typeof (a[cr]) == 'undefined') {
                PushFormationOrder(a, i++, [r, col]);
                //a[cr] = i++;
                switch (courses[course % courses.length]) {
                    case COLUMN_INCREASE:
                        col++;
                        break;
                    case ROW_INCREASE:
                        r++;
                        break;
                    case COLUMN_DECREASE:
                        col--;
                        break;
                    case ROW_DECREASE:
                        r--;
                        break;
                }
            }
            else {
                switch (courses[course++ % courses.length]) {
                    case COLUMN_INCREASE:
                        col--;
                        break;
                    case ROW_INCREASE:
                        r--;
                        break;
                    case COLUMN_DECREASE:
                        col++;
                        break;
                    case ROW_DECREASE:
                        r++;
                        break;
                }
                switch (courses[course++ % courses.length]) {
                    case COLUMN_INCREASE:
                        col++;
                        break;
                    case ROW_INCREASE:
                        r++;
                        break;
                    case COLUMN_DECREASE:
                        col--;
                        break;
                    case ROW_DECREASE:
                        r--;
                        break;
                }
            }
        }
        return a;
    };

    _This.$FormationStraightStairs = function (transition) {
        var cols = transition.$Cols;
        var rows = transition.$Rows;
        var formationDirection = transition.$Assembly;
        var count = transition.$Count;
        var a = [];
        var i = 0;
        var col = 0;
        var r = 0;
        var cl = cols - 1;
        var rl = rows - 1;
        var il = count - 1;
        var cr;
        switch (formationDirection) {
            case ASSEMBLY_BOTTOM_LEFT:
            case ASSEMBLY_TOP_RIGHT:
            case ASSEMBLY_TOP_LEFT:
            case ASSEMBLY_BOTTOM_RIGHT:
                var C = 0;
                var R = 0;
                break;
            case ASSEMBLY_LEFT_BOTTOM:
            case ASSEMBLY_RIGHT_TOP:
            case ASSEMBLY_LEFT_TOP:
            case ASSEMBLY_RIGHT_BOTTOM:
                var C = cl;
                var R = 0;
                break;
            default:
                formationDirection = ASSEMBLY_RIGHT_BOTTOM;
                var C = cl;
                var R = 0;
                break;
        }
        col = C;
        r = R;
        while (i < count) {
            cr = r + ',' + col;
            if (isToTop(formationDirection) || isToRight(formationDirection)) {
                PushFormationOrder(a, il - i++, [r, col]);
                //a[cr] = il - i++;
            }
            else {
                PushFormationOrder(a, i++, [r, col]);
                //a[cr] = i++;
            }
            switch (formationDirection) {
                case ASSEMBLY_BOTTOM_LEFT:
                case ASSEMBLY_TOP_RIGHT:
                    col--;
                    r++;
                    break;
                case ASSEMBLY_TOP_LEFT:
                case ASSEMBLY_BOTTOM_RIGHT:
                    col++;
                    r--;
                    break;
                case ASSEMBLY_LEFT_BOTTOM:
                case ASSEMBLY_RIGHT_TOP:
                    col--;
                    r--;
                    break;
                case ASSEMBLY_RIGHT_BOTTOM:
                case ASSEMBLY_LEFT_TOP:
                default:
                    col++;
                    r++;
                    break;
            }
            if (col < 0 || r < 0 || col > cl || r > rl) {
                switch (formationDirection) {
                    case ASSEMBLY_BOTTOM_LEFT:
                    case ASSEMBLY_TOP_RIGHT:
                        C++;
                        break;
                    case ASSEMBLY_LEFT_BOTTOM:
                    case ASSEMBLY_RIGHT_TOP:
                    case ASSEMBLY_TOP_LEFT:
                    case ASSEMBLY_BOTTOM_RIGHT:
                        R++;
                        break;
                    case ASSEMBLY_RIGHT_BOTTOM:
                    case ASSEMBLY_LEFT_TOP:
                    default:
                        C--;
                        break;
                }
                if (C < 0 || R < 0 || C > cl || R > rl) {
                    switch (formationDirection) {
                        case ASSEMBLY_BOTTOM_LEFT:
                        case ASSEMBLY_TOP_RIGHT:
                            C = cl;
                            R++;
                            break;
                        case ASSEMBLY_TOP_LEFT:
                        case ASSEMBLY_BOTTOM_RIGHT:
                            R = rl;
                            C++;
                            break;
                        case ASSEMBLY_LEFT_BOTTOM:
                        case ASSEMBLY_RIGHT_TOP: R = rl; C--;
                            break;
                        case ASSEMBLY_RIGHT_BOTTOM:
                        case ASSEMBLY_LEFT_TOP:
                        default:
                            C = 0;
                            R++;
                            break;
                    }
                    if (R > rl)
                        R = rl;
                    else if (R < 0)
                        R = 0;
                    else if (C > cl)
                        C = cl;
                    else if (C < 0)
                        C = 0;
                }
                r = R;
                col = C;
            }
        }
        return a;
    };

    _This.$FormationSquare = function (transition) {
        var cols = transition.$Cols || 1;
        var rows = transition.$Rows || 1;
        var arr = [];
        var i = 0;
        var col;
        var r;
        var dc;
        var dr;
        var cr;
        dc = cols < rows ? (rows - cols) / 2 : 0;
        dr = cols > rows ? (cols - rows) / 2 : 0;
        cr = Math.round(Math.max(cols / 2, rows / 2)) + 1;
        for (col = 0; col < cols; col++) {
            for (r = 0; r < rows; r++)
                PushFormationOrder(arr, cr - Math.min(col + 1 + dc, r + 1 + dr, cols - col + dc, rows - r + dr), [r, col]);
        }
        return arr;
    };

    _This.$FormationRectangle = function (transition) {
        var cols = transition.$Cols || 1;
        var rows = transition.$Rows || 1;
        var arr = [];
        var i = 0;
        var col;
        var r;
        var cr;
        cr = Math.round(Math.min(cols / 2, rows / 2)) + 1;
        for (col = 0; col < cols; col++) {
            for (r = 0; r < rows; r++)
                PushFormationOrder(arr, cr - Math.min(col + 1, r + 1, cols - col, rows - r), [r, col]);
        }
        return arr;
    };

    _This.$FormationRandom = function (transition) {
        var a = [];
        var r, col, i;
        for (r = 0; r < transition.$Rows; r++) {
            for (col = 0; col < transition.$Cols; col++)
                PushFormationOrder(a, Math.ceil(100000 * Math.random()) % 13, [r, col]);
        }

        return a;
    };

    _This.$FormationCircle = function (transition) {
        var cols = transition.$Cols || 1;
        var rows = transition.$Rows || 1;
        var arr = [];
        var i = 0;
        var col;
        var r;
        var hc = cols / 2 - 0.5;
        var hr = rows / 2 - 0.5;
        for (col = 0; col < cols; col++) {
            for (r = 0; r < rows; r++)
                PushFormationOrder(arr, Math.round(Math.sqrt(Math.pow(col - hc, 2) + Math.pow(r - hr, 2))), [r, col]);
        }
        return arr;
    };

    _This.$FormationCross = function (transition) {
        var cols = transition.$Cols || 1;
        var rows = transition.$Rows || 1;
        var arr = [];
        var i = 0;
        var col;
        var r;
        var hc = cols / 2 - 0.5;
        var hr = rows / 2 - 0.5;
        for (col = 0; col < cols; col++) {
            for (r = 0; r < rows; r++)
                PushFormationOrder(arr, Math.round(Math.min(Math.abs(col - hc), Math.abs(r - hr))), [r, col]);
        }
        return arr;
    };

    _This.$FormationRectangleCross = function (transition) {
        var cols = transition.$Cols || 1;
        var rows = transition.$Rows || 1;
        var arr = [];
        var i = 0;
        var col;
        var r;
        var hc = cols / 2 - 0.5;
        var hr = rows / 2 - 0.5;
        var cr = Math.max(hc, hr) + 1;
        for (col = 0; col < cols; col++) {
            for (r = 0; r < rows; r++)
                PushFormationOrder(arr, Math.round(cr - Math.max(hc - Math.abs(col - hc), hr - Math.abs(r - hr))) - 1, [r, col]);
        }
        return arr;
    };
};

var $NepalthinkingSlideshowRunner$ = window.$NepalthinkingSlideshowRunner$ = function (slideContainer, slideContainerWidth, slideContainerHeight, slideshowOptions, isTouchDevice) {

    var _SelfSlideshowRunner = this;

    //var _State = 0; //-1 fullfill, 0 clean, 1 initializing, 2 stay, 3 playing
    var _EndTime;

    var _SliderFrameCount;

    var _SlideshowPlayerBelow;
    var _SlideshowPlayerAbove;

    var _PrevItem;
    var _SlideItem;

    var _TransitionIndex = 0;
    var _TransitionsOrder = slideshowOptions.$TransitionsOrder;

    var _SlideshowTransition;

    var _SlideshowPerformance = 8;

    //#region Private Methods
    function EnsureTransitionInstance(options, slideshowInterval) {

        var slideshowTransition = {
            $Interval: slideshowInterval,  //Delay to play next frame
            $Duration: 1, //Duration to finish the entire transition
            $Delay: 0,  //Delay to assembly blocks
            $Cols: 1,   //Number of columns
            $Rows: 1,   //Number of rows
            $Opacity: 0,   //Fade block or not
            $Zoom: 0,   //Zoom block or not
            $Clip: 0,   //Clip block or not
            $Move: false,   //Move block or not
            $SlideOut: false,   //Slide the previous slide out to display next slide instead
            //$FlyDirection: 0,   //Specify fly transform with direction
            $Reverse: false,    //Reverse the assembly or not
            $Formation: $NepalthinkingSlideshowFormations$.$FormationRandom,    //Shape that assembly blocks as
            $Assembly: 0x0408,   //The way to assembly blocks ASSEMBLY_RIGHT_BOTTOM
            $ChessMode: { $Column: 0, $Row: 0 },    //Chess move or fly direction
            $Easing: $NepalthinkingEasing$.$EaseSwing,  //Specify variation of speed during transition
            $Round: {},
            $Blocks: [],
            $During: {}
        };

        $Nepalthinking$.$Extend(slideshowTransition, options);

        slideshowTransition.$Count = slideshowTransition.$Cols * slideshowTransition.$Rows;
        if ($Nepalthinking$.$IsFunction(slideshowTransition.$Easing))
            slideshowTransition.$Easing = { $Default: slideshowTransition.$Easing };

        slideshowTransition.$FramesCount = Math.ceil(slideshowTransition.$Duration / slideshowTransition.$Interval);

        slideshowTransition.$GetBlocks = function (width, height) {
            width /= slideshowTransition.$Cols;
            height /= slideshowTransition.$Rows;
            var wh = width + 'x' + height;
            if (!slideshowTransition.$Blocks[wh]) {
                slideshowTransition.$Blocks[wh] = { $Width: width, $Height: height };
                for (var col = 0; col < slideshowTransition.$Cols; col++) {
                    for (var r = 0; r < slideshowTransition.$Rows; r++)
                        slideshowTransition.$Blocks[wh][r + ',' + col] = { $Top: r * height, $Right: col * width + width, $Bottom: r * height + height, $Left: col * width };
                }
            }

            return slideshowTransition.$Blocks[wh];
        };

        if (slideshowTransition.$Brother) {
            slideshowTransition.$Brother = EnsureTransitionInstance(slideshowTransition.$Brother, slideshowInterval);
            slideshowTransition.$SlideOut = true;
        }

        return slideshowTransition;
    }
    //#endregion

    //#region Private Classes
    function NepalthinkingSlideshowPlayer(slideContainer, slideElement, slideTransition, beginTime, slideContainerWidth, slideContainerHeight) {
        var _Self = this;

        var _Block;
        var _StartStylesArr = {};
        var _AnimationStylesArrs = {};
        var _AnimationBlockItems = [];
        var _StyleStart;
        var _StyleEnd;
        var _StyleDif;
        var _ChessModeColumn = slideTransition.$ChessMode.$Column || 0;
        var _ChessModeRow = slideTransition.$ChessMode.$Row || 0;

        var _Blocks = slideTransition.$GetBlocks(slideContainerWidth, slideContainerHeight);
        var _FormationInstance = GetFormation(slideTransition);
        var _MaxOrder = _FormationInstance.length - 1;
        var _Period = slideTransition.$Duration + slideTransition.$Delay * _MaxOrder;
        var _EndTime = beginTime + _Period;

        var _SlideOut = slideTransition.$SlideOut;
        var _IsIn;

        //_EndTime += $Nepalthinking$.$IsBrowserChrome() ? 260 : 50;
        _EndTime += 50;

        //#region Private Methods

        function GetFormation(transition) {

            var formationInstance = transition.$Formation(transition);

            return transition.$Reverse ? formationInstance.reverse() : formationInstance;

        }
        //#endregion

        _Self.$EndTime = _EndTime;

        _Self.$ShowFrame = function (time) {
            time -= beginTime;

            var isIn = time < _Period;

            if (isIn || _IsIn) {
                _IsIn = isIn;

                if (!_SlideOut)
                    time = _Period - time;

                var frameIndex = Math.ceil(time / slideTransition.$Interval);

                $Nepalthinking$.$Each(_AnimationStylesArrs, function (value, index) {

                    var itemFrameIndex = Math.max(frameIndex, value.$Min);
                    itemFrameIndex = Math.min(itemFrameIndex, value.length - 1);

                    if (value.$LastFrameIndex != itemFrameIndex) {
                        if (!value.$LastFrameIndex && !_SlideOut) {
                            $Nepalthinking$.$ShowElement(_AnimationBlockItems[index]);
                        }
                        else if (itemFrameIndex == value.$Max && _SlideOut) {
                            $Nepalthinking$.$HideElement(_AnimationBlockItems[index]);
                        }
                        value.$LastFrameIndex = itemFrameIndex;
                        $Nepalthinking$.$SetStylesEx(_AnimationBlockItems[index], value[itemFrameIndex]);
                    }
                });
            }
        };

        //constructor
        {
            slideElement = $Nepalthinking$.$CloneNode(slideElement);
            //$Nepalthinking$.$RemoveAttribute(slideElement, "id");
            if ($Nepalthinking$.$IsBrowserIe9Earlier()) {
                var hasImage = !slideElement["no-image"];
                var slideChildElements = $Nepalthinking$.$FindChildrenByTag(slideElement);
                $Nepalthinking$.$Each(slideChildElements, function (slideChildElement) {
                    if (hasImage || slideChildElement["Nepalthinking-slider"])
                        $Nepalthinking$.$CssOpacity(slideChildElement, $Nepalthinking$.$CssOpacity(slideChildElement), true);
                });
            }

            $Nepalthinking$.$Each(_FormationInstance, function (formationItems, order) {
                $Nepalthinking$.$Each(formationItems, function (formationItem) {
                    var row = formationItem[0];
                    var col = formationItem[1];
                    {
                        var columnRow = row + ',' + col;

                        var chessHorizontal = false;
                        var chessVertical = false;
                        var chessRotate = false;

                        if (_ChessModeColumn && col % 2) {
                            if (_ChessModeColumn & 3/*$NepalthinkingDirection$.$IsHorizontal(_ChessModeColumn)*/) {
                                chessHorizontal = !chessHorizontal;
                            }
                            if (_ChessModeColumn & 12/*$NepalthinkingDirection$.$IsVertical(_ChessModeColumn)*/) {
                                chessVertical = !chessVertical;
                            }

                            if (_ChessModeColumn & 16)
                                chessRotate = !chessRotate;
                        }

                        if (_ChessModeRow && row % 2) {
                            if (_ChessModeRow & 3/*$NepalthinkingDirection$.$IsHorizontal(_ChessModeRow)*/) {
                                chessHorizontal = !chessHorizontal;
                            }
                            if (_ChessModeRow & 12/*$NepalthinkingDirection$.$IsVertical(_ChessModeRow)*/) {
                                chessVertical = !chessVertical;
                            }
                            if (_ChessModeRow & 16)
                                chessRotate = !chessRotate;
                        }

                        slideTransition.$Top = slideTransition.$Top || (slideTransition.$Clip & 4);
                        slideTransition.$Bottom = slideTransition.$Bottom || (slideTransition.$Clip & 8);
                        slideTransition.$Left = slideTransition.$Left || (slideTransition.$Clip & 1);
                        slideTransition.$Right = slideTransition.$Right || (slideTransition.$Clip & 2);

                        var topBenchmark = chessVertical ? slideTransition.$Bottom : slideTransition.$Top;
                        var bottomBenchmark = chessVertical ? slideTransition.$Top : slideTransition.$Bottom;
                        var leftBenchmark = chessHorizontal ? slideTransition.$Right : slideTransition.$Left;
                        var rightBenchmark = chessHorizontal ? slideTransition.$Left : slideTransition.$Right;

                        slideTransition.$Clip = topBenchmark || bottomBenchmark || leftBenchmark || rightBenchmark;

                        _StyleDif = {};
                        _StyleEnd = { $Top: 0, $Left: 0, $Opacity: 1, $Width: slideContainerWidth, $Height: slideContainerHeight };
                        _StyleStart = $Nepalthinking$.$Extend({}, _StyleEnd);
                        _Block = $Nepalthinking$.$Extend({}, _Blocks[columnRow]);

                        if (slideTransition.$Opacity) {
                            _StyleEnd.$Opacity = 2 - slideTransition.$Opacity;
                        }

                        if (slideTransition.$ZIndex) {
                            _StyleEnd.$ZIndex = slideTransition.$ZIndex;
                            _StyleStart.$ZIndex = 0;
                        }

                        var allowClip = slideTransition.$Cols * slideTransition.$Rows > 1 || slideTransition.$Clip;

                        if (slideTransition.$Zoom || slideTransition.$Rotate) {
                            var allowRotate = true;
                            if ($Nepalthinking$.$IsBrowserIe9Earlier()) {
                                if (slideTransition.$Cols * slideTransition.$Rows > 1)
                                    allowRotate = false;
                                else
                                    allowClip = false;
                            }

                            if (allowRotate) {
                                _StyleEnd.$Zoom = slideTransition.$Zoom ? slideTransition.$Zoom - 1 : 1;
                                _StyleStart.$Zoom = 1;

                                if ($Nepalthinking$.$IsBrowserIe9Earlier() || $Nepalthinking$.$IsBrowserOpera())
                                    _StyleEnd.$Zoom = Math.min(_StyleEnd.$Zoom, 2);

                                var rotate = slideTransition.$Rotate;

                                _StyleEnd.$Rotate = rotate * 360 * ((chessRotate) ? -1 : 1);
                                _StyleStart.$Rotate = 0;
                            }
                        }

                        if (allowClip) {
                            if (slideTransition.$Clip) {
                                var clipScale = slideTransition.$ScaleClip || 1;
                                var blockOffset = _Block.$Offset = {};
                                if (topBenchmark && bottomBenchmark) {
                                    blockOffset.$Top = _Blocks.$Height / 2 * clipScale;
                                    blockOffset.$Bottom = -blockOffset.$Top;
                                }
                                else if (topBenchmark) {
                                    blockOffset.$Bottom = -_Blocks.$Height * clipScale;
                                }
                                else if (bottomBenchmark) {
                                    blockOffset.$Top = _Blocks.$Height * clipScale;
                                }

                                if (leftBenchmark && rightBenchmark) {
                                    blockOffset.$Left = _Blocks.$Width / 2 * clipScale;
                                    blockOffset.$Right = -blockOffset.$Left;
                                }
                                else if (leftBenchmark) {
                                    blockOffset.$Right = -_Blocks.$Width * clipScale;
                                }
                                else if (rightBenchmark) {
                                    blockOffset.$Left = _Blocks.$Width * clipScale;
                                }
                            }

                            _StyleDif.$Clip = _Block;
                            _StyleStart.$Clip = _Blocks[columnRow];
                        }

                        //fly
                        {
                            var chessHor = chessHorizontal ? 1 : -1;
                            var chessVer = chessVertical ? 1 : -1;

                            if (slideTransition.x)
                                _StyleEnd.$Left += slideContainerWidth * slideTransition.x * chessHor;

                            if (slideTransition.y)
                                _StyleEnd.$Top += slideContainerHeight * slideTransition.y * chessVer;
                        }

                        $Nepalthinking$.$Each(_StyleEnd, function (propertyEnd, property) {
                            if ($Nepalthinking$.$IsNumeric(propertyEnd)) {
                                if (propertyEnd != _StyleStart[property]) {
                                    _StyleDif[property] = propertyEnd - _StyleStart[property];
                                }
                            }
                        });

                        _StartStylesArr[columnRow] = _SlideOut ? _StyleStart : _StyleEnd;

                        var animationStylesArr = [];
                        var framesCount = slideTransition.$FramesCount;
                        var virtualFrameCount = Math.round(order * slideTransition.$Delay / slideTransition.$Interval);
                        _AnimationStylesArrs[columnRow] = new Array(virtualFrameCount);
                        _AnimationStylesArrs[columnRow].$Min = virtualFrameCount;
                        _AnimationStylesArrs[columnRow].$Max = virtualFrameCount + framesCount - 1;

                        for (var frameN = 0; frameN <= framesCount; frameN++) {
                            var styleFrameN = $Nepalthinking$.$Cast(_StyleStart, _StyleDif, frameN / framesCount, slideTransition.$Easing, slideTransition.$During, slideTransition.$Round, { $Move: slideTransition.$Move, $OriginalWidth: slideContainerWidth, $OriginalHeight: slideContainerHeight })

                            styleFrameN.$ZIndex = styleFrameN.$ZIndex || 1;

                            _AnimationStylesArrs[columnRow].push(styleFrameN);
                        }

                    } //for
                });
            });

            _FormationInstance.reverse();
            $Nepalthinking$.$Each(_FormationInstance, function (formationItems) {
                $Nepalthinking$.$Each(formationItems, function (formationItem) {
                    var row = formationItem[0];
                    var col = formationItem[1];

                    var columnRow = row + ',' + col;

                    var image = slideElement;
                    if (col || row)
                        image = $Nepalthinking$.$CloneNode(slideElement);

                    $Nepalthinking$.$SetStyles(image, _StartStylesArr[columnRow]);
                    $Nepalthinking$.$CssOverflow(image, "hidden");

                    $Nepalthinking$.$CssPosition(image, "absolute");
                    slideContainer.$AddClipElement(image);
                    _AnimationBlockItems[columnRow] = image;
                    $Nepalthinking$.$ShowElement(image, !_SlideOut);
                });
            });
        }
    }

    function SlideshowProcessor() {
        var _SelfSlideshowProcessor = this;
        var _CurrentTime = 0;

        $NepalthinkingAnimator$.call(_SelfSlideshowProcessor, 0, _EndTime);

        _SelfSlideshowProcessor.$OnPositionChange = function (oldPosition, newPosition) {
            if ((newPosition - _CurrentTime) > _SlideshowPerformance) {
                _CurrentTime = newPosition;

                _SlideshowPlayerAbove && _SlideshowPlayerAbove.$ShowFrame(newPosition);
                _SlideshowPlayerBelow && _SlideshowPlayerBelow.$ShowFrame(newPosition);
            }
        };

        _SelfSlideshowProcessor.$Transition = _SlideshowTransition;
    }
    //#endregion

    //member functions
    _SelfSlideshowRunner.$GetTransition = function (slideCount) {
        var n = 0;

        var transitions = slideshowOptions.$Transitions;

        var transitionCount = transitions.length;

        if (_TransitionsOrder) { /*Sequence*/
            //if (transitionCount > slideCount && ($Nepalthinking$.$IsBrowserChrome() || $Nepalthinking$.$IsBrowserSafari() || $Nepalthinking$.$IsBrowserFireFox())) {
            //    transitionCount -= transitionCount % slideCount;
            //}
            n = _TransitionIndex++ % transitionCount;
        }
        else { /*Random*/
            n = Math.floor(Math.random() * transitionCount);
        }

        transitions[n] && (transitions[n].$Index = n);

        return transitions[n];
    };

    _SelfSlideshowRunner.$Initialize = function (slideIndex, prevIndex, slideItem, prevItem, slideshowTransition) {
        $NepalthinkingDebug$.$Execute(function () {
            if (_SlideshowPlayerBelow) {
                $NepalthinkingDebug$.$Fail("slideshow runner has not been cleared.");
            }
        });

        _SlideshowTransition = slideshowTransition;

        slideshowTransition = EnsureTransitionInstance(slideshowTransition, _SlideshowPerformance);

        _SlideItem = slideItem;
        _PrevItem = prevItem;

        var prevSlideElement = prevItem.$Item;
        var currentSlideElement = slideItem.$Item;
        prevSlideElement["no-image"] = !prevItem.$Image;
        currentSlideElement["no-image"] = !slideItem.$Image;

        var slideElementAbove = prevSlideElement;
        var slideElementBelow = currentSlideElement;

        var slideTransitionAbove = slideshowTransition;
        var slideTransitionBelow = slideshowTransition.$Brother || EnsureTransitionInstance({}, _SlideshowPerformance);

        if (!slideshowTransition.$SlideOut) {
            slideElementAbove = currentSlideElement;
            slideElementBelow = prevSlideElement;
        }

        var shift = slideTransitionBelow.$Shift || 0;

        _SlideshowPlayerBelow = new NepalthinkingSlideshowPlayer(slideContainer, slideElementBelow, slideTransitionBelow, Math.max(shift - slideTransitionBelow.$Interval, 0), slideContainerWidth, slideContainerHeight);
        _SlideshowPlayerAbove = new NepalthinkingSlideshowPlayer(slideContainer, slideElementAbove, slideTransitionAbove, Math.max(slideTransitionBelow.$Interval - shift, 0), slideContainerWidth, slideContainerHeight);

        _SlideshowPlayerBelow.$ShowFrame(0);
        _SlideshowPlayerAbove.$ShowFrame(0);

        _EndTime = Math.max(_SlideshowPlayerBelow.$EndTime, _SlideshowPlayerAbove.$EndTime);

        _SelfSlideshowRunner.$Index = slideIndex;
    };

    _SelfSlideshowRunner.$Clear = function () {
        slideContainer.$Clear();
        _SlideshowPlayerBelow = null;
        _SlideshowPlayerAbove = null;
    };

    _SelfSlideshowRunner.$GetProcessor = function () {
        var slideshowProcessor = null;

        if (_SlideshowPlayerAbove)
            slideshowProcessor = new SlideshowProcessor();

        return slideshowProcessor;
    };

    //Constructor
    {
        if ($Nepalthinking$.$IsBrowserIe9Earlier() || $Nepalthinking$.$IsBrowserOpera() || (isTouchDevice && $Nepalthinking$.$WebKitVersion() < 537)) {
            _SlideshowPerformance = 16;
        }

        $NepalthinkingObject$.call(_SelfSlideshowRunner);
        $NepalthinkingAnimator$.call(_SelfSlideshowRunner, -10000000, 10000000);
    }
};

var $NepalthinkingSlider$ = window.$NepalthinkingSlider$ = function (elmt, options) {
    var _SelfSlider = this;

    //#region Private Classes
    //Conveyor
    function Conveyor() {
        var _SelfConveyor = this;
        $NepalthinkingAnimator$.call(_SelfConveyor, -100000000, 200000000);

        _SelfConveyor.$GetCurrentSlideInfo = function () {
            var positionDisplay = _SelfConveyor.$GetPosition_Display();
            var virtualIndex = Math.floor(positionDisplay);
            var slideIndex = GetRealIndex(virtualIndex);
            var slidePosition = positionDisplay - Math.floor(positionDisplay);

            return { $Index: slideIndex, $VirtualIndex: virtualIndex, $Position: slidePosition };
        };

        _SelfConveyor.$OnPositionChange = function (oldPosition, newPosition) {

            var index = Math.floor(newPosition);
            if (index != newPosition && newPosition > oldPosition)
                index++;

            ResetNavigator(index, true);

            _SelfSlider.$TriggerEvent($NepalthinkingSlider$.$EVT_POSITION_CHANGE, GetRealIndex(newPosition), GetRealIndex(oldPosition), newPosition, oldPosition);
        };
    }
    //Conveyor

    //Carousel
    function Carousel() {
        var _SelfCarousel = this;

        $NepalthinkingAnimator$.call(_SelfCarousel, 0, 0, { $LoopLength: _SlideCount });

        //Carousel Constructor
        {
            $Nepalthinking$.$Each(_SlideItems, function (slideItem) {
                (_Loop & 1) && slideItem.$SetLoopLength(_SlideCount);
                _SelfCarousel.$Chain(slideItem);
                slideItem.$Shift(_ParkingPosition / _StepLength);
            });
        }
    }
    //Carousel

    //Slideshow
    function Slideshow() {
        var _SelfSlideshow = this;
        var _Wrapper = _SlideContainer.$Elmt;

        $NepalthinkingAnimator$.call(_SelfSlideshow, -1, 2, { $Easing: $NepalthinkingEasing$.$EaseLinear, $Setter: { $Position: SetPosition }, $LoopLength: _SlideCount }, _Wrapper, { $Position: 1 }, { $Position: -2 });

        _SelfSlideshow.$Wrapper = _Wrapper;

        //Slideshow Constructor
        {
            $NepalthinkingDebug$.$Execute(function () {
                $Nepalthinking$.$Attribute(_SlideContainer.$Elmt, "debug-id", "slide_container");
            });
        }
    }
    //Slideshow

    //CarouselPlayer
    function CarouselPlayer(carousel, slideshow) {
        var _SelfCarouselPlayer = this;
        var _FromPosition;
        var _ToPosition;
        var _Duration;
        var _StandBy;
        var _StandByPosition;

        $NepalthinkingAnimator$.call(_SelfCarouselPlayer, -100000000, 200000000, { $IntervalMax: 100 });

        _SelfCarouselPlayer.$OnStart = function () {
            _IsSliding = true;
            _LoadingTicket = null;

            //EVT_SWIPE_START
            _SelfSlider.$TriggerEvent($NepalthinkingSlider$.$EVT_SWIPE_START, GetRealIndex(_Conveyor.$GetPosition()), _Conveyor.$GetPosition());
        };

        _SelfCarouselPlayer.$OnStop = function () {

            _IsSliding = false;
            _StandBy = false;

            var currentSlideInfo = _Conveyor.$GetCurrentSlideInfo();

            //EVT_SWIPE_END
            _SelfSlider.$TriggerEvent($NepalthinkingSlider$.$EVT_SWIPE_END, GetRealIndex(_Conveyor.$GetPosition()), _Conveyor.$GetPosition());

            if (!currentSlideInfo.$Position) {
                OnPark(currentSlideInfo.$VirtualIndex, _CurrentSlideIndex);
            }
        };

        _SelfCarouselPlayer.$OnPositionChange = function (oldPosition, newPosition) {

            var toPosition;

            if (_StandBy)
                toPosition = _StandByPosition;
            else {
                toPosition = _ToPosition;

                if (_Duration) {
                    var interPosition = newPosition / _Duration;
                    toPosition = _Options.$SlideEasing(interPosition) * (_ToPosition - _FromPosition) + _FromPosition;
                }
            }

            _Conveyor.$GoToPosition(toPosition);
        };

        _SelfCarouselPlayer.$PlayCarousel = function (fromPosition, toPosition, duration, callback) {
            $NepalthinkingDebug$.$Execute(function () {
                if (_SelfCarouselPlayer.$IsPlaying())
                    $NepalthinkingDebug$.$Fail("The carousel is already playing.");
            });

            _FromPosition = fromPosition;
            _ToPosition = toPosition;
            _Duration = duration;

            _Conveyor.$GoToPosition(fromPosition);
            _SelfCarouselPlayer.$GoToPosition(0);

            _SelfCarouselPlayer.$PlayToPosition(duration, callback);
        };

        _SelfCarouselPlayer.$StandBy = function (standByPosition) {
            _StandBy = true;
            _StandByPosition = standByPosition;
            _SelfCarouselPlayer.$Play(standByPosition, null, true);
        };

        _SelfCarouselPlayer.$SetStandByPosition = function (standByPosition) {
            _StandByPosition = standByPosition;
        };

        _SelfCarouselPlayer.$MoveCarouselTo = function (position) {
            _Conveyor.$GoToPosition(position);
        };

        //CarouselPlayer Constructor
        {
            _Conveyor = new Conveyor();

            _Conveyor.$Combine(carousel);
            _Conveyor.$Combine(slideshow);
        }
    }
    //CarouselPlayer

    //SlideContainer
    function SlideContainer() {
        var _Self = this;
        var elmt = CreatePanel();

        $Nepalthinking$.$CssZIndex(elmt, 0);
        $Nepalthinking$.$Css(elmt, "pointerEvents", "none");

        _Self.$Elmt = elmt;

        _Self.$AddClipElement = function (clipElement) {
            $Nepalthinking$.$AppendChild(elmt, clipElement);
            $Nepalthinking$.$ShowElement(elmt);
        };

        _Self.$Clear = function () {
            $Nepalthinking$.$HideElement(elmt);
            $Nepalthinking$.$Empty(elmt);
        };
    }
    //SlideContainer

    //SlideItem
    function SlideItem(slideElmt, slideIndex) {

        var _SelfSlideItem = this;

        var _CaptionSliderIn;
        var _CaptionSliderOut;
        var _CaptionSliderCurrent;
        var _IsCaptionSliderPlayingWhenDragStart;

        var _Wrapper;
        var _BaseElement = slideElmt;

        var _LoadingScreen;

        var _ImageItem;
        var _ImageElmts = [];
        var _LinkItemOrigin;
        var _LinkItem;
        var _ImageLoading;
        var _ImageLoaded;
        var _ImageLazyLoading;
        var _ContentRefreshed;

        var _Processor;

        var _PlayerInstanceElement;
        var _PlayerInstance;

        var _SequenceNumber;    //for debug only

        $NepalthinkingAnimator$.call(_SelfSlideItem, -_DisplayPieces, _DisplayPieces + 1, { $SlideItemAnimator: true });

        function ResetCaptionSlider(fresh) {
            _CaptionSliderOut && _CaptionSliderOut.$Revert();
            _CaptionSliderIn && _CaptionSliderIn.$Revert();

            RefreshContent(slideElmt, fresh);
            _ContentRefreshed = true;

            _CaptionSliderIn = new _CaptionSliderOptions.$Class(slideElmt, _CaptionSliderOptions, 1);
            $NepalthinkingDebug$.$LiveStamp(_CaptionSliderIn, "caption_slider_" + _CaptionSliderCount + "_in");
            _CaptionSliderOut = new _CaptionSliderOptions.$Class(slideElmt, _CaptionSliderOptions);
            $NepalthinkingDebug$.$LiveStamp(_CaptionSliderOut, "caption_slider_" + _CaptionSliderCount + "_out");

            $NepalthinkingDebug$.$Execute(function () {
                _CaptionSliderCount++;
            });

            _CaptionSliderOut.$GoToPosition(0);
            _CaptionSliderIn.$GoToPosition(0);
        }

        function EnsureCaptionSliderVersion() {
            if (_CaptionSliderIn.$Version < _CaptionSliderOptions.$Version) {
                ResetCaptionSlider();
            }
        }

        //event handling begin
        function LoadImageCompleteEventHandler(completeCallback, loadingScreen, image) {
            if (!_ImageLoaded) {
                _ImageLoaded = true;

                if (_ImageItem && image) {
                    var imageWidth = image.width;
                    var imageHeight = image.height;
                    var fillWidth = imageWidth;
                    var fillHeight = imageHeight;

                    if (imageWidth && imageHeight && _Options.$FillMode) {

                        //0 stretch, 1 contain (keep aspect ratio and put all inside slide), 2 cover (keep aspect ratio and cover whole slide), 4 actual size, 5 contain for large image, actual size for small image, default value is 0
                        if (_Options.$FillMode & 3 && (!(_Options.$FillMode & 4) || imageWidth > _SlideWidth || imageHeight > _SlideHeight)) {
                            var fitHeight = false;
                            var ratio = _SlideWidth / _SlideHeight * imageHeight / imageWidth;

                            if (_Options.$FillMode & 1) {
                                fitHeight = (ratio > 1);
                            }
                            else if (_Options.$FillMode & 2) {
                                fitHeight = (ratio < 1);
                            }
                            fillWidth = fitHeight ? imageWidth * _SlideHeight / imageHeight : _SlideWidth;
                            fillHeight = fitHeight ? _SlideHeight : imageHeight * _SlideWidth / imageWidth;
                        }

                        $Nepalthinking$.$CssWidth(_ImageItem, fillWidth);
                        $Nepalthinking$.$CssHeight(_ImageItem, fillHeight);
                        $Nepalthinking$.$CssTop(_ImageItem, (_SlideHeight - fillHeight) / 2);
                        $Nepalthinking$.$CssLeft(_ImageItem, (_SlideWidth - fillWidth) / 2);
                    }

                    $Nepalthinking$.$CssPosition(_ImageItem, "absolute");

                    _SelfSlider.$TriggerEvent($NepalthinkingSlider$.$EVT_LOAD_END, slideIndex);
                }
            }

            $Nepalthinking$.$HideElement(loadingScreen);
            completeCallback && completeCallback(_SelfSlideItem);
        }

        function LoadSlideshowImageCompleteEventHandler(nextIndex, nextItem, slideshowTransition, loadingTicket) {
            if (loadingTicket == _LoadingTicket && _CurrentSlideIndex == slideIndex && _AutoPlay) {
                if (!_Frozen) {
                    var nextRealIndex = GetRealIndex(nextIndex);
                    _SlideshowRunner.$Initialize(nextRealIndex, slideIndex, nextItem, _SelfSlideItem, slideshowTransition);
                    nextItem.$HideContentForSlideshow();
                    _Slideshow.$Locate(nextRealIndex, 1);
                    _Slideshow.$GoToPosition(nextRealIndex);
                    _CarouselPlayer.$PlayCarousel(nextIndex, nextIndex, 0);
                }
            }
        }

        function SlideReadyEventHandler(loadingTicket) {
            if (loadingTicket == _LoadingTicket && _CurrentSlideIndex == slideIndex) {

                if (!_Processor) {
                    var slideshowProcessor = null;
                    if (_SlideshowRunner) {
                        if (_SlideshowRunner.$Index == slideIndex)
                            slideshowProcessor = _SlideshowRunner.$GetProcessor();
                        else
                            _SlideshowRunner.$Clear();
                    }

                    EnsureCaptionSliderVersion();

                    _Processor = new Processor(slideElmt, slideIndex, slideshowProcessor, _SelfSlideItem.$GetCaptionSliderIn(), _SelfSlideItem.$GetCaptionSliderOut());
                    _Processor.$SetPlayer(_PlayerInstance);
                }

                !_Processor.$IsPlaying() && _Processor.$Replay();
            }
        }

        function ParkEventHandler(currentIndex, previousIndex, manualActivate) {
            if (currentIndex == slideIndex) {

                if (currentIndex != previousIndex)
                    _SlideItems[previousIndex] && _SlideItems[previousIndex].$ParkOut();
                else
                    !manualActivate && _Processor && _Processor.$AdjustIdleOnPark();

                _PlayerInstance && _PlayerInstance.$Enable();

                //park in
                var loadingTicket = _LoadingTicket = $Nepalthinking$.$GetNow();
                _SelfSlideItem.$LoadImage($Nepalthinking$.$CreateCallback(null, SlideReadyEventHandler, loadingTicket));
            }
            else {
                var distance = Math.abs(slideIndex - currentIndex);
                var loadRange = _DisplayPieces + _Options.$LazyLoading - 1;
                if (!_ImageLazyLoading || distance <= loadRange) {
                    _SelfSlideItem.$LoadImage();
                }
            }
        }

        function SwipeStartEventHandler() {
            if (_CurrentSlideIndex == slideIndex && _Processor) {
                _Processor.$Stop();
                _PlayerInstance && _PlayerInstance.$Quit();
                _PlayerInstance && _PlayerInstance.$Disable();
                _Processor.$OpenSlideshowPanel();
            }
        }

        function FreezeEventHandler() {
            if (_CurrentSlideIndex == slideIndex && _Processor) {
                _Processor.$Stop();
            }
        }

        function ContentClickEventHandler(event) {
            if (_LastDragSucceded) {
                $Nepalthinking$.$StopEvent(event);

                var checkElement = $Nepalthinking$.$EvtSrc(event);
                while (checkElement && slideElmt !== checkElement) {
                    if (checkElement.tagName == "A") {
                        $Nepalthinking$.$CancelEvent(event);
                    }
                    try {
                        checkElement = checkElement.parentNode;
                    } catch (e) {
                        // Firefox sometimes fires events for XUL elements, which throws
                        // a "permission denied" error. so this is not a child.
                        break;
                    }
                }
            }
        }

        function SlideClickEventHandler(event) {
            if (!_LastDragSucceded) {
                _SelfSlider.$TriggerEvent($NepalthinkingSlider$.$EVT_CLICK, slideIndex, event);
            }
        }

        function PlayerAvailableEventHandler() {
            _PlayerInstance = _PlayerInstanceElement.pInstance;
            _Processor && _Processor.$SetPlayer(_PlayerInstance);
        }

        _SelfSlideItem.$LoadImage = function (completeCallback, loadingScreen) {
            loadingScreen = loadingScreen || _LoadingScreen;

            if (_ImageElmts.length && !_ImageLoaded) {

                $Nepalthinking$.$ShowElement(loadingScreen);

                if (!_ImageLoading) {
                    _ImageLoading = true;
                    _SelfSlider.$TriggerEvent($NepalthinkingSlider$.$EVT_LOAD_START, slideIndex);

                    $Nepalthinking$.$Each(_ImageElmts, function (imageElmt) {

                        if (!$Nepalthinking$.$Attribute(imageElmt, "src")) {
                            imageElmt.src = $Nepalthinking$.$AttributeEx(imageElmt, "src2");
                            $Nepalthinking$.$CssDisplay(imageElmt, imageElmt["display-origin"]);
                        }
                    });
                }
                $Nepalthinking$.$LoadImages(_ImageElmts, _ImageItem, $Nepalthinking$.$CreateCallback(null, LoadImageCompleteEventHandler, completeCallback, loadingScreen));
            }
            else {
                LoadImageCompleteEventHandler(completeCallback, loadingScreen);
            }
        };

        _SelfSlideItem.$GoForNextSlide = function () {

            var index = slideIndex;
            if (_Options.$AutoPlaySteps < 0)
                index -= _SlideCount;

            var nextIndex = index + _Options.$AutoPlaySteps * _PlayReverse;

            if (_Loop & 2) {
                //Rewind
                nextIndex = GetRealIndex(nextIndex);
            }
            if (!(_Loop & 1)) {
                //Stop at threshold
                nextIndex = Math.max(0, Math.min(nextIndex, _SlideCount - _DisplayPieces));
            }

            if (nextIndex != slideIndex) {
                if (_SlideshowRunner) {
                    var slideshowTransition = _SlideshowRunner.$GetTransition(_SlideCount);

                    if (slideshowTransition) {
                        var loadingTicket = _LoadingTicket = $Nepalthinking$.$GetNow();

                        var nextItem = _SlideItems[GetRealIndex(nextIndex)];
                        return nextItem.$LoadImage($Nepalthinking$.$CreateCallback(null, LoadSlideshowImageCompleteEventHandler, nextIndex, nextItem, slideshowTransition, loadingTicket), _LoadingScreen);
                    }
                }

                PlayTo(nextIndex);
            }
        };

        _SelfSlideItem.$TryActivate = function () {
            ParkEventHandler(slideIndex, slideIndex, true);
        };

        _SelfSlideItem.$ParkOut = function () {
            //park out
            _PlayerInstance && _PlayerInstance.$Quit();
            _PlayerInstance && _PlayerInstance.$Disable();
            _SelfSlideItem.$UnhideContentForSlideshow();
            _Processor && _Processor.$Abort();
            _Processor = null;
            ResetCaptionSlider();
        };

        //for debug only
        _SelfSlideItem.$StampSlideItemElements = function (stamp) {
            stamp = _SequenceNumber + "_" + stamp;

            $NepalthinkingDebug$.$Execute(function () {
                if (_ImageItem)
                    $Nepalthinking$.$Attribute(_ImageItem, "debug-id", stamp + "_slide_item_image_id");

                $Nepalthinking$.$Attribute(slideElmt, "debug-id", stamp + "_slide_item_item_id");
            });

            $NepalthinkingDebug$.$Execute(function () {
                $Nepalthinking$.$Attribute(_Wrapper, "debug-id", stamp + "_slide_item_wrapper_id");
            });

            $NepalthinkingDebug$.$Execute(function () {
                $Nepalthinking$.$Attribute(_LoadingScreen, "debug-id", stamp + "_loading_container_id");
            });
        };

        _SelfSlideItem.$HideContentForSlideshow = function () {
            $Nepalthinking$.$HideElement(slideElmt);
        };

        _SelfSlideItem.$UnhideContentForSlideshow = function () {
            $Nepalthinking$.$ShowElement(slideElmt);
        };

        _SelfSlideItem.$EnablePlayer = function () {
            _PlayerInstance && _PlayerInstance.$Enable();
        };

        function RefreshContent(elmt, fresh, level) {
            $NepalthinkingDebug$.$Execute(function () {
                if ($Nepalthinking$.$Attribute(elmt, "Nepalthinking-slider"))
                    $NepalthinkingDebug$.$Log("Child slider found.");
            });

            if ($Nepalthinking$.$Attribute(elmt, "Nepalthinking-slider"))
                return;

            level = level || 0;

            if (!_ContentRefreshed) {
                if (elmt.tagName == "IMG") {
                    _ImageElmts.push(elmt);

                    if (!$Nepalthinking$.$Attribute(elmt, "src")) {
                        _ImageLazyLoading = true;
                        elmt["display-origin"] = $Nepalthinking$.$CssDisplay(elmt);
                        $Nepalthinking$.$HideElement(elmt);
                    }
                }
                if ($Nepalthinking$.$IsBrowserIe9Earlier()) {
                    $Nepalthinking$.$CssZIndex(elmt, ($Nepalthinking$.$CssZIndex(elmt) || 0) + 1);
                }
                if (_Options.$HWA && $Nepalthinking$.$WebKitVersion()) {
                    if ($Nepalthinking$.$WebKitVersion() < 534 || (!_SlideshowEnabled && !$Nepalthinking$.$IsBrowserChrome())) {
                        $Nepalthinking$.$EnableHWA(elmt);
                    }
                }
            }

            var childElements = $Nepalthinking$.$Children(elmt);

            $Nepalthinking$.$Each(childElements, function (childElement, i) {

                var childTagName = childElement.tagName;
                var uAttribute = $Nepalthinking$.$AttributeEx(childElement, "u");
                if (uAttribute == "player" && !_PlayerInstanceElement) {
                    _PlayerInstanceElement = childElement;
                    if (_PlayerInstanceElement.pInstance) {
                        PlayerAvailableEventHandler();
                    }
                    else {
                        $Nepalthinking$.$AddEvent(_PlayerInstanceElement, "dataavailable", PlayerAvailableEventHandler);
                    }
                }

                if (uAttribute == "caption") {
                    if (!$Nepalthinking$.$IsBrowserIE() && !fresh) {

                        //if (childTagName == "A") {
                        //    $Nepalthinking$.$RemoveEvent(childElement, "click", ContentClickEventHandler);
                        //    $Nepalthinking$.$Attribute(childElement, "Nepalthinking-content", null);
                        //}

                        var captionElement = $Nepalthinking$.$CloneNode(childElement, false, true);
                        $Nepalthinking$.$InsertBefore(captionElement, childElement, elmt);
                        $Nepalthinking$.$RemoveElement(childElement, elmt);
                        childElement = captionElement;

                        fresh = true;
                    }
                }
                else if (!_ContentRefreshed && !level && !_ImageItem) {

                    if (childTagName == "A") {
                        if ($Nepalthinking$.$AttributeEx(childElement, "u") == "image") {
                            _ImageItem = $Nepalthinking$.$FindChildByTag(childElement, "IMG");

                            $NepalthinkingDebug$.$Execute(function () {
                                if (!_ImageItem) {
                                    $NepalthinkingDebug$.$Error("slide html code definition error, no 'IMG' found in a 'image with link' slide.\r\n" + elmt.outerHTML);
                                }
                            });
                        }
                        else {
                            _ImageItem = $Nepalthinking$.$FindChild(childElement, "image", true);
                        }

                        if (_ImageItem) {
                            _LinkItemOrigin = childElement;
                            $Nepalthinking$.$SetStyles(_LinkItemOrigin, _StyleDef);

                            _LinkItem = $Nepalthinking$.$CloneNode(_LinkItemOrigin, true);
                            //$Nepalthinking$.$AddEvent(_LinkItem, "click", ContentClickEventHandler);

                            $Nepalthinking$.$CssDisplay(_LinkItem, "block");
                            $Nepalthinking$.$SetStyles(_LinkItem, _StyleDef);
                            $Nepalthinking$.$CssOpacity(_LinkItem, 0);
                            $Nepalthinking$.$Css(_LinkItem, "backgroundColor", "#000");
                        }
                    }
                    else if (childTagName == "IMG" && $Nepalthinking$.$AttributeEx(childElement, "u") == "image") {
                        _ImageItem = childElement;
                    }

                    if (_ImageItem) {
                        _ImageItem.border = 0;
                        $Nepalthinking$.$SetStyles(_ImageItem, _StyleDef);
                    }
                }

                //if (!$Nepalthinking$.$Attribute(childElement, "Nepalthinking-content")) {
                //    //cancel click event on <A> element when a drag of slide succeeded
                //    $Nepalthinking$.$AddEvent(childElement, "click", ContentClickEventHandler);
                //    $Nepalthinking$.$Attribute(childElement, "Nepalthinking-content", true);
                //}

                RefreshContent(childElement, fresh, level +1);
            });
        }

        _SelfSlideItem.$OnInnerOffsetChange = function (oldOffset, newOffset) {
            var slidePosition = _DisplayPieces - newOffset;

            SetPosition(_Wrapper, slidePosition);

            //following lines are for future usage, not ready yet
            //if (!_IsDragging || !_IsCaptionSliderPlayingWhenDragStart) {
            //    var _DealWithParallax;
            //    if (IsCurrentSlideIndex(slideIndex)) {
            //        if (_CaptionSliderOptions.$PlayOutMode == 2)
            //            _DealWithParallax = true;
            //    }
            //    else {
            //        if (!_CaptionSliderOptions.$PlayInMode) {
            //            //PlayInMode: 0 none
            //            _CaptionSliderIn.$GoToEnd();
            //        }
            //        //else if (_CaptionSliderOptions.$PlayInMode == 1) {
            //        //    //PlayInMode: 1 chain
            //        //    _CaptionSliderIn.$GoToPosition(0);
            //        //}
            //        else if (_CaptionSliderOptions.$PlayInMode == 2) {
            //            //PlayInMode: 2 parallel
            //            _DealWithParallax = true;
            //        }
            //    }

            //    if (_DealWithParallax) {
            //        _CaptionSliderIn.$GoToPosition((_CaptionSliderIn.$GetPosition_OuterEnd() - _CaptionSliderIn.$GetPosition_OuterBegin()) * Math.abs(newOffset - 1) * .8 + _CaptionSliderIn.$GetPosition_OuterBegin());
            //    }
            //}
        };

        _SelfSlideItem.$GetCaptionSliderIn = function () {
            return _CaptionSliderIn;
        };

        _SelfSlideItem.$GetCaptionSliderOut = function () {
            return _CaptionSliderOut;
        };

        _SelfSlideItem.$Index = slideIndex;

        $NepalthinkingObject$.call(_SelfSlideItem);

        //SlideItem Constructor
        {

            var thumb = $Nepalthinking$.$FindChild(slideElmt, "thumb", true);
            if (thumb) {
                _SelfSlideItem.$Thumb = $Nepalthinking$.$CloneNode(thumb);
                $Nepalthinking$.$RemoveAttribute(thumb, "id");
                $Nepalthinking$.$HideElement(thumb);
            }
            $Nepalthinking$.$ShowElement(slideElmt);

            _LoadingScreen = $Nepalthinking$.$CloneNode(_LoadingContainer);
            $Nepalthinking$.$CssZIndex(_LoadingScreen, 1000);

            //cancel click event on <A> element when a drag of slide succeeded
            $Nepalthinking$.$AddEvent(slideElmt, "click", SlideClickEventHandler);

            ResetCaptionSlider(true);

            _SelfSlideItem.$Image = _ImageItem;
            _SelfSlideItem.$Link = _LinkItem;

            _SelfSlideItem.$Item = slideElmt;

            _SelfSlideItem.$Wrapper = _Wrapper = slideElmt;
            $Nepalthinking$.$AppendChild(_Wrapper, _LoadingScreen);

            _SelfSlider.$On(203, ParkEventHandler);
            _SelfSlider.$On(28, FreezeEventHandler);
            _SelfSlider.$On(24, SwipeStartEventHandler);

            $NepalthinkingDebug$.$Execute(function () {
                _SequenceNumber = _SlideItemCreatedCount++;
            });

            $NepalthinkingDebug$.$Execute(function () {
                $Nepalthinking$.$Attribute(_Wrapper, "debug-id", "slide-" + slideIndex);
            });
        }
    }
    //SlideItem

    //Processor
    function Processor(slideElmt, slideIndex, slideshowProcessor, captionSliderIn, captionSliderOut) {

        var _SelfProcessor = this;

        var _ProgressBegin = 0;
        var _SlideshowBegin = 0;
        var _SlideshowEnd;
        var _CaptionInBegin;
        var _IdleBegin;
        var _IdleEnd;
        var _ProgressEnd;

        var _IsSlideshowRunning;
        var _IsRollingBack;

        var _PlayerInstance;
        var _IsPlayerOnService;

        var slideItem = _SlideItems[slideIndex];

        $NepalthinkingAnimator$.call(_SelfProcessor, 0, 0);

        function UpdateLink() {

            $Nepalthinking$.$Empty(_LinkContainer);

            if (_ShowLink && _IsSlideshowRunning && slideItem.$Link) {
                $Nepalthinking$.$AppendChild(_LinkContainer, slideItem.$Link);
            }

            $Nepalthinking$.$ShowElement(_LinkContainer, !_IsSlideshowRunning && slideItem.$Image);
        }

        function ProcessCompleteEventHandler() {

            if (_IsRollingBack) {
                _IsRollingBack = false;
                _SelfSlider.$TriggerEvent($NepalthinkingSlider$.$EVT_ROLLBACK_END, slideIndex, _IdleEnd, _ProgressBegin, _IdleBegin, _IdleEnd, _ProgressEnd);
                _SelfProcessor.$GoToPosition(_IdleBegin);
            }

            _SelfProcessor.$Replay();
        }

        function PlayerSwitchEventHandler(isOnService) {
            _IsPlayerOnService = isOnService;

            _SelfProcessor.$Stop();
            _SelfProcessor.$Replay();
        }

        _SelfProcessor.$Replay = function () {

            var currentPosition = _SelfProcessor.$GetPosition_Display();

            if (!_IsDragging && !_IsSliding && !_IsPlayerOnService && _CurrentSlideIndex == slideIndex) {

                if (!currentPosition) {
                    if (_SlideshowEnd && !_IsSlideshowRunning) {
                        _IsSlideshowRunning = true;

                        _SelfProcessor.$OpenSlideshowPanel(true);

                        _SelfSlider.$TriggerEvent($NepalthinkingSlider$.$EVT_SLIDESHOW_START, slideIndex, _ProgressBegin, _SlideshowBegin, _SlideshowEnd, _ProgressEnd);
                    }

                    UpdateLink();
                }

                var toPosition;
                var stateEvent = $NepalthinkingSlider$.$EVT_STATE_CHANGE;

                if (currentPosition != _ProgressEnd) {
                    if (currentPosition == _IdleEnd) {
                        toPosition = _ProgressEnd;
                    }
                    else if (currentPosition == _IdleBegin) {
                        toPosition = _IdleEnd;
                    }
                    else if (!currentPosition) {
                        toPosition = _IdleBegin;
                    }
                    else if (currentPosition > _IdleEnd) {
                        _IsRollingBack = true;
                        toPosition = _IdleEnd;
                        stateEvent = $NepalthinkingSlider$.$EVT_ROLLBACK_START;
                    }
                    else {
                        //continue from break (by drag or lock)
                        toPosition = _SelfProcessor.$GetPlayToPosition();
                    }
                }

                _SelfSlider.$TriggerEvent(stateEvent, slideIndex, currentPosition, _ProgressBegin, _IdleBegin, _IdleEnd, _ProgressEnd);

                var allowAutoPlay = _AutoPlay && (!_HoverToPause || _NotOnHover);

                if (currentPosition == _ProgressEnd) {
                    (_IdleEnd != _ProgressEnd && !(_HoverToPause & 12) || allowAutoPlay) && slideItem.$GoForNextSlide();
                }
                else if (allowAutoPlay || currentPosition != _IdleEnd) {
                    _SelfProcessor.$PlayToPosition(toPosition, ProcessCompleteEventHandler);
                }
            }
        };

        _SelfProcessor.$AdjustIdleOnPark = function () {
            if (_IdleEnd == _ProgressEnd && _IdleEnd == _SelfProcessor.$GetPosition_Display())
                _SelfProcessor.$GoToPosition(_IdleBegin);
        };

        _SelfProcessor.$Abort = function () {
            _SlideshowRunner && _SlideshowRunner.$Index == slideIndex && _SlideshowRunner.$Clear();

            var currentPosition = _SelfProcessor.$GetPosition_Display();
            if (currentPosition < _ProgressEnd) {
                _SelfSlider.$TriggerEvent($NepalthinkingSlider$.$EVT_STATE_CHANGE, slideIndex, -currentPosition - 1, _ProgressBegin, _IdleBegin, _IdleEnd, _ProgressEnd);
            }
        };

        _SelfProcessor.$OpenSlideshowPanel = function (open) {
            if (slideshowProcessor) {
                $Nepalthinking$.$CssOverflow(_SlideshowPanel, open && slideshowProcessor.$Transition.$Outside ? "" : "hidden");
            }
        };

        _SelfProcessor.$OnInnerOffsetChange = function (oldPosition, newPosition) {

            if (_IsSlideshowRunning && newPosition >= _SlideshowEnd) {
                _IsSlideshowRunning = false;
                UpdateLink();
                slideItem.$UnhideContentForSlideshow();
                _SlideshowRunner.$Clear();

                _SelfSlider.$TriggerEvent($NepalthinkingSlider$.$EVT_SLIDESHOW_END, slideIndex, _ProgressBegin, _SlideshowBegin, _SlideshowEnd, _ProgressEnd);
            }

            _SelfSlider.$TriggerEvent($NepalthinkingSlider$.$EVT_PROGRESS_CHANGE, slideIndex, newPosition, _ProgressBegin, _IdleBegin, _IdleEnd, _ProgressEnd);
        };

        _SelfProcessor.$SetPlayer = function (playerInstance) {
            if (playerInstance && !_PlayerInstance) {
                _PlayerInstance = playerInstance;

                playerInstance.$On($NepalthinkingPlayer$.$EVT_SWITCH, PlayerSwitchEventHandler);
            }
        };

        //Processor Constructor
        {
            if (slideshowProcessor) {
                _SelfProcessor.$Chain(slideshowProcessor);
            }

            _SlideshowEnd = _SelfProcessor.$GetPosition_OuterEnd();
            _CaptionInBegin = _SelfProcessor.$GetPosition_OuterEnd();
            _SelfProcessor.$Chain(captionSliderIn);
            _IdleBegin = captionSliderIn.$GetPosition_OuterEnd();
            _IdleEnd = _IdleBegin + ($Nepalthinking$.$ParseFloat($Nepalthinking$.$AttributeEx(slideElmt, "idle")) || _AutoPlayInterval);

            captionSliderOut.$Shift(_IdleEnd);
            _SelfProcessor.$Combine(captionSliderOut);
            _ProgressEnd = _SelfProcessor.$GetPosition_OuterEnd();
        }
    }
    //Processor
    //#endregion

    function SetPosition(elmt, position) {
        var orientation = _DragOrientation > 0 ? _DragOrientation : _PlayOrientation;
        var x = _StepLengthX * position * (orientation & 1);
        var y = _StepLengthY * position * ((orientation >> 1) & 1);

        x = Math.round(x);
        y = Math.round(y);

        $Nepalthinking$.$CssLeft(elmt, x);
        $Nepalthinking$.$CssTop(elmt, y);
    }

    //#region Event handling begin

    function RecordFreezePoint() {
        _CarouselPlaying_OnFreeze = _IsSliding;
        _PlayToPosition_OnFreeze = _CarouselPlayer.$GetPlayToPosition();
        _Position_OnFreeze = _Conveyor.$GetPosition();
    }

    function Freeze() {
        RecordFreezePoint();

        if (_IsDragging || !_NotOnHover && (_HoverToPause & 12)) {
            _CarouselPlayer.$Stop();

            _SelfSlider.$TriggerEvent($NepalthinkingSlider$.$EVT_FREEZE);
        }
    }

    function Unfreeze(byDrag) {

        if (!_IsDragging && (_NotOnHover || !(_HoverToPause & 12)) && !_CarouselPlayer.$IsPlaying()) {

            var currentPosition = _Conveyor.$GetPosition();
            var toPosition = Math.ceil(_Position_OnFreeze);

            if (byDrag && Math.abs(_DragOffsetTotal) >= _Options.$MinDragOffsetToSlide) {
                toPosition = Math.ceil(currentPosition);
                toPosition += _DragIndexAdjust;
            }

            if (!(_Loop & 1)) {
                toPosition = Math.min(_SlideCount - _DisplayPieces, Math.max(toPosition, 0));
            }

            var t = Math.abs(toPosition - currentPosition);
            t = 1 - Math.pow(1 - t, 5);

            if (!_LastDragSucceded && _CarouselPlaying_OnFreeze) {
                _CarouselPlayer.$Continue(_PlayToPosition_OnFreeze);
            }
            else if (currentPosition == toPosition) {
                _CurrentSlideItem.$EnablePlayer();
                _CurrentSlideItem.$TryActivate();
            }
            else {

                _CarouselPlayer.$PlayCarousel(currentPosition, toPosition, t * _SlideDuration);
            }
        }
    }

    function PreventDragSelectionEvent(event) {
        if (!$Nepalthinking$.$AttributeEx($Nepalthinking$.$EvtSrc(event), "nodrag")) {
            $Nepalthinking$.$CancelEvent(event);
        }
    }

    function OnTouchStart(event) {
        OnDragStart(event, 1);
    }

    function OnDragStart(event, touch) {
        event = $Nepalthinking$.$GetEvent(event);
        var eventSrc = $Nepalthinking$.$EvtSrc(event);

        if (!_DragOrientationRegistered && !$Nepalthinking$.$AttributeEx(eventSrc, "nodrag") && RegisterDrag() && (!touch || event.touches.length == 1)) {
            _IsDragging = true;
            _DragInvalid = false;
            _LoadingTicket = null;

            $Nepalthinking$.$AddEvent(document, touch ? "touchmove" : "mousemove", OnDragMove);

            _LastTimeMoveByDrag = $Nepalthinking$.$GetNow() - 50;

            _LastDragSucceded = 0;
            Freeze();

            if (!_CarouselPlaying_OnFreeze)
                _DragOrientation = 0;

            if (touch) {
                var touchPoint = event.touches[0];
                _DragStartMouseX = touchPoint.clientX;
                _DragStartMouseY = touchPoint.clientY;
            }
            else {
                var mousePoint = $Nepalthinking$.$MousePosition(event);

                _DragStartMouseX = mousePoint.x;
                _DragStartMouseY = mousePoint.y;
            }

            _DragOffsetTotal = 0;
            _DragOffsetLastTime = 0;
            _DragIndexAdjust = 0;

            //Trigger EVT_DRAGSTART
            _SelfSlider.$TriggerEvent($NepalthinkingSlider$.$EVT_DRAG_START, GetRealIndex(_Position_OnFreeze), _Position_OnFreeze, event);
        }
    }

    function OnDragMove(event) {
        if (_IsDragging) {
            event = $Nepalthinking$.$GetEvent(event);

            var actionPoint;

            if (event.type != "mousemove") {
                var touch = event.touches[0];
                actionPoint = { x: touch.clientX, y: touch.clientY };
            }
            else {
                actionPoint = $Nepalthinking$.$MousePosition(event);
            }

            if (actionPoint) {
                var distanceX = actionPoint.x - _DragStartMouseX;
                var distanceY = actionPoint.y - _DragStartMouseY;


                if (Math.floor(_Position_OnFreeze) != _Position_OnFreeze)
                    _DragOrientation = _DragOrientation || (_PlayOrientation & _DragOrientationRegistered);

                if ((distanceX || distanceY) && !_DragOrientation) {
                    if (_DragOrientationRegistered == 3) {
                        if (Math.abs(distanceY) > Math.abs(distanceX)) {
                            _DragOrientation = 2;
                        }
                        else
                            _DragOrientation = 1;
                    }
                    else {
                        _DragOrientation = _DragOrientationRegistered;
                    }

                    if (_IsTouchDevice && _DragOrientation == 1 && Math.abs(distanceY) - Math.abs(distanceX) > 3) {
                        _DragInvalid = true;
                    }
                }

                if (_DragOrientation) {
                    var distance = distanceY;
                    var stepLength = _StepLengthY;

                    if (_DragOrientation == 1) {
                        distance = distanceX;
                        stepLength = _StepLengthX;
                    }

                    if (!(_Loop & 1)) {
                        if (distance > 0) {
                            var normalDistance = stepLength * _CurrentSlideIndex;
                            var sqrtDistance = distance - normalDistance;
                            if (sqrtDistance > 0) {
                                distance = normalDistance + Math.sqrt(sqrtDistance) * 5;
                            }
                        }

                        if (distance < 0) {
                            var normalDistance = stepLength * (_SlideCount - _DisplayPieces - _CurrentSlideIndex);
                            var sqrtDistance = -distance - normalDistance;

                            if (sqrtDistance > 0) {
                                distance = -normalDistance - Math.sqrt(sqrtDistance) * 5;
                            }
                        }
                    }

                    if (_DragOffsetTotal - _DragOffsetLastTime < -2) {
                        _DragIndexAdjust = 0;
                    }
                    else if (_DragOffsetTotal - _DragOffsetLastTime > 2) {
                        _DragIndexAdjust = -1;
                    }

                    _DragOffsetLastTime = _DragOffsetTotal;
                    _DragOffsetTotal = distance;
                    _PositionToGoByDrag = _Position_OnFreeze - _DragOffsetTotal / stepLength / (_ScaleRatio || 1);

                    if (_DragOffsetTotal && _DragOrientation && !_DragInvalid) {
                        $Nepalthinking$.$CancelEvent(event);
                        if (!_IsSliding) {
                            _CarouselPlayer.$StandBy(_PositionToGoByDrag);
                        }
                        else
                            _CarouselPlayer.$SetStandByPosition(_PositionToGoByDrag);
                    }
                }
            }
        }
    }

    function OnDragEnd() {
        UnregisterDrag();

        if (_IsDragging) {

            _IsDragging = false;

            _LastTimeMoveByDrag = $Nepalthinking$.$GetNow();

            $Nepalthinking$.$RemoveEvent(document, "mousemove", OnDragMove);
            $Nepalthinking$.$RemoveEvent(document, "touchmove", OnDragMove);

            _LastDragSucceded = _DragOffsetTotal;

            _CarouselPlayer.$Stop();

            var currentPosition = _Conveyor.$GetPosition();

            //Trigger EVT_DRAG_END
            _SelfSlider.$TriggerEvent($NepalthinkingSlider$.$EVT_DRAG_END, GetRealIndex(currentPosition), currentPosition, GetRealIndex(_Position_OnFreeze), _Position_OnFreeze);

            (_HoverToPause & 12) && RecordFreezePoint();

            Unfreeze(true);
        }
    }

    function SlidesClickEventHandler(event) {
        if (_LastDragSucceded) {
            $Nepalthinking$.$StopEvent(event);

            var checkElement = $Nepalthinking$.$EvtSrc(event);
            while (checkElement && _SlidesContainer !== checkElement) {
                if (checkElement.tagName == "A") {
                    $Nepalthinking$.$CancelEvent(event);
                }
                try {
                    checkElement = checkElement.parentNode;
                } catch (e) {
                    // Firefox sometimes fires events for XUL elements, which throws
                    // a "permission denied" error. so this is not a child.
                    break;
                }
            }
        }
    }
    //#endregion

    function SetCurrentSlideIndex(index) {
        _PrevSlideItem = _SlideItems[_CurrentSlideIndex];
        _PreviousSlideIndex = _CurrentSlideIndex;
        _CurrentSlideIndex = GetRealIndex(index);
        _CurrentSlideItem = _SlideItems[_CurrentSlideIndex];
        ResetNavigator(index);
        return _CurrentSlideIndex;
    }

    function OnPark(slideIndex, prevIndex) {
        _DragOrientation = 0;

        SetCurrentSlideIndex(slideIndex);

        //Trigger EVT_PARK
        _SelfSlider.$TriggerEvent($NepalthinkingSlider$.$EVT_PARK, GetRealIndex(slideIndex), prevIndex);
    }

    function ResetNavigator(index, temp) {
        _TempSlideIndex = index;
        $Nepalthinking$.$Each(_Navigators, function (navigator) {
            navigator.$SetCurrentIndex(GetRealIndex(index), index, temp);
        });
    }

    function RegisterDrag() {
        var dragRegistry = $NepalthinkingSlider$.$DragRegistry || 0;
        var dragOrientation = _DragEnabled;
        if (_IsTouchDevice)
            (dragOrientation & 1) && (dragOrientation &= 1);
        $NepalthinkingSlider$.$DragRegistry |= dragOrientation;

        return (_DragOrientationRegistered = dragOrientation & ~dragRegistry);
    }

    function UnregisterDrag() {
        if (_DragOrientationRegistered) {
            $NepalthinkingSlider$.$DragRegistry &= ~_DragEnabled;
            _DragOrientationRegistered = 0;
        }
    }

    function CreatePanel() {
        var div = $Nepalthinking$.$CreateDiv();

        $Nepalthinking$.$SetStyles(div, _StyleDef);
        $Nepalthinking$.$CssPosition(div, "absolute");

        return div;
    }

    function GetRealIndex(index) {
        return (index % _SlideCount + _SlideCount) % _SlideCount;
    }

    function IsCurrentSlideIndex(index) {
        return GetRealIndex(index) == _CurrentSlideIndex;
    }

    function IsPreviousSlideIndex(index) {
        return GetRealIndex(index) == _PreviousSlideIndex;
    }

    //Navigation Request Handler
    function NavigationClickHandler(index, relative) {
        var toIndex = index;

        if (relative) {
            if (!_Loop) {
                //Stop at threshold
                toIndex = Math.min(Math.max(toIndex + _TempSlideIndex, 0), _SlideCount - _DisplayPieces);
                relative = false;
            }
            else if (_Loop & 2) {
                //Rewind
                toIndex = GetRealIndex(toIndex + _TempSlideIndex);
                relative = false;
            }
        }
        else if (_Loop) {
            toIndex = _SelfSlider.$GetVirtualIndex(toIndex);
        }

        PlayTo(toIndex, _Options.$SlideDuration, relative);
    }

    function ShowNavigators() {
        $Nepalthinking$.$Each(_Navigators, function (navigator) {
            navigator.$Show(navigator.$Options.$ChanceToShow <= _NotOnHover);
        });
    }

    function MainContainerMouseLeaveEventHandler() {
        if (!_NotOnHover) {

            //$NepalthinkingDebug$.$Log("mouseleave");

            _NotOnHover = 1;

            ShowNavigators();

            if (!_IsDragging) {
                (_HoverToPause & 12) && Unfreeze();
                (_HoverToPause & 3) && _SlideItems[_CurrentSlideIndex].$TryActivate();
            }
        }
    }

    function MainContainerMouseEnterEventHandler() {

        if (_NotOnHover) {

            //$NepalthinkingDebug$.$Log("mouseenter");

            _NotOnHover = 0;

            ShowNavigators();

            _IsDragging || !(_HoverToPause & 12) || Freeze();
        }
    }

    function AdjustSlidesContainerSize() {
        _StyleDef = { $Width: _SlideWidth, $Height: _SlideHeight, $Top: 0, $Left: 0 };

        $Nepalthinking$.$Each(_SlideElmts, function (slideElmt, i) {

            $Nepalthinking$.$SetStyles(slideElmt, _StyleDef);
            $Nepalthinking$.$CssPosition(slideElmt, "absolute");
            $Nepalthinking$.$CssOverflow(slideElmt, "hidden");

            $Nepalthinking$.$HideElement(slideElmt);
        });

        $Nepalthinking$.$SetStyles(_LoadingContainer, _StyleDef);
    }

    function PlayToOffset(offset, slideDuration) {
        PlayTo(offset, slideDuration, true);
    }

    function PlayTo(slideIndex, slideDuration, relative) {
        ///	<summary>
        ///		PlayTo( slideIndex [, slideDuration] ); //Play slider to position 'slideIndex' within a period calculated base on 'slideDuration'.
        ///	</summary>
        ///	<param name="slideIndex" type="Number">
        ///		slide slideIndex or position will be playing to
        ///	</param>
        ///	<param name="slideDuration" type="Number" optional="true">
        ///		base slide duration in milliseconds to calculate the whole duration to complete this play request.
        ///	    default value is '$SlideDuration' value which is specified when initialize the slider.
        ///	</param>
        /// http://msdn.microsoft.com/en-us/library/vstudio/bb385682.aspx
        /// http://msdn.microsoft.com/en-us/library/vstudio/hh542720.aspx
        if (_CarouselEnabled && (!_IsDragging && (_NotOnHover || !(_HoverToPause & 12)) || _Options.$NaviQuitDrag)) {
            _IsSliding = true;
            _IsDragging = false;
            _CarouselPlayer.$Stop();

            {
                //Slide Duration
                if (slideDuration == undefined)
                    slideDuration = _SlideDuration;

                var positionDisplay = _Carousel.$GetPosition_Display();
                var positionTo = slideIndex;
                if (relative) {
                    positionTo = positionDisplay + slideIndex;
                    if (slideIndex > 0)
                        positionTo = Math.ceil(positionTo);
                    else
                        positionTo = Math.floor(positionTo);
                }

                if (_Loop & 2) {
                    //Rewind
                    positionTo = GetRealIndex(positionTo);
                }
                if (!(_Loop & 1)) {
                    //Stop at threshold
                    positionTo = Math.max(0, Math.min(positionTo, _SlideCount - _DisplayPieces));
                }

                var positionOffset = (positionTo - positionDisplay) % _SlideCount;
                positionTo = positionDisplay + positionOffset;

                var duration = positionDisplay == positionTo ? 0 : slideDuration * Math.abs(positionOffset);
                duration = Math.min(duration, slideDuration * _DisplayPieces * 1.5);

                _CarouselPlayer.$PlayCarousel(positionDisplay, positionTo, duration || 1);
            }
        }
    }

    //private functions

    //member functions

    _SelfSlider.$PlayTo = PlayTo;

    _SelfSlider.$GoTo = function (slideIndex) {
        ///	<summary>
        ///		instance.$GoTo( slideIndex );   //Go to the specifed slide immediately with no play.
        ///	</summary>
        //PlayTo(slideIndex, 1);
        _Conveyor.$GoToPosition(slideIndex);
    };

    _SelfSlider.$Next = function () {
        ///	<summary>
        ///		instance.$Next();   //Play the slider to next slide.
        ///	</summary>
        PlayToOffset(1);
    };

    _SelfSlider.$Prev = function () {
        ///	<summary>
        ///		instance.$Prev();   //Play the slider to previous slide.
        ///	</summary>
        PlayToOffset(-1);
    };

    _SelfSlider.$Pause = function () {
        ///	<summary>
        ///		instance.$Pause();   //Pause the slider, prevent it from auto playing.
        ///	</summary>
        _AutoPlay = false;
    };

    _SelfSlider.$Play = function () {
        ///	<summary>
        ///		instance.$Play();   //Start auto play if the slider is currently paused.
        ///	</summary>
        if (!_AutoPlay) {
            _AutoPlay = true;
            _SlideItems[_CurrentSlideIndex] && _SlideItems[_CurrentSlideIndex].$TryActivate();
        }
    };

    _SelfSlider.$SetSlideshowTransitions = function (transitions) {
        ///	<summary>
        ///		instance.$SetSlideshowTransitions( transitions );   //Reset slideshow transitions for the slider.
        ///	</summary>
        $NepalthinkingDebug$.$Execute(function () {
            if (!transitions || !transitions.length) {
                $NepalthinkingDebug$.$Error("Can not set slideshow transitions, no transitions specified.");
            }
        });

        //$Nepalthinking$.$TranslateTransitions(transitions);    //for old transition compatibility
        _Options.$SlideshowOptions.$Transitions = transitions;
    };

    _SelfSlider.$SetCaptionTransitions = function (transitions) {
        ///	<summary>
        ///		instance.$SetCaptionTransitions( transitions );   //Reset caption transitions for the slider.
        ///	</summary>
        $NepalthinkingDebug$.$Execute(function () {
            if (!transitions || !transitions.length) {
                $NepalthinkingDebug$.$Error("Can not set caption transitions, no transitions specified");
            }
        });

        //$Nepalthinking$.$TranslateTransitions(transitions);    //for old transition compatibility
        _CaptionSliderOptions.$CaptionTransitions = transitions;
        _CaptionSliderOptions.$Version = $Nepalthinking$.$GetNow();
    };

    _SelfSlider.$SlidesCount = function () {
        ///	<summary>
        ///		instance.$SlidesCount();   //Retrieve slides count of the slider.
        ///	</summary>
        return _SlideElmts.length;
    };

    _SelfSlider.$CurrentIndex = function () {
        ///	<summary>
        ///		instance.$CurrentIndex();   //Retrieve current slide index of the slider.
        ///	</summary>
        return _CurrentSlideIndex;
    };

    _SelfSlider.$IsAutoPlaying = function () {
        ///	<summary>
        ///		instance.$IsAutoPlaying();   //Retrieve auto play status of the slider.
        ///	</summary>
        return _AutoPlay;
    };

    _SelfSlider.$IsDragging = function () {
        ///	<summary>
        ///		instance.$IsDragging();   //Retrieve drag status of the slider.
        ///	</summary>
        return _IsDragging;
    };

    _SelfSlider.$IsSliding = function () {
        ///	<summary>
        ///		instance.$IsSliding();   //Retrieve right<-->left sliding status of the slider.
        ///	</summary>
        return _IsSliding;
    };

    _SelfSlider.$IsMouseOver = function () {
        ///	<summary>
        ///		instance.$IsMouseOver();   //Retrieve mouse over status of the slider.
        ///	</summary>
        return !_NotOnHover;
    };

    _SelfSlider.$LastDragSucceded = function () {
        ///	<summary>
        ///		instance.$IsLastDragSucceded();   //Retrieve last drag succeded status, returns 0 if failed, returns drag offset if succeded
        ///	</summary>
        return _LastDragSucceded;
    };

    function OriginalWidth() {
        ///	<summary>
        ///		instance.$OriginalWidth();   //Retrieve original width of the slider.
        ///	</summary>
        return $Nepalthinking$.$CssWidth(_ScaleWrapper || elmt);
    }

    function OriginalHeight() {
        ///	<summary>
        ///		instance.$OriginalHeight();   //Retrieve original height of the slider.
        ///	</summary>
        return $Nepalthinking$.$CssHeight(_ScaleWrapper || elmt);
    }

    _SelfSlider.$OriginalWidth = _SelfSlider.$GetOriginalWidth = OriginalWidth;

    _SelfSlider.$OriginalHeight = _SelfSlider.$GetOriginalHeight = OriginalHeight;

    function Scale(dimension, isHeight) {
        ///	<summary>
        ///		instance.$ScaleWidth();   //Retrieve scaled dimension the slider currently displays.
        ///		instance.$ScaleWidth( dimension );   //Scale the slider to new width and keep aspect ratio.
        ///	</summary>

        if (dimension == undefined)
            return $Nepalthinking$.$CssWidth(elmt);

        if (!_ScaleWrapper) {
            $NepalthinkingDebug$.$Execute(function () {
                var originalWidthStr = $Nepalthinking$.$Css(elmt, "width");
                var originalHeightStr = $Nepalthinking$.$Css(elmt, "height");
                var originalWidth = $Nepalthinking$.$CssP(elmt, "width");
                var originalHeight = $Nepalthinking$.$CssP(elmt, "height");

                if (!originalWidthStr || originalWidthStr.indexOf("px") == -1) {
                    $NepalthinkingDebug$.$Fail("Cannot scale Nepalthinking slider, 'width' of 'outer container' not specified. Please specify 'width' in pixel. e.g. 'width: 600px;'");
                }

                if (!originalHeightStr || originalHeightStr.indexOf("px") == -1) {
                    $NepalthinkingDebug$.$Fail("Cannot scale Nepalthinking slider, 'height' of 'outer container' not specified. Please specify 'height' in pixel. e.g. 'height: 300px;'");
                }

                if (originalWidthStr.indexOf('%') != -1) {
                    $NepalthinkingDebug$.$Fail("Cannot scale Nepalthinking slider, 'width' of 'outer container' not valid. Please specify 'width' in pixel. e.g. 'width: 600px;'");
                }

                if (originalHeightStr.indexOf('%') != -1) {
                    $NepalthinkingDebug$.$Fail("Cannot scale Nepalthinking slider, 'height' of 'outer container' not valid. Please specify 'height' in pixel. e.g. 'height: 300px;'");
                }

                if (!originalWidth) {
                    $NepalthinkingDebug$.$Fail("Cannot scale Nepalthinking slider, 'width' of 'outer container' not valid. 'width' of 'outer container' should be positive number. e.g. 'width: 600px;'");
                }

                if (!originalHeight) {
                    $NepalthinkingDebug$.$Fail("Cannot scale Nepalthinking slider, 'height' of 'outer container' not valid. 'height' of 'outer container' should be positive number. e.g. 'height: 300px;'");
                }
            });

            var innerWrapper = $Nepalthinking$.$CreateDiv(document);
            $Nepalthinking$.$ClassName(innerWrapper, $Nepalthinking$.$ClassName(elmt));
            $Nepalthinking$.$CssCssText(innerWrapper, $Nepalthinking$.$CssCssText(elmt));
            $Nepalthinking$.$CssDisplay(innerWrapper, "block");

            $Nepalthinking$.$CssPosition(innerWrapper, "relative");
            $Nepalthinking$.$CssTop(innerWrapper, 0);
            $Nepalthinking$.$CssLeft(innerWrapper, 0);
            $Nepalthinking$.$CssOverflow(innerWrapper, "visible");

            _ScaleWrapper = $Nepalthinking$.$CreateDiv(document);

            $Nepalthinking$.$CssPosition(_ScaleWrapper, "absolute");
            $Nepalthinking$.$CssTop(_ScaleWrapper, 0);
            $Nepalthinking$.$CssLeft(_ScaleWrapper, 0);
            $Nepalthinking$.$CssWidth(_ScaleWrapper, $Nepalthinking$.$CssWidth(elmt));
            $Nepalthinking$.$CssHeight(_ScaleWrapper, $Nepalthinking$.$CssHeight(elmt));
            $Nepalthinking$.$SetStyleTransformOrigin(_ScaleWrapper, "0 0");

            $Nepalthinking$.$AppendChild(_ScaleWrapper, innerWrapper);

            var children = $Nepalthinking$.$Children(elmt);
            $Nepalthinking$.$AppendChild(elmt, _ScaleWrapper);

            $Nepalthinking$.$Css(elmt, "backgroundImage", "");

            //var noMoveElmts = {
            //    "navigator": _BulletNavigatorOptions && _BulletNavigatorOptions.$Scale == false,
            //    "arrowleft": _ArrowNavigatorOptions && _ArrowNavigatorOptions.$Scale == false,
            //    "arrowright": _ArrowNavigatorOptions && _ArrowNavigatorOptions.$Scale == false,
            //    "thumbnavigator": _ThumbnailNavigatorOptions && _ThumbnailNavigatorOptions.$Scale == false,
            //    "thumbwrapper": _ThumbnailNavigatorOptions && _ThumbnailNavigatorOptions.$Scale == false
            //};

            $Nepalthinking$.$Each(children, function (child) {
                $Nepalthinking$.$AppendChild($Nepalthinking$.$AttributeEx(child, "noscale") ? elmt : innerWrapper, child);
                //$Nepalthinking$.$AppendChild(noMoveElmts[$Nepalthinking$.$AttributeEx(child, "u")] ? elmt : innerWrapper, child);
            });
        }

        $NepalthinkingDebug$.$Execute(function () {
            if (!dimension || dimension < 0) {
                $NepalthinkingDebug$.$Fail("'$ScaleWidth' error, 'dimension' should be positive value.");
            }
        });

        $NepalthinkingDebug$.$Execute(function () {
            if (!_InitialScrollWidth) {
                _InitialScrollWidth = _SelfSlider.$Elmt.scrollWidth;
            }
        });

        _ScaleRatio = dimension / (isHeight ? $Nepalthinking$.$CssHeight : $Nepalthinking$.$CssWidth)(_ScaleWrapper);
        $Nepalthinking$.$CssScale(_ScaleWrapper, _ScaleRatio);

        var scaleWidth = isHeight ? (_ScaleRatio * OriginalWidth()) : dimension;
        var scaleHeight = isHeight ? dimension : (_ScaleRatio * OriginalHeight());

        $Nepalthinking$.$CssWidth(elmt, scaleWidth);
        $Nepalthinking$.$CssHeight(elmt, scaleHeight);

        $Nepalthinking$.$Each(_Navigators, function (navigator) {
            navigator.$Relocate(scaleWidth, scaleHeight);
        });
    }

    _SelfSlider.$ScaleHeight = _SelfSlider.$GetScaleHeight = function (height) {
        ///	<summary>
        ///		instance.$ScaleHeight();   //Retrieve scaled height the slider currently displays.
        ///		instance.$ScaleHeight( dimension );   //Scale the slider to new height and keep aspect ratio.
        ///	</summary>

        if (height == undefined)
            return $Nepalthinking$.$CssHeight(elmt);

        Scale(height, true);
    };

    _SelfSlider.$ScaleWidth = _SelfSlider.$SetScaleWidth = _SelfSlider.$GetScaleWidth = Scale;

    _SelfSlider.$GetVirtualIndex = function (index) {
        var parkingIndex = Math.ceil(GetRealIndex(_ParkingPosition / _StepLength));
        var displayIndex = GetRealIndex(index - _TempSlideIndex + parkingIndex);

        if (displayIndex > _DisplayPieces) {
            if (index - _TempSlideIndex > _SlideCount / 2)
                index -= _SlideCount;
            else if (index - _TempSlideIndex <= -_SlideCount / 2)
                index += _SlideCount;
        }
        else {
            index = _TempSlideIndex + displayIndex - parkingIndex;
        }

        return index;
    };

    //member functions

    $NepalthinkingObject$.call(_SelfSlider);

    $NepalthinkingDebug$.$Execute(function () {
        var outerContainerElmt = $Nepalthinking$.$GetElement(elmt);
        if (!outerContainerElmt)
            $NepalthinkingDebug$.$Fail("Outer container '" + elmt + "' not found.");
    });

    //initialize member variables
    _SelfSlider.$Elmt = elmt = $Nepalthinking$.$GetElement(elmt);
    //initialize member variables

    var _InitialScrollWidth;    //for debug only
    var _CaptionSliderCount = 1;    //for debug only

    var _Options = $Nepalthinking$.$Extend({
        $FillMode: 0,                   //[Optional] The way to fill image in slide, 0 stretch, 1 contain (keep aspect ratio and put all inside slide), 2 cover (keep aspect ratio and cover whole slide), 4 actual size, 5 contain for large image, actual size for small image, default value is 0
        $LazyLoading: 1,                //[Optional] For image with  lazy loading format (<IMG src2="url" .../>), by default it will be loaded only when the slide comes.
        //But an integer value (maybe 0, 1, 2 or 3) indicates that how far of nearby slides should be loaded immediately as well, default value is 1.
        $StartIndex: 0,                 //[Optional] Index of slide to display when initialize, default value is 0
        $AutoPlay: false,               //[Optional] Whether to auto play, default value is false
        $Loop: 1,                       //[Optional] Enable loop(circular) of carousel or not, 0: stop, 1: loop, 2 rewind, default value is 1
        $HWA: true,                     //[Optional] Enable hardware acceleration or not, default value is true
        $NaviQuitDrag: true,
        $AutoPlaySteps: 1,              //[Optional] Steps to go of every play (this options applys only when slideshow disabled), default value is 1
        $AutoPlayInterval: 3000,        //[Optional] Interval to play next slide since the previous stopped if a slideshow is auto playing, default value is 3000
        $PauseOnHover: 1,               //[Optional] Whether to pause when mouse over if a slider is auto playing, 0 no pause, 1 pause for desktop, 2 pause for touch device, 3 pause for desktop and touch device, 4 freeze for desktop, 8 freeze for touch device, 12 freeze for desktop and touch device, default value is 1

        $SlideDuration: 500,            //[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 400
        $SlideEasing: $NepalthinkingEasing$.$EaseOutQuad,   //[Optional] Specifies easing for right to left animation, default value is $NepalthinkingEasing$.$EaseOutQuad
        $MinDragOffsetToSlide: 20,      //[Optional] Minimum drag offset that trigger slide, default value is 20
        $SlideSpacing: 0, 				//[Optional] Space between each slide in pixels, default value is 0
        $DisplayPieces: 1,              //[Optional] Number of pieces to display (the slideshow would be disabled if the value is set to greater than 1), default value is 1
        $ParkingPosition: 0,            //[Optional] The offset position to park slide (this options applys only when slideshow disabled), default value is 0.
        $UISearchMode: 1,               //[Optional] The way (0 parellel, 1 recursive, default value is recursive) to search UI components (slides container, loading screen, navigator container, arrow navigator container, thumbnail navigator container etc.
        $PlayOrientation: 1,            //[Optional] Orientation to play slide (for auto play, navigation), 1 horizental, 2 vertical, 5 horizental reverse, 6 vertical reverse, default value is 1
        $DragOrientation: 1             //[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 both, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $DisplayPieces is greater than 1, or parking position is not 0)

    }, options);

    //going to use $Idle instead of $AutoPlayInterval
    if (_Options.$Idle != undefined)
        _Options.$AutoPlayInterval = _Options.$Idle;

    //going to use $Cols instead of $DisplayPieces
    if (_Options.$Cols != undefined)
        _Options.$DisplayPieces = _Options.$Cols;

    //Sodo statement for development time intellisence only
    $NepalthinkingDebug$.$Execute(function () {
        _Options = $Nepalthinking$.$Extend({
            $ArrowKeyNavigation: undefined,
            $SlideWidth: undefined,
            $SlideHeight: undefined,
            $SlideshowOptions: undefined,
            $CaptionSliderOptions: undefined,
            $BulletNavigatorOptions: undefined,
            $ArrowNavigatorOptions: undefined,
            $ThumbnailNavigatorOptions: undefined
        },
        _Options);
    });

    var _PlayOrientation = _Options.$PlayOrientation & 3;
    var _PlayReverse = (_Options.$PlayOrientation & 4) / -4 || 1;

    var _SlideshowOptions = _Options.$SlideshowOptions;
    var _CaptionSliderOptions = $Nepalthinking$.$Extend({ $Class: $NepalthinkingCaptionSliderBase$, $PlayInMode: 1, $PlayOutMode: 1 }, _Options.$CaptionSliderOptions);
    //$Nepalthinking$.$TranslateTransitions(_CaptionSliderOptions.$CaptionTransitions); //for old transition compatibility
    var _BulletNavigatorOptions = _Options.$BulletNavigatorOptions;
    var _ArrowNavigatorOptions = _Options.$ArrowNavigatorOptions;
    var _ThumbnailNavigatorOptions = _Options.$ThumbnailNavigatorOptions;

    $NepalthinkingDebug$.$Execute(function () {
        if (_SlideshowOptions && !_SlideshowOptions.$Class) {
            $NepalthinkingDebug$.$Fail("Option $SlideshowOptions error, class not specified.");
        }
    });

    $NepalthinkingDebug$.$Execute(function () {
        if (_Options.$CaptionSliderOptions && !_Options.$CaptionSliderOptions.$Class) {
            $NepalthinkingDebug$.$Fail("Option $CaptionSliderOptions error, class not specified.");
        }
    });

    $NepalthinkingDebug$.$Execute(function () {
        if (_BulletNavigatorOptions && !_BulletNavigatorOptions.$Class) {
            $NepalthinkingDebug$.$Fail("Option $BulletNavigatorOptions error, class not specified.");
        }
    });

    $NepalthinkingDebug$.$Execute(function () {
        if (_ArrowNavigatorOptions && !_ArrowNavigatorOptions.$Class) {
            $NepalthinkingDebug$.$Fail("Option $ArrowNavigatorOptions error, class not specified.");
        }
    });

    $NepalthinkingDebug$.$Execute(function () {
        if (_ThumbnailNavigatorOptions && !_ThumbnailNavigatorOptions.$Class) {
            $NepalthinkingDebug$.$Fail("Option $ThumbnailNavigatorOptions error, class not specified.");
        }
    });

    var _UISearchNoDeep = !_Options.$UISearchMode;
    var _ScaleWrapper;
    var _SlidesContainer = $Nepalthinking$.$FindChild(elmt, "slides", _UISearchNoDeep);
    var _LoadingContainer = $Nepalthinking$.$FindChild(elmt, "loading", _UISearchNoDeep) || $Nepalthinking$.$CreateDiv(document);

    var _BulletNavigatorContainer = $Nepalthinking$.$FindChild(elmt, "navigator", _UISearchNoDeep);

    var _ArrowLeft = $Nepalthinking$.$FindChild(elmt, "arrowleft", _UISearchNoDeep);
    var _ArrowRight = $Nepalthinking$.$FindChild(elmt, "arrowright", _UISearchNoDeep);

    var _ThumbnailNavigatorContainer = $Nepalthinking$.$FindChild(elmt, "thumbnavigator", _UISearchNoDeep);

    $NepalthinkingDebug$.$Execute(function () {
        //if (_BulletNavigatorOptions && !_BulletNavigatorContainer) {
        //    throw new Error("$BulletNavigatorOptions specified but bullet navigator container (<div u=\"navigator\" ...) not defined.");
        //}
        if (_BulletNavigatorContainer && !_BulletNavigatorOptions) {
            throw new Error("Bullet navigator container defined but $BulletNavigatorOptions not specified.");
        }

        //if (_ArrowNavigatorOptions) {
        //    if (!_ArrowLeft) {
        //        throw new Error("$ArrowNavigatorOptions specified, but arrowleft (<span u=\"arrowleft\" ...) not defined.");
        //    }

        //    if (!_ArrowRight) {
        //        throw new Error("$ArrowNavigatorOptions specified, but arrowright (<span u=\"arrowright\" ...) not defined.");
        //    }
        //}

        if ((_ArrowLeft || _ArrowRight) && !_ArrowNavigatorOptions) {
            throw new Error("arrowleft or arrowright defined, but $ArrowNavigatorOptions not specified.");
        }

        //if (_ThumbnailNavigatorOptions && !_ThumbnailNavigatorContainer) {
        //    throw new Error("$ThumbnailNavigatorOptions specified, but thumbnail navigator container (<div u=\"thumbnavigator\" ...) not defined.");
        //}

        if (_ThumbnailNavigatorContainer && !_ThumbnailNavigatorOptions) {
            throw new Error("Thumbnail navigator container defined, but $ThumbnailNavigatorOptions not specified.");
        }
    });

    var _SlidesContainerWidth = $Nepalthinking$.$CssWidth(_SlidesContainer);
    var _SlidesContainerHeight = $Nepalthinking$.$CssHeight(_SlidesContainer);

    $NepalthinkingDebug$.$Execute(function () {
        if (isNaN(_SlidesContainerWidth))
            $NepalthinkingDebug$.$Fail("Width of slides container wrong specification, it should be specified in pixel (like style='width: 600px;').");

        if (_SlidesContainerWidth == undefined)
            $NepalthinkingDebug$.$Fail("Width of slides container not specified, it should be specified in pixel (like style='width: 600px;').");

        if (isNaN(_SlidesContainerHeight))
            $NepalthinkingDebug$.$Fail("Height of slides container wrong specification, it should be specified in pixel (like style='height: 300px;').");

        if (_SlidesContainerHeight == undefined)
            $NepalthinkingDebug$.$Fail("Height of slides container not specified, it should be specified in pixel (like style='height: 300px;').");

        var slidesContainerOverflow = $Nepalthinking$.$CssOverflow(_SlidesContainer);
        var slidesContainerOverflowX = $Nepalthinking$.$Css(_SlidesContainer, "overflowX");
        var slidesContainerOverflowY = $Nepalthinking$.$Css(_SlidesContainer, "overflowY");
        if (slidesContainerOverflow != "hidden" && (slidesContainerOverflowX != "hidden" || slidesContainerOverflowY != "hidden"))
            $NepalthinkingDebug$.$Fail("Overflow of slides container wrong specification, it should be specified as 'hidden' (style='overflow:hidden;').");
    });

    $NepalthinkingDebug$.$Execute(function () {
        if (!$Nepalthinking$.$IsNumeric(_Options.$DisplayPieces))
            $NepalthinkingDebug$.$Fail("Option $DisplayPieces error, it should be a numeric value and greater than or equal to 1.");

        if (_Options.$DisplayPieces < 1)
            $NepalthinkingDebug$.$Fail("Option $DisplayPieces error, it should be greater than or equal to 1.");

        if (_Options.$DisplayPieces > 1 && _Options.$DragOrientation && _Options.$DragOrientation != _PlayOrientation)
            $NepalthinkingDebug$.$Fail("Option $DragOrientation error, it should be 0 or the same of $PlayOrientation when $DisplayPieces is greater than 1.");

        if (!$Nepalthinking$.$IsNumeric(_Options.$ParkingPosition))
            $NepalthinkingDebug$.$Fail("Option $ParkingPosition error, it should be a numeric value.");

        if (_Options.$ParkingPosition && _Options.$DragOrientation && _Options.$DragOrientation != _PlayOrientation)
            $NepalthinkingDebug$.$Fail("Option $DragOrientation error, it should be 0 or the same of $PlayOrientation when $ParkingPosition is not equal to 0.");
    });

    var _StyleDef;

    var _SlideElmts = [];

    {
        var slideElmts = $Nepalthinking$.$Children(_SlidesContainer);
        $Nepalthinking$.$Each(slideElmts, function (slideElmt) {
            if (slideElmt.tagName == "DIV" && !$Nepalthinking$.$AttributeEx(slideElmt, "u")) {
                _SlideElmts.push(slideElmt);
            }
            else if ($Nepalthinking$.$IsBrowserIe9Earlier()) {
                $Nepalthinking$.$CssZIndex(slideElmt, ($Nepalthinking$.$CssZIndex(slideElmt) || 0) + 1);
            }
        });
    }

    $NepalthinkingDebug$.$Execute(function () {
        if (_SlideElmts.length < 1) {
            $NepalthinkingDebug$.$Error("Slides html code definition error, there must be at least 1 slide to initialize a slider.");
        }
    });

    var _SlideItemCreatedCount = 0; //for debug only
    var _SlideItemReleasedCount = 0;    //for debug only

    var _PreviousSlideIndex;
    var _CurrentSlideIndex = -1;
    var _TempSlideIndex;
    var _PrevSlideItem;
    var _CurrentSlideItem;
    var _SlideCount = _SlideElmts.length;

    var _SlideWidth = _Options.$SlideWidth || _SlidesContainerWidth;
    var _SlideHeight = _Options.$SlideHeight || _SlidesContainerHeight;

    var _SlideSpacing = _Options.$SlideSpacing;
    var _StepLengthX = _SlideWidth + _SlideSpacing;
    var _StepLengthY = _SlideHeight + _SlideSpacing;
    var _StepLength = (_PlayOrientation & 1) ? _StepLengthX : _StepLengthY;
    var _DisplayPieces = Math.min(_Options.$DisplayPieces, _SlideCount);

    var _SlideshowPanel;
    var _CurrentBoardIndex = 0;
    var _DragOrientation;
    var _DragOrientationRegistered;
    var _DragInvalid;

    var _Navigators = [];
    var _BulletNavigator;
    var _ArrowNavigator;
    var _ThumbnailNavigator;

    var _ShowLink;

    var _Frozen;
    var _AutoPlay;
    var _AutoPlaySteps = _Options.$AutoPlaySteps;
    var _HoverToPause = _Options.$PauseOnHover;
    var _AutoPlayInterval = _Options.$AutoPlayInterval;
    var _SlideDuration = _Options.$SlideDuration;

    var _SlideshowRunnerClass;
    var _TransitionsOrder;

    var _SlideshowEnabled;
    var _ParkingPosition;
    var _CarouselEnabled = _DisplayPieces < _SlideCount;
    var _Loop = _CarouselEnabled ? _Options.$Loop : 0;

    var _DragEnabled;
    var _LastDragSucceded;

    var _NotOnHover = 1;   //0 Hovering, 1 Not hovering

    //Variable Definition
    var _IsSliding;
    var _IsDragging;
    var _LoadingTicket;

    //The X position of mouse/touch when a drag start
    var _DragStartMouseX = 0;
    //The Y position of mouse/touch when a drag start
    var _DragStartMouseY = 0;
    var _DragOffsetTotal;
    var _DragOffsetLastTime;
    var _DragIndexAdjust;

    var _Carousel;
    var _Conveyor;
    var _Slideshow;
    var _CarouselPlayer;
    var _SlideContainer = new SlideContainer();
    var _ScaleRatio;

    //$NepalthinkingSlider$ Constructor
    {
        _AutoPlay = _Options.$AutoPlay;
        _SelfSlider.$Options = options;

        AdjustSlidesContainerSize();

        $Nepalthinking$.$Attribute(elmt, "Nepalthinking-slider", true);

        $Nepalthinking$.$CssZIndex(_SlidesContainer, $Nepalthinking$.$CssZIndex(_SlidesContainer) || 0);
        $Nepalthinking$.$CssPosition(_SlidesContainer, "absolute");
        _SlideshowPanel = $Nepalthinking$.$CloneNode(_SlidesContainer, true);
        $Nepalthinking$.$InsertBefore(_SlideshowPanel, _SlidesContainer);

        if (_SlideshowOptions) {
            _ShowLink = _SlideshowOptions.$ShowLink;
            _SlideshowRunnerClass = _SlideshowOptions.$Class;

            $NepalthinkingDebug$.$Execute(function () {
                if (!_SlideshowOptions.$Transitions || !_SlideshowOptions.$Transitions.length) {
                    $NepalthinkingDebug$.$Error("Invalid '$SlideshowOptions', no '$Transitions' specified.");
                }
            });

            _SlideshowEnabled = _DisplayPieces == 1 && _SlideCount > 1 && _SlideshowRunnerClass && (!$Nepalthinking$.$IsBrowserIE() || $Nepalthinking$.$BrowserVersion() >= 8);
        }

        _ParkingPosition = (_SlideshowEnabled || _DisplayPieces >= _SlideCount || !(_Loop & 1)) ? 0 : _Options.$ParkingPosition;

        _DragEnabled = ((_DisplayPieces > 1 || _ParkingPosition) ? _PlayOrientation : -1) & _Options.$DragOrientation;

        //SlideBoard
        var _SlideboardElmt = _SlidesContainer;
        var _SlideItems = [];

        var _SlideshowRunner;
        var _LinkContainer;

        var _Device = $Nepalthinking$.$Device();
        var _IsTouchDevice = _Device.$Touchable;

        var _LastTimeMoveByDrag;
        var _Position_OnFreeze;
        var _CarouselPlaying_OnFreeze;
        var _PlayToPosition_OnFreeze;
        var _PositionToGoByDrag;

        //SlideBoard Constructor
        {
            if (_Device.$TouchActionAttr) {
                $Nepalthinking$.$Css(_SlideboardElmt, _Device.$TouchActionAttr, [null, "pan-y", "pan-x", "none"][_DragEnabled] || "");
            }

            _Slideshow = new Slideshow();

            if (_SlideshowEnabled)
                _SlideshowRunner = new _SlideshowRunnerClass(_SlideContainer, _SlideWidth, _SlideHeight, _SlideshowOptions, _IsTouchDevice);

            $Nepalthinking$.$AppendChild(_SlideshowPanel, _Slideshow.$Wrapper);
            $Nepalthinking$.$CssOverflow(_SlidesContainer, "hidden");

            //link container
            {
                _LinkContainer = CreatePanel();
                $Nepalthinking$.$Css(_LinkContainer, "backgroundColor", "#000");
                $Nepalthinking$.$CssOpacity(_LinkContainer, 0);
                $Nepalthinking$.$InsertBefore(_LinkContainer, _SlideboardElmt.firstChild, _SlideboardElmt);
            }

            for (var i = 0; i < _SlideElmts.length; i++) {
                var slideElmt = _SlideElmts[i];
                var slideItem = new SlideItem(slideElmt, i);
                _SlideItems.push(slideItem);
            }

            $Nepalthinking$.$HideElement(_LoadingContainer);

            $NepalthinkingDebug$.$Execute(function () {
                $Nepalthinking$.$Attribute(_LoadingContainer, "debug-id", "loading-container");
            });

            _Carousel = new Carousel();
            _CarouselPlayer = new CarouselPlayer(_Carousel, _Slideshow);

            $NepalthinkingDebug$.$Execute(function () {
                $Nepalthinking$.$Attribute(_SlideboardElmt, "debug-id", "slide-board");
            });

            if (_DragEnabled) {
                $Nepalthinking$.$AddEvent(_SlidesContainer, "mousedown", OnDragStart);
                $Nepalthinking$.$AddEvent(_SlidesContainer, "touchstart", OnTouchStart);
                $Nepalthinking$.$AddEvent(_SlidesContainer, "dragstart", PreventDragSelectionEvent);
                $Nepalthinking$.$AddEvent(_SlidesContainer, "selectstart", PreventDragSelectionEvent);
                $Nepalthinking$.$AddEvent(document, "mouseup", OnDragEnd);
                $Nepalthinking$.$AddEvent(document, "touchend", OnDragEnd);
                $Nepalthinking$.$AddEvent(document, "touchcancel", OnDragEnd);
                $Nepalthinking$.$AddEvent(window, "blur", OnDragEnd);
            }
        }
        //SlideBoard

        _HoverToPause &= (_IsTouchDevice ? 10 : 5);

        //Bullet Navigator
        if (_BulletNavigatorContainer && _BulletNavigatorOptions) {
            _BulletNavigator = new _BulletNavigatorOptions.$Class(_BulletNavigatorContainer, _BulletNavigatorOptions, OriginalWidth(), OriginalHeight());
            _Navigators.push(_BulletNavigator);
        }

        //Arrow Navigator
        if (_ArrowNavigatorOptions && _ArrowLeft && _ArrowRight) {
            _ArrowNavigatorOptions.$Loop = _Loop;
            _ArrowNavigatorOptions.$DisplayPieces = _DisplayPieces;
            _ArrowNavigator = new _ArrowNavigatorOptions.$Class(_ArrowLeft, _ArrowRight, _ArrowNavigatorOptions, OriginalWidth(), OriginalHeight());
            _Navigators.push(_ArrowNavigator);
        }

        //Thumbnail Navigator
        if (_ThumbnailNavigatorContainer && _ThumbnailNavigatorOptions) {
            _ThumbnailNavigatorOptions.$StartIndex = _Options.$StartIndex;
            _ThumbnailNavigator = new _ThumbnailNavigatorOptions.$Class(_ThumbnailNavigatorContainer, _ThumbnailNavigatorOptions);
            _Navigators.push(_ThumbnailNavigator);
        }

        $Nepalthinking$.$Each(_Navigators, function (navigator) {
            navigator.$Reset(_SlideCount, _SlideItems, _LoadingContainer);
            navigator.$On($NepalthinkingNavigatorEvents$.$NAVIGATIONREQUEST, NavigationClickHandler);
        });

        Scale(OriginalWidth());

        $Nepalthinking$.$AddEvent(_SlidesContainer, "click", SlidesClickEventHandler);
        $Nepalthinking$.$AddEvent(elmt, "mouseout", $Nepalthinking$.$MouseOverOutFilter(MainContainerMouseLeaveEventHandler, elmt));
        $Nepalthinking$.$AddEvent(elmt, "mouseover", $Nepalthinking$.$MouseOverOutFilter(MainContainerMouseEnterEventHandler, elmt));

        ShowNavigators();

        //Keyboard Navigation
        if (_Options.$ArrowKeyNavigation) {
            $Nepalthinking$.$AddEvent(document, "keydown", function (e) {
                if (e.keyCode == 37/*$NepalthinkingKeyCode$.$LEFT*/) {
                    //Arrow Left
                    PlayToOffset(-1);
                }
                else if (e.keyCode == 39/*$NepalthinkingKeyCode$.$RIGHT*/) {
                    //Arrow Right
                    PlayToOffset(1);
                }
            });
        }

        var startPosition = _Options.$StartIndex;
        if (!(_Loop & 1)) {
            startPosition = Math.max(0, Math.min(startPosition, _SlideCount - _DisplayPieces));
        }
        _CarouselPlayer.$PlayCarousel(startPosition, startPosition, 0);
    }
};
var $NepalthinkingSlideo$ = window.$NepalthinkingSlideo$ = $NepalthinkingSlider$;

$NepalthinkingSlider$.$EVT_CLICK = 21;
$NepalthinkingSlider$.$EVT_DRAG_START = 22;
$NepalthinkingSlider$.$EVT_DRAG_END = 23;
$NepalthinkingSlider$.$EVT_SWIPE_START = 24;
$NepalthinkingSlider$.$EVT_SWIPE_END = 25;

$NepalthinkingSlider$.$EVT_LOAD_START = 26;
$NepalthinkingSlider$.$EVT_LOAD_END = 27;
$NepalthinkingSlider$.$EVT_FREEZE = 28;

$NepalthinkingSlider$.$EVT_POSITION_CHANGE = 202;
$NepalthinkingSlider$.$EVT_PARK = 203;

$NepalthinkingSlider$.$EVT_SLIDESHOW_START = 206;
$NepalthinkingSlider$.$EVT_SLIDESHOW_END = 207;

$NepalthinkingSlider$.$EVT_PROGRESS_CHANGE = 208;
$NepalthinkingSlider$.$EVT_STATE_CHANGE = 209;
$NepalthinkingSlider$.$EVT_ROLLBACK_START = 210;
$NepalthinkingSlider$.$EVT_ROLLBACK_END = 211;

//(function ($) {
//    jQuery.fn.NepalthinkingSlider = function (options) {
//        return this.each(function () {
//            return $(this).data('NepalthinkingSlider') || $(this).data('NepalthinkingSlider', new $NepalthinkingSlider$(this, options));
//        });
//    };
//})(jQuery);

//window.jQuery && (jQuery.fn.NepalthinkingSlider = function (options) {
//    return this.each(function () {
//        return jQuery(this).data('NepalthinkingSlider') || jQuery(this).data('NepalthinkingSlider', new $NepalthinkingSlider$(this, options));
//    });
//});

//$NepalthinkingBulletNavigator$
var $NepalthinkingNavigatorEvents$ = {
    $NAVIGATIONREQUEST: 1,
    $INDEXCHANGE: 2,
    $RESET: 3
};

var $NepalthinkingBulletNavigator$ = window.$NepalthinkingBulletNavigator$ = function (elmt, options, containerWidth, containerHeight) {
    var self = this;
    $NepalthinkingObject$.call(self);

    elmt = $Nepalthinking$.$GetElement(elmt);

    var _Count;
    var _Length;
    var _Width;
    var _Height;
    var _CurrentIndex;
    var _CurrentInnerIndex = 0;
    var _Options;
    var _Steps;
    var _Lanes;
    var _SpacingX;
    var _SpacingY;
    var _Orientation;
    var _ItemPrototype;
    var _PrototypeWidth;
    var _PrototypeHeight;

    var _ButtonElements = [];
    var _Buttons = [];

    function Highlight(index) {
        if (index != -1)
            _Buttons[index].$Selected(index == _CurrentInnerIndex);
    }

    function OnNavigationRequest(index) {
        self.$TriggerEvent($NepalthinkingNavigatorEvents$.$NAVIGATIONREQUEST, index * _Steps);
    }

    self.$Elmt = elmt;
    self.$GetCurrentIndex = function () {
        return _CurrentIndex;
    };

    self.$SetCurrentIndex = function (index) {
        if (index != _CurrentIndex) {
            var lastInnerIndex = _CurrentInnerIndex;
            var innerIndex = Math.floor(index / _Steps);
            _CurrentInnerIndex = innerIndex;
            _CurrentIndex = index;

            Highlight(lastInnerIndex);
            Highlight(innerIndex);

            //self.$TriggerEvent($NepalthinkingNavigatorEvents$.$INDEXCHANGE, index);
        }
    };

    self.$Show = function (hide) {
        $Nepalthinking$.$ShowElement(elmt, hide);
    };

    var _Located;
    self.$Relocate = function (containerWidth, containerHeight) {
        if (!_Located || _Options.$Scale == false) {
            var containerWidth = $Nepalthinking$.$ParentNode(elmt).clientWidth;
            var containerHeight = $Nepalthinking$.$ParentNode(elmt).clientHeight;

            if (_Options.$AutoCenter & 1) {
                $Nepalthinking$.$CssLeft(elmt, (containerWidth - _Width) / 2);
            }
            if (_Options.$AutoCenter & 2) {
                $Nepalthinking$.$CssTop(elmt, (containerHeight - _Height) / 2);
            }

            _Located = true;
        }
    };

    var _Initialized;
    self.$Reset = function (length) {
        if (!_Initialized) {
            _Length = length;
            _Count = Math.ceil(length / _Steps);
            _CurrentInnerIndex = 0;

            var itemOffsetX = _PrototypeWidth + _SpacingX;
            var itemOffsetY = _PrototypeHeight + _SpacingY;

            var maxIndex = Math.ceil(_Count / _Lanes) - 1;

            _Width = _PrototypeWidth + itemOffsetX * (!_Orientation ? maxIndex : _Lanes - 1);
            _Height = _PrototypeHeight + itemOffsetY * (_Orientation ? maxIndex : _Lanes - 1);

            $Nepalthinking$.$CssWidth(elmt, _Width);
            $Nepalthinking$.$CssHeight(elmt, _Height);

            for (var buttonIndex = 0; buttonIndex < _Count; buttonIndex++) {

                var numberDiv = $Nepalthinking$.$CreateSpan();
                $Nepalthinking$.$InnerText(numberDiv, buttonIndex + 1);

                var div = $Nepalthinking$.$BuildElement(_ItemPrototype, "numbertemplate", numberDiv, true);
                $Nepalthinking$.$CssPosition(div, "absolute");

                var columnIndex = buttonIndex % (maxIndex + 1);
                $Nepalthinking$.$CssLeft(div, !_Orientation ? itemOffsetX * columnIndex : buttonIndex % _Lanes * itemOffsetX);
                $Nepalthinking$.$CssTop(div, _Orientation ? itemOffsetY * columnIndex : Math.floor(buttonIndex / (maxIndex + 1)) * itemOffsetY);

                $Nepalthinking$.$AppendChild(elmt, div);
                _ButtonElements[buttonIndex] = div;

                if (_Options.$ActionMode & 1)
                    $Nepalthinking$.$AddEvent(div, "click", $Nepalthinking$.$CreateCallback(null, OnNavigationRequest, buttonIndex));

                if (_Options.$ActionMode & 2)
                    $Nepalthinking$.$AddEvent(div, "mouseover", $Nepalthinking$.$MouseOverOutFilter($Nepalthinking$.$CreateCallback(null, OnNavigationRequest, buttonIndex), div));

                _Buttons[buttonIndex] = $Nepalthinking$.$Buttonize(div);
            }

            //self.$TriggerEvent($NepalthinkingNavigatorEvents$.$RESET);
            _Initialized = true;
        }
    };

    //NepalthinkingBulletNavigator Constructor
    {
        self.$Options = _Options = $Nepalthinking$.$Extend({
            $SpacingX: 0,
            $SpacingY: 0,
            $Orientation: 1,
            $ActionMode: 1
        }, options);

        //Sodo statement for development time intellisence only
        $NepalthinkingDebug$.$Execute(function () {
            _Options = $Nepalthinking$.$Extend({
                $Steps: undefined,
                $Lanes: undefined
            }, _Options);
        });

        _ItemPrototype = $Nepalthinking$.$FindChild(elmt, "prototype");

        $NepalthinkingDebug$.$Execute(function () {
            if (!_ItemPrototype)
                $NepalthinkingDebug$.$Fail("Navigator item prototype not defined.");

            if (isNaN($Nepalthinking$.$CssWidth(_ItemPrototype))) {
                $NepalthinkingDebug$.$Fail("Width of 'navigator item prototype' not specified.");
            }

            if (isNaN($Nepalthinking$.$CssHeight(_ItemPrototype))) {
                $NepalthinkingDebug$.$Fail("Height of 'navigator item prototype' not specified.");
            }
        });

        _PrototypeWidth = $Nepalthinking$.$CssWidth(_ItemPrototype);
        _PrototypeHeight = $Nepalthinking$.$CssHeight(_ItemPrototype);

        $Nepalthinking$.$RemoveElement(_ItemPrototype, elmt);

        _Steps = _Options.$Steps || 1;
        _Lanes = _Options.$Lanes || 1;
        _SpacingX = _Options.$SpacingX;
        _SpacingY = _Options.$SpacingY;
        _Orientation = _Options.$Orientation - 1;

        if (_Options.$Scale == false) {
            $Nepalthinking$.$Attribute(elmt, "noscale", true);
        }
    }
};

var $NepalthinkingArrowNavigator$ = window.$NepalthinkingArrowNavigator$ = function (arrowLeft, arrowRight, options, containerWidth, containerHeight) {
    var self = this;
    $NepalthinkingObject$.call(self);

    $NepalthinkingDebug$.$Execute(function () {

        if (!arrowLeft)
            $NepalthinkingDebug$.$Fail("Option '$ArrowNavigatorOptions' spepcified, but UI 'arrowleft' not defined. Define 'arrowleft' to enable direct navigation, or remove option '$ArrowNavigatorOptions' to disable direct navigation.");

        if (!arrowRight)
            $NepalthinkingDebug$.$Fail("Option '$ArrowNavigatorOptions' spepcified, but UI 'arrowright' not defined. Define 'arrowright' to enable direct navigation, or remove option '$ArrowNavigatorOptions' to disable direct navigation.");

        if (isNaN($Nepalthinking$.$CssWidth(arrowLeft))) {
            $NepalthinkingDebug$.$Fail("Width of 'arrow left' not specified.");
        }

        if (isNaN($Nepalthinking$.$CssWidth(arrowRight))) {
            $NepalthinkingDebug$.$Fail("Width of 'arrow right' not specified.");
        }

        if (isNaN($Nepalthinking$.$CssHeight(arrowLeft))) {
            $NepalthinkingDebug$.$Fail("Height of 'arrow left' not specified.");
        }

        if (isNaN($Nepalthinking$.$CssHeight(arrowRight))) {
            $NepalthinkingDebug$.$Fail("Height of 'arrow right' not specified.");
        }
    });

    var _Hide;
    var _Length;
    var _CurrentIndex;
    var _Options;
    var _Steps;
    var _ArrowWidth = $Nepalthinking$.$CssWidth(arrowLeft);
    var _ArrowHeight = $Nepalthinking$.$CssHeight(arrowLeft);

    function OnNavigationRequest(steps) {
        self.$TriggerEvent($NepalthinkingNavigatorEvents$.$NAVIGATIONREQUEST, steps, true);
    }

    function ShowArrows(hide) {
        $Nepalthinking$.$ShowElement(arrowLeft, hide || !options.$Loop && _CurrentIndex == 0);
        $Nepalthinking$.$ShowElement(arrowRight, hide || !options.$Loop && _CurrentIndex >= _Length - options.$DisplayPieces);

        _Hide = hide;
    }

    self.$GetCurrentIndex = function () {
        return _CurrentIndex;
    };

    self.$SetCurrentIndex = function (index, virtualIndex, temp) {
        if (temp) {
            _CurrentIndex = virtualIndex;
        }
        else {
            _CurrentIndex = index;

            ShowArrows(_Hide);
        }
        //self.$TriggerEvent($NepalthinkingNavigatorEvents$.$INDEXCHANGE, index);
    };

    self.$Show = ShowArrows;

    var _Located;
    self.$Relocate = function (conainerWidth, containerHeight) {
        if (!_Located || _Options.$Scale == false) {

            var containerWidth = $Nepalthinking$.$ParentNode(arrowLeft).clientWidth;
            var containerHeight = $Nepalthinking$.$ParentNode(arrowLeft).clientHeight;

            if (_Options.$AutoCenter & 1) {
                $Nepalthinking$.$CssLeft(arrowLeft, (containerWidth - _ArrowWidth) / 2);
                $Nepalthinking$.$CssLeft(arrowRight, (containerWidth - _ArrowWidth) / 2);
            }

            if (_Options.$AutoCenter & 2) {
                $Nepalthinking$.$CssTop(arrowLeft, (containerHeight - _ArrowHeight) / 2);
                $Nepalthinking$.$CssTop(arrowRight, (containerHeight - _ArrowHeight) / 2);
            }

            _Located = true;
        }
    };

    var _Initialized;
    self.$Reset = function (length) {
        _Length = length;
        _CurrentIndex = 0;

        if (!_Initialized) {

            $Nepalthinking$.$AddEvent(arrowLeft, "click", $Nepalthinking$.$CreateCallback(null, OnNavigationRequest, -_Steps));
            $Nepalthinking$.$AddEvent(arrowRight, "click", $Nepalthinking$.$CreateCallback(null, OnNavigationRequest, _Steps));

            $Nepalthinking$.$Buttonize(arrowLeft);
            $Nepalthinking$.$Buttonize(arrowRight);

            _Initialized = true;
        }

        //self.$TriggerEvent($NepalthinkingNavigatorEvents$.$RESET);
    };

    //NepalthinkingArrowNavigator Constructor
    {
        self.$Options = _Options = $Nepalthinking$.$Extend({
            $Steps: 1
        }, options);

        _Steps = _Options.$Steps;

        if (_Options.$Scale == false) {
            $Nepalthinking$.$Attribute(arrowLeft, "noscale", true);
            $Nepalthinking$.$Attribute(arrowRight, "noscale", true);
        }
    }
};

//$NepalthinkingThumbnailNavigator$
var $NepalthinkingThumbnailNavigator$ = window.$NepalthinkingThumbnailNavigator$ = function (elmt, options) {
    var _Self = this;
    var _Length;
    var _Count;
    var _CurrentIndex;
    var _Options;
    var _NavigationItems = [];

    var _Width;
    var _Height;
    var _Lanes;
    var _SpacingX;
    var _SpacingY;
    var _PrototypeWidth;
    var _PrototypeHeight;
    var _DisplayPieces;

    var _Slider;
    var _CurrentMouseOverIndex = -1;

    var _SlidesContainer;
    var _ThumbnailPrototype;

    $NepalthinkingObject$.call(_Self);
    elmt = $Nepalthinking$.$GetElement(elmt);

    function NavigationItem(item, index) {
        var self = this;
        var _Wrapper;
        var _Button;
        var _Thumbnail;

        function Highlight(mouseStatus) {
            _Button.$Selected(_CurrentIndex == index);
        }

        function OnNavigationRequest(byMouseOver, event) {
            if (byMouseOver || !_Slider.$LastDragSucceded()) {
                //var tail = _Lanes - index % _Lanes;
                //var slideVirtualIndex = _Slider.$GetVirtualIndex((index + tail) / _Lanes - 1);
                //var itemVirtualIndex = slideVirtualIndex * _Lanes + _Lanes - tail;
                //_Self.$TriggerEvent($NepalthinkingNavigatorEvents$.$NAVIGATIONREQUEST, itemVirtualIndex);

                _Self.$TriggerEvent($NepalthinkingNavigatorEvents$.$NAVIGATIONREQUEST, index);
            }

            //$NepalthinkingDebug$.$Log("navigation request");
        }

        $NepalthinkingDebug$.$Execute(function () {
            self.$Wrapper = undefined;
        });

        self.$Index = index;

        self.$Highlight = Highlight;

        //NavigationItem Constructor
        {
            _Thumbnail = item.$Thumb || item.$Image || $Nepalthinking$.$CreateDiv();
            self.$Wrapper = _Wrapper = $Nepalthinking$.$BuildElement(_ThumbnailPrototype, "thumbnailtemplate", _Thumbnail, true);

            _Button = $Nepalthinking$.$Buttonize(_Wrapper);
            if (_Options.$ActionMode & 1)
                $Nepalthinking$.$AddEvent(_Wrapper, "click", $Nepalthinking$.$CreateCallback(null, OnNavigationRequest, 0));
            if (_Options.$ActionMode & 2)
                $Nepalthinking$.$AddEvent(_Wrapper, "mouseover", $Nepalthinking$.$MouseOverOutFilter($Nepalthinking$.$CreateCallback(null, OnNavigationRequest, 1), _Wrapper));
        }
    }

    _Self.$GetCurrentIndex = function () {
        return _CurrentIndex;
    };

    _Self.$SetCurrentIndex = function (index, virtualIndex, temp) {
        var oldIndex = _CurrentIndex;
        _CurrentIndex = index;
        if (oldIndex != -1)
            _NavigationItems[oldIndex].$Highlight();
        _NavigationItems[index].$Highlight();

        if (!temp) {
            _Slider.$PlayTo(_Slider.$GetVirtualIndex(Math.floor(virtualIndex / _Lanes)));
        }
    };

    _Self.$Show = function (hide) {
        $Nepalthinking$.$ShowElement(elmt, hide);
    };

    _Self.$Relocate = $Nepalthinking$.$EmptyFunction;

    var _Initialized;
    _Self.$Reset = function (length, items, loadingContainer) {
        if (!_Initialized) {
            _Length = length;
            _Count = Math.ceil(_Length / _Lanes);
            _CurrentIndex = -1;
            _DisplayPieces = Math.min(_DisplayPieces, items.length);

            var horizontal = _Options.$Orientation & 1;

            var slideWidth = _PrototypeWidth + (_PrototypeWidth + _SpacingX) * (_Lanes - 1) * (1 - horizontal);
            var slideHeight = _PrototypeHeight + (_PrototypeHeight + _SpacingY) * (_Lanes - 1) * horizontal;

            var slidesContainerWidth = slideWidth + (slideWidth + _SpacingX) * (_DisplayPieces - 1) * horizontal;
            var slidesContainerHeight = slideHeight + (slideHeight + _SpacingY) * (_DisplayPieces - 1) * (1 - horizontal);

            $Nepalthinking$.$CssPosition(_SlidesContainer, "absolute");
            $Nepalthinking$.$CssOverflow(_SlidesContainer, "hidden");
            if (_Options.$AutoCenter & 1) {
                $Nepalthinking$.$CssLeft(_SlidesContainer, (_Width - slidesContainerWidth) / 2);
            }
            if (_Options.$AutoCenter & 2) {
                $Nepalthinking$.$CssTop(_SlidesContainer, (_Height - slidesContainerHeight) / 2);
            }
            //$NepalthinkingDebug$.$Execute(function () {
            //    if (!_Options.$AutoCenter) {
            //        var slidesContainerTop = $Nepalthinking$.$CssTop(_SlidesContainer);
            //        var slidesContainerLeft = $Nepalthinking$.$CssLeft(_SlidesContainer);

            //        if (isNaN(slidesContainerTop)) {
            //            $NepalthinkingDebug$.$Fail("Position 'top' wrong specification of thumbnail navigator slides container (<div u=\"thumbnavigator\">...<div u=\"slides\">), \r\nwhen option $ThumbnailNavigatorOptions.$AutoCenter set to 0, it should be specified in pixel (like <div u=\"slides\" style=\"top: 0px;\">)");
            //        }

            //        if (isNaN(slidesContainerLeft)) {
            //            $NepalthinkingDebug$.$Fail("Position 'left' wrong specification of thumbnail navigator slides container (<div u=\"thumbnavigator\">...<div u=\"slides\">), \r\nwhen option $ThumbnailNavigatorOptions.$AutoCenter set to 0, it should be specified in pixel (like <div u=\"slides\" style=\"left: 0px;\">)");
            //        }
            //    }
            //});
            $Nepalthinking$.$CssWidth(_SlidesContainer, slidesContainerWidth);
            $Nepalthinking$.$CssHeight(_SlidesContainer, slidesContainerHeight);

            var slideItemElmts = [];
            $Nepalthinking$.$Each(items, function (item, index) {
                var navigationItem = new NavigationItem(item, index);
                var navigationItemWrapper = navigationItem.$Wrapper;

                var columnIndex = Math.floor(index / _Lanes);
                var laneIndex = index % _Lanes;

                $Nepalthinking$.$CssLeft(navigationItemWrapper, (_PrototypeWidth + _SpacingX) * laneIndex * (1 - horizontal));
                $Nepalthinking$.$CssTop(navigationItemWrapper, (_PrototypeHeight + _SpacingY) * laneIndex * horizontal);

                if (!slideItemElmts[columnIndex]) {
                    slideItemElmts[columnIndex] = $Nepalthinking$.$CreateDiv();
                    $Nepalthinking$.$AppendChild(_SlidesContainer, slideItemElmts[columnIndex]);
                }

                $Nepalthinking$.$AppendChild(slideItemElmts[columnIndex], navigationItemWrapper);

                _NavigationItems.push(navigationItem);
            });

            var thumbnailSliderOptions = $Nepalthinking$.$Extend({
                $HWA: false,
                $AutoPlay: false,
                $NaviQuitDrag: false,
                $SlideWidth: slideWidth,
                $SlideHeight: slideHeight,
                $SlideSpacing: _SpacingX * horizontal + _SpacingY * (1 - horizontal),
                $MinDragOffsetToSlide: 12,
                $SlideDuration: 200,
                $PauseOnHover: 1,
                $PlayOrientation: _Options.$Orientation,
                $DragOrientation: _Options.$DisableDrag ? 0 : _Options.$Orientation
            }, _Options);

            _Slider = new $NepalthinkingSlider$(elmt, thumbnailSliderOptions);

            _Initialized = true;
        }

        //_Self.$TriggerEvent($NepalthinkingNavigatorEvents$.$RESET);
    };

    //NepalthinkingThumbnailNavigator Constructor
    {
        _Self.$Options = _Options = $Nepalthinking$.$Extend({
            $SpacingX: 3,
            $SpacingY: 3,
            $DisplayPieces: 1,
            $Orientation: 1,
            $AutoCenter: 3,
            $ActionMode: 1
        }, options);

        //going to use $Rows instead of $Lanes
        if (_Options.$Rows != undefined)
            _Options.$Lanes = _Options.$Rows;

        //Sodo statement for development time intellisence only
        $NepalthinkingDebug$.$Execute(function () {
            _Options = $Nepalthinking$.$Extend({
                $Lanes: undefined,
                $Width: undefined,
                $Height: undefined
            }, _Options);
        });

        _Width = $Nepalthinking$.$CssWidth(elmt);
        _Height = $Nepalthinking$.$CssHeight(elmt);

        $NepalthinkingDebug$.$Execute(function () {
            if (!_Width)
                $NepalthinkingDebug$.$Fail("width of 'thumbnavigator' container not specified.");
            if (!_Height)
                $NepalthinkingDebug$.$Fail("height of 'thumbnavigator' container not specified.");
        });

        _SlidesContainer = $Nepalthinking$.$FindChild(elmt, "slides", true);
        _ThumbnailPrototype = $Nepalthinking$.$FindChild(_SlidesContainer, "prototype");

        $NepalthinkingDebug$.$Execute(function () {
            if (!_ThumbnailPrototype)
                $NepalthinkingDebug$.$Fail("prototype of 'thumbnavigator' not defined.");
        });

        _PrototypeWidth = $Nepalthinking$.$CssWidth(_ThumbnailPrototype);
        _PrototypeHeight = $Nepalthinking$.$CssHeight(_ThumbnailPrototype);

        $Nepalthinking$.$RemoveElement(_ThumbnailPrototype, _SlidesContainer);

        _Lanes = _Options.$Lanes || 1;
        _SpacingX = _Options.$SpacingX;
        _SpacingY = _Options.$SpacingY;
        _DisplayPieces = _Options.$DisplayPieces;

        if (_Options.$Scale == false) {
            $Nepalthinking$.$Attribute(elmt, "noscale", true);
        }
    }
};

//$NepalthinkingCaptionSliderBase$
function $NepalthinkingCaptionSliderBase$() {
    $NepalthinkingAnimator$.call(this, 0, 0);
    this.$Revert = $Nepalthinking$.$EmptyFunction;
}

var $NepalthinkingCaptionSlider$ = window.$NepalthinkingCaptionSlider$ = function (container, captionSlideOptions, playIn) {
    $NepalthinkingDebug$.$Execute(function () {
        if (!captionSlideOptions.$CaptionTransitions) {
            $NepalthinkingDebug$.$Error("'$CaptionSliderOptions' option error, '$CaptionSliderOptions.$CaptionTransitions' not specified.");
        }
    });

    var _Self = this;
    var _ImmediateOutCaptionHanger;
    var _PlayMode = playIn ? captionSlideOptions.$PlayInMode : captionSlideOptions.$PlayOutMode;

    var _CaptionTransitions = captionSlideOptions.$CaptionTransitions;
    var _CaptionTuningFetcher = { $Transition: "t", $Delay: "d", $Duration: "du", x: "x", y: "y", $Rotate: "r", $Zoom: "z", $Opacity: "f", $BeginTime: "b" };
    var _CaptionTuningTransfer = {
        $Default: function (value, tuningValue) {
            if (!isNaN(tuningValue.$Value))
                value = tuningValue.$Value;
            else
                value *= tuningValue.$Percent;

            return value;
        },
        $Opacity: function (value, tuningValue) {
            return this.$Default(value - 1, tuningValue);
        }
    };
    _CaptionTuningTransfer.$Zoom = _CaptionTuningTransfer.$Opacity;

    $NepalthinkingAnimator$.call(_Self, 0, 0);

    function GetCaptionItems(element, level) {

        var itemsToPlay = [];
        var lastTransitionName;
        var namedTransitions = [];
        var namedTransitionOrders = [];

        function FetchRawTransition(captionElmt, index) {
            var rawTransition = {};

            $Nepalthinking$.$Each(_CaptionTuningFetcher, function (fetchAttribute, fetchProperty) {
                var attributeValue = $Nepalthinking$.$AttributeEx(captionElmt, fetchAttribute + (index || ""));
                if (attributeValue) {
                    var propertyValue = {};

                    if (fetchAttribute == "t") {
                        propertyValue.$Value = attributeValue;
                    }
                    else if (attributeValue.indexOf("%") + 1)
                        propertyValue.$Percent = $Nepalthinking$.$ParseFloat(attributeValue) / 100;
                    else
                        propertyValue.$Value = $Nepalthinking$.$ParseFloat(attributeValue);

                    rawTransition[fetchProperty] = propertyValue;
                }
            });

            return rawTransition;
        }

        function GetRandomTransition() {
            return _CaptionTransitions[Math.floor(Math.random() * _CaptionTransitions.length)];
        }

        function EvaluateCaptionTransition(transitionName) {

            var transition;

            if (transitionName == "*") {
                transition = GetRandomTransition();
            }
            else if (transitionName) {

                //indexed transition allowed, just the same as named transition
                var tempTransition = _CaptionTransitions[$Nepalthinking$.$ParseInt(transitionName)] || _CaptionTransitions[transitionName];

                if ($Nepalthinking$.$IsArray(tempTransition)) {
                    if (transitionName != lastTransitionName) {
                        lastTransitionName = transitionName;
                        namedTransitionOrders[transitionName] = 0;

                        namedTransitions[transitionName] = tempTransition[Math.floor(Math.random() * tempTransition.length)];
                    }
                    else {
                        namedTransitionOrders[transitionName]++;
                    }

                    tempTransition = namedTransitions[transitionName];

                    if ($Nepalthinking$.$IsArray(tempTransition)) {
                        tempTransition = tempTransition.length && tempTransition[namedTransitionOrders[transitionName] % tempTransition.length];

                        if ($Nepalthinking$.$IsArray(tempTransition)) {
                            //got transition from array level 3, random for all captions
                            tempTransition = tempTransition[Math.floor(Math.random() * tempTransition.length)];
                        }
                        //else {
                        //    //got transition from array level 2, in sequence for all adjacent captions with same name specified
                        //    transition = tempTransition;
                        //}
                    }
                    //else {
                    //    //got transition from array level 1, random but same for all adjacent captions with same name specified
                    //    transition = tempTransition;
                    //}
                }
                //else {
                //    //got transition directly from a simple transition object
                //    transition = tempTransition;
                //}

                transition = tempTransition;

                if ($Nepalthinking$.$IsString(transition))
                    transition = EvaluateCaptionTransition(transition);
            }

            return transition;
        }

        var captionElmts = $Nepalthinking$.$Children(element);
        $Nepalthinking$.$Each(captionElmts, function (captionElmt, i) {

            var transitionsWithTuning = [];
            transitionsWithTuning.$Elmt = captionElmt;
            var isCaption = $Nepalthinking$.$AttributeEx(captionElmt, "u") == "caption";

            $Nepalthinking$.$Each(playIn ? [0, 3] : [2], function (j, k) {

                if (isCaption) {
                    var transition;
                    var rawTransition;

                    if (j != 2 || !$Nepalthinking$.$AttributeEx(captionElmt, "t3")) {
                        rawTransition = FetchRawTransition(captionElmt, j);

                        if (j == 2 && !rawTransition.$Transition) {
                            rawTransition.$Delay = rawTransition.$Delay || { $Value: 0 };
                            rawTransition = $Nepalthinking$.$Extend(FetchRawTransition(captionElmt, 0), rawTransition);
                        }
                    }

                    if (rawTransition && rawTransition.$Transition) {

                        transition = EvaluateCaptionTransition(rawTransition.$Transition.$Value);

                        if (transition) {

                            //var transitionWithTuning = $Nepalthinking$.$Extend({ $Delay: 0, $ScaleHorizontal: 1, $ScaleVertical: 1 }, transition);
                            var transitionWithTuning = $Nepalthinking$.$Extend({ $Delay: 0 }, transition);

                            $Nepalthinking$.$Each(rawTransition, function (rawPropertyValue, propertyName) {
                                var tuningPropertyValue = (_CaptionTuningTransfer[propertyName] || _CaptionTuningTransfer.$Default).apply(_CaptionTuningTransfer, [transitionWithTuning[propertyName], rawTransition[propertyName]]);
                                if (!isNaN(tuningPropertyValue))
                                    transitionWithTuning[propertyName] = tuningPropertyValue;
                            });

                            if (!k) {
                                if (rawTransition.$BeginTime)
                                    transitionWithTuning.$BeginTime = rawTransition.$BeginTime.$Value || 0;
                                else if ((_PlayMode) & 2)
                                    transitionWithTuning.$BeginTime = 0;
                            }
                        }
                    }

                    transitionsWithTuning.push(transitionWithTuning);
                }

                if ((level % 2) && !k) {
                    transitionsWithTuning.$Children = GetCaptionItems(captionElmt, level + 1);
                }
            });

            itemsToPlay.push(transitionsWithTuning);
        });

        return itemsToPlay;
    }

    function CreateAnimator(item, transition, immediateOut) {

        var animatorOptions = {
            $Easing: transition.$Easing,
            $Round: transition.$Round,
            $During: transition.$During,
            $Reverse: playIn && !immediateOut
        };

        $NepalthinkingDebug$.$Execute(function () {
            animatorOptions.$CaptionAnimator = true;
        });

        var captionItem = item;
        var captionParent = $Nepalthinking$.$ParentNode(item);

        var captionItemWidth = $Nepalthinking$.$CssWidth(captionItem);
        var captionItemHeight = $Nepalthinking$.$CssHeight(captionItem);
        var captionParentWidth = $Nepalthinking$.$CssWidth(captionParent);
        var captionParentHeight = $Nepalthinking$.$CssHeight(captionParent);

        var fromStyles = {};
        var difStyles = {};
        var scaleClip = transition.$ScaleClip || 1;

        //Opacity
        if (transition.$Opacity) {
            difStyles.$Opacity = 1 - transition.$Opacity;
        }

        animatorOptions.$OriginalWidth = captionItemWidth;
        animatorOptions.$OriginalHeight = captionItemHeight;

        //Transform
        if (transition.$Zoom || transition.$Rotate) {
            difStyles.$Zoom = (transition.$Zoom || 2) - 2;

            if ($Nepalthinking$.$IsBrowserIe9Earlier() || $Nepalthinking$.$IsBrowserOpera()) {
                difStyles.$Zoom = Math.min(difStyles.$Zoom, 1);
            }

            fromStyles.$Zoom = 1;

            var rotate = transition.$Rotate || 0;

            difStyles.$Rotate = rotate * 360;
            fromStyles.$Rotate = 0;
        }
            //Clip
        else if (transition.$Clip) {
            var fromStyleClip = { $Top: 0, $Right: captionItemWidth, $Bottom: captionItemHeight, $Left: 0 };
            var toStyleClip = $Nepalthinking$.$Extend({}, fromStyleClip);

            var blockOffset = toStyleClip.$Offset = {};

            var topBenchmark = transition.$Clip & 4;
            var bottomBenchmark = transition.$Clip & 8;
            var leftBenchmark = transition.$Clip & 1;
            var rightBenchmark = transition.$Clip & 2;

            if (topBenchmark && bottomBenchmark) {
                blockOffset.$Top = captionItemHeight / 2 * scaleClip;
                blockOffset.$Bottom = -blockOffset.$Top;
            }
            else if (topBenchmark)
                blockOffset.$Bottom = -captionItemHeight * scaleClip;
            else if (bottomBenchmark)
                blockOffset.$Top = captionItemHeight * scaleClip;

            if (leftBenchmark && rightBenchmark) {
                blockOffset.$Left = captionItemWidth / 2 * scaleClip;
                blockOffset.$Right = -blockOffset.$Left;
            }
            else if (leftBenchmark)
                blockOffset.$Right = -captionItemWidth * scaleClip;
            else if (rightBenchmark)
                blockOffset.$Left = captionItemWidth * scaleClip;

            animatorOptions.$Move = transition.$Move;
            difStyles.$Clip = toStyleClip;
            fromStyles.$Clip = fromStyleClip;
        }

        //Fly
        {
            var toLeft = 0;
            var toTop = 0;

            if (transition.x)
                toLeft -= captionParentWidth * transition.x;

            if (transition.y)
                toTop -= captionParentHeight * transition.y;

            if (toLeft || toTop || animatorOptions.$Move) {
                difStyles.$Left = toLeft;
                difStyles.$Top = toTop;
            }
        }

        //duration
        var duration = transition.$Duration;

        fromStyles = $Nepalthinking$.$Extend(fromStyles, $Nepalthinking$.$GetStyles(captionItem, difStyles));

        animatorOptions.$Setter = $Nepalthinking$.$StyleSetterEx();

        return new $NepalthinkingAnimator$(transition.$Delay, duration, animatorOptions, captionItem, fromStyles, difStyles);
    }

    function CreateAnimators(streamLineLength, captionItems) {

        $Nepalthinking$.$Each(captionItems, function (captionItem, i) {

            $NepalthinkingDebug$.$Execute(function () {
                if (captionItem.length) {
                    var top = $Nepalthinking$.$CssTop(captionItem.$Elmt);
                    var left = $Nepalthinking$.$CssLeft(captionItem.$Elmt);
                    var width = $Nepalthinking$.$CssWidth(captionItem.$Elmt);
                    var height = $Nepalthinking$.$CssHeight(captionItem.$Elmt);

                    var error = null;

                    if (isNaN(top))
                        error = "Style 'top' for caption not specified. Please always specify caption like 'position: absolute; top: ...px; left: ...px; width: ...px; height: ...px;'.";
                    else if (isNaN(left))
                        error = "Style 'left' not specified. Please always specify caption like 'position: absolute; top: ...px; left: ...px; width: ...px; height: ...px;'.";
                    else if (isNaN(width))
                        error = "Style 'width' not specified. Please always specify caption like 'position: absolute; top: ...px; left: ...px; width: ...px; height: ...px;'.";
                    else if (isNaN(height))
                        error = "Style 'height' not specified. Please always specify caption like 'position: absolute; top: ...px; left: ...px; width: ...px; height: ...px;'.";

                    if (error)
                        $NepalthinkingDebug$.$Error("Caption " + (i + 1) + " definition error, \r\n" + error + "\r\n" + captionItem.$Elmt.outerHTML);
                }
            });

            var animator;
            var captionElmt = captionItem.$Elmt;
            var transition = captionItem[0];
            var transition3 = captionItem[1];

            if (transition) {

                animator = CreateAnimator(captionElmt, transition);
                streamLineLength = animator.$Locate(transition.$BeginTime == undefined ? streamLineLength : transition.$BeginTime, 1);
            }

            streamLineLength = CreateAnimators(streamLineLength, captionItem.$Children);

            if (transition3) {
                var animator3 = CreateAnimator(captionElmt, transition3, 1);
                animator3.$Locate(streamLineLength, 1);
                _Self.$Combine(animator3);
                _ImmediateOutCaptionHanger.$Combine(animator3);
            }

            if (animator)
                _Self.$Combine(animator);
        });

        return streamLineLength;
    }

    _Self.$Revert = function () {
        _Self.$GoToPosition(_Self.$GetPosition_OuterEnd() * (playIn || 0));
        _ImmediateOutCaptionHanger.$GoToPosition(0);
    };

    //Constructor
    {
        _ImmediateOutCaptionHanger = new $NepalthinkingAnimator$(0, 0);

        CreateAnimators(0, _PlayMode ? GetCaptionItems(container, 1) : []);
    }
};

var $NepalthinkingCaptionSlideo$ = function (container, captionSlideoOptions, playIn) {
    $NepalthinkingDebug$.$Execute(function () {
        if (!captionSlideoOptions.$CaptionTransitions) {
            $NepalthinkingDebug$.$Error("'$CaptionSlideoOptions' option error, '$CaptionSlideoOptions.$CaptionTransitions' not specified.");
        }
        else if (!$Nepalthinking$.$IsArray(captionSlideoOptions.$CaptionTransitions)) {
            $NepalthinkingDebug$.$Error("'$CaptionSlideoOptions' option error, '$CaptionSlideoOptions.$CaptionTransitions' is not an array.");
        }
    });

    var _This = this;

    var _Easings;
    var _TransitionConverter = {};
    var _CaptionTransitions = captionSlideoOptions.$CaptionTransitions;

    $NepalthinkingAnimator$.call(_This, 0, 0);

    function ConvertTransition(transition, isEasing) {
        $Nepalthinking$.$Each(transition, function (property, name) {
            var performName = _TransitionConverter[name];
            if (performName) {
                if (isEasing || name == "e") {
                    if ($Nepalthinking$.$IsNumeric(property)) {
                        property = _Easings[property];
                    }
                    else if ($Nepalthinking$.$IsPlainObject(property)) {
                        ConvertTransition(property, true);
                    }
                }

                transition[performName] = property;
                delete transition[name];
            }
        });
    }

    function GetCaptionItems(element, level) {

        var itemsToPlay = [];

        var captionElmts = $Nepalthinking$.$Children(element);
        $Nepalthinking$.$Each(captionElmts, function (captionElmt, i) {
            var isCaption = $Nepalthinking$.$AttributeEx(captionElmt, "u") == "caption";
            if (isCaption) {
                var transitionName = $Nepalthinking$.$AttributeEx(captionElmt, "t");
                var transition = _CaptionTransitions[$Nepalthinking$.$ParseInt(transitionName)] || _CaptionTransitions[transitionName];

                var transitionName2 = $Nepalthinking$.$AttributeEx(captionElmt, "t2");
                var transition2 = _CaptionTransitions[$Nepalthinking$.$ParseInt(transitionName2)] || _CaptionTransitions[transitionName2];

                var itemToPlay = { $Elmt: captionElmt, $Transition: transition, $Transition2: transition2 };
                if (level < 3) {
                    itemsToPlay.concat(GetCaptionItems(captionElmt, level + 1));
                }
                itemsToPlay.push(itemToPlay);
            }
        });

        return itemsToPlay;
    }

    function CreateAnimator(captionElmt, transitions, lastStyles, forIn) {

        $Nepalthinking$.$Each(transitions, function (transition) {
            ConvertTransition(transition);

            var animatorOptions = {
                $Easing: transition.$Easing,
                $Round: transition.$Round,
                $During: transition.$During,
                $Setter: $Nepalthinking$.$StyleSetterEx()
            };

            var fromStyles = $Nepalthinking$.$Extend($Nepalthinking$.$GetStyles(captionItem, transition), lastStyles);

            var animator = new $NepalthinkingAnimator$(transition.b || 0, transition.d, animatorOptions, captionElmt, fromStyles, transition);

            !forIn == !playIn && _This.$Combine(animator);

            var castOptions;
            lastStyles = $Nepalthinking$.$Extend(lastStyles, $Nepalthinking$.$Cast(fromStyles, transition, 1, animatorOptions.$Easing, animatorOptions.$During, animatorOptions.$Round, animatorOptions, castOptions));
        });

        return lastStyles;
    }

    function CreateAnimators(captionItems) {

        $Nepalthinking$.$Each(captionItems, function (captionItem, i) {

            $NepalthinkingDebug$.$Execute(function () {
                if (captionItem.length) {
                    var top = $Nepalthinking$.$CssTop(captionItem.$Elmt);
                    var left = $Nepalthinking$.$CssLeft(captionItem.$Elmt);
                    var width = $Nepalthinking$.$CssWidth(captionItem.$Elmt);
                    var height = $Nepalthinking$.$CssHeight(captionItem.$Elmt);

                    var error = null;

                    if (isNaN(top))
                        error = "style 'top' not specified";
                    else if (isNaN(left))
                        error = "style 'left' not specified";
                    else if (isNaN(width))
                        error = "style 'width' not specified";
                    else if (isNaN(height))
                        error = "style 'height' not specified";

                    if (error)
                        throw new Error("Caption " + (i + 1) + " definition error, " + error + ".\r\n" + captionItem.$Elmt.outerHTML);
                }
            });

            var captionElmt = captionItem.$Elmt;

            var captionItemWidth = $Nepalthinking$.$CssWidth(captionItem);
            var captionItemHeight = $Nepalthinking$.$CssHeight(captionItem);
            var captionParentWidth = $Nepalthinking$.$CssWidth(captionParent);
            var captionParentHeight = $Nepalthinking$.$CssHeight(captionParent);

            var lastStyles = { $Zoom: 1, $Rotate: 0, $Clip: { $Top: 0, $Right: captionItemWidth, $Bottom: captionItemHeight, $Left: 0 } };

            lastStyles = CreateAnimator(captionElmt, captionItem.$Transition, lastStyles, true);
            CreateAnimator(captionElmt, captionItem.$Transition2, lastStyles, false);
        });
    }

    _This.$Revert = function () {
        _This.$GoToPosition(-1, true);
    }

    //Constructor
    {
        _Easings = [
            $NepalthinkingEasing$.$EaseSwing,
            $NepalthinkingEasing$.$EaseLinear,
            $NepalthinkingEasing$.$EaseInQuad,
            $NepalthinkingEasing$.$EaseOutQuad,
            $NepalthinkingEasing$.$EaseInOutQuad,
            $NepalthinkingEasing$.$EaseInCubic,
            $NepalthinkingEasing$.$EaseOutCubic,
            $NepalthinkingEasing$.$EaseInOutCubic,
            $NepalthinkingEasing$.$EaseInQuart,
            $NepalthinkingEasing$.$EaseOutQuart,
            $NepalthinkingEasing$.$EaseInOutQuart,
            $NepalthinkingEasing$.$EaseInQuint,
            $NepalthinkingEasing$.$EaseOutQuint,
            $NepalthinkingEasing$.$EaseInOutQuint,
            $NepalthinkingEasing$.$EaseInSine,
            $NepalthinkingEasing$.$EaseOutSine,
            $NepalthinkingEasing$.$EaseInOutSine,
            $NepalthinkingEasing$.$EaseInExpo,
            $NepalthinkingEasing$.$EaseOutExpo,
            $NepalthinkingEasing$.$EaseInOutExpo,
            $NepalthinkingEasing$.$EaseInCirc,
            $NepalthinkingEasing$.$EaseOutCirc,
            $NepalthinkingEasing$.$EaseInOutCirc,
            $NepalthinkingEasing$.$EaseInElastic,
            $NepalthinkingEasing$.$EaseOutElastic,
            $NepalthinkingEasing$.$EaseInOutElastic,
            $NepalthinkingEasing$.$EaseInBack,
            $NepalthinkingEasing$.$EaseOutBack,
            $NepalthinkingEasing$.$EaseInOutBack,
            $NepalthinkingEasing$.$EaseInBounce,
            $NepalthinkingEasing$.$EaseOutBounce,
            $NepalthinkingEasing$.$EaseInOutBounce//,
            //$NepalthinkingEasing$.$EaseGoBack,
            //$NepalthinkingEasing$.$EaseInWave,
            //$NepalthinkingEasing$.$EaseOutWave,
            //$NepalthinkingEasing$.$EaseOutJump,
            //$NepalthinkingEasing$.$EaseInJump
        ];

        var translater = {
            $Top: "y",          //top
            $Left: "x",         //left
            $Bottom: "m",       //bottom
            $Right: "t",        //right
            $Zoom: "s",         //zoom/scale
            $Rotate: "r",       //rotate
            $Opacity: "o",      //opacity
            $Easing: "e",       //easing
            $ZIndex: "i",       //zindex
            $Round: "rd",       //round
            $During: "du",      //during
            $Duration: "d"//,   //duration
            //$Begin: "b"
        };

        $Nepalthinking$.$Each(translater, function (prop, newProp) {
            _TransitionConverter[prop] = newProp;
        });

        CreateAnimators(GetCaptionItems(container, 1));
    }
};

//Event Table

//$EVT_CLICK = 21;			    function(slideIndex[, event])
//$EVT_DRAG_START = 22;		    function(position[, virtualPosition, event])
//$EVT_DRAG_END = 23;		    function(position, startPosition[, virtualPosition, virtualStartPosition, event])
//$EVT_SWIPE_START = 24;		function(position[, virtualPosition])
//$EVT_SWIPE_END = 25;		    function(position[, virtualPosition])

//$EVT_LOAD_START = 26;			function(slideIndex)
//$EVT_LOAD_END = 27;			function(slideIndex)

//$EVT_POSITION_CHANGE = 202;	function(position, fromPosition[, virtualPosition, virtualFromPosition])
//$EVT_PARK = 203;			    function(slideIndex, fromIndex)

//$EVT_PROGRESS_CHANGE = 208;	function(slideIndex, progress[, progressBegin, idleBegin, idleEnd, progressEnd])
//$EVT_STATE_CHANGE = 209;	    function(slideIndex, progress[, progressBegin, idleBegin, idleEnd, progressEnd])

//$EVT_ROLLBACK_START = 210;	function(slideIndex, progress[, progressBegin, idleBegin, idleEnd, progressEnd])
//$EVT_ROLLBACK_END = 211;	    function(slideIndex, progress[, progressBegin, idleBegin, idleEnd, progressEnd])

//$EVT_SLIDESHOW_START = 206;   function(slideIndex[, progressBegin, slideshowBegin, slideshowEnd, progressEnd])
//$EVT_SLIDESHOW_END = 207;     function(slideIndex[, progressBegin, slideshowBegin, slideshowEnd, progressEnd])

//http://www.Nepalthinking.com/development/reference-api.html