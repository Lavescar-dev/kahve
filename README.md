# Lumina Skin — Svelte Dönüşümü

Bu proje, verilen tek dosyalı HTML tasarımının **Svelte + Vite** yapısına taşınmış halidir.
Arayüz korunmuş, durum yönetimi Svelte reaktivitesi ile yeniden yazılmış ve sepet / giriş bilgileri
tarayıcıda `localStorage` üzerinde saklanacak şekilde hazırlanmıştır.

## Neler var?

- Svelte bileşenlerine ayrılmış yapı
- Tailwind CSS ile çalışır tasarım sistemi
- Ana sayfa, mağaza, hakkımızda ve ödeme ekranları
- Ürün modalı, sepet paneli, giriş/profil modalı
- Yerel depolama üzerinden çalışan demo sepet ve kullanıcı oturumu
- Hazır `dist/` üretim çıktısı

## Backend var mı?

Bu sürüm için backend gerekli değildir. Mevcut davranışların tamamı tarayıcı tarafında çalışmaktadır.
Gerçek kullanıcı girişi, sipariş kaydı veya ödeme entegrasyonu istenirse ayrıca **Axum** tabanlı bir backend
eklenebilir.

## Geliştirme

```bash
npm install
npm run dev
```

Ardından tarayıcıda görünen yerel adresi açın.

## Build

```bash
npm run build
npm run preview
```

## Notlar

- Ürün görselleri uzaktan Unsplash üzerinden yüklenir.
- Ödeme alanı yalnızca görsel demodur, gerçek ödeme işlemi yapmaz.
- Orijinal HTML referansı `reference/original-source.html` içinde tutulmuştur.
