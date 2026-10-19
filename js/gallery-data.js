/* =========================================================
   フォトギャラリーのデータ
   ---------------------------------------------------------
   写真を追加・変更するときは、この配列を編集するだけ！

   1. images/ フォルダに写真ファイルを入れる（例：images/cabbage-ueru01.jpg）
   2. 下の配列に { } のブロックを1つコピーして追加する
   3. src / caption / crop / category を書き換える

   crop（野菜）は次の3つから選びます：
     "cabbage"     … キャベツ
     "broccoli"    … ブロッコリー
     "cauliflower" … カリフラワー

   category（作業）は次の4つから選びます：
     "seed"    … 定植
     "care"    … 日々のお世話
     "grow"    … 育つ様子（結球・花蕾など）
     "harvest" … 収穫・試食・片づけ

   ※ いまは「写真準備中」の仮の画像が入っています。
     本物の写真を追加したら、仮の画像（placeholder-〇〇.svg）のブロックは消してください。
   ========================================================= */

const GALLERY_PHOTOS = [
  {
    src: "images/placeholder-cabbage.svg",
    caption: "キャベツの写真（準備中）",
    crop: "cabbage",
    category: "seed",
  },
  {
    src: "images/placeholder-broccoli.svg",
    caption: "ブロッコリーの写真（準備中）",
    crop: "broccoli",
    category: "seed",
  },
  {
    src: "images/placeholder-cauliflower.svg",
    caption: "カリフラワーの写真（準備中）",
    crop: "cauliflower",
    category: "seed",
  },
];

/* 野菜名を日本語ラベルに変換する対応表（ギャラリーのタグ表示に使用） */
const CROP_LABELS = {
  cabbage: "キャベツ",
  broccoli: "ブロッコリー",
  cauliflower: "カリフラワー",
};

/* 作業名を日本語ラベルに変換する対応表（ギャラリーのタグ表示に使用） */
const CATEGORY_LABELS = {
  seed: "定植",
  care: "お世話",
  grow: "育つ様子",
  harvest: "収穫・試食",
};
