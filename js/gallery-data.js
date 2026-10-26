/* =========================================================
   フォトギャラリーのデータ
   ---------------------------------------------------------
   写真を追加・変更するときは、この配列を編集するだけ！

   1. images/ フォルダに写真ファイルを入れる（例：images/cabbage-ueru01.jpg）
   2. 下の配列に { } のブロックを1つコピーして追加する
   3. src / caption / category を書き換える

   category（作業）は次の4つから選びます：
     "seed"    … 定植
     "care"    … 日々のお世話
     "grow"    … 育つ様子（結球・花蕾など）
     "harvest" … 収穫・試食・片づけ
   ========================================================= */

const GALLERY_PHOTOS = [
  {
    src: "images/IMG_7251.JPG",
    caption: "苗選び中",
    category: "seed",
  },
  {
    src: "images/IMG_7252.JPG",
    caption: "苗選び中",
    category: "seed",
  },
  {
    src: "images/IMG_7242.JPG",
    caption: "定植",
    category: "seed",
  },
  {
    src: "images/IMG_7256.JPG",
    caption: "定植",
    category: "seed",
  },
  {
    src: "images/IMG_7258.JPG",
    caption: "水やり",
    category: "seed",
  },
  {
    src: "images/IMG_7289.JPG",
    caption: "追肥１回目",
    category: "care",
  },
  {
    src: "images/IMG_7293.JPG",
    caption: "追肥１回目",
    category: "care",
  },
  {
    src: "images/IMG_7288.JPG",
    caption: "生育調査中",
    category: "grow",
  },
  {
    src: "images/IMG_7431.JPG",
    caption: "あおむしさんこんにちは",
    category: "grow",
  },
  {
    src: "images/IMG_7426.JPG",
    caption: "追肥２回目",
    category: "care",
  },
     {
    src: "images/IMG_7673.JPG",
    caption: "追肥３回目",
    category: "care",
  },
    {
    src: "images/IMG_7665.JPG",
    caption: "順調に育っています",
    category: "care",
  },
    {
    src: "images/IMG_7668.JPG",
    caption: "中耕中",
    category: "care",
  },
];

/* 作業名を日本語ラベルに変換する対応表（ギャラリーのタグ表示に使用） */
const CATEGORY_LABELS = {
  seed: "定植",
  care: "お世話",
  grow: "育つ様子",
  harvest: "収穫・試食",
};
