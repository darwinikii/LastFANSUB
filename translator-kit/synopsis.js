var markdown = `Ailesi tarafından evden kovulan 34 yaşındaki bir NEET otaku, hayatının çıkmaza girdiğini fark etti. Daha sonra, geçmişte daha iyi seçimler yapmış olsaydı, hayatının aslında çok daha iyi olabileceğini hatırladı. Pişmanlık noktasındayken, hızla hareket eden bir kamyon ve yolunda üç lise öğrencisi gördü. Sahip olduğu tüm gücü toplayarak onları kurtarmaya çalıştı ve kamyonun altında kalarak hayatını hızla sonlandırdı. Gözlerini bir sonraki açtığında, Rudeus Greyrat olarak kılıç ve büyünün olduğu bir dünyaya reenkarne olmuştur. Yeni bir dünyaya, yeni bir hayata doğan Rudeus, "Bu sefer, gerçekten pişmanlık duymadan hayatımı sonuna kadar yaşayacağım!" dedi ve hayatını yeniden başlatma arzusuyla dolu bir adamın yolculuğu başlar.`;

markdown = markdown.split("\n\n")

markdown.forEach((e, i) => {
    markdown[i] = "<p>" + e + "</p>"
});

markdown = markdown.join("\n\n")

// Markdown kodunu bir JSON objesine ekleyin
var data = {
    "m": markdown
};

// JSON dosyasına yazın
var fs = require('fs');
fs.writeFileSync('data.json', JSON.stringify(data, null, 4))