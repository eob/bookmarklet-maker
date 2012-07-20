// Copyright (C) 2012 Edward Benson <eob@csail.mit.edu>
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// IN THE SOFTWARE.


/**
 * Utility to assist in the creation of bookmarklet links.
 */
var BookmarkletMaker = {

  MaybeAddJQuery: function() {
    return "if (typeof $ == 'undefined') {" +
           this.ImportJavascript(jquery) +
           "}";
  },

  ImportJavascript: function(url) {
    return "var s = document.createElement('script');" +
           "s.setAttribute('src', '" + url + "');" +
           "document.getElementsByTagName('body')[0].appendChild(s);";
  },

  ImportCss: function(url) {
    return "var s = document.createElement('link');" +
           "s.setAttribute('href', '" + url + "');" +
           "s.setAttribute('rel', 'stylesheet');" +
           "s.setAttribute('type', 'text/css');" +
           "document.getElementByTagName('body')[0].appendChild(s);";
  },

  Sanitize: function(javascript) {
    return javascript;
  },

  MakeBookmarklet: function(jquery, cssUrls, jsUrls, javascript, anchorText) {
    var js = "";

    if (jquery) {
      js += this.MaybeAddJQuery();
    }

    for (var i = 0; i < cssUrls.length; i++) {
      js += this.ImportCss(cssUrls[i]);
    }

    for (var i = 0; i < jsUrls.length; i++) {
      js += this.ImportJavascript(jsUrls[i]);
    }

    js += this.Sanitize(javascript);

    bookmarklet = "<a href=\"javascript:" + js + "\">" + anchorText + "</a>";
    return bookmarklet;
  }

}
