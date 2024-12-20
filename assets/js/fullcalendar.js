(function(ap, t) {
    var J = {
        defaultView: "month",
        aspectRatio: 1.35,
        header: {
            left: "title",
            center: "",
            right: "today prev,next"
        },
        weekends: true,
        weekNumbers: false,
        weekNumberCalculation: "iso",
        weekNumberTitle: "W",
        allDayDefault: true,
        ignoreTimezone: true,
        lazyFetching: true,
        startParam: "start",
        endParam: "end",
        titleFormat: {
            month: "MMMM yyyy",
            week: "MMM d[ yyyy]{ '&#8212;'[ MMM] d yyyy}",
            day: "dddd, MMM d, yyyy"
        },
        columnFormat: {
            month: "ddd",
            week: "ddd d/M",
            day: "dddd d/M"
        },
        timeFormat: {
            "": "h(:mm)t"
        },
        isRTL: false,
        firstDay: 0,
        monthNames: ["Janeiro", "Fevereiro", "Mar&ccedil;o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        dayNames: ["Domingo", "Segunda-feira", "Ter\u00E7a-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "S\u00E1bado"],
        dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
        buttonText: {
            prev: "<span class='fc-text-arrow'>&lsaquo;</span>",
            next: "<span class='fc-text-arrow'>&rsaquo;</span>",
            prevYear: "<span class='fc-text-arrow'>&laquo;</span>",
            nextYear: "<span class='fc-text-arrow'>&raquo;</span>",
            today: "Hoje",
            month: "Por m&ecirc;s",
            week: "Por semana",
            day: "Por dia"
        },
        theme: false,
        buttonIcons: {
            prev: "circle-triangle-w",
            next: "circle-triangle-e"
        },
        unselectAuto: true,
        dropAccept: "*"
    };
    var P = {
        header: {
            left: "next,prev today",
            center: "",
            right: "title"
        },
        buttonText: {
            prev: "<span class='fc-text-arrow'>&rsaquo;</span>",
            next: "<span class='fc-text-arrow'>&lsaquo;</span>",
            prevYear: "<span class='fc-text-arrow'>&raquo;</span>",
            nextYear: "<span class='fc-text-arrow'>&laquo;</span>"
        },
        buttonIcons: {
            prev: "circle-triangle-e",
            next: "circle-triangle-w"
        }
    };
    var aw = ap.fullCalendar = {
        version: "1.6.1"
    };
    var ab = aw.views = {};
    ap.fn.fullCalendar = function(aI) {
        if (typeof aI == "string") {
            var aH = Array.prototype.slice.call(arguments, 1);
            var aJ;
            this.each(function() {
                var aL = ap.data(this, "fullCalendar");
                if (aL && ap.isFunction(aL[aI])) {
                    var aK = aL[aI].apply(aL, aH);
                    if (aJ === t) {
                        aJ = aK
                    }
                    if (aI == "destroy") {
                        ap.removeData(this, "fullCalendar")
                    }
                }
            });
            if (aJ !== t) {
                return aJ
            }
            return this
        }
        var aG = aI.eventSources || [];
        delete aI.eventSources;
        if (aI.events) {
            aG.push(aI.events);
            delete aI.events
        }
        aI = ap.extend(true, {}, J, (aI.isRTL || aI.isRTL === t && J.isRTL) ? P : {}, aI);
        this.each(function(aM, aK) {
            var aL = ap(aK);
            var aN = new q(aL, aI, aG);
            aL.data("fullCalendar", aN);
            aN.render()
        });
        return this
    };

    function ag(aG) {
        ap.extend(true, J, aG)
    }

    function q(aY, a5, a8) {
        var bn = this;
        bn.options = a5;
        bn.render = be;
        bn.destroy = bp;
        bn.refetchEvents = aS;
        bn.reportEvents = aW;
        bn.reportEventChange = br;
        bn.rerenderEvents = aK;
        bn.changeView = aP;
        bn.select = bo;
        bn.unselect = aR;
        bn.prev = ba;
        bn.next = aJ;
        bn.prevYear = bq;
        bn.nextYear = aH;
        bn.today = aZ;
        bn.gotoDate = bd;
        bn.incrementDate = a2;
        bn.formatDate = function(by, bx) {
            return y(by, bx, a5)
        };
        bn.formatDates = function(bz, by, bx) {
            return h(bz, by, bx, a5)
        };
        bn.getDate = a3;
        bn.getView = a9;
        bn.option = bk;
        bn.trigger = bc;
        p.call(bn, a5, a8);
        var aG = bn.isFetchNeeded;
        var bu = bn.fetchEvents;
        var bl = aY[0];
        var aL;
        var bf;
        var aU;
        var bw;
        var aT;
        var bv = {};
        var bb;
        var aN;
        var aQ;
        var bg = 0;
        var bm = 0;
        var bs = new Date();
        var a7 = [];
        var aM;
        w(bs, a5.year, a5.month, a5.date);

        function be(bx) {
            if (!aU) {
                a6()
            } else {
                bh();
                bt();
                aI();
                a4(bx)
            }
        }

        function a6() {
            bw = a5.theme ? "ui" : "fc";
            aY.addClass("fc");
            if (a5.isRTL) {
                aY.addClass("fc-rtl")
            } else {
                aY.addClass("fc-ltr")
            }
            if (a5.theme) {
                aY.addClass("ui-widget")
            }
            aU = ap("<div class='fc-content' style='position:relative'/>").prependTo(aY);
            aL = new Q(bn, a5);
            bf = aL.render();
            if (bf) {
                aY.prepend(bf)
            }
            aP(a5.defaultView);
            ap(window).resize(aV);
            if (!aX()) {
                aO()
            }
        }

        function aO() {
            setTimeout(function() {
                if (!aT.start && aX()) {
                    a4()
                }
            }, 0)
        }

        function bp() {
            ap(window).unbind("resize", aV);
            aL.destroy();
            aU.remove();
            aY.removeClass("fc fc-rtl ui-widget")
        }

        function bi() {
            return bl.offsetWidth !== 0
        }

        function aX() {
            return ap("body")[0].offsetWidth !== 0
        }

        function aP(bz) {
            if (!aT || bz != aT.name) {
                bm++;
                aR();
                var by = aT;
                var bx;
                if (by) {
                    (by.beforeHide || an)();
                    G(aU, aU.height());
                    by.element.hide()
                } else {
                    G(aU, 1)
                }
                aU.css("overflow", "hidden");
                aT = bv[bz];
                if (aT) {
                    aT.element.show()
                } else {
                    aT = bv[bz] = new ab[bz](bx = aQ = ap("<div class='fc-view fc-view-" + bz + "' style='position:absolute'/>").appendTo(aU), bn)
                }
                if (by) {
                    aL.deactivateButton(by.name)
                }
                aL.activateButton(bz);
                a4();
                aU.css("overflow", "");
                if (by) {
                    G(aU, 1)
                }
                if (!bx) {
                    (aT.afterShow || an)()
                }
                bm--
            }
        }

        function a4(bz) {
            if (bi()) {
                bm++;
                aR();
                if (aN === t) {
                    bh()
                }
                var by = false;
                if (!aT.start || bz || bs < aT.start || bs >= aT.end) {
                    aT.render(bs, bz || 0);
                    bj(true);
                    by = true
                } else {
                    if (aT.sizeDirty) {
                        aT.clearEvents();
                        bj();
                        by = true
                    } else {
                        if (aT.eventsDirty) {
                            aT.clearEvents();
                            by = true
                        }
                    }
                }
                aT.sizeDirty = false;
                aT.eventsDirty = false;
                a1(by);
                bb = aY.outerWidth();
                aL.updateTitle(aT.title);
                var bx = new Date();
                if (bx >= aT.start && bx < aT.end) {
                    aL.disableButton("today")
                } else {
                    aL.enableButton("today")
                }
                bm--;
                aT.trigger("viewDisplay", bl)
            }
        }

        function a0() {
            bt();
            if (bi()) {
                bh();
                bj();
                aR();
                aT.clearEvents();
                aT.renderEvents(a7);
                aT.sizeDirty = false
            }
        }

        function bt() {
            ap.each(bv, function(bx, by) {
                by.sizeDirty = true
            })
        }

        function bh() {
            if (a5.contentHeight) {
                aN = a5.contentHeight
            } else {
                if (a5.height) {
                    aN = a5.height - (bf ? bf.height() : 0) - C(aU)
                } else {
                    aN = Math.round(aU.width() / Math.max(a5.aspectRatio, 0.5))
                }
            }
        }

        function bj(bx) {
            bm++;
            aT.setHeight(aN, bx);
            if (aQ) {
                aQ.css("position", "relative");
                aQ = null
            }
            aT.setWidth(aU.width(), bx);
            bm--
        }

        function aV() {
            if (!bm) {
                if (aT.start) {
                    var bx = ++bg;
                    setTimeout(function() {
                        if (bx == bg && !bm && bi()) {
                            if (bb != (bb = aY.outerWidth())) {
                                bm++;
                                a0();
                                aT.trigger("windowResize", bl);
                                bm--
                            }
                        }
                    }, 200)
                } else {
                    aO()
                }
            }
        }

        function a1(bx) {
            if (!a5.lazyFetching || aG(aT.visStart, aT.visEnd)) {
                aS()
            } else {
                if (bx) {
                    aK()
                }
            }
        }

        function aS() {
            bu(aT.visStart, aT.visEnd)
        }

        function aW(bx) {
            a7 = bx;
            aK()
        }

        function br(bx) {
            aK(bx)
        }

        function aK(bx) {
            aI();
            if (bi()) {
                aT.clearEvents();
                aT.renderEvents(a7, bx);
                aT.eventsDirty = false
            }
        }

        function aI() {
            ap.each(bv, function(bx, by) {
                by.eventsDirty = true
            })
        }

        function bo(bz, bx, by) {
            aT.select(bz, bx, by === t ? true : by)
        }

        function aR() {
            if (aT) {
                aT.unselect()
            }
        }

        function ba() {
            a4(-1)
        }

        function aJ() {
            a4(1)
        }

        function bq() {
            af(bs, -1);
            a4()
        }

        function aH() {
            af(bs, 1);
            a4()
        }

        function aZ() {
            bs = new Date();
            a4()
        }

        function bd(by, bz, bx) {
            if (by instanceof Date) {
                bs = K(by)
            } else {
                w(bs, by, bz, bx)
            }
            a4()
        }

        function a2(by, bx, bz) {
            if (by !== t) {
                af(bs, by)
            }
            if (bx !== t) {
                m(bs, bx)
            }
            if (bz !== t) {
                ay(bs, bz)
            }
            a4()
        }

        function a3() {
            return K(bs)
        }

        function a9() {
            return aT
        }

        function bk(bx, by) {
            if (by === t) {
                return a5[bx]
            }
            if (bx == "height" || bx == "contentHeight" || bx == "aspectRatio") {
                a5[bx] = by;
                a0()
            }
        }

        function bc(bx, by) {
            if (a5[bx]) {
                return a5[bx].apply(by || bl, Array.prototype.slice.call(arguments, 2))
            }
        }
        if (a5.droppable) {
            ap(document).bind("dragstart", function(bz, bA) {
                var bx = bz.target;
                var bB = ap(bx);
                if (!bB.parents(".fc").length) {
                    var by = a5.dropAccept;
                    if (ap.isFunction(by) ? by.call(bx, bB) : bB.is(by)) {
                        aM = bx;
                        aT.dragStart(aM, bz, bA)
                    }
                }
            }).bind("dragstop", function(bx, by) {
                if (aM) {
                    aT.dragStop(aM, bx, by);
                    aM = null
                }
            })
        }
    }

    function Q(aJ, aS) {
        var aR = this;
        aR.render = aH;
        aR.destroy = aN;
        aR.updateTitle = aL;
        aR.activateButton = aG;
        aR.deactivateButton = aP;
        aR.disableButton = aI;
        aR.enableButton = aM;
        var aK = ap([]);
        var aO;

        function aH() {
            aO = aS.theme ? "ui" : "fc";
            var aT = aS.header;
            if (aT) {
                aK = ap("<table class='fc-header' style='width:100%'/>").append(ap("<tr/>").append(aQ("left")).append(aQ("center")).append(aQ("right")));
                return aK
            }
        }

        function aN() {
            aK.remove()
        }

        function aQ(aT) {
            var aV = ap("<td class='fc-header-" + aT + "'/>");
            var aU = aS.header[aT];
            if (aU) {
                ap.each(aU.split(" "), function(aX) {
                    if (aX > 0) {
                        aV.append("<span class='fc-header-space'/>")
                    }
                    var aW;
                    ap.each(this.split(","), function(a0, aZ) {
                        if (aZ == "title") {
                            aV.append("<span class='fc-header-title'><h2>&nbsp;</h2></span>");
                            if (aW) {
                                aW.addClass(aO + "-corner-right")
                            }
                            aW = null
                        } else {
                            var aY;
                            if (aJ[aZ]) {
                                aY = aJ[aZ]
                            } else {
                                if (ab[aZ]) {
                                    aY = function() {
                                        a1.removeClass(aO + "-state-hover");
                                        aJ.changeView(aZ)
                                    }
                                }
                            }
                            if (aY) {
                                var a2 = aS.theme ? B(aS.buttonIcons, aZ) : null;
                                var a3 = B(aS.buttonText, aZ);
                                var a1 = ap("<span class='fc-button fc-button-" + aZ + " " + aO + "-state-default'>" + (a2 ? "<span class='fc-icon-wrap'><span class='ui-icon ui-icon-" + a2 + "'/></span>" : a3) + "</span>").click(function() {
                                    if (!a1.hasClass(aO + "-state-disabled")) {
                                        aY()
                                    }
                                }).mousedown(function() {
                                    a1.not("." + aO + "-state-active").not("." + aO + "-state-disabled").addClass(aO + "-state-down")
                                }).mouseup(function() {
                                    a1.removeClass(aO + "-state-down")
                                }).hover(function() {
                                    a1.not("." + aO + "-state-active").not("." + aO + "-state-disabled").addClass(aO + "-state-hover")
                                }, function() {
                                    a1.removeClass(aO + "-state-hover").removeClass(aO + "-state-down")
                                }).appendTo(aV);
                                aF(a1);
                                if (!aW) {
                                    a1.addClass(aO + "-corner-left")
                                }
                                aW = a1
                            }
                        }
                    });
                    if (aW) {
                        aW.addClass(aO + "-corner-right")
                    }
                })
            }
            return aV
        }

        function aL(aT) {
            aK.find("h2").html(aT)
        }

        function aG(aT) {
            aK.find("span.fc-button-" + aT).addClass(aO + "-state-active")
        }

        function aP(aT) {
            aK.find("span.fc-button-" + aT).removeClass(aO + "-state-active")
        }

        function aI(aT) {
            aK.find("span.fc-button-" + aT).addClass(aO + "-state-disabled")
        }

        function aM(aT) {
            aK.find("span.fc-button-" + aT).removeClass(aO + "-state-disabled")
        }
    }
    aw.sourceNormalizers = [];
    aw.sourceFetchers = [];
    var k = {
        dataType: "json",
        cache: false
    };
    var T = 1;

    function p(aM, aU) {
        var aW = this;
        aW.isFetchNeeded = aO;
        aW.fetchEvents = aV;
        aW.addEventSource = aJ;
        aW.removeEventSource = aK;
        aW.updateEvent = aZ;
        aW.renderEvent = aS;
        aW.removeEvents = bb;
        aW.clientEvents = a5;
        aW.normalizeEvent = aR;
        var aY = aW.trigger;
        var aG = aW.getView;
        var a1 = aW.reportEvents;
        var a3 = {
            events: []
        };
        var aH = [a3];
        var a8, a4;
        var aI = 0;
        var a9 = 0;
        var a7 = 0;
        var aX = [];
        for (var a6 = 0; a6 < aU.length; a6++) {
            a0(aU[a6])
        }

        function aO(bd, bc) {
            return !a8 || bd < a8 || bc > a4
        }

        function aV(bg, bd) {
            a8 = bg;
            a4 = bd;
            aX = [];
            var bf = ++aI;
            var bc = aH.length;
            a9 = bc;
            for (var be = 0; be < bc; be++) {
                aN(aH[be], bf)
            }
        }

        function aN(bd, bc) {
            a2(bd, function(bf) {
                if (bc == aI) {
                    if (bf) {
                        if (aM.eventDataTransform) {
                            bf = ap.map(bf, aM.eventDataTransform)
                        }
                        if (bd.eventDataTransform) {
                            bf = ap.map(bf, bd.eventDataTransform)
                        }
                        for (var be = 0; be < bf.length; be++) {
                            bf[be].source = bd;
                            aR(bf[be])
                        }
                        aX = aX.concat(bf)
                    }
                    a9--;
                    if (!a9) {
                        a1(aX)
                    }
                }
            })
        }

        function a2(bc, bm) {
            var bh;
            var bl = aw.sourceFetchers;
            var bj;
            for (bh = 0; bh < bl.length; bh++) {
                bj = bl[bh](bc, a8, a4, bm);
                if (bj === true) {
                    return
                } else {
                    if (typeof bj == "object") {
                        a2(bj, bm);
                        return
                    }
                }
            }
            var bo = bc.events;
            if (bo) {
                if (ap.isFunction(bo)) {
                    aQ();
                    bo(K(a8), K(a4), function(bp) {
                        bm(bp);
                        ba()
                    })
                } else {
                    if (ap.isArray(bo)) {
                        bm(bo)
                    } else {
                        bm()
                    }
                }
            } else {
                var bd = bc.url;
                if (bd) {
                    var bn = bc.success;
                    var bk = bc.error;
                    var be = bc.complete;
                    var bg = ap.extend({}, bc.data || {});
                    var bi = aE(bc.startParam, aM.startParam);
                    var bf = aE(bc.endParam, aM.endParam);
                    if (bi) {
                        bg[bi] = Math.round(+a8 / 1000)
                    }
                    if (bf) {
                        bg[bf] = Math.round(+a4 / 1000)
                    }
                    aQ();
                    ap.ajax(ap.extend({}, k, bc, {
                        data: bg,
                        success: function(bq) {
                            bq = bq || [];
                            var bp = F(bn, this, arguments);
                            if (ap.isArray(bp)) {
                                bq = bp
                            }
                            bm(bq)
                        },
                        error: function() {
                            F(bk, this, arguments);
                            bm()
                        },
                        complete: function() {
                            F(be, this, arguments);
                            ba()
                        }
                    }))
                } else {
                    bm()
                }
            }
        }

        function aJ(bc) {
            bc = a0(bc);
            if (bc) {
                a9++;
                aN(bc, aI)
            }
        }

        function a0(bc) {
            if (ap.isFunction(bc) || ap.isArray(bc)) {
                bc = {
                    events: bc
                }
            } else {
                if (typeof bc == "string") {
                    bc = {
                        url: bc
                    }
                }
            }
            if (typeof bc == "object") {
                aT(bc);
                aH.push(bc);
                return bc
            }
        }

        function aK(bc) {
            aH = ap.grep(aH, function(bd) {
                return !aP(bd, bc)
            });
            aX = ap.grep(aX, function(bd) {
                return !aP(bd.source, bc)
            });
            a1(aX)
        }

        function aZ(bh) {
            var bf, bd = aX.length,
                bi, bc = aG().defaultEventEnd,
                bg = bh.start - bh._start,
                be = bh.end ? (bh.end - (bh._end || bc(bh))) : 0;
            for (bf = 0; bf < bd; bf++) {
                bi = aX[bf];
                if (bi._id == bh._id && bi != bh) {
                    bi.start = new Date(+bi.start + bg);
                    if (bh.end) {
                        if (bi.end) {
                            bi.end = new Date(+bi.end + be)
                        } else {
                            bi.end = new Date(+bc(bi) + be)
                        }
                    } else {
                        bi.end = null
                    }
                    bi.title = bh.title;
                    bi.url = bh.url;
                    bi.allDay = bh.allDay;
                    bi.className = bh.className;
                    bi.editable = bh.editable;
                    bi.color = bh.color;
                    bi.backgroudColor = bh.backgroudColor;
                    bi.borderColor = bh.borderColor;
                    bi.textColor = bh.textColor;
                    aR(bi)
                }
            }
            aR(bh);
            a1(aX)
        }

        function aS(bd, bc) {
            aR(bd);
            if (!bd.source) {
                if (bc) {
                    a3.events.push(bd);
                    bd.source = a3
                }
                aX.push(bd)
            }
            a1(aX)
        }

        function bb(bd) {
            if (!bd) {
                aX = [];
                for (var bc = 0; bc < aH.length; bc++) {
                    if (ap.isArray(aH[bc].events)) {
                        aH[bc].events = []
                    }
                }
            } else {
                if (!ap.isFunction(bd)) {
                    var be = bd + "";
                    bd = function(bf) {
                        return bf._id == be
                    }
                }
                aX = ap.grep(aX, bd, true);
                for (var bc = 0; bc < aH.length; bc++) {
                    if (ap.isArray(aH[bc].events)) {
                        aH[bc].events = ap.grep(aH[bc].events, bd, true)
                    }
                }
            }
            a1(aX)
        }

        function a5(bc) {
            if (ap.isFunction(bc)) {
                return ap.grep(aX, bc)
            } else {
                if (bc) {
                    bc += "";
                    return ap.grep(aX, function(bd) {
                        return bd._id == bc
                    })
                }
            }
            return aX
        }

        function aQ() {
            if (!a7++) {
                aY("loading", null, true)
            }
        }

        function ba() {
            if (!--a7) {
                aY("loading", null, false)
            }
        }

        function aR(bd) {
            var be = bd.source || {};
            var bc = aE(be.ignoreTimezone, aM.ignoreTimezone);
            bd._id = bd._id || (bd.id === t ? "_fc" + T++ : bd.id + "");
            if (bd.date) {
                if (!bd.start) {
                    bd.start = bd.date
                }
                delete bd.date
            }
            bd._start = K(bd.start = X(bd.start, bc));
            bd.end = X(bd.end, bc);
            if (bd.end && bd.end <= bd.start) {
                bd.end = null
            }
            bd._end = bd.end ? K(bd.end) : null;
            if (bd.allDay === t) {
                bd.allDay = aE(be.allDayDefault, aM.allDayDefault)
            }
            if (bd.className) {
                if (typeof bd.className == "string") {
                    bd.className = bd.className.split(/\s+/)
                }
            } else {
                bd.className = []
            }
        }

        function aT(be) {
            if (be.className) {
                if (typeof be.className == "string") {
                    be.className = be.className.split(/\s+/)
                }
            } else {
                be.className = []
            }
            var bd = aw.sourceNormalizers;
            for (var bc = 0; bc < bd.length; bc++) {
                bd[bc](be)
            }
        }

        function aP(bd, bc) {
            return bd && bc && aL(bd) == aL(bc)
        }

        function aL(bc) {
            return ((typeof bc == "object") ? (bc.events || bc.url) : "") || bc
        }
    }
    aw.addDays = ay;
    aw.cloneDate = K;
    aw.parseDate = X;
    aw.parseISO8601 = l;
    aw.parseTime = aC;
    aw.formatDate = y;
    aw.formatDates = h;
    var N = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
        ar = 86400000,
        ah = 3600000,
        S = 60000;

    function af(aH, aI, aG) {
        aH.setFullYear(aH.getFullYear() + aI);
        if (!aG) {
            b(aH)
        }
        return aH
    }

    function m(aJ, aK, aI) {
        if (+aJ) {
            var aG = aJ.getMonth() + aK,
                aH = K(aJ);
            aH.setDate(1);
            aH.setMonth(aG);
            aJ.setMonth(aG);
            if (!aI) {
                b(aJ)
            }
            while (aJ.getMonth() != aH.getMonth()) {
                aJ.setDate(aJ.getDate() + (aJ < aH ? 1 : -1))
            }
        }
        return aJ
    }

    function ay(aJ, aK, aI) {
        if (+aJ) {
            var aG = aJ.getDate() + aK,
                aH = K(aJ);
            aH.setHours(9);
            aH.setDate(aG);
            aJ.setDate(aG);
            if (!aI) {
                b(aJ)
            }
            aA(aJ, aH)
        }
        return aJ
    }

    function aA(aH, aG) {
        if (+aH) {
            while (aH.getDate() != aG.getDate()) {
                aH.setTime(+aH + (aH < aG ? 1 : -1) * ah)
            }
        }
    }

    function g(aG, aH) {
        aG.setMinutes(aG.getMinutes() + aH);
        return aG
    }

    function b(aG) {
        aG.setHours(0);
        aG.setMinutes(0);
        aG.setSeconds(0);
        aG.setMilliseconds(0);
        return aG
    }

    function K(aG, aH) {
        if (aH) {
            return b(new Date(+aG))
        }
        return new Date(+aG)
    }

    function d() {
        var aG = 0,
            aH;
        do {
            aH = new Date(1970, aG++, 1)
        } while (aH.getHours());
        return aH
    }

    function aD(aG, aH, aI) {
        aH = aH || 1;
        while (!aG.getDay() || (aI && aG.getDay() == 1 || !aI && aG.getDay() == 6)) {
            ay(aG, aH)
        }
        return aG
    }

    function av(aH, aG) {
        return Math.round((K(aH, true) - K(aG, true)) / ar)
    }

    function w(aH, aJ, aG, aI) {
        if (aJ !== t && aJ != aH.getFullYear()) {
            aH.setDate(1);
            aH.setMonth(0);
            aH.setFullYear(aJ)
        }
        if (aG !== t && aG != aH.getMonth()) {
            aH.setDate(1);
            aH.setMonth(aG)
        }
        if (aI !== t) {
            aH.setDate(aI)
        }
    }

    function X(aH, aG) {
        if (typeof aH == "object") {
            return aH
        }
        if (typeof aH == "number") {
            return new Date(aH * 1000)
        }
        if (typeof aH == "string") {
            if (aH.match(/^\d+(\.\d+)?$/)) {
                return new Date(parseFloat(aH) * 1000)
            }
            if (aG === t) {
                aG = true
            }
            return l(aH, aG) || (aH ? new Date(aH) : null)
        }
        return null
    }

    function l(aK, aH) {
        var aG = aK.match(/^([0-9]{4})(-([0-9]{2})(-([0-9]{2})([T ]([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?(Z|(([-+])([0-9]{2})(:?([0-9]{2}))?))?)?)?)?$/);
        if (!aG) {
            return null
        }
        var aJ = new Date(aG[1], 0, 1);
        if (aH || !aG[13]) {
            var aI = new Date(aG[1], 0, 1, 9, 0);
            if (aG[3]) {
                aJ.setMonth(aG[3] - 1);
                aI.setMonth(aG[3] - 1)
            }
            if (aG[5]) {
                aJ.setDate(aG[5]);
                aI.setDate(aG[5])
            }
            aA(aJ, aI);
            if (aG[7]) {
                aJ.setHours(aG[7])
            }
            if (aG[8]) {
                aJ.setMinutes(aG[8])
            }
            if (aG[10]) {
                aJ.setSeconds(aG[10])
            }
            if (aG[12]) {
                aJ.setMilliseconds(Number("0." + aG[12]) * 1000)
            }
            aA(aJ, aI)
        } else {
            aJ.setUTCFullYear(aG[1], aG[3] ? aG[3] - 1 : 0, aG[5] || 1);
            aJ.setUTCHours(aG[7] || 0, aG[8] || 0, aG[10] || 0, aG[12] ? Number("0." + aG[12]) * 1000 : 0);
            if (aG[14]) {
                var aL = Number(aG[16]) * 60 + (aG[18] ? Number(aG[18]) : 0);
                aL *= aG[15] == "-" ? 1 : -1;
                aJ = new Date(+aJ + (aL * 60 * 1000))
            }
        }
        return aJ
    }

    function aC(aI) {
        if (typeof aI == "number") {
            return aI * 60
        }
        if (typeof aI == "object") {
            return aI.getHours() * 60 + aI.getMinutes()
        }
        var aG = aI.match(/(\d+)(?::(\d+))?\s*(\w+)?/);
        if (aG) {
            var aH = parseInt(aG[1], 10);
            if (aG[3]) {
                aH %= 12;
                if (aG[3].toLowerCase().charAt(0) == "p") {
                    aH += 12
                }
            }
            return aH * 60 + (aG[2] ? parseInt(aG[2], 10) : 0)
        }
    }

    function y(aH, aI, aG) {
        return h(aH, null, aI, aG)
    }

    function h(aS, aR, aQ, aT) {
        aT = aT || J;
        var aH = aS,
            aJ = aR,
            aK, aL = aQ.length,
            aN, aI, aP, aM = "";
        for (aK = 0; aK < aL; aK++) {
            aN = aQ.charAt(aK);
            if (aN == "'") {
                for (aI = aK + 1; aI < aL; aI++) {
                    if (aQ.charAt(aI) == "'") {
                        if (aH) {
                            if (aI == aK + 1) {
                                aM += "'"
                            } else {
                                aM += aQ.substring(aK + 1, aI)
                            }
                            aK = aI
                        }
                        break
                    }
                }
            } else {
                if (aN == "(") {
                    for (aI = aK + 1; aI < aL; aI++) {
                        if (aQ.charAt(aI) == ")") {
                            var aG = y(aH, aQ.substring(aK + 1, aI), aT);
                            if (parseInt(aG.replace(/\D/, ""), 10)) {
                                aM += aG
                            }
                            aK = aI;
                            break
                        }
                    }
                } else {
                    if (aN == "[") {
                        for (aI = aK + 1; aI < aL; aI++) {
                            if (aQ.charAt(aI) == "]") {
                                var aO = aQ.substring(aK + 1, aI);
                                var aG = y(aH, aO, aT);
                                if (aG != y(aJ, aO, aT)) {
                                    aM += aG
                                }
                                aK = aI;
                                break
                            }
                        }
                    } else {
                        if (aN == "{") {
                            aH = aR;
                            aJ = aS
                        } else {
                            if (aN == "}") {
                                aH = aS;
                                aJ = aR
                            } else {
                                for (aI = aL; aI > aK; aI--) {
                                    if (aP = au[aQ.substring(aK, aI)]) {
                                        if (aH) {
                                            aM += aP(aH, aT)
                                        }
                                        aK = aI - 1;
                                        break
                                    }
                                }
                                if (aI == aK) {
                                    if (aH) {
                                        aM += aN
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return aM
    }
    var au = {
        s: function(aG) {
            return aG.getSeconds()
        },
        ss: function(aG) {
            return Y(aG.getSeconds())
        },
        m: function(aG) {
            return aG.getMinutes()
        },
        mm: function(aG) {
            return Y(aG.getMinutes())
        },
        h: function(aG) {
            return aG.getHours() % 12 || 12
        },
        hh: function(aG) {
            return Y(aG.getHours() % 12 || 12)
        },
        H: function(aG) {
            return aG.getHours()
        },
        HH: function(aG) {
            return Y(aG.getHours())
        },
        d: function(aG) {
            return aG.getDate()
        },
        dd: function(aG) {
            return Y(aG.getDate())
        },
        ddd: function(aH, aG) {
            return aG.dayNamesShort[aH.getDay()]
        },
        dddd: function(aH, aG) {
            return aG.dayNames[aH.getDay()]
        },
        M: function(aG) {
            return aG.getMonth() + 1
        },
        MM: function(aG) {
            return Y(aG.getMonth() + 1)
        },
        MMM: function(aH, aG) {
            return aG.monthNamesShort[aH.getMonth()]
        },
        MMMM: function(aH, aG) {
            return aG.monthNames[aH.getMonth()]
        },
        yy: function(aG) {
            return (aG.getFullYear() + "").substring(2)
        },
        yyyy: function(aG) {
            return aG.getFullYear()
        },
        t: function(aG) {
            return aG.getHours() < 12 ? "a" : "p"
        },
        tt: function(aG) {
            return aG.getHours() < 12 ? "am" : "pm"
        },
        T: function(aG) {
            return aG.getHours() < 12 ? "A" : "P"
        },
        TT: function(aG) {
            return aG.getHours() < 12 ? "AM" : "PM"
        },
        u: function(aG) {
            return y(aG, "yyyy-MM-dd'T'HH:mm:ss'Z'")
        },
        S: function(aH) {
            var aG = aH.getDate();
            if (aG > 10 && aG < 20) {
                return "th"
            }
            return ["st", "nd", "rd"][aG % 10 - 1] || "th"
        },
        w: function(aH, aG) {
            return aG.weekNumberCalculation(aH)
        },
        W: function(aG) {
            return u(aG)
        }
    };
    aw.dateFormatters = au;

    function u(aG) {
        var aH;
        var aI = new Date(aG.getTime());
        aI.setDate(aI.getDate() + 4 - (aI.getDay() || 7));
        aH = aI.getTime();
        aI.setMonth(0);
        aI.setDate(1);
        return Math.floor(Math.round((aH - aI) / 86400000) / 7) + 1
    }
    aw.applyAll = F;

    function ak(aG) {
        if (aG.end) {
            return o(aG.end, aG.allDay)
        } else {
            return ay(K(aG.start), 1)
        }
    }

    function o(aG, aH) {
        aG = K(aG);
        return aH || aG.getHours() || aG.getMinutes() ? ay(aG, 1) : b(aG)
    }

    function r(aH, aG) {
        return (aG.msLength - aH.msLength) * 100 + (aH.event.start - aG.event.start)
    }

    function L(aH, aG) {
        return aH.end > aG.start && aH.start < aG.end
    }

    function Z(aS, aM, aI, aL) {
        var aJ = [],
            aN, aP = aS.length,
            aH, aQ, aO, aR, aT, aG, aK;
        for (aN = 0; aN < aP; aN++) {
            aH = aS[aN];
            aQ = aH.start;
            aO = aM[aN];
            if (aO > aI && aQ < aL) {
                if (aQ < aI) {
                    aR = K(aI);
                    aG = false
                } else {
                    aR = aQ;
                    aG = true
                }
                if (aO > aL) {
                    aT = K(aL);
                    aK = false
                } else {
                    aT = aO;
                    aK = true
                }
                aJ.push({
                    event: aH,
                    start: aR,
                    end: aT,
                    isStart: aG,
                    isEnd: aK,
                    msLength: aT - aR
                })
            }
        }
        return aJ.sort(r)
    }

    function ae(aI) {
        var aM = [],
            aL, aG = aI.length,
            aH, aK, aN, aJ;
        for (aL = 0; aL < aG; aL++) {
            aH = aI[aL];
            aK = 0;
            while (true) {
                aN = false;
                if (aM[aK]) {
                    for (aJ = 0; aJ < aM[aK].length; aJ++) {
                        if (L(aM[aK][aJ], aH)) {
                            aN = true;
                            break
                        }
                    }
                }
                if (aN) {
                    aK++
                } else {
                    break
                }
            }
            if (aM[aK]) {
                aM[aK].push(aH)
            } else {
                aM[aK] = [aH]
            }
        }
        return aM
    }

    function s(aH, aG, aI) {
        aH.unbind("mouseover").mouseover(function(aM) {
            var aL = aM.target,
                aN, aK, aJ;
            while (aL != this) {
                aN = aL;
                aL = aL.parentNode
            }
            if ((aK = aN._fci) !== t) {
                aN._fci = t;
                aJ = aG[aK];
                aI(aJ.event, aJ.element, aJ);
                ap(aM.target).trigger(aM)
            }
            aM.stopPropagation()
        })
    }

    function aq(aI, aJ, aG) {
        for (var aH = 0, aK; aH < aI.length; aH++) {
            aK = ap(aI[aH]);
            aK.width(Math.max(0, aJ - f(aK, aG)))
        }
    }

    function W(aJ, aG, aH) {
        for (var aI = 0, aK; aI < aJ.length; aI++) {
            aK = ap(aJ[aI]);
            aK.height(Math.max(0, aG - C(aK, aH)))
        }
    }

    function f(aH, aG) {
        return ad(aH) + n(aH) + (aG ? ac(aH) : 0)
    }

    function ad(aG) {
        return (parseFloat(ap.css(aG[0], "paddingLeft", true)) || 0) + (parseFloat(ap.css(aG[0], "paddingRight", true)) || 0)
    }

    function ac(aG) {
        return (parseFloat(ap.css(aG[0], "marginLeft", true)) || 0) + (parseFloat(ap.css(aG[0], "marginRight", true)) || 0)
    }

    function n(aG) {
        return (parseFloat(ap.css(aG[0], "borderLeftWidth", true)) || 0) + (parseFloat(ap.css(aG[0], "borderRightWidth", true)) || 0)
    }

    function C(aH, aG) {
        return v(aH) + am(aH) + (aG ? i(aH) : 0)
    }

    function v(aG) {
        return (parseFloat(ap.css(aG[0], "paddingTop", true)) || 0) + (parseFloat(ap.css(aG[0], "paddingBottom", true)) || 0)
    }

    function i(aG) {
        return (parseFloat(ap.css(aG[0], "marginTop", true)) || 0) + (parseFloat(ap.css(aG[0], "marginBottom", true)) || 0)
    }

    function am(aG) {
        return (parseFloat(ap.css(aG[0], "borderTopWidth", true)) || 0) + (parseFloat(ap.css(aG[0], "borderBottomWidth", true)) || 0)
    }

    function G(aH, aG) {
        aG = (typeof aG == "number" ? aG + "px" : aG);
        aH.each(function(aJ, aI) {
            aI.style.cssText += ";min-height:" + aG + ";_height:" + aG
        })
    }

    function an() {}

    function U(aH, aG) {
        return aH - aG
    }

    function ao(aG) {
        return Math.max.apply(Math, aG)
    }

    function Y(aG) {
        return (aG < 10 ? "0" : "") + aG
    }

    function B(aK, aG) {
        if (aK[aG] !== t) {
            return aK[aG]
        }
        var aJ = aG.split(/(?=[A-Z])/),
            aI = aJ.length - 1,
            aH;
        for (; aI >= 0; aI--) {
            aH = aK[aJ[aI].toLowerCase()];
            if (aH !== t) {
                return aH
            }
        }
        return aK[""]
    }

    function aB(aG) {
        return aG.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#039;").replace(/"/g, "&quot;").replace(/\n/g, "<br />")
    }

    function E(aG) {
        return aG.id + "/" + aG.className + "/" + aG.style.cssText.replace(/(^|;)\s*(top|left|width|height)\s*:[^;]*/ig, "")
    }

    function aF(aG) {
        aG.attr("unselectable", "on").css("MozUserSelect", "none").bind("selectstart.ui", function() {
            return false
        })
    }

    function c(aG) {
        aG.children().removeClass("fc-first fc-last").filter(":first-child").addClass("fc-first").end().filter(":last-child").addClass("fc-last")
    }

    function I(aG, aH) {
        aG.each(function(aI, aJ) {
            aJ.className = aJ.className.replace(/^fc-\w*/, "fc-" + N[aH.getDay()])
        })
    }

    function O(aH, aI) {
        var aG = aH.source || {};
        var aN = aH.color;
        var aL = aG.color;
        var aK = aI("eventColor");
        var aO = aH.backgroundColor || aN || aG.backgroundColor || aL || aI("eventBackgroundColor") || aK;
        var aJ = aH.borderColor || aN || aG.borderColor || aL || aI("eventBorderColor") || aK;
        var aP = aH.textColor || aG.textColor || aI("eventTextColor");
        var aM = [];
        if (aO) {
            aM.push("background-color:" + aO)
        }
        if (aJ) {
            aM.push("border-color:" + aJ)
        }
        if (aP) {
            aM.push("color:" + aP)
        }
        return aM.join(";")
    }

    function F(aJ, aK, aH) {
        if (ap.isFunction(aJ)) {
            aJ = [aJ]
        }
        if (aJ) {
            var aI;
            var aG;
            for (aI = 0; aI < aJ.length; aI++) {
                aG = aJ[aI].apply(aK, aH) || aG
            }
            return aG
        }
    }

    function aE() {
        for (var aG = 0; aG < arguments.length; aG++) {
            if (arguments[aG] !== t) {
                return arguments[aG]
            }
        }
    }
    ab.month = aa;

    function aa(aJ, aM) {
        var aI = this;
        aI.render = aK;
        x.call(aI, aJ, aM, "month");
        var aH = aI.opt;
        var aG = aI.renderBasic;
        var aL = aM.formatDate;

        function aK(aQ, aU) {
            if (aU) {
                m(aQ, aU);
                aQ.setDate(1)
            }
            var aO = K(aQ, true);
            aO.setDate(1);
            var aR = m(K(aO), 1);
            var aV = K(aO);
            var aS = K(aR);
            var aN = aH("firstDay");
            var aP = aH("weekends") ? 0 : 1;
            if (aP) {
                aD(aV);
                aD(aS, -1, true)
            }
            ay(aV, -((aV.getDay() - Math.max(aN, aP) + 7) % 7));
            ay(aS, (7 - aS.getDay() + Math.max(aN, aP)) % 7);
            var aT = Math.round((aS - aV) / (ar * 7));
            if (aH("weekMode") == "fixed") {
                ay(aS, (6 - aT) * 7);
                aT = 6
            }
            aI.title = aL(aO, aH("titleFormat"));
            aI.start = aO;
            aI.end = aR;
            aI.visStart = aV;
            aI.visEnd = aS;
            aG(aT, aP ? 5 : 7, true)
        }
    }
    ab.basicWeek = ax;

    function ax(aK, aM) {
        var aJ = this;
        aJ.render = aL;
        x.call(aJ, aK, aM, "basicWeek");
        var aI = aJ.opt;
        var aH = aJ.renderBasic;
        var aG = aM.formatDates;

        function aL(aR, aT) {
            if (aT) {
                ay(aR, aT * 7)
            }
            var aS = ay(K(aR), -((aR.getDay() - aI("firstDay") + 7) % 7));
            var aP = ay(K(aS), 7);
            var aO = K(aS);
            var aN = K(aP);
            var aQ = aI("weekends");
            if (!aQ) {
                aD(aO);
                aD(aN, -1, true)
            }
            aJ.title = aG(aO, ay(K(aN), -1), aI("titleFormat"));
            aJ.start = aS;
            aJ.end = aP;
            aJ.visStart = aO;
            aJ.visEnd = aN;
            aH(1, aQ ? 7 : 5, false)
        }
    }
    ab.basicDay = H;

    function H(aJ, aM) {
        var aI = this;
        aI.render = aK;
        x.call(aI, aJ, aM, "basicDay");
        var aH = aI.opt;
        var aG = aI.renderBasic;
        var aL = aM.formatDate;

        function aK(aN, aO) {
            if (aO) {
                ay(aN, aO);
                if (!aH("weekends")) {
                    aD(aN, aO < 0 ? -1 : 1)
                }
            }
            aI.title = aL(aN, aH("titleFormat"));
            aI.start = aI.visStart = K(aN, true);
            aI.end = aI.visEnd = ay(K(aI.start), 1);
            aG(1, 1, false)
        }
    }
    ag({
        weekMode: "fixed"
    });

    function x(aY, bs, aP) {
        var br = this;
        br.renderBasic = bj;
        br.setHeight = bp;
        br.setWidth = bA;
        br.renderDayOverlay = bg;
        br.defaultSelectionEnd = bf;
        br.renderSelection = bt;
        br.clearSelection = aG;
        br.reportDayClick = aW;
        br.dragStart = aI;
        br.dragStop = aQ;
        br.defaultEventEnd = bH;
        br.getHoverListener = function() {
            return aJ
        };
        br.colContentLeft = bo;
        br.colContentRight = bl;
        br.dayOfWeekCol = ba;
        br.dateCell = bm;
        br.cellDate = bG;
        br.cellIsAllDay = function() {
            return true
        };
        br.allDayRow = aV;
        br.allDayBounds = bx;
        br.getRowCnt = function() {
            return a7
        };
        br.getColCnt = function() {
            return aL
        };
        br.getColWidth = function() {
            return bb
        };
        br.getDaySegmentContainer = function() {
            return aT
        };
        az.call(br, aY, bs, aP);
        a.call(br);
        aj.call(br);
        ai.call(br);
        var a3 = br.opt;
        var bh = br.trigger;
        var be = br.clearEvents;
        var bD = br.renderOverlay;
        var aO = br.clearOverlays;
        var bn = br.daySelectionMousedown;
        var bq = bs.formatDate;
        var a5;
        var aX;
        var aR;
        var a9;
        var aN;
        var aZ;
        var bc;
        var bk;
        var aT;
        var bE;
        var bJ;
        var bb;
        var aS;
        var a7, aL;
        var bv;
        var aJ;
        var by;
        var bu, bI, bF;
        var a6;
        var a2;
        var bK;
        var aM;
        var a1;
        var bw;
        var bd;
        aF(aY.addClass("fc-grid"));

        function bj(bM, bO, bL) {
            a7 = bM;
            aL = bO;
            bB();
            var bN = !a9;
            if (bN) {
                aH()
            } else {
                be()
            }
            a8(bL)
        }

        function bB() {
            bu = a3("isRTL");
            if (bu) {
                bI = -1;
                bF = aL - 1
            } else {
                bI = 1;
                bF = 0
            }
            a6 = a3("firstDay");
            a2 = a3("weekends") ? 0 : 1;
            bK = a3("theme") ? "ui" : "fc";
            aM = a3("columnFormat");
            a1 = a3("weekNumbers");
            bw = a3("weekNumberTitle");
            if (a3("weekNumberCalculation") != "iso") {
                bd = "w"
            } else {
                bd = "W"
            }
        }

        function aH() {
            aT = ap("<div style='position:absolute;z-index:8;top:0;left:0'/>").appendTo(aY)
        }

        function a8(bU) {
            var bQ = "";
            var bP, bO;
            var bL = bK + "-widget-header";
            var bM = bK + "-widget-content";
            var bR = br.start.getMonth();
            var bS = b(new Date());
            var bN;
            var bT;
            var bV;
            bQ += "<table class='fc-border-separate' style='width:100%' cellspacing='0'><thead><tr>";
            if (a1) {
                bQ += "<th class='fc-week-number " + bL + "'/>"
            }
            for (bP = 0; bP < aL; bP++) {
                bN = a4(0, bP);
                bQ += "<th class='fc-day-header fc-" + N[bN.getDay()] + " " + bL + "'/>"
            }
            bQ += "</tr></thead><tbody>";
            for (bP = 0; bP < a7; bP++) {
                bQ += "<tr class='fc-week'>";
                if (a1) {
                    bQ += "<td class='fc-week-number " + bM + "'><div/></td>"
                }
                for (bO = 0; bO < aL; bO++) {
                    bN = a4(bP, bO);
                    bT = ["fc-day", "fc-" + N[bN.getDay()], bM];
                    if (bN.getMonth() != bR) {
                        bT.push("fc-other-month")
                    }
                    if (+bN == +bS) {
                        bT.push("fc-today");
                        bT.push(bK + "-state-highlight")
                    }
                    bQ += "<td class='" + bT.join(" ") + "' data-date='" + bq(bN, "yyyy-MM-dd") + "'><div>";
                    bQ += "<div style='background-color:#F1F1F1'><button type='button' class='btn btnAdicionarCompromisso' style='margin-left:5px; cursor:pointer; font-weight: normal;background-color:lightgray;border-radius:5px' onclick='adicionar_compromisso(\"" + bq(bN, "dd/MM/yyyy") + "\")'>Solicitar</button>";
                    if (bU) {
                        bQ += "<div class='fc-day-number' align='left'>" + bN.getDate() + "</div>"
                    }
                    bQ += "</div>";
                    bQ += "<div class='fc-day-content'><div style='position:relative'>&nbsp;</div></div></div></td>"
                }
                bQ += "</tr>"
            }
            bQ += "</tbody></table>";
            aU();
            if (a5) {
                a5.remove()
            }
            a5 = ap(bQ).appendTo(aY);
            aX = a5.find("thead");
            aR = aX.find(".fc-day-header");
            a9 = a5.find("tbody");
            aN = a9.find("tr");
            aZ = a9.find(".fc-day");
            bc = aN.find("td:first-child");
            bk = aN.eq(0).find(".fc-day-content > div");
            c(aX.add(aX.find("tr")));
            c(aN);
            aN.eq(0).addClass("fc-first");
            aN.filter(":last").addClass("fc-last");
            if (a1) {
                aX.find(".fc-week-number").text(bw)
            }
            aR.each(function(bX, bY) {
                var bW = bi(bX);
                ap(bY).text(bq(bW, aM))
            });
            if (a1) {
                a9.find(".fc-week-number > div").each(function(bX, bY) {
                    var bW = a4(bX, 0);
                    ap(bY).text(bq(bW, bd))
                })
            }
            aZ.each(function(bX, bY) {
                var bW = bi(bX);
                bh("dayRender", br, bW, ap(bY))
            });
            aK(aZ)
        }

        function bp(bM) {
            bJ = bM;
            var bP = bJ - aX.height();
            var bO;
            var bN;
            var bL;
            if (a3("weekMode") == "variable") {
                bO = bN = Math.floor(bP / (a7 == 1 ? 2 : 6))
            } else {
                bO = Math.floor(bP / a7);
                bN = bP - bO * (a7 - 1)
            }
            bc.each(function(bQ, bR) {
                if (bQ < a7) {
                    bL = ap(bR);
                    G(bL.find("> div"), (bQ == a7 - 1 ? bN : bO) - C(bL))
                }
            });
            a0()
        }

        function bA(bL) {
            bE = bL;
            by.clear();
            aS = 0;
            if (a1) {
                aS = aX.find("th.fc-week-number").outerWidth()
            }
            bb = Math.floor((bE - aS) / aL);
            aq(aR.slice(0, -1), bb)
        }

        function aK(bL) {
            bL.click(bC).mousedown(bn)
        }

        function bC(bM) {
            if (!a3("selectable")) {
                var bL = l(ap(this).data("date"));
                bh("dayClick", this, bL, true, bM)
            }
        }

        function bg(bQ, bU, bO) {
            if (bO) {
                bv.build()
            }
            var bL = K(br.visStart);
            var bR = ay(K(bL), aL);
            for (var bN = 0; bN < a7; bN++) {
                var bP = new Date(Math.max(bL, bQ));
                var bT = new Date(Math.min(bR, bU));
                if (bP < bT) {
                    var bM, bS;
                    if (bu) {
                        bM = av(bT, bL) * bI + bF + 1;
                        bS = av(bP, bL) * bI + bF + 1
                    } else {
                        bM = av(bP, bL);
                        bS = av(bT, bL)
                    }
                    aK(bz(bN, bM, bN, bS - 1))
                }
                ay(bL, 7);
                ay(bR, 7)
            }
        }

        function bz(bO, bP, bM, bN) {
            var bL = bv.rect(bO, bP, bM, bN, aY);
            return bD(bL, aY)
        }

        function bf(bL, bM) {
            return K(bL)
        }

        function bt(bL, bN, bM) {
            bg(bL, ay(K(bN), 1), true)
        }

        function aG() {
            aO()
        }

        function aW(bN, bP, bO) {
            var bL = bm(bN);
            var bM = aZ[bL.row * aL + bL.col];
            bh("dayClick", bM, bN, bP, bO)
        }

        function aI(bN, bL, bM) {
            aJ.start(function(bO) {
                aO();
                if (bO) {
                    bz(bO.row, bO.col, bO.row, bO.col)
                }
            }, bL)
        }

        function aQ(bP, bM, bN) {
            var bL = aJ.stop();
            aO();
            if (bL) {
                var bO = bG(bL);
                bh("drop", bP, bO, true, bM, bN)
            }
        }

        function bH(bL) {
            return K(bL.start)
        }
        bv = new M(function(bL, bO) {
            var bN, bP, bM;
            aR.each(function(bR, bQ) {
                bN = ap(bQ);
                bP = bN.offset().left;
                if (bR) {
                    bM[1] = bP
                }
                bM = [bP];
                bO[bR] = bM
            });
            bM[1] = bP + bN.outerWidth();
            aN.each(function(bR, bQ) {
                if (bR < a7) {
                    bN = ap(bQ);
                    bP = bN.offset().top;
                    if (bR) {
                        bM[1] = bP
                    }
                    bM = [bP];
                    bL[bR] = bM
                }
            });
            bM[1] = bP + bN.outerHeight()
        });
        aJ = new al(bv);
        by = new j(function(bL) {
            return bk.eq(bL)
        });

        function bo(bL) {
            return by.left(bL)
        }

        function bl(bL) {
            return by.right(bL)
        }

        function bm(bL) {
            return {
                row: Math.floor(av(bL, br.visStart) / 7),
                col: ba(bL.getDay())
            }
        }

        function bG(bL) {
            return a4(bL.row, bL.col)
        }

        function a4(bM, bL) {
            return ay(K(br.visStart), bM * 7 + bL * bI + bF)
        }

        function bi(bL) {
            return a4(Math.floor(bL / aL), bL % aL)
        }

        function ba(bL) {
            return ((bL - Math.max(a6, a2) + aL) % aL) * bI + bF
        }

        function aV(bL) {
            return aN.eq(bL)
        }

        function bx(bL) {
            var bM = 0;
            if (a1) {
                bM += aS
            }
            return {
                left: bM,
                right: bE
            }
        }

        function aU() {
            G(aY, aY.height())
        }

        function a0() {
            G(aY, 1)
        }
    }

    function ai() {
        var aR = this;
        aR.renderEvents = aM;
        aR.compileDaySegs = aQ;
        aR.clearEvents = aP;
        aR.bindDaySeg = aL;
        V.call(aR);
        var aI = aR.opt;
        var aT = aR.trigger;
        var aX = aR.isEventDraggable;
        var aZ = aR.isEventResizable;
        var aY = aR.reportEvents;
        var a2 = aR.reportEventClear;
        var aH = aR.eventElementHandlers;
        var a0 = aR.showEvents;
        var aG = aR.hideEvents;
        var aV = aR.eventDrop;
        var a3 = aR.getDaySegmentContainer;
        var a1 = aR.getHoverListener;
        var aO = aR.renderDayOverlay;
        var aU = aR.clearOverlays;
        var aK = aR.getRowCnt;
        var aW = aR.getColCnt;
        var aS = aR.renderDaySegs;
        var aN = aR.resizableDayEvent;

        function aM(a5, a4) {
            aY(a5);
            aS(aQ(a5), a4);
            aT("eventAfterAllRender")
        }

        function aP() {
            a2();
            a3().empty()
        }

        function aQ(bf) {
            var bc = aK(),
                be = aW(),
                a6 = K(aR.visStart),
                a4 = ay(K(a6), be),
                bd = ap.map(bf, ak),
                bb, bg, ba, a5, a8, a9, a7 = [];
            for (bb = 0; bb < bc; bb++) {
                bg = ae(Z(bf, bd, a6, a4));
                for (ba = 0; ba < bg.length; ba++) {
                    a5 = bg[ba];
                    for (a8 = 0; a8 < a5.length; a8++) {
                        a9 = a5[a8];
                        a9.row = bb;
                        a9.level = ba;
                        a7.push(a9)
                    }
                }
                ay(a6, 7);
                ay(a4, 7)
            }
            return a7
        }

        function aL(a6, a5, a4) {
            if (aX(a6)) {
                aJ(a6, a5)
            }
            if (a4.isEnd && aZ(a6)) {
                aN(a6, a5, a4)
            }
            aH(a6, a5)
        }

        function aJ(a7, a6) {
            var a5 = a1();
            var a4;
            a6.draggable({
                zIndex: 9,
                delay: 50,
                opacity: aI("dragOpacity"),
                revertDuration: aI("dragRevertDuration"),
                start: function(a8, a9) {
                    aT("eventDragStart", a6, a7, a8, a9);
                    aG(a7, a6);
                    a5.start(function(bb, ba, bc, bd) {
                        a6.draggable("option", "revert", !bb || !bc && !bd);
                        aU();
                        if (bb) {
                            a4 = bc * 7 + bd * (aI("isRTL") ? -1 : 1);
                            aO(ay(K(a7.start), a4), ay(ak(a7), a4))
                        } else {
                            a4 = 0
                        }
                    }, a8, "drag")
                },
                stop: function(a8, a9) {
                    a5.stop();
                    aU();
                    aT("eventDragStop", a6, a7, a8, a9);
                    if (a4) {
                        aV(this, a7, a4, 0, a7.allDay, a8, a9)
                    } else {
                        a6.css("filter", "");
                        a0(a7, a6)
                    }
                }
            })
        }
    }
    ab.agendaWeek = e;

    function e(aK, aM) {
        var aJ = this;
        aJ.render = aL;
        D.call(aJ, aK, aM, "agendaWeek");
        var aI = aJ.opt;
        var aH = aJ.renderAgenda;
        var aG = aM.formatDates;

        function aL(aR, aT) {
            if (aT) {
                ay(aR, aT * 7)
            }
            var aS = ay(K(aR), -((aR.getDay() - aI("firstDay") + 7) % 7));
            var aP = ay(K(aS), 7);
            var aO = K(aS);
            var aN = K(aP);
            var aQ = aI("weekends");
            if (!aQ) {
                aD(aO);
                aD(aN, -1, true)
            }
            aJ.title = aG(aO, ay(K(aN), -1), aI("titleFormat"));
            aJ.start = aS;
            aJ.end = aP;
            aJ.visStart = aO;
            aJ.visEnd = aN;
            aH(aQ ? 7 : 5)
        }
    }
    ab.agendaDay = at;

    function at(aJ, aM) {
        var aI = this;
        aI.render = aK;
        D.call(aI, aJ, aM, "agendaDay");
        var aH = aI.opt;
        var aG = aI.renderAgenda;
        var aL = aM.formatDate;

        function aK(aO, aQ) {
            if (aQ) {
                ay(aO, aQ);
                if (!aH("weekends")) {
                    aD(aO, aQ < 0 ? -1 : 1)
                }
            }
            var aP = K(aO, true);
            var aN = ay(K(aP), 1);
            aI.title = aL(aO, aH("titleFormat"));
            aI.start = aI.visStart = aP;
            aI.end = aI.visEnd = aN;
            aG(1)
        }
    }
    ag({
        allDaySlot: true,
        allDayText: "all-day",
        firstHour: 6,
        slotMinutes: 30,
        defaultEventMinutes: 120,
        axisFormat: "h(:mm)tt",
        timeFormat: {
            agenda: "h:mm{ - h:mm}"
        },
        dragOpacity: {
            agenda: 0.5
        },
        minTime: 0,
        maxTime: 24
    });

    function D(b9, aY, bc) {
        var a9 = this;
        a9.renderAgenda = aS;
        a9.setWidth = bn;
        a9.setHeight = bj;
        a9.beforeHide = bh;
        a9.afterShow = bZ;
        a9.defaultEventEnd = bT;
        a9.timePosition = cc;
        a9.dayOfWeekCol = aT;
        a9.dateCell = b4;
        a9.cellDate = aK;
        a9.cellIsAllDay = b3;
        a9.allDayRow = bF;
        a9.allDayBounds = br;
        a9.getHoverListener = function() {
            return b8
        };
        a9.colContentLeft = cd;
        a9.colContentRight = aP;
        a9.getDaySegmentContainer = function() {
            return a4
        };
        a9.getSlotSegmentContainer = function() {
            return aN
        };
        a9.getMinMinute = function() {
            return bf
        };
        a9.getMaxMinute = function() {
            return aI
        };
        a9.getBodyContent = function() {
            return bE
        };
        a9.getRowCnt = function() {
            return 1
        };
        a9.getColCnt = function() {
            return bH
        };
        a9.getColWidth = function() {
            return aQ
        };
        a9.getSnapHeight = function() {
            return b5
        };
        a9.getSnapMinutes = function() {
            return bs
        };
        a9.defaultSelectionEnd = bm;
        a9.renderDayOverlay = aL;
        a9.renderSelection = b2;
        a9.clearSelection = bW;
        a9.reportDayClick = a7;
        a9.dragStart = aR;
        a9.dragStop = ca;
        az.call(a9, b9, aY, bc);
        a.call(a9);
        aj.call(a9);
        R.call(a9);
        var bC = a9.opt;
        var bG = a9.trigger;
        var bB = a9.clearEvents;
        var bq = a9.renderOverlay;
        var aJ = a9.clearOverlays;
        var bt = a9.reportSelection;
        var b0 = a9.unselect;
        var by = a9.daySelectionMousedown;
        var a0 = a9.slotSegHtml;
        var a5 = aY.formatDate;
        var bQ;
        var b6;
        var bV;
        var bU;
        var bb;
        var aM;
        var bS;
        var bO;
        var cb;
        var a4;
        var b7;
        var bY;
        var bo;
        var bE;
        var aN;
        var aU;
        var bN;
        var bg;
        var a6;
        var aO;
        var bv;
        var bL;
        var bk;
        var aQ;
        var bz;
        var bI;
        var bs;
        var aZ;
        var b5;
        var bH;
        var bM;
        var bJ;
        var b8;
        var bw;
        var bd = {};
        var aG;
        var bp;
        var bi;
        var bA;
        var aH, a2, a1;
        var bf, aI;
        var aW;
        var bR;
        var bD;
        var bu;
        aF(b9.addClass("fc-agenda"));

        function aS(ce) {
            bH = ce;
            bK();
            if (!bQ) {
                ba()
            } else {
                bB()
            }
            aX()
        }

        function bK() {
            bp = bC("theme") ? "ui" : "fc";
            bA = bC("weekends") ? 0 : 1;
            bi = bC("firstDay");
            if (aH = bC("isRTL")) {
                a2 = -1;
                a1 = bH - 1
            } else {
                a2 = 1;
                a1 = 0
            }
            bf = aC(bC("minTime"));
            aI = aC(bC("maxTime"));
            aW = bC("columnFormat");
            bR = bC("weekNumbers");
            bD = bC("weekNumberTitle");
            if (bC("weekNumberCalculation") != "iso") {
                bu = "w"
            } else {
                bu = "W"
            }
            bs = bC("snapMinutes") || bC("slotMinutes")
        }

        function ba() {
            var cj = bp + "-widget-header";
            var ce = bp + "-widget-content";
            var ci;
            var ch;
            var cl;
            var ck;
            var cg;
            var cf = bC("slotMinutes") % 15 == 0;
            ci = "<table style='width:100%' class='fc-agenda-days fc-border-separate' cellspacing='0'><thead><tr>";
            if (bR) {
                ci += "<th class='fc-agenda-axis fc-week-number " + cj + "'/>"
            } else {
                ci += "<th class='fc-agenda-axis " + cj + "'>&nbsp;</th>"
            }
            for (ch = 0; ch < bH; ch++) {
                ci += "<th class='fc- fc-col" + ch + " " + cj + "'/>"
            }
            ci += "<th class='fc-agenda-gutter " + cj + "'>&nbsp;</th></tr></thead><tbody><tr><th class='fc-agenda-axis " + cj + "'>&nbsp;</th>";
            for (ch = 0; ch < bH; ch++) {
                ci += "<td class='fc- fc-col" + ch + " " + ce + "'><div><div class='fc-day-content'><div style='position:relative'>&nbsp;</div></div></div></td>"
            }
            ci += "<td class='fc-agenda-gutter " + ce + "'>&nbsp;</td></tr></tbody></table>";
            bQ = ap(ci).appendTo(b9);
            b6 = bQ.find("thead");
            bV = b6.find("th").slice(1, -1);
            bU = bQ.find("tbody");
            bb = bU.find("td").slice(0, -1);
            aM = bb.find("div.fc-day-content div");
            bS = bb.eq(0);
            bO = bS.find("> div");
            c(b6.add(b6.find("tr")));
            c(bU.add(bU.find("tr")));
            bg = b6.find("th:first");
            a6 = bQ.find(".fc-agenda-gutter");
            cb = ap("<div style='position:absolute;z-index:2;left:0;width:100%'/>").appendTo(b9);
            if (bC("allDaySlot")) {
                a4 = ap("<div style='position:absolute;z-index:8;top:0;left:0'/>").appendTo(cb);
                ci = "<table style='width:100%' class='fc-agenda-allday' cellspacing='0'><tr><th class='" + cj + " fc-agenda-axis'>" + bC("allDayText") + "</th><td><div class='fc-day-content'><div style='position:relative'/></div></td><th class='" + cj + " fc-agenda-gutter'>&nbsp;</th></tr></table>";
                b7 = ap(ci).appendTo(cb);
                bY = b7.find("tr");
                bl(bY.find("td"));
                bg = bg.add(b7.find("th:first"));
                a6 = a6.add(b7.find("th.fc-agenda-gutter"));
                cb.append("<div class='fc-agenda-divider " + cj + "'><div class='fc-agenda-divider-inner'/></div>")
            } else {
                a4 = ap([])
            }
            bo = ap("<div style='position:absolute;width:100%;overflow-x:hidden;overflow-y:auto'/>").appendTo(cb);
            bE = ap("<div style='position:relative;width:100%;overflow:hidden'/>").appendTo(bo);
            aN = ap("<div style='position:absolute;z-index:8;top:0;left:0'/>").appendTo(bE);
            ci = "<table class='fc-agenda-slots' style='width:100%' cellspacing='0'><tbody>";
            cl = d();
            ck = g(K(cl), aI);
            g(cl, bf);
            bM = 0;
            for (ch = 0; cl < ck; ch++) {
                cg = cl.getMinutes();
                ci += "<tr class='fc-slot" + ch + " " + (!cg ? "" : "fc-minor") + "'><th class='fc-agenda-axis " + cj + "'>" + ((!cf || !cg) ? a5(cl, bC("axisFormat")) : "&nbsp;") + "</th><td class='" + ce + "'><div style='position:relative'>&nbsp;</div></td></tr>";
                g(cl, bC("slotMinutes"));
                bM++
            }
            ci += "</tbody></table>";
            aU = ap(ci).appendTo(bE);
            bN = aU.find("div:first");
            bX(aU.find("td"));
            bg = bg.add(aU.find("th:first"))
        }

        function aX() {
            var ch;
            var ce;
            var cj;
            var cg;
            var cf = b(new Date());
            if (bR) {
                var ci = a5(bx(0), bu);
                if (aH) {
                    ci = ci + bD
                } else {
                    ci = bD + ci
                }
                b6.find(".fc-week-number").text(ci)
            }
            for (ch = 0; ch < bH; ch++) {
                cg = bx(ch);
                ce = bV.eq(ch);
                ce.html(a5(cg, aW));
                cj = bb.eq(ch);
                if (+cg == +cf) {
                    cj.addClass(bp + "-state-highlight fc-today")
                } else {
                    cj.removeClass(bp + "-state-highlight fc-today")
                }
                I(ce.add(cj), cg)
            }
        }

        function bj(ce, cf) {
            if (ce === t) {
                ce = bL
            }
            bL = ce;
            bd = {};
            var ch = bU.position().top;
            var cg = bo.position().top;
            var ci = Math.min(ce - ch, aU.height() + cg + 1);
            bO.height(ci - C(bS));
            cb.css("top", ch);
            bo.height(ci - cg - 1);
            bI = bN.height() + 1;
            aZ = bC("slotMinutes") / bs;
            b5 = bI / aZ;
            if (cf) {
                be()
            }
        }

        function bn(cf) {
            bv = cf;
            bw.clear();
            bk = 0;
            aq(bg.width("").each(function(cg, ch) {
                bk = Math.max(bk, ap(ch).outerWidth())
            }), bk);
            var ce = bo[0].clientWidth;
            bz = bo.width() - ce;
            if (bz) {
                aq(a6, bz);
                a6.show().prev().removeClass("fc-last")
            } else {
                a6.hide().prev().addClass("fc-last")
            }
            aQ = Math.floor((ce - bk) / bH);
            aq(bV.slice(0, -1), aQ)
        }

        function be() {
            var ch = d();
            var cf = K(ch);
            cf.setHours(bC("firstHour"));
            var cg = cc(ch, cf) + 1;

            function ce() {
                bo.scrollTop(cg)
            }
            ce();
            setTimeout(ce, 0)
        }

        function bh() {
            aG = bo.scrollTop()
        }

        function bZ() {
            bo.scrollTop(aG)
        }

        function bl(ce) {
            ce.click(bP).mousedown(by)
        }

        function bX(ce) {
            ce.click(bP).mousedown(aV)
        }

        function bP(ci) {
            if (!bC("selectable")) {
                var cg = Math.min(bH - 1, Math.floor((ci.pageX - bQ.offset().left - bk) / aQ));
                var cf = bx(cg);
                var cj = this.parentNode.className.match(/fc-slot(\d+)/);
                if (cj) {
                    var ch = parseInt(cj[1]) * bC("slotMinutes");
                    var ce = Math.floor(ch / 60);
                    cf.setHours(ce);
                    cf.setMinutes(ch % 60 + bf);
                    bG("dayClick", bb[cg], cf, false, ci)
                } else {
                    bG("dayClick", bb[cg], cf, true, ci)
                }
            }
        }

        function aL(ce, cj, cg) {
            if (cg) {
                bJ.build()
            }
            var cf = K(a9.visStart);
            var ci, ch;
            if (aH) {
                ci = av(cj, cf) * a2 + a1 + 1;
                ch = av(ce, cf) * a2 + a1 + 1
            } else {
                ci = av(ce, cf);
                ch = av(cj, cf)
            }
            ci = Math.max(0, ci);
            ch = Math.min(bH, ch);
            if (ci < ch) {
                bl(a3(0, ci, 0, ch - 1))
            }
        }

        function a3(ch, ci, cf, cg) {
            var ce = bJ.rect(ch, ci, cf, cg, cb);
            return bq(ce, cb)
        }

        function a8(cj, co) {
            var ck = K(a9.visStart);
            var cf = ay(K(ck), 1);
            for (var ch = 0; ch < bH; ch++) {
                var ci = new Date(Math.max(ck, cj));
                var cn = new Date(Math.min(cf, co));
                if (ci < cn) {
                    var cg = ch * a2 + a1;
                    var cm = bJ.rect(0, cg, 0, cg, bE);
                    var cl = cc(ck, ci);
                    var ce = cc(ck, cn);
                    cm.top = cl;
                    cm.height = ce - cl;
                    bX(bq(cm, bE))
                }
                ay(ck, 1);
                ay(cf, 1)
            }
        }
        bJ = new M(function(cm, ck) {
            var ci, cf, ce;
            bV.each(function(cp, co) {
                ci = ap(co);
                cf = ci.offset().left;
                if (cp) {
                    ce[1] = cf
                }
                ce = [cf];
                ck[cp] = ce
            });
            ce[1] = cf + ci.outerWidth();
            if (bC("allDaySlot")) {
                ci = bY;
                cf = ci.offset().top;
                cm[0] = [cf, cf + ci.outerHeight()]
            }
            var cl = bE.offset().top;
            var cn = bo.offset().top;
            var ch = cn + bo.outerHeight();

            function cj(co) {
                return Math.max(cn, Math.min(ch, co))
            }
            for (var cg = 0; cg < bM * aZ; cg++) {
                cm.push([cj(cl + b5 * cg), cj(cl + b5 * (cg + 1))])
            }
        });
        b8 = new al(bJ);
        bw = new j(function(ce) {
            return aM.eq(ce)
        });

        function cd(ce) {
            return bw.left(ce)
        }

        function aP(ce) {
            return bw.right(ce)
        }

        function b4(ce) {
            return {
                row: Math.floor(av(ce, a9.visStart) / 7),
                col: aT(ce.getDay())
            }
        }

        function aK(ce) {
            var cg = bx(ce.col);
            var cf = ce.row;
            if (bC("allDaySlot")) {
                cf--
            }
            if (cf >= 0) {
                g(cg, bf + cf * bs)
            }
            return cg
        }

        function bx(ce) {
            return ay(K(a9.visStart), ce * a2 + a1)
        }

        function b3(ce) {
            return bC("allDaySlot") && !ce.row
        }

        function aT(ce) {
            return ((ce - Math.max(bi, bA) + bH) % bH) * a2 + a1
        }

        function cc(cf, cj) {
            cf = K(cf, true);
            if (cj < g(K(cf), bf)) {
                return 0
            }
            if (cj >= g(K(cf), aI)) {
                return aU.height()
            }
            var ce = bC("slotMinutes"),
                ci = cj.getHours() * 60 + cj.getMinutes() - bf,
                ch = Math.floor(ci / ce),
                cg = bd[ch];
            if (cg === t) {
                cg = bd[ch] = aU.find("tr:eq(" + ch + ") td div")[0].offsetTop
            }
            return Math.max(0, Math.round(cg - 1 + bI * ((ci % ce) / ce)))
        }

        function br() {
            return {
                left: bk,
                right: bv - bz
            }
        }

        function bF(ce) {
            return bY
        }

        function bT(ce) {
            var cf = K(ce.start);
            if (ce.allDay) {
                return cf
            }
            return g(cf, bC("defaultEventMinutes"))
        }

        function bm(ce, cf) {
            if (cf) {
                return K(ce)
            }
            return g(K(ce), bC("slotMinutes"))
        }

        function b2(ce, cg, cf) {
            if (cf) {
                if (bC("allDaySlot")) {
                    aL(ce, ay(K(cg), 1), true)
                }
            } else {
                b1(ce, cg)
            }
        }

        function b1(ce, ck) {
            var ci = bC("selectHelper");
            bJ.build();
            if (ci) {
                var cg = av(ce, a9.visStart) * a2 + a1;
                if (cg >= 0 && cg < bH) {
                    var ch = bJ.rect(0, cg, 0, cg, bE);
                    var cj = cc(ce, ce);
                    var cf = cc(ce, ck);
                    if (cf > cj) {
                        ch.top = cj;
                        ch.height = cf - cj;
                        ch.left += 2;
                        ch.width -= 5;
                        if (ap.isFunction(ci)) {
                            var cl = ci(ce, ck);
                            if (cl) {
                                ch.position = "absolute";
                                ch.zIndex = 8;
                                aO = ap(cl).css(ch).appendTo(bE)
                            }
                        } else {
                            ch.isStart = true;
                            ch.isEnd = true;
                            aO = ap(a0({
                                title: "",
                                start: ce,
                                end: ck,
                                className: ["fc-select-helper"],
                                editable: false
                            }, ch));
                            aO.css("opacity", bC("dragOpacity"))
                        }
                        if (aO) {
                            bX(aO);
                            bE.append(aO);
                            aq(aO, ch.width, true);
                            W(aO, ch.height, true)
                        }
                    }
                }
            } else {
                a8(ce, ck)
            }
        }

        function bW() {
            aJ();
            if (aO) {
                aO.remove();
                aO = null
            }
        }

        function aV(ce) {
            if (ce.which == 1 && bC("selectable")) {
                b0(ce);
                var cf;
                b8.start(function(ch, cg) {
                    bW();
                    if (ch && ch.col == cg.col && !b3(ch)) {
                        var cj = aK(cg);
                        var ci = aK(ch);
                        cf = [cj, g(K(cj), bs), ci, g(K(ci), bs)].sort(U);
                        b1(cf[0], cf[3])
                    } else {
                        cf = null
                    }
                }, ce);
                ap(document).one("mouseup", function(cg) {
                    b8.stop();
                    if (cf) {
                        if (+cf[0] == +cf[1]) {
                            a7(cf[0], false, cg)
                        }
                        bt(cf[0], cf[3], false, cg)
                    }
                })
            }
        }

        function a7(ce, cg, cf) {
            bG("dayClick", bb[aT(ce.getDay())], ce, cg, cf)
        }

        function aR(cg, ce, cf) {
            b8.start(function(ch) {
                aJ();
                if (ch) {
                    if (b3(ch)) {
                        a3(ch.row, ch.col, ch.row, ch.col)
                    } else {
                        var cj = aK(ch);
                        var ci = g(K(cj), bC("defaultEventMinutes"));
                        a8(cj, ci)
                    }
                }
            }, ce)
        }

        function ca(ch, cf, cg) {
            var ce = b8.stop();
            aJ();
            if (ce) {
                bG("drop", ch, aK(ce), b3(ce), cf, cg)
            }
        }
    }

    function R() {
        var bh = this;
        bh.renderEvents = aL;
        bh.compileDaySegs = aG;
        bh.clearEvents = a2;
        bh.slotSegHtml = a3;
        bh.bindDaySeg = a0;
        V.call(bh);
        var aV = bh.opt;
        var a4 = bh.trigger;
        var aJ = bh.isEventDraggable;
        var bm = bh.isEventResizable;
        var bn = bh.eventEnd;
        var aP = bh.reportEvents;
        var bq = bh.reportEventClear;
        var a7 = bh.eventElementHandlers;
        var bc = bh.setHeight;
        var aK = bh.getDaySegmentContainer;
        var bp = bh.getSlotSegmentContainer;
        var aI = bh.getHoverListener;
        var aH = bh.getMaxMinute;
        var a9 = bh.getMinMinute;
        var aO = bh.timePosition;
        var bb = bh.colContentLeft;
        var ba = bh.colContentRight;
        var be = bh.renderDaySegs;
        var a8 = bh.resizableDayEvent;
        var bd = bh.getColCnt;
        var aW = bh.getColWidth;
        var bg = bh.getSnapHeight;
        var aR = bh.getSnapMinutes;
        var a1 = bh.getBodyContent;
        var aT = bh.reportEventElement;
        var aM = bh.showEvents;
        var aU = bh.hideEvents;
        var bk = bh.eventDrop;
        var aY = bh.eventResize;
        var a5 = bh.renderDayOverlay;
        var aN = bh.clearOverlays;
        var bi = bh.calendar;
        var bf = bi.formatDate;
        var aX = bi.formatDates;

        function aL(bv, bt) {
            aP(bv);
            var bu, bs = bv.length,
                bw = [],
                br = [];
            for (bu = 0; bu < bs; bu++) {
                if (bv[bu].allDay) {
                    bw.push(bv[bu])
                } else {
                    br.push(bv[bu])
                }
            }
            if (aV("allDaySlot")) {
                be(aG(bw), bt);
                bc()
            }
            aQ(aZ(br), bt);
            a4("eventAfterAllRender")
        }

        function a2() {
            bq();
            aK().empty();
            bp().empty()
        }

        function aG(bv) {
            var bx = ae(Z(bv, ap.map(bv, ak), bh.visStart, bh.visEnd)),
                bu, bw = bx.length,
                by, bt, bs, br = [];
            for (bu = 0; bu < bw; bu++) {
                by = bx[bu];
                for (bt = 0; bt < by.length; bt++) {
                    bs = by[bt];
                    bs.row = 0;
                    bs.level = bu;
                    br.push(bs)
                }
            }
            return br
        }

        function aZ(bD) {
            var bC = bd(),
                bA = a9(),
                bu = aH(),
                bB = g(K(bh.visStart), bA),
                by = ap.map(bD, bo),
                bz, bt, bx, br, bv, bw, bs = [];
            for (bz = 0; bz < bC; bz++) {
                bt = ae(Z(bD, by, bB, g(K(bB), bu - bA)));
                A(bt);
                for (bx = 0; bx < bt.length; bx++) {
                    br = bt[bx];
                    for (bv = 0; bv < br.length; bv++) {
                        bw = br[bv];
                        bw.col = bz;
                        bw.level = bx;
                        bs.push(bw)
                    }
                }
                ay(bB, 1, true)
            }
            return bs
        }

        function bo(br) {
            if (br.end) {
                return K(br.end)
            } else {
                return g(K(br.start), aV("defaultEventMinutes"))
            }
        }

        function aQ(bH, bI) {
            var bN, bQ = bH.length,
                bP, bL, bR, bC, bz, by, bt, bA, bx, bK, br, bu, bB = "",
                bS, bO, bw, bs = {},
                bV = {},
                bU, bT, bF, bE, bM = bp(),
                bv, bG, bD, bJ = bd();
            if (bv = aV("isRTL")) {
                bG = -1;
                bD = bJ - 1
            } else {
                bG = 1;
                bD = 0
            }
            for (bN = 0; bN < bQ; bN++) {
                bP = bH[bN];
                bL = bP.event;
                bC = aO(bP.start, bP.start);
                bz = aO(bP.start, bP.end);
                by = bP.col;
                bt = bP.level;
                bA = bP.forward || 0;
                bx = bb(by * bG + bD);
                bK = ba(by * bG + bD) - bx;
                bK = Math.min(bK - 6, bK * 0.95);
                if (bt) {
                    br = bK / (bt + bA + 1)
                } else {
                    if (bA) {
                        br = ((bK / (bA + 1)) - (12 / 2)) * 2
                    } else {
                        br = bK
                    }
                }
                bu = bx + (bK / (bt + bA + 1) * bt) * bG + (bv ? bK - br : 0);
                bP.top = bC;
                bP.left = bu;
                bP.outerWidth = br;
                bP.outerHeight = bz - bC;
                bB += a3(bL, bP)
            }
            bM[0].innerHTML = bB;
            bS = bM.children();
            for (bN = 0; bN < bQ; bN++) {
                bP = bH[bN];
                bL = bP.event;
                bO = ap(bS[bN]);
                bw = a4("eventRender", bL, bL, bO);
                if (bw === false) {
                    bO.remove()
                } else {
                    if (bw && bw !== true) {
                        bO.remove();
                        bO = ap(bw).css({
                            position: "absolute",
                            top: bP.top,
                            left: bP.left
                        }).appendTo(bM)
                    }
                    bP.element = bO;
                    if (bL._id === bI) {
                        bj(bL, bO, bP)
                    } else {
                        bO[0]._fci = bN
                    }
                    aT(bL, bO)
                }
            }
            s(bM, bH, bj);
            for (bN = 0; bN < bQ; bN++) {
                bP = bH[bN];
                if (bO = bP.element) {
                    bT = bs[bU = bP.key = E(bO[0])];
                    bP.vsides = bT === t ? (bs[bU] = C(bO, true)) : bT;
                    bT = bV[bU];
                    bP.hsides = bT === t ? (bV[bU] = f(bO, true)) : bT;
                    bF = bO.find(".fc-event-title");
                    if (bF.length) {
                        bP.contentTop = bF[0].offsetTop
                    }
                }
            }
            for (bN = 0; bN < bQ; bN++) {
                bP = bH[bN];
                if (bO = bP.element) {
                    bO[0].style.width = Math.max(0, bP.outerWidth - bP.hsides) + "px";
                    bE = Math.max(0, bP.outerHeight - bP.vsides);
                    bO[0].style.height = bE + "px";
                    bL = bP.event;
                    if (bP.contentTop !== t && bE - bP.contentTop < 10) {
                        bO.find("div.fc-event-time").text(bf(bL.start, aV("timeFormat")) + " - " + bL.title);
                        bO.find("div.fc-event-title").remove()
                    }
                    a4("eventAfterRender", bL, bL, bO)
                }
            }
        }

        function a3(bw, br) {
            var bv = "<";
            var bt = bw.url;
            var bs = O(bw, aV);
            var bu = ["fc-event", "fc-event-vert"];
            if (aJ(bw)) {
                bu.push("fc-event-draggable")
            }
            if (br.isStart) {
                bu.push("fc-event-start")
            }
            if (br.isEnd) {
                bu.push("fc-event-end")
            }
            bu = bu.concat(bw.className);
            if (bw.source) {
                bu = bu.concat(bw.source.className || [])
            }
            if (bt) {
                bv += "a href='" + aB(bw.url) + "'"
            } else {
                bv += "div"
            }
            bv += " class='" + bu.join(" ") + "' style='position:absolute;z-index:8;top:" + br.top + "px;left:" + br.left + "px;" + bs + "'><div class='fc-event-inner'><div class='fc-event-time'>" + aB(aX(bw.start, bw.end, aV("timeFormat"))) + "</div><div class='fc-event-title'>" + aB(bw.title) + "</div></div><div class='fc-event-bg'></div>";
            if (br.isEnd && bm(bw)) {
                bv += "<div class='ui-resizable-handle ui-resizable-s'>=</div>"
            }
            bv += "</" + (bt ? "a" : "div") + ">";
            return bv
        }

        function a0(bt, bs, br) {
            if (aJ(bt)) {
                aS(bt, bs, br.isStart)
            }
            if (br.isEnd && bm(bt)) {
                a8(bt, bs, br)
            }
            a7(bt, bs)
        }

        function bj(bt, bs, br) {
            var bu = bs.find("div.fc-event-time");
            if (aJ(bt)) {
                a6(bt, bs, bu)
            }
            if (br.isEnd && bm(bt)) {
                bl(bt, bs, bu)
            }
            a7(bt, bs)
        }

        function aS(bs, bB, br) {
            var bC;
            var bA;
            var bE = true;
            var bw;
            var bu = aV("isRTL") ? -1 : 1;
            var bv = aI();
            var bx = aW();
            var bt = bg();
            var bD = aR();
            var bz = a9();
            bB.draggable({
                zIndex: 9,
                opacity: aV("dragOpacity", "month"),
                revertDuration: aV("dragRevertDuration"),
                start: function(bF, bG) {
                    a4("eventDragStart", bB, bs, bF, bG);
                    aU(bs, bB);
                    bC = bB.width();
                    bv.start(function(bI, bH, bJ, bK) {
                        aN();
                        if (bI) {
                            bA = false;
                            bw = bK * bu;
                            if (!bI.row) {
                                a5(ay(K(bs.start), bw), ay(ak(bs), bw));
                                by()
                            } else {
                                if (br) {
                                    if (bE) {
                                        bB.width(bx - 10);
                                        W(bB, bt * Math.round((bs.end ? ((bs.end - bs.start) / S) : aV("defaultEventMinutes")) / bD));
                                        bB.draggable("option", "grid", [bx, 1]);
                                        bE = false
                                    }
                                } else {
                                    bA = true
                                }
                            }
                            bA = bA || (bE && !bw)
                        } else {
                            by();
                            bA = true
                        }
                        bB.draggable("option", "revert", bA)
                    }, bF, "drag")
                },
                stop: function(bG, bH) {
                    bv.stop();
                    aN();
                    a4("eventDragStop", bB, bs, bG, bH);
                    if (bA) {
                        by();
                        bB.css("filter", "");
                        aM(bs, bB)
                    } else {
                        var bF = 0;
                        if (!bE) {
                            bF = Math.round((bB.offset().top - a1().offset().top) / bt) * bD + bz - (bs.start.getHours() * 60 + bs.start.getMinutes())
                        }
                        bk(this, bs, bw, bF, bE, bG, bH)
                    }
                }
            });

            function by() {
                if (!bE) {
                    bB.width(bC).height("").draggable("option", "grid", null);
                    bE = true
                }
            }
        }

        function a6(br, bC, bD) {
            var bw;
            var bG = false;
            var bx;
            var bB;
            var bz;
            var bt = aV("isRTL") ? -1 : 1;
            var bv = aI();
            var bE = bd();
            var by = aW();
            var bs = bg();
            var bF = aR();
            bC.draggable({
                zIndex: 9,
                scroll: false,
                grid: [by, bs],
                axis: bE == 1 ? "y" : false,
                opacity: aV("dragOpacity"),
                revertDuration: aV("dragRevertDuration"),
                start: function(bH, bI) {
                    a4("eventDragStart", bC, br, bH, bI);
                    aU(br, bC);
                    bw = bC.position();
                    bB = bz = 0;
                    bv.start(function(bK, bJ, bL, bM) {
                        bC.draggable("option", "revert", !bK);
                        aN();
                        if (bK) {
                            bx = bM * bt;
                            if (aV("allDaySlot") && !bK.row) {
                                if (!bG) {
                                    bG = true;
                                    bD.hide();
                                    bC.draggable("option", "grid", null)
                                }
                                a5(ay(K(br.start), bx), ay(ak(br), bx))
                            } else {
                                bA()
                            }
                        }
                    }, bH, "drag")
                },
                drag: function(bH, bI) {
                    bB = Math.round((bI.position.top - bw.top) / bs) * bF;
                    if (bB != bz) {
                        if (!bG) {
                            bu(bB)
                        }
                        bz = bB
                    }
                },
                stop: function(bI, bJ) {
                    var bH = bv.stop();
                    aN();
                    a4("eventDragStop", bC, br, bI, bJ);
                    if (bH && (bx || bB || bG)) {
                        bk(this, br, bx, bG ? 0 : bB, bG, bI, bJ)
                    } else {
                        bA();
                        bC.css("filter", "");
                        bC.css(bw);
                        bu(0);
                        aM(br, bC)
                    }
                }
            });

            function bu(bI) {
                var bH = g(K(br.start), bI);
                var bJ;
                if (br.end) {
                    bJ = g(K(br.end), bI)
                }
                bD.text(aX(bH, bJ, aV("timeFormat")))
            }

            function bA() {
                if (bG) {
                    bD.css("display", "");
                    bC.draggable("option", "grid", [by, bs]);
                    bG = false
                }
            }
        }

        function bl(bv, bt, bw) {
            var bu, br;
            var bx = bg();
            var bs = aR();
            bt.resizable({
                handles: {
                    s: ".ui-resizable-handle"
                },
                grid: bx,
                start: function(by, bz) {
                    bu = br = 0;
                    aU(bv, bt);
                    bt.css("z-index", 9);
                    a4("eventResizeStart", this, bv, by, bz)
                },
                resize: function(by, bz) {
                    bu = Math.round((Math.max(bx, bt.height()) - bz.originalSize.height) / bx);
                    if (bu != br) {
                        bw.text(aX(bv.start, (!bu && !bv.end) ? null : g(bn(bv), bs * bu), aV("timeFormat")));
                        br = bu
                    }
                },
                stop: function(by, bz) {
                    a4("eventResizeStop", this, bv, by, bz);
                    if (bu) {
                        aY(this, bv, 0, bs * bu, by, bz)
                    } else {
                        bt.css("z-index", 8);
                        aM(bv, bt)
                    }
                }
            })
        }
    }

    function A(aK) {
        var aI, aH, aG, aM, aL, aJ;
        for (aI = aK.length - 1; aI > 0; aI--) {
            aM = aK[aI];
            for (aH = 0; aH < aM.length; aH++) {
                aL = aM[aH];
                for (aG = 0; aG < aK[aI - 1].length; aG++) {
                    aJ = aK[aI - 1][aG];
                    if (L(aL, aJ)) {
                        aJ.forward = Math.max(aJ.forward || 0, (aL.forward || 0) + 1)
                    }
                }
            }
        }
    }

    function az(aK, aR, aW) {
        var aQ = this;
        aQ.element = aK;
        aQ.calendar = aR;
        aQ.name = aW;
        aQ.opt = aI;
        aQ.trigger = aS;
        aQ.isEventDraggable = aV;
        aQ.isEventResizable = aZ;
        aQ.reportEvents = aX;
        aQ.eventEnd = a0;
        aQ.reportEventElement = aY;
        aQ.reportEventClear = a6;
        aQ.eventElementHandlers = aH;
        aQ.showEvents = a3;
        aQ.hideEvents = aG;
        aQ.eventDrop = aU;
        aQ.eventResize = aJ;
        var a7 = aQ.defaultEventEnd;
        var aP = aR.normalizeEvent;
        var aO = aR.reportEventChange;
        var a1 = {};
        var a5 = [];
        var aN = {};
        var aL = aR.options;

        function aI(ba, a8) {
            var a9 = aL[ba];
            if (typeof a9 == "object") {
                return B(a9, a8 || aW)
            }
            return a9
        }

        function aS(a8, a9) {
            return aR.trigger.apply(aR, [a8, a9 || aQ].concat(Array.prototype.slice.call(arguments, 2), [aQ]))
        }

        function aV(a8) {
            return a2(a8) && !aI("disableDragging")
        }

        function aZ(a8) {
            return a2(a8) && !aI("disableResizing")
        }

        function a2(a8) {
            return aE(a8.editable, (a8.source || {}).editable, aI("editable"))
        }

        function aX(ba) {
            a1 = {};
            var a9, a8 = ba.length,
                bb;
            for (a9 = 0; a9 < a8; a9++) {
                bb = ba[a9];
                if (a1[bb._id]) {
                    a1[bb._id].push(bb)
                } else {
                    a1[bb._id] = [bb]
                }
            }
        }

        function a0(a8) {
            return a8.end ? K(a8.end) : a7(a8)
        }

        function aY(a9, a8) {
            a5.push(a8);
            if (aN[a9._id]) {
                aN[a9._id].push(a8)
            } else {
                aN[a9._id] = [a8]
            }
        }

        function a6() {
            a5 = [];
            aN = {}
        }

        function aH(a9, a8) {
            a8.click(function(ba) {
                if (!a8.hasClass("ui-draggable-dragging") && !a8.hasClass("ui-resizable-resizing")) {
                    return aS("eventClick", this, a9, ba)
                }
            }).hover(function(ba) {
                aS("eventMouseover", this, a9, ba)
            }, function(ba) {
                aS("eventMouseout", this, a9, ba)
            })
        }

        function a3(a9, a8) {
            aT(a9, a8, "show")
        }

        function aG(a9, a8) {
            aT(a9, a8, "hide")
        }

        function aT(bb, ba, bd) {
            var bc = aN[bb._id],
                a9, a8 = bc.length;
            for (a9 = 0; a9 < a8; a9++) {
                if (!ba || bc[a9][0] != ba[0]) {
                    bc[a9][bd]()
                }
            }
        }

        function aU(bb, a9, ba, bc, bf, be, bd) {
            var bg = a9.allDay;
            var a8 = a9._id;
            a4(a1[a8], ba, bc, bf);
            aS("eventDrop", bb, a9, ba, bc, bf, function() {
                a4(a1[a8], -ba, -bc, bg);
                aO(a8)
            }, be, bd);
            aO(a8)
        }

        function aJ(be, bc, a9, a8, bb, bd) {
            var ba = bc._id;
            aM(a1[ba], a9, a8);
            aS("eventResize", be, bc, a9, a8, function() {
                aM(a1[ba], -a9, -a8);
                aO(ba)
            }, bb, bd);
            aO(ba)
        }

        function a4(bc, ba, a9, bd) {
            a9 = a9 || 0;
            for (var be, a8 = bc.length, bb = 0; bb < a8; bb++) {
                be = bc[bb];
                if (bd !== t) {
                    be.allDay = bd
                }
                g(ay(be.start, ba, true), a9);
                if (be.end) {
                    be.end = g(ay(be.end, ba, true), a9)
                }
                aP(be, aL)
            }
        }

        function aM(bc, ba, a9) {
            a9 = a9 || 0;
            for (var bd, a8 = bc.length, bb = 0; bb < a8; bb++) {
                bd = bc[bb];
                bd.end = g(ay(a0(bd), ba, true), a9);
                aP(bd, aL)
            }
        }
    }

    function V() {
        var a9 = this;
        a9.renderDaySegs = a8;
        a9.resizableDayEvent = a2;
        var aR = a9.opt;
        var aY = a9.trigger;
        var aI = a9.isEventDraggable;
        var be = a9.isEventResizable;
        var bf = a9.eventEnd;
        var aP = a9.reportEventElement;
        var aL = a9.showEvents;
        var aQ = a9.hideEvents;
        var aU = a9.eventResize;
        var bi = a9.getRowCnt;
        var a7 = a9.getColCnt;
        var aS = a9.getColWidth;
        var aN = a9.allDayRow;
        var bc = a9.allDayBounds;
        var a5 = a9.colContentLeft;
        var a3 = a9.colContentRight;
        var aW = a9.dayOfWeekCol;
        var a4 = a9.dateCell;
        var aH = a9.compileDaySegs;
        var aJ = a9.getDaySegmentContainer;
        var aX = a9.bindDaySeg;
        var aT = a9.calendar.formatDates;
        var aZ = a9.renderDayOverlay;
        var aM = a9.clearOverlays;
        var aG = a9.clearSelection;

        function a8(bl, bk) {
            var bj = aJ();
            var br;
            var bq = bi();
            var bw = a7();
            var bp = 0;
            var bv;
            var bu;
            var bs;
            var bo;
            var bx = bl.length;
            var bn;
            var bt;
            var bm;
            bj[0].innerHTML = a0(bl);
            a1(bl, bj.children());
            bb(bl);
            a6(bl, bj, bk);
            bh(bl);
            aK(bl);
            ba(bl);
            br = aV();
            for (bv = 0; bv < bq; bv++) {
                bu = 0;
                bs = [];
                for (bo = 0; bo < bw; bo++) {
                    bs[bo] = 0
                }
                while (bp < bx && (bn = bl[bp]).row == bv) {
                    bt = ao(bs.slice(bn.startCol, bn.endCol));
                    bn.top = bt;
                    bt += bn.outerHeight;
                    for (bm = bn.startCol; bm < bn.endCol; bm++) {
                        bs[bm] = bt
                    }
                    bp++
                }
                br[bv].height(ao(bs))
            }
            bg(bl, aO(br))
        }

        function bd(bm, bl, bq) {
            var bp = ap("<div/>");
            var bj;
            var bk = aJ();
            var bo;
            var br = bm.length;
            var bn;
            bp[0].innerHTML = a0(bm);
            bj = bp.children();
            bk.append(bj);
            a1(bm, bj);
            bh(bm);
            aK(bm);
            ba(bm);
            bg(bm, aO(aV()));
            bj = [];
            for (bo = 0; bo < br; bo++) {
                bn = bm[bo].element;
                if (bn) {
                    if (bm[bo].row === bl) {
                        bn.css("top", bq)
                    }
                    bj.push(bn[0])
                }
            }
            return ap(bj)
        }

        function a0(bo) {
            var bv = aR("isRTL");
            var bt;
            var bz = bo.length;
            var bs;
            var bm;
            var bn;
            var bq;
            var bj = bc();
            var br = bj.left;
            var bl = bj.right;
            var bx;
            var bk;
            var bp;
            var by;
            var bw;
            var bu = "";
            for (bt = 0; bt < bz; bt++) {
                bs = bo[bt];
                bm = bs.event;
                bq = ["fc-event", "fc-event-hori"];
                if (aI(bm)) {
                    bq.push("fc-event-draggable")
                }
                if (bs.isStart) {
                    bq.push("fc-event-start")
                }
                if (bs.isEnd) {
                    bq.push("fc-event-end")
                }
                if (bv) {
                    bx = aW(bs.end.getDay() - 1);
                    bk = aW(bs.start.getDay());
                    bp = bs.isEnd ? a5(bx) : br;
                    by = bs.isStart ? a3(bk) : bl
                } else {
                    bx = aW(bs.start.getDay());
                    bk = aW(bs.end.getDay() - 1);
                    bp = bs.isStart ? a5(bx) : br;
                    by = bs.isEnd ? a3(bk) : bl
                }
                bq = bq.concat(bm.className);
                if (bm.source) {
                    bq = bq.concat(bm.source.className || [])
                }
                bn = bm.url;
                bw = O(bm, aR);
                if (bn) {
                    bu += "<a href='" + aB(bn) + "'"
                } else {
                    bu += "<div"
                }
                bu += " class='" + bq.join(" ") + "' style='position:absolute;z-index:8;left:" + bp + "px;" + bw + "'><div class='fc-event-inner'>";
                if (!bm.allDay && bs.isStart) {
                    bu += "<span class='fc-event-time'>" + aB(aT(bm.start, bm.end, aR("timeFormat"))) + "</span>"
                }
                bu += "<span class='fc-event-title'>" + aB(bm.title) + "</span></div>";
                if (bs.isEnd && be(bm)) {
                    bu += "<div class='ui-resizable-handle ui-resizable-" + (bv ? "w" : "e") + "'>&nbsp;&nbsp;&nbsp;</div>"
                }
                bu += "</" + (bn ? "a" : "div") + ">";
                bs.left = bp;
                bs.outerWidth = by - bp;
                bs.startCol = bx;
                bs.endCol = bk + 1
            }
            return bu
        }

        function a1(bk, bp) {
            var bn;
            var bq = bk.length;
            var bj;
            var bo;
            var bm;
            var bl;
            for (bn = 0; bn < bq; bn++) {
                bj = bk[bn];
                bo = bj.event;
                bm = ap(bp[bn]);
                bl = aY("eventRender", bo, bo, bm);
                if (bl === false) {
                    bm.remove()
                } else {
                    if (bl && bl !== true) {
                        bl = ap(bl).css({
                            position: "absolute",
                            left: bj.left
                        });
                        bm.replaceWith(bl);
                        bm = bl
                    }
                    bj.element = bm
                }
            }
        }

        function bb(bk) {
            var bm;
            var bn = bk.length;
            var bj;
            var bl;
            for (bm = 0; bm < bn; bm++) {
                bj = bk[bm];
                bl = bj.element;
                if (bl) {
                    aP(bj.event, bl)
                }
            }
        }

        function a6(bk, bp, bl) {
            var bn;
            var bq = bk.length;
            var bj;
            var bm;
            var bo;
            for (bn = 0; bn < bq; bn++) {
                bj = bk[bn];
                bm = bj.element;
                if (bm) {
                    bo = bj.event;
                    if (bo._id === bl) {
                        aX(bo, bm, bj)
                    } else {
                        bm[0]._fci = bn
                    }
                }
            }
            s(bp, bk, aX)
        }

        function bh(bk) {
            var bo;
            var bp = bk.length;
            var bj;
            var bn;
            var bm, bq;
            var bl = {};
            for (bo = 0; bo < bp; bo++) {
                bj = bk[bo];
                bn = bj.element;
                if (bn) {
                    bm = bj.key = E(bn[0]);
                    bq = bl[bm];
                    if (bq === t) {
                        bq = bl[bm] = f(bn, true)
                    }
                    bj.hsides = bq
                }
            }
        }

        function aK(bk) {
            var bm;
            var bn = bk.length;
            var bj;
            var bl;
            for (bm = 0; bm < bn; bm++) {
                bj = bk[bm];
                bl = bj.element;
                if (bl) {
                    bl[0].style.width = Math.max(0, bj.outerWidth - bj.hsides) + "px"
                }
            }
        }

        function ba(bk) {
            var bn;
            var bp = bk.length;
            var bj;
            var bm;
            var bl, bq;
            var bo = {};
            for (bn = 0; bn < bp; bn++) {
                bj = bk[bn];
                bm = bj.element;
                if (bm) {
                    bl = bj.key;
                    bq = bo[bl];
                    if (bq === t) {
                        bq = bo[bl] = i(bm)
                    }
                    bj.outerHeight = bm[0].offsetHeight + bq
                }
            }
        }

        function aV() {
            var bj;
            var bl = bi();
            var bk = [];
            for (bj = 0; bj < bl; bj++) {
                bk[bj] = aN(bj).find("div.fc-day-content > div")
            }
            return bk
        }

        function aO(bk) {
            var bj;
            var bm = bk.length;
            var bl = [];
            for (bj = 0; bj < bm; bj++) {
                bl[bj] = bk[bj][0].offsetTop
            }
            return bl
        }

        function bg(bk, bp) {
            var bm;
            var bo = bk.length;
            var bj;
            var bl;
            var bn;
            for (bm = 0; bm < bo; bm++) {
                bj = bk[bm];
                bl = bj.element;
                if (bl) {
                    bl[0].style.top = bp[bj.row] + (bj.top || 0) + "px";
                    bn = bj.event;
                    aY("eventAfterRender", bn, bn, bl)
                }
            }
        }

        function a2(bl, bk, bj) {
            var bo = aR("isRTL");
            var bn = bo ? "w" : "e";
            var bm = bk.find(".ui-resizable-" + bn);
            var bp = false;
            aF(bk);
            bk.mousedown(function(bq) {
                bq.preventDefault()
            }).click(function(bq) {
                if (bp) {
                    bq.preventDefault();
                    bq.stopImmediatePropagation()
                }
            });
            bm.mousedown(function(bz) {
                if (bz.which != 1) {
                    return
                }
                bp = true;
                var bu = a9.getHoverListener();
                var by = bi();
                var bA = a7();
                var bs = bo ? -1 : 1;
                var br = bo ? bA - 1 : 0;
                var bt = bk.css("top");
                var bv;
                var bq;
                var bx = ap.extend({}, bl);
                var bB = a4(bl.start);
                aG();
                ap("body").css("cursor", bn + "-resize").one("mouseup", bw);
                aY("eventResizeStart", this, bl, bz);
                bu.start(function(bD, bC) {
                    if (bD) {
                        var bG = Math.max(bB.row, bD.row);
                        var bH = bD.col;
                        if (by == 1) {
                            bG = 0
                        }
                        if (bG == bB.row) {
                            if (bo) {
                                bH = Math.min(bB.col, bH)
                            } else {
                                bH = Math.max(bB.col, bH)
                            }
                        }
                        bv = (bG * 7 + bH * bs + br) - (bC.row * 7 + bC.col * bs + br);
                        var bF = ay(bf(bl), bv, true);
                        if (bv) {
                            bx.end = bF;
                            var bE = bq;
                            bq = bd(aH([bx]), bj.row, bt);
                            bq.find("*").css("cursor", bn + "-resize");
                            if (bE) {
                                bE.remove()
                            }
                            aQ(bl)
                        } else {
                            if (bq) {
                                aL(bl);
                                bq.remove();
                                bq = null
                            }
                        }
                        aM();
                        aZ(bl.start, ay(K(bF), 1))
                    }
                }, bz);

                function bw(bC) {
                    aY("eventResizeStop", this, bl, bC);
                    ap("body").css("cursor", "");
                    bu.stop();
                    aM();
                    if (bv) {
                        aU(this, bl, bv, 0, bC)
                    }
                    setTimeout(function() {
                        bp = false
                    }, 0)
                }
            })
        }
    }

    function aj() {
        var aQ = this;
        aQ.select = aO;
        aQ.unselect = aK;
        aQ.reportSelection = aG;
        aQ.daySelectionMousedown = aN;
        var aI = aQ.opt;
        var aJ = aQ.trigger;
        var aL = aQ.defaultSelectionEnd;
        var aH = aQ.renderSelection;
        var aP = aQ.clearSelection;
        var aM = false;
        if (aI("selectable") && aI("unselectAuto")) {
            ap(document).mousedown(function(aR) {
                var aS = aI("unselectCancel");
                if (aS) {
                    if (ap(aR.target).parents(aS).length) {
                        return
                    }
                }
                aK(aR)
            })
        }

        function aO(aR, aT, aS) {
            aK();
            if (!aT) {
                aT = aL(aR, aS)
            }
            aH(aR, aT, aS);
            aG(aR, aT, aS)
        }

        function aK(aR) {
            if (aM) {
                aM = false;
                aP();
                aJ("unselect", null, aR)
            }
        }

        function aG(aR, aU, aT, aS) {
            aM = true;
            aJ("select", null, aR, aU, aT, aS)
        }

        function aN(aU) {
            var aX = aQ.cellDate;
            var aS = aQ.cellIsAllDay;
            var aR = aQ.getHoverListener();
            var aV = aQ.reportDayClick;
            if (aU.which == 1 && aI("selectable")) {
                aK(aU);
                var aT = this;
                var aW;
                aR.start(function(aZ, aY) {
                    aP();
                    if (aZ && aS(aZ)) {
                        aW = [aX(aY), aX(aZ)].sort(U);
                        aH(aW[0], aW[1], true)
                    } else {
                        aW = null
                    }
                }, aU);
                ap(document).one("mouseup", function(aY) {
                    aR.stop();
                    if (aW) {
                        if (+aW[0] == +aW[1]) {
                            aV(aW[0], true, aY)
                        }
                        aG(aW[0], aW[1], true, aY)
                    }
                })
            }
        }
    }

    function a() {
        var aJ = this;
        aJ.renderOverlay = aH;
        aJ.clearOverlays = aG;
        var aI = [];
        var aK = [];

        function aH(aM, aL) {
            var aN = aK.shift();
            if (!aN) {
                aN = ap("<div class='fc-cell-overlay' style='position:absolute;z-index:3'/>")
            }
            if (aN[0].parentNode != aL[0]) {
                aN.appendTo(aL)
            }
            aI.push(aN.css(aM).show());
            return aN
        }

        function aG() {
            var aL;
            while (aL = aI.shift()) {
                aK.push(aL.hide().unbind())
            }
        }
    }

    function M(aG) {
        var aH = this;
        var aI;
        var aJ;
        aH.build = function() {
            aI = [];
            aJ = [];
            aG(aI, aJ)
        };
        aH.cell = function(aK, aQ) {
            var aP = aI.length;
            var aL = aJ.length;
            var aM, aN = -1,
                aO = -1;
            for (aM = 0; aM < aP; aM++) {
                if (aQ >= aI[aM][0] && aQ < aI[aM][1]) {
                    aN = aM;
                    break
                }
            }
            for (aM = 0; aM < aL; aM++) {
                if (aK >= aJ[aM][0] && aK < aJ[aM][1]) {
                    aO = aM;
                    break
                }
            }
            return (aN >= 0 && aO >= 0) ? {
                row: aN,
                col: aO
            } : null
        };
        aH.rect = function(aN, aP, aL, aM, aO) {
            var aK = aO.offset();
            return {
                top: aI[aN][0] - aK.top,
                left: aJ[aP][0] - aK.left,
                width: aJ[aM][1] - aJ[aP][0],
                height: aI[aL][1] - aI[aN][0]
            }
        }
    }

    function al(aL) {
        var aJ = this;
        var aK;
        var aM;
        var aH;
        var aG;
        aJ.start = function(aN, aO, aP) {
            aM = aN;
            aH = aG = null;
            aL.build();
            aI(aO);
            aK = aP || "mousemove";
            ap(document).bind(aK, aI)
        };

        function aI(aN) {
            z(aN);
            var aO = aL.cell(aN.pageX, aN.pageY);
            if (!aO != !aG || aO && (aO.row != aG.row || aO.col != aG.col)) {
                if (aO) {
                    if (!aH) {
                        aH = aO
                    }
                    aM(aO, aH, aO.row - aH.row, aO.col - aH.col)
                } else {
                    aM(aO, aH)
                }
                aG = aO
            }
        }
        aJ.stop = function() {
            ap(document).unbind(aK, aI);
            return aG
        }
    }

    function z(aG) {
        if (aG.pageX === t) {
            aG.pageX = aG.originalEvent.pageX;
            aG.pageY = aG.originalEvent.pageY
        }
    }

    function j(aH) {
        var aG = this,
            aI = {},
            aL = {},
            aK = {};

        function aJ(aM) {
            return aI[aM] = aI[aM] || aH(aM)
        }
        aG.left = function(aM) {
            return aL[aM] = aL[aM] === t ? aJ(aM).position().left : aL[aM]
        };
        aG.right = function(aM) {
            return aK[aM] = aK[aM] === t ? aG.left(aM) + aJ(aM).width() : aK[aM]
        };
        aG.clear = function() {
            aI = {};
            aL = {};
            aK = {}
        }
    }
})(jQuery);