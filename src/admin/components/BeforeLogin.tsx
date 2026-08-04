import React from 'react'

/**
 * Giriş formunun üstünde görünen kısa Türkçe açıklama.
 * Panele ilk kez giren kullanıcıya buranın ne olduğunu anlatır.
 */
export const BeforeLogin = () => (
  <div className="dg-login-intro">
    <p className="dg-login-intro__title">Web Sitesi Yönetim Paneli</p>
    <p className="dg-login-intro__text">
      Sitenizdeki yazıları, hizmetleri, görselleri ve iletişim bilgilerini buradan
      düzenleyebilirsiniz. Devam etmek için e-posta adresiniz ve şifrenizle giriş yapın.
    </p>
  </div>
)

export default BeforeLogin
