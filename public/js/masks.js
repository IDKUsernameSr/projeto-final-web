function maskCPF(value) {
  return value
    .replace(/\D/g, "") // remove tudo que não é número
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function maskTelefone(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

document.addEventListener("input", (e) => {
  if (e.target.name === "cpf") {
    e.target.value = maskCPF(e.target.value);
  }
  if (e.target.name === "telefone") {
    e.target.value = maskTelefone(e.target.value);
  }
});