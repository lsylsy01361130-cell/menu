const STORAGE_KEY = "menu-roulette-items";
const STORAGE_VERSION_KEY = "menu-roulette-version";
const STORAGE_VERSION = "2";
const DEFAULT_MENUS = ["김치찌개", "돈까스", "초밥", "파스타", "제육볶음", "햄버거", "비빔밥", "치킨", "떡볶이", "카레", "샤브샤브", "찜닭"];
const RANDOM_MENU_POOL = [
  "김치찌개", "된장찌개", "순두부찌개", "부대찌개", "김치볶음밥", "비빔밥",
  "제육볶음", "불고기", "삼겹살", "돈까스", "국밥", "칼국수",
  "냉면", "쌀국수", "마라탕", "짜장면", "짬뽕", "탕수육",
  "초밥", "회덮밥", "파스타", "피자", "햄버거", "샌드위치",
  "치킨", "떡볶이", "카레", "샐러드", "찜닭", "닭갈비",
  "곱창", "보쌈", "샤브샤브", "오므라이스", "우동", "라멘", "떡국", "삼계탕"
];
const RANDOM_MENU_COUNT = 10;
const GROUP_MENU_RECOMMENDATIONS = {
  small: ["삼겹살", "샤브샤브", "찜닭", "닭갈비", "보쌈", "족발", "피자", "치킨", "마라탕", "부대찌개"],
  medium: ["삼겹살", "샤브샤브", "찜닭", "닭갈비", "보쌈", "족발", "감자탕", "곱창", "피자", "치킨"],
  large: ["족발", "감자탕", "해물찜", "곱창전골", "불고기전골", "보쌈", "삼겹살", "치킨", "피자", "찜닭"]
};
const MENU_CATEGORIES = {
  한식: ["김치찌개", "된장찌개", "순두부찌개", "부대찌개", "김치볶음밥", "비빔밥", "제육볶음", "불고기", "국밥", "칼국수", "냉면", "회덮밥", "카레", "찜닭", "닭갈비", "보쌈", "감자탕"],
  중식: ["마라탕", "짜장면", "짬뽕", "탕수육"],
  일식: ["돈까스", "초밥", "우동", "라멘"],
  양식: ["파스타", "피자", "햄버거", "샌드위치", "샐러드", "오므라이스"],
  분식: ["떡볶이"],
  아시아: ["쌀국수"],
  계절·보양식: ["떡국", "삼계탕"],
  고기·모임: ["삼겹살", "치킨", "곱창", "샤브샤브", "족발", "해물찜", "곱창전골", "불고기전골"]
};
const SPECIAL_DAY_RECOMMENDATIONS = {
  "01-01": { occasion: "새해 첫날", menu: "떡국", description: "따뜻한 떡국 한 그릇으로 새해를 든든하게 시작해요!" },
  "02-14": { occasion: "밸런타인데이", menu: "파스타", description: "좋아하는 사람과 파스타를 나누며 달콤한 하루를 보내세요." },
  "03-14": { occasion: "화이트데이", menu: "초밥", description: "산뜻한 초밥으로 마음을 전하는 특별한 식사를 즐겨보세요." },
  "04-14": { occasion: "블랙데이", menu: "짜장면", description: "오늘은 짜장면 한 그릇으로 기분 좋게 블랙데이를 즐겨봐요." },
  "05-05": { occasion: "어린이날", menu: "치킨", description: "온 가족이 좋아하는 치킨으로 신나는 하루를 함께해요!" },
  "05-08": { occasion: "어버이날", menu: "불고기", description: "정성스럽게 구운 불고기로 감사한 마음을 전해보세요." },
  "07-07": { occasion: "칠석", menu: "칼국수", description: "칠석에는 길게 이어지는 국수 한 그릇으로 정겨운 식사를 즐겨요." },
  "08-15": { occasion: "광복절", menu: "비빔밥", description: "여러 재료가 어우러지는 비빔밥으로 뜻깊은 하루를 기념해요." },
  "10-31": { occasion: "할로윈", menu: "카레", description: "달콤한 호박을 곁들인 카레로 할로윈 분위기를 내보세요." },
  "11-11": { occasion: "빼빼로데이", menu: "떡볶이", description: "매콤달콤한 떡볶이와 달콤한 간식으로 즐거운 하루를 보내요." },
  "12-25": { occasion: "크리스마스", menu: "피자", description: "따뜻한 피자를 나누며 포근한 크리스마스 식탁을 만들어봐요." }
};
const BOKNAL_RECOMMENDATIONS_2026 = {
  "07-15": { occasion: "초복", menu: "삼계탕", description: "초복에는 따끈한 삼계탕으로 여름 기운을 든든하게 채워봐요." },
  "07-25": { occasion: "중복", menu: "삼계탕", description: "중복 더위에는 삼계탕 한 그릇으로 몸과 마음을 챙겨보세요." },
  "08-14": { occasion: "말복", menu: "삼계탕", description: "말복에는 보양식 삼계탕으로 여름 더위를 건강하게 마무리해요." }
};
const SEASONAL_RECOMMENDATIONS = [
  { months: [12, 1, 2], menu: "김치찌개", description: "쌀쌀한 날씨에는 보글보글 끓인 김치찌개가 속까지 따뜻하게 해줘요." },
  { months: [3, 4, 5], menu: "비빔밥", description: "싱그러운 제철 채소를 듬뿍 넣은 비빔밥으로 가볍고 든든하게 즐겨요." },
  { months: [6, 7, 8], menu: "냉면", description: "더운 날에는 시원하고 새콤한 냉면으로 입맛을 깨워보세요." },
  { months: [9, 10, 11], menu: "불고기", description: "선선한 계절, 따뜻한 불고기로 든든하고 포근한 한 끼를 즐겨요." }
];
const COLORS = ["#f3b6aa", "#f5dda0", "#c4d9b7", "#b4dcd0", "#b8cbed", "#d3c0e2", "#f0bdcd", "#f1e1aa", "#acd6e2", "#e9c1a8", "#d2dfae", "#e2b9d3"];
const NUTRITION_PER_SERVING = {
  "김치찌개": { calories: 350, protein: 22 },
  "된장찌개": { calories: 300, protein: 19 },
  "순두부찌개": { calories: 330, protein: 24 },
  "부대찌개": { calories: 600, protein: 28 },
  "김치볶음밥": { calories: 550, protein: 17 },
  "비빔밥": { calories: 560, protein: 19 },
  "제육볶음": { calories: 550, protein: 30 },
  "불고기": { calories: 500, protein: 32 },
  "삼겹살": { calories: 650, protein: 28 },
  "돈까스": { calories: 750, protein: 32 },
  "국밥": { calories: 600, protein: 30 },
  "칼국수": { calories: 500, protein: 16 },
  "냉면": { calories: 500, protein: 18 },
  "쌀국수": { calories: 450, protein: 22 },
  "마라탕": { calories: 700, protein: 30 },
  "짜장면": { calories: 700, protein: 20 },
  "짬뽕": { calories: 680, protein: 32 },
  "탕수육": { calories: 600, protein: 25 },
  "초밥": { calories: 550, protein: 25 },
  "회덮밥": { calories: 520, protein: 28 },
  "파스타": { calories: 650, protein: 24 },
  "피자": { calories: 700, protein: 30 },
  "햄버거": { calories: 600, protein: 28 },
  "샌드위치": { calories: 450, protein: 22 },
  "치킨": { calories: 750, protein: 40 },
  "떡볶이": { calories: 500, protein: 12 },
  "카레": { calories: 550, protein: 18 },
  "샐러드": { calories: 350, protein: 25 },
  "찜닭": { calories: 650, protein: 38 },
  "닭갈비": { calories: 600, protein: 35 },
  "곱창": { calories: 700, protein: 25 },
  "보쌈": { calories: 600, protein: 38 },
  "샤브샤브": { calories: 450, protein: 32 },
  "오므라이스": { calories: 650, protein: 20 },
  "우동": { calories: 450, protein: 15 },
  "라멘": { calories: 600, protein: 25 },
  "족발": { calories: 650, protein: 38 },
  "감자탕": { calories: 600, protein: 35 },
  "해물찜": { calories: 500, protein: 35 },
  "곱창전골": { calories: 650, protein: 28 },
  "불고기전골": { calories: 550, protein: 32 },
  "떡국": { calories: 470, protein: 18 },
  "삼계탕": { calories: 900, protein: 65 }
};

const wheel = document.querySelector("#roulette-wheel");
const spinButton = document.querySelector("#spin-button");
const spinHint = document.querySelector("#spin-hint");
const result = document.querySelector("#result");
const menuForm = document.querySelector("#menu-form");
const menuInput = document.querySelector("#menu-input");
const menuList = document.querySelector("#menu-list");
const menuCount = document.querySelector("#menu-count");
const clearButton = document.querySelector("#clear-button");
const randomMenuButton = document.querySelector("#random-menu-button");
const partySize = document.querySelector("#party-size");
const recommendButton = document.querySelector("#recommend-button");
const categoryTabs = document.querySelector("#category-tabs");
const categoryMenuList = document.querySelector("#category-menu-list");
const todayPickLabel = document.querySelector("#today-pick-label");
const todayPickMenu = document.querySelector("#today-pick-menu");
const todayPickDescription = document.querySelector("#today-pick-description");
const todayPickAdd = document.querySelector("#today-pick-add");
const message = document.querySelector("#message");
const emptyState = document.querySelector("#empty-state");

let migrationWarning = false;
let menus = loadMenus();
let isSpinning = false;
let currentRotation = 0;
let spinTimer;
let selectedCategory = Object.keys(MENU_CATEGORIES)[0];
let todayRecommendation = getTodayRecommendation();

function getTodayRecommendation() {
  const today = new Date();
  const dateKey = `${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const specialDay = SPECIAL_DAY_RECOMMENDATIONS[dateKey]
    ?? (today.getFullYear() === 2026 ? BOKNAL_RECOMMENDATIONS_2026[dateKey] : undefined);
  if (specialDay) return { ...specialDay, isSpecialDay: true };

  const seasonal = SEASONAL_RECOMMENDATIONS.find((recommendation) => recommendation.months.includes(today.getMonth() + 1));
  return {
    occasion: "계절 메뉴 추천",
    menu: seasonal.menu,
    description: seasonal.description,
    isSpecialDay: false
  };
}

function renderTodayRecommendation() {
  todayPickLabel.textContent = todayRecommendation.isSpecialDay
    ? `TODAY'S SPECIAL · ${todayRecommendation.occasion}`
    : "TODAY'S SEASONAL PICK";
  todayPickMenu.textContent = todayRecommendation.menu;
  todayPickDescription.textContent = todayRecommendation.description;

  const alreadyAdded = menus.includes(todayRecommendation.menu);
  todayPickAdd.disabled = alreadyAdded || isSpinning;
  todayPickAdd.textContent = alreadyAdded ? "이미 후보에 있어요" : "후보에 추가";
}

function loadMenus() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) return [...DEFAULT_MENUS];

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed) || !parsed.every((item) => typeof item === "string")) {
      throw new Error("저장된 메뉴 데이터 형식이 올바르지 않습니다.");
    }
    const loadedMenus = parsed.map((item) => item.trim()).filter(Boolean);
    if (localStorage.getItem(STORAGE_VERSION_KEY) !== STORAGE_VERSION) {
      while (loadedMenus.length < 10) {
        const nextMenu = RANDOM_MENU_POOL.find((menu) => !loadedMenus.includes(menu));
        if (!nextMenu) break;
        loadedMenus.push(nextMenu);
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(loadedMenus));
        localStorage.setItem(STORAGE_VERSION_KEY, STORAGE_VERSION);
      } catch (error) {
        console.error("기존 메뉴 목록을 새 룰렛 기본 설정으로 저장하지 못했습니다.", error);
        migrationWarning = true;
      }
    }
    return loadedMenus;
  } catch (error) {
    console.error("메뉴를 불러오지 못했습니다.", error);
    window.addEventListener("DOMContentLoaded", () => {
      showMessage("저장된 메뉴를 불러오지 못해 기본 메뉴를 표시합니다.");
    }, { once: true });
    return [...DEFAULT_MENUS];
  }
}

function saveMenus() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(menus));
    localStorage.setItem(STORAGE_VERSION_KEY, STORAGE_VERSION);
    return true;
  } catch (error) {
    console.error("메뉴를 저장하지 못했습니다.", error);
    return false;
  }
}

function showMessage(text) {
  message.textContent = text;
}

function render() {
  menuList.replaceChildren();
  menus.forEach((name, index) => {
    const item = document.createElement("li");
    item.className = "menu-item";

    const color = document.createElement("span");
    color.className = "menu-color";
    color.style.backgroundColor = COLORS[index % COLORS.length];
    color.setAttribute("aria-hidden", "true");

    const label = document.createElement("span");
    label.className = "menu-name";
    label.textContent = name;

    const nutrition = document.createElement("span");
    nutrition.className = "menu-nutrition";
    const nutritionInfo = NUTRITION_PER_SERVING[name];
    nutrition.textContent = nutritionInfo
      ? `약 ${nutritionInfo.calories} kcal · 단백질 ${nutritionInfo.protein} g`
      : "영양정보 미등록";

    const remove = document.createElement("button");
    remove.className = "remove-button";
    remove.type = "button";
    remove.disabled = isSpinning;
    remove.textContent = "×";
    remove.setAttribute("aria-label", `${name} 삭제`);
    remove.addEventListener("click", () => removeMenu(index));

    item.append(color, label, nutrition, remove);
    menuList.append(item);
  });

  menuCount.textContent = `${menus.length}개`;
  emptyState.hidden = menus.length !== 0;
  menuList.hidden = menus.length === 0;
  spinButton.disabled = menus.length < 2 || isSpinning;
  menuInput.disabled = isSpinning;
  menuForm.querySelector("button[type='submit']").disabled = isSpinning;
  clearButton.disabled = isSpinning;
  randomMenuButton.disabled = isSpinning;
  partySize.disabled = isSpinning;
  recommendButton.disabled = isSpinning;
  renderTodayRecommendation();
  renderCategoryMenus();
  spinHint.textContent = menus.length < 2
    ? "메뉴를 2개 이상 담으면 시작할 수 있어요."
    : isSpinning ? "오늘의 메뉴를 고르고 있어요..." : "두근두근, 오늘의 메뉴를 골라볼까요?";
  renderWheel();
}

function renderCategoryMenus() {
  categoryTabs.replaceChildren();
  categoryMenuList.replaceChildren();

  for (const category of Object.keys(MENU_CATEGORIES)) {
    const tab = document.createElement("button");
    tab.className = "category-tab";
    tab.type = "button";
    tab.textContent = category;
    tab.setAttribute("aria-pressed", String(category === selectedCategory));
    tab.disabled = isSpinning;
    tab.addEventListener("click", () => {
      selectedCategory = category;
      renderCategoryMenus();
    });
    categoryTabs.append(tab);
  }

  for (const name of MENU_CATEGORIES[selectedCategory]) {
    const isAdded = menus.includes(name);
    const menuButton = document.createElement("button");
    menuButton.className = "category-menu-button";
    menuButton.type = "button";
    menuButton.disabled = isAdded || isSpinning;
    menuButton.setAttribute("aria-label", isAdded ? `${name}, 이미 후보에 추가됨` : `${name} 후보에 추가`);

    const nameLabel = document.createElement("span");
    nameLabel.textContent = name;
    menuButton.append(nameLabel);

    const nutritionInfo = NUTRITION_PER_SERVING[name];
    if (nutritionInfo) {
      const nutrition = document.createElement("small");
      nutrition.textContent = `${nutritionInfo.calories} kcal · 단백질 ${nutritionInfo.protein} g`;
      menuButton.append(nutrition);
    }

    if (isAdded) {
      const addedLabel = document.createElement("span");
      addedLabel.className = "category-added-label";
      addedLabel.textContent = "추가됨";
      menuButton.append(addedLabel);
    }

    menuButton.addEventListener("click", () => addMenu(name, false));
    categoryMenuList.append(menuButton);
  }
}

function renderWheel() {
  wheel.replaceChildren();
  if (menus.length === 0) {
    wheel.setAttribute("aria-label", "메뉴 후보가 없습니다");
    return;
  }

  const namespace = "http://www.w3.org/2000/svg";
  const center = 200;
  const radius = 196;
  const slice = 360 / menus.length;
  const labelRadius = menus.length === 1 ? 0 : Math.min(127, Math.max(74, 155 - menus.length * 2));
  const fontSize = Math.max(9, Math.min(16, 17 - menus.length * 0.45));

  menus.forEach((name, index) => {
    const startAngle = -90 + index * slice;
    const endAngle = startAngle + slice;
    const start = polarPoint(center, center, radius, startAngle);
    const end = polarPoint(center, center, radius, endAngle);
    const largeArc = slice > 180 ? 1 : 0;
    const path = document.createElementNS(namespace, "path");
    path.setAttribute("d", `M ${center} ${center} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y} Z`);
    path.setAttribute("fill", COLORS[index % COLORS.length]);
    path.setAttribute("stroke", "#fff");
    path.setAttribute("stroke-width", "2");
    wheel.append(path);

    const middleAngle = startAngle + slice / 2;
    const labelPoint = polarPoint(center, center, labelRadius, middleAngle);
    const label = document.createElementNS(namespace, "text");
    label.classList.add("wheel-label");
    label.setAttribute("x", labelPoint.x);
    label.setAttribute("y", labelPoint.y);
    label.setAttribute("font-size", fontSize);
    label.textContent = name.length > 9 ? `${name.slice(0, 8)}…` : name;
    wheel.append(label);
  });

  wheel.setAttribute("aria-label", `룰렛 메뉴: ${menus.join(", ")}`);
}

function polarPoint(cx, cy, radius, degrees) {
  const radians = degrees * Math.PI / 180;
  return { x: cx + radius * Math.cos(radians), y: cy + radius * Math.sin(radians) };
}

function addMenu(value, focusInputOnError = true) {
  const name = value.trim();
  if (!name) {
    showMessage("메뉴 이름을 입력해 주세요.");
    if (focusInputOnError) menuInput.focus();
    return;
  }
  if (menus.some((menu) => menu.toLocaleLowerCase() === name.toLocaleLowerCase())) {
    showMessage("이미 추가된 메뉴예요.");
    if (focusInputOnError) menuInput.focus();
    return;
  }

  menus.push(name);
  const saved = saveMenus();
  render();
  result.textContent = "";
  showMessage(saved
    ? `${name} 메뉴를 추가했어요.`
    : `${name} 메뉴는 추가했지만 브라우저 저장에 실패했어요. 현재 페이지에서는 계속 사용할 수 있습니다.`);
}

function removeMenu(index) {
  const [removed] = menus.splice(index, 1);
  const saved = saveMenus();
  render();
  result.textContent = "";
  showMessage(saved
    ? `${removed} 메뉴를 삭제했어요.`
    : `${removed} 메뉴는 삭제했지만 브라우저 저장에 실패했어요. 현재 페이지에서는 계속 사용할 수 있습니다.`);
}

function setRandomMenus() {
  if (isSpinning) return;

  const shuffled = [...RANDOM_MENU_POOL];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  menus = shuffled.slice(0, RANDOM_MENU_COUNT);
  currentRotation = 0;
  wheel.style.transition = "none";
  wheel.style.transform = "rotate(0deg)";
  result.textContent = "";
  const saved = saveMenus();
  render();
  showMessage(saved
    ? "랜덤 메뉴 10개를 룰렛에 설정했어요."
    : "랜덤 메뉴를 설정했지만 브라우저 저장에 실패했어요. 현재 페이지에서는 계속 사용할 수 있습니다.");
}

function recommendGroupMenus() {
  if (isSpinning) return;

  const count = Number(partySize.value);
  const recommendationKey = count <= 3 ? "small" : count <= 5 ? "medium" : "large";
  menus = [...GROUP_MENU_RECOMMENDATIONS[recommendationKey]];
  currentRotation = 0;
  wheel.style.transition = "none";
  wheel.style.transform = "rotate(0deg)";
  result.textContent = "";

  const saved = saveMenus();
  render();
  showMessage(saved
    ? `${count}명이 함께 나눠 먹기 좋은 메뉴 10가지를 추천했어요.`
    : "추천 메뉴를 설정했지만 브라우저 저장에 실패했어요. 현재 페이지에서는 계속 사용할 수 있습니다.");
}

function spin() {
  if (isSpinning || menus.length < 2) return;

  isSpinning = true;
  result.textContent = "";
  showMessage("");
  render();

  const selectedIndex = Math.floor(Math.random() * menus.length);
  const slice = 360 / menus.length;
  const targetRemainder = (360 - (selectedIndex * slice + slice / 2)) % 360;
  const currentRemainder = ((currentRotation % 360) + 360) % 360;
  const alignment = (targetRemainder - currentRemainder + 360) % 360;
  currentRotation += 360 * 5 + alignment;

  wheel.style.transition = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "none"
    : "transform 4.2s cubic-bezier(0.12, 0.72, 0.12, 1)";
  wheel.style.transform = `rotate(${currentRotation}deg)`;

  window.clearTimeout(spinTimer);
  spinTimer = window.setTimeout(() => {
    isSpinning = false;
    render();
    result.textContent = `오늘의 메뉴는 ${menus[selectedIndex]}!`;
  }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 50 : 4300);
}

menuForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addMenu(menuInput.value);
  if (menuInput.value.trim() && !message.textContent.includes("이미 추가")) {
    menuInput.value = "";
  }
});

spinButton.addEventListener("click", spin);
randomMenuButton.addEventListener("click", setRandomMenus);
recommendButton.addEventListener("click", recommendGroupMenus);
todayPickAdd.addEventListener("click", () => addMenu(todayRecommendation.menu, false));

clearButton.addEventListener("click", () => {
  if (menus.length === 0) {
    showMessage("비울 메뉴가 없어요.");
    return;
  }
  if (!window.confirm("메뉴 후보를 모두 비울까요?")) return;

  menus = [];
  currentRotation = 0;
  wheel.style.transition = "none";
  wheel.style.transform = "rotate(0deg)";
  const saved = saveMenus();
  render();
  if (migrationWarning) {
    showMessage("기존 메뉴는 유지했지만 새 목록을 저장하지 못했어요. 현재 페이지에서 10개 메뉴를 사용할 수 있습니다.");
  }
  result.textContent = "";
  showMessage(saved
    ? "메뉴 후보를 모두 비웠어요."
    : "메뉴 후보를 비웠지만 브라우저 저장에 실패했어요. 현재 페이지에서는 계속 사용할 수 있습니다.");
});

render();
