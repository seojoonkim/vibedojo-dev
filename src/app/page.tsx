import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { BELTS } from "@/lib/belt-system";
import { CHARACTERS } from "@/lib/characters";
import { CharacterPreview } from "@/components/character/character-avatar";
import { LandingLanguageSwitcher } from "@/components/landing-language-switcher";

export default async function LandingPage() {
  const t = await getTranslations("landing");
  const common = await getTranslations("common");

  const features = [
    { image: "/images/b1.jpg", titleKey: "0" },
    { image: "/images/b2.jpg", titleKey: "1" },
    { image: "/images/b3.jpg", titleKey: "2" },
    { image: "/images/b4.jpg", titleKey: "3" },
  ];

  const stats = [
    { value: "6", labelKey: "parts" },
    { value: "30", labelKey: "chapters" },
    { value: "10+", labelKey: "projects" },
  ];

  const whyVibeCodingImages = [
    "/images/a1.jpg",
    "/images/a2.jpg",
    "/images/a3.jpg",
    "/images/a4.jpg",
  ];

  const projectKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f7f2ea] via-[#f0e8d8] to-[#e8dcc8]">
      {/* Traditional Dojo Header - 쇼지/나무 프레임 스타일 */}
      <header className="sticky top-0 z-50 w-full border-b-2 border-[#c9b896] bg-[#faf6f0]/95 backdrop-blur-sm shadow-[0_2px_8px_rgba(74,55,40,0.1)]">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5 group">
            <Icons.vibedojoSymbol className="w-8 h-8 transition-transform duration-300 group-hover:scale-105" />
            <span className="text-lg tracking-tighter font-black text-[#4a3728] group-hover:text-[#8b5a2b] transition-colors">
              VibeDojo
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <LandingLanguageSwitcher />
            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-sm h-8 px-4 text-xs text-[#6b5344] bg-transparent border border-[#c9b896] hover:bg-[#f5f0e6] hover:text-[#4a3728] hover:border-[#8b5a2b] transition-all duration-300"
            >
              <Link href="/login">{common("login")}</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="rounded-sm h-8 px-5 text-xs font-bold bg-[#4a3728] text-[#f5f0e6] hover:bg-[#6b4423] border-0 transition-all duration-300 shadow-md"
            >
              <Link href="/signup">{common("signup")}</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section - Traditional Dojo Style 도장 느낌 */}
      <section className="relative overflow-hidden">
        {/* Background layers */}
        <div className="relative w-full overflow-hidden aspect-[4/3.8] sm:aspect-[4/3.5] md:aspect-[16/10] lg:aspect-[16/9.5] xl:aspect-[16/8.1]">
          <video
            src="/images/bg.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-bottom animate-slow-zoom"
          />
          {/* Warm wood-tone overlays - 따뜻한 나무색 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#3d2c1e]/95 via-[#4a3728]/70 to-[#6b4423]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3d2c1e] via-transparent to-transparent" />
          {/* Subtle paper texture feel - 화지 느낌 */}
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.04] mix-blend-overlay" />
          {/* Warm golden light overlay - 황금빛 자연광 */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#c49a4b]/10 via-transparent to-[#d4a55a]/5" />
        </div>

        {/* Decorative Kanji - Traditional style 한자 장식 */}
        <div className="absolute top-1/2 right-10 -translate-y-1/2 text-[150px] sm:text-[200px] font-serif text-[#d4c4a0]/20 pointer-events-none select-none leading-none animate-float-up opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          道
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-5xl w-full px-12 sm:px-16 md:px-20 lg:px-28 xl:px-32">
            <div className="max-w-lg lg:max-w-xl relative z-10">
              {/* Traditional Badge - 나무 액자 스타일 */}
              <div className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#f5f0e6]/20 border border-[#d4c4a0]/40 text-[#f5f0e6] text-xs sm:text-sm font-medium mb-4 sm:mb-3 lg:mb-4 backdrop-blur-sm rounded-sm animate-float-up opacity-0 stagger-1" style={{ animationFillMode: 'forwards' }}>
                <span className="w-1.5 h-1.5 bg-[#d4a55a] rounded-full" />
                {t("hero.badge")}
              </div>

              {/* Title - 따뜻한 호박색/골드 톤 */}
              <h1 className="text-[1.75rem] sm:text-[2.125rem] md:text-[2.5rem] lg:text-[2.875rem] font-black tracking-tight mb-5 sm:mb-4 lg:mb-5 leading-snug sm:leading-tight animate-float-up opacity-0 stagger-2" style={{ animationFillMode: 'forwards' }}>
                <span className="text-[#f5f0e6]">{t("hero.title1")}</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4a55a] via-[#c49a4b] to-[#b8894a]">
                  {t("hero.title2")}
                </span>
                <br />
                <span className="text-[#e8dcc8]">{t("hero.title3")}</span>
              </h1>

              <p className="text-[13px] sm:text-[15px] md:text-[15px] text-[#d4c4a0] mb-6 sm:mb-5 lg:mb-6 max-w-lg leading-relaxed animate-float-up opacity-0 stagger-3" style={{ animationFillMode: 'forwards' }}>
                <span className="whitespace-nowrap">{t("hero.description1")}</span>
                <br />
                <span className="whitespace-nowrap"><span className="text-[#d4a55a] font-semibold">{t("hero.description2")}</span>{t("hero.description3")}</span>
                <span className="hidden md:inline">
                  <br /><br />
                  <span className="whitespace-nowrap"><span className="text-[#e8dcc8] font-medium">{t("hero.description4")}</span>{t("hero.description5")}<span className="text-[#e8dcc8] font-medium">{t("hero.description6")}</span>{t("hero.description7")}</span>
                  <br />
                </span>
                <br className="md:hidden" />
                <span className="whitespace-nowrap"><span className="text-[#c49a4b] font-medium">{t("hero.description8")}</span>{t("hero.description9")}</span>
              </p>

              <div className="flex flex-row gap-2 sm:gap-3 mb-6 sm:mb-6 lg:mb-8 animate-float-up opacity-0 stagger-4" style={{ animationFillMode: 'forwards' }}>
                <Button
                  asChild
                  size="default"
                  className="rounded-sm h-9 sm:h-10 lg:h-11 px-4 sm:px-5 lg:px-6 text-xs sm:text-sm font-bold bg-[#4a3728] hover:bg-[#5c4637] text-[#f5f0e6] border-0 shadow-lg justify-center transition-all duration-300"
                >
                  <Link href="/signup">
                    {t("hero.cta")}
                    <Icons.chevronRight className="ml-1 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="default"
                  className="rounded-sm h-9 sm:h-10 lg:h-11 px-4 sm:px-5 lg:px-6 text-xs sm:text-sm font-medium bg-[#f5f0e6]/10 backdrop-blur-sm border-[#d4c4a0]/40 text-[#f5f0e6] hover:bg-[#f5f0e6]/20 hover:border-[#d4c4a0]/60 justify-center transition-all duration-300"
                >
                  <Link href="/courses">
                    {t("hero.secondaryCta")}
                    <Icons.chevronRight className="ml-1 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </Link>
                </Button>
              </div>

              {/* Stats - 나무 현판 스타일 */}
              <div className="inline-flex gap-3 sm:gap-4 lg:gap-6 px-4 py-3 bg-[#4a3728]/60 backdrop-blur-sm border border-[#8b5a2b]/40 rounded-sm animate-float-up opacity-0 stagger-5" style={{ animationFillMode: 'forwards' }}>
                {stats.map((stat, index) => (
                  <div key={stat.labelKey} className="flex items-baseline text-[#f5f0e6]">
                    <span className="text-lg sm:text-xl lg:text-2xl font-black text-[#d4a55a]">
                      {stat.value}
                    </span>
                    <span className="text-[11px] sm:text-xs lg:text-sm font-semibold ml-0.5 sm:ml-1 text-[#d4c4a0]">
                      {t(`stats.${stat.labelKey}`)}
                    </span>
                    {index < stats.length - 1 && (
                      <span className="ml-3 sm:ml-4 lg:ml-6 text-[#8b5a2b]">|</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Belt System Preview - 도장 띠 현판 스타일 */}
      <section className="py-5 sm:py-6 bg-[#faf6f0]/90 border-y-2 border-[#c9b896]">
        <div className="container px-4 sm:px-6">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
            <span className="text-xs sm:text-sm text-[#6b5344] mr-2 sm:mr-3 tracking-wider font-medium">
              {t("dojoSystem.badge")}
            </span>
            {BELTS.map((belt, index) => (
              <div
                key={belt.id}
                className={`w-6 h-4 sm:w-8 sm:h-5 rounded-sm ${belt.bgColor} transition-all duration-300 hover:scale-110 flex items-center justify-center border border-[#8b5a2b]/30 cursor-pointer shadow-sm`}
                title={`${belt.nameKo} (${belt.minXp}+ XP)`}
              >
                <span
                  className="text-[6px] sm:text-[8px] font-bold"
                  style={{ color: index === 0 ? "#6b5344" : index === 8 ? "#f5f0e6" : "#3d2c1e" }}
                >
                  {belt.rank}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Vibe Coding Section - 화지/나무 느낌 */}
      <section className="py-10 sm:py-14 px-4 bg-gradient-to-b from-[#f7f2ea] to-[#ebe5d8] relative">
        <div className="container max-w-4xl relative z-10">
          <div className="text-center mb-8 sm:mb-10">
            <span className="inline-block px-2.5 sm:px-3 py-1 border border-[#c9b896] bg-[#faf6f0] text-[#6b5344] text-xs sm:text-sm font-medium mb-3 sm:mb-4 rounded-sm">
              {t("whyVibeCoding.badge")}
            </span>
            <h2 className="text-[1.375rem] sm:text-[1.75rem] font-black text-[#3d2c1e] mb-2 px-2">
              {t("whyVibeCoding.title1")}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c49a4b] to-[#8b5a2b]">
                {t("whyVibeCoding.title2")}
              </span>
              {t("whyVibeCoding.title3")}
            </h2>
            <p className="text-[13px] sm:text-[15px] text-[#6b5344] max-w-xl mx-auto">
              {t("whyVibeCoding.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {whyVibeCodingImages.map((image, i) => (
              <div
                key={i}
                className="bg-[#faf6f0]/95 border border-[#c9b896] rounded-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#8b5a2b] hover:shadow-lg flex group"
              >
                <div className="relative w-24 sm:w-36 aspect-square flex-shrink-0 overflow-hidden">
                  <Image
                    src={image}
                    alt={t(`whyVibeCoding.items.${i}.title`)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#faf6f0]/20" />
                </div>
                <div className="p-4 sm:p-5 flex flex-col justify-center">
                  <h3 className="text-[13px] sm:text-[15px] font-bold mb-1 sm:mb-2 text-[#3d2c1e] group-hover:text-[#6b4423] transition-colors">
                    {t(`whyVibeCoding.items.${i}.title`)}
                  </h3>
                  <p className="text-[11px] sm:text-[13px] text-[#6b5344] leading-relaxed line-clamp-3 sm:line-clamp-none">
                    {t(`whyVibeCoding.items.${i}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Can Build Section - 다다미 섹션 */}
      <section className="py-10 sm:py-14 px-4 bg-[#e8dcc8]/60 relative overflow-hidden">
        {/* 따뜻한 황금빛 글로우 */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c49a4b]/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8b5a2b]/10 rounded-full blur-[120px]" />
        </div>
        <div className="container max-w-4xl relative z-10">
          <div className="text-center mb-8 sm:mb-10">
            <span className="inline-block px-2.5 sm:px-3 py-1 border border-[#c9b896] bg-[#faf6f0] text-[#6b5344] text-xs sm:text-sm font-medium mb-3 sm:mb-4 rounded-sm">
              {t("projects.badge")}
            </span>
            <h2 className="text-[1.375rem] sm:text-[1.75rem] font-black text-[#3d2c1e] mb-2">
              {t("projects.title1")}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c49a4b] via-[#a07d3a] to-[#8b5a2b]">
                {t("projects.title2")}
              </span>
            </h2>
            <p className="text-[13px] sm:text-[15px] text-[#6b5344] max-w-xl mx-auto">
              {t("projects.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {projectKeys.map((key, index) => (
              <div
                key={key}
                className="bg-[#faf6f0]/95 border border-[#c9b896] p-4 sm:p-5 rounded-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#8b5a2b] hover:shadow-lg group relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="text-[11px] sm:text-[13px] font-mono font-medium px-1.5 py-0.5 bg-[#ebe5d8] text-[#6b5344] border border-[#c9b896] rounded-sm">
                    {t(`projects.items.${key}.part`)}
                  </span>
                </div>
                <h3 className="text-[13px] sm:text-[15px] font-bold mb-1 sm:mb-1.5 text-[#3d2c1e] group-hover:text-[#6b4423] transition-colors">
                  {t(`projects.items.${key}.title`)}
                </h3>
                <p className="text-[11px] sm:text-[13px] text-[#6b5344] leading-relaxed line-clamp-2 sm:line-clamp-none group-hover:text-[#8b5a2b] transition-colors">
                  {t(`projects.items.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - 도장 시스템 */}
      <section className="py-10 sm:py-14 px-4 bg-gradient-to-b from-[#f7f2ea] to-[#ebe5d8] relative">
        <div className="container max-w-4xl relative z-10">
          <div className="text-center mb-8 sm:mb-10">
            <span className="inline-block px-2.5 sm:px-3 py-1 border border-[#c9b896] bg-[#faf6f0] text-[#6b5344] text-xs sm:text-sm font-medium mb-3 sm:mb-4 rounded-sm">
              {t("dojoSystem.badge")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#3d2c1e] mb-2">
              {t("dojoSystem.title1")}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c49a4b] to-[#8b5a2b]">
                {t("dojoSystem.title2")}
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#6b5344]">
              {t("dojoSystem.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-[#faf6f0]/95 border border-[#c9b896] rounded-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#8b5a2b] hover:shadow-lg group"
              >
                <div className="relative w-full aspect-[2/1] overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={t(`dojoSystem.items.${feature.titleKey}.title`)}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#faf6f0] to-transparent opacity-40" />
                </div>
                <div className="p-3 sm:p-5">
                  <h3 className="text-xs sm:text-sm font-bold mb-1 sm:mb-2 text-[#3d2c1e] group-hover:text-[#6b4423] transition-colors">
                    {t(`dojoSystem.items.${feature.titleKey}.title`)}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#6b5344] leading-relaxed group-hover:text-[#8b5a2b] transition-colors">
                    {t(`dojoSystem.items.${feature.titleKey}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Character Preview Section - 캐릭터 미리보기 */}
      <section className="py-10 sm:py-14 px-4 bg-[#e8dcc8]/60 relative overflow-hidden">
        <div className="container max-w-3xl relative z-10">
          <div className="text-center mb-8 sm:mb-10">
            <span className="inline-block px-2.5 sm:px-3 py-1 border border-[#c9b896] bg-[#faf6f0] text-[#6b5344] text-xs sm:text-sm font-medium mb-3 sm:mb-4 rounded-sm">
              {t("characters.badge")}
            </span>
            <h2 className="text-[1.375rem] sm:text-[1.75rem] font-black text-[#3d2c1e] mb-2">
              {t("characters.title")}
            </h2>
            <p className="text-[13px] sm:text-[15px] text-[#6b5344]">
              {t("characters.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-8 gap-1 sm:gap-2 max-w-xl mx-auto p-5 border-2 border-[#c9b896] bg-[#faf6f0]/90 backdrop-blur-sm rounded-sm shadow-sm">
            {CHARACTERS.map((character) => (
              <CharacterPreview
                key={character.id}
                character={character}
                size={40}
                className="hover:scale-110 transition-all duration-300 sm:[&>*]:w-[52px] sm:[&>*]:h-[52px]"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - 전통 명언 인용 */}
      <section className="py-10 sm:py-14 px-4 bg-gradient-to-b from-[#f7f2ea] to-[#ebe5d8] relative">
        {/* 따뜻한 황금빛 글로우 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#c49a4b]/8 rounded-full blur-[100px]" />
        <div className="container max-w-xl text-center relative z-10">
          <Icons.quote className="h-6 w-6 sm:h-8 sm:w-8 text-[#8b5a2b] mx-auto mb-4 sm:mb-5" />
          <blockquote className="text-[15px] sm:text-[17px] font-medium text-[#3d2c1e] mb-2 sm:mb-3 leading-relaxed px-2">
            &ldquo;{t("quote.text1")}
            <span className="text-[#8b5a2b]">{t("quote.text2")}</span>
            {t("quote.text3")}&rdquo;
          </blockquote>
          <p className="text-[11px] sm:text-[13px] text-[#6b5344] mb-5 sm:mb-6">{t("quote.author")}</p>
          <p className="text-[13px] sm:text-[15px] text-[#6b5344] mb-6 sm:mb-8 max-w-md mx-auto leading-relaxed px-2">
            <span className="whitespace-nowrap">{t("quote.description1")}</span>
            <br />
            <span className="whitespace-nowrap"><span className="text-[#8b5a2b] font-medium">{t("quote.description2")}</span>{t("quote.description3")}</span>
            <br />
            <span className="whitespace-nowrap">{t("quote.description4")}<span className="text-[#8b5a2b] font-medium">{t("quote.description5")}</span>{t("quote.description6")}</span>
          </p>
          <Button
            asChild
            size="default"
            className="rounded-sm h-9 sm:h-10 px-6 sm:px-8 text-xs sm:text-sm font-bold bg-[#4a3728] hover:bg-[#5c4637] text-[#f5f0e6] shadow-md transition-all duration-300"
          >
            <Link href="/signup">
              {t("quote.cta")}
              <Icons.swords className="ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer - 전통 스타일 푸터 */}
      <footer className="py-6 sm:py-8 px-4 bg-[#faf6f0] border-t-2 border-[#c9b896]">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-5">
          <div className="flex items-center gap-2">
            <Icons.vibedojoSymbol className="w-6 h-6 sm:w-7 sm:h-7" />
            <span className="font-bold text-xs sm:text-sm text-[#4a3728] tracking-tight">
              {common("appName")}
            </span>
          </div>
          <div className="flex flex-col items-center gap-0.5 sm:gap-1 order-last sm:order-none">
            <p className="text-xs sm:text-sm text-[#6b5344]">
              {t("footer.copyright")}
            </p>
            <p className="text-xs sm:text-sm text-[#6b5344]">
              Powered by{" "}
              <Link
                href="https://www.hashed.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8b5a2b] hover:text-[#4a3728] transition-all font-medium"
              >
                #Hashed
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="https://github.com/anthropics/claude-code"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6b5344] hover:text-[#4a3728] transition-all duration-300"
            >
              <Icons.github className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
