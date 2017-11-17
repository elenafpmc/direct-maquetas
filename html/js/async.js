!function(exports, global) {
    function autoHeightParent() {
        $(".js-auto-height-parent").each(function() {
            $(this).parent().css("height", $(this).height());
        });
    }
    function sameHeight() {
        $(".js-same-height").each(function() {
            var maxHeight = 0;
            $(this).find(".js-same").each(function() {
                $(this).removeAttr("style"), maxHeightNew = $(this).outerHeight(!0), maxHeightNew > maxHeight && (maxHeight = maxHeightNew);
            }), $(this).hasClass("no-xs") && 767 > windowWidth ? $(this).find(".js-same").css("min-height", "0px") : $(this).hasClass("no-sm") && 991 > windowWidth ? $(this).find(".js-same").css("min-height", "0px") : $(this).find(".js-same").css("min-height", maxHeight), 
            windowWidth > 768 && $(this).find(".v-middle").css("height", $(this).height());
        });
    }
    global["true"] = exports, +function($) {
        "use strict";
        function transitionEnd() {
            var el = document.createElement("bootstrap"), transEndEventNames = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
            for (var name in transEndEventNames) if (void 0 !== el.style[name]) return {
                end: transEndEventNames[name]
            };
            return !1;
        }
        $.fn.emulateTransitionEnd = function(duration) {
            var called = !1, $el = this;
            $(this).one("bsTransitionEnd", function() {
                called = !0;
            });
            var callback = function() {
                called || $($el).trigger($.support.transition.end);
            };
            return setTimeout(callback, duration), this;
        }, $(function() {
            $.support.transition = transitionEnd(), $.support.transition && ($.event.special.bsTransitionEnd = {
                bindType: $.support.transition.end,
                delegateType: $.support.transition.end,
                handle: function(e) {
                    return $(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0;
                }
            });
        });
    }(jQuery), +function($) {
        "use strict";
        function Plugin(option) {
            return this.each(function() {
                var $this = $(this), data = $this.data("bs.alert");
                data || $this.data("bs.alert", data = new Alert(this)), "string" == typeof option && data[option].call($this);
            });
        }
        var dismiss = '[data-dismiss="alert"]', Alert = function(el) {
            $(el).on("click", dismiss, this.close);
        };
        Alert.VERSION = "3.3.1", Alert.TRANSITION_DURATION = 150, Alert.prototype.close = function(e) {
            function removeElement() {
                $parent.detach().trigger("closed.bs.alert").remove();
            }
            var $this = $(this), selector = $this.attr("data-target");
            selector || (selector = $this.attr("href"), selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ""));
            var $parent = $(selector);
            e && e.preventDefault(), $parent.length || ($parent = $this.closest(".alert")), 
            $parent.trigger(e = $.Event("close.bs.alert")), e.isDefaultPrevented() || ($parent.removeClass("in"), 
            $.support.transition && $parent.hasClass("fade") ? $parent.one("bsTransitionEnd", removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION) : removeElement());
        };
        var old = $.fn.alert;
        $.fn.alert = Plugin, $.fn.alert.Constructor = Alert, $.fn.alert.noConflict = function() {
            return $.fn.alert = old, this;
        }, $(document).on("click.bs.alert.data-api", dismiss, Alert.prototype.close);
    }(jQuery), +function($) {
        "use strict";
        function Plugin(option) {
            return this.each(function() {
                var $this = $(this), data = $this.data("bs.button"), options = "object" == typeof option && option;
                data || $this.data("bs.button", data = new Button(this, options)), "toggle" == option ? data.toggle() : option && data.setState(option);
            });
        }
        var Button = function(element, options) {
            this.$element = $(element), this.options = $.extend({}, Button.DEFAULTS, options), 
            this.isLoading = !1;
        };
        Button.VERSION = "3.3.1", Button.DEFAULTS = {
            loadingText: "loading..."
        }, Button.prototype.setState = function(state) {
            var d = "disabled", $el = this.$element, val = $el.is("input") ? "val" : "html", data = $el.data();
            state += "Text", null == data.resetText && $el.data("resetText", $el[val]()), setTimeout($.proxy(function() {
                $el[val](null == data[state] ? this.options[state] : data[state]), "loadingText" == state ? (this.isLoading = !0, 
                $el.addClass(d).attr(d, d)) : this.isLoading && (this.isLoading = !1, $el.removeClass(d).removeAttr(d));
            }, this), 0);
        }, Button.prototype.toggle = function() {
            var changed = !0, $parent = this.$element.closest('[data-toggle="buttons"]');
            if ($parent.length) {
                var $input = this.$element.find("input");
                "radio" == $input.prop("type") && ($input.prop("checked") && this.$element.hasClass("active") ? changed = !1 : $parent.find(".active").removeClass("active")), 
                changed && $input.prop("checked", !this.$element.hasClass("active")).trigger("change");
            } else this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
            changed && this.$element.toggleClass("active");
        };
        var old = $.fn.button;
        $.fn.button = Plugin, $.fn.button.Constructor = Button, $.fn.button.noConflict = function() {
            return $.fn.button = old, this;
        }, $(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(e) {
            var $btn = $(e.target);
            $btn.hasClass("btn") || ($btn = $btn.closest(".btn")), Plugin.call($btn, "toggle"), 
            e.preventDefault();
        }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
            $(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type));
        });
    }(jQuery), +function($) {
        "use strict";
        function getTargetFromTrigger($trigger) {
            var href, target = $trigger.attr("data-target") || (href = $trigger.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "");
            return $(target);
        }
        function Plugin(option) {
            return this.each(function() {
                var $this = $(this), data = $this.data("bs.collapse"), options = $.extend({}, Collapse.DEFAULTS, $this.data(), "object" == typeof option && option);
                !data && options.toggle && "show" == option && (options.toggle = !1), data || $this.data("bs.collapse", data = new Collapse(this, options)), 
                "string" == typeof option && data[option]();
            });
        }
        var Collapse = function(element, options) {
            this.$element = $(element), this.options = $.extend({}, Collapse.DEFAULTS, options), 
            this.$trigger = $(this.options.trigger).filter('[href="#' + element.id + '"], [data-target="#' + element.id + '"]'), 
            this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), 
            this.options.toggle && this.toggle();
        };
        Collapse.VERSION = "3.3.1", Collapse.TRANSITION_DURATION = 350, Collapse.DEFAULTS = {
            toggle: !0,
            trigger: '[data-toggle="collapse"]'
        }, Collapse.prototype.dimension = function() {
            var hasWidth = this.$element.hasClass("width");
            return hasWidth ? "width" : "height";
        }, Collapse.prototype.show = function() {
            if (!this.transitioning && !this.$element.hasClass("in")) {
                var activesData, actives = this.$parent && this.$parent.find("> .panel").children(".in, .collapsing");
                if (!(actives && actives.length && (activesData = actives.data("bs.collapse"), activesData && activesData.transitioning))) {
                    var startEvent = $.Event("show.bs.collapse");
                    if (this.$element.trigger(startEvent), !startEvent.isDefaultPrevented()) {
                        actives && actives.length && (Plugin.call(actives, "hide"), activesData || actives.data("bs.collapse", null));
                        var dimension = this.dimension();
                        this.$element.removeClass("collapse").addClass("collapsing")[dimension](0).attr("aria-expanded", !0), 
                        this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                        var complete = function() {
                            this.$element.removeClass("collapsing").addClass("collapse in")[dimension](""), 
                            this.transitioning = 0, this.$element.trigger("shown.bs.collapse");
                        };
                        if (!$.support.transition) return complete.call(this);
                        var scrollSize = $.camelCase([ "scroll", dimension ].join("-"));
                        this.$element.one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize]);
                    }
                }
            }
        }, Collapse.prototype.hide = function() {
            if (!this.transitioning && this.$element.hasClass("in")) {
                var startEvent = $.Event("hide.bs.collapse");
                if (this.$element.trigger(startEvent), !startEvent.isDefaultPrevented()) {
                    var dimension = this.dimension();
                    this.$element[dimension](this.$element[dimension]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), 
                    this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                    var complete = function() {
                        this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
                    };
                    return $.support.transition ? void this.$element[dimension](0).one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION) : complete.call(this);
                }
            }
        }, Collapse.prototype.toggle = function() {
            this[this.$element.hasClass("in") ? "hide" : "show"]();
        }, Collapse.prototype.getParent = function() {
            return $(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each($.proxy(function(i, element) {
                var $element = $(element);
                this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element);
            }, this)).end();
        }, Collapse.prototype.addAriaAndCollapsedClass = function($element, $trigger) {
            var isOpen = $element.hasClass("in");
            $element.attr("aria-expanded", isOpen), $trigger.toggleClass("collapsed", !isOpen).attr("aria-expanded", isOpen);
        };
        var old = $.fn.collapse;
        $.fn.collapse = Plugin, $.fn.collapse.Constructor = Collapse, $.fn.collapse.noConflict = function() {
            return $.fn.collapse = old, this;
        }, $(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(e) {
            var $this = $(this);
            $this.attr("data-target") || e.preventDefault();
            var $target = getTargetFromTrigger($this), data = $target.data("bs.collapse"), option = data ? "toggle" : $.extend({}, $this.data(), {
                trigger: this
            });
            Plugin.call($target, option);
        });
    }(jQuery), +function($) {
        "use strict";
        function clearMenus(e) {
            e && 3 === e.which || ($(backdrop).remove(), $(toggle).each(function() {
                var $this = $(this), $parent = getParent($this), relatedTarget = {
                    relatedTarget: this
                };
                $parent.hasClass("open") && ($parent.trigger(e = $.Event("hide.bs.dropdown", relatedTarget)), 
                e.isDefaultPrevented() || ($this.attr("aria-expanded", "false"), $parent.removeClass("open").trigger("hidden.bs.dropdown", relatedTarget)));
            }));
        }
        function getParent($this) {
            var selector = $this.attr("data-target");
            selector || (selector = $this.attr("href"), selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ""));
            var $parent = selector && $(selector);
            return $parent && $parent.length ? $parent : $this.parent();
        }
        function Plugin(option) {
            return this.each(function() {
                var $this = $(this), data = $this.data("bs.dropdown");
                data || $this.data("bs.dropdown", data = new Dropdown(this)), "string" == typeof option && data[option].call($this);
            });
        }
        var backdrop = ".dropdown-backdrop", toggle = '[data-toggle="dropdown"]', Dropdown = function(element) {
            $(element).on("click.bs.dropdown", this.toggle);
        };
        Dropdown.VERSION = "3.3.1", Dropdown.prototype.toggle = function(e) {
            var $this = $(this);
            if (!$this.is(".disabled, :disabled")) {
                var $parent = getParent($this), isActive = $parent.hasClass("open");
                if (clearMenus(), !isActive) {
                    "ontouchstart" in document.documentElement && !$parent.closest(".navbar-nav").length && $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on("click", clearMenus);
                    var relatedTarget = {
                        relatedTarget: this
                    };
                    if ($parent.trigger(e = $.Event("show.bs.dropdown", relatedTarget)), e.isDefaultPrevented()) return;
                    $this.trigger("focus").attr("aria-expanded", "true"), $parent.toggleClass("open").trigger("shown.bs.dropdown", relatedTarget);
                }
                return !1;
            }
        }, Dropdown.prototype.keydown = function(e) {
            if (/(38|40|27|32)/.test(e.which) && !/input|textarea/i.test(e.target.tagName)) {
                var $this = $(this);
                if (e.preventDefault(), e.stopPropagation(), !$this.is(".disabled, :disabled")) {
                    var $parent = getParent($this), isActive = $parent.hasClass("open");
                    if (!isActive && 27 != e.which || isActive && 27 == e.which) return 27 == e.which && $parent.find(toggle).trigger("focus"), 
                    $this.trigger("click");
                    var desc = " li:not(.divider):visible a", $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc);
                    if ($items.length) {
                        var index = $items.index(e.target);
                        38 == e.which && index > 0 && index--, 40 == e.which && index < $items.length - 1 && index++, 
                        ~index || (index = 0), $items.eq(index).trigger("focus");
                    }
                }
            }
        };
        var old = $.fn.dropdown;
        $.fn.dropdown = Plugin, $.fn.dropdown.Constructor = Dropdown, $.fn.dropdown.noConflict = function() {
            return $.fn.dropdown = old, this;
        }, $(document).on("click.bs.dropdown.data-api", clearMenus).on("click.bs.dropdown.data-api", ".dropdown form", function(e) {
            e.stopPropagation();
        }).on("click.bs.dropdown.data-api", toggle, Dropdown.prototype.toggle).on("keydown.bs.dropdown.data-api", toggle, Dropdown.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', Dropdown.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', Dropdown.prototype.keydown);
    }(jQuery), +function($) {
        "use strict";
        function Plugin(option, _relatedTarget) {
            return this.each(function() {
                var $this = $(this), data = $this.data("bs.modal"), options = $.extend({}, Modal.DEFAULTS, $this.data(), "object" == typeof option && option);
                data || $this.data("bs.modal", data = new Modal(this, options)), "string" == typeof option ? data[option](_relatedTarget) : options.show && data.show(_relatedTarget);
            });
        }
        var Modal = function(element, options) {
            this.options = options, this.$body = $(document.body), this.$element = $(element), 
            this.$backdrop = this.isShown = null, this.scrollbarWidth = 0, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, $.proxy(function() {
                this.$element.trigger("loaded.bs.modal");
            }, this));
        };
        Modal.VERSION = "3.3.1", Modal.TRANSITION_DURATION = 300, Modal.BACKDROP_TRANSITION_DURATION = 150, 
        Modal.DEFAULTS = {
            backdrop: !0,
            keyboard: !0,
            show: !0
        }, Modal.prototype.toggle = function(_relatedTarget) {
            return this.isShown ? this.hide() : this.show(_relatedTarget);
        }, Modal.prototype.show = function(_relatedTarget) {
            var that = this, e = $.Event("show.bs.modal", {
                relatedTarget: _relatedTarget
            });
            this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, 
            this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), 
            this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', $.proxy(this.hide, this)), 
            this.backdrop(function() {
                var transition = $.support.transition && that.$element.hasClass("fade");
                that.$element.parent().length || that.$element.appendTo(that.$body), that.$element.show().scrollTop(0), 
                that.options.backdrop && that.adjustBackdrop(), that.adjustDialog(), transition && that.$element[0].offsetWidth, 
                that.$element.addClass("in").attr("aria-hidden", !1), that.enforceFocus();
                var e = $.Event("shown.bs.modal", {
                    relatedTarget: _relatedTarget
                });
                transition ? that.$element.find(".modal-dialog").one("bsTransitionEnd", function() {
                    that.$element.trigger("focus").trigger(e);
                }).emulateTransitionEnd(Modal.TRANSITION_DURATION) : that.$element.trigger("focus").trigger(e);
            }));
        }, Modal.prototype.hide = function(e) {
            e && e.preventDefault(), e = $.Event("hide.bs.modal"), this.$element.trigger(e), 
            this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), 
            $(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), 
            $.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION) : this.hideModal());
        }, Modal.prototype.enforceFocus = function() {
            $(document).off("focusin.bs.modal").on("focusin.bs.modal", $.proxy(function(e) {
                this.$element[0] === e.target || this.$element.has(e.target).length || this.$element.trigger("focus");
            }, this));
        }, Modal.prototype.escape = function() {
            this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", $.proxy(function(e) {
                27 == e.which && this.hide();
            }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
        }, Modal.prototype.resize = function() {
            this.isShown ? $(window).on("resize.bs.modal", $.proxy(this.handleUpdate, this)) : $(window).off("resize.bs.modal");
        }, Modal.prototype.hideModal = function() {
            var that = this;
            this.$element.hide(), this.backdrop(function() {
                that.$body.removeClass("modal-open"), that.resetAdjustments(), that.resetScrollbar(), 
                that.$element.trigger("hidden.bs.modal");
            });
        }, Modal.prototype.removeBackdrop = function() {
            this.$backdrop && this.$backdrop.remove(), this.$backdrop = null;
        }, Modal.prototype.backdrop = function(callback) {
            var that = this, animate = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var doAnimate = $.support.transition && animate;
                if (this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').prependTo(this.$element).on("click.dismiss.bs.modal", $.proxy(function(e) {
                    e.target === e.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this));
                }, this)), doAnimate && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), 
                !callback) return;
                doAnimate ? this.$backdrop.one("bsTransitionEnd", callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callback();
            } else if (!this.isShown && this.$backdrop) {
                this.$backdrop.removeClass("in");
                var callbackRemove = function() {
                    that.removeBackdrop(), callback && callback();
                };
                $.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callbackRemove();
            } else callback && callback();
        }, Modal.prototype.handleUpdate = function() {
            this.options.backdrop && this.adjustBackdrop(), this.adjustDialog();
        }, Modal.prototype.adjustBackdrop = function() {
            this.$backdrop.css("height", 0).css("height", this.$element[0].scrollHeight);
        }, Modal.prototype.adjustDialog = function() {
            var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;
            this.$element.css({
                paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : "",
                paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ""
            });
        }, Modal.prototype.resetAdjustments = function() {
            this.$element.css({
                paddingLeft: "",
                paddingRight: ""
            });
        }, Modal.prototype.checkScrollbar = function() {
            this.bodyIsOverflowing = document.body.scrollHeight > document.documentElement.clientHeight, 
            this.scrollbarWidth = this.measureScrollbar();
        }, Modal.prototype.setScrollbar = function() {
            var bodyPad = parseInt(this.$body.css("padding-right") || 0, 10);
            this.bodyIsOverflowing && this.$body.css("padding-right", bodyPad + this.scrollbarWidth);
        }, Modal.prototype.resetScrollbar = function() {
            this.$body.css("padding-right", "");
        }, Modal.prototype.measureScrollbar = function() {
            var scrollDiv = document.createElement("div");
            scrollDiv.className = "modal-scrollbar-measure", this.$body.append(scrollDiv);
            var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            return this.$body[0].removeChild(scrollDiv), scrollbarWidth;
        };
        var old = $.fn.modal;
        $.fn.modal = Plugin, $.fn.modal.Constructor = Modal, $.fn.modal.noConflict = function() {
            return $.fn.modal = old, this;
        }, $(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(e) {
            var $this = $(this), href = $this.attr("href"), $target = $($this.attr("data-target") || href && href.replace(/.*(?=#[^\s]+$)/, "")), option = $target.data("bs.modal") ? "toggle" : $.extend({
                remote: !/#/.test(href) && href
            }, $target.data(), $this.data());
            $this.is("a") && e.preventDefault(), $target.one("show.bs.modal", function(showEvent) {
                showEvent.isDefaultPrevented() || $target.one("hidden.bs.modal", function() {
                    $this.is(":visible") && $this.trigger("focus");
                });
            }), Plugin.call($target, option, this);
        });
    }(jQuery), +function($) {
        "use strict";
        function Plugin(option) {
            return this.each(function() {
                var $this = $(this), data = $this.data("bs.tooltip"), options = "object" == typeof option && option, selector = options && options.selector;
                (data || "destroy" != option) && (selector ? (data || $this.data("bs.tooltip", data = {}), 
                data[selector] || (data[selector] = new Tooltip(this, options))) : data || $this.data("bs.tooltip", data = new Tooltip(this, options)), 
                "string" == typeof option && data[option]());
            });
        }
        var Tooltip = function(element, options) {
            this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, 
            this.init("tooltip", element, options);
        };
        Tooltip.VERSION = "3.3.1", Tooltip.TRANSITION_DURATION = 150, Tooltip.DEFAULTS = {
            animation: !0,
            placement: "top",
            selector: !1,
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            container: !1,
            viewport: {
                selector: "body",
                padding: 0
            }
        }, Tooltip.prototype.init = function(type, element, options) {
            this.enabled = !0, this.type = type, this.$element = $(element), this.options = this.getOptions(options), 
            this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport);
            for (var triggers = this.options.trigger.split(" "), i = triggers.length; i--; ) {
                var trigger = triggers[i];
                if ("click" == trigger) this.$element.on("click." + this.type, this.options.selector, $.proxy(this.toggle, this)); else if ("manual" != trigger) {
                    var eventIn = "hover" == trigger ? "mouseenter" : "focusin", eventOut = "hover" == trigger ? "mouseleave" : "focusout";
                    this.$element.on(eventIn + "." + this.type, this.options.selector, $.proxy(this.enter, this)), 
                    this.$element.on(eventOut + "." + this.type, this.options.selector, $.proxy(this.leave, this));
                }
            }
            this.options.selector ? this._options = $.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle();
        }, Tooltip.prototype.getDefaults = function() {
            return Tooltip.DEFAULTS;
        }, Tooltip.prototype.getOptions = function(options) {
            return options = $.extend({}, this.getDefaults(), this.$element.data(), options), 
            options.delay && "number" == typeof options.delay && (options.delay = {
                show: options.delay,
                hide: options.delay
            }), options;
        }, Tooltip.prototype.getDelegateOptions = function() {
            var options = {}, defaults = this.getDefaults();
            return this._options && $.each(this._options, function(key, value) {
                defaults[key] != value && (options[key] = value);
            }), options;
        }, Tooltip.prototype.enter = function(obj) {
            var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data("bs." + this.type);
            return self && self.$tip && self.$tip.is(":visible") ? void (self.hoverState = "in") : (self || (self = new this.constructor(obj.currentTarget, this.getDelegateOptions()), 
            $(obj.currentTarget).data("bs." + this.type, self)), clearTimeout(self.timeout), 
            self.hoverState = "in", self.options.delay && self.options.delay.show ? void (self.timeout = setTimeout(function() {
                "in" == self.hoverState && self.show();
            }, self.options.delay.show)) : self.show());
        }, Tooltip.prototype.leave = function(obj) {
            var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data("bs." + this.type);
            return self || (self = new this.constructor(obj.currentTarget, this.getDelegateOptions()), 
            $(obj.currentTarget).data("bs." + this.type, self)), clearTimeout(self.timeout), 
            self.hoverState = "out", self.options.delay && self.options.delay.hide ? void (self.timeout = setTimeout(function() {
                "out" == self.hoverState && self.hide();
            }, self.options.delay.hide)) : self.hide();
        }, Tooltip.prototype.show = function() {
            var e = $.Event("show.bs." + this.type);
            if (this.hasContent() && this.enabled) {
                this.$element.trigger(e);
                var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
                if (e.isDefaultPrevented() || !inDom) return;
                var that = this, $tip = this.tip(), tipId = this.getUID(this.type);
                this.setContent(), $tip.attr("id", tipId), this.$element.attr("aria-describedby", tipId), 
                this.options.animation && $tip.addClass("fade");
                var placement = "function" == typeof this.options.placement ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement, autoToken = /\s?auto?\s?/i, autoPlace = autoToken.test(placement);
                autoPlace && (placement = placement.replace(autoToken, "") || "top"), $tip.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).addClass(placement).data("bs." + this.type, this), this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element);
                var pos = this.getPosition(), actualWidth = $tip[0].offsetWidth, actualHeight = $tip[0].offsetHeight;
                if (autoPlace) {
                    var orgPlacement = placement, $container = this.options.container ? $(this.options.container) : this.$element.parent(), containerDim = this.getPosition($container);
                    placement = "bottom" == placement && pos.bottom + actualHeight > containerDim.bottom ? "top" : "top" == placement && pos.top - actualHeight < containerDim.top ? "bottom" : "right" == placement && pos.right + actualWidth > containerDim.width ? "left" : "left" == placement && pos.left - actualWidth < containerDim.left ? "right" : placement, 
                    $tip.removeClass(orgPlacement).addClass(placement);
                }
                var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
                this.applyPlacement(calculatedOffset, placement);
                var complete = function() {
                    var prevHoverState = that.hoverState;
                    that.$element.trigger("shown.bs." + that.type), that.hoverState = null, "out" == prevHoverState && that.leave(that);
                };
                $.support.transition && this.$tip.hasClass("fade") ? $tip.one("bsTransitionEnd", complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();
            }
        }, Tooltip.prototype.applyPlacement = function(offset, placement) {
            var $tip = this.tip(), width = $tip[0].offsetWidth, height = $tip[0].offsetHeight, marginTop = parseInt($tip.css("margin-top"), 10), marginLeft = parseInt($tip.css("margin-left"), 10);
            isNaN(marginTop) && (marginTop = 0), isNaN(marginLeft) && (marginLeft = 0), offset.top = offset.top + marginTop, 
            offset.left = offset.left + marginLeft, $.offset.setOffset($tip[0], $.extend({
                using: function(props) {
                    $tip.css({
                        top: Math.round(props.top),
                        left: Math.round(props.left)
                    });
                }
            }, offset), 0), $tip.addClass("in");
            var actualWidth = $tip[0].offsetWidth, actualHeight = $tip[0].offsetHeight;
            "top" == placement && actualHeight != height && (offset.top = offset.top + height - actualHeight);
            var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);
            delta.left ? offset.left += delta.left : offset.top += delta.top;
            var isVertical = /top|bottom/.test(placement), arrowDelta = isVertical ? 2 * delta.left - width + actualWidth : 2 * delta.top - height + actualHeight, arrowOffsetPosition = isVertical ? "offsetWidth" : "offsetHeight";
            $tip.offset(offset), this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical);
        }, Tooltip.prototype.replaceArrow = function(delta, dimension, isHorizontal) {
            this.arrow().css(isHorizontal ? "left" : "top", 50 * (1 - delta / dimension) + "%").css(isHorizontal ? "top" : "left", "");
        }, Tooltip.prototype.setContent = function() {
            var $tip = this.tip(), title = this.getTitle();
            $tip.find(".tooltip-inner")[this.options.html ? "html" : "text"](title), $tip.removeClass("fade in top bottom left right");
        }, Tooltip.prototype.hide = function(callback) {
            function complete() {
                "in" != that.hoverState && $tip.detach(), that.$element.removeAttr("aria-describedby").trigger("hidden.bs." + that.type), 
                callback && callback();
            }
            var that = this, $tip = this.tip(), e = $.Event("hide.bs." + this.type);
            return this.$element.trigger(e), e.isDefaultPrevented() ? void 0 : ($tip.removeClass("in"), 
            $.support.transition && this.$tip.hasClass("fade") ? $tip.one("bsTransitionEnd", complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete(), 
            this.hoverState = null, this);
        }, Tooltip.prototype.fixTitle = function() {
            var $e = this.$element;
            ($e.attr("title") || "string" != typeof $e.attr("data-original-title")) && $e.attr("data-original-title", $e.attr("title") || "").attr("title", "");
        }, Tooltip.prototype.hasContent = function() {
            return this.getTitle();
        }, Tooltip.prototype.getPosition = function($element) {
            $element = $element || this.$element;
            var el = $element[0], isBody = "BODY" == el.tagName, elRect = el.getBoundingClientRect();
            null == elRect.width && (elRect = $.extend({}, elRect, {
                width: elRect.right - elRect.left,
                height: elRect.bottom - elRect.top
            }));
            var elOffset = isBody ? {
                top: 0,
                left: 0
            } : $element.offset(), scroll = {
                scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop()
            }, outerDims = isBody ? {
                width: $(window).width(),
                height: $(window).height()
            } : null;
            return $.extend({}, elRect, scroll, outerDims, elOffset);
        }, Tooltip.prototype.getCalculatedOffset = function(placement, pos, actualWidth, actualHeight) {
            return "bottom" == placement ? {
                top: pos.top + pos.height,
                left: pos.left + pos.width / 2 - actualWidth / 2
            } : "top" == placement ? {
                top: pos.top - actualHeight,
                left: pos.left + pos.width / 2 - actualWidth / 2
            } : "left" == placement ? {
                top: pos.top + pos.height / 2 - actualHeight / 2,
                left: pos.left - actualWidth
            } : {
                top: pos.top + pos.height / 2 - actualHeight / 2,
                left: pos.left + pos.width
            };
        }, Tooltip.prototype.getViewportAdjustedDelta = function(placement, pos, actualWidth, actualHeight) {
            var delta = {
                top: 0,
                left: 0
            };
            if (!this.$viewport) return delta;
            var viewportPadding = this.options.viewport && this.options.viewport.padding || 0, viewportDimensions = this.getPosition(this.$viewport);
            if (/right|left/.test(placement)) {
                var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll, bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight;
                topEdgeOffset < viewportDimensions.top ? delta.top = viewportDimensions.top - topEdgeOffset : bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height && (delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset);
            } else {
                var leftEdgeOffset = pos.left - viewportPadding, rightEdgeOffset = pos.left + viewportPadding + actualWidth;
                leftEdgeOffset < viewportDimensions.left ? delta.left = viewportDimensions.left - leftEdgeOffset : rightEdgeOffset > viewportDimensions.width && (delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset);
            }
            return delta;
        }, Tooltip.prototype.getTitle = function() {
            var title, $e = this.$element, o = this.options;
            return title = $e.attr("data-original-title") || ("function" == typeof o.title ? o.title.call($e[0]) : o.title);
        }, Tooltip.prototype.getUID = function(prefix) {
            do prefix += ~~(1e6 * Math.random()); while (document.getElementById(prefix));
            return prefix;
        }, Tooltip.prototype.tip = function() {
            return this.$tip = this.$tip || $(this.options.template);
        }, Tooltip.prototype.arrow = function() {
            return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
        }, Tooltip.prototype.enable = function() {
            this.enabled = !0;
        }, Tooltip.prototype.disable = function() {
            this.enabled = !1;
        }, Tooltip.prototype.toggleEnabled = function() {
            this.enabled = !this.enabled;
        }, Tooltip.prototype.toggle = function(e) {
            var self = this;
            e && (self = $(e.currentTarget).data("bs." + this.type), self || (self = new this.constructor(e.currentTarget, this.getDelegateOptions()), 
            $(e.currentTarget).data("bs." + this.type, self))), self.tip().hasClass("in") ? self.leave(self) : self.enter(self);
        }, Tooltip.prototype.destroy = function() {
            var that = this;
            clearTimeout(this.timeout), this.hide(function() {
                that.$element.off("." + that.type).removeData("bs." + that.type);
            });
        };
        var old = $.fn.tooltip;
        $.fn.tooltip = Plugin, $.fn.tooltip.Constructor = Tooltip, $.fn.tooltip.noConflict = function() {
            return $.fn.tooltip = old, this;
        };
    }(jQuery), +function($) {
        "use strict";
        function Plugin(option) {
            return this.each(function() {
                var $this = $(this), data = $this.data("bs.popover"), options = "object" == typeof option && option, selector = options && options.selector;
                (data || "destroy" != option) && (selector ? (data || $this.data("bs.popover", data = {}), 
                data[selector] || (data[selector] = new Popover(this, options))) : data || $this.data("bs.popover", data = new Popover(this, options)), 
                "string" == typeof option && data[option]());
            });
        }
        var Popover = function(element, options) {
            this.init("popover", element, options);
        };
        if (!$.fn.tooltip) throw new Error("Popover requires tooltip.js");
        Popover.VERSION = "3.3.1", Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
        }), Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype), Popover.prototype.constructor = Popover, 
        Popover.prototype.getDefaults = function() {
            return Popover.DEFAULTS;
        }, Popover.prototype.setContent = function() {
            var $tip = this.tip(), title = this.getTitle(), content = this.getContent();
            $tip.find(".popover-title")[this.options.html ? "html" : "text"](title), $tip.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof content ? "html" : "append" : "text"](content), 
            $tip.removeClass("fade top bottom left right in"), $tip.find(".popover-title").html() || $tip.find(".popover-title").hide();
        }, Popover.prototype.hasContent = function() {
            return this.getTitle() || this.getContent();
        }, Popover.prototype.getContent = function() {
            var $e = this.$element, o = this.options;
            return $e.attr("data-content") || ("function" == typeof o.content ? o.content.call($e[0]) : o.content);
        }, Popover.prototype.arrow = function() {
            return this.$arrow = this.$arrow || this.tip().find(".arrow");
        }, Popover.prototype.tip = function() {
            return this.$tip || (this.$tip = $(this.options.template)), this.$tip;
        };
        var old = $.fn.popover;
        $.fn.popover = Plugin, $.fn.popover.Constructor = Popover, $.fn.popover.noConflict = function() {
            return $.fn.popover = old, this;
        };
    }(jQuery), +function($) {
        "use strict";
        function Plugin(option) {
            return this.each(function() {
                var $this = $(this), data = $this.data("bs.tab");
                data || $this.data("bs.tab", data = new Tab(this)), "string" == typeof option && data[option]();
            });
        }
        var Tab = function(element) {
            this.element = $(element);
        };
        Tab.VERSION = "3.3.1", Tab.TRANSITION_DURATION = 150, Tab.prototype.show = function() {
            var $this = this.element, $ul = $this.closest("ul:not(.dropdown-menu)"), selector = $this.data("target");
            if (selector || (selector = $this.attr("href"), selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "")), 
            !$this.parent("li").hasClass("active")) {
                var $previous = $ul.find(".active:last a"), hideEvent = $.Event("hide.bs.tab", {
                    relatedTarget: $this[0]
                }), showEvent = $.Event("show.bs.tab", {
                    relatedTarget: $previous[0]
                });
                if ($previous.trigger(hideEvent), $this.trigger(showEvent), !showEvent.isDefaultPrevented() && !hideEvent.isDefaultPrevented()) {
                    var $target = $(selector);
                    this.activate($this.closest("li"), $ul), this.activate($target, $target.parent(), function() {
                        $previous.trigger({
                            type: "hidden.bs.tab",
                            relatedTarget: $this[0]
                        }), $this.trigger({
                            type: "shown.bs.tab",
                            relatedTarget: $previous[0]
                        });
                    });
                }
            }
        }, Tab.prototype.activate = function(element, container, callback) {
            function next() {
                $active.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), 
                element.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), 
                transition ? (element[0].offsetWidth, element.addClass("in")) : element.removeClass("fade"), 
                element.parent(".dropdown-menu") && element.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), 
                callback && callback();
            }
            var $active = container.find("> .active"), transition = callback && $.support.transition && ($active.length && $active.hasClass("fade") || !!container.find("> .fade").length);
            $active.length && transition ? $active.one("bsTransitionEnd", next).emulateTransitionEnd(Tab.TRANSITION_DURATION) : next(), 
            $active.removeClass("in");
        };
        var old = $.fn.tab;
        $.fn.tab = Plugin, $.fn.tab.Constructor = Tab, $.fn.tab.noConflict = function() {
            return $.fn.tab = old, this;
        };
        var clickHandler = function(e) {
            e.preventDefault(), Plugin.call($(this), "show");
        };
        $(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', clickHandler).on("click.bs.tab.data-api", '[data-toggle="pill"]', clickHandler);
    }(jQuery), function(window, factory) {
        window.lazySizes = factory(window, window.document), "function" == typeof define && define.amd && define(window.lazySizes);
    }(window, function(window, document) {
        "use strict";
        if (document.getElementsByClassName) {
            var lazySizesConfig, docElem = document.documentElement, regPicture = /^picture$/i, loadEvents = [ "load", "error", "lazyincluded", "_lazyloaded" ], hasClass = function(ele, cls) {
                var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
                return ele.className.match(reg) && reg;
            }, addClass = function(ele, cls) {
                hasClass(ele, cls) || (ele.className += " " + cls);
            }, removeClass = function(ele, cls) {
                var reg;
                (reg = hasClass(ele, cls)) && (ele.className = ele.className.replace(reg, " "));
            }, addRemoveLoadEvents = function(dom, fn, add) {
                var action = add ? "addEventListener" : "removeEventListener";
                add && addRemoveLoadEvents(dom, fn), loadEvents.forEach(function(evt) {
                    dom[action](evt, fn);
                });
            }, triggerEvent = function(elem, name, details) {
                var event = document.createEvent("Event");
                return event.initEvent(name, !0, !0), event.details = details || {}, elem.dispatchEvent(event), 
                event;
            }, updatePolyfill = function(el, full) {
                var imageData, attr;
                window.HTMLPictureElement || (window.picturefill ? picturefill({
                    reevaluate: !0,
                    reparse: !0,
                    elements: [ el ]
                }) : window.respimage ? (full && (attr = full.srcset && "srcset" || full.src && "src") && (imageData = el[respimage._.ns], 
                imageData && imageData[attr] != full[attr] && el.getAttribute(attr) == full[attr] && (imageData[attr] = void 0)), 
                respimage({
                    reparse: !0,
                    elements: [ el ]
                })) : full && full.src && (el.src = full.src));
            }, getCSS = function(elem, style) {
                return getComputedStyle(elem, null)[style];
            }, getWidth = function(elem, parent) {
                for (var width = elem.offsetWidth; width < lazySizesConfig.minSize && parent && parent != document.body && !elem._lazysizesWidth; ) width = parent.offsetWidth, 
                parent = parent.parentNode;
                return width;
            }, throttle = function(fn) {
                var run, timer, main = function() {
                    run && (run = !1, fn());
                }, handleVisibility = function() {
                    clearInterval(timer), document.hidden || (main(), timer = setInterval(main, 66));
                };
                return document.addEventListener("visibilitychange", handleVisibility), handleVisibility(), 
                function(force) {
                    run = !0, force === !0 && main();
                };
            }, loader = function() {
                var lazyloadElems, preloadElems, isPreloadAllowed, isCompleted, resetPreloadingTimer, runThrough, eLvW, elvH, eLtop, eLleft, eLright, eLbottom, ua = navigator.userAgent, fixChrome = window.HTMLPictureElement && ua.match(/hrome\/(\d+)/) && 40 == RegExp.$1, supportNativeLQIP = /blink|webkit/i.test(ua), regImg = /^img$/i, regIframe = /^iframe$/i, shrinkExpand = -2, defaultExpand = shrinkExpand, preloadExpand = shrinkExpand, currentExpand = shrinkExpand, isExpandCalculated = !0, lowRuns = 0, isLoading = 0, checkElementsIndex = 0, resetPreloading = function(e) {
                    isLoading--, e && e.target && addRemoveLoadEvents(e.target, resetPreloading), (!e || 0 > isLoading || !e.target) && (isLoading = 0);
                }, isNestedVisible = function(elem, elemExpand) {
                    var outerRect, parent = elem, visible = "hidden" != getCSS(elem, "visibility");
                    for (eLtop -= elemExpand, eLbottom += elemExpand, eLleft -= elemExpand, eLright += elemExpand; visible && (parent = parent.offsetParent) && parent != docElem && parent != document.body; ) visible = isCompleted && 4 > isLoading || (getCSS(parent, "opacity") || 1) > 0, 
                    visible && "visible" != getCSS(parent, "overflow") && (outerRect = parent.getBoundingClientRect(), 
                    visible = eLright > outerRect.left - 1 && eLleft < outerRect.right + 1 && eLbottom > outerRect.top - 1 && eLtop < outerRect.bottom + 1);
                    return visible;
                }, checkElements = function() {
                    var rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal, beforeExpandVal, eLlen = lazyloadElems.length, start = Date.now(), i = checkElementsIndex;
                    if (isExpandCalculated || calcExpand(), eLlen) {
                        for (;eLlen > i && lazyloadElems[i]; i++, checkElementsIndex++) if ((elemExpandVal = lazyloadElems[i].getAttribute("data-expand")) && (elemExpand = 1 * elemExpandVal) || (elemExpand = currentExpand), 
                        !(isLoading > 6 && (!elemExpandVal || "src" in lazyloadElems[i]))) if (isLoading > 3 && elemExpand > shrinkExpand && (elemExpand = shrinkExpand), 
                        beforeExpandVal !== elemExpand && (eLvW = innerWidth + elemExpand, elvH = innerHeight + elemExpand, 
                        elemNegativeExpand = -1 * elemExpand, beforeExpandVal = elemExpand), rect = lazyloadElems[i].getBoundingClientRect(), 
                        (eLbottom = rect.bottom) >= elemNegativeExpand && (eLtop = rect.top) <= elvH && (eLright = rect.right) >= elemNegativeExpand && (eLleft = rect.left) <= eLvW && (eLbottom || eLright || eLleft || eLtop) && (isCompleted && currentExpand == defaultExpand && 3 > isLoading && 4 > lowRuns && !elemExpandVal || isNestedVisible(lazyloadElems[i], elemExpand))) checkElementsIndex--, 
                        start += 2, unveilElement(lazyloadElems[i]), loadedSomething = !0; else {
                            if (!runThrough && Date.now() - start > 3) return checkElementsIndex++, runThrough = !0, 
                            void throttledCheckElements();
                            !loadedSomething && isCompleted && !autoLoadElem && 3 > isLoading && 4 > lowRuns && (preloadElems[0] || lazySizesConfig.preloadAfterLoad) && (preloadElems[0] || !elemExpandVal && (eLbottom || eLright || eLleft || eLtop || "auto" != lazyloadElems[i].getAttribute(lazySizesConfig.sizesAttr))) && (autoLoadElem = preloadElems[0] || lazyloadElems[i]);
                        }
                        checkElementsIndex = 0, runThrough = !1, lowRuns++, preloadExpand > currentExpand && 2 > isLoading && lowRuns > 4 ? (currentExpand = preloadExpand, 
                        lowRuns = 0, throttledCheckElements()) : currentExpand != defaultExpand && (currentExpand = defaultExpand), 
                        autoLoadElem && !loadedSomething && unveilElement(autoLoadElem);
                    }
                }, throttledCheckElements = throttle(checkElements), switchLoadingClass = function(e) {
                    addClass(e.target, lazySizesConfig.loadedClass), removeClass(e.target, lazySizesConfig.loadingClass), 
                    addRemoveLoadEvents(e.target, switchLoadingClass);
                }, changeIframeSrc = function(elem, src) {
                    try {
                        elem.contentWindow.location.replace(src);
                    } catch (e) {
                        elem.setAttribute("src", src);
                    }
                }, unveilElement = function(elem, force) {
                    var sources, i, len, sourceSrcset, sizes, src, srcset, parent, isPicture, event, firesLoad, customMedia, curSrc = elem.currentSrc || elem.src, isImg = regImg.test(elem.nodeName);
                    if (supportNativeLQIP || isCompleted || !isImg || !curSrc || elem.complete) {
                        if (!(event = triggerEvent(elem, "lazybeforeunveil", {
                            force: !!force
                        })).defaultPrevented) {
                            if (sizes = elem.getAttribute(lazySizesConfig.sizesAttr) || elem.getAttribute("sizes"), 
                            sizes && ("auto" == sizes ? autoSizer.updateElem(elem, !0) : elem.setAttribute("sizes", sizes)), 
                            srcset = elem.getAttribute(lazySizesConfig.srcsetAttr), src = elem.getAttribute(lazySizesConfig.srcAttr), 
                            firesLoad = event.details.firesLoad || "src" in elem && (srcset || src), firesLoad && (isLoading++, 
                            addRemoveLoadEvents(elem, resetPreloading, !0), clearTimeout(resetPreloadingTimer), 
                            resetPreloadingTimer = setTimeout(resetPreloading, 3e3), isImg && (parent = elem.parentNode, 
                            isPicture = regPicture.test(parent.nodeName || ""))), srcset || src) {
                                if (isPicture) for (sources = parent.getElementsByTagName("source"), i = 0, len = sources.length; len > i; i++) (customMedia = lazySizesConfig.customMedia[sources[i].getAttribute("media")]) && sources[i].setAttribute("media", customMedia), 
                                sourceSrcset = sources[i].getAttribute(lazySizesConfig.srcsetAttr), sourceSrcset && sources[i].setAttribute("srcset", sourceSrcset);
                                srcset ? (elem.setAttribute("srcset", srcset), fixChrome && sizes && elem.removeAttribute("src")) : src && (regIframe.test(elem.nodeName) ? changeIframeSrc(elem, src) : elem.setAttribute("src", src));
                            }
                            lazySizesConfig.addClasses && (addClass(elem, lazySizesConfig.loadingClass), addRemoveLoadEvents(elem, switchLoadingClass, !0));
                        }
                        setTimeout(function() {
                            "auto" == sizes && addClass(elem, lazySizesConfig.autosizesClass), (srcset || sizes || isPicture) && updatePolyfill(elem, {
                                srcset: srcset,
                                src: src
                            }), removeClass(elem, lazySizesConfig.lazyClass), (!firesLoad || elem.complete && curSrc == (elem.currentSrc || elem.src)) && (firesLoad && resetPreloading({
                                target: elem
                            }), lazySizesConfig.addClasses && switchLoadingClass({
                                target: elem
                            })), elem = null;
                        });
                    }
                }, calcExpand = function() {
                    isPreloadAllowed && !isExpandCalculated && (defaultExpand = Math.max(Math.min(lazySizesConfig.expand || lazySizesConfig.threshold || 150, 300), 9), 
                    preloadExpand = Math.min(4 * defaultExpand, Math.max(1.1 * innerHeight, docElem.clientHeight, 3 * defaultExpand))), 
                    isExpandCalculated = !0;
                }, allowPreload = function() {
                    isPreloadAllowed = !0, isExpandCalculated = !1;
                }, onload = function() {
                    isCompleted = !0, allowPreload(), throttledCheckElements(!0);
                }, init = function() {
                    lazyloadElems = document.getElementsByClassName(lazySizesConfig.lazyClass), preloadElems = document.getElementsByClassName(lazySizesConfig.lazyClass + " " + lazySizesConfig.preloadClass), 
                    lazySizesConfig.scroll && addEventListener("scroll", throttledCheckElements, !0), 
                    addEventListener("resize", function() {
                        isExpandCalculated = !1, throttledCheckElements();
                    }), window.MutationObserver ? new MutationObserver(throttledCheckElements).observe(docElem, {
                        childList: !0,
                        subtree: !0,
                        attributes: !0
                    }) : (docElem.addEventListener("DOMNodeInserted", throttledCheckElements, !0), docElem.addEventListener("DOMAttrModified", throttledCheckElements, !0)), 
                    addEventListener("hashchange", throttledCheckElements, !0), [ "transitionstart", "transitionend", "load", "focus", "mouseover", "animationend", "click" ].forEach(function(evt) {
                        document.addEventListener(evt, throttledCheckElements, !0);
                    }), (isCompleted = /d$|^c/.test(document.readyState)) || (addEventListener("load", onload), 
                    document.addEventListener("DOMContentLoaded", throttledCheckElements)), setTimeout(allowPreload, 666), 
                    throttledCheckElements();
                };
                return {
                    init: init,
                    checkElems: throttledCheckElements,
                    unveil: unveilElement
                };
            }(), autoSizer = function() {
                var autosizesElems, sizeElement = function(elem, dataAttr) {
                    var width, sources, i, len, event, parent = elem.parentNode;
                    if (parent && (width = getWidth(elem, parent), event = triggerEvent(elem, "lazybeforesizes", {
                        width: width,
                        dataAttr: !!dataAttr
                    }), !event.defaultPrevented && (width = event.details.width, width && width !== elem._lazysizesWidth))) {
                        if (elem._lazysizesWidth = width, width += "px", elem.setAttribute("sizes", width), 
                        regPicture.test(parent.nodeName || "")) for (sources = parent.getElementsByTagName("source"), 
                        i = 0, len = sources.length; len > i; i++) sources[i].setAttribute("sizes", width);
                        event.details.dataAttr || updatePolyfill(elem, event.details);
                    }
                }, updateElementsSizes = function() {
                    var i, len = autosizesElems.length;
                    if (len) for (i = 0; len > i; i++) sizeElement(autosizesElems[i]);
                }, throttledUpdateElementsSizes = throttle(updateElementsSizes), init = function() {
                    autosizesElems = document.getElementsByClassName(lazySizesConfig.autosizesClass), 
                    addEventListener("resize", throttledUpdateElementsSizes);
                };
                return {
                    init: init,
                    checkElems: throttledUpdateElementsSizes,
                    updateElem: sizeElement
                };
            }();
            return function() {
                var prop, lazySizesDefaults = {
                    lazyClass: "lazyload",
                    loadedClass: "lazyloaded",
                    loadingClass: "lazyloading",
                    preloadClass: "lazypreload",
                    scroll: !0,
                    autosizesClass: "lazyautosizes",
                    srcAttr: "data-src",
                    srcsetAttr: "data-srcset",
                    sizesAttr: "data-sizes",
                    addClasses: !0,
                    minSize: 50,
                    customMedia: {}
                };
                lazySizesConfig = window.lazySizesConfig || {};
                for (prop in lazySizesDefaults) prop in lazySizesConfig || (lazySizesConfig[prop] = lazySizesDefaults[prop]);
                window.lazySizesConfig = lazySizesConfig, setTimeout(function() {
                    autoSizer.init(), loader.init();
                });
            }(), {
                cfg: lazySizesConfig,
                autoSizer: autoSizer,
                loader: loader,
                updateAllSizes: autoSizer.updateElems,
                updateAllLazy: loader.checkElems,
                unveilLazy: loader.unveil,
                uS: autoSizer.updateElem,
                uP: updatePolyfill,
                aC: addClass,
                rC: removeClass,
                hC: hasClass,
                fire: triggerEvent,
                gW: getWidth
            };
        }
    }), function(factory) {
        "function" == typeof define && define.amd && define.amd.jQuery ? define([ "jquery" ], factory) : factory(jQuery);
    }(function($) {
        "use strict";
        function init(options) {
            return !options || void 0 !== options.allowPageScroll || void 0 === options.swipe && void 0 === options.swipeStatus || (options.allowPageScroll = NONE), 
            void 0 !== options.click && void 0 === options.tap && (options.tap = options.click), 
            options || (options = {}), options = $.extend({}, $.fn.swipe.defaults, options), 
            this.each(function() {
                var $this = $(this), plugin = $this.data(PLUGIN_NS);
                plugin || (plugin = new TouchSwipe(this, options), $this.data(PLUGIN_NS, plugin));
            });
        }
        function TouchSwipe(element, options) {
            function touchStart(jqEvent) {
                if (!(getTouchInProgress() || $(jqEvent.target).closest(options.excludedElements, $element).length > 0)) {
                    var ret, event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent, evt = SUPPORTS_TOUCH ? event.touches[0] : event;
                    return phase = PHASE_START, SUPPORTS_TOUCH ? fingerCount = event.touches.length : jqEvent.preventDefault(), 
                    distance = 0, direction = null, pinchDirection = null, duration = 0, startTouchesDistance = 0, 
                    endTouchesDistance = 0, pinchZoom = 1, pinchDistance = 0, fingerData = createAllFingerData(), 
                    maximumsMap = createMaximumsData(), cancelMultiFingerRelease(), !SUPPORTS_TOUCH || fingerCount === options.fingers || options.fingers === ALL_FINGERS || hasPinches() ? (createFingerData(0, evt), 
                    startTime = getTimeStamp(), 2 == fingerCount && (createFingerData(1, event.touches[1]), 
                    startTouchesDistance = endTouchesDistance = calculateTouchesDistance(fingerData[0].start, fingerData[1].start)), 
                    (options.swipeStatus || options.pinchStatus) && (ret = triggerHandler(event, phase))) : ret = !1, 
                    ret === !1 ? (phase = PHASE_CANCEL, triggerHandler(event, phase), ret) : (options.hold && (holdTimeout = setTimeout($.proxy(function() {
                        $element.trigger("hold", [ event.target ]), options.hold && (ret = options.hold.call($element, event, event.target));
                    }, this), options.longTapThreshold)), setTouchInProgress(!0), null);
                }
            }
            function touchMove(jqEvent) {
                var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;
                if (phase !== PHASE_END && phase !== PHASE_CANCEL && !inMultiFingerRelease()) {
                    var ret, evt = SUPPORTS_TOUCH ? event.touches[0] : event, currentFinger = updateFingerData(evt);
                    if (endTime = getTimeStamp(), SUPPORTS_TOUCH && (fingerCount = event.touches.length), 
                    options.hold && clearTimeout(holdTimeout), phase = PHASE_MOVE, 2 == fingerCount && (0 == startTouchesDistance ? (createFingerData(1, event.touches[1]), 
                    startTouchesDistance = endTouchesDistance = calculateTouchesDistance(fingerData[0].start, fingerData[1].start)) : (updateFingerData(event.touches[1]), 
                    endTouchesDistance = calculateTouchesDistance(fingerData[0].end, fingerData[1].end), 
                    pinchDirection = calculatePinchDirection(fingerData[0].end, fingerData[1].end)), 
                    pinchZoom = calculatePinchZoom(startTouchesDistance, endTouchesDistance), pinchDistance = Math.abs(startTouchesDistance - endTouchesDistance)), 
                    fingerCount === options.fingers || options.fingers === ALL_FINGERS || !SUPPORTS_TOUCH || hasPinches()) {
                        if (direction = calculateDirection(currentFinger.start, currentFinger.end), validateDefaultEvent(jqEvent, direction), 
                        distance = calculateDistance(currentFinger.start, currentFinger.end), duration = calculateDuration(), 
                        setMaxDistance(direction, distance), (options.swipeStatus || options.pinchStatus) && (ret = triggerHandler(event, phase)), 
                        !options.triggerOnTouchEnd || options.triggerOnTouchLeave) {
                            var inBounds = !0;
                            if (options.triggerOnTouchLeave) {
                                var bounds = getbounds(this);
                                inBounds = isInBounds(currentFinger.end, bounds);
                            }
                            !options.triggerOnTouchEnd && inBounds ? phase = getNextPhase(PHASE_MOVE) : options.triggerOnTouchLeave && !inBounds && (phase = getNextPhase(PHASE_END)), 
                            (phase == PHASE_CANCEL || phase == PHASE_END) && triggerHandler(event, phase);
                        }
                    } else phase = PHASE_CANCEL, triggerHandler(event, phase);
                    ret === !1 && (phase = PHASE_CANCEL, triggerHandler(event, phase));
                }
            }
            function touchEnd(jqEvent) {
                var event = jqEvent.originalEvent;
                return SUPPORTS_TOUCH && event.touches.length > 0 ? (startMultiFingerRelease(), 
                !0) : (inMultiFingerRelease() && (fingerCount = previousTouchFingerCount), endTime = getTimeStamp(), 
                duration = calculateDuration(), didSwipeBackToCancel() || !validateSwipeDistance() ? (phase = PHASE_CANCEL, 
                triggerHandler(event, phase)) : options.triggerOnTouchEnd || 0 == options.triggerOnTouchEnd && phase === PHASE_MOVE ? (jqEvent.preventDefault(), 
                phase = PHASE_END, triggerHandler(event, phase)) : !options.triggerOnTouchEnd && hasTap() ? (phase = PHASE_END, 
                triggerHandlerForGesture(event, phase, TAP)) : phase === PHASE_MOVE && (phase = PHASE_CANCEL, 
                triggerHandler(event, phase)), setTouchInProgress(!1), null);
            }
            function touchCancel() {
                fingerCount = 0, endTime = 0, startTime = 0, startTouchesDistance = 0, endTouchesDistance = 0, 
                pinchZoom = 1, cancelMultiFingerRelease(), setTouchInProgress(!1);
            }
            function touchLeave(jqEvent) {
                var event = jqEvent.originalEvent;
                options.triggerOnTouchLeave && (phase = getNextPhase(PHASE_END), triggerHandler(event, phase));
            }
            function removeListeners() {
                $element.unbind(START_EV, touchStart), $element.unbind(CANCEL_EV, touchCancel), 
                $element.unbind(MOVE_EV, touchMove), $element.unbind(END_EV, touchEnd), LEAVE_EV && $element.unbind(LEAVE_EV, touchLeave), 
                setTouchInProgress(!1);
            }
            function getNextPhase(currentPhase) {
                var nextPhase = currentPhase, validTime = validateSwipeTime(), validDistance = validateSwipeDistance(), didCancel = didSwipeBackToCancel();
                return !validTime || didCancel ? nextPhase = PHASE_CANCEL : !validDistance || currentPhase != PHASE_MOVE || options.triggerOnTouchEnd && !options.triggerOnTouchLeave ? !validDistance && currentPhase == PHASE_END && options.triggerOnTouchLeave && (nextPhase = PHASE_CANCEL) : nextPhase = PHASE_END, 
                nextPhase;
            }
            function triggerHandler(event, phase) {
                var ret = void 0;
                return didSwipe() || hasSwipes() || didPinch() || hasPinches() ? ((didSwipe() || hasSwipes()) && (ret = triggerHandlerForGesture(event, phase, SWIPE)), 
                (didPinch() || hasPinches()) && ret !== !1 && (ret = triggerHandlerForGesture(event, phase, PINCH))) : didDoubleTap() && ret !== !1 ? ret = triggerHandlerForGesture(event, phase, DOUBLE_TAP) : didLongTap() && ret !== !1 ? ret = triggerHandlerForGesture(event, phase, LONG_TAP) : didTap() && ret !== !1 && (ret = triggerHandlerForGesture(event, phase, TAP)), 
                phase === PHASE_CANCEL && touchCancel(event), phase === PHASE_END && (SUPPORTS_TOUCH ? 0 == event.touches.length && touchCancel(event) : touchCancel(event)), 
                ret;
            }
            function triggerHandlerForGesture(event, phase, gesture) {
                var ret = void 0;
                if (gesture == SWIPE) {
                    if ($element.trigger("swipeStatus", [ phase, direction || null, distance || 0, duration || 0, fingerCount, fingerData ]), 
                    options.swipeStatus && (ret = options.swipeStatus.call($element, event, phase, direction || null, distance || 0, duration || 0, fingerCount, fingerData), 
                    ret === !1)) return !1;
                    if (phase == PHASE_END && validateSwipe()) {
                        if ($element.trigger("swipe", [ direction, distance, duration, fingerCount, fingerData ]), 
                        options.swipe && (ret = options.swipe.call($element, event, direction, distance, duration, fingerCount, fingerData), 
                        ret === !1)) return !1;
                        switch (direction) {
                          case LEFT:
                            $element.trigger("swipeLeft", [ direction, distance, duration, fingerCount, fingerData ]), 
                            options.swipeLeft && (ret = options.swipeLeft.call($element, event, direction, distance, duration, fingerCount, fingerData));
                            break;

                          case RIGHT:
                            $element.trigger("swipeRight", [ direction, distance, duration, fingerCount, fingerData ]), 
                            options.swipeRight && (ret = options.swipeRight.call($element, event, direction, distance, duration, fingerCount, fingerData));
                            break;

                          case UP:
                            $element.trigger("swipeUp", [ direction, distance, duration, fingerCount, fingerData ]), 
                            options.swipeUp && (ret = options.swipeUp.call($element, event, direction, distance, duration, fingerCount, fingerData));
                            break;

                          case DOWN:
                            $element.trigger("swipeDown", [ direction, distance, duration, fingerCount, fingerData ]), 
                            options.swipeDown && (ret = options.swipeDown.call($element, event, direction, distance, duration, fingerCount, fingerData));
                        }
                    }
                }
                if (gesture == PINCH) {
                    if ($element.trigger("pinchStatus", [ phase, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData ]), 
                    options.pinchStatus && (ret = options.pinchStatus.call($element, event, phase, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData), 
                    ret === !1)) return !1;
                    if (phase == PHASE_END && validatePinch()) switch (pinchDirection) {
                      case IN:
                        $element.trigger("pinchIn", [ pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData ]), 
                        options.pinchIn && (ret = options.pinchIn.call($element, event, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData));
                        break;

                      case OUT:
                        $element.trigger("pinchOut", [ pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData ]), 
                        options.pinchOut && (ret = options.pinchOut.call($element, event, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData));
                    }
                }
                return gesture == TAP ? (phase === PHASE_CANCEL || phase === PHASE_END) && (clearTimeout(singleTapTimeout), 
                clearTimeout(holdTimeout), hasDoubleTap() && !inDoubleTap() ? (doubleTapStartTime = getTimeStamp(), 
                singleTapTimeout = setTimeout($.proxy(function() {
                    doubleTapStartTime = null, $element.trigger("tap", [ event.target ]), options.tap && (ret = options.tap.call($element, event, event.target));
                }, this), options.doubleTapThreshold)) : (doubleTapStartTime = null, $element.trigger("tap", [ event.target ]), 
                options.tap && (ret = options.tap.call($element, event, event.target)))) : gesture == DOUBLE_TAP ? (phase === PHASE_CANCEL || phase === PHASE_END) && (clearTimeout(singleTapTimeout), 
                doubleTapStartTime = null, $element.trigger("doubletap", [ event.target ]), options.doubleTap && (ret = options.doubleTap.call($element, event, event.target))) : gesture == LONG_TAP && (phase === PHASE_CANCEL || phase === PHASE_END) && (clearTimeout(singleTapTimeout), 
                doubleTapStartTime = null, $element.trigger("longtap", [ event.target ]), options.longTap && (ret = options.longTap.call($element, event, event.target))), 
                ret;
            }
            function validateSwipeDistance() {
                var valid = !0;
                return null !== options.threshold && (valid = distance >= options.threshold), valid;
            }
            function didSwipeBackToCancel() {
                var cancelled = !1;
                return null !== options.cancelThreshold && null !== direction && (cancelled = getMaxDistance(direction) - distance >= options.cancelThreshold), 
                cancelled;
            }
            function validatePinchDistance() {
                return null !== options.pinchThreshold ? pinchDistance >= options.pinchThreshold : !0;
            }
            function validateSwipeTime() {
                var result;
                return result = options.maxTimeThreshold && duration >= options.maxTimeThreshold ? !1 : !0;
            }
            function validateDefaultEvent(jqEvent, direction) {
                if (options.preventDefaultEvents !== !1) if (options.allowPageScroll === NONE) jqEvent.preventDefault(); else {
                    var auto = options.allowPageScroll === AUTO;
                    switch (direction) {
                      case LEFT:
                        (options.swipeLeft && auto || !auto && options.allowPageScroll != HORIZONTAL) && jqEvent.preventDefault();
                        break;

                      case RIGHT:
                        (options.swipeRight && auto || !auto && options.allowPageScroll != HORIZONTAL) && jqEvent.preventDefault();
                        break;

                      case UP:
                        (options.swipeUp && auto || !auto && options.allowPageScroll != VERTICAL) && jqEvent.preventDefault();
                        break;

                      case DOWN:
                        (options.swipeDown && auto || !auto && options.allowPageScroll != VERTICAL) && jqEvent.preventDefault();
                    }
                }
            }
            function validatePinch() {
                var hasCorrectFingerCount = validateFingers(), hasEndPoint = validateEndPoint(), hasCorrectDistance = validatePinchDistance();
                return hasCorrectFingerCount && hasEndPoint && hasCorrectDistance;
            }
            function hasPinches() {
                return !!(options.pinchStatus || options.pinchIn || options.pinchOut);
            }
            function didPinch() {
                return !(!validatePinch() || !hasPinches());
            }
            function validateSwipe() {
                var hasValidTime = validateSwipeTime(), hasValidDistance = validateSwipeDistance(), hasCorrectFingerCount = validateFingers(), hasEndPoint = validateEndPoint(), didCancel = didSwipeBackToCancel(), valid = !didCancel && hasEndPoint && hasCorrectFingerCount && hasValidDistance && hasValidTime;
                return valid;
            }
            function hasSwipes() {
                return !!(options.swipe || options.swipeStatus || options.swipeLeft || options.swipeRight || options.swipeUp || options.swipeDown);
            }
            function didSwipe() {
                return !(!validateSwipe() || !hasSwipes());
            }
            function validateFingers() {
                return fingerCount === options.fingers || options.fingers === ALL_FINGERS || !SUPPORTS_TOUCH;
            }
            function validateEndPoint() {
                return 0 !== fingerData[0].end.x;
            }
            function hasTap() {
                return !!options.tap;
            }
            function hasDoubleTap() {
                return !!options.doubleTap;
            }
            function hasLongTap() {
                return !!options.longTap;
            }
            function validateDoubleTap() {
                if (null == doubleTapStartTime) return !1;
                var now = getTimeStamp();
                return hasDoubleTap() && now - doubleTapStartTime <= options.doubleTapThreshold;
            }
            function inDoubleTap() {
                return validateDoubleTap();
            }
            function validateTap() {
                return (1 === fingerCount || !SUPPORTS_TOUCH) && (isNaN(distance) || distance < options.threshold);
            }
            function validateLongTap() {
                return duration > options.longTapThreshold && DOUBLE_TAP_THRESHOLD > distance;
            }
            function didTap() {
                return !(!validateTap() || !hasTap());
            }
            function didDoubleTap() {
                return !(!validateDoubleTap() || !hasDoubleTap());
            }
            function didLongTap() {
                return !(!validateLongTap() || !hasLongTap());
            }
            function startMultiFingerRelease() {
                previousTouchEndTime = getTimeStamp(), previousTouchFingerCount = event.touches.length + 1;
            }
            function cancelMultiFingerRelease() {
                previousTouchEndTime = 0, previousTouchFingerCount = 0;
            }
            function inMultiFingerRelease() {
                var withinThreshold = !1;
                if (previousTouchEndTime) {
                    var diff = getTimeStamp() - previousTouchEndTime;
                    diff <= options.fingerReleaseThreshold && (withinThreshold = !0);
                }
                return withinThreshold;
            }
            function getTouchInProgress() {
                return !($element.data(PLUGIN_NS + "_intouch") !== !0);
            }
            function setTouchInProgress(val) {
                val === !0 ? ($element.bind(MOVE_EV, touchMove), $element.bind(END_EV, touchEnd), 
                LEAVE_EV && $element.bind(LEAVE_EV, touchLeave)) : ($element.unbind(MOVE_EV, touchMove, !1), 
                $element.unbind(END_EV, touchEnd, !1), LEAVE_EV && $element.unbind(LEAVE_EV, touchLeave, !1)), 
                $element.data(PLUGIN_NS + "_intouch", val === !0);
            }
            function createFingerData(index, evt) {
                var id = void 0 !== evt.identifier ? evt.identifier : 0;
                return fingerData[index].identifier = id, fingerData[index].start.x = fingerData[index].end.x = evt.pageX || evt.clientX, 
                fingerData[index].start.y = fingerData[index].end.y = evt.pageY || evt.clientY, 
                fingerData[index];
            }
            function updateFingerData(evt) {
                var id = void 0 !== evt.identifier ? evt.identifier : 0, f = getFingerData(id);
                return f.end.x = evt.pageX || evt.clientX, f.end.y = evt.pageY || evt.clientY, f;
            }
            function getFingerData(id) {
                for (var i = 0; i < fingerData.length; i++) if (fingerData[i].identifier == id) return fingerData[i];
            }
            function createAllFingerData() {
                for (var fingerData = [], i = 0; 5 >= i; i++) fingerData.push({
                    start: {
                        x: 0,
                        y: 0
                    },
                    end: {
                        x: 0,
                        y: 0
                    },
                    identifier: 0
                });
                return fingerData;
            }
            function setMaxDistance(direction, distance) {
                distance = Math.max(distance, getMaxDistance(direction)), maximumsMap[direction].distance = distance;
            }
            function getMaxDistance(direction) {
                return maximumsMap[direction] ? maximumsMap[direction].distance : void 0;
            }
            function createMaximumsData() {
                var maxData = {};
                return maxData[LEFT] = createMaximumVO(LEFT), maxData[RIGHT] = createMaximumVO(RIGHT), 
                maxData[UP] = createMaximumVO(UP), maxData[DOWN] = createMaximumVO(DOWN), maxData;
            }
            function createMaximumVO(dir) {
                return {
                    direction: dir,
                    distance: 0
                };
            }
            function calculateDuration() {
                return endTime - startTime;
            }
            function calculateTouchesDistance(startPoint, endPoint) {
                var diffX = Math.abs(startPoint.x - endPoint.x), diffY = Math.abs(startPoint.y - endPoint.y);
                return Math.round(Math.sqrt(diffX * diffX + diffY * diffY));
            }
            function calculatePinchZoom(startDistance, endDistance) {
                var percent = endDistance / startDistance * 1;
                return percent.toFixed(2);
            }
            function calculatePinchDirection() {
                return 1 > pinchZoom ? OUT : IN;
            }
            function calculateDistance(startPoint, endPoint) {
                return Math.round(Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2)));
            }
            function calculateAngle(startPoint, endPoint) {
                var x = startPoint.x - endPoint.x, y = endPoint.y - startPoint.y, r = Math.atan2(y, x), angle = Math.round(180 * r / Math.PI);
                return 0 > angle && (angle = 360 - Math.abs(angle)), angle;
            }
            function calculateDirection(startPoint, endPoint) {
                var angle = calculateAngle(startPoint, endPoint);
                return 45 >= angle && angle >= 0 ? LEFT : 360 >= angle && angle >= 315 ? LEFT : angle >= 135 && 225 >= angle ? RIGHT : angle > 45 && 135 > angle ? DOWN : UP;
            }
            function getTimeStamp() {
                var now = new Date();
                return now.getTime();
            }
            function getbounds(el) {
                el = $(el);
                var offset = el.offset(), bounds = {
                    left: offset.left,
                    right: offset.left + el.outerWidth(),
                    top: offset.top,
                    bottom: offset.top + el.outerHeight()
                };
                return bounds;
            }
            function isInBounds(point, bounds) {
                return point.x > bounds.left && point.x < bounds.right && point.y > bounds.top && point.y < bounds.bottom;
            }
            var useTouchEvents = SUPPORTS_TOUCH || SUPPORTS_POINTER || !options.fallbackToMouseEvents, START_EV = useTouchEvents ? SUPPORTS_POINTER ? SUPPORTS_POINTER_IE10 ? "MSPointerDown" : "pointerdown" : "touchstart" : "mousedown", MOVE_EV = useTouchEvents ? SUPPORTS_POINTER ? SUPPORTS_POINTER_IE10 ? "MSPointerMove" : "pointermove" : "touchmove" : "mousemove", END_EV = useTouchEvents ? SUPPORTS_POINTER ? SUPPORTS_POINTER_IE10 ? "MSPointerUp" : "pointerup" : "touchend" : "mouseup", LEAVE_EV = useTouchEvents ? null : "mouseleave", CANCEL_EV = SUPPORTS_POINTER ? SUPPORTS_POINTER_IE10 ? "MSPointerCancel" : "pointercancel" : "touchcancel", distance = 0, direction = null, duration = 0, startTouchesDistance = 0, endTouchesDistance = 0, pinchZoom = 1, pinchDistance = 0, pinchDirection = 0, maximumsMap = null, $element = $(element), phase = "start", fingerCount = 0, fingerData = null, startTime = 0, endTime = 0, previousTouchEndTime = 0, previousTouchFingerCount = 0, doubleTapStartTime = 0, singleTapTimeout = null, holdTimeout = null;
            try {
                $element.bind(START_EV, touchStart), $element.bind(CANCEL_EV, touchCancel);
            } catch (e) {
                $.error("events not supported " + START_EV + "," + CANCEL_EV + " on jQuery.swipe");
            }
            this.enable = function() {
                return $element.bind(START_EV, touchStart), $element.bind(CANCEL_EV, touchCancel), 
                $element;
            }, this.disable = function() {
                return removeListeners(), $element;
            }, this.destroy = function() {
                removeListeners(), $element.data(PLUGIN_NS, null), $element = null;
            }, this.option = function(property, value) {
                if (void 0 !== options[property]) {
                    if (void 0 === value) return options[property];
                    options[property] = value;
                } else $.error("Option " + property + " does not exist on jQuery.swipe.options");
                return null;
            };
        }
        var LEFT = "left", RIGHT = "right", UP = "up", DOWN = "down", IN = "in", OUT = "out", NONE = "none", AUTO = "auto", SWIPE = "swipe", PINCH = "pinch", TAP = "tap", DOUBLE_TAP = "doubletap", LONG_TAP = "longtap", HORIZONTAL = "horizontal", VERTICAL = "vertical", ALL_FINGERS = "all", DOUBLE_TAP_THRESHOLD = 10, PHASE_START = "start", PHASE_MOVE = "move", PHASE_END = "end", PHASE_CANCEL = "cancel", SUPPORTS_TOUCH = "ontouchstart" in window, SUPPORTS_POINTER_IE10 = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled, SUPPORTS_POINTER = window.navigator.pointerEnabled || window.navigator.msPointerEnabled, PLUGIN_NS = "TouchSwipe", defaults = {
            fingers: 1,
            threshold: 75,
            cancelThreshold: null,
            pinchThreshold: 20,
            maxTimeThreshold: null,
            fingerReleaseThreshold: 250,
            longTapThreshold: 500,
            doubleTapThreshold: 200,
            swipe: null,
            swipeLeft: null,
            swipeRight: null,
            swipeUp: null,
            swipeDown: null,
            swipeStatus: null,
            pinchIn: null,
            pinchOut: null,
            pinchStatus: null,
            click: null,
            tap: null,
            doubleTap: null,
            longTap: null,
            hold: null,
            triggerOnTouchEnd: !0,
            triggerOnTouchLeave: !1,
            allowPageScroll: "auto",
            fallbackToMouseEvents: !0,
            excludedElements: "label, button, input, select, textarea, a, .noSwipe",
            preventDefaultEvents: !0
        };
        $.fn.swipe = function(method) {
            var $this = $(this), plugin = $this.data(PLUGIN_NS);
            if (plugin && "string" == typeof method) {
                if (plugin[method]) return plugin[method].apply(this, Array.prototype.slice.call(arguments, 1));
                $.error("Method " + method + " does not exist on jQuery.swipe");
            } else if (!(plugin || "object" != typeof method && method)) return init.apply(this, arguments);
            return $this;
        }, $.fn.swipe.defaults = defaults, $.fn.swipe.phases = {
            PHASE_START: PHASE_START,
            PHASE_MOVE: PHASE_MOVE,
            PHASE_END: PHASE_END,
            PHASE_CANCEL: PHASE_CANCEL
        }, $.fn.swipe.directions = {
            LEFT: LEFT,
            RIGHT: RIGHT,
            UP: UP,
            DOWN: DOWN,
            IN: IN,
            OUT: OUT
        }, $.fn.swipe.pageScroll = {
            NONE: NONE,
            HORIZONTAL: HORIZONTAL,
            VERTICAL: VERTICAL,
            AUTO: AUTO
        }, $.fn.swipe.fingers = {
            ONE: 1,
            TWO: 2,
            THREE: 3,
            ALL: ALL_FINGERS
        };
    }), !function($) {
        var WinReszier = function() {
            var timer, registered = [], inited = !1, resize = function() {
                clearTimeout(timer), timer = setTimeout(notify, 100);
            }, notify = function() {
                for (var i = 0, cnt = registered.length; cnt > i; i++) registered[i].apply();
            };
            return {
                register: function(fn) {
                    registered.push(fn), inited === !1 && ($(window).bind("resize", resize), inited = !0);
                },
                unregister: function(fn) {
                    for (var i = 0, cnt = registered.length; cnt > i; i++) if (registered[i] == fn) {
                        delete registered[i];
                        break;
                    }
                }
            };
        }(), TabDrop = function(element, options) {
            this.element = $(element), this.dropdown = $('<li class="dropdown hide pull-right tabdrop"><a class="dropdown-toggle" data-toggle="dropdown" href="#">' + options.text + ' <b class="caret"></b></a><ul class="dropdown-menu"></ul></li>').prependTo(this.element), 
            this.element.parent().is(".tabs-below") && this.dropdown.addClass("dropup"), WinReszier.register($.proxy(this.layout, this)), 
            this.layout();
        };
        TabDrop.prototype = {
            constructor: TabDrop,
            layout: function() {
                var collection = [];
                this.dropdown.removeClass("hide"), this.element.append(this.dropdown.find("li")).find(">li").not(".tabdrop").each(function() {
                    this.offsetTop > 0 && collection.push(this);
                }), collection.length > 0 ? (collection = $(collection), this.dropdown.find("ul").empty().append(collection), 
                1 == this.dropdown.find(".active").length ? this.dropdown.addClass("active") : this.dropdown.removeClass("active")) : this.dropdown.addClass("hide");
            }
        }, $.fn.tabdrop = function(option) {
            return this.each(function() {
                var $this = $(this), data = $this.data("tabdrop"), options = "object" == typeof option && option;
                data || $this.data("tabdrop", data = new TabDrop(this, $.extend({}, $.fn.tabdrop.defaults, options))), 
                "string" == typeof option && data[option]();
            });
        }, $.fn.tabdrop.defaults = {
            text: '<i class="icon-align-justify"></i>'
        }, $.fn.tabdrop.Constructor = TabDrop;
    }(window.jQuery), !function($) {
        var Slider = function(element, options) {
            this.element = $(element), this.picker = $('<div class="slider"><div class="slider-track"><div class="slider-selection"></div><div class="slider-handle"></div><div class="slider-handle"></div></div><div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div></div>').insertBefore(this.element).append(this.element), 
            this.id = this.element.data("slider-id") || options.id, this.id && (this.picker[0].id = this.id), 
            "undefined" != typeof Modernizr && Modernizr.touch && (this.touchCapable = !0);
            var tooltip = this.element.data("slider-tooltip") || options.tooltip;
            switch (this.tooltip = this.picker.find(".tooltip"), this.tooltipInner = this.tooltip.find("div.tooltip-inner"), 
            this.orientation = this.element.data("slider-orientation") || options.orientation, 
            this.orientation) {
              case "vertical":
                this.picker.addClass("slider-vertical"), this.stylePos = "top", this.mousePos = "pageY", 
                this.sizePos = "offsetHeight", this.tooltip.addClass("right")[0].style.left = "100%";
                break;

              default:
                this.picker.addClass("slider-horizontal"), this.orientation = "horizontal", this.stylePos = "left", 
                this.mousePos = "pageX", this.sizePos = "offsetWidth", this.tooltip.addClass("top")[0].style.top = -this.tooltip.outerHeight() - 14 + "px";
            }
            this.min = this.element.data("slider-min") || options.min, this.max = this.element.data("slider-max") || options.max, 
            this.step = this.element.data("slider-step") || options.step, this.value = this.element.data("slider-value") || options.value, 
            this.value[1] && (this.range = !0), this.selection = this.element.data("slider-selection") || options.selection, 
            this.selectionEl = this.picker.find(".slider-selection"), "none" === this.selection && this.selectionEl.addClass("hide"), 
            this.selectionElStyle = this.selectionEl[0].style, this.handle1 = this.picker.find(".slider-handle:first"), 
            this.handle1Stype = this.handle1[0].style, this.handle2 = this.picker.find(".slider-handle:last"), 
            this.handle2Stype = this.handle2[0].style;
            var handle = this.element.data("slider-handle") || options.handle;
            switch (handle) {
              case "round":
                this.handle1.addClass("round"), this.handle2.addClass("round");
                break;

              case "triangle":
                this.handle1.addClass("triangle"), this.handle2.addClass("triangle");
            }
            this.range ? (this.value[0] = Math.max(this.min, Math.min(this.max, this.value[0])), 
            this.value[1] = Math.max(this.min, Math.min(this.max, this.value[1]))) : (this.value = [ Math.max(this.min, Math.min(this.max, this.value)) ], 
            this.handle2.addClass("hide"), this.value[1] = "after" == this.selection ? this.max : this.min), 
            this.diff = this.max - this.min, this.percentage = [ 100 * (this.value[0] - this.min) / this.diff, 100 * (this.value[1] - this.min) / this.diff, 100 * this.step / this.diff ], 
            this.offset = this.picker.offset(), this.size = this.picker[0][this.sizePos], this.formater = options.formater, 
            this.layout(), this.picker.on(this.touchCapable ? {
                touchstart: $.proxy(this.mousedown, this)
            } : {
                mousedown: $.proxy(this.mousedown, this)
            }), "show" === tooltip ? this.picker.on({
                mouseenter: $.proxy(this.showTooltip, this),
                mouseleave: $.proxy(this.hideTooltip, this)
            }) : this.tooltip.addClass("hide");
        };
        Slider.prototype = {
            constructor: Slider,
            over: !1,
            inDrag: !1,
            showTooltip: function() {
                this.tooltip.addClass("in"), this.over = !0;
            },
            hideTooltip: function() {
                this.inDrag === !1 && this.tooltip.removeClass("in"), this.over = !1;
            },
            layout: function() {
                this.handle1Stype[this.stylePos] = this.percentage[0] + "%", this.handle2Stype[this.stylePos] = this.percentage[1] + "%", 
                "vertical" == this.orientation ? (this.selectionElStyle.top = Math.min(this.percentage[0], this.percentage[1]) + "%", 
                this.selectionElStyle.height = Math.abs(this.percentage[0] - this.percentage[1]) + "%") : (this.selectionElStyle.left = Math.min(this.percentage[0], this.percentage[1]) + "%", 
                this.selectionElStyle.width = Math.abs(this.percentage[0] - this.percentage[1]) + "%"), 
                this.range ? (this.tooltipInner.text(this.formater(this.value[0]) + " : " + this.formater(this.value[1])), 
                this.tooltip[0].style[this.stylePos] = this.size * (this.percentage[0] + (this.percentage[1] - this.percentage[0]) / 2) / 100 - ("vertical" === this.orientation ? this.tooltip.outerHeight() / 2 : this.tooltip.outerWidth() / 2) + "px") : (this.tooltipInner.text(this.formater(this.value[0])), 
                this.tooltip[0].style[this.stylePos] = this.size * this.percentage[0] / 100 - ("vertical" === this.orientation ? this.tooltip.outerHeight() / 2 : this.tooltip.outerWidth() / 2) + "px");
            },
            mousedown: function(ev) {
                this.touchCapable && "touchstart" === ev.type && (ev = ev.originalEvent), this.offset = this.picker.offset(), 
                this.size = this.picker[0][this.sizePos];
                var percentage = this.getPercentage(ev);
                if (this.range) {
                    var diff1 = Math.abs(this.percentage[0] - percentage), diff2 = Math.abs(this.percentage[1] - percentage);
                    this.dragged = diff2 > diff1 ? 0 : 1;
                } else this.dragged = 0;
                this.percentage[this.dragged] = percentage, this.layout(), $(document).on(this.touchCapable ? {
                    touchmove: $.proxy(this.mousemove, this),
                    touchend: $.proxy(this.mouseup, this)
                } : {
                    mousemove: $.proxy(this.mousemove, this),
                    mouseup: $.proxy(this.mouseup, this)
                }), this.inDrag = !0;
                var val = this.calculateValue();
                return this.element.trigger({
                    type: "slideStart",
                    value: val
                }).trigger({
                    type: "slide",
                    value: val
                }), !1;
            },
            mousemove: function(ev) {
                this.touchCapable && "touchmove" === ev.type && (ev = ev.originalEvent);
                var percentage = this.getPercentage(ev);
                this.range && (0 === this.dragged && this.percentage[1] < percentage ? (this.percentage[0] = this.percentage[1], 
                this.dragged = 1) : 1 === this.dragged && this.percentage[0] > percentage && (this.percentage[1] = this.percentage[0], 
                this.dragged = 0)), this.percentage[this.dragged] = percentage, this.layout();
                var val = this.calculateValue();
                return this.element.trigger({
                    type: "slide",
                    value: val
                }).data("value", val).prop("value", val), !1;
            },
            mouseup: function() {
                $(document).off(this.touchCapable ? {
                    touchmove: this.mousemove,
                    touchend: this.mouseup
                } : {
                    mousemove: this.mousemove,
                    mouseup: this.mouseup
                }), this.inDrag = !1, 0 == this.over && this.hideTooltip(), this.element;
                var val = this.calculateValue();
                return this.element.trigger({
                    type: "slideStop",
                    value: val
                }).data("value", val).prop("value", val), !1;
            },
            calculateValue: function() {
                var val;
                return this.range ? (val = [ this.min + Math.round(this.diff * this.percentage[0] / 100 / this.step) * this.step, this.min + Math.round(this.diff * this.percentage[1] / 100 / this.step) * this.step ], 
                this.value = val) : (val = this.min + Math.round(this.diff * this.percentage[0] / 100 / this.step) * this.step, 
                this.value = [ val, this.value[1] ]), val;
            },
            getPercentage: function(ev) {
                this.touchCapable && (ev = ev.touches[0]);
                var percentage = 100 * (ev[this.mousePos] - this.offset[this.stylePos]) / this.size;
                return percentage = Math.round(percentage / this.percentage[2]) * this.percentage[2], 
                Math.max(0, Math.min(100, percentage));
            },
            getValue: function() {
                return this.range ? this.value : this.value[0];
            },
            setValue: function(val) {
                this.value = val, this.range ? (this.value[0] = Math.max(this.min, Math.min(this.max, this.value[0])), 
                this.value[1] = Math.max(this.min, Math.min(this.max, this.value[1]))) : (this.value = [ Math.max(this.min, Math.min(this.max, this.value)) ], 
                this.handle2.addClass("hide"), this.value[1] = "after" == this.selection ? this.max : this.min), 
                this.diff = this.max - this.min, this.percentage = [ 100 * (this.value[0] - this.min) / this.diff, 100 * (this.value[1] - this.min) / this.diff, 100 * this.step / this.diff ], 
                this.layout();
            }
        }, $.fn.slider = function(option, val) {
            return this.each(function() {
                var $this = $(this), data = $this.data("slider"), options = "object" == typeof option && option;
                data || $this.data("slider", data = new Slider(this, $.extend({}, $.fn.slider.defaults, options))), 
                "string" == typeof option && data[option](val);
            });
        }, $.fn.slider.defaults = {
            min: 0,
            max: 10,
            step: 1,
            orientation: "horizontal",
            value: 5,
            selection: "before",
            tooltip: "show",
            handle: "round",
            formater: function(value) {
                return value;
            }
        }, $.fn.slider.Constructor = Slider;
    }(window.jQuery), function($) {
        function regexFromString(inputstring) {
            return new RegExp("^" + inputstring + "$");
        }
        function executeFunctionByName(functionName, context) {
            for (var args = Array.prototype.slice.call(arguments).splice(2), namespaces = functionName.split("."), func = namespaces.pop(), i = 0; i < namespaces.length; i++) context = context[namespaces[i]];
            return context[func].apply(this, args);
        }
        var createdElements = [], defaults = {
            options: {
                prependExistingHelpBlock: !1,
                sniffHtml: !0,
                preventSubmit: !0,
                submitError: !1,
                submitSuccess: !1,
                semanticallyStrict: !1,
                autoAdd: {
                    helpBlocks: !0
                },
                filter: function() {
                    return !0;
                }
            },
            methods: {
                init: function(options) {
                    var settings = $.extend(!0, {}, defaults);
                    settings.options = $.extend(!0, settings.options, options);
                    var $siblingElements = this, uniqueForms = $.unique($siblingElements.map(function() {
                        return $(this).parents("form")[0];
                    }).toArray());
                    return $(uniqueForms).bind("submit", function(e) {
                        var $form = $(this), warningsFound = 0, $inputs = $form.find("input,textarea,select").not("[type=submit],[type=image]").filter(settings.options.filter);
                        $inputs.trigger("submit.validation").trigger("validationLostFocus.validation"), 
                        $inputs.each(function(i, el) {
                            var $this = $(el), $controlGroup = $this.parents(".form-group:not(.no-validate)").first();
                            $controlGroup.hasClass("has-warning") && ($controlGroup.removeClass("has-warning").addClass("has-error"), 
                            warningsFound++);
                        }), $inputs.trigger("validationLostFocus.validation"), warningsFound ? (settings.options.preventSubmit && e.preventDefault(), 
                        $form.addClass("error"), $.isFunction(settings.options.submitError) && settings.options.submitError($form, e, $inputs.jqBootstrapValidation("collectErrors", !0))) : ($form.removeClass("error"), 
                        $.isFunction(settings.options.submitSuccess) && settings.options.submitSuccess($form, e));
                    }), this.each(function() {
                        var $this = $(this), $controlGroup = $this.parents(".form-group:not(.no-validate)").first(), $helpBlock = $controlGroup.find(".help-block").first(), $form = $this.parents("form").first(), validatorNames = [];
                        if (!$helpBlock.length && settings.options.autoAdd && settings.options.autoAdd.helpBlocks && ($helpBlock = $('<div class="help-block" />'), 
                        $controlGroup.find(".controls").append($helpBlock), createdElements.push($helpBlock[0])), 
                        settings.options.sniffHtml) {
                            var message = "";
                            if (void 0 !== $this.attr("pattern") && (message = "Not in the expected format<!-- data-validation-pattern-message to override -->", 
                            $this.data("validationPatternMessage") && (message = $this.data("validationPatternMessage")), 
                            $this.data("validationPatternMessage", message), $this.data("validationPatternRegex", $this.attr("pattern"))), 
                            void 0 !== $this.attr("max") || void 0 !== $this.attr("aria-valuemax")) {
                                var max = $this.attr(void 0 !== $this.attr("max") ? "max" : "aria-valuemax");
                                message = "Too high: Maximum of '" + max + "'<!-- data-validation-max-message to override -->", 
                                $this.data("validationMaxMessage") && (message = $this.data("validationMaxMessage")), 
                                $this.data("validationMaxMessage", message), $this.data("validationMaxMax", max);
                            }
                            if (void 0 !== $this.attr("min") || void 0 !== $this.attr("aria-valuemin")) {
                                var min = $this.attr(void 0 !== $this.attr("min") ? "min" : "aria-valuemin");
                                message = "Too low: Minimum of '" + min + "'<!-- data-validation-min-message to override -->", 
                                $this.data("validationMinMessage") && (message = $this.data("validationMinMessage")), 
                                $this.data("validationMinMessage", message), $this.data("validationMinMin", min);
                            }
                            void 0 !== $this.attr("maxlength") && (message = "Too long: Maximum of '" + $this.attr("maxlength") + "' characters<!-- data-validation-maxlength-message to override -->", 
                            $this.data("validationMaxlengthMessage") && (message = $this.data("validationMaxlengthMessage")), 
                            $this.data("validationMaxlengthMessage", message), $this.data("validationMaxlengthMaxlength", $this.attr("maxlength"))), 
                            void 0 !== $this.attr("minlength") && (message = "Too short: Minimum of '" + $this.attr("minlength") + "' characters<!-- data-validation-minlength-message to override -->", 
                            $this.data("validationMinlengthMessage") && (message = $this.data("validationMinlengthMessage")), 
                            $this.data("validationMinlengthMessage", message), $this.data("validationMinlengthMinlength", $this.attr("minlength"))), 
                            (void 0 !== $this.attr("required") || void 0 !== $this.attr("aria-required")) && (message = settings.builtInValidators.required.message, 
                            $this.data("validationRequiredMessage") && (message = $this.data("validationRequiredMessage")), 
                            $this.data("validationRequiredMessage", message)), void 0 !== $this.attr("type") && "number" === $this.attr("type").toLowerCase() && (message = settings.builtInValidators.number.message, 
                            $this.data("validationNumberMessage") && (message = $this.data("validationNumberMessage")), 
                            $this.data("validationNumberMessage", message)), void 0 !== $this.attr("type") && "email" === $this.attr("type").toLowerCase() && (message = "Not a valid email address<!-- data-validator-validemail-message to override -->", 
                            $this.data("validationValidemailMessage") ? message = $this.data("validationValidemailMessage") : $this.data("validationEmailMessage") && (message = $this.data("validationEmailMessage")), 
                            $this.data("validationValidemailMessage", message)), void 0 !== $this.attr("minchecked") && (message = "Not enough options checked; Minimum of '" + $this.attr("minchecked") + "' required<!-- data-validation-minchecked-message to override -->", 
                            $this.data("validationMincheckedMessage") && (message = $this.data("validationMincheckedMessage")), 
                            $this.data("validationMincheckedMessage", message), $this.data("validationMincheckedMinchecked", $this.attr("minchecked"))), 
                            void 0 !== $this.attr("maxchecked") && (message = "Too many options checked; Maximum of '" + $this.attr("maxchecked") + "' required<!-- data-validation-maxchecked-message to override -->", 
                            $this.data("validationMaxcheckedMessage") && (message = $this.data("validationMaxcheckedMessage")), 
                            $this.data("validationMaxcheckedMessage", message), $this.data("validationMaxcheckedMaxchecked", $this.attr("maxchecked")));
                        }
                        void 0 !== $this.data("validation") && (validatorNames = $this.data("validation").split(",")), 
                        $.each($this.data(), function(i) {
                            var parts = i.replace(/([A-Z])/g, ",$1").split(",");
                            "validation" === parts[0] && parts[1] && validatorNames.push(parts[1]);
                        });
                        var validatorNamesToInspect = validatorNames, newValidatorNamesToInspect = [];
                        do $.each(validatorNames, function(i, el) {
                            validatorNames[i] = formatValidatorName(el);
                        }), validatorNames = $.unique(validatorNames), newValidatorNamesToInspect = [], 
                        $.each(validatorNamesToInspect, function(i, el) {
                            if (void 0 !== $this.data("validation" + el + "Shortcut")) $.each($this.data("validation" + el + "Shortcut").split(","), function(i2, el2) {
                                newValidatorNamesToInspect.push(el2);
                            }); else if (settings.builtInValidators[el.toLowerCase()]) {
                                var validator = settings.builtInValidators[el.toLowerCase()];
                                "shortcut" === validator.type.toLowerCase() && $.each(validator.shortcut.split(","), function(i, el) {
                                    el = formatValidatorName(el), newValidatorNamesToInspect.push(el), validatorNames.push(el);
                                });
                            }
                        }), validatorNamesToInspect = newValidatorNamesToInspect; while (validatorNamesToInspect.length > 0);
                        var validators = {};
                        $.each(validatorNames, function(i, el) {
                            var message = $this.data("validation" + el + "Message"), hasOverrideMessage = void 0 !== message, foundValidator = !1;
                            if (message = message ? message : "'" + el + "' validation failed <!-- Add attribute 'data-validation-" + el.toLowerCase() + "-message' to input to change this message -->", 
                            $.each(settings.validatorTypes, function(validatorType, validatorTemplate) {
                                void 0 === validators[validatorType] && (validators[validatorType] = []), foundValidator || void 0 === $this.data("validation" + el + formatValidatorName(validatorTemplate.name)) || (validators[validatorType].push($.extend(!0, {
                                    name: formatValidatorName(validatorTemplate.name),
                                    message: message
                                }, validatorTemplate.init($this, el))), foundValidator = !0);
                            }), !foundValidator && settings.builtInValidators[el.toLowerCase()]) {
                                var validator = $.extend(!0, {}, settings.builtInValidators[el.toLowerCase()]);
                                hasOverrideMessage && (validator.message = message);
                                var validatorType = validator.type.toLowerCase();
                                "shortcut" === validatorType ? foundValidator = !0 : $.each(settings.validatorTypes, function(validatorTemplateType, validatorTemplate) {
                                    void 0 === validators[validatorTemplateType] && (validators[validatorTemplateType] = []), 
                                    foundValidator || validatorType !== validatorTemplateType.toLowerCase() || ($this.data("validation" + el + formatValidatorName(validatorTemplate.name), validator[validatorTemplate.name.toLowerCase()]), 
                                    validators[validatorType].push($.extend(validator, validatorTemplate.init($this, el))), 
                                    foundValidator = !0);
                                });
                            }
                            foundValidator || $.error("Cannot find validation info for '" + el + "'");
                        }), $helpBlock.data("original-contents", $helpBlock.data("original-contents") ? $helpBlock.data("original-contents") : $helpBlock.html()), 
                        $helpBlock.data("original-role", $helpBlock.data("original-role") ? $helpBlock.data("original-role") : $helpBlock.attr("role")), 
                        $controlGroup.data("original-classes", $controlGroup.data("original-clases") ? $controlGroup.data("original-classes") : $controlGroup.attr("class")), 
                        $this.data("original-aria-invalid", $this.data("original-aria-invalid") ? $this.data("original-aria-invalid") : $this.attr("aria-invalid")), 
                        $this.bind("validation.validation", function(event, params) {
                            var value = getValue($this), errorsFound = [];
                            return $.each(validators, function(validatorType, validatorTypeArray) {
                                (value || value.length || params && params.includeEmpty || settings.validatorTypes[validatorType].blockSubmit && params && params.submitting) && $.each(validatorTypeArray, function(i, validator) {
                                    settings.validatorTypes[validatorType].validate($this, value, validator) && errorsFound.push(validator.message);
                                });
                            }), errorsFound;
                        }), $this.bind("getValidators.validation", function() {
                            return validators;
                        }), $this.bind("submit.validation", function() {
                            return $this.triggerHandler("change.validation", {
                                submitting: !0
                            });
                        }), $this.bind([ "keyup", "focus", "blur", "click", "keydown", "keypress", "change" ].join(".validation ") + ".validation", function(e, params) {
                            var value = getValue($this), errorsFound = [];
                            $controlGroup.find("input,textarea,select").each(function(i, el) {
                                var oldCount = errorsFound.length;
                                if ($.each($(el).triggerHandler("validation.validation", params), function(j, message) {
                                    errorsFound.push(message);
                                }), errorsFound.length > oldCount) $(el).attr("aria-invalid", "true"); else {
                                    var original = $this.data("original-aria-invalid");
                                    $(el).attr("aria-invalid", void 0 !== original ? original : !1);
                                }
                            }), $form.find("input,select,textarea").not($this).not('[name="' + $this.attr("name") + '"]').trigger("validationLostFocus.validation"), 
                            errorsFound = $.unique(errorsFound.sort()), errorsFound.length ? ($controlGroup.removeClass("has-success has-error").addClass("has-warning"), 
                            $helpBlock.html(settings.options.semanticallyStrict && 1 === errorsFound.length ? errorsFound[0] + (settings.options.prependExistingHelpBlock ? $helpBlock.data("original-contents") : "") : '<ul role="alert"><li>' + errorsFound.join("</li><li>") + "</li></ul>" + (settings.options.prependExistingHelpBlock ? $helpBlock.data("original-contents") : ""))) : ($controlGroup.removeClass("has-warning has-error has-success"), 
                            value.length > 0 && $controlGroup.addClass("has-success"), $helpBlock.html($helpBlock.data("original-contents"))), 
                            "blur" === e.type && $controlGroup.removeClass("has-success");
                        }), $this.bind("validationLostFocus.validation", function() {
                            $controlGroup.removeClass("has-success");
                        });
                    });
                },
                destroy: function() {
                    return this.each(function() {
                        var $this = $(this), $controlGroup = $this.parents(".form-group:not(.no-validate)").first(), $helpBlock = $controlGroup.find(".help-block").first();
                        $this.unbind(".validation"), $helpBlock.html($helpBlock.data("original-contents")), 
                        $controlGroup.attr("class", $controlGroup.data("original-classes")), $this.attr("aria-invalid", $this.data("original-aria-invalid")), 
                        $helpBlock.attr("role", $this.data("original-role")), createdElements.indexOf($helpBlock[0]) > -1 && $helpBlock.remove();
                    });
                },
                collectErrors: function() {
                    var errorMessages = {};
                    return this.each(function(i, el) {
                        var $el = $(el), name = $el.attr("name"), errors = $el.triggerHandler("validation.validation", {
                            includeEmpty: !0
                        });
                        errorMessages[name] = $.extend(!0, errors, errorMessages[name]);
                    }), $.each(errorMessages, function(i, el) {
                        0 === el.length && delete errorMessages[i];
                    }), errorMessages;
                },
                hasErrors: function() {
                    var errorMessages = [];
                    return this.each(function(i, el) {
                        errorMessages = errorMessages.concat($(el).triggerHandler("getValidators.validation") ? $(el).triggerHandler("validation.validation", {
                            submitting: !0
                        }) : []);
                    }), errorMessages.length > 0;
                },
                override: function(newDefaults) {
                    defaults = $.extend(!0, defaults, newDefaults);
                }
            },
            validatorTypes: {
                callback: {
                    name: "callback",
                    init: function($this, name) {
                        return {
                            validatorName: name,
                            callback: $this.data("validation" + name + "Callback"),
                            lastValue: $this.val(),
                            lastValid: !0,
                            lastFinished: !0
                        };
                    },
                    validate: function($this, value, validator) {
                        if (validator.lastValue === value && validator.lastFinished) return !validator.lastValid;
                        if (validator.lastFinished === !0) {
                            validator.lastValue = value, validator.lastValid = !0, validator.lastFinished = !1;
                            var rrjqbvValidator = validator, rrjqbvThis = $this;
                            executeFunctionByName(validator.callback, window, $this, value, function(data) {
                                rrjqbvValidator.lastValue === data.value && (rrjqbvValidator.lastValid = data.valid, 
                                data.message && (rrjqbvValidator.message = data.message), rrjqbvValidator.lastFinished = !0, 
                                rrjqbvThis.data("validation" + rrjqbvValidator.validatorName + "Message", rrjqbvValidator.message), 
                                setTimeout(function() {
                                    rrjqbvThis.trigger("change.validation");
                                }, 1));
                            });
                        }
                        return !1;
                    }
                },
                ajax: {
                    name: "ajax",
                    init: function($this, name) {
                        return {
                            validatorName: name,
                            url: $this.data("validation" + name + "Ajax"),
                            lastValue: $this.val(),
                            lastValid: !0,
                            lastFinished: !0
                        };
                    },
                    validate: function($this, value, validator) {
                        return "" + validator.lastValue == "" + value && validator.lastFinished === !0 ? validator.lastValid === !1 : (validator.lastFinished === !0 && (validator.lastValue = value, 
                        validator.lastValid = !0, validator.lastFinished = !1, $.ajax({
                            url: validator.url,
                            data: "value=" + value + "&field=" + $this.attr("name"),
                            dataType: "json",
                            success: function(data) {
                                "" + validator.lastValue == "" + data.value && (validator.lastValid = !!data.valid, 
                                data.message && (validator.message = data.message), validator.lastFinished = !0, 
                                $this.data("validation" + validator.validatorName + "Message", validator.message), 
                                setTimeout(function() {
                                    $this.trigger("change.validation");
                                }, 1));
                            },
                            failure: function() {
                                validator.lastValid = !0, validator.message = "ajax call failed", validator.lastFinished = !0, 
                                $this.data("validation" + validator.validatorName + "Message", validator.message), 
                                setTimeout(function() {
                                    $this.trigger("change.validation");
                                }, 1);
                            }
                        })), !1);
                    }
                },
                regex: {
                    name: "regex",
                    init: function($this, name) {
                        return {
                            regex: regexFromString($this.data("validation" + name + "Regex"))
                        };
                    },
                    validate: function($this, value, validator) {
                        return !validator.regex.test(value) && !validator.negative || validator.regex.test(value) && validator.negative;
                    }
                },
                required: {
                    name: "required",
                    init: function() {
                        return {};
                    },
                    validate: function($this, value, validator) {
                        return !(0 !== value.length || validator.negative) || !!(value.length > 0 && validator.negative);
                    },
                    blockSubmit: !0
                },
                match: {
                    name: "match",
                    init: function($this, name) {
                        var element = $this.parents("form").first().find('[name="' + $this.data("validation" + name + "Match") + '"]').first();
                        return element.bind("validation.validation", function() {
                            $this.trigger("change.validation", {
                                submitting: !0
                            });
                        }), {
                            element: element
                        };
                    },
                    validate: function($this, value, validator) {
                        return value !== validator.element.val() && !validator.negative || value === validator.element.val() && validator.negative;
                    },
                    blockSubmit: !0
                },
                max: {
                    name: "max",
                    init: function($this, name) {
                        return {
                            max: $this.data("validation" + name + "Max")
                        };
                    },
                    validate: function($this, value, validator) {
                        return parseFloat(value, 10) > parseFloat(validator.max, 10) && !validator.negative || parseFloat(value, 10) <= parseFloat(validator.max, 10) && validator.negative;
                    }
                },
                min: {
                    name: "min",
                    init: function($this, name) {
                        return {
                            min: $this.data("validation" + name + "Min")
                        };
                    },
                    validate: function($this, value, validator) {
                        return parseFloat(value) < parseFloat(validator.min) && !validator.negative || parseFloat(value) >= parseFloat(validator.min) && validator.negative;
                    }
                },
                maxlength: {
                    name: "maxlength",
                    init: function($this, name) {
                        return {
                            maxlength: $this.data("validation" + name + "Maxlength")
                        };
                    },
                    validate: function($this, value, validator) {
                        return value.length > validator.maxlength && !validator.negative || value.length <= validator.maxlength && validator.negative;
                    }
                },
                minlength: {
                    name: "minlength",
                    init: function($this, name) {
                        return {
                            minlength: $this.data("validation" + name + "Minlength")
                        };
                    },
                    validate: function($this, value, validator) {
                        return value.length < validator.minlength && !validator.negative || value.length >= validator.minlength && validator.negative;
                    }
                },
                maxchecked: {
                    name: "maxchecked",
                    init: function($this, name) {
                        var elements = $this.parents("form").first().find('[name="' + $this.attr("name") + '"]');
                        return elements.bind("click.validation", function() {
                            $this.trigger("change.validation", {
                                includeEmpty: !0
                            });
                        }), {
                            maxchecked: $this.data("validation" + name + "Maxchecked"),
                            elements: elements
                        };
                    },
                    validate: function($this, value, validator) {
                        return validator.elements.filter(":checked").length > validator.maxchecked && !validator.negative || validator.elements.filter(":checked").length <= validator.maxchecked && validator.negative;
                    },
                    blockSubmit: !0
                },
                minchecked: {
                    name: "minchecked",
                    init: function($this, name) {
                        var elements = $this.parents("form").first().find('[name="' + $this.attr("name") + '"]');
                        return elements.bind("click.validation", function() {
                            $this.trigger("change.validation", {
                                includeEmpty: !0
                            });
                        }), {
                            minchecked: $this.data("validation" + name + "Minchecked"),
                            elements: elements
                        };
                    },
                    validate: function($this, value, validator) {
                        return validator.elements.filter(":checked").length < validator.minchecked && !validator.negative || validator.elements.filter(":checked").length >= validator.minchecked && validator.negative;
                    },
                    blockSubmit: !0
                }
            },
            builtInValidators: {
                email: {
                    name: "Email",
                    type: "shortcut",
                    shortcut: "validemail"
                },
                validemail: {
                    name: "Validemail",
                    type: "regex",
                    regex: "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}",
                    message: "Not a valid email address<!-- data-validator-validemail-message to override -->"
                },
                passwordagain: {
                    name: "Passwordagain",
                    type: "match",
                    match: "password",
                    message: "Does not match the given password<!-- data-validator-paswordagain-message to override -->"
                },
                positive: {
                    name: "Positive",
                    type: "shortcut",
                    shortcut: "number,positivenumber"
                },
                negative: {
                    name: "Negative",
                    type: "shortcut",
                    shortcut: "number,negativenumber"
                },
                number: {
                    name: "Number",
                    type: "regex",
                    regex: "([+-]?\\d+(\\.\\d*)?([eE][+-]?[0-9]+)?)?",
                    message: "Must be a number<!-- data-validator-number-message to override -->"
                },
                integer: {
                    name: "Integer",
                    type: "regex",
                    regex: "[+-]?\\d+",
                    message: "No decimal places allowed<!-- data-validator-integer-message to override -->"
                },
                positivenumber: {
                    name: "Positivenumber",
                    type: "min",
                    min: 0,
                    message: "Must be a positive number<!-- data-validator-positivenumber-message to override -->"
                },
                negativenumber: {
                    name: "Negativenumber",
                    type: "max",
                    max: 0,
                    message: "Must be a negative number<!-- data-validator-negativenumber-message to override -->"
                },
                required: {
                    name: "Required",
                    type: "required",
                    message: "This is required<!-- data-validator-required-message to override -->"
                },
                checkone: {
                    name: "Checkone",
                    type: "minchecked",
                    minchecked: 1,
                    message: "Check at least one option<!-- data-validation-checkone-message to override -->"
                }
            }
        }, formatValidatorName = function(name) {
            return name.toLowerCase().replace(/(^|\s)([a-z])/g, function(m, p1, p2) {
                return p1 + p2.toUpperCase();
            });
        }, getValue = function($this) {
            var value = $this.val(), type = $this.attr("type");
            return "checkbox" === type && (value = $this.is(":checked") ? value : ""), "radio" === type && (value = $('input[name="' + $this.attr("name") + '"]:checked').length > 0 ? value : ""), 
            value;
        };
        $.fn.jqBootstrapValidation = function(method) {
            return defaults.methods[method] ? defaults.methods[method].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof method && method ? ($.error("Method " + method + " does not exist on jQuery.jqBootstrapValidation"), 
            null) : defaults.methods.init.apply(this, arguments);
        }, $.jqBootstrapValidation = function() {
            $(":input").not("[type=image],[type=submit]").jqBootstrapValidation.apply(this, arguments);
        };
    }(jQuery), function($, undefined) {
        function UTCDate() {
            return new Date(Date.UTC.apply(Date, arguments));
        }
        function UTCToday() {
            var today = new Date();
            return UTCDate(today.getFullYear(), today.getMonth(), today.getDate());
        }
        function isUTCEquals(date1, date2) {
            return date1.getUTCFullYear() === date2.getUTCFullYear() && date1.getUTCMonth() === date2.getUTCMonth() && date1.getUTCDate() === date2.getUTCDate();
        }
        function alias(method) {
            return function() {
                return this[method].apply(this, arguments);
            };
        }
        function opts_from_el(el, prefix) {
            function re_lower(_, a) {
                return a.toLowerCase();
            }
            var inkey, data = $(el).data(), out = {}, replace = new RegExp("^" + prefix.toLowerCase() + "([A-Z])");
            prefix = new RegExp("^" + prefix.toLowerCase());
            for (var key in data) prefix.test(key) && (inkey = key.replace(replace, re_lower), 
            out[inkey] = data[key]);
            return out;
        }
        function opts_from_locale(lang) {
            var out = {};
            if (dates[lang] || (lang = lang.split("-")[0], dates[lang])) {
                var d = dates[lang];
                return $.each(locale_opts, function(i, k) {
                    k in d && (out[k] = d[k]);
                }), out;
            }
        }
        var DateArray = function() {
            var extras = {
                get: function(i) {
                    return this.slice(i)[0];
                },
                contains: function(d) {
                    for (var val = d && d.valueOf(), i = 0, l = this.length; l > i; i++) if (this[i].valueOf() === val) return i;
                    return -1;
                },
                remove: function(i) {
                    this.splice(i, 1);
                },
                replace: function(new_array) {
                    new_array && ($.isArray(new_array) || (new_array = [ new_array ]), this.clear(), 
                    this.push.apply(this, new_array));
                },
                clear: function() {
                    this.length = 0;
                },
                copy: function() {
                    var a = new DateArray();
                    return a.replace(this), a;
                }
            };
            return function() {
                var a = [];
                return a.push.apply(a, arguments), $.extend(a, extras), a;
            };
        }(), Datepicker = function(element, options) {
            this._process_options(options), this.dates = new DateArray(), this.viewDate = this.o.defaultViewDate, 
            this.focusDate = null, this.element = $(element), this.isInline = !1, this.isInput = this.element.is("input"), 
            this.component = this.element.hasClass("date") ? this.element.find(".add-on, .input-group-addon, .btn") : !1, 
            this.hasInput = this.component && this.element.find("input").length, this.component && 0 === this.component.length && (this.component = !1), 
            this.picker = $(DPGlobal.template), this._buildEvents(), this._attachEvents(), this.isInline ? this.picker.addClass("datepicker-inline").appendTo(this.element) : this.picker.addClass("datepicker-dropdown dropdown-menu"), 
            this.o.rtl && this.picker.addClass("datepicker-rtl"), this.viewMode = this.o.startView, 
            this.o.calendarWeeks && this.picker.find("tfoot .today, tfoot .clear").attr("colspan", function(i, val) {
                return parseInt(val) + 1;
            }), this._allow_update = !1, this.setStartDate(this._o.startDate), this.setEndDate(this._o.endDate), 
            this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled), this.setDatesDisabled(this.o.datesDisabled), 
            this.fillDow(), this.fillMonths(), this._allow_update = !0, this.update(), this.showMode(), 
            this.isInline && this.show();
        };
        Datepicker.prototype = {
            constructor: Datepicker,
            _process_options: function(opts) {
                this._o = $.extend({}, this._o, opts);
                var o = this.o = $.extend({}, this._o), lang = o.language;
                switch (dates[lang] || (lang = lang.split("-")[0], dates[lang] || (lang = defaults.language)), 
                o.language = lang, o.startView) {
                  case 2:
                  case "decade":
                    o.startView = 2;
                    break;

                  case 1:
                  case "year":
                    o.startView = 1;
                    break;

                  default:
                    o.startView = 0;
                }
                switch (o.minViewMode) {
                  case 1:
                  case "months":
                    o.minViewMode = 1;
                    break;

                  case 2:
                  case "years":
                    o.minViewMode = 2;
                    break;

                  default:
                    o.minViewMode = 0;
                }
                o.startView = Math.max(o.startView, o.minViewMode), o.multidate !== !0 && (o.multidate = Number(o.multidate) || !1, 
                o.multidate !== !1 && (o.multidate = Math.max(0, o.multidate))), o.multidateSeparator = String(o.multidateSeparator), 
                o.weekStart %= 7, o.weekEnd = (o.weekStart + 6) % 7;
                var format = DPGlobal.parseFormat(o.format);
                if (o.startDate !== -1/0 && (o.startDate = o.startDate ? o.startDate instanceof Date ? this._local_to_utc(this._zero_time(o.startDate)) : DPGlobal.parseDate(o.startDate, format, o.language) : -1/0), 
                1/0 !== o.endDate && (o.endDate = o.endDate ? o.endDate instanceof Date ? this._local_to_utc(this._zero_time(o.endDate)) : DPGlobal.parseDate(o.endDate, format, o.language) : 1/0), 
                o.daysOfWeekDisabled = o.daysOfWeekDisabled || [], $.isArray(o.daysOfWeekDisabled) || (o.daysOfWeekDisabled = o.daysOfWeekDisabled.split(/[,\s]*/)), 
                o.daysOfWeekDisabled = $.map(o.daysOfWeekDisabled, function(d) {
                    return parseInt(d, 10);
                }), o.datesDisabled = o.datesDisabled || [], !$.isArray(o.datesDisabled)) {
                    var datesDisabled = [];
                    datesDisabled.push(DPGlobal.parseDate(o.datesDisabled, format, o.language)), o.datesDisabled = datesDisabled;
                }
                o.datesDisabled = $.map(o.datesDisabled, function(d) {
                    return DPGlobal.parseDate(d, format, o.language);
                });
                var plc = String(o.orientation).toLowerCase().split(/\s+/g), _plc = o.orientation.toLowerCase();
                if (plc = $.grep(plc, function(word) {
                    return /^auto|left|right|top|bottom$/.test(word);
                }), o.orientation = {
                    x: "auto",
                    y: "auto"
                }, _plc && "auto" !== _plc) if (1 === plc.length) switch (plc[0]) {
                  case "top":
                  case "bottom":
                    o.orientation.y = plc[0];
                    break;

                  case "left":
                  case "right":
                    o.orientation.x = plc[0];
                } else _plc = $.grep(plc, function(word) {
                    return /^left|right$/.test(word);
                }), o.orientation.x = _plc[0] || "auto", _plc = $.grep(plc, function(word) {
                    return /^top|bottom$/.test(word);
                }), o.orientation.y = _plc[0] || "auto"; else ;
                if (o.defaultViewDate) {
                    var year = o.defaultViewDate.year || new Date().getFullYear(), month = o.defaultViewDate.month || 0, day = o.defaultViewDate.day || 1;
                    o.defaultViewDate = UTCDate(year, month, day);
                } else o.defaultViewDate = UTCToday();
                o.showOnFocus = o.showOnFocus !== undefined ? o.showOnFocus : !0;
            },
            _events: [],
            _secondaryEvents: [],
            _applyEvents: function(evs) {
                for (var el, ch, ev, i = 0; i < evs.length; i++) el = evs[i][0], 2 === evs[i].length ? (ch = undefined, 
                ev = evs[i][1]) : 3 === evs[i].length && (ch = evs[i][1], ev = evs[i][2]), el.on(ev, ch);
            },
            _unapplyEvents: function(evs) {
                for (var el, ev, ch, i = 0; i < evs.length; i++) el = evs[i][0], 2 === evs[i].length ? (ch = undefined, 
                ev = evs[i][1]) : 3 === evs[i].length && (ch = evs[i][1], ev = evs[i][2]), el.off(ev, ch);
            },
            _buildEvents: function() {
                var events = {
                    keyup: $.proxy(function(e) {
                        -1 === $.inArray(e.keyCode, [ 27, 37, 39, 38, 40, 32, 13, 9 ]) && this.update();
                    }, this),
                    keydown: $.proxy(this.keydown, this),
                    paste: $.proxy(this.paste, this)
                };
                this.o.showOnFocus === !0 && (events.focus = $.proxy(this.show, this)), this.isInput ? this._events = [ [ this.element, events ] ] : this.component && this.hasInput ? this._events = [ [ this.element.find("input"), events ], [ this.component, {
                    click: $.proxy(this.show, this)
                } ] ] : this.element.is("div") ? this.isInline = !0 : this._events = [ [ this.element, {
                    click: $.proxy(this.show, this)
                } ] ], this._events.push([ this.element, "*", {
                    blur: $.proxy(function(e) {
                        this._focused_from = e.target;
                    }, this)
                } ], [ this.element, {
                    blur: $.proxy(function(e) {
                        this._focused_from = e.target;
                    }, this)
                } ]), this.o.immediateUpdates && this._events.push([ this.element, {
                    "changeYear changeMonth": $.proxy(function(e) {
                        this.update(e.date);
                    }, this)
                } ]), this._secondaryEvents = [ [ this.picker, {
                    click: $.proxy(this.click, this)
                } ], [ $(window), {
                    resize: $.proxy(this.place, this)
                } ], [ $(document), {
                    mousedown: $.proxy(function(e) {
                        this.element.is(e.target) || this.element.find(e.target).length || this.picker.is(e.target) || this.picker.find(e.target).length || $(this.picker).hide();
                    }, this)
                } ] ];
            },
            _attachEvents: function() {
                this._detachEvents(), this._applyEvents(this._events);
            },
            _detachEvents: function() {
                this._unapplyEvents(this._events);
            },
            _attachSecondaryEvents: function() {
                this._detachSecondaryEvents(), this._applyEvents(this._secondaryEvents);
            },
            _detachSecondaryEvents: function() {
                this._unapplyEvents(this._secondaryEvents);
            },
            _trigger: function(event, altdate) {
                var date = altdate || this.dates.get(-1), local_date = this._utc_to_local(date);
                this.element.trigger({
                    type: event,
                    date: local_date,
                    dates: $.map(this.dates, this._utc_to_local),
                    format: $.proxy(function(ix, format) {
                        0 === arguments.length ? (ix = this.dates.length - 1, format = this.o.format) : "string" == typeof ix && (format = ix, 
                        ix = this.dates.length - 1), format = format || this.o.format;
                        var date = this.dates.get(ix);
                        return DPGlobal.formatDate(date, format, this.o.language);
                    }, this)
                });
            },
            show: function() {
                return this.element.attr("readonly") && this.o.enableOnReadonly === !1 ? void 0 : (this.isInline || this.picker.appendTo(this.o.container), 
                this.place(), this.picker.show(), this._attachSecondaryEvents(), this._trigger("show"), 
                (window.navigator.msMaxTouchPoints || "ontouchstart" in document) && this.o.disableTouchKeyboard && $(this.element).blur(), 
                this);
            },
            hide: function() {
                return this.isInline ? this : this.picker.is(":visible") ? (this.focusDate = null, 
                this.picker.hide().detach(), this._detachSecondaryEvents(), this.viewMode = this.o.startView, 
                this.showMode(), this.o.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val()) && this.setValue(), 
                this._trigger("hide"), this) : this;
            },
            remove: function() {
                return this.hide(), this._detachEvents(), this._detachSecondaryEvents(), this.picker.remove(), 
                delete this.element.data().datepicker, this.isInput || delete this.element.data().date, 
                this;
            },
            paste: function(evt) {
                var dateString;
                if (evt.originalEvent.clipboardData && evt.originalEvent.clipboardData.types && -1 !== $.inArray("text/plain", evt.originalEvent.clipboardData.types)) dateString = evt.originalEvent.clipboardData.getData("text/plain"); else {
                    if (!window.clipboardData) return;
                    dateString = window.clipboardData.getData("Text");
                }
                this.setDate(dateString), this.update(), evt.preventDefault();
            },
            _utc_to_local: function(utc) {
                return utc && new Date(utc.getTime() + 6e4 * utc.getTimezoneOffset());
            },
            _local_to_utc: function(local) {
                return local && new Date(local.getTime() - 6e4 * local.getTimezoneOffset());
            },
            _zero_time: function(local) {
                return local && new Date(local.getFullYear(), local.getMonth(), local.getDate());
            },
            _zero_utc_time: function(utc) {
                return utc && new Date(Date.UTC(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate()));
            },
            getDates: function() {
                return $.map(this.dates, this._utc_to_local);
            },
            getUTCDates: function() {
                return $.map(this.dates, function(d) {
                    return new Date(d);
                });
            },
            getDate: function() {
                return this._utc_to_local(this.getUTCDate());
            },
            getUTCDate: function() {
                var selected_date = this.dates.get(-1);
                return "undefined" != typeof selected_date ? new Date(selected_date) : null;
            },
            clearDates: function() {
                var element;
                this.isInput ? element = this.element : this.component && (element = this.element.find("input")), 
                element && element.val("").change(), this.update(), this._trigger("changeDate"), 
                this.o.autoclose && this.hide();
            },
            setDates: function() {
                var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
                return this.update.apply(this, args), this._trigger("changeDate"), this.setValue(), 
                this;
            },
            setUTCDates: function() {
                var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
                return this.update.apply(this, $.map(args, this._utc_to_local)), this._trigger("changeDate"), 
                this.setValue(), this;
            },
            setDate: alias("setDates"),
            setUTCDate: alias("setUTCDates"),
            setValue: function() {
                var formatted = this.getFormattedDate();
                return this.isInput ? this.element.val(formatted).change() : this.component && this.element.find("input").val(formatted).change(), 
                this;
            },
            getFormattedDate: function(format) {
                format === undefined && (format = this.o.format);
                var lang = this.o.language;
                return $.map(this.dates, function(d) {
                    return DPGlobal.formatDate(d, format, lang);
                }).join(this.o.multidateSeparator);
            },
            setStartDate: function(startDate) {
                return this._process_options({
                    startDate: startDate
                }), this.update(), this.updateNavArrows(), this;
            },
            setEndDate: function(endDate) {
                return this._process_options({
                    endDate: endDate
                }), this.update(), this.updateNavArrows(), this;
            },
            setDaysOfWeekDisabled: function(daysOfWeekDisabled) {
                return this._process_options({
                    daysOfWeekDisabled: daysOfWeekDisabled
                }), this.update(), this.updateNavArrows(), this;
            },
            setDatesDisabled: function(datesDisabled) {
                this._process_options({
                    datesDisabled: datesDisabled
                }), this.update(), this.updateNavArrows();
            },
            place: function() {
                if (this.isInline) return this;
                var calendarWidth = this.picker.outerWidth(), calendarHeight = this.picker.outerHeight(), visualPadding = 10, windowWidth = $(this.o.container).width(), windowHeight = $(this.o.container).height(), scrollTop = $(this.o.container).scrollTop(), appendOffset = $(this.o.container).offset(), parentsZindex = [];
                this.element.parents().each(function() {
                    var itemZIndex = $(this).css("z-index");
                    "auto" !== itemZIndex && 0 !== itemZIndex && parentsZindex.push(parseInt(itemZIndex));
                });
                var zIndex = Math.max.apply(Math, parentsZindex) + 10, offset = this.component ? this.component.parent().offset() : this.element.offset(), height = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!1), width = this.component ? this.component.outerWidth(!0) : this.element.outerWidth(!1), left = offset.left - appendOffset.left, top = offset.top - appendOffset.top;
                this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"), 
                "auto" !== this.o.orientation.x ? (this.picker.addClass("datepicker-orient-" + this.o.orientation.x), 
                "right" === this.o.orientation.x && (left -= calendarWidth - width)) : offset.left < 0 ? (this.picker.addClass("datepicker-orient-left"), 
                left -= offset.left - visualPadding) : left + calendarWidth > windowWidth ? (this.picker.addClass("datepicker-orient-right"), 
                left = offset.left + width - calendarWidth) : this.picker.addClass("datepicker-orient-left");
                var top_overflow, bottom_overflow, yorient = this.o.orientation.y;
                if ("auto" === yorient && (top_overflow = -scrollTop + top - calendarHeight, bottom_overflow = scrollTop + windowHeight - (top + height + calendarHeight), 
                yorient = Math.max(top_overflow, bottom_overflow) === bottom_overflow ? "top" : "bottom"), 
                this.picker.addClass("datepicker-orient-" + yorient), "top" === yorient ? top += height : top -= calendarHeight + parseInt(this.picker.css("padding-top")), 
                this.o.rtl) {
                    var right = windowWidth - (left + width);
                    this.picker.css({
                        top: top,
                        right: right,
                        zIndex: zIndex
                    });
                } else this.picker.css({
                    top: top,
                    left: left,
                    zIndex: zIndex
                });
                return this;
            },
            _allow_update: !0,
            update: function() {
                if (!this._allow_update) return this;
                var oldDates = this.dates.copy(), dates = [], fromArgs = !1;
                return arguments.length ? ($.each(arguments, $.proxy(function(i, date) {
                    date instanceof Date && (date = this._local_to_utc(date)), dates.push(date);
                }, this)), fromArgs = !0) : (dates = this.isInput ? this.element.val() : this.element.data("date") || this.element.find("input").val(), 
                dates = dates && this.o.multidate ? dates.split(this.o.multidateSeparator) : [ dates ], 
                delete this.element.data().date), dates = $.map(dates, $.proxy(function(date) {
                    return DPGlobal.parseDate(date, this.o.format, this.o.language);
                }, this)), dates = $.grep(dates, $.proxy(function(date) {
                    return date < this.o.startDate || date > this.o.endDate || !date;
                }, this), !0), this.dates.replace(dates), this.dates.length ? this.viewDate = new Date(this.dates.get(-1)) : this.viewDate < this.o.startDate ? this.viewDate = new Date(this.o.startDate) : this.viewDate > this.o.endDate && (this.viewDate = new Date(this.o.endDate)), 
                fromArgs ? this.setValue() : dates.length && String(oldDates) !== String(this.dates) && this._trigger("changeDate"), 
                !this.dates.length && oldDates.length && this._trigger("clearDate"), this.fill(), 
                this;
            },
            fillDow: function() {
                var dowCnt = this.o.weekStart, html = "<tr>";
                if (this.o.calendarWeeks) {
                    this.picker.find(".datepicker-days thead tr:first-child .datepicker-switch").attr("colspan", function(i, val) {
                        return parseInt(val) + 1;
                    });
                    var cell = '<th class="cw">&#160;</th>';
                    html += cell;
                }
                for (;dowCnt < this.o.weekStart + 7; ) html += '<th class="dow">' + dates[this.o.language].daysMin[dowCnt++ % 7] + "</th>";
                html += "</tr>", this.picker.find(".datepicker-days thead").append(html);
            },
            fillMonths: function() {
                for (var html = "", i = 0; 12 > i; ) html += '<span class="month">' + dates[this.o.language].monthsShort[i++] + "</span>";
                this.picker.find(".datepicker-months td").html(html);
            },
            setRange: function(range) {
                range && range.length ? this.range = $.map(range, function(d) {
                    return d.valueOf();
                }) : delete this.range, this.fill();
            },
            getClassNames: function(date) {
                var cls = [], year = this.viewDate.getUTCFullYear(), month = this.viewDate.getUTCMonth(), today = new Date();
                return date.getUTCFullYear() < year || date.getUTCFullYear() === year && date.getUTCMonth() < month ? cls.push("old") : (date.getUTCFullYear() > year || date.getUTCFullYear() === year && date.getUTCMonth() > month) && cls.push("new"), 
                this.focusDate && date.valueOf() === this.focusDate.valueOf() && cls.push("focused"), 
                this.o.todayHighlight && date.getUTCFullYear() === today.getFullYear() && date.getUTCMonth() === today.getMonth() && date.getUTCDate() === today.getDate() && cls.push("today"), 
                -1 !== this.dates.contains(date) && cls.push("active"), (date.valueOf() < this.o.startDate || date.valueOf() > this.o.endDate || -1 !== $.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled)) && cls.push("disabled"), 
                this.o.datesDisabled.length > 0 && $.grep(this.o.datesDisabled, function(d) {
                    return isUTCEquals(date, d);
                }).length > 0 && cls.push("disabled", "disabled-date"), this.range && (date > this.range[0] && date < this.range[this.range.length - 1] && cls.push("range"), 
                -1 !== $.inArray(date.valueOf(), this.range) && cls.push("selected")), cls;
            },
            fill: function() {
                var tooltip, d = new Date(this.viewDate), year = d.getUTCFullYear(), month = d.getUTCMonth(), startYear = this.o.startDate !== -1/0 ? this.o.startDate.getUTCFullYear() : -1/0, startMonth = this.o.startDate !== -1/0 ? this.o.startDate.getUTCMonth() : -1/0, endYear = 1/0 !== this.o.endDate ? this.o.endDate.getUTCFullYear() : 1/0, endMonth = 1/0 !== this.o.endDate ? this.o.endDate.getUTCMonth() : 1/0, todaytxt = dates[this.o.language].today || dates.en.today || "", cleartxt = dates[this.o.language].clear || dates.en.clear || "";
                if (!isNaN(year) && !isNaN(month)) {
                    this.picker.find(".datepicker-days thead .datepicker-switch").text(dates[this.o.language].months[month] + " " + year), 
                    this.picker.find("tfoot .today").text(todaytxt).toggle(this.o.todayBtn !== !1), 
                    this.picker.find("tfoot .clear").text(cleartxt).toggle(this.o.clearBtn !== !1), 
                    this.updateNavArrows(), this.fillMonths();
                    var prevMonth = UTCDate(year, month - 1, 28), day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
                    prevMonth.setUTCDate(day), prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7) % 7);
                    var nextMonth = new Date(prevMonth);
                    nextMonth.setUTCDate(nextMonth.getUTCDate() + 42), nextMonth = nextMonth.valueOf();
                    for (var clsName, html = []; prevMonth.valueOf() < nextMonth; ) {
                        if (prevMonth.getUTCDay() === this.o.weekStart && (html.push("<tr>"), this.o.calendarWeeks)) {
                            var ws = new Date(+prevMonth + (this.o.weekStart - prevMonth.getUTCDay() - 7) % 7 * 864e5), th = new Date(Number(ws) + (11 - ws.getUTCDay()) % 7 * 864e5), yth = new Date(Number(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (11 - yth.getUTCDay()) % 7 * 864e5), calWeek = (th - yth) / 864e5 / 7 + 1;
                            html.push('<td class="cw">' + calWeek + "</td>");
                        }
                        if (clsName = this.getClassNames(prevMonth), clsName.push("day"), this.o.beforeShowDay !== $.noop) {
                            var before = this.o.beforeShowDay(this._utc_to_local(prevMonth));
                            before === undefined ? before = {} : "boolean" == typeof before ? before = {
                                enabled: before
                            } : "string" == typeof before && (before = {
                                classes: before
                            }), before.enabled === !1 && clsName.push("disabled"), before.classes && (clsName = clsName.concat(before.classes.split(/\s+/))), 
                            before.tooltip && (tooltip = before.tooltip);
                        }
                        clsName = $.unique(clsName), html.push('<td class="' + clsName.join(" ") + '"' + (tooltip ? ' title="' + tooltip + '"' : "") + ">" + prevMonth.getUTCDate() + "</td>"), 
                        tooltip = null, prevMonth.getUTCDay() === this.o.weekEnd && html.push("</tr>"), 
                        prevMonth.setUTCDate(prevMonth.getUTCDate() + 1);
                    }
                    this.picker.find(".datepicker-days tbody").empty().append(html.join(""));
                    var months = this.picker.find(".datepicker-months").find("th:eq(1)").text(year).end().find("span").removeClass("active");
                    if ($.each(this.dates, function(i, d) {
                        d.getUTCFullYear() === year && months.eq(d.getUTCMonth()).addClass("active");
                    }), (startYear > year || year > endYear) && months.addClass("disabled"), year === startYear && months.slice(0, startMonth).addClass("disabled"), 
                    year === endYear && months.slice(endMonth + 1).addClass("disabled"), this.o.beforeShowMonth !== $.noop) {
                        var that = this;
                        $.each(months, function(i, month) {
                            if (!$(month).hasClass("disabled")) {
                                var moDate = new Date(year, i, 1), before = that.o.beforeShowMonth(moDate);
                                before === !1 && $(month).addClass("disabled");
                            }
                        });
                    }
                    html = "", year = 10 * parseInt(year / 10, 10);
                    var yearCont = this.picker.find(".datepicker-years").find("th:eq(1)").text(year + "-" + (year + 9)).end().find("td");
                    year -= 1;
                    for (var classes, years = $.map(this.dates, function(d) {
                        return d.getUTCFullYear();
                    }), i = -1; 11 > i; i++) classes = [ "year" ], -1 === i ? classes.push("old") : 10 === i && classes.push("new"), 
                    -1 !== $.inArray(year, years) && classes.push("active"), (startYear > year || year > endYear) && classes.push("disabled"), 
                    html += '<span class="' + classes.join(" ") + '">' + year + "</span>", year += 1;
                    yearCont.html(html);
                }
            },
            updateNavArrows: function() {
                if (this._allow_update) {
                    var d = new Date(this.viewDate), year = d.getUTCFullYear(), month = d.getUTCMonth();
                    switch (this.viewMode) {
                      case 0:
                        this.picker.find(".prev").css(this.o.startDate !== -1/0 && year <= this.o.startDate.getUTCFullYear() && month <= this.o.startDate.getUTCMonth() ? {
                            visibility: "hidden"
                        } : {
                            visibility: "visible"
                        }), this.picker.find(".next").css(1/0 !== this.o.endDate && year >= this.o.endDate.getUTCFullYear() && month >= this.o.endDate.getUTCMonth() ? {
                            visibility: "hidden"
                        } : {
                            visibility: "visible"
                        });
                        break;

                      case 1:
                      case 2:
                        this.picker.find(".prev").css(this.o.startDate !== -1/0 && year <= this.o.startDate.getUTCFullYear() ? {
                            visibility: "hidden"
                        } : {
                            visibility: "visible"
                        }), this.picker.find(".next").css(1/0 !== this.o.endDate && year >= this.o.endDate.getUTCFullYear() ? {
                            visibility: "hidden"
                        } : {
                            visibility: "visible"
                        });
                    }
                }
            },
            click: function(e) {
                e.preventDefault();
                var year, month, day, target = $(e.target).closest("span, td, th");
                if (1 === target.length) switch (target[0].nodeName.toLowerCase()) {
                  case "th":
                    switch (target[0].className) {
                      case "datepicker-switch":
                        this.showMode(1);
                        break;

                      case "prev":
                      case "next":
                        var dir = DPGlobal.modes[this.viewMode].navStep * ("prev" === target[0].className ? -1 : 1);
                        switch (this.viewMode) {
                          case 0:
                            this.viewDate = this.moveMonth(this.viewDate, dir), this._trigger("changeMonth", this.viewDate);
                            break;

                          case 1:
                          case 2:
                            this.viewDate = this.moveYear(this.viewDate, dir), 1 === this.viewMode && this._trigger("changeYear", this.viewDate);
                        }
                        this.fill();
                        break;

                      case "today":
                        var date = new Date();
                        date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0), this.showMode(-2);
                        var which = "linked" === this.o.todayBtn ? null : "view";
                        this._setDate(date, which);
                        break;

                      case "clear":
                        this.clearDates();
                    }
                    break;

                  case "span":
                    target.hasClass("disabled") || (this.viewDate.setUTCDate(1), target.hasClass("month") ? (day = 1, 
                    month = target.parent().find("span").index(target), year = this.viewDate.getUTCFullYear(), 
                    this.viewDate.setUTCMonth(month), this._trigger("changeMonth", this.viewDate), 1 === this.o.minViewMode ? (this._setDate(UTCDate(year, month, day)), 
                    this.showMode()) : this.showMode(-1)) : (day = 1, month = 0, year = parseInt(target.text(), 10) || 0, 
                    this.viewDate.setUTCFullYear(year), this._trigger("changeYear", this.viewDate), 
                    2 === this.o.minViewMode && this._setDate(UTCDate(year, month, day)), this.showMode(-1)), 
                    this.fill());
                    break;

                  case "td":
                    target.hasClass("day") && !target.hasClass("disabled") && (day = parseInt(target.text(), 10) || 1, 
                    year = this.viewDate.getUTCFullYear(), month = this.viewDate.getUTCMonth(), target.hasClass("old") ? 0 === month ? (month = 11, 
                    year -= 1) : month -= 1 : target.hasClass("new") && (11 === month ? (month = 0, 
                    year += 1) : month += 1), this._setDate(UTCDate(year, month, day)));
                }
                this.picker.is(":visible") && this._focused_from && $(this._focused_from).focus(), 
                delete this._focused_from;
            },
            _toggle_multidate: function(date) {
                var ix = this.dates.contains(date);
                if (date || this.dates.clear(), -1 !== ix ? (this.o.multidate === !0 || this.o.multidate > 1 || this.o.toggleActive) && this.dates.remove(ix) : this.o.multidate === !1 ? (this.dates.clear(), 
                this.dates.push(date)) : this.dates.push(date), "number" == typeof this.o.multidate) for (;this.dates.length > this.o.multidate; ) this.dates.remove(0);
            },
            _setDate: function(date, which) {
                which && "date" !== which || this._toggle_multidate(date && new Date(date)), which && "view" !== which || (this.viewDate = date && new Date(date)), 
                this.fill(), this.setValue(), which && "view" === which || this._trigger("changeDate");
                var element;
                this.isInput ? element = this.element : this.component && (element = this.element.find("input")), 
                element && element.change(), !this.o.autoclose || which && "date" !== which || this.hide();
            },
            moveMonth: function(date, dir) {
                if (!date) return undefined;
                if (!dir) return date;
                var new_month, test, new_date = new Date(date.valueOf()), day = new_date.getUTCDate(), month = new_date.getUTCMonth(), mag = Math.abs(dir);
                if (dir = dir > 0 ? 1 : -1, 1 === mag) test = -1 === dir ? function() {
                    return new_date.getUTCMonth() === month;
                } : function() {
                    return new_date.getUTCMonth() !== new_month;
                }, new_month = month + dir, new_date.setUTCMonth(new_month), (0 > new_month || new_month > 11) && (new_month = (new_month + 12) % 12); else {
                    for (var i = 0; mag > i; i++) new_date = this.moveMonth(new_date, dir);
                    new_month = new_date.getUTCMonth(), new_date.setUTCDate(day), test = function() {
                        return new_month !== new_date.getUTCMonth();
                    };
                }
                for (;test(); ) new_date.setUTCDate(--day), new_date.setUTCMonth(new_month);
                return new_date;
            },
            moveYear: function(date, dir) {
                return this.moveMonth(date, 12 * dir);
            },
            dateWithinRange: function(date) {
                return date >= this.o.startDate && date <= this.o.endDate;
            },
            keydown: function(e) {
                if (!this.picker.is(":visible")) return void ((40 === e.keyCode || 27 === e.keyCode) && this.show());
                var dir, newDate, newViewDate, dateChanged = !1, focusDate = this.focusDate || this.viewDate;
                switch (e.keyCode) {
                  case 27:
                    this.focusDate ? (this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, 
                    this.fill()) : this.hide(), e.preventDefault();
                    break;

                  case 37:
                  case 39:
                    if (!this.o.keyboardNavigation) break;
                    dir = 37 === e.keyCode ? -1 : 1, e.ctrlKey ? (newDate = this.moveYear(this.dates.get(-1) || UTCToday(), dir), 
                    newViewDate = this.moveYear(focusDate, dir), this._trigger("changeYear", this.viewDate)) : e.shiftKey ? (newDate = this.moveMonth(this.dates.get(-1) || UTCToday(), dir), 
                    newViewDate = this.moveMonth(focusDate, dir), this._trigger("changeMonth", this.viewDate)) : (newDate = new Date(this.dates.get(-1) || UTCToday()), 
                    newDate.setUTCDate(newDate.getUTCDate() + dir), newViewDate = new Date(focusDate), 
                    newViewDate.setUTCDate(focusDate.getUTCDate() + dir)), this.dateWithinRange(newViewDate) && (this.focusDate = this.viewDate = newViewDate, 
                    this.setValue(), this.fill(), e.preventDefault());
                    break;

                  case 38:
                  case 40:
                    if (!this.o.keyboardNavigation) break;
                    dir = 38 === e.keyCode ? -1 : 1, e.ctrlKey ? (newDate = this.moveYear(this.dates.get(-1) || UTCToday(), dir), 
                    newViewDate = this.moveYear(focusDate, dir), this._trigger("changeYear", this.viewDate)) : e.shiftKey ? (newDate = this.moveMonth(this.dates.get(-1) || UTCToday(), dir), 
                    newViewDate = this.moveMonth(focusDate, dir), this._trigger("changeMonth", this.viewDate)) : (newDate = new Date(this.dates.get(-1) || UTCToday()), 
                    newDate.setUTCDate(newDate.getUTCDate() + 7 * dir), newViewDate = new Date(focusDate), 
                    newViewDate.setUTCDate(focusDate.getUTCDate() + 7 * dir)), this.dateWithinRange(newViewDate) && (this.focusDate = this.viewDate = newViewDate, 
                    this.setValue(), this.fill(), e.preventDefault());
                    break;

                  case 32:
                    break;

                  case 13:
                    focusDate = this.focusDate || this.dates.get(-1) || this.viewDate, this.o.keyboardNavigation && (this._toggle_multidate(focusDate), 
                    dateChanged = !0), this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, 
                    this.setValue(), this.fill(), this.picker.is(":visible") && (e.preventDefault(), 
                    "function" == typeof e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0, 
                    this.o.autoclose && this.hide());
                    break;

                  case 9:
                    this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill(), 
                    this.hide();
                }
                if (dateChanged) {
                    this._trigger(this.dates.length ? "changeDate" : "clearDate");
                    var element;
                    this.isInput ? element = this.element : this.component && (element = this.element.find("input")), 
                    element && element.change();
                }
            },
            showMode: function(dir) {
                dir && (this.viewMode = Math.max(this.o.minViewMode, Math.min(2, this.viewMode + dir))), 
                this.picker.children("div").hide().filter(".datepicker-" + DPGlobal.modes[this.viewMode].clsName).css("display", "block"), 
                this.updateNavArrows();
            }
        };
        var DateRangePicker = function(element, options) {
            this.element = $(element), this.inputs = $.map(options.inputs, function(i) {
                return i.jquery ? i[0] : i;
            }), delete options.inputs, datepickerPlugin.call($(this.inputs), options).on("changeDate", $.proxy(this.dateUpdated, this)), 
            this.pickers = $.map(this.inputs, function(i) {
                return $(i).data("datepicker");
            }), this.updateDates();
        };
        DateRangePicker.prototype = {
            updateDates: function() {
                this.dates = $.map(this.pickers, function(i) {
                    return i.getUTCDate();
                }), this.updateRanges();
            },
            updateRanges: function() {
                var range = $.map(this.dates, function(d) {
                    return d.valueOf();
                });
                $.each(this.pickers, function(i, p) {
                    p.setRange(range);
                });
            },
            dateUpdated: function(e) {
                if (!this.updating) {
                    this.updating = !0;
                    var dp = $(e.target).data("datepicker"), new_date = dp.getUTCDate(), i = $.inArray(e.target, this.inputs), j = i - 1, k = i + 1, l = this.inputs.length;
                    if (-1 !== i) {
                        if ($.each(this.pickers, function(i, p) {
                            p.getUTCDate() || p.setUTCDate(new_date);
                        }), new_date < this.dates[j]) for (;j >= 0 && new_date < this.dates[j]; ) this.pickers[j--].setUTCDate(new_date); else if (new_date > this.dates[k]) for (;l > k && new_date > this.dates[k]; ) this.pickers[k++].setUTCDate(new_date);
                        this.updateDates(), delete this.updating;
                    }
                }
            },
            remove: function() {
                $.map(this.pickers, function(p) {
                    p.remove();
                }), delete this.element.data().datepicker;
            }
        };
        var old = $.fn.datepicker, datepickerPlugin = function(option) {
            var args = Array.apply(null, arguments);
            args.shift();
            var internal_return;
            return this.each(function() {
                var $this = $(this), data = $this.data("datepicker"), options = "object" == typeof option && option;
                if (!data) {
                    var elopts = opts_from_el(this, "date"), xopts = $.extend({}, defaults, elopts, options), locopts = opts_from_locale(xopts.language), opts = $.extend({}, defaults, locopts, elopts, options);
                    if ($this.hasClass("input-daterange") || opts.inputs) {
                        var ropts = {
                            inputs: opts.inputs || $this.find("input").toArray()
                        };
                        $this.data("datepicker", data = new DateRangePicker(this, $.extend(opts, ropts)));
                    } else $this.data("datepicker", data = new Datepicker(this, opts));
                }
                return "string" == typeof option && "function" == typeof data[option] && (internal_return = data[option].apply(data, args), 
                internal_return !== undefined) ? !1 : void 0;
            }), internal_return !== undefined ? internal_return : this;
        };
        $.fn.datepicker = datepickerPlugin;
        var defaults = $.fn.datepicker.defaults = {
            autoclose: !1,
            beforeShowDay: $.noop,
            beforeShowMonth: $.noop,
            calendarWeeks: !1,
            clearBtn: !1,
            toggleActive: !1,
            daysOfWeekDisabled: [],
            datesDisabled: [],
            endDate: 1/0,
            forceParse: !0,
            format: "mm/dd/yyyy",
            keyboardNavigation: !0,
            language: "en",
            minViewMode: 0,
            multidate: !1,
            multidateSeparator: ",",
            orientation: "auto",
            rtl: !1,
            startDate: -1/0,
            startView: 0,
            todayBtn: !1,
            todayHighlight: !1,
            weekStart: 0,
            disableTouchKeyboard: !1,
            enableOnReadonly: !0,
            container: "body",
            immediateUpdates: !1
        }, locale_opts = $.fn.datepicker.locale_opts = [ "format", "rtl", "weekStart" ];
        $.fn.datepicker.Constructor = Datepicker;
        var dates = $.fn.datepicker.dates = {
            en: {
                days: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
                daysShort: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
                daysMin: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],
                months: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
                monthsShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
                today: "Today",
                clear: "Clear"
            }
        }, DPGlobal = {
            modes: [ {
                clsName: "days",
                navFnc: "Month",
                navStep: 1
            }, {
                clsName: "months",
                navFnc: "FullYear",
                navStep: 1
            }, {
                clsName: "years",
                navFnc: "FullYear",
                navStep: 10
            } ],
            isLeapYear: function(year) {
                return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
            },
            getDaysInMonth: function(year, month) {
                return [ 31, DPGlobal.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ][month];
            },
            validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
            nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
            parseFormat: function(format) {
                var separators = format.replace(this.validParts, "\x00").split("\x00"), parts = format.match(this.validParts);
                if (!separators || !separators.length || !parts || 0 === parts.length) throw new Error("Invalid date format.");
                return {
                    separators: separators,
                    parts: parts
                };
            },
            parseDate: function(date, format, language) {
                function match_part() {
                    var m = this.slice(0, parts[i].length), p = parts[i].slice(0, m.length);
                    return m.toLowerCase() === p.toLowerCase();
                }
                if (!date) return undefined;
                if (date instanceof Date) return date;
                "string" == typeof format && (format = DPGlobal.parseFormat(format));
                var part, dir, i, part_re = /([\-+]\d+)([dmwy])/, parts = date.match(/([\-+]\d+)([dmwy])/g);
                if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)) {
                    for (date = new Date(), i = 0; i < parts.length; i++) switch (part = part_re.exec(parts[i]), 
                    dir = parseInt(part[1]), part[2]) {
                      case "d":
                        date.setUTCDate(date.getUTCDate() + dir);
                        break;

                      case "m":
                        date = Datepicker.prototype.moveMonth.call(Datepicker.prototype, date, dir);
                        break;

                      case "w":
                        date.setUTCDate(date.getUTCDate() + 7 * dir);
                        break;

                      case "y":
                        date = Datepicker.prototype.moveYear.call(Datepicker.prototype, date, dir);
                    }
                    return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0);
                }
                parts = date && date.match(this.nonpunctuation) || [], date = new Date();
                var val, filtered, parsed = {}, setters_order = [ "yyyy", "yy", "M", "MM", "m", "mm", "d", "dd" ], setters_map = {
                    yyyy: function(d, v) {
                        return d.setUTCFullYear(v);
                    },
                    yy: function(d, v) {
                        return d.setUTCFullYear(2e3 + v);
                    },
                    m: function(d, v) {
                        if (isNaN(d)) return d;
                        for (v -= 1; 0 > v; ) v += 12;
                        for (v %= 12, d.setUTCMonth(v); d.getUTCMonth() !== v; ) d.setUTCDate(d.getUTCDate() - 1);
                        return d;
                    },
                    d: function(d, v) {
                        return d.setUTCDate(v);
                    }
                };
                setters_map.M = setters_map.MM = setters_map.mm = setters_map.m, setters_map.dd = setters_map.d, 
                date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
                var fparts = format.parts.slice();
                if (parts.length !== fparts.length && (fparts = $(fparts).filter(function(i, p) {
                    return -1 !== $.inArray(p, setters_order);
                }).toArray()), parts.length === fparts.length) {
                    var cnt;
                    for (i = 0, cnt = fparts.length; cnt > i; i++) {
                        if (val = parseInt(parts[i], 10), part = fparts[i], isNaN(val)) switch (part) {
                          case "MM":
                            filtered = $(dates[language].months).filter(match_part), val = $.inArray(filtered[0], dates[language].months) + 1;
                            break;

                          case "M":
                            filtered = $(dates[language].monthsShort).filter(match_part), val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
                        }
                        parsed[part] = val;
                    }
                    var _date, s;
                    for (i = 0; i < setters_order.length; i++) s = setters_order[i], s in parsed && !isNaN(parsed[s]) && (_date = new Date(date), 
                    setters_map[s](_date, parsed[s]), isNaN(_date) || (date = _date));
                }
                return date;
            },
            formatDate: function(date, format, language) {
                if (!date) return "";
                "string" == typeof format && (format = DPGlobal.parseFormat(format));
                var val = {
                    d: date.getUTCDate(),
                    D: dates[language].daysShort[date.getUTCDay()],
                    DD: dates[language].days[date.getUTCDay()],
                    m: date.getUTCMonth() + 1,
                    M: dates[language].monthsShort[date.getUTCMonth()],
                    MM: dates[language].months[date.getUTCMonth()],
                    yy: date.getUTCFullYear().toString().substring(2),
                    yyyy: date.getUTCFullYear()
                };
                val.dd = (val.d < 10 ? "0" : "") + val.d, val.mm = (val.m < 10 ? "0" : "") + val.m, 
                date = [];
                for (var seps = $.extend([], format.separators), i = 0, cnt = format.parts.length; cnt >= i; i++) seps.length && date.push(seps.shift()), 
                date.push(val[format.parts[i]]);
                return date.join("");
            },
            headTemplate: '<thead><tr><th class="prev">&#171;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&#187;</th></tr></thead>',
            contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
            footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
        };
        DPGlobal.template = '<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">' + DPGlobal.headTemplate + "<tbody></tbody>" + DPGlobal.footTemplate + '</table></div><div class="datepicker-months"><table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + "</table></div></div>", 
        $.fn.datepicker.DPGlobal = DPGlobal, $.fn.datepicker.noConflict = function() {
            return $.fn.datepicker = old, this;
        }, $.fn.datepicker.version = "1.4.1-dev", $(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', function(e) {
            var $this = $(this);
            $this.data("datepicker") || (e.preventDefault(), datepickerPlugin.call($this, "show"));
        }), $(function() {
            datepickerPlugin.call($('[data-provide="datepicker-inline"]'));
        });
    }(window.jQuery), !function(a) {
        a.fn.datepicker.dates.es = {
            days: [ "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado" ],
            daysShort: [ "Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb" ],
            daysMin: [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa" ],
            months: [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ],
            monthsShort: [ "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic" ],
            today: "Hoy",
            clear: "Borrar",
            weekStart: 1,
            format: "dd/mm/yyyy"
        };
    }(jQuery), $(function() {
        function closeCanvas() {
            $("body").hasClass("in") && ($(".off-canvas").removeClass("out"), $("body").removeClass("in").addClass("out"), 
            $("html").removeClass("in").addClass("out"), $(".canvas-wrap").hide(), setTimeout(function() {
                $("body").removeClass("out left right"), $("html").removeClass("out left right");
            }, 500));
        }
        $("button.navbar-toggle").click(function() {
            canvasTarget = $(this).attr("data-target"), dataSide = $(this).attr("data-side"), 
            $(".canvas-wrap").addClass(dataSide), $(canvasTarget).hasClass("out") ? closeCanvas() : ($(".off-canvas").removeClass("out"), 
            $("body").addClass("in").addClass(dataSide), $("html").addClass("in").addClass(dataSide), 
            $(canvasTarget).addClass("out"), $(".canvas-wrap").show().css("height", "100%"));
        }), $(".canvas-wrap").click("click", function() {
            closeCanvas();
        }), $('.off-canvas [data-toggle="close"]').click("click", function() {
            closeCanvas();
        }), $(".canvas-wrap").swipe({
            swipe: function(event, direction) {
                $(this).hasClass("left") && "left" == direction && closeCanvas(), $(this).hasClass("right") && "right" == direction && closeCanvas();
            }
        });
    }), $(function() {
        $('[data-toggle="tooltip"]').tooltip(), $(".js-responsive-auto-close").collapse(mdBreak >= windowWidth ? {
            toggle: !0
        } : {
            toggle: !1
        }), $(".js-responsive-auto-close-xs").collapse(smBreak > windowWidth ? {
            toggle: !0
        } : {
            toggle: !1
        }), $('[data-toggle="html-popover"]').popover({
            html: !0,
            content: function() {
                var popContentID = $(this).attr("data-id-content");
                return $(popContentID).html();
            }
        }), $('[data-toggle="html-popover"]').click(function() {
            $('[data-toggle="html-popover"]').not(this).popover("hide");
        }), $("a,button").click(function() {
            originalText = $(this).attr("data-original-text"), newText = $(this).attr("data-new-text"), 
            $(this).attr("data-original-text", newText), $(this).attr("data-new-text", originalText), 
            $(this).html(newText);
        }), $('[data-toggle="collapse"]').on("click", function() {
            hRef = $(this).attr("href"), hRef || (hRef = $(this).attr("data-target")), thisHeight = $(this).parent().parent().height(), 
            $(this).hasClass("no-scroll") || $(hRef).on("shown.bs.collapse", function() {
                moveToOffset = $(this).offset().top - thisHeight - 10, $("html, body").animate({
                    scrollTop: moveToOffset,
                    useTranslate3d: !0
                }, 700);
            });
        }), $("[data-id-scroll]").on("click", function() {
            function waitUntilVisible() {
                existInterval = !1, $(scrollToID).hasClass("in") ? (moveToOffset = $(scrollToID).offset().top - parseInt(pixelFix), 
                $("html, body").animate({
                    scrollTop: moveToOffset,
                    useTranslate3d: !0
                }, 700), existInterval === !0 && clearInterval(visibleInterval)) : (existInterval = !0, 
                visibleInterval = setInterval(waituntilVisible, 500));
            }
            return scrollToID = $(this).attr("data-id-scroll"), pixelFix = $(this).attr("data-pixel-fix"), 
            alert(scrollToID), waitUntilVisible(), $(this).is("a") ? !1 : void 0;
        }), $("[data-id-scroll-collpases]").on("click", function() {
            scrollToID = $(this).attr("data-id-scroll-collpases"), pixelFix = $(this).attr("data-pixel-fix"), 
            setTimeout(function() {
                moveToOffset = $(scrollToID).offset().top - parseInt(pixelFix), $("html, body").animate({
                    scrollTop: moveToOffset,
                    useTranslate3d: !0
                }, 700);
            }, 500);
        }), $(".dropdown").on("show.bs.dropdown", function() {
            $(this).find(".dropdown-menu").first().stop(!0, !0).slideDown();
        }), $(".dropdown").on("hide.bs.dropdown", function() {
            $(this).find(".dropdown-menu").first().stop(!0, !0).slideUp();
        }), $("[type='number']").keydown(function(event) {
            event.keyCode > 90 && event.keyCode < 106 || 46 == event.keyCode || 8 == event.keyCode || 9 == event.keyCode || (event.keyCode < 48 || event.keyCode > 57) && event.preventDefault();
        }), $("[data-id-dismiss]").click(function() {
            idToClose = $(this).attr("data-id-dismiss"), idToClose && ("this" === idToClose && (idToClose = $(this).parent()), 
            exitAnimation = $(this).attr("data-animation"), $(idToClose).addClass("animated").addClass(exitAnimation), 
            $(idToClose).one("webkitAnimationEnd oanimationend msAnimationEnd animationend", function() {
                $(this).addClass("hide");
            }));
        }), $(".js-reveal").click(function() {
            idToShow = $(this).attr("data-id-show"), idToHide = $(this).attr("data-id-hide"), 
            showAnimation = $(this).attr("data-animation-show"), hideAnimation = $(this).attr("data-animation-hide"), 
            idToHide && ($(idToHide).addClass("animated").addClass(hideAnimation), $(idToHide).one("webkitAnimationEnd oanimationend msAnimationEnd animationend", function() {
                $(this).addClass("hide"), $(idToShow).removeClass("hide"), idToShow && ("this" === idToShow && (idToShow = $(this).parent()), 
                $(idToShow).addClass("animated").addClass(showAnimation), $(idToHide).removeClass("animated").removeClass(hideAnimation));
            }));
        }), $(".js-toggle").click(function() {
            return idToHide = $(this).attr("data-id-hide"), idToShow = $(this).attr("data-id-show"), 
            dataTimes = $(this).attr("data-times"), 0 > dataTimes ? !1 : (dataTimes > 0 && $(this).attr("data-times", "-1"), 
            showAnimation = $(this).attr("data-animation-show"), hideAnimation = $(this).attr("data-animation-hide"), 
            $(idToHide).addClass("animated").addClass(hideAnimation).removeClass(showAnimation), 
            $(idToHide).one("webkitAnimationEnd oanimationend msAnimationEnd animationend", function() {
                $(this).addClass("hide"), $(idToShow).removeClass("hide").addClass("animated").addClass(showAnimation).removeClass(hideAnimation);
            }), $(this).attr("data-id-show", idToHide), void $(this).attr("data-id-hide", idToShow));
        }), $(".more").click(function(event) {
            return event.stopPropagation(), event.preventDefault(), curLimit = $(this).prev().attr("max"), 
            curVal = $(this).prev().val(), curLimit == curVal ? !1 : (curVal = parseFloat(curVal), 
            void $(this).prev().val(curVal + 1));
        }), $(".less").click(function(event) {
            return event.stopPropagation(), event.preventDefault(), curLimit = $(this).next().attr("min"), 
            curVal = $(this).next().val(), curLimit == curVal ? !1 : (curVal = parseFloat(curVal), 
            void $(this).next().val(curVal - 1));
        }), $("select.js-accordion-select").change(function() {
            optionShow = $("option:selected", this).attr("data-id-show"), $(optionShow).show(), 
            optionHide = $("option:selected", this).attr("data-id-hide"), $(optionHide).hide(), 
            optionSelected = $("option:selected", this).attr("data-id-trigger"), $('a[href="' + optionSelected + '"]').trigger("click");
        }), $(".btn.btn-close-parent").click(function() {
            $(this).parent().hide();
        }), navigator.userAgent.match(/(iPhone|iPod|iPad)/i) && ($(window).scroll(function() {
            $currentScrollPos = $(document).scrollTop();
        }), $('[data-toggle="modal"]').click(function() {
            modalTarget = $(this).attr("data-target"), $(modalTarget).on("shown.bs.modal", function() {
                $("body").css({
                    position: "fixed"
                }), localStorage.cachedScrollPos = $currentScrollPos;
            }), $(modalTarget).on("hidden.bs.modal", function() {
                $("body").css({
                    position: "relative"
                }), $("body").scrollTop(localStorage.cachedScrollPos);
            });
        })), $('input[type="month"], input[type="date"]').each(function() {
            datePlaceHolder = $(this).attr("placeholder"), $(this).before('<span class="js-fake-placeholder">' + datePlaceHolder + "</span>");
        }), $('input[type="month"], input[type="date"]').focus(function() {
            $(this).prev(".js-fake-placeholder").hide();
        }), $("textarea.js-autosize").keyup(function() {
            textareaResize = $(this), setTimeout(function() {
                textareaResize.removeAttr("style"), textareaHeight = textareaResize.get(0).scrollHeight, 
                textareaResize.height(textareaHeight);
            }, 200);
        }), smBreak > windowWidth && $(".content-block").css("height", windowHeight - 150), 
        $(window).resize(function() {
            windowHeight = $(window).height(), smBreak > windowWidth && $(".content-block").css("height", windowHeight - 150);
        });
    });
    var idSelected = 0, finalWrap = 0;
    $(function() {
        function reOrderLayout() {
            $(".js-box-layout").appendTo("#container-holder"), $("#btn-close").appendTo("#container-holder"), 
            $(idSelected).insertAfter(".selectedBox"), $(".content-holder").remove(), $(".row.wrap").remove();
            var anchoVentana = $(window).width();
            if (anchoVentana > 992) for (i = 0; i < divs.length; i += 3) divs.slice(i, i + 3).wrapAll('<div class="row wrap" id="' + i + '"></div>'); else for (i = 0; i < divs.length; i += 2) divs.slice(i, i + 2).wrapAll('<div class="row wrap" id="' + i + '"></div>');
            $("<div class='col-xs-12 content-holder'></div>").insertAfter(".row.wrap");
            var finalWarp = $(".selectedInfo").parent().parent().next();
            $(".selectedInfo").appendTo(finalWarp), $(".selectedInfo").parent().addClass("block-white");
            var capaDestino = $(".content-holder");
            $("#btn-close").appendTo(capaDestino);
        }
        var divs = $(".js-box-layout"), anchoVentana = $(window).width();
        if (anchoVentana > 992) for (i = 0; i < divs.length; i += 3) divs.slice(i, i + 3).wrapAll('<div class="row wrap" id="' + i + '"></div>'); else for (i = 0; i < divs.length; i += 2) divs.slice(i, i + 2).wrapAll('<div class="row wrap" id="' + i + '"></div>');
        $("<div class='col-xs-12 content-holder'></div>").insertAfter(".row.wrap"), $(".btn.btn-close").click(function() {
            setTimeout(function() {
                $(idSelected).insertAfter(".selectedBox"), $(idSelected).removeClass("in"), $(".selectedBox").removeClass("selectedBox"), 
                $(".content-holder.block-white").removeClass("block-white");
            }, 500), $(".content-holder.block-white").fadeOut(300), $(".block-white.selectedBox .arrow-box").fadeOut(300), 
            $(".selectedInfo").removeClass("selectedInfo"), $(".box-collapses").css("opacity", "1"), 
            $(".block-banner").css("opacity", "1");
        }), $(".box-collapses").on("click", function() {
            767 > anchoVentana ? setTimeout(function() {
                $(".selectedInfo .block-alert").css("width", anchoVentana - 30), $(".selectedInfo .block-alert").css("left", -20);
            }, 500) : setTimeout(function() {
                var anchoLayer = $("#container-holder").width();
                $(".selectedInfo .block-alert").css("width", anchoLayer + 20), $(".selectedInfo .block-alert").css("left", -30);
            }, 500);
            var capaDestino = $(this).parent().parent().parent().next();
            $("#btn-close").appendTo(capaDestino), $(".content-holder").show(), $(".arrow-box").hide(), 
            $(this).find(".arrow-box").show(), $(".box-collapses").css("opacity", ".5"), $(this).css("opacity", "1"), 
            $(".block-banner").css("opacity", ".5"), selectedLayer = "#" + $(".content-holder.block-white .selectedInfo").attr("id"), 
            idSelected = $(this).attr("data-target"), idSelected == selectedLayer ? (setTimeout(function() {
                $(idSelected).insertAfter(".selectedBox"), $(".selectedBox").removeClass("selectedBox"), 
                $(".content-holder.block-white").removeClass("block-white");
            }, 500), $(".content-holder.block-white").fadeOut(300), $(".block-white.selectedBox .arrow-box").fadeOut(300), 
            $(".selectedInfo").removeClass("selectedInfo"), $(".box-collapses").css("opacity", "1"), 
            $(".block-banner").css("opacity", "1")) : ($(".content-holder.block-white").removeClass("block-white"), 
            $(".collapse").removeClass("in"), $(".selectedInfo").insertAfter(".selectedBox"), 
            $(".selectedInfo").removeClass("selectedInfo"), $(".selectedBox").removeClass("selectedBox"), 
            $(this).parent().addClass("selectedBox"), finalWrap = $(this).parent().parent().parent().next(), 
            $(finalWrap).addClass("block-white"), $(idSelected).appendTo(finalWrap), $(idSelected).addClass("selectedInfo")), 
            idSelected = idSelected, finalWrap = finalWrap, setTimeout(function() {
                sameHeight(), autoHeightParent();
            }, 0);
        }), $(window).resize(function() {
            $("html").hasClass("no-touch") && (reOrderLayout(), autoHeightParent());
        }), $(window).bind("orientationchange", function() {
            setTimeout(function() {
                $("html").hasClass("touch") && (reOrderLayout(), autoHeightParent());
            }, 300);
        }), $(".block-grey.editable, .section .back-button, .js-btn-pay").click(function() {
            selectedLayer = $(this).attr("data-target"), $("section.section").hide(), $(selectedLayer).fadeIn(1500), 
            $("section.section.active").hide(), $(selectedLayer).addClass("active"), $("section.section.active").removeClass("active"), 
            autoHeightParent();
        });
    }), $(function() {
        $("#js-modify-pin").click(function() {
            $("#pin-edit").is(":visible") ? (moveToOffset = $("#contenido1").offset().top - 100, 
            $("html, body").animate({
                scrollTop: moveToOffset,
                useTranslate3d: !0
            }, 700), $('[data-target="#pin-edit"]').trigger("click")) : ($("#contenido1").is(":visible") || $("#datos-personales .box-collapses").trigger("click"), 
            moveToOffset = $("#contenido1").offset().top - 100, $("html, body").animate({
                scrollTop: moveToOffset,
                useTranslate3d: !0
            }, 700), $('[data-target="#pin-edit"]').trigger("click"));
        }), $("#js-keep-pin").click(function() {
            $(this).parent().parent().parent().slideToggle();
        });
    }), $(function() {
        windowWidth > 767 && ($("#help .block-white").addClass("fixed"), $("#help").removeClass("collapse")), 
        $("#js-show-help").click(function() {
            $("#help .block-white").show(), $("#help .block-white").css("right", -615), $("#help").show(), 
            setTimeout(function() {
                $("#help .block-white").animate({
                    right: 0,
                    useTranslate3d: !0
                }, 700);
            }, 100);
        });
    }), $(window).resize(function() {
        windowWidth > 767 ? ($("#help .block-white").addClass("fixed"), $("#help").removeClass("collapse"), 
        $("#help").parent().removeClass("block-white"), $("#help").removeClass("selectedInfo")) : ($("#help .block-white").removeClass("fixed"), 
        $("#help.in").addClass("selectedInfo"), $("#help").addClass("collapse"));
    });
}({}, function() {
    return this;
}());