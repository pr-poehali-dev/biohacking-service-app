import { useState } from "react";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const HERO_IMG = "https://cdn.poehali.dev/projects/bd9db7a1-9034-49dd-9531-cd77933f55b3/files/224c221f-f9c1-474b-8796-99606cc638ca.jpg";
const MASTER_IMG = "https://cdn.poehali.dev/projects/bd9db7a1-9034-49dd-9531-cd77933f55b3/files/13e1e8ee-1d8e-4cdd-afa7-3ee82fb4d022.jpg";

const PROGRAMS = [
  {
    id: 1,
    name: "Фирменный пар",
    duration: "50 мин",
    price: 6200,
    badge: "Премиум",
    short: "Согревающее парение в два захода с тёплыми припарками, ароматерапия луговыми травами, медово-соляное скрабирование и помывка берёзовым веником.",
    full: "Эта программа перенесёт вас на новый уровень блаженства, для настоящих ценителей! Согревающее парение с тёплыми припарками в два захода, ароматерапия луговыми травами, медово-соляное скрабирование и помывка берёзовым веником, либо лыковым мочалом.",
  },
  {
    id: 2,
    name: "Цитрусовое парение",
    duration: "35 мин",
    price: 3900,
    badge: null,
    short: "Будоражащее сознание сочетание прохладной пихты и сочного цитруса, могучий дуб для тела и завершающий пилинг сочным цитрусом.",
    full: "Приготовьтесь к будоражащему ваше сознание сочетанию прохладной пихты и сочного цитруса, а могучий дуб не оставит ваше тело равнодушным. В завершение процедуры лёгкий пилинг сочным цитрусом дополнит ваш купаж впечатлений ощущением наполненности и настоящего расслабления.",
  },
  {
    id: 3,
    name: "Бодрящее парение",
    duration: "35 мин",
    price: 3700,
    badge: "Хит",
    short: "Авторская программа с хвойным букетом живой пихты — путешествие в прохладу северной тайги, мощный прилив сил и оздоровление дыхательных путей.",
    full: "Авторская программа «Бодрящее парение» создана для тех, кто хочет сбросить груз повседневных забот и почувствовать мощный прилив сил. Главную роль играет хвойный букет: аромат живой пихты переносит в прохладу северной тайги, очищая мысли. Включает парение всего тела, ароматерапию ледяной пихтой, выход на контраст, чаепитие и догрев. Оздоровление дыхательных путей, улучшение состояния кожи, снятие стресса и повышение жизненного тонуса.",
  },
  {
    id: 4,
    name: "Знахарь",
    duration: "20 мин",
    price: 3200,
    badge: null,
    short: "Эвкалипт — лучший помощник для иммунитета! Парение всего тела, ингаляция эвкалиптом, прогрев ног в настое эвкалипта.",
    full: "Эвкалипт — лучший помощник для иммунитета! Насладитесь его благоуханием под звонкий шелест дуба. Парение всего тела, ингаляция эвкалиптом, прогрев ног в настое эвкалипта.",
  },
  {
    id: 5,
    name: "Традиционное парение",
    duration: "25 мин",
    price: 3200,
    badge: null,
    short: "Тёплый пар и нежная берёза окутывают тело. Лёгкий прогрев дубовыми вениками всего тела и банная помывка берёзой.",
    full: "Тёплый пар и нежная берёза окутывает ваше тело. Очищение тела и свобода мыслей. Лёгкий прогрев дубовыми вениками всего тела и банная помывка берёзой.",
  },
  {
    id: 6,
    name: "Парение дубовыми вениками",
    duration: "15 мин",
    price: 2500,
    badge: "Классика",
    short: "Тёплое парение каждой группы мышц всего тела с холодной пихтой на голове. Старая добрая классика.",
    full: "Тёплое парение каждой группы мышц всего тела с холодной пихтой на голове, старая добрая классика.",
  },
  {
    id: 7,
    name: "Мёд и травы",
    duration: "20 мин",
    price: 2800,
    badge: null,
    short: "Глубокое парение, ароматерапия луговыми травами и скрабирование натуральным мёдом — кожа становится бархатистой и напитанной.",
    full: "Уникальное сочетание традиций и природной силы. Глубокое парение подготавливает тело, в воздухе разливается благоухание луговых трав, а тёплый мёд создаёт атмосферу комфорта. Скрабирование натуральным мёдом удаляет ороговевшие клетки, делая кожу бархатистой и напитанной. Очищение и детокс, уход за кожей, релакс и укрепление иммунитета.",
  },
  {
    id: 8,
    name: "Детское парение",
    duration: "10 мин",
    price: 1200,
    badge: "До 12 лет",
    short: "Мягкий и лёгкий ритуал для детей: лёгкое парение дубовым и пихтовым вениками, ароматерапия и забота опытного пармастера.",
    full: "Специальный мягкий ритуал для детей до 12 лет. Опытный пармастер бережно проведёт ребёнка в мир аромата и тепла. Лёгкое парение вениками (дубовым и пихтовым) безопасно для детей, ароматерапия и расслабление в парной зоне. Активизирует кровообращение, укрепляет иммунитет, улучшает сон и общий тонус организма.",
  },
];

const INITIAL_REVIEWS = [
  { id: 1, name: "Алексей", rating: 5, text: "Фирменный пар — это что-то невероятное! Вышел будто заново родился. Мастер — золотые руки.", date: "12 июня" },
  { id: 2, name: "Марина", rating: 5, text: "Брала цитрусовое парение, аромат держался ещё пару дней. Кожа мягкая, настроение на высоте.", date: "8 июня" },
  { id: 3, name: "Дмитрий", rating: 5, text: "Хожу на бодрящее парение каждую неделю. Лучшая перезагрузка после рабочих будней.", date: "3 июня" },
];

const TIP_OPTIONS = [300, 500, 1000, 2000];

export default function Index() {
  const { toast } = useToast();
  const [selected, setSelected] = useState<(typeof PROGRAMS)[0] | null>(null);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [revName, setRevName] = useState("");
  const [revText, setRevText] = useState("");
  const [revRating, setRevRating] = useState(5);
  const [tip, setTip] = useState<number | null>(null);
  const [customTip, setCustomTip] = useState("");

  const submitReview = () => {
    if (!revName.trim() || !revText.trim()) {
      toast({ title: "Заполните имя и отзыв", variant: "destructive" });
      return;
    }
    setReviews([
      { id: Date.now(), name: revName, rating: revRating, text: revText, date: "сегодня" },
      ...reviews,
    ]);
    setRevName("");
    setRevText("");
    setRevRating(5);
    toast({ title: "Спасибо за отзыв! 🌿", description: "Ваш отзыв опубликован" });
  };

  const sendTip = () => {
    const amount = tip ?? Number(customTip);
    if (!amount || amount < 1) {
      toast({ title: "Выберите сумму чаевых", variant: "destructive" });
      return;
    }
    toast({ title: `Спасибо за чаевые ${amount.toLocaleString()} ₽! 🙏`, description: "Пармастер благодарит вас" });
    setTip(null);
    setCustomTip("");
  };

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-background ember-bg relative overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("top")} className="font-display font-bold text-lg uppercase tracking-wide">
            <span className="text-white">Парм</span>
            <span style={{ color: "hsl(var(--amber))" }}>астер</span>
          </button>
          <div className="hidden md:flex items-center gap-1">
            {[
              { id: "programs", label: "Программы" },
              { id: "reviews", label: "Отзывы" },
              { id: "tips", label: "Чаевые" },
              { id: "contact", label: "Контакты" },
            ].map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white/55 hover:text-[hsl(var(--amber))] transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollTo("programs")}
            className="px-4 py-2 rounded-lg text-sm font-bold text-[hsl(var(--primary-foreground))]"
            style={{ background: "hsl(var(--amber))" }}
          >
            Записаться
          </button>
        </div>
      </nav>

      {/* HERO */}
      <header id="top" className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Парение" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-2xl animate-fade-in">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6 border"
              style={{ borderColor: "rgba(228,150,60,0.35)", color: "hsl(var(--amber))", background: "rgba(228,150,60,0.07)" }}
            >
              <Icon name="MapPin" size={13} />
              Termoland · Краснодар
            </div>
            <h1 className="font-display font-bold text-5xl md:text-7xl uppercase leading-[0.95] mb-6 text-white">
              Искусство
              <br />
              <span className="glow-text" style={{ color: "hsl(var(--amber))" }}>живого пара</span>
            </h1>
            <p className="font-script text-2xl md:text-3xl text-white/70 mb-3">
              Авторские программы парения
            </p>
            <p className="text-white/55 text-lg leading-relaxed mb-8 max-w-lg">
              8 уникальных ритуалов: от бодрящей хвои до медового скрабирования. Дубовые и берёзовые веники, луговые травы, забота мастера.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo("programs")}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-[hsl(var(--primary-foreground))] transition-all hover:scale-105"
                style={{ background: "hsl(var(--amber))", boxShadow: "0 0 30px rgba(228,150,60,0.3)" }}
              >
                Выбрать программу
                <Icon name="ArrowDown" size={18} />
              </button>
              <button
                onClick={() => scrollTo("tips")}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-white glass border border-white/10 hover:border-[hsl(var(--amber))] transition-all"
              >
                <Icon name="Heart" size={18} />
                Чаевые мастеру
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/30 animate-float">
          <Icon name="ChevronDown" size={26} />
        </div>
      </header>

      {/* PROGRAMS */}
      <section id="programs" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="font-script text-2xl mb-2" style={{ color: "hsl(var(--amber))" }}>8 вариантов парения</div>
          <h2 className="font-display font-bold text-4xl md:text-5xl uppercase text-white">Программы</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROGRAMS.map((p, i) => (
            <div
              key={p.id}
              className="rounded-2xl border border-white/5 p-6 hover-glow cursor-pointer animate-slide-up flex flex-col"
              style={{ animationDelay: `${i * 0.06}s`, background: "hsl(var(--card))" }}
              onClick={() => setSelected(p)}
            >
              <div className="flex items-start justify-between mb-3 gap-3">
                <h3 className="font-display font-semibold text-2xl text-white">{p.name}</h3>
                {p.badge && (
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold shrink-0"
                    style={{ background: "rgba(228,150,60,0.12)", color: "hsl(var(--amber))" }}
                  >
                    {p.badge}
                  </span>
                )}
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-5 flex-1">{p.short}</p>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-white/45 text-sm">
                  <Icon name="Clock" size={15} />
                  {p.duration}
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-display font-bold text-2xl text-white">{p.price.toLocaleString()} ₽</span>
                  <span className="text-[hsl(var(--amber))] text-sm font-medium flex items-center gap-1">
                    Подробнее <Icon name="ArrowRight" size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-white/30 text-sm mt-8">
          Парение рассчитано на одного человека · Необходима предварительная запись · Не входит в стоимость билета
        </p>
      </section>

      {/* MASTER */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto glass rounded-3xl border border-white/5 overflow-hidden grid md:grid-cols-2">
          <div className="h-72 md:h-auto">
            <img src={MASTER_IMG} alt="Пармастер" className="w-full h-full object-cover" />
          </div>
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <div className="font-script text-2xl mb-1" style={{ color: "hsl(var(--amber))" }}>Ваш пармастер</div>
            <h3 className="font-display font-bold text-3xl text-white mb-4 uppercase">Мастер живого пара</h3>
            <p className="text-white/55 leading-relaxed mb-6">
              Более 10 лет искусства парения. Чувствую тело, температуру и настроение каждого гостя. Использую только натуральные веники, травы и масла — никакой суеты, только глубокий релакс и забота.
            </p>
            <div className="flex gap-6">
              {[
                { v: "10+", l: "лет опыта" },
                { v: "5 000+", l: "гостей" },
                { v: "4.9", l: "рейтинг" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display font-bold text-2xl" style={{ color: "hsl(var(--amber))" }}>{s.v}</div>
                  <div className="text-white/40 text-xs">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="font-script text-2xl mb-2" style={{ color: "hsl(var(--amber))" }}>Что говорят гости</div>
          <h2 className="font-display font-bold text-4xl md:text-5xl uppercase text-white">Отзывы</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {reviews.map((r) => (
            <div key={r.id} className="rounded-2xl border border-white/5 p-5 animate-fade-in" style={{ background: "hsl(var(--card))" }}>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-[hsl(var(--primary-foreground))]"
                  style={{ background: "hsl(var(--amber))" }}
                >
                  {r.name[0]}
                </div>
                <div>
                  <div className="text-white font-medium text-sm">{r.name}</div>
                  <div className="text-white/35 text-xs">{r.date}</div>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="Star" size={14} className={i < r.rating ? "text-[hsl(var(--amber))]" : "text-white/15"} />
                ))}
              </div>
              <p className="text-white/55 text-sm leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>

        {/* Review form */}
        <div className="glass rounded-2xl border border-white/5 p-6 md:p-8 max-w-2xl mx-auto">
          <h3 className="font-display font-semibold text-xl text-white mb-5">Оставить отзыв</h3>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-white/45 text-sm mr-2">Оценка:</span>
            {Array.from({ length: 5 }).map((_, i) => (
              <button key={i} onClick={() => setRevRating(i + 1)} className="transition-transform hover:scale-125">
                <Icon name="Star" size={26} className={i < revRating ? "text-[hsl(var(--amber))]" : "text-white/20"} />
              </button>
            ))}
          </div>
          <input
            value={revName}
            onChange={(e) => setRevName(e.target.value)}
            placeholder="Ваше имя"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[hsl(var(--amber))] transition-colors mb-3"
          />
          <textarea
            value={revText}
            onChange={(e) => setRevText(e.target.value)}
            placeholder="Поделитесь впечатлениями о парении..."
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[hsl(var(--amber))] transition-colors resize-none mb-4"
          />
          <button
            onClick={submitReview}
            className="w-full py-3.5 rounded-xl font-bold text-[hsl(var(--primary-foreground))] transition-all hover:scale-[1.02]"
            style={{ background: "hsl(var(--amber))" }}
          >
            Опубликовать отзыв
          </button>
        </div>
      </section>

      {/* TIPS */}
      <section id="tips" className="py-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-5xl mb-4">🙏</div>
          <h2 className="font-display font-bold text-4xl md:text-5xl uppercase text-white mb-3">Чаевые мастеру</h2>
          <p className="text-white/50 mb-8">
            Понравилось парение? Поблагодарите пармастера — это лучшая мотивация дарить тепло и заботу.
          </p>

          <div className="glass rounded-2xl border border-white/5 p-6 md:p-8">
            <div className="grid grid-cols-4 gap-3 mb-4">
              {TIP_OPTIONS.map((amount) => (
                <button
                  key={amount}
                  onClick={() => { setTip(amount); setCustomTip(""); }}
                  className={`py-4 rounded-xl font-display font-bold text-lg transition-all ${
                    tip === amount ? "text-[hsl(var(--primary-foreground))] scale-105" : "text-white bg-white/5 hover:bg-white/10"
                  }`}
                  style={tip === amount ? { background: "hsl(var(--amber))" } : {}}
                >
                  {amount} ₽
                </button>
              ))}
            </div>
            <input
              value={customTip}
              onChange={(e) => { setCustomTip(e.target.value.replace(/\D/g, "")); setTip(null); }}
              placeholder="Своя сумма, ₽"
              inputMode="numeric"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-center placeholder-white/30 focus:outline-none focus:border-[hsl(var(--amber))] transition-colors mb-4"
            />
            <button
              onClick={sendTip}
              className="w-full py-4 rounded-xl font-bold text-[hsl(var(--primary-foreground))] text-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              style={{ background: "hsl(var(--amber))", boxShadow: "0 0 30px rgba(228,150,60,0.3)" }}
            >
              <Icon name="Heart" size={20} />
              Поблагодарить мастера
            </button>
          </div>
        </div>
      </section>

      {/* CONTACT / FOOTER */}
      <footer id="contact" className="py-16 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <div className="font-display font-bold text-xl uppercase mb-3">
              <span className="text-white">Парм</span>
              <span style={{ color: "hsl(var(--amber))" }}>астер</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Авторские программы парения в термальном комплексе Termoland Краснодар.
            </p>
          </div>
          {[
            { icon: "MapPin", label: "Адрес", value: "Termoland, Краснодар" },
            { icon: "Phone", label: "Запись", value: "+7 (861) 000-00-00" },
          ].map((c) => (
            <div key={c.label} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(228,150,60,0.1)" }}>
                <Icon name={c.icon as "MapPin"} size={18} className="text-[hsl(var(--amber))]" />
              </div>
              <div>
                <div className="text-white/40 text-xs">{c.label}</div>
                <div className="text-white font-medium">{c.value}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-5xl mx-auto mt-10 pt-6 border-t border-white/5 text-center text-white/25 text-xs">
          © 2026 Пармастер · Termoland Краснодар · Сделано с теплом
        </div>
      </footer>

      {/* PROGRAM MODAL */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="relative w-full md:max-w-lg max-h-[88vh] overflow-y-auto rounded-t-3xl md:rounded-2xl border border-white/5 p-7 animate-slide-up"
            style={{ background: "hsl(var(--card))" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-xl glass flex items-center justify-center text-white/60 hover:text-white"
            >
              <Icon name="X" size={18} />
            </button>
            {selected.badge && (
              <span className="px-3 py-1 rounded-full text-xs font-bold inline-block mb-3" style={{ background: "rgba(228,150,60,0.12)", color: "hsl(var(--amber))" }}>
                {selected.badge}
              </span>
            )}
            <h2 className="font-display font-bold text-3xl text-white mb-3 pr-10">{selected.name}</h2>
            <div className="flex items-center gap-2 text-white/45 text-sm mb-5">
              <Icon name="Clock" size={15} />
              Длительность: {selected.duration}
            </div>
            <p className="text-white/60 leading-relaxed mb-6">{selected.full}</p>
            <div className="rounded-xl p-4 mb-6 text-sm text-white/45 leading-relaxed" style={{ background: "rgba(255,255,255,0.03)" }}>
              <p>• Парение рассчитано на одного человека.</p>
              <p>• Необходима предварительная запись.</p>
              <p>• Не входит в стоимость билета, оплачивается отдельно.</p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <span className="font-display font-bold text-3xl text-white">{selected.price.toLocaleString()} ₽</span>
              <button
                onClick={() => { toast({ title: "Заявка принята 🌿", description: `${selected.name} — с вами свяжутся для записи` }); setSelected(null); }}
                className="px-7 py-3.5 rounded-xl font-bold text-[hsl(var(--primary-foreground))] transition-all hover:scale-105"
                style={{ background: "hsl(var(--amber))", boxShadow: "0 0 20px rgba(228,150,60,0.35)" }}
              >
                Записаться
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
