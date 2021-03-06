// Version 0.7
;(function() {

  function Search() {
    if (Search.instance) {
      return Search.instance;
    }

    this.PAGE_LENGTH = 10;
    this.query = this.getQueryParams(document.location.search);

    Search.instance = this
  }

  getInstance = function() {
    return new Search();
  }

  Search.prototype.connection = {
    host: window.xcartJekyll.search.host,
    path: window.xcartJekyll.search.path,
    port: (window.location.protocol === 'https:' ? 7443 : 7000),
    protocol: (window.location.protocol === 'https:' ? 'https' : 'http'),
  }

  Search.prototype.elements = {
    formContainer: $('.search-panel'),
    resultsContainer: $('.search-results'),
    queryMessage: $('.search-query'),
    queryInput: $('.search-input')
  }

  Search.prototype.devsSections = {
    getting_started: { en: "Getting started" },
    changing_store_logic: { en: "Changing store logic"},
    customization_examples: { en: "Customization examples"},
    changelog: { en: "Changelog"},
    basics: { en: "Architecture basics"},
    migration_guides: { en: "Migration guides"},
    webinars_and_video_tutorials: { en: "Webinars and video tutorials"},
    design_changes: { en: "Design changes"},
    "how-to_articles": { en: "How-To Articles"},
    misc: { en: "Misc"},
  }

  Search.prototype.kbSections = {
    "general_setup": { en:"General setup"},
    "products": { en:"Products"},
    "shipping": { en:"Shipping"},
    "seo_and_promotion": { en:"SEO and promotion"},
    "product_classes_and_attributes": { en:"Product classes and attributes"},
    "webinars_and_video_tutorials": { en:"Webinars and video tutorials"},
    "sectting_up_x-cart_5_environment": { en:"Setting up X&#8209;Cart 5 environment"},
    "payments": { en:"Payments"},
    "countries__states_and_zones": { en:"Countries, states and zones"},
    "addons": { en:"Addons"},
    "integrating_your_store_with_other_web-sites": { en:"Integrating your store with other web-sites"},
    "look_and_feel": { en:"Look and feel"},
    "orders": { en:"Orders"},
    "taxes": { en:"Taxes"},
    "users": { en:"Users"},
    "translation_and_localization": { en:"Translation and localization"},
    "multivendor": { en:"Multivendor"},
    "import-export": { en:"Import-Export"}
  }

  Search.prototype.getCategoryByItem = function (item) {
    var registry = (item.displayLink.indexOf('kb') == 0) ? this.kbSections : this.devsSections;

    var regex = /\/\/.+?\/(.+?)\/(.+?)\//;
    var matches = item.link.match(regex);

    if (matches) {
      var lng = matches[1];
      var key = matches[2];
      var section = registry[key];
      if ('undefined' !== typeof(section)) {
        return 'undefined' !== typeof(section[lng])
          ? section[lng]
          : section[Object.getOwnPropertyNames(section)[0]];
      }
    }

    return '';
  }

  Search.prototype.sendRequest = function (params) {
    var url = this.connection.protocol + '://' + this.connection.host + ':' + this.connection.port + '/' + this.connection.path;
    return $.get(url, params, null, 'json');
  }

  Search.prototype.runAutocompleteQuery = function (query) {
    var params = {
      q: query,
      num: 10,
      lang: window.xcartJekyll.search.lang
    };
    return this.sendRequest(params).then(_.bind(this.onAutocompleteSuccess, this), _.bind(this.onAutocompleteFail, this));
  }

  Search.prototype.onAutocompleteSuccess = function (response) {
    var self = this;
    var results = response.items || [];
    var pages = results.reduce(function(memo, item) {
      var title = _.unescape(item.htmlTitle).replace(/\s-\sX-.*/, '');
      memo.push({
        title: title,
        url: item.link,
        description: self.getCategoryByItem(item),
        site: item.displayLink
      });
      return memo;
    }, []);


    if (pages.length > 0) {
      var kb_category = {
        name: 'KB',
        results: pages.filter(function(item) {
          return item.site.indexOf('kb') == 0;
        })
      };
      
      var devs_category = {
        name: 'DEV',
        results: pages.filter(function(item) {
          return item.site.indexOf('devs') == 0;
        })
      };

      var preferredSite = window.xcartJekyll.search.preferred;

      if (preferredSite.indexOf('kb') == 0) {
        var categories = {
          category1: kb_category,
          category2: devs_category
        }
      } else {
        var categories = {
          category1: devs_category,
          category2: kb_category
        }
      }      
    } else {
      var categories = null;
    }

    return categories;
  }

  Search.prototype.onAutocompleteFail = function() {
    return null;
  }

  Search.prototype.runQuery = function() {
    var self = this;
    // write message
    this.startAnimation();
    this.elements.queryMessage.text("Results for search query: \"" + this.query.q +"\"");
    this.elements.queryInput.val(this.query.q);

    var params = {
      q: this.query.q,
      num: this.PAGE_LENGTH,
      lang: window.xcartJekyll.search.lang
    };

    if (this.query.page && this.query.page > 0) {
      params['start'] = (this.query.page - 1) * this.PAGE_LENGTH + 1;
    }

    return this.sendRequest(params).then(_.bind(this.onSuccess, this), _.bind(this.onFail,this));
  }

  Search.prototype.onSuccess = function (response) {
    try {
      var self = this;
      var results = response.items || [];
      var pages = results.reduce(function(memo, item) {
        memo.push({
          title: item.htmlTitle,
          url: item.link,
          parent: self.getCategoryByItem(item),
          index: item.displayLink,
          date: "",
          highlight: item.htmlSnippet
        });
        return memo;
      }, []);

      // show result
      this.renderResult(pages);
    } catch (e) {
      console.error(e.message);
    }
    this.endAnimation();

    return pages;
  }

  Search.prototype.onFail = function (err) {
    console.trace(err.message);
    this.renderError();
    this.endAnimation();
  }

  Search.prototype.getQueryParams = function (qs) {
    qs = qs.split("+").join(" ");
    var params = {}, tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
      params[decodeURIComponent(tokens[1])]
        = decodeURIComponent(tokens[2]);
    }
    return params;
  }

  Search.prototype.renderResult = function (pages) {
    if (pages.length == 0) {
      
    this.elements.resultsContainer.html("<p class='search-no-results'>Oops, no results were found</p>");
    } else {
      var rows = _.map(pages, this.renderRow).join('');
      var markup = _.template("<section class='ui very relaxed items search-results-list'><%= rows %></section>");
      this.elements.resultsContainer.html(markup({rows: rows}));
    }
  }

  Search.prototype.renderRow = function(page) {
    var date = moment(page.date);
    var formattedDate = date.isValid() ? date.format('D MMMM Y') : null;
    var markup = _.template(
    '<div class="item search-result-item">' +
      '<div class="content">' +
        '<a class="header" href="<%= page.url %>"><%= page.title %></a>' +
        '<% if (page.parent) { %><div class="meta"><%= index %>/<%= page.parent %></div><% } %>' +
        '<div class="description"><%= page.highlight %></div>' +
        '<% if (date) { %><div class="extra"><%= date %></div><% } %>' +
      '</div>' +
    '</div>');

    return markup({
      page: page,
      index: page.index === 'kb.x-cart.com' ? 'Knowledge base' : 'Developer docs',
      date: formattedDate
    });
  }

  Search.prototype.renderError = function () {
    this.elements.resultsContainer.html("<p class='search-no-results'>Search system error</p>");
  }  

  Search.prototype.startAnimation = function() {
    if (this.elements.resultsContainer.length) {
      this.inProgress = true;
      this.elements.resultsContainer.addClass('reloading');
    }
  }

  Search.prototype.endAnimation = function() {
    if (this.elements.resultsContainer.length) {
      this.inProgress = false;
      this.elements.resultsContainer.removeClass('reloading');
    }
  }

  Search.prototype.toggleAnimation = function() {
    if (this.inProgress) {
      this.endAnimation();
    } else {
      this.startAnimation();
    }
  }  

  window.Search = getInstance();

})();