// 1. Para yatırma işlemi
// 2. Hangi hat için bahis oluşturduğunu tespit etmek
// 3. Bahis miktarını almak
// 4. Slot makinesini çalıştırmak
// 5. kullanıcının kazanıp kazanmadığını kontrol etmek
// 6. kazandıysa parayı ver
// 7. tekrar oynamak

// function paraYatir(){
//     return 1
// }

//kullanıcı bilgilerini almak için
const prompt = require("prompt-sync")();

// sembolleri, sembollerin değerlerini, sembollerin gerçek değerleri ve makine hatlarını belirliyoruz.
const SIRALAR = 3;
const SÜTUNLAR = 3;

const SEMBOL_SAYİLARİ = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8,
}

const SYMBOL_DEGERLERİ = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2,
}




//9.satırda yazılan function komutu ile aynı işlevi görüyor.
const paraYatir = () => {
    while (true) {
    const paraYatirmaMiktari = prompt("Yatırmak istediğiniz miktar: ")

//kullanıcının para yatırmak istediği miktarı "float" olarak almamız gerekiyor
const yatırılanSayi = parseFloat(paraYatirmaMiktari)

// isNaN girdinin sayı olup olmadığını kontrol eder.
    if (isNaN(yatırılanSayi) || yatırılanSayi <= 0) {
    console.log("Geçersiz yatırma miktarı, tekrar deneyiniz.");
    } else {
        return yatırılanSayi;
        }
    }
};

const getBahisHatti = () => {
    while (true) {
        const hatlar = prompt("Bahis oynmak istediğiniz hattı girin (1-3): ")
        const secilenHatlar = parseFloat(hatlar)
    
        if (isNaN(secilenHatlar) || secilenHatlar <= 0 || secilenHatlar >= 3) {
        console.log("Geçersiz hat, tekrar deneyiniz.");
        } else {
            return secilenHatlar;
            }
        }
}

//bahisGir fonksiyonu bakiyeye bağlı olmalı ki bakiyesinden fazla bir bahis işlemi yapılmasın.
const bahisGir = (bakiye, secilenHatlar) => {
    while (true) {
        const bahis = prompt("Her hat için bahis oynmak istediğiniz miktarı girin: ")
        const bahisMiktari = parseFloat(bahis)
    
        if (isNaN(bahisMiktari) || bahisMiktari <= 0 || bahisMiktari > bakiye / secilenHatlar) {
        console.log("Geçersiz bahis, tekrar deneyiniz.");
        } else {
            return bahisMiktari;
            }
        }
}


let bakiye = paraYatir();
// console.log(paraYatirmaMiktari);
const secilenHatlar = getBahisHatti();
const bahis = bahisGir(bakiye, secilenHatlar)