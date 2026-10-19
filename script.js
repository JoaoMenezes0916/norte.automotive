// Configure aqui o número comercial da Norte Automotive.
// Use código do país + DDD + número, somente números. Exemplo: 5592999999999
const WHATSAPP_NUMBER = "5592988429448";

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.textContent = open ? "×" : "☰";
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
  if (menuButton) menuButton.textContent = "☰";
}));

// Animação de entrada ao rolar a página.
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();

// Preenche o pacote no formulário quando o visitante clica em um card.
document.querySelectorAll(".quote-link").forEach(link => {
  link.addEventListener("click", () => {
    const select = document.getElementById("pacote");
    const wanted = link.dataset.package;
    [...select.options].forEach(option => {
      if (option.text === wanted) select.value = option.text;
    });
  });
});

document.getElementById("quote-form").addEventListener("submit", event => {
  event.preventDefault();
  if (!/^\d{12,15}$/.test(WHATSAPP_NUMBER)) {
    alert("Antes de usar o orçamento, configure o número comercial no arquivo script.js. Procure por COLOQUE_SEU_NUMERO_AQUI e informe DDI + DDD + telefone, apenas números.");
    return;
  }
  const form = new FormData(event.currentTarget);
  const nome = form.get("nome");
  const carro = form.get("carro");
  const pacote = form.get("pacote");
  const bairro = form.get("bairro");
  const observacoes = form.get("observacoes") || "Sem observações";
  const message = `Olá, Norte Automotive! Quero solicitar um orçamento.%0A%0A*Nome:* ${encodeURIComponent(nome)}%0A*Veículo:* ${encodeURIComponent(carro)}%0A*Pacote:* ${encodeURIComponent(pacote)}%0A*Bairro:* ${encodeURIComponent(bairro)}%0A*Observações:* ${encodeURIComponent(observacoes)}%0A%0ASei que o deslocamento é cobrado à parte.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank", "noopener,noreferrer");
});
