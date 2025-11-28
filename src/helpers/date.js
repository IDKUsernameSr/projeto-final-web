// formatacao data

module.exports = {
  formatDate(date) {
    if (!date) return '';
    
    const d = new Date(date);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const ano = d.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }
};