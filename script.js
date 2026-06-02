const amountInput = document.getElementById('amount');
const resultEl = document.getElementById('result');
const convertBtn = document.getElementById('convertBtn');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');
const yearEl = document.getElementById('year');

const angka = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas'];

function cleanNumber(value) {
  return value.replace(/[^0-9]/g, '');
}

function formatRupiah(value) {
  const cleaned = cleanNumber(value);
  if (!cleaned) return '';
  return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function terbilang(number) {
  number = Math.floor(Number(number));

  if (number < 12) return angka[number];
  if (number < 20) return `${terbilang(number - 10)} belas`;
  if (number < 100) return `${terbilang(Math.floor(number / 10))} puluh ${terbilang(number % 10)}`.trim();
  if (number < 200) return `seratus ${terbilang(number - 100)}`.trim();
  if (number < 1000) return `${terbilang(Math.floor(number / 100))} ratus ${terbilang(number % 100)}`.trim();
  if (number < 2000) return `seribu ${terbilang(number - 1000)}`.trim();
  if (number < 1000000) return `${terbilang(Math.floor(number / 1000))} ribu ${terbilang(number % 1000)}`.trim();
  if (number < 1000000000) return `${terbilang(Math.floor(number / 1000000))} juta ${terbilang(number % 1000000)}`.trim();
  if (number < 1000000000000) return `${terbilang(Math.floor(number / 1000000000))} miliar ${terbilang(number % 1000000000)}`.trim();
  if (number < 1000000000000000) return `${terbilang(Math.floor(number / 1000000000000))} triliun ${terbilang(number % 1000000000000)}`.trim();

  return 'Nominal terlalu besar.';
}

function normalizeSpaces(text) {
  return text.replace(/\s+/g, ' ').trim();
}

function convert() {
  const raw = cleanNumber(amountInput.value);

  if (!raw) {
    resultEl.textContent = 'Masukkan nominal terlebih dahulu.';
    return;
  }

  const number = Number(raw);

  if (!Number.isSafeInteger(number)) {
    resultEl.textContent = 'Nominal terlalu besar untuk diproses.';
    return;
  }

  if (number === 0) {
    resultEl.textContent = 'Nol rupiah';
    return;
  }

  const output = `${normalizeSpaces(terbilang(number))} rupiah`;
  resultEl.textContent = output.charAt(0).toUpperCase() + output.slice(1);
}

amountInput.addEventListener('input', () => {
  amountInput.value = formatRupiah(amountInput.value);
});

amountInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') convert();
});

convertBtn.addEventListener('click', convert);

clearBtn.addEventListener('click', () => {
  amountInput.value = '';
  resultEl.textContent = 'Masukkan nominal terlebih dahulu.';
  amountInput.focus();
});

copyBtn.addEventListener('click', async () => {
  const text = resultEl.textContent;
  if (!text || text === 'Masukkan nominal terlebih dahulu.') return;

  try {
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = 'Berhasil Disalin';
    setTimeout(() => copyBtn.textContent = 'Salin Hasil', 1300);
  } catch (error) {
    alert('Gagal menyalin hasil. Silakan copy manual.');
  }
});

document.querySelectorAll('.examples button').forEach((button) => {
  button.addEventListener('click', () => {
    amountInput.value = formatRupiah(button.dataset.value);
    convert();
  });
});

yearEl.textContent = new Date().getFullYear();
