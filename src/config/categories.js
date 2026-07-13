// Конфігурація сторінок категорій для спільного CategoryPage.jsx.
// filterField відповідає полю в Strapi (category | sub_category), за яким
// фільтруються товари; backButtonVariant визначає колір hover кнопки
// "Назад" (sub — підкатегорії Світильників, top — категорії верхнього рівня).

export const categories = {
  lights: {
    path: "/lights-category",
    title: "Світильники",
    filterField: "category",
    filterValue: "Світильники",
    backTo: "/products",
    backLabel: "Назад до товарів",
    backButtonVariant: "top",
    subCategoryLinks: [
      { to: "/bra", label: "Бра" },
      { to: "/wall-lights", label: "Настінні світильники" },
      { to: "/pendant-lights", label: "Підвісні світильники" },
      { to: "/steampunk-lights", label: "Світильники Стімпанк" },
    ],
  },
  bra: {
    path: "/bra",
    title: "Бра",
    filterField: "sub_category",
    filterValue: "Бра",
    backTo: "/lights-category",
    backLabel: "Назад до Світильників",
    backButtonVariant: "sub",
  },
  wallLights: {
    path: "/wall-lights",
    title: "Настінні світильники",
    filterField: "sub_category",
    filterValue: "Настінні світильники",
    backTo: "/lights-category",
    backLabel: "Назад до Світильників",
    backButtonVariant: "sub",
  },
  pendantLights: {
    path: "/pendant-lights",
    title: "Підвісні світильники",
    filterField: "sub_category",
    filterValue: "Підвісні світильники",
    backTo: "/lights-category",
    backLabel: "Назад до Світильників",
    backButtonVariant: "sub",
  },
  steampunkLights: {
    path: "/steampunk-lights",
    title: "Світильники Стімпанк",
    filterField: "sub_category",
    filterValue: 'Світильники "Стімпанк"',
    backTo: "/lights-category",
    backLabel: "Назад до Світильників",
    backButtonVariant: "sub",
  },
  candles: {
    path: "/candles-category",
    title: "Свічки",
    filterField: "category",
    filterValue: "Свічки",
    backTo: "/products",
    backLabel: "Назад до товарів",
    backButtonVariant: "top",
  },
  furniture: {
    path: "/furniture-category",
    title: "Меблі",
    filterField: "category",
    filterValue: "Меблі",
    backTo: "/products",
    backLabel: "Назад до товарів",
    backButtonVariant: "top",
  },
};
