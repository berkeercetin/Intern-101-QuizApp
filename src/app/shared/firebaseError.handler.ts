export class FirebaseErrors {
    static Parse(errorCode: string): any {
      let message: any;
      switch (errorCode) {
        case 'auth/wrong-password':
          message = {header:'Hatalı Şifre',message:'Hatalı Şifre'};
          break;
        case 'auth/network-request-failed':
            message = {header:'İnternet Yok',message:'Lütfen internet bağlantısını kontrol edin.'};
            break;
        case 'auth/too-many-requests':
            message = {header:'Çok Fazla İstek',message:'İstek sayısı çok fazla'};
          break;
        case 'auth/user-disabled':
            message = {header:'Kullanıcı Devre Dışı',message:'Lütfen sistem yöneticisi ile iletişime geçin.'};
          break;
        case 'auth/requires-recent-login':
            message = {header:'Lütfen Giriş Yapınız',message:'Kullanıcı bulunamadı'};
            break;
        case 'auth/email-already-exists':
            message = {header:'E Posta Daha Önce Kullanılmış',message:'Lütfen başka bir e posta adresi deneyiniz'};
            break;
        case 'auth/user-not-found':
            message = {header:'Kullanıcı Bulunamadı.',message:'Lütfen geçerli bir kullanıcı ile tekrar deneyiniz.'};
          break;
        case 'auth/phone-number-already-exists':
            message = {header:'Telefon Numarası Kullanımda',message:'Lütfen başka bir telefon numarası deneyiniz.'};
            break;
        case 'auth/invalid-phone-number':
            message = {header:'Geçersiz Telefon Numarası',message:'Lütfen geçerli bir telefon numarası giriniz.'};
            break;
        case 'auth/invalid-email  ':
            message = {header:'Geçersiz E posta Adresi',message:'Lütfen geçerli bir eposta giriniz.'};
            break;
        case 'auth/cannot-delete-own-user-account':
            message = {header:' Bu Kullanıcı silinemez.',message:'Lütfen sistem yöneticisi ile iletişime geçin.'};
            break;
         default:
          message = {header:"Beklenmedik Bir Durum Oluştu",message:'Oops! Something went wrong. Try again later.'}
          break;
      }
      return message;
    }
  }