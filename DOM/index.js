document.getElementsByTagName('li')[2].textContent = 'TERRY';
// style elements .... not really the right way
document.querySelector("li a").style.color = 'red';
document.querySelector(".btn").style.backgroundColor = 'yellow';

// Style elements .... prefered method
document.querySelector(".btn").classList.toggle("invisible");
document.querySelector("#title").classList.toggle("huge");
// attributes
document.querySelector("a").setAttribute('href', 'https://www.yahoo.com');