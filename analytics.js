/* H.Sol 사이트 방문 측정 — 측정 ID만 넣으면 즉시 가동
 *
 * 사용법 (현수, 1회):
 *   1. Google Analytics → 관리 → 데이터 스트림 → 웹 스트림 추가
 *      URL: https://blindso.github.io/hsol-site/
 *   2. 발급된 측정 ID(G-XXXXXXXXXX)를 아래 MEASUREMENT_ID 에 붙여넣기
 *   3. commit + push → 그 순간부터 전 페이지 측정 시작 (스니펫은 이미 전 페이지에 배선됨)
 *
 * ID가 비어 있으면 아무것도 로드하지 않는다 (미측정 = 정직하게 미측정).
 */
(function () {
  var MEASUREMENT_ID = ""; // ← 여기에 G-XXXXXXXXXX 붙여넣기

  if (!MEASUREMENT_ID) return;

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + MEASUREMENT_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", MEASUREMENT_ID);

  // 퍼널 이벤트 — 무료 자료 열람·PDF 다운로드·크몽 클릭 (전환 경로 추적)
  // 구체적 행동(.pdf 다운로드·kmong)을 일반 버킷(free/ 웹 열람)보다 먼저 판정한다.
  // 홈의 PDF 링크는 'free/...pdf' 라 free/ 를 먼저 보면 다운로드가 열람으로 오분류된다.
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a");
    if (!a) return;
    var href = a.getAttribute("href") || "";
    if (href.indexOf("kmong") > -1) {
      gtag("event", "kmong_click", { asset: href });
    } else if (href.indexOf(".pdf") > -1) {
      gtag("event", "pdf_download", { asset: href });
    } else if (href.indexOf("/free/") > -1 || href.indexOf("free/") === 0) {
      gtag("event", "free_asset_open", { asset: href });
    }
  });
})();
