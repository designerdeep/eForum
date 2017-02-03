"use strict";

var form = React.createClass({
    displayName: "form",
    render: function render() {
        return React.createElement(
            "div",
            { className: "col-md-12" },
            React.createElement(
                "div",
                { className: "item" },
                React.createElement(
                    "a",
                    { href: "", className: "title" },
                    React.createElement(
                        "h5",
                        null,
                        this.props.appitem.Title
                    )
                ),
                React.createElement(
                    "span",
                    { className: "author" },
                    "posted by ",
                    this.props.appitem.PostedBy
                ),
                React.createElement(
                    "span",
                    { className: "timeago" },
                    moment(this.props.appitem.Date, moment.ISO_8601).fromNow()
                )
            )
        );
    }
});

var eforum = React.createClass({
    displayName: "eforum",

    mixins: [ComponentVisibilityMixin],
    getInitialState: function getInitialState() {

        return {
            promodata: [{"Title":"Nec vero sum nescius esse utilit in historia, non modo voluptatem nec vero sum nescius esse utilit in historia, non moda voluptatem.","PostedBy":"Lim","Date":"2017-02-03 13:10:20","category":"LATEST"},
{"Title":"Nec vero sum nescius esse utilit in historia, non modo voluptatem nec vero sum nescius esse utilit in historia, non moda voluptatem.","PostedBy":"Lim","Date":"2016-12-30 05:10:20","category":"LATEST"},
{"Title":"Nec vero sum nescius esse utilit in historia, non modo voluptatem nec vero sum nescius esse utilit in historia, non moda voluptatem.","PostedBy":"Lim","Date":"2015-11-25 18:10:20","category":"LATEST"},
{"Title":"Nec vero sum nescius esse utilit in historia, non modo voluptatem nec vero sum nescius esse utilit in historia, non moda voluptatem.","PostedBy":"Lim","Date":"2014-10-20 14:10:20","category":"TRENDING"},
{"Title":"Nec vero sum nescius esse utilit in historia, non modo voluptatem nec vero sum nescius esse utilit in historia, non moda voluptatem.","PostedBy":"Lim","Date":"2013-09-11 13:10:20","category":"TRENDING"},
{"Title":"Nec vero sum nescius esse utilit in historia, non modo voluptatem nec vero sum nescius esse utilit in historia, non moda voluptatem.","PostedBy":"Lim","Date":"2012-08-05 13:10:20","category":"TRENDING"}]
        };
    },
    retrieveFromWebService: function retrieveFromWebService() {
        var that = this;
        var url = "/SiteAssets/eForum/eforumjson.js";
        var promise = $.ajax({
					url: url 
					});
				promise.then(successFunction,errorFunction); 
				function successFunction(data){
					that.setState({ promodata:JSON.parse(data) });
				}
				function errorFunction(jqXHR, textStatus){
					console.log("Request failed: " + textStatus );
					throw new Error("Bad response from server");
				}
	        },
    componentVisibilityChanged: function componentVisibilityChanged() {
		console.log('scroll into eForum');
        this.retrieveFromWebService();
        this.disableVisibilityHandling();
    },
renderPromotions: function renderPromotions() {
        return this.state.promodata.filter(function (obj) {
            if (obj.category == 'LATEST') {
                return obj;
            };
        }).map(function (promoitem, idx) {
            return React.createElement(form, { appitem: promoitem, key: idx });
        });
    },
    renderPromotionsTRENDING: function renderPromotionsTRENDING() {
        return this.state.promodata.filter(function (obj) {
            if (obj.category == 'TRENDING') {
                return obj;
            };
        }).map(function (promoitem, idx) {
            return React.createElement(form, { appitem: promoitem, key: idx });
        });
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "promotionsbox" },
            React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                    "div",
                    { className: "col-md-12" },
                    React.createElement(
                        "div",
                        { className: "headingtitlebox" },
                        React.createElement(
                            "h2",
                            { className: "headingtitle" },
                            " eForum "
                        ),
                        React.createElement(
                            "div",
                            { className: "all" },
                            React.createElement(
                                "a",
                                { href: "/Pages/employeematters_gooddeals.html" },
                                "ALL"
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "col-md-12 col-sm-6 col-xs-6 latesttrendinggroupbox" },
                    React.createElement(
                        "div",
                        { className: "latesttrendinggroup latest" },
                        React.createElement(
                            "div",
                            { className: "col-md-12" },
                            React.createElement(
                                "h4",
                                { className: "subheader" },
                                "LATEST"
                            )
                        ),
                        this.renderPromotions()
                    )
                ),
                React.createElement(
                    "div",
                    { className: "col-md-12 col-sm-6 col-xs-6 latesttrendinggroupbox" },
                    React.createElement(
                        "div",
                        { className: "latesttrendinggroup trending" },
                        React.createElement(
                            "div",
                            { className: "col-md-12" },
                            React.createElement(
                                "h4",
                                { className: "subheader" },
                                "TRENDING"
                            )
                        ),
                        this.renderPromotionsTRENDING()
                    )
                )
            )
        );
    }
});
ReactDOM.render(React.createElement(eforum, null), document.getElementById('eforum'));