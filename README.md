# Teklif Sistemi Projesi

Bu proje, teklif yönetimi ve alım kalemleri ile ilgili işlemleri destekleyen basit bir web uygulamasıdır. Kullanıcılar teklif oluşturabilir, listeleyebilir, detayları görüntüleyebilir ve alım kalemlerini yönetebilir. Proje, React ile geliştirilmiş bir frontend ve Node.js ile geliştirilmiş bir backend içerir.

## İçindekiler

- [Kurulum](#kurulum)
- [Kullanım](#kullanım)
- [API Referansı](#api-referansı)
- [Teknolojiler](#teknolojiler)
- [Katkıda Bulunma](#katkıda-bulunma)
- [Lisans](#lisans)

## Kurulum

### Backend

1. Backend dizinine gidin:
    ```bash
    cd /teklif/backend
    ```

2. Gerekli paketleri yükleyin:
    ```bash
    npm install
    ```

3. Veritabanı bağlantı bilgilerini `server.js` dosyasında güncelleyin:
    ```js
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'myuser',
      password: 'mypassword',
      database: 'mydatabase'
    });
    ```

4. Sunucuyu başlatın:
    ```bash
    node server.js
    ```

### Frontend

1. Frontend dizinine gidin:
    ```bash
    cd /teklif
    ```

2. Gerekli paketleri yükleyin:
    ```bash
    npm install
    ```

3. Uygulamayı başlatın:
    ```bash
    npm start
    ```

## Kullanım

- **Giriş ve Kayıt**: Kullanıcılar `Sign Up` ve `Login` sayfaları aracılığıyla hesap oluşturabilir ve giriş yapabilirler.
- **Teklifler**: Kullanıcılar yeni teklifler ekleyebilir, mevcut teklifleri listeleyebilir ve teklif detaylarını görüntüleyebilirler.
- **Alım Kalemleri**: Kullanıcılar alım kalemlerini ekleyebilir, listeleyebilir ve silebilirler.

## API Referansı

### Kayıt Endpointi
- **URL**: `/signup`
- **Method**: `POST`
- **Body**: 
    ```json
    {
      "fullName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phoneNumber": "1234567890",
      "password": "password123"
    }
    ```

### Giriş Endpointi
- **URL**: `/login`
- **Method**: `POST`
- **Body**:
    ```json
    {
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```

### Teklif Ekleme Endpointi
- **URL**: `/offers`
- **Method**: `POST`
- **Body**:
    ```json
    {
      "title": "Sample Offer",
      "price": 100,
      "quantity": 10,
      "currency": "USD",
      "piece": 1
    }
    ```

### Teklif Detayları Alma Endpointi
- **URL**: `/offers/:id`
- **Method**: `GET`

### Teklifleri Listeleme Endpointi
- **URL**: `/offers`
- **Method**: `GET`

### Alım Kalemi Ekleme Endpointi
- **URL**: `/acquisition-items`
- **Method**: `POST`
- **Body**:
    ```json
    {
      "name": "Sample Item"
    }
    ```

### Alım Kalemlerini Listeleme Endpointi
- **URL**: `/acquisition-items`
- **Method**: `GET`

### Alım Kalemi Silme Endpointi
- **URL**: `/acquisition-items/:id`
- **Method**: `DELETE`

## Teknolojiler

- **Frontend**: React, React Router
- **Backend**: Node.js, Express, MySQL, bcrypt
- **Diğer**: CORS, body-parser

## Katkıda Bulunma

Katkıda bulunmak isterseniz, lütfen bir pull request gönderin veya bir issue açın. Herhangi bir geri bildirim veya öneriniz varsa, bize bildirmenizden memnuniyet duyarız.



