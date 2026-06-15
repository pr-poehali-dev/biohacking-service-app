const MASTER_IMG = "https://cdn.poehali.dev/projects/bd9db7a1-9034-49dd-9531-cd77933f55b3/bucket/1cf286e3-6f96-47b5-b6b4-02e7e75c4a73.jpg";
const SITE_URL   = "https://da18a679-098e-494d-8de1-a558d89808d6.poehali.app";
const QR_URL     = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(SITE_URL)}&margin=4&color=1a0d05&bgcolor=ffffff`;

export default function PrintCard() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f0ea",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      fontFamily: "'Golos Text', Segoe UI, sans-serif",
    }}>

      {/* кнопки — скрыты при печати */}
      <div className="no-print" style={{ display:"flex", gap:"12px", marginBottom:"32px", flexWrap:"wrap", justifyContent:"center" }}>
        <button
          onClick={() => window.print()}
          style={{
            padding:"12px 28px", borderRadius:"12px", border:"none", cursor:"pointer",
            background:"#c8814a", color:"#fff", fontWeight:700, fontSize:"15px",
            boxShadow:"0 4px 20px rgba(200,129,74,0.4)", letterSpacing:"0.03em",
          }}
        >
          🖨️ Распечатать
        </button>
        <a
          href={QR_URL}
          download="qr-maria-parmaster.png"
          target="_blank"
          rel="noreferrer"
          style={{
            padding:"12px 28px", borderRadius:"12px", border:"2px solid #c8814a",
            color:"#c8814a", fontWeight:700, fontSize:"15px", textDecoration:"none",
            background:"transparent", letterSpacing:"0.03em",
          }}
        >
          ⬇️ Скачать QR (PNG)
        </a>
      </div>

      {/* ══ КАРТОЧКА ══ */}
      <div
        id="card"
        style={{
          width: "100%",
          maxWidth: "640px",
          background: "linear-gradient(150deg, #1c0e06 0%, #2e1a0a 45%, #1c0e06 100%)",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 30px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(232,148,60,0.2)",
          position: "relative",
        }}
      >
        {/* SVG декор — кольца */}
        <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }} xmlns="http://www.w3.org/2000/svg">
          <circle cx="90%" cy="15%" r="140" fill="none" stroke="rgba(232,148,60,0.12)" strokeWidth="1" strokeDasharray="6 5"/>
          <circle cx="90%" cy="15%" r="90"  fill="none" stroke="rgba(232,148,60,0.08)" strokeWidth="1"/>
          <circle cx="8%"  cy="88%" r="110" fill="none" stroke="rgba(232,148,60,0.1)"  strokeWidth="1" strokeDasharray="4 6"/>
        </svg>

        {/* ВЕРХ — имя + фото */}
        <div style={{ padding:"36px 36px 0", position:"relative", display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontSize:"11px", letterSpacing:"0.25em", color:"rgba(232,148,60,0.65)", textTransform:"uppercase", marginBottom:"6px", fontWeight:500 }}>
              Пармастер · Хилер · Практик
            </div>
            <div style={{ fontFamily:"'Oswald', sans-serif", fontSize:"52px", fontWeight:700, color:"#fff", letterSpacing:"-0.02em", lineHeight:1, marginBottom:"4px" }}>
              МАРИЯ
            </div>
            <div style={{ fontSize:"13px", color:"rgba(255,255,255,0.35)", letterSpacing:"0.08em", textTransform:"uppercase" }}>
              Авторские программы парения
            </div>
          </div>

          <div style={{
            width:"88px", height:"88px", borderRadius:"50%", overflow:"hidden", flexShrink:0,
            border:"2.5px solid rgba(232,148,60,0.55)",
            boxShadow:"0 0 24px rgba(232,148,60,0.2)",
          }}>
            <img src={MASTER_IMG} alt="Мария" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top center" }} />
          </div>
        </div>

        {/* разделитель */}
        <div style={{ margin:"24px 36px 0", height:"1px", background:"linear-gradient(to right, rgba(232,148,60,0.7), rgba(232,148,60,0.15), transparent)" }} />

        {/* СЕРЕДИНА — текст + QR */}
        <div style={{ padding:"28px 36px 28px", display:"flex", alignItems:"center", gap:"32px" }}>
          <div style={{ flex:1 }}>
            {/* рукописная фраза */}
            <div style={{ fontFamily:"'Caveat', cursive", fontSize:"26px", color:"rgba(232,148,60,0.9)", lineHeight:1.3, marginBottom:"16px" }}>
              Понравилось парение?
            </div>
            <div style={{ fontSize:"14px", color:"rgba(255,255,255,0.55)", lineHeight:1.65, marginBottom:"22px" }}>
              Отсканируйте QR-код, чтобы оставить отзыв или отблагодарить мастера чаевыми — это займёт меньше минуты.
            </div>
            {/* три пункта */}
            {[
              { e:"⭐", t:"Оставить отзыв о парении" },
              { e:"🙏", t:"Отправить чаевые мастеру" },
              { e:"🌿", t:"Записаться на программу" },
            ].map(item => (
              <div key={item.t} style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"9px", fontSize:"13.5px", color:"rgba(255,255,255,0.45)" }}>
                <span style={{ fontSize:"16px" }}>{item.e}</span>
                <span>{item.t}</span>
              </div>
            ))}
          </div>

          {/* QR блок */}
          <div style={{ flexShrink:0, display:"flex", flexDirection:"column", alignItems:"center", gap:"10px" }}>
            <div style={{
              background:"#ffffff",
              padding:"12px",
              borderRadius:"18px",
              boxShadow:"0 0 0 1px rgba(232,148,60,0.3), 0 8px 32px rgba(0,0,0,0.4)",
            }}>
              <img src={QR_URL} alt="QR-код" width={170} height={170} style={{ display:"block", borderRadius:"8px" }} />
            </div>
            <div style={{ fontSize:"10px", color:"rgba(255,255,255,0.25)", textAlign:"center", letterSpacing:"0.05em" }}>
              Наведите камеру
            </div>
          </div>
        </div>

        {/* НИЗ */}
        <div style={{
          margin:"0 36px",
          paddingTop:"16px",
          paddingBottom:"28px",
          borderTop:"1px solid rgba(255,255,255,0.07)",
          display:"flex",
          alignItems:"center",
          justifyContent:"space-between",
          flexWrap:"wrap",
          gap:"8px",
        }}>
          <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.3)", display:"flex", alignItems:"center", gap:"6px" }}>
            <span>📞</span>
            <a href="tel:+79186860650" style={{ color:"rgba(255,255,255,0.3)", textDecoration:"none" }}>+7 (918) 686-06-50</a>
          </div>
          <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.25)", display:"flex", alignItems:"center", gap:"6px" }}>
            <span>📍</span>
            <span>Любая баня Краснодара по вашему запросу</span>
          </div>
        </div>
      </div>

      <p className="no-print" style={{ marginTop:"20px", fontSize:"12px", color:"rgba(0,0,0,0.35)", textAlign:"center" }}>
        Рекомендуемый формат печати: A5 или A6, горизонтальная ориентация
      </p>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Golos+Text:wght@400;500&family=Caveat:wght@600&display=swap');

        @media print {
          body { margin: 0; background: white !important; }
          .no-print { display: none !important; }
          #card {
            max-width: 100% !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
}
