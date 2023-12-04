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

//makinenin dönmesi için
const dön = () => {
    const semboller = [];
    for (const[sembol, sayi] of Object.entries(SEMBOL_SAYİLARİ)) {
        for (let i = 0; i < sayi; i++){
            semboller.push(sembol);
        }
    }

    //seçilen sembolleri farklı bir yere aktarıyoruz ki makinede tekrar dönmesin
    //fakat sonraki dönüş için tekrar sembolleri kullanmamız gerek
    //bu yüzden semboller arrayinden değil de aşşağıdaki reels arraylerinin içinde bu sembolleri ayırıyourz
    const reels = [[], [], []]
    for (let i = 0; i < SÜTUNLAR; i++) {
        const reelSembolleri = [...semboller];
        for (let J = 0; J < SIRALAR; J++) {
            //(0 ve array uzunluğu -1 arasında)rastgele bir index seçmek için
            const randomIndex = Math.floor(Math.random() * reelSembolleri.length)
            const secilenSemboller = reelSembolleri[randomIndex]
            reels[i].push(secilenSemboller)
            reelSembolleri.splice(randomIndex, 1)
        }
    } return reels
}


//sıralama şu şekilde olmak zorunda (transposing - aktarma)
// ![[A B C], [D D D], [A A A]] 
// [A D A]
// [B D A]
// [C D A]

const aktarma = (reels) => {
    const sıralar = [];

    for (let i = 0; i < SIRALAR; i++) {
        sıralar.push([])
        for (let j = 0; j < SÜTUNLAR; j ++){
            sıralar[i].push(reels[j][i])
        }
     }
     return sıralar
}

const printSıralar = (sıralar) => {
    for (const sıra of sıralar){
        let sıraString = "";
        for (const[i, sembol] of sıra.entries()) {
            sıraString += sembol;
            if (i != sıra.length - 1){
                sıraString += " | "
            }
        }
        console.log(sıraString);
    }
}

const kazancAl = (sıralar, bahis, hatlar) => {
    let kazanc = 0;

    for (let sıra = 0; sıra < hatlar; sıra++) {
    const semboller = sıralar[sıra];
    let hepsiAyni = true;
    
    for (const sembol of semboller){
        if (sembol != semboller[0]){
            hepsiAyni = false;
            break; 
        }
    }

    if (hepsiAyni) {
        kazanc += bahis * SYMBOL_DEGERLERİ[semboller[0]]
        }
    }
    return kazanc;
}

const oyun = () => {

let bakiye = paraYatir();

while (true) {
    console.log("Bakiyeniz $" + bakiye);
const secilenHatlar = getBahisHatti();
const bahis = bahisGir(bakiye, secilenHatlar)
    bakiye -= bahis * secilenHatlar
const reels = dön();
const sıralar = aktarma(reels);
printSıralar(sıralar);                                                                                          
const kazanc = kazancAl(sıralar, bahis, secilenHatlar);
    bakiye += kazanc
console.log("Kazandınız, $" + kazanc.toString());

    if (bakiye <= 0) {
        console.log("Paranız bitti!");
        break;
    }

    const tekrarOyna = prompt("Tekrar oynamak ister misiniz?\n Evet\n Hayır\n");

    if (tekrarOyna != "Evet") break;
}

};

oyun();