Rails.application.config.middleware.use OmniAuth::Builder do
  provider :foursquare, 'PFA0SIC111ANO1SYNAEGWUCJNP2K45HNJJEMMMAXAHWXWVML', 'BK13ROO52YWTG3PXSC11IAGODSFMRSHHLVR0SSKGIIXQCCPH'
end