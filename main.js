// Fungsi untuk menggambar visualisasi
function drawViz(data) {
  // 1. Hapus konten sebelumnya
  document.body.innerHTML = '';

  // 2. Ambil data dari Looker Studio (kita asumsikan urutannya benar)
  const row = data.tables.DEFAULT[0];
  const imageUrl = row.dimensions[0];
  const titleText = row.dimensions[1];
  const descriptionText = row.dimensions[2];
  const linkUrl = row.dimensions[3];
  const dateText = row.dimensions[4];

  // 3. Ambil pengaturan gaya
  const style = data.style;
  const cardBorderColor = style.cardBorderColor.color || '#dddddd';
  
  // -- Elemen Kiri --
  // Buat elemen gambar
  const image = document.createElement('img');
  image.src = imageUrl;
  image.style.width = '120px';
  image.style.height = 'auto';
  image.style.objectFit = 'cover';
  image.style.marginRight = '15px';

  // Buat elemen tanggal
  const dateElement = document.createElement('p');
  dateElement.textContent = dateText;
  dateElement.style.color = style.dateFontColor.color || '#888888';
  dateElement.style.fontSize = '12px';
  dateElement.style.margin = '10px 0 0 0';

  // Gabungkan ke kolom kiri
  const leftColumn = document.createElement('div');
  leftColumn.appendChild(image);
  leftColumn.appendChild(dateElement);

  // -- Elemen Kanan --
  // Buat elemen judul
  const titleElement = document.createElement('h2');
  titleElement.textContent = titleText;
  titleElement.style.fontSize = style.titleFontSize.value ? style.titleFontSize.value + 'px' : '20px';
  titleElement.style.color = style.titleFontColor.color || '#333333';
  titleElement.style.margin = '0 0 10px 0';
  titleElement.style.fontWeight = 'bold';

  // Buat elemen deskripsi
  const descElement = document.createElement('p');
  descElement.textContent = descriptionText;
  descElement.style.fontSize = style.descFontSize.value ? style.descFontSize.value + 'px' : '14px';
  descElement.style.color = style.descFontColor.color || '#666666';
  descElement.style.margin = '0 0 15px 0';

  // Buat elemen tautan (link)
  const linkElement = document.createElement('a');
  linkElement.textContent = 'Baca Selengkapnya...';
  linkElement.href = linkUrl;
  linkElement.target = '_blank'; // Buka di tab baru
  linkElement.style.fontSize = '12px';
  linkElement.style.fontWeight = 'bold';

  // Gabungkan ke kolom kanan
  const rightColumn = document.createElement('div');
  rightColumn.style.display = 'flex';
  rightColumn.style.flexDirection = 'column';
  rightColumn.appendChild(titleElement);
  rightColumn.appendChild(descElement);
  rightColumn.appendChild(linkElement);

  // -- Gabungkan Semua Kolom ke Wadah Utama --
  const cardContainer = document.createElement('div');
  cardContainer.style.fontFamily = 'Arial, sans-serif';
  cardContainer.style.display = 'flex';
  cardContainer.style.padding = '15px';
  cardContainer.style.border = `1px solid ${cardBorderColor}`;
  cardContainer.style.borderRadius = '8px';
  cardContainer.style.height = '100%';
  cardContainer.style.boxSizing = 'border-box';

  cardContainer.appendChild(leftColumn);
  cardContainer.appendChild(rightColumn);

  // 4. Tambahkan kartu ke body
  document.body.appendChild(cardContainer);
}

// Berlangganan perubahan dari Looker Studio
dscc.subscribeToData(drawViz, { transform: dscc.objectTransform });
