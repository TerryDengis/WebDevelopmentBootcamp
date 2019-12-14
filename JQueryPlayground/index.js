$('h1').addClass('big-title');

$('.toggle').text('CLICK ME!');

$('h1').click(function() {
  this.classList.toggle('test');
  $('a').attr('href', 'https://www.yahoo.com');
});

$('button.toggle').click(function() {
  this.disabled = true;
});

$('.enable').click(function() {
  $('button.toggle').prop('disabled', false);
});

$('button.disable').click(function() {
  $('button.toggle').prop('disabled', true);
});
document.querySelector;

function fan() {
  console.log('hi');
}
fan();

document.querySelector;

const y = 'Hi';

const func1 = y => {
  console.log(y);
};
func1(y);
// /Users/terrydengis/.rbenv/shims:
// /Library/Frameworks/Python.framework/Versions/3.6/bin:
// /usr/local/bin:
// /usr/bin:
// /bin:
// /usr/sbin:
// /sbin:
// /usr/local/share/dotnet:
// ~/.dotnet/tools:/Library/Frameworks/Mono.framework/Versions/Current/Commands:
// /Applications/Xamarin Workbooks.app/Contents/SharedSupport/path-bin:
// /Users/terrydengis/Developer/flutter/bin
