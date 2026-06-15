import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const MASTER_IMG = "https://cdn.poehali.dev/projects/bd9db7a1-9034-49dd-9531-cd77933f55b3/bucket/1cf286e3-6f96-47b5-b6b4-02e7e75c4a73.jpg";
const SMOKE_IMG  = "https://cdn.poehali.dev/projects/bd9db7a1-9034-49dd-9531-cd77933f55b3/files/d50f7121-957f-45f3-b747-a5682352b67e.jpg";

const PROGRAMS = [
  { id:1, name:"Фирменный пар",           duration:"50 мин", price:6200, badge:"Премиум",   emoji:"🌿",
    img:"https://cdn.poehali.dev/projects/bd9db7a1-9034-49dd-9531-cd77933f55b3/files/7aa14dc7-bafa-4b92-90ea-7b3f5113a106.jpg",
    short:"Парение в два захода с тёплыми припарками, медово-соляное скрабирование, ароматерапия луговыми травами.",
    full:"Эта программа перенесёт вас на новый уровень блаженства, для настоящих ценителей! Согревающее парение с тёплыми припарками в два захода, ароматерапия луговыми травами, медово-соляное скрабирование и помывка берёзовым веником, либо лыковым мочалом." },
  { id:2, name:"Цитрусовое парение",       duration:"35 мин", price:3900, badge:null,        emoji:"🍊",
    img:"https://cdn.poehali.dev/projects/bd9db7a1-9034-49dd-9531-cd77933f55b3/files/280742f1-6b9d-4b15-a77a-f63ba45376dd.jpg",
    short:"Будоражащий купаж пихты и цитруса, дуб для тела, завершающий пилинг сочным цитрусом.",
    full:"Приготовьтесь к будоражащему ваше сознание сочетанию прохладной пихты и сочного цитруса, а могучий дуб не оставит ваше тело равнодушным. Лёгкий пилинг сочным цитрусом дополнит ваш купаж ощущением наполненности и настоящего расслабления." },
  { id:3, name:"Бодрящее парение",         duration:"35 мин", price:3700, badge:"Хит",       emoji:"🌲",
    img:"https://cdn.poehali.dev/projects/bd9db7a1-9034-49dd-9531-cd77933f55b3/files/8878d273-b42f-4b85-beb0-2abdaf1ef3c2.jpg",
    short:"Авторский ритуал с хвоей пихты — прилив сил, ясность ума, оздоровление дыхательных путей.",
    full:"Аромат живой пихты переносит в прохладу северной тайги, очищая мысли. Парение тела, ароматерапия ледяной пихтой, выход на контраст, чаепитие и догрев. Оздоровление дыхательных путей, улучшение кожи, снятие стресса и мощный прилив жизненного тонуса." },
  { id:4, name:"Знахарь",                  duration:"20 мин", price:3200, badge:null,        emoji:"🌿",
    img:"https://cdn.poehali.dev/projects/bd9db7a1-9034-49dd-9531-cd77933f55b3/files/e0bfd6dc-5eaf-4f9d-890e-708a3cd303c2.jpg",
    short:"Эвкалипт для иммунитета под звонкий шелест дуба. Ингаляция, прогрев ног в настое эвкалипта.",
    full:"Эвкалипт — лучший помощник для иммунитета! Насладитесь его благоуханием под звонкий шелест дуба. Парение всего тела, ингаляция эвкалиптом, прогрев ног в настое эвкалипта." },
  { id:5, name:"Традиционное парение",     duration:"25 мин", price:3200, badge:null,        emoji:"🍃",
    img:"https://cdn.poehali.dev/projects/bd9db7a1-9034-49dd-9531-cd77933f55b3/files/baa1d46c-3023-4ca5-b1bb-cb780a9f09f4.jpg",
    short:"Тёплый пар и нежная берёза. Прогрев дубовыми вениками и банная помывка берёзой.",
    full:"Тёплый пар и нежная берёза окутывает ваше тело. Очищение тела и свобода мыслей. Лёгкий прогрев дубовыми вениками всего тела и банная помывка берёзой." },
  { id:6, name:"Парение дубовыми вениками",duration:"15 мин", price:2500, badge:"Классика", emoji:"🌾",
    img:"https://cdn.poehali.dev/projects/bd9db7a1-9034-49dd-9531-cd77933f55b3/files/7430ea71-4710-4c28-b826-483e04881ea9.jpg",
    short:"Прогрев каждой группы мышц всего тела с холодной пихтой на голове. Старая добрая классика.",
    full:"Тёплое парение каждой группы мышц всего тела с холодной пихтой на голове, старая добрая классика." },
  { id:7, name:"Мёд и травы",              duration:"20 мин", price:2800, badge:null,        emoji:"🍯",
    img:"https://cdn.poehali.dev/projects/bd9db7a1-9034-49dd-9531-cd77933f55b3/files/082b3020-d0fe-48f1-bedb-03160127bc27.jpg",
    short:"Глубокое парение, ароматерапия луговыми травами и скрабирование натуральным мёдом.",
    full:"Парение подготавливает тело, в воздухе разливается благоухание луговых трав, а тёплый мёд создаёт атмосферу комфорта. Скрабирование натуральным мёдом делает кожу бархатистой и напитанной. Очищение, детокс, релакс и укрепление иммунитета." },
  { id:8, name:"Детское парение",          duration:"10 мин", price:1200, badge:"До 12 лет", emoji:"🌸",
    img:"https://cdn.poehali.dev/projects/bd9db7a1-9034-49dd-9531-cd77933f55b3/files/f1669a2d-4391-41ef-91b7-5404bb32b709.jpg",
    short:"Мягкий ритуал для детей: лёгкое парение дубовым и пихтовым вениками, ароматерапия, забота мастера.",
    full:"Специальный мягкий ритуал для детей до 12 лет. Лёгкое парение дубовым и пихтовым вениками безопасно для детей. Ароматерапия и расслабление в парной. Активизирует кровообращение, укрепляет иммунитет, улучшает сон." },
];

const INITIAL_REVIEWS = [
  { id:1, name:"Алексей",  rating:5, text:"Фирменный пар — это что-то невероятное! Вышел будто заново родился. Мастер — золотые руки.", date:"12 июня" },
  { id:2, name:"Марина",   rating:5, text:"Брала цитрусовое парение, аромат держался ещё пару дней. Кожа мягкая, настроение на высоте.", date:"8 июня" },
  { id:3, name:"Дмитрий",  rating:5, text:"Хожу на бодрящее парение каждую неделю. Лучшая перезагрузка после рабочих будней.", date:"3 июня" },
];

const TIP_OPTIONS = [300, 500, 1000, 2000];

const STEAM_COUNT = 12;

/* ---------- steam particles ---------- */
function SteamLayer() {
  const particles = Array.from({ length: STEAM_COUNT }, (_, i) => ({
    left: `${5 + (i * 8) % 90}%`,
    height: `${60 + Math.random() * 120}px`,
    delay: `${(i * 0.7) % 6}s`,
    duration: `${5 + (i * 1.3) % 6}s`,
    drift: `${-30 + (i * 11) % 60}px`,
  }));
  return (
    <div className="steam-wrap">
      {particles.map((p, i) => (
        <div
          key={i}
          className="steam-p"
          style={{
            left: p.left,
            height: p.height,
            animationDelay: p.delay,
            animationDuration: p.duration,
            ["--drift" as string]: p.drift,
          }}
        />
      ))}
    </div>
  );
}

/* ---------- 3D tilt card ---------- */
function Card3D({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    el.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 8}deg) translateY(-4px) scale(1.02)`;
    el.style.boxShadow = `${-x*20}px ${y*20}px 50px rgba(0,0,0,0.45), 0 0 40px rgba(232,148,60,0.15)`;
  };
  const onLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.transform = "";
    el.style.boxShadow = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`card-3d ${className}`}
      style={{ transition: "transform 0.5s cubic-bezier(0.23,1,0.32,1), box-shadow 0.5s ease", ...style }}
    >
      {children}
    </div>
  );
}

/* ========== main ========== */
export default function Index() {
  const { toast } = useToast();
  const [selected, setSelected] = useState<typeof PROGRAMS[0] | null>(null);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [revName, setRevName] = useState("");
  const [revText, setRevText] = useState("");
  const [revRating, setRevRating] = useState(5);
  const [tip, setTip] = useState<number | null>(null);
  const [customTip, setCustomTip] = useState("");
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const submitReview = () => {
    if (!revName.trim() || !revText.trim()) { toast({ title: "Заполните имя и отзыв", variant: "destructive" }); return; }
    setReviews([{ id: Date.now(), name: revName, rating: revRating, text: revText, date: "сегодня" }, ...reviews]);
    setRevName(""); setRevText(""); setRevRating(5);
    toast({ title: "Спасибо за отзыв! 🌿" });
  };

  const sendTip = () => {
    const amount = tip ?? Number(customTip);
    if (!amount) { toast({ title: "Выберите сумму", variant: "destructive" }); return; }
    toast({ title: `Благодарность отправлена — ${amount.toLocaleString()} ₽ 🙏` });
    setTip(null); setCustomTip("");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden grain">

      {/* ambient orbs */}
      <div className="fixed top-[-10vh] left-[-10vw] w-[60vw] h-[60vw] orb animate-pulse-glow pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(232,148,60,0.08) 0%, transparent 70%)" }} />
      <div className="fixed bottom-[-15vh] right-[-10vw] w-[50vw] h-[50vw] orb pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(200,97,74,0.06) 0%, transparent 70%)" }} />

      {/* ══ NAV ══ */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${navScrolled ? "glass border-b border-white/6 py-3" : "py-5 bg-transparent"}`}
      >
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
          <span className="font-display font-bold text-xl tracking-widest uppercase">
            <span className="text-white/80">Мария</span>
            <span className="glow-gold"> · Пармастер</span>
          </span>
          <div className="hidden md:flex gap-1">
            {[["programs","Программы"],["reviews","Отзывы"],["tips","Чаевые"],["contact","Контакт"]].map(([id,lbl])=>(
              <button key={id} onClick={()=>scroll(id)} className="px-4 py-2 text-sm text-white/45 hover:text-[var(--gold)] transition-colors rounded-lg hover:bg-white/5">
                {lbl}
              </button>
            ))}
          </div>
          <button
            onClick={()=>scroll("programs")}
            className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105"
            style={{ background: "var(--gold)", color: "hsl(var(--primary-foreground))", boxShadow: "0 0 20px rgba(232,148,60,0.35)" }}
          >
            Записаться
          </button>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* bg image */}
        <div className="absolute inset-0">
          <img src={SMOKE_IMG} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 0%, hsl(var(--background)) 75%)" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--background))] via-transparent to-[hsl(var(--background))]" />
        </div>

        {/* steam */}
        <SteamLayer />

        {/* rotating ring */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-spin-slow opacity-10"
          style={{ width:"700px", height:"700px", border:"1px solid var(--gold)", borderRadius:"50%", borderStyle:"dashed" }} />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-6"
          style={{ width:"900px", height:"900px", border:"1px solid var(--gold)", borderRadius:"50%" }} />

        {/* content */}
        <div className="relative z-10 text-center px-5 max-w-5xl mx-auto animate-fade-in">
          <p className="font-script text-2xl md:text-3xl mb-3" style={{ color: "var(--gold)", opacity: 0.85 }}>Банная практика · Краснодар</p>

          <h1 className="font-display font-bold uppercase leading-[0.88] mb-6">
            <span className="block glow-gold" style={{ fontSize: "clamp(2rem,7vw,5.5rem)", letterSpacing:"0.04em", fontWeight:300 }}></span>
            <span className="block text-white" style={{ fontSize: "clamp(3rem,10vw,8rem)", letterSpacing:"-0.02em" }}>
              Пармастер
            </span>
            <span className="block glow-gold" style={{ fontSize: "clamp(3rem,10vw,8rem)", letterSpacing:"-0.02em" }}>
              Хилер
            </span>
            <span className="block text-white/30" style={{ fontSize: "clamp(3rem,10vw,8rem)", letterSpacing:"-0.02em" }}>
              Практик
            </span>
          </h1>

          <p className="text-white/50 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-10">
            Авторские программы парения · 8 ритуалов<br/>Живые веники, натуральные травы, мастерство
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Card3D>
              <button
                onClick={()=>scroll("programs")}
                className="px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-2 transition-colors"
                style={{ background:"var(--gold)", color:"hsl(var(--primary-foreground))", boxShadow:"0 0 40px rgba(232,148,60,0.4)" }}
              >
                Программы парения
                <Icon name="ArrowDown" size={20} />
              </button>
            </Card3D>
            <Card3D>
              <button
                onClick={()=>scroll("tips")}
                className="px-8 py-4 rounded-2xl font-bold text-lg text-white glass flex items-center gap-2"
                style={{ border:"1px solid rgba(232,148,60,0.3)" }}
              >
                <Icon name="Heart" size={20} />
                Чаевые мастеру
              </button>
            </Card3D>
          </div>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/25 animate-float">
          <Icon name="ChevronDown" size={28} />
        </div>
      </section>

      {/* ══ ПРОГРАММЫ ══ */}
      <section id="programs" className="relative py-24 px-5 max-w-6xl mx-auto">

        {/* section header */}
        <div className="text-center mb-16">
          <p className="font-script text-2xl mb-2" style={{ color:"var(--gold)" }}>8 вариантов</p>
          <h2 className="font-display font-bold uppercase text-white" style={{ fontSize:"clamp(2.5rem,6vw,5rem)", letterSpacing:"-0.02em" }}>
            Программы парения
          </h2>
          <div className="mt-4 h-px w-24 mx-auto" style={{ background:"linear-gradient(to right, transparent, var(--gold), transparent)" }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROGRAMS.map((p, i) => (
            <Card3D
              key={p.id}
              className="rounded-2xl border border-white/6 cursor-pointer animate-slide-up overflow-hidden"
              style={{ animationDelay:`${i*0.08}s`, background:"hsl(var(--card))" }}
            >
              <div onClick={()=>setSelected(p)} className="h-full flex flex-col">
                {/* program image */}
                <div className="relative h-44 overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0" style={{ background:"linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, hsl(var(--card)) 100%)" }} />
                  {/* badge over image */}
                  {p.badge && (
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm"
                        style={{ background:"rgba(232,148,60,0.85)", color:"hsl(var(--primary-foreground))" }}>
                        {p.badge}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3 text-2xl">{p.emoji}</div>
                  {/* duration pill */}
                  <div className="absolute bottom-3 left-3">
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                      style={{ background:"rgba(0,0,0,0.55)", color:"rgba(255,255,255,0.75)" }}>
                      <Icon name="Clock" size={11} /> {p.duration}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display font-semibold text-xl text-white mb-2">{p.name}</h3>
                  <p className="text-white/45 text-sm leading-relaxed flex-1 mb-4">{p.short}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/6">
                    <span className="font-display font-bold text-2xl text-white">{p.price.toLocaleString()} ₽</span>
                    <span className="text-sm font-medium flex items-center gap-1" style={{ color:"var(--gold)" }}>
                      Подробнее <Icon name="ArrowRight" size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </Card3D>
          ))}
        </div>

        <p className="text-center text-white/25 text-xs mt-8">
          Рассчитано на одного · Необходима предварительная запись · Оплачивается отдельно от билета
        </p>
      </section>

      {/* ══ МАСТЕР ══ */}
      <section className="py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <Card3D
            className="rounded-3xl overflow-hidden border border-white/6"
            style={{ background:"hsl(var(--card))" }}
          >
            <div className="grid md:grid-cols-2">
              <div className="relative h-96 md:h-auto overflow-hidden">
                <img src={MASTER_IMG} alt="Мария — пармастер" className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0" style={{ background:"linear-gradient(to right, transparent 55%, hsl(var(--card))), linear-gradient(to top, hsl(var(--card)) 0%, transparent 30%)" }} />
                <div className="absolute bottom-5 left-5 px-4 py-2 rounded-xl glass border border-white/10">
                  <span className="font-script text-xl" style={{ color:"var(--gold)" }}>Мастер живого пара</span>
                </div>
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <p className="font-script text-2xl mb-1" style={{ color:"var(--gold)" }}>Ваш пармастер</p>
                <h3 className="font-display font-bold uppercase leading-none mb-2">
                  <span className="block text-white text-5xl">Мария</span>
                  <span className="block glow-gold text-3xl font-light tracking-widest">пармастер  · Хилер · Практик</span>
                </h3>
                <div className="h-px w-16 my-4" style={{ background:"linear-gradient(to right, var(--gold), transparent)" }} />
                <p className="text-white/55 leading-relaxed mb-7 text-sm">
                  Мария — практик живого пара с глубоким пониманием тела и природы. Каждое парение — это индивидуальный ритуал: она чувствует состояние гостя, подбирает веники, травы и температуру так, чтобы тело раскрылось и восстановилось. Приходит не просто банный мастер, а хилер, который работает руками, сердцем и знанием.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[["7+","лет практики"],["3 000+","гостей"],["5.0★","рейтинг"]].map(([v,l])=>(
                    <div key={l} className="glass rounded-xl p-3 text-center border border-white/5">
                      <div className="font-display font-bold text-xl glow-gold">{v}</div>
                      <div className="text-white/35 text-xs mt-1">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card3D>
        </div>
      </section>

      {/* ══ ОТЗЫВЫ ══ */}
      <section id="reviews" className="py-20 px-5 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-script text-2xl mb-2" style={{ color:"var(--gold)" }}>Голос гостей</p>
          <h2 className="font-display font-bold uppercase text-white" style={{ fontSize:"clamp(2.5rem,6vw,4.5rem)", letterSpacing:"-0.02em" }}>
            Отзывы
          </h2>
          <div className="mt-4 h-px w-24 mx-auto" style={{ background:"linear-gradient(to right, transparent, var(--gold), transparent)" }} />
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {reviews.map((r, i)=>(
            <Card3D key={r.id}
              className="rounded-2xl border border-white/6 p-5 animate-slide-up"
              style={{ animationDelay:`${i*0.1}s`, background:"hsl(var(--card))" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                  style={{ background:"var(--gold)", color:"hsl(var(--primary-foreground))" }}>
                  {r.name[0]}
                </div>
                <div>
                  <div className="text-white font-medium text-sm">{r.name}</div>
                  <div className="text-white/30 text-xs">{r.date}</div>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {Array.from({length:5}).map((_,j)=>(
                  <Icon key={j} name="Star" size={14} className={j < r.rating ? "" : "text-white/15"}
                    style={j < r.rating ? { color:"var(--gold)" } : {}} />
                ))}
              </div>
              <p className="text-white/50 text-sm leading-relaxed">{r.text}</p>
            </Card3D>
          ))}
        </div>

        {/* form */}
        <Card3D className="rounded-2xl border border-white/6 p-6 md:p-8 max-w-2xl mx-auto"
          style={{ background:"hsl(var(--card))" }}>
          <h3 className="font-display font-semibold text-2xl text-white mb-5 uppercase">Оставить отзыв</h3>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-white/40 text-sm">Оценка:</span>
            {Array.from({length:5}).map((_,i)=>(
              <button key={i} onClick={()=>setRevRating(i+1)} className="transition-transform hover:scale-125">
                <Icon name="Star" size={28} style={i < revRating ? { color:"var(--gold)" } : { color:"rgba(255,255,255,0.15)" }} />
              </button>
            ))}
          </div>
          <input value={revName} onChange={e=>setRevName(e.target.value)} placeholder="Ваше имя"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none transition-colors mb-3"
            style={{ ["--tw-ring-color" as string]:"var(--gold)" }}
            onFocus={e=>(e.target.style.borderColor="var(--gold)")}
            onBlur={e=>(e.target.style.borderColor="")}
          />
          <textarea value={revText} onChange={e=>setRevText(e.target.value)} placeholder="Поделитесь впечатлениями..." rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none resize-none mb-4 transition-colors"
            onFocus={e=>(e.target.style.borderColor="var(--gold)")}
            onBlur={e=>(e.target.style.borderColor="")}
          />
          <button onClick={submitReview}
            className="w-full py-3.5 rounded-xl font-bold text-base transition-all hover:scale-[1.02]"
            style={{ background:"var(--gold)", color:"hsl(var(--primary-foreground))", boxShadow:"0 0 20px rgba(232,148,60,0.25)" }}>
            Опубликовать отзыв
          </button>
        </Card3D>
      </section>

      {/* ══ ЧАЕВЫЕ ══ */}
      <section id="tips" className="py-20 px-5 relative overflow-hidden">
        {/* decorative ring behind */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-5 animate-spin-slow"
          style={{ width:"600px", height:"600px", border:"1px dashed var(--gold)", borderRadius:"50%" }} />

        <div className="max-w-xl mx-auto text-center relative z-10">
          <div className="text-6xl mb-5 animate-float">🙏</div>
          <h2 className="font-display font-bold uppercase text-white mb-2" style={{ fontSize:"clamp(2.2rem,6vw,4.5rem)", letterSpacing:"-0.02em" }}>
            Чаевые мастеру
          </h2>
          <p className="text-white/45 mb-10 text-lg">
            Понравилось парение? Поблагодарите мастера — это лучшая энергия для продолжения практики.
          </p>

          <Card3D className="glass-gold rounded-3xl p-7 md:p-9">
            <div className="grid grid-cols-2 gap-3 mb-4">
              {TIP_OPTIONS.map(amount=>(
                <button key={amount} onClick={()=>{ setTip(amount); setCustomTip(""); }}
                  className="py-5 rounded-2xl font-display font-bold text-2xl transition-all hover:scale-105"
                  style={tip===amount
                    ? { background:"var(--gold)", color:"hsl(var(--primary-foreground))", boxShadow:"0 0 25px rgba(232,148,60,0.4)" }
                    : { background:"rgba(255,255,255,0.04)", color:"white", border:"1px solid rgba(255,255,255,0.08)" }
                  }>
                  {amount} ₽
                </button>
              ))}
            </div>
            <input value={customTip} onChange={e=>{ setCustomTip(e.target.value.replace(/\D/g,"")); setTip(null); }}
              placeholder="Своя сумма, ₽" inputMode="numeric"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white text-center text-lg placeholder-white/25 focus:outline-none mb-4 transition-colors"
              onFocus={e=>(e.target.style.borderColor="var(--gold)")}
              onBlur={e=>(e.target.style.borderColor="")}
            />

            {/* реквизиты Сбербанк */}
            <div className="rounded-2xl p-4 mb-4 text-center" style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(232,148,60,0.2)" }}>
              <div className="text-white/40 text-xs mb-2 uppercase tracking-widest">Перевод по номеру карты · Сбербанк</div>
              <div
                className="font-display font-bold text-2xl tracking-widest text-white mb-1 cursor-pointer select-all"
                style={{ letterSpacing:"0.12em" }}
                onClick={() => { navigator.clipboard.writeText("2202208025878902"); toast({ title:"Скопировано! ✓", description:"Номер карты скопирован" }); }}
              >
                2202 2080 2587 8902
              </div>
              <div className="text-white/35 text-xs">Нажмите на номер — скопируется автоматически</div>
            </div>

            {/* кнопки перевода */}
            <div className="flex flex-col gap-3">
              <a
                href={`https://www.sberbank.com/ru/person/dl/jc?action=transfer&trnsum=${tip ?? (customTip || 300)}&trncard=2202208025878902`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                style={{ background:"var(--gold)", color:"hsl(var(--primary-foreground))", boxShadow:"0 0 40px rgba(232,148,60,0.35)" }}
              >
                <Icon name="Heart" size={22} />
                Поблагодарить · Сбербанк
              </a>

              {/* СБП */}
              <a
                href={`https://qr.nspk.ru/AS10004RV4OLJ3E5IT40BTMQTCTQK33J?type=01&bank=100000000111&sum=${(tip ?? Number(customTip) || 300) * 100}&cur=RUB&crc=6B7A`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] glass border border-white/10 text-white hover:border-[var(--gold)]"
              >
                <span className="text-xl">⚡</span>
                Перевести через СБП
              </a>
            </div>
            <p className="text-white/25 text-xs text-center mt-3">
              СБП — мгновенный перевод через любой банк по номеру телефона
            </p>
          </Card3D>
        </div>
      </section>

      {/* ══ ПЕЧАТНАЯ КАРТОЧКА ══ */}
      <section className="py-20 px-5">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-script text-2xl mb-2" style={{ color:"var(--gold)" }}>Для гостей</p>
            <h2 className="font-display font-bold uppercase text-white" style={{ fontSize:"clamp(2rem,5vw,3.5rem)", letterSpacing:"-0.02em" }}>
              Печатная карточка
            </h2>
            <p className="text-white/40 text-sm mt-3">
              Нажмите «Скачать» — получите готовую карточку для печати и размещения в бане
            </p>
          </div>

          {/* превью карточки */}
          <Card3D className="rounded-3xl overflow-hidden border border-white/10 mb-6" style={{ background:"hsl(var(--card))" }}>
            {/* собственно карточка — то, что будет распечатано */}
            <div
              id="print-card"
              style={{
                background: "linear-gradient(145deg, #1a0d05 0%, #2a1508 40%, #1a0d05 100%)",
                padding: "40px 36px 36px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* декоративные кольца */}
              <div style={{ position:"absolute", top:"-60px", right:"-60px", width:"220px", height:"220px", border:"1px dashed rgba(232,148,60,0.2)", borderRadius:"50%" }} />
              <div style={{ position:"absolute", top:"-30px", right:"-30px", width:"150px", height:"150px", border:"1px solid rgba(232,148,60,0.1)", borderRadius:"50%" }} />
              <div style={{ position:"absolute", bottom:"-40px", left:"-40px", width:"180px", height:"180px", border:"1px dashed rgba(232,148,60,0.15)", borderRadius:"50%" }} />

              {/* верхняя строка */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"28px" }}>
                <div>
                  <div style={{ fontFamily:"Oswald,sans-serif", fontWeight:300, fontSize:"13px", letterSpacing:"0.2em", color:"rgba(232,148,60,0.7)", textTransform:"uppercase", marginBottom:"4px" }}>
                    Пармастер · Хилер · Практик
                  </div>
                  <div style={{ fontFamily:"Oswald,sans-serif", fontWeight:700, fontSize:"36px", color:"#fff", letterSpacing:"-0.02em", lineHeight:1 }}>
                    МАРИЯ
                  </div>
                </div>
                {/* фото мастера */}
                <div style={{ width:"72px", height:"72px", borderRadius:"50%", overflow:"hidden", border:"2px solid rgba(232,148,60,0.5)", flexShrink:0 }}>
                  <img src={MASTER_IMG} alt="Мария" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top" }} />
                </div>
              </div>

              {/* разделитель */}
              <div style={{ height:"1px", background:"linear-gradient(to right, rgba(232,148,60,0.6), rgba(232,148,60,0.1), transparent)", marginBottom:"28px" }} />

              {/* основная часть: текст + QR */}
              <div style={{ display:"flex", alignItems:"center", gap:"28px" }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"Caveat,cursive", fontSize:"22px", color:"rgba(232,148,60,0.9)", lineHeight:1.3, marginBottom:"14px" }}>
                    Понравилось парение?
                  </div>
                  <div style={{ fontFamily:"Golos Text,sans-serif", fontSize:"14px", color:"rgba(255,255,255,0.6)", lineHeight:1.6, marginBottom:"18px" }}>
                    Оставьте отзыв или отблагодарите мастера чаевыми — отсканируйте QR-код.
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                    {[
                      { icon:"⭐", text:"Оставить отзыв" },
                      { icon:"🙏", text:"Отправить чаевые" },
                      { icon:"🌿", text:"Выбрать программу парения" },
                    ].map(item => (
                      <div key={item.text} style={{ display:"flex", alignItems:"center", gap:"8px", fontFamily:"Golos Text,sans-serif", fontSize:"13px", color:"rgba(255,255,255,0.5)" }}>
                        <span>{item.icon}</span>
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* QR */}
                <div style={{ flexShrink:0, display:"flex", flexDirection:"column", alignItems:"center", gap:"10px" }}>
                  <div style={{ background:"#fff", padding:"10px", borderRadius:"16px", boxShadow:"0 0 30px rgba(232,148,60,0.2)" }}>
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://da18a679-098e-494d-8de1-a558d89808d6.poehali.app&margin=2&color=1a0d05&bgcolor=ffffff"
                      alt="QR"
                      width={160}
                      height={160}
                      style={{ display:"block", borderRadius:"8px" }}
                    />
                  </div>
                  <div style={{ fontFamily:"Golos Text,sans-serif", fontSize:"10px", color:"rgba(255,255,255,0.25)", textAlign:"center" }}>
                    Наведите камеру
                  </div>
                </div>
              </div>

              {/* нижняя строка */}
              <div style={{ marginTop:"24px", paddingTop:"20px", borderTop:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div style={{ fontFamily:"Golos Text,sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.3)" }}>
                  📞 +7 (918) 686-06-50
                </div>
                <div style={{ fontFamily:"Golos Text,sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.3)" }}>
                  Любая баня Краснодара по запросу
                </div>
              </div>
            </div>
          </Card3D>

          {/* кнопки действий */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=https://da18a679-098e-494d-8de1-a558d89808d6.poehali.app&margin=6&color=1a0d05&bgcolor=ffffff"
              download="qr-maria-parmaster.png"
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-4 rounded-2xl font-bold text-center flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              style={{ background:"var(--gold)", color:"hsl(var(--primary-foreground))", boxShadow:"0 0 25px rgba(232,148,60,0.3)" }}
            >
              <Icon name="Download" size={18} />
              Скачать QR-код (PNG)
            </a>
            <button
              onClick={() => window.print()}
              className="flex-1 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 glass border border-white/10 text-white hover:border-[var(--gold)] transition-all"
            >
              <Icon name="Printer" size={18} />
              Распечатать карточку
            </button>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer id="contact" className="py-16 px-5 border-t border-white/5">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="font-display font-bold text-2xl uppercase mb-1">
              <span className="glow-gold">Мария</span>
            </div>
            <div className="font-display text-sm uppercase tracking-widest text-white/40 mb-3">Пармастер · Хилер · Практик</div>
            <p className="text-white/35 text-sm leading-relaxed">
              Авторские программы парения. Приезжаю в любую баню Краснодара по вашему запросу.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background:"rgba(232,148,60,0.1)", border:"1px solid rgba(232,148,60,0.2)" }}>
              <Icon name="MapPin" size={18} style={{ color:"var(--gold)" }} />
            </div>
            <div>
              <div className="text-white/35 text-xs mb-0.5">Адрес</div>
              <div className="text-white font-medium">Любая баня Краснодара</div>
              <div className="text-white/45 text-sm mt-1 leading-snug">
                Мария приедет к вам — выберите любую удобную баню в городе, и ритуал парения пройдёт там.
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background:"rgba(232,148,60,0.1)", border:"1px solid rgba(232,148,60,0.2)" }}>
              <Icon name="Phone" size={18} style={{ color:"var(--gold)" }} />
            </div>
            <div>
              <div className="text-white/35 text-xs mb-0.5">Запись</div>
              <a href="tel:+79186860650" className="text-white font-medium hover:text-[var(--gold)] transition-colors">
                +7 (918) 686-06-50
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto pt-6 border-t border-white/5 text-center text-white/20 text-xs">
          © 2026 Мария · Пармастер · Хилер · Практик · Краснодар
        </div>
      </footer>

      {/* ══ МОДАЛКА ПРОГРАММЫ ══ */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
          onClick={()=>setSelected(null)}>
          <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />
          <div
            className="relative w-full md:max-w-lg max-h-[88vh] overflow-y-auto rounded-t-3xl md:rounded-2xl border border-white/8 animate-slide-up"
            style={{ background:"hsl(var(--card))" }}
            onClick={e=>e.stopPropagation()}
          >
            {/* modal image */}
            <div className="relative h-52 overflow-hidden rounded-t-3xl md:rounded-t-2xl">
              <img src={selected.img} alt={selected.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background:"linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, hsl(var(--card)) 100%)" }} />
              <button onClick={()=>setSelected(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white transition-colors border border-white/10">
                <Icon name="X" size={18} />
              </button>
              {selected.badge && (
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background:"rgba(232,148,60,0.9)", color:"hsl(var(--primary-foreground))" }}>
                    {selected.badge}
                  </span>
                </div>
              )}
              <div className="absolute bottom-3 left-5 text-3xl">{selected.emoji}</div>
            </div>

            <div className="p-6">
            <h2 className="font-display font-bold text-3xl text-white mb-2">{selected.name}</h2>
            <p className="text-white/40 text-sm mb-5 flex items-center gap-1.5">
              <Icon name="Clock" size={14} /> Длительность: {selected.duration}
            </p>
            <p className="text-white/60 leading-relaxed mb-6 text-sm">{selected.full}</p>
            <div className="rounded-xl p-4 mb-6 text-xs text-white/35 leading-relaxed space-y-1"
              style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.05)" }}>
              <p>• Парение рассчитано на одного человека</p>
              <p>• Необходима предварительная запись</p>
              <p>• Не входит в стоимость билета</p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/6">
              <span className="font-display font-bold text-3xl text-white">{selected.price.toLocaleString()} ₽</span>
              <a href="tel:+79186860650"
                className="px-7 py-3.5 rounded-xl font-bold transition-all hover:scale-105 flex items-center gap-2"
                style={{ background:"var(--gold)", color:"hsl(var(--primary-foreground))", boxShadow:"0 0 25px rgba(232,148,60,0.35)" }}>
                <Icon name="Phone" size={16} />
                Записаться
              </a>
            </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}