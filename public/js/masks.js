// formatacao mascara pra formulario do cpf e telefone

function maskCPF(value) {
  return value
    .replace(/\D/g, "") // só deixa numero
    .replace(/(\d{3})(\d)/, "$1.$2") // coloca ponto
    .replace(/(\d{3})(\d)/, "$1.$2") // coloca ponto
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // coloca traco
}

function maskTelefone(value) {
  return value
    .replace(/\D/g, "") // só deixa numero
    .replace(/(\d{2})(\d)/, "($1) $2") // DDD
    .replace(/(\d{5})(\d)/, "$1-$2"); // numero com traco
}

document.addEventListener("input", (e) => {
  if (e.target.name === "cpf") {
    e.target.value = maskCPF(e.target.value); // aplica mascara CPF
  }
  if (e.target.name === "telefone") {
    e.target.value = maskTelefone(e.target.value); // aplica mascara telefone
  }
});