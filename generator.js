var num = 1
var list = []

for (var i = 1; num < 71; i++) {
    if (i == 4) continue
    list.push((i < 10 ? "0" + i.toString() : i.toString()) + ".png")
    num++
}

console.log(JSON.stringify(list))