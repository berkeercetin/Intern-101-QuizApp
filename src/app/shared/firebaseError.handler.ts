import { AlertMessage } from "./models/alert.message.model";

export class FirebaseErrors {
    static Parse(errorCode: string): AlertMessage {
      const message: AlertMessage = new AlertMessage();
      switch (errorCode) {
        case 'auth/invalid-login-credentials':
          message.header = 'Hatalı Giriş';
          message.message = 'Lütfen şifrenizi veya epostanızı kontrol ediniz.';
          break;
        case 'auth/network-request-failed':
            message.header = 'İnternet Bağlantısı Yok';
            message.message = 'Lütfen internet bağlantınızı kontrol ediniz.';
            break;
        case 'auth/too-many-requests':
            message.header = 'Çok Fazla İstek';
            message.message = 'İstek sayısı çok fazla';
          break;
        case 'auth/user-disabled':
            message.header = 'Kullanıcı Devre Dışı';
            message.message = 'Lütfen sistem yöneticisi ile iletişime geçin.';
            break;
        case 'auth/requires-recent-login':
            message.header = 'Tekrar Giriş Yapınız';
            message.message='Lütfen tekrar giriş yapınız.';
            break;
        case 'auth/email-already-exists':
            message.header='E Posta Daha Önce Kullanılmış';
            message.message='Lütfen başka bir e posta adresi deneyiniz';
            break;
        case 'auth/user-not-found':
            message.header='Kullanıcı Bulunamadı';
            message.message='Lütfen geçerli bir kullanıcı ile tekrar deneyiniz.';
          break;
        case 'auth/phone-number-already-exists':
            message.header='Telefon Numarası Daha Önce Kullanılmış';
            message.message='Lütfen başka bir telefon numarası deneyiniz';
            break;
        case 'auth/invalid-phone-number':
            message.header='Geçersiz Telefon Numarası';
            message.message='Lütfen geçerli bir telefon numarası giriniz.';
            break;
        case 'auth/invalid-email':
            message.header='Geçersiz E posta Adresi';
            message.message='Lütfen geçerli bir eposta giriniz.';
            break;
        case 'auth/cannot-delete-own-user-account':
            message.header='Kendi Kullanıcınızı Silemezsiniz';
            message.message='Lütfen başka bir kullanıcı ile tekrar deneyiniz.';
            break;
         default:
          message.header = 'Beklenmedik Bir Durum Oluştu';
          message.message='Oops! Something went wrong. Try again later.';
          break;
      }
      return message;
    }
  }