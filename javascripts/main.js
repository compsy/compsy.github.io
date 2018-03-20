$(document).ready(function() {
  var repo = 'compsy/compsy.github.io';
  var content = $('#content');
  $.getJSON('https://api.github.com/repos/' + repo + '/issues?labels=Project,Available', function(data) {
    var entry;
    var resp = '';
    for (var i = 0, len = data.length; i < len; i++) {
      resp += createEntry(data[i]);
    }
    if (resp == '') {
      return false;
    }
    resp = createFinalOutput(resp);
    content.html(resp);
    $('.collapsible').collapsible();
  })
})

function convert(text) {
  var converter = new showdown.Converter();
  var html = converter.makeHtml(text);
  return html;
}

function createFinalOutput(entries) {
  return '<ul class="collapsible popout" data-collapsible="accordion">' + entries + '</ul>'
}

function createEntry(entry) {
  var returnVal = '<li>';
  returnVal += '<div class="collapsible-header"><i class="large material-icons">assignment</i>' + entry.title + '</div>'
  returnVal += '<div class="collapsible-body">'
  returnVal += '<span>' + convert(entry.body) + '</span>'
  returnVal += '<p>Contact: <a href="' + entry.user.html_url + '">' + entry.user.login + '</a></p>'
  returnVal += '</div>'
  returnVal += '</li>';
  return returnVal;
}
