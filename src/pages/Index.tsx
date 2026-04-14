import { useState } from "react";
import Icon from "@/components/ui/icon";

const SERVICES = [
  {
    id: 1,
    name: "Криокапсула",
    emoji: "❄️",
    tagline: "Сброс до заводских настроек",
    description: "3 минуты при −140°C запускают каскад восстановительных реакций. Уходит воспаление, боль, усталость. Тело выходит обновлённым.",
    benefits: ["Снятие воспаления", "Ускорение восстановления", "Выброс эндорфинов", "Улучшение сна"],
    duration: "3 мин",
    price: 2500,
    image: "https://cdn.poehali.dev/projects/bd9db7a1-9034-49dd-9531-cd77933f55b3/files/b65289a8-c81b-4290-902a-8bfa68989027.jpg",
    color: "from-blue-900/40 to-cyan-900/20",
    accent: "#00E6DC",
  },
  {
    id: 2,
    name: "Парение в бане",
    emoji: "🌿",
    tagline: "Древний биохак. Работает.",
    description: "Берёзовый веник, печь на дровах, правильный пар. Глубокая детоксикация, расслабление мышц, перезагрузка нервной системы.",
    benefits: ["Детоксикация", "Расслабление мышц", "Очищение кожи", "Антистресс"],
    duration: "60 мин",
    price: 3500,
    image: "https://cdn.poehali.dev/projects/bd9db7a1-9034-49dd-9531-cd77933f55b3/files/da49b1e8-d2aa-4112-bf48-ce699f97f789.jpg",
    color: "from-orange-900/30 to-amber-900/20",
    accent: "#F59E0B",
  },
  {
    id: 3,
    name: "Массаж",
    emoji: "🤲",
    tagline: "Умные руки — умное тело",
    description: "Глубокотканный массаж от специалиста с медицинским образованием. Работа с триггерными точками, восстановление подвижности суставов.",
    benefits: ["Снятие зажимов", "Улучшение циркуляции", "Работа с триггерами", "Восстановление"],
    duration: "60 мин",
    price: 4500,
    image: "https://cdn.poehali.dev/projects/bd9db7a1-9034-49dd-9531-cd77933f55b3/files/8351ea4d-ca30-4ae0-95f2-d1a5eb987699.jpg",
    color: "from-purple-900/30 to-violet-900/20",
    accent: "#A78BFA",
  },
  {
    id: 4,
    name: "Капельница",
    emoji: "💧",
    tagline: "Прямо в кровь. Никаких потерь.",
    description: "100% биодоступность витаминов и нутриентов. Индивидуальные составы: энергия, иммунитет, антиоксиданты, восстановление после нагрузок.",
    benefits: ["100% усвоение", "Быстрый эффект", "Индивидуальный состав", "Иммунитет"],
    duration: "45 мин",
    price: 6000,
    image: "https://cdn.poehali.dev/projects/bd9db7a1-9034-49dd-9531-cd77933f55b3/files/062991f0-346a-426d-a7cf-97d11ebf6f9d.jpg",
    color: "from-cyan-900/30 to-teal-900/20",
    accent: "#06B6D4",
  },
  {
    id: 5,
    name: "Хот-пилатес",
    emoji: "🔥",
    tagline: "Гибкость × Сила × Жара",
    description: "Пилатес при 38°C. Мышцы прогреваются глубже, гибкость растёт в разы быстрее, жиросжигание усиливается. Тело меняется после первого сеанса.",
    benefits: ["Глубокая проработка", "Жиросжигание", "+300% к гибкости", "Детокс через пот"],
    duration: "50 мин",
    price: 2800,
    image: "https://cdn.poehali.dev/projects/bd9db7a1-9034-49dd-9531-cd77933f55b3/files/f9f03296-57ab-44bb-9b55-008108b1dcab.jpg",
    color: "from-red-900/30 to-orange-900/20",
    accent: "#F97316",
  },
  {
    id: 6,
    name: "Медитация на природе",
    emoji: "🌲",
    tagline: "Перезагрузка для разума",
    description: "Практики осознанности в лесу под руководством инструктора. Снижение кортизола, активация парасимпатики, выход из хронического стресса.",
    benefits: ["Снижение кортизола", "Ясность ума", "Выход из стресса", "Энергия"],
    duration: "90 мин",
    price: 3000,
    image: "https://cdn.poehali.dev/projects/bd9db7a1-9034-49dd-9531-cd77933f55b3/files/dea1b7a5-3af0-4743-8161-17d3afadb0a5.jpg",
    color: "from-green-900/30 to-emerald-900/20",
    accent: "#34D399",
  },
];

type Section = "catalog" | "about" | "contacts" | "profile";

export default function Index() {
  const [cart, setCart] = useState<typeof SERVICES>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("catalog");
  const [selectedService, setSelectedService] = useState<(typeof SERVICES)[0] | null>(null);
  const [profileTab, setProfileTab] = useState<"orders" | "settings">("orders");

  const addToCart = (service: (typeof SERVICES)[0]) => {
    if (!cart.find((s) => s.id === service.id)) {
      setCart([...cart, service]);
    }
  };
  const removeFromCart = (id: number) => setCart(cart.filter((s) => s.id !== id));
  const total = cart.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="min-h-screen bg-background grid-bg relative">
      {/* Ambient glow top */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(0,230,220,0.08),transparent_70%)] pointer-events-none z-0" />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <button
            onClick={() => setActiveSection("catalog")}
            className="font-display font-black text-xl tracking-widest uppercase"
          >
            <span className="text-white">RE</span>
            <span style={{ color: "#00E6DC" }}>GEN</span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {(["catalog", "about", "contacts"] as Section[]).map((sec) => (
              <button
                key={sec}
                onClick={() => setActiveSection(sec)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === sec
                    ? "text-[#00E6DC] bg-[rgba(0,230,220,0.08)]"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {sec === "catalog" && "Услуги"}
                {sec === "about" && "О нас"}
                {sec === "contacts" && "Контакты"}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveSection("profile")}
              className={`p-2 rounded-lg transition-all duration-200 ${
                activeSection === "profile"
                  ? "text-[#00E6DC] bg-[rgba(0,230,220,0.1)]"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              <Icon name="User" size={20} />
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-lg text-white/50 hover:text-[#00E6DC] transition-all duration-200"
            >
              <Icon name="ShoppingBag" size={20} />
              {cart.length > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-[#050c0f]"
                  style={{ background: "#00E6DC" }}
                >
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden flex border-t border-white/5">
          {(["catalog", "about", "contacts"] as Section[]).map((sec) => (
            <button
              key={sec}
              onClick={() => setActiveSection(sec)}
              className={`flex-1 py-2 text-xs font-medium transition-colors ${
                activeSection === sec ? "text-[#00E6DC]" : "text-white/40"
              }`}
            >
              {sec === "catalog" && "Услуги"}
              {sec === "about" && "О нас"}
              {sec === "contacts" && "Контакты"}
            </button>
          ))}
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="pt-20 md:pt-16 relative z-10">

        {/* ===== CATALOG ===== */}
        {activeSection === "catalog" && (
          <div>
            {/* Hero */}
            <section className="relative overflow-hidden py-16 md:py-24 px-4">
              <div className="max-w-4xl mx-auto text-center animate-fade-in">
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6 border"
                  style={{ borderColor: "rgba(0,230,220,0.3)", color: "#00E6DC", background: "rgba(0,230,220,0.05)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E6DC] animate-pulse" />
                  Биохакинг-центр · Краснодар
                </div>
                <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl uppercase leading-none mb-6">
                  <span className="text-white">Взломай</span>
                  <br />
                  <span className="glow-text" style={{ color: "#00E6DC" }}>потенциал</span>
                  <br />
                  <span className="text-white/30">тела</span>
                </h1>
                <p className="text-white/50 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-8">
                  Научно обоснованные методы восстановления и оптимизации. Выбери свой протокол.
                </p>
                <button
                  onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-[#050c0f] transition-all duration-300 hover:scale-105"
                  style={{ background: "#00E6DC", boxShadow: "0 0 30px rgba(0,230,220,0.3)" }}
                >
                  Выбрать услугу
                  <Icon name="ArrowDown" size={18} />
                </button>
              </div>

              {/* Stats */}
              <div className="max-w-3xl mx-auto mt-16 grid grid-cols-3 gap-4">
                {[
                  { value: "6", label: "процедур" },
                  { value: "2 000+", label: "клиентов" },
                  { value: "98%", label: "возвращаются" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center glass rounded-2xl py-5 px-2">
                    <div className="font-display font-black text-2xl md:text-3xl" style={{ color: "#00E6DC" }}>
                      {stat.value}
                    </div>
                    <div className="text-white/40 text-xs mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Services grid */}
            <section id="services" className="px-4 pb-24 max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display font-bold text-2xl md:text-3xl text-white">
                  Протоколы восстановления
                </h2>
                {cart.length > 0 && (
                  <button
                    onClick={() => setCartOpen(true)}
                    className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border transition-all"
                    style={{ borderColor: "rgba(0,230,220,0.3)", color: "#00E6DC" }}
                  >
                    <Icon name="ShoppingBag" size={16} />
                    {cart.length} выбрано · {total.toLocaleString()} ₽
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {SERVICES.map((service, i) => {
                  const inCart = !!cart.find((s) => s.id === service.id);
                  return (
                    <div
                      key={service.id}
                      className="rounded-2xl overflow-hidden border border-white/5 hover-glow cursor-pointer group animate-slide-up"
                      style={{ animationDelay: `${i * 0.1}s`, background: "hsl(var(--card))" }}
                      onClick={() => setSelectedService(service)}
                    >
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${service.color} to-transparent`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--card))] via-transparent to-transparent" />
                        <div className="absolute top-3 right-3">
                          <span
                            className="px-3 py-1 rounded-full text-xs font-bold"
                            style={{ background: "rgba(0,0,0,0.5)", color: service.accent, border: `1px solid ${service.accent}40` }}
                          >
                            {service.duration}
                          </span>
                        </div>
                        <div className="absolute top-3 left-3 text-2xl">{service.emoji}</div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="text-white/40 text-xs uppercase tracking-widest mb-1">{service.tagline}</div>
                        <h3 className="font-display font-bold text-xl text-white mb-2">{service.name}</h3>
                        <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">{service.description}</p>

                        {/* Benefits */}
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {service.benefits.slice(0, 3).map((b) => (
                            <span
                              key={b}
                              className="px-2 py-0.5 rounded-md text-xs"
                              style={{ background: `${service.accent}15`, color: service.accent }}
                            >
                              {b}
                            </span>
                          ))}
                        </div>

                        {/* Price + CTA */}
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-display font-black text-2xl text-white">
                              {service.price.toLocaleString()}
                            </span>
                            <span className="text-white/40 text-sm ml-1">₽</span>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); addToCart(service); }}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                              inCart
                                ? "text-white/40 border border-white/10 cursor-default"
                                : "text-[#050c0f] hover:scale-105 hover:shadow-lg"
                            }`}
                            style={
                              inCart
                                ? {}
                                : { background: service.accent, boxShadow: `0 0 20px ${service.accent}40` }
                            }
                          >
                            {inCart ? (
                              <>
                                <Icon name="Check" size={16} />
                                Добавлено
                              </>
                            ) : (
                              <>
                                <Icon name="Plus" size={16} />
                                Записаться
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* ===== ABOUT ===== */}
        {activeSection === "about" && (
          <section className="min-h-screen px-4 py-16 max-w-5xl mx-auto animate-fade-in">
            <div className="mb-12">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6 border"
                style={{ borderColor: "rgba(0,230,220,0.3)", color: "#00E6DC", background: "rgba(0,230,220,0.05)" }}
              >
                О компании
              </div>
              <h2 className="font-display font-black text-4xl md:text-6xl uppercase text-white mb-6">
                Мы превращаем<br />
                <span className="glow-text" style={{ color: "#00E6DC" }}>науку в практику</span>
              </h2>
              <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
                REGEN — биохакинг-центр нового поколения. Мы объединили древние практики восстановления с современными технологиями, чтобы дать телу и разуму максимум возможностей.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[
                {
                  icon: "Zap",
                  title: "Доказательный подход",
                  text: "Только методы с научно подтверждённой эффективностью. Никакой эзотерики — только физиология.",
                },
                {
                  icon: "Shield",
                  title: "Медицинская безопасность",
                  text: "Все процедуры проводят специалисты с медицинским образованием. Перед записью — консультация.",
                },
                {
                  icon: "Target",
                  title: "Персональные протоколы",
                  text: "Подбираем программу под ваши цели: восстановление, продуктивность, спорт, антивозрастной эффект.",
                },
                {
                  icon: "TrendingUp",
                  title: "Измеримый результат",
                  text: "Отслеживаем биомаркеры до и после. Видите прогресс в цифрах, а не ощущениях.",
                },
              ].map((item) => (
                <div key={item.title} className="glass rounded-2xl p-6 hover-glow border border-white/5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "rgba(0,230,220,0.1)" }}
                  >
                    <Icon name={item.icon as "Zap"} size={22} className="text-[#00E6DC]" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-white mb-2">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="glass rounded-2xl p-8 border border-white/5 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="font-display font-bold text-2xl text-white mb-3">Наша команда</h3>
                <p className="text-white/50 leading-relaxed">
                  Врачи, спортивные физиологи, нутрициологи и инструкторы с международными сертификатами. Средний опыт — 8 лет в wellness-индустрии.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 shrink-0">
                {["👨‍⚕️", "👩‍⚕️", "🧬"].map((emoji, i) => (
                  <div key={i} className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-3xl">
                    {emoji}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ===== CONTACTS ===== */}
        {activeSection === "contacts" && (
          <section className="min-h-screen px-4 py-16 max-w-3xl mx-auto animate-fade-in">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6 border"
              style={{ borderColor: "rgba(0,230,220,0.3)", color: "#00E6DC", background: "rgba(0,230,220,0.05)" }}
            >
              Контакты и поддержка
            </div>
            <h2 className="font-display font-black text-4xl md:text-5xl uppercase text-white mb-10">
              Свяжитесь с нами
            </h2>

            <div className="space-y-4 mb-10">
              {[
                { icon: "MapPin", label: "Адрес", value: "Краснодар, ул. Красная, 83" },
                { icon: "Phone", label: "Телефон", value: "+7 (861) 000-00-00" },
                { icon: "Mail", label: "Email", value: "hello@regen.center" },
                { icon: "Clock", label: "Режим работы", value: "Ежедневно 8:00 – 22:00" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="glass rounded-2xl p-5 border border-white/5 flex items-center gap-5 hover-glow"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(0,230,220,0.1)" }}
                  >
                    <Icon name={item.icon as "MapPin"} size={20} className="text-[#00E6DC]" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs">{item.label}</div>
                    <div className="text-white font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact form */}
            <div className="glass rounded-2xl p-6 border border-white/5">
              <h3 className="font-display font-bold text-xl text-white mb-5">Написать нам</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#00E6DC] transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Телефон"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#00E6DC] transition-colors"
                />
                <textarea
                  placeholder="Сообщение"
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#00E6DC] transition-colors resize-none"
                />
                <button
                  className="w-full py-3.5 rounded-xl font-bold text-[#050c0f] transition-all duration-200 hover:scale-[1.02]"
                  style={{ background: "#00E6DC", boxShadow: "0 0 20px rgba(0,230,220,0.25)" }}
                >
                  Отправить сообщение
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ===== PROFILE ===== */}
        {activeSection === "profile" && (
          <section className="min-h-screen px-4 py-16 max-w-3xl mx-auto animate-fade-in">
            {/* Header */}
            <div className="glass rounded-2xl p-6 border border-white/5 mb-6">
              <div className="flex items-center gap-5">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black shrink-0"
                  style={{ background: "rgba(0,230,220,0.15)", color: "#00E6DC" }}
                >
                  АИ
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl text-white">Александр Иванов</h2>
                  <p className="text-white/40 text-sm">Клиент с мая 2024</p>
                  <div
                    className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: "rgba(0,230,220,0.1)", color: "#00E6DC" }}
                  >
                    <Icon name="Star" size={12} />
                    Премиум-участник
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              {[
                { key: "orders", label: "Мои записи" },
                { key: "settings", label: "Настройки" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setProfileTab(tab.key as "orders" | "settings")}
                  className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all ${
                    profileTab === tab.key
                      ? "text-[#050c0f] font-bold"
                      : "text-white/40 bg-white/5 hover:text-white/70"
                  }`}
                  style={profileTab === tab.key ? { background: "#00E6DC" } : {}}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {profileTab === "orders" && (
              <div className="space-y-3">
                {[
                  { service: "Криокапсула", date: "10 апр 2026", status: "Завершено", emoji: "❄️" },
                  { service: "Массаж", date: "5 апр 2026", status: "Завершено", emoji: "🤲" },
                  { service: "Медитация на природе", date: "18 апр 2026", status: "Предстоит", emoji: "🌲" },
                ].map((order) => (
                  <div
                    key={order.service + order.date}
                    className="glass rounded-2xl p-4 border border-white/5 flex items-center gap-4"
                  >
                    <div className="text-2xl">{order.emoji}</div>
                    <div className="flex-1">
                      <div className="font-medium text-white text-sm">{order.service}</div>
                      <div className="text-white/40 text-xs mt-0.5">{order.date}</div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === "Завершено"
                          ? "bg-white/5 text-white/40"
                          : ""
                      }`}
                      style={order.status === "Предстоит" ? { background: "rgba(0,230,220,0.1)", color: "#00E6DC" } : {}}
                    >
                      {order.status}
                    </span>
                  </div>
                ))}
                <button
                  onClick={() => setActiveSection("catalog")}
                  className="w-full py-3.5 rounded-xl font-bold text-[#050c0f] mt-2 transition-all hover:scale-[1.02]"
                  style={{ background: "#00E6DC" }}
                >
                  Записаться снова
                </button>
              </div>
            )}

            {profileTab === "settings" && (
              <div className="space-y-4">
                {[
                  { label: "Имя", value: "Александр Иванов" },
                  { label: "Телефон", value: "+7 (900) 000-00-00" },
                  { label: "Email", value: "alex@example.com" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="text-white/40 text-xs mb-1.5 block">{field.label}</label>
                    <input
                      defaultValue={field.value}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E6DC] transition-colors"
                    />
                  </div>
                ))}
                <button
                  className="w-full py-3.5 rounded-xl font-bold text-[#050c0f] mt-2"
                  style={{ background: "#00E6DC" }}
                >
                  Сохранить изменения
                </button>
              </div>
            )}
          </section>
        )}
      </main>

      {/* ===== SERVICE MODAL ===== */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
          onClick={() => setSelectedService(null)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="relative w-full md:max-w-xl max-h-[90vh] overflow-y-auto rounded-t-3xl md:rounded-2xl border border-white/5 animate-slide-up"
            style={{ background: "hsl(var(--card))" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 md:h-64 overflow-hidden rounded-t-3xl md:rounded-t-2xl">
              <img
                src={selectedService.image}
                alt={selectedService.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--card))] via-transparent" />
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-black/50 flex items-center justify-center text-white/70 hover:text-white"
              >
                <Icon name="X" size={18} />
              </button>
              <div className="absolute bottom-4 left-5 text-3xl">{selectedService.emoji}</div>
            </div>

            <div className="p-6">
              <div className="text-white/40 text-xs uppercase tracking-widest mb-1">{selectedService.tagline}</div>
              <h2 className="font-display font-black text-3xl text-white mb-3">{selectedService.name}</h2>
              <p className="text-white/60 leading-relaxed mb-6">{selectedService.description}</p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {selectedService.benefits.map((b) => (
                  <div
                    key={b}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
                    style={{ background: `${selectedService.accent}10`, color: selectedService.accent }}
                  >
                    <Icon name="CheckCircle" size={14} />
                    {b}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div>
                  <div className="text-white/40 text-xs">Стоимость</div>
                  <div className="font-display font-black text-3xl text-white">
                    {selectedService.price.toLocaleString()} <span className="text-white/40 text-lg">₽</span>
                  </div>
                  <div className="text-white/40 text-xs">{selectedService.duration}</div>
                </div>
                <button
                  onClick={() => { addToCart(selectedService); setSelectedService(null); }}
                  disabled={!!cart.find((s) => s.id === selectedService.id)}
                  className="px-8 py-3.5 rounded-xl font-bold text-[#050c0f] transition-all duration-200 hover:scale-105 disabled:opacity-40 disabled:cursor-default disabled:scale-100"
                  style={{ background: selectedService.accent, boxShadow: `0 0 20px ${selectedService.accent}40` }}
                >
                  {cart.find((s) => s.id === selectedService.id) ? "Уже добавлено" : "Записаться"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== CART DRAWER ===== */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-end justify-end"
          onClick={() => setCartOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative w-full md:w-[420px] h-[90vh] md:h-screen flex flex-col rounded-t-3xl md:rounded-none border-t md:border-l md:border-t-0 border-white/5 animate-slide-up"
            style={{ background: "hsl(var(--card))" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="font-display font-bold text-xl text-white flex items-center gap-2">
                <Icon name="ShoppingBag" size={20} className="text-[#00E6DC]" />
                Корзина
                {cart.length > 0 && (
                  <span
                    className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-[#050c0f]"
                    style={{ background: "#00E6DC" }}
                  >
                    {cart.length}
                  </span>
                )}
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="w-9 h-9 rounded-xl glass flex items-center justify-center text-white/50 hover:text-white"
              >
                <Icon name="X" size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-5xl mb-4">🛒</div>
                  <div className="text-white/40">Корзина пуста</div>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="mt-4 text-sm font-medium"
                    style={{ color: "#00E6DC" }}
                  >
                    Выбрать услугу →
                  </button>
                </div>
              ) : (
                cart.map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-white/5"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                      <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white text-sm">{service.name}</div>
                      <div className="text-white/40 text-xs">{service.duration}</div>
                      <div className="font-bold text-sm mt-0.5" style={{ color: service.accent }}>
                        {service.price.toLocaleString()} ₽
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(service.id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-all"
                    >
                      <Icon name="Trash2" size={15} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/50">Итого</span>
                  <span className="font-display font-black text-2xl text-white">
                    {total.toLocaleString()} ₽
                  </span>
                </div>
                <button
                  className="w-full py-4 rounded-xl font-bold text-[#050c0f] text-lg transition-all hover:scale-[1.02]"
                  style={{ background: "#00E6DC", boxShadow: "0 0 30px rgba(0,230,220,0.3)" }}
                >
                  Оформить запись
                </button>
                <p className="text-white/30 text-xs text-center mt-3">
                  После нажатия с вами свяжется менеджер
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
