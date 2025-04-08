let scoops = 5;
while (scoops > 0) {
    document.writeln("Another scoop!<br>");
    if (scoops < 3) {
        alert("Running low on ice cream");
    }
    else if (scoops >= 5) {
        alert("The ice cream will melt");
    }
    scoops -= 1;
}
document.writeln("I love ice cream");