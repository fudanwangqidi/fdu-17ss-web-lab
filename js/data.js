window.onload= function() {
    const countries = [
    { name: "Canada", continent: "North America", cities: ["Calgary","Montreal","Toronto"], photos: ["canada1.jpg","canada2.jpg","canada3.jpg"] },
    { name: "United States", continent: "North America", cities: ["Boston","Chicago","New York","Seattle","Washington"], photos: ["us1.jpg","us2.jpg"] },
    { name: "Italy", continent: "Europe", cities: ["Florence","Milan","Naples","Rome"], photos: ["italy1.jpg","italy2.jpg","italy3.jpg","italy4.jpg","italy5.jpg","italy6.jpg"] },
    { name: "Spain", continent: "Europe", cities: ["Almeria","Barcelona","Madrid"], photos: ["spain1.jpg","spain2.jpg"] }
];

    var main = "";
    for(var i=0;i<4;i++){
        var cities="";
        for(var j=0;j<countries[i].cities.length;j++){
            cities=cities+"<p>"+countries[i].cities[j]+"</p>";

        }
        var photos="";
        for(var k=0;k<countries[i].photos.length;k++){
            photos=photos+"<img src=./images/"+countries[i].photos[k]+" class='photo'>";
        }
        main=main+"<div class='item'>"
            +"<h1>"+countries[i].name+"</h1>"+"<h3>"+countries[i].continent+"</h3>" +"<div class='inner-box'>"+"<h2>Cities</h2>"
        +cities+"</div>"+ "<div class='inner-box'>"+"<h2>"+"Popular Photos"+"</h2>"+photos+"</div>"+"<button>"+"Visit"+"</button></div>";
    }
    document.getElementById("contain").innerHTML = main;
}

