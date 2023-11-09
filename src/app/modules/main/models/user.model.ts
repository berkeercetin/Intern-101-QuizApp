export class UserModel {
    displayName?: string;
    email?: string;
    phoneNumber?: string;
    photoURL?: string;
    uid?: string;
    appScore?: number;
    globalRank?: number;
    hochaScore?: number;
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(data: any) {
      this.displayName =  data.displayName || "İsim Bilinmiyor";
      this.email = data.email || "Eposta Bilinmiyor";
      this.phoneNumber = data.phoneNumber || "Telefon Numarası Bilinmiyor";
      this.photoURL = data.photoURL || "https://ionicframework.com/docs/img/demos/avatar.svg";
      this.uid = data.uid;
      this.appScore = data.appScore || 123456789;
      this.globalRank = data.globalRank || 123456789;
      this.hochaScore = data.hochaScore || 123456;
    }
  }