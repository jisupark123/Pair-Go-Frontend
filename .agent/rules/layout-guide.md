---
trigger: always_on
---

# Layout Guidelines

이 문서는 프로젝트의 레이아웃 구조와 모바일 대응 원칙을 정의합니다. AI는 모든 화면(Screen/Page) 컴포넌트 설계 시 아래 지침을 엄격히 준수해야 합니다.

---

### 레이아웃 시스템 (Layout Hierarchy)

- **Outlet 기반 구조**: 서비스의 모든 화면은 `src/components/templates/Layout.tsx`의 `<Outlet />` 내부에 렌더링됩니다. 화면 설계 시 반드시 `Layout.tsx`를 참조하여 전체적인 여백, 배경 스타일, 최대 너비 설정과 시각적 정렬이 일치하도록 구성해야 합니다.
- **Navigation 명시적 포함**: 공통 네비게이션바는 레이아웃에 포함되어 있지 않습니다. 네비게이션이 필요한 화면을 생성할 때는 반드시 `src/components/organisms/Navigation.tsx` 컴포넌트를 직접 호출하여 최상단에 배치해야 합니다.

---

### 모바일 반응형 대응 (Responsive Design)

- **반응형 설계 원칙**: 모든 인터페이스는 데스크톱과 모바일 환경을 모두 지원하는 반응형으로 설계되어야 합니다.
- **기기 판정 표준**: 뷰포트 크기에 따른 분기 처리가 아닌, 모바일 기기 여부를 직접 판정해야 하는 경우 반드시 `react-device-detect` 라이브러리의 `isMobileOnly`를 임포트하여 사용해야 합니다.
- **스타일링 가이드**: 기본적으로 CSS Media Queries나 Tailwind CSS의 반응형 유틸리티를 사용하되, JavaScript 로직 수준의 모바일 최적화가 필요한 경우에만 `isMobileOnly`를 활용하여 사용자 경험을 최적화합니다.
